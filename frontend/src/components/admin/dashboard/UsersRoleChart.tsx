"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

export interface UserRoleData {
  name: string;
  value: number;
}

interface Props {
  data?: UserRoleData[];
}

const COLORS = [
  "#2E7D32",
  "#1565C0",
  "#EF6C00",
  "#8E24AA",
  "#D32F2F",
];

export default function UsersRoleChart({
  data = [],
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
          sx={{fontWeight:700,
          mb:3}}
        >
          User Roles
        </Typography>

        {data.length === 0 ? (
          <Typography
            color="text.secondary"
            sx={{align:"center",
            py:8}}
          >
            No role distribution available.
          </Typography>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: 350,
            }}
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={105}
                  paddingAngle={3}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}