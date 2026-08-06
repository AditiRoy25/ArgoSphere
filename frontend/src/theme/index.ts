"use client";

import {
  createTheme,
} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#15803d",
      light: "#22c55e",
      dark: "#166534",
    },

    secondary: {
      main: "#84cc16",
    },

    background: {
      default: "#F8FAF5",
      paper: "#FFFFFF",
    },

    success: {
      main: "#16a34a",
    },

    warning: {
      main: "#f59e0b",
    },

    error: {
      main: "#dc2626",
    },

    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },
  },

  typography: {
    fontFamily: [
      "Inter",
      "sans-serif",
    ].join(","),

    h1: {
      fontWeight: 700,
      fontSize: "3rem",
    },

    h2: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },

    h3: {
      fontWeight: 700,
      fontSize: "2rem",
    },

    h4: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },

    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },

    h6: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
   MuiButton: {
  styleOverrides: {
    root: {
      borderRadius: 12,
      height: 50,
      fontWeight: 600,
    },
  },

  variants: [
    {
      props: {
        variant: "contained",
        color: "primary",
      },

      style: {
        background:
          "linear-gradient(90deg,#15803d,#16a34a)",

        "&:hover": {
          background:
            "linear-gradient(90deg,#166534,#15803d)",
        },
      },
    },
  ],
},

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,

          boxShadow:
            "0 8px 30px rgba(0,0,0,0.08)",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },

      styleOverrides: {
        root: {
          marginBottom: 16,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});

export default theme;