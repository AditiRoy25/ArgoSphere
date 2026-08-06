"use client";

import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  MouseEvent,
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import Cookies from "js-cookie";

import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {
  logout,
  restoreCredentials,
  type User,
} from "@/src/redux/slices/authSlice";

import {
  baseApi,
} from "@/src/redux/api/baseApi";

import {
  useLazyGetMyProfileQuery,
} from "@/src/redux/api/userApi";

import {
  useLogoutMutation,
} from "@/src/redux/api/authApi";

import type {
  RootState,
  AppDispatch,
} from "@/src/redux/store";

import {
  roleRoutes,
} from "@/src/lib/permissions";

// =====================================
// PUBLIC NAVBAR MENU
// =====================================

const menus = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Marketplace",
    path: "/marketplace",
  },
  {
    name: "Learning",
    path: "/learning",
  },
  {
    name: "NGOs",
    path: "/ngo",
  },
  {
    name: "Schemes",
    path: "/schemes",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

// =====================================
// NAVBAR
// =====================================

export default function Navbar() {
  const pathname =
    usePathname();

  const router =
    useRouter();

  const dispatch =
    useDispatch<AppDispatch>();

  const [getMyProfile] =
    useLazyGetMyProfileQuery();

  const [logoutUser] =
    useLogoutMutation();

  // =====================================
  // REDUX AUTH
  // =====================================

  const {
    user,
    isAuthenticated,
  } = useSelector(
    (state: RootState) =>
      state.auth
  );

  // =====================================
  // AUTH INITIALIZATION
  // =====================================

  const [
    authReady,
    setAuthReady,
  ] = useState(false);

  // =====================================
  // DROPDOWN
  // =====================================

  const [
    anchorEl,
    setAnchorEl,
  ] = useState<null | HTMLElement>(
    null
  );

  const menuOpen =
    Boolean(anchorEl);

  // =====================================
  // RESTORE REDUX FROM COOKIES
  // =====================================

  useEffect(() => {
    const restoreAuth = async () => {
      try {
      // Already authenticated in Redux
      if (
        isAuthenticated &&
        user
      ) {
        setAuthReady(true);

        return;
      }

      // Get cookies
      const accessToken =
        Cookies.get(
          "accessToken"
        );

      const refreshToken =
        Cookies.get(
          "refreshToken"
        );

      const userCookie =
        Cookies.get(
          "user"
        );

      // =================================
      // NO LOGIN COOKIE
      // =================================

      if (!userCookie) {
        const response = await getMyProfile().unwrap();
        const profile = (response as { data?: User }).data;

        if (!profile?._id || !profile.role) {
          throw new Error("Invalid profile response");
        }

        Cookies.set("user", JSON.stringify(profile), {
          expires: 7,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });

        dispatch(
          restoreCredentials({
            user: profile,
            accessToken: accessToken ?? "",
            refreshToken,
          })
        );

        return;
      }

      if (!accessToken) {
        throw new Error("Missing access token");
      }

      // =================================
      // PARSE USER COOKIE
      // =================================

      const cookieUser: User =
        JSON.parse(
          userCookie
        );

      // =================================
      // VALIDATE COOKIE USER
      // =================================

      if (
        !cookieUser ||
        !(cookieUser._id || (cookieUser as User & { id?: string }).id) ||
        !cookieUser.role
      ) {
        throw new Error(
          "Invalid user cookie"
        );
      }

      // =================================
      // RESTORE REDUX
      // =================================

      dispatch(
        restoreCredentials({
          user: {
            ...cookieUser,
            _id:
              cookieUser._id ??
              (cookieUser as User & { id?: string }).id ??
              "",
          },

          accessToken,

          refreshToken,
        })
      );
      } catch (error) {
      console.error(
        "Auth restore failed:",
        error
      );

      // Remove invalid cookies
      Cookies.remove(
        "accessToken"
      );

      Cookies.remove(
        "refreshToken"
      );

      Cookies.remove(
        "user"
      );

      Cookies.remove(
        "role"
      );

      // Remove old cookie
      Cookies.remove(
        "token"
      );
      } finally {
      setAuthReady(true);
      }
    };

    void restoreAuth();
  }, [
    dispatch,
    getMyProfile,
    isAuthenticated,
    user,
  ]);

  // =====================================
  // MENU OPEN
  // =====================================

  const handleMenuOpen = (
    event: MouseEvent<HTMLElement>
  ) => {
    setAnchorEl(
      event.currentTarget
    );
  };

  // =====================================
  // MENU CLOSE
  // =====================================

  const handleMenuClose =
    () => {
      setAnchorEl(null);
    };

  // =====================================
  // DASHBOARD
  // =====================================

  const handleDashboard =
    () => {
      handleMenuClose();

      if (!user) {
        return;
      }

      const role =
        user.role
          ?.trim()
          .toLowerCase();

      const destination =
        roleRoutes[
          role as keyof typeof roleRoutes
        ] ??
        "/farmer/dashboard";

      router.push(
        destination
      );
    };

  // =====================================
  // LOGOUT
  // =====================================

  const handleLogout =
    async () => {
      handleMenuClose();

      try {
        await logoutUser(
          Cookies.get("refreshToken")
        ).unwrap();
      } catch {
        // Clear local authentication even when the session has expired.
      }

      // =================================
      // CLEAR REDUX + COOKIES
      // =================================

      dispatch(
        logout()
      );

      // =================================
      // CLEAR RTK QUERY CACHE
      // =================================

      dispatch(
        baseApi.util
          .resetApiState()
      );

      // =================================
      // REMOVE OLD TOKEN COOKIE
      // =================================

      Cookies.remove(
        "token"
      );

      // =================================
      // REDIRECT
      // =================================

      router.replace(
        "/"
      );

      router.refresh();
    };

  // =====================================
  // PREVENT LOGIN BUTTON FLASH
  // =====================================

  if (!authReady) {
    return null;
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#fff",

        color: "#222",

        borderBottom:
          "1px solid #eee",
      }}
    >
      <Container
        maxWidth="xl"
      >
        <Toolbar
          sx={{
            py: 1,
          }}
        >
          {/* =========================
              LOGO
          ========================= */}

          <Typography
            component={Link}
            href="/"
            variant="h5"
            sx={{
              flexGrow: 1,

              fontWeight: 700,

              color:
                "primary.main",

              textDecoration:
                "none",
            }}
          >
            🌿 AgroSphere
          </Typography>

          {/* =========================
              NAVIGATION
          ========================= */}

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },

              gap: 3,

              alignItems:
                "center",
            }}
          >
            {menus.map(
              (menu) => {
                const active =
                  pathname ===
                    menu.path ||
                  (
                    menu.path !==
                      "/" &&
                    pathname.startsWith(
                      `${menu.path}/`
                    )
                  );

                return (
                  <Link
                    key={
                      menu.name
                    }
                    href={
                      menu.path
                    }
                    style={{
                      textDecoration:
                        "none",

                      color:
                        active
                          ? "#2E7D32"
                          : "#333",

                      fontWeight:
                        600,

                      borderBottom:
                        active
                          ? "2px solid #2E7D32"
                          : "2px solid transparent",

                      paddingBottom:
                        "4px",
                    }}
                  >
                    {
                      menu.name
                    }
                  </Link>
                );
              }
            )}
          </Box>

          {/* =========================
              AUTH SECTION
          ========================= */}

          <Box
            sx={{
              ml: 3,

              display: "flex",

              alignItems:
                "center",

              gap: 1,
            }}
          >
            {!isAuthenticated ||
            !user ? (
              <>
                {/* =================
                    LOGIN
                ================= */}

                <Button
                  variant="outlined"
                  component={
                    Link
                  }
                  href="/login"
                >
                  Login
                </Button>

                {/* =================
                    REGISTER
                ================= */}

                <Button
                  variant="contained"
                  component={
                    Link
                  }
                  href="/register"
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                {/* =================
                    USER BUTTON
                ================= */}

                <Button
                  onClick={
                    handleMenuOpen
                  }
                  endIcon={
                    <KeyboardArrowDownIcon />
                  }
                  sx={{
                    textTransform:
                      "none",

                    color:
                      "text.primary",

                    gap: 1,
                  }}
                >
                  <Avatar
                    src={
                      user.image
                    }
                    alt={
                      user.name
                    }
                    sx={{
                      width: 35,
                      height: 35,
                    }}
                  >
                    {user.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </Avatar>

                  <Box
                    sx={{
                      display: {
                        xs: "none",
                        md: "block",
                      },

                      textAlign:
                        "left",
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={
                        700
                      }
                    >
                      {
                        user.name
                      }
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        textTransform:
                          "capitalize",
                      }}
                    >
                      {
                        user.role
                      }
                    </Typography>
                  </Box>
                </Button>

                <Button
                  color="error"
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>

                {/* =================
                    USER MENU
                ================= */}

                <Menu
                  anchorEl={
                    anchorEl
                  }
                  open={
                    menuOpen
                  }
                  onClose={
                    handleMenuClose
                  }
                  anchorOrigin={{
                    vertical:
                      "bottom",

                    horizontal:
                      "right",
                  }}
                  transformOrigin={{
                    vertical:
                      "top",

                    horizontal:
                      "right",
                  }}
                >
                  {/* =================
                      USER INFO
                  ================= */}

                  <Box
                    sx={{
                      px: 2,

                      py: 1,

                      minWidth:
                        220,
                    }}
                  >
                    <Typography
                      fontWeight={
                        700
                      }
                    >
                      {
                        user.name
                      }
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {
                        user.email
                      }
                    </Typography>

                    <Typography
                      variant="caption"
                      color="primary.main"
                      sx={{
                        textTransform:
                          "capitalize",
                      }}
                    >
                      {
                        user.role
                      }
                    </Typography>
                  </Box>

                  {/* =================
                      DASHBOARD
                  ================= */}

                  <MenuItem
                    onClick={
                      handleDashboard
                    }
                  >
                    <DashboardIcon
                      fontSize="small"
                      sx={{
                        mr: 1,
                      }}
                    />

                    Dashboard
                  </MenuItem>

                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
