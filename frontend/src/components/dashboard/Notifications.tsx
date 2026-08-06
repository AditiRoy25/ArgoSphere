"use client";

import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import { useNotificationsQuery } from "@/src/redux/api/Notification";

export default function Notifications() {
  const {
    data,
    isLoading,
    isError,
  } = useNotificationsQuery(undefined);

  if (isLoading) {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid #ECECEC",
          height: "100%",
        }}
      >
        <CardContent>
          <Box
            sx={{ display: "flex", justifyContent: "center", py: 5 }}
          >
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        Failed to load notifications.
      </Alert>
    );
  }

  const notifications = data?.notifications ?? [];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #ECECEC",
        height: "100%",
      }}
    >
      <CardContent>
        <Stack
          spacing={1}
          sx={{ flexDirection: "row", alignItems: "center", mb: 3 }}
        >
          <NotificationsActiveIcon color="primary" />

          <Typography
            variant="h6"
            sx={{ fontWeight: 700 }}
          >
            Notifications
          </Typography>
        </Stack>

        {notifications.length === 0 ? (
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center", py: 3 }}
          >
            No notifications available.
          </Typography>
        ) : (
          notifications.map((notification, index) => (
            <Box key={notification._id}>
              <Stack spacing={0.5} sx={{ py: 1.5 }}>
                <Typography sx={{ fontWeight: 600 }}>
                  {notification.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {notification.message}
                </Typography>
              </Stack>

              {index !== notifications.length - 1 && (
                <Divider />
              )}
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  );
}
