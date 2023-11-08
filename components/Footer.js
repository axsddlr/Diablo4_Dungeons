import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "#121212",
        color: "white",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          <Link
            href="https://www.reddit.com/r/diablo4/comments/17cdpak/xp_per_hour_and_nightmare_dungeon_tier_list_for/"
            color="inherit"
          >
            Original Reddit Source
          </Link>
          {" | "}
          <Link
            href="https://github.com/axsddlr/Diablo4_Dungeons"
            color="inherit"
          >
            Github
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
