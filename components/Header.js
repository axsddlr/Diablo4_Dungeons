import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Header = () => {
  return (
    <Box sx={{ py: 3, textAlign: "center", backgroundColor: "#2c2c2c" }}>
      <Typography variant="h4" component="h1" color="primary">
        Diablo 4: S2 Dungeon Tiers
      </Typography>
    </Box>
  );
};

export default Header;
