"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

export interface SystemAlert {
  id: string;
  severity: "success" | "info" | "warning" | "error";
  title: string;
  message: string;
  button?: string;
}

interface Props {
  alerts?: SystemAlert[];
}

export default function SystemAlerts({
  alerts = [],
}: Props) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
        sx={{  fontWeight:700,
          mb:3}}
        >
          System Alerts
        </Typography>

        {alerts.length === 0 ? (
          <Typography
            color="text.secondary"
            sx={{align:"center",
            py:4}}
          >
            No system alerts available.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {alerts.map((alert) => (
              <Alert
                key={alert.id}
                severity={alert.severity}
                sx={{
                  borderRadius: 3,
                  alignItems: "center",
                }}
                action={
                  alert.button ? (
                    <Button
                      color="inherit"
                      size="small"
                      variant="outlined"
                    >
                      {alert.button}
                    </Button>
                  ) : undefined
                }
              >
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{fontWeight:600}}
                  >
                    {alert.title}
                  </Typography>

                  <Typography
                    variant="body2"
                  >
                    {alert.message}
                  </Typography>
                </Box>
              </Alert>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}