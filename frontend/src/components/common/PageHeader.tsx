import {
  Box,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  subtitle?: string;
}

export default function PageHeader({
  title,
  subtitle,
}: Props) {
  return (
    <Box sx={{mb:4}}>
      <Typography
       sx={{ variant:"h4",
        fontWeight:700}}
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography
         sx={{ color:"text.secondary",
          mt:1}}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}