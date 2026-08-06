"use client";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

export interface Activity {
  id: string;
  type:
    | "user"
    | "order"
    | "scheme"
    | "course"
    | "approval";
  title: string;
  description: string;
  time: string;
  status: string;
}

interface Props {
  activities?: Activity[];
}

const iconMap = {
  user: {
    icon: <PersonAddAlt1RoundedIcon />,
    color: "#2E7D32",
  },
  order: {
    icon: <ShoppingCartRoundedIcon />,
    color: "#1565C0",
  },
  scheme: {
    icon: <AccountBalanceRoundedIcon />,
    color: "#EF6C00",
  },
  course: {
    icon: <SchoolRoundedIcon />,
    color: "#8E24AA",
  },
  approval: {
    icon: <VerifiedRoundedIcon />,
    color: "#D32F2F",
  },
};

export default function RecentActivities({
  activities = [],
}: Props) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
         sx={{ fontWeight:700,
          mb:3}}
        >
          Recent Activities
        </Typography>

        {activities.length === 0 ? (
          <Typography
            color="text.secondary"
           sx={{ align:"center",
            py:4}}
          >
            No recent activities found.
          </Typography>
        ) : (
          <List disablePadding>
            {activities.map((activity, index) => {
              const config =
                iconMap[activity.type];

              return (
                <Box key={activity.id}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{ px: 0 }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor:
                            config.color,
                        }}
                      >
                        {config.icon}
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      disableTypography
                      primary={
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight:600}}
                        >
                          {activity.title}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{mt:0.5}}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            {
                              activity.description
                            }
                          </Typography>

                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            {activity.time}
                          </Typography>
                        </Box>
                      }
                    />

                    <Chip
                      label={activity.status}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </ListItem>

                  {index !==
                    activities.length -
                      1 && <Divider />}
                </Box>
              );
            })}
          </List>
        )}
      </CardContent>
    </Card>
  );
}