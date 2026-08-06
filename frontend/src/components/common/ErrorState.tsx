import {
  Box,
  Typography,
} from "@mui/material";

export default function ErrorState({
  message,
}: {
  message: string;
}) {
  return (
    <Box sx={{textAlign:"center"}}>
      <Typography
        color="error"
      >
        {message}
      </Typography>
    </Box>
  );
}