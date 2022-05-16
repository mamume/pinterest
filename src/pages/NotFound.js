import { Typography } from "@mui/material";
import { Box } from "@mui/system";

function ProfileNotFound({ message, statusCode }) {
  return (
    <Box mt={20}>
      <Typography variant="h1" textAlign="center" fontWeight="bold">{statusCode}</Typography>
      <Typography variant="h3" textAlign="center">{message}</Typography>
    </Box>
  );
}

export default ProfileNotFound;