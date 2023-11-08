import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

// Define a theme for Material-UI components
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
  },
  components: {
    // Style overrides for TextField
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "white",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "white",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
            "& input": {
              color: "white",
            },
          },
          "& .MuiSelect-icon": {
            color: "white",
          },
        },
      },
    },
  },
});

// Function to map tier to color with half opacity
const getTierColor = (tier) => {
  switch (tier) {
    case "S":
      return "rgba(102, 204, 255, 0.20)"; // Blue color for S tier with 50% opacity
    case "A":
      return "rgba(153, 204, 153, 0.20)"; // Green color for A tier with 50% opacity
    case "B":
      return "rgba(255, 255, 102, 0.20)"; // Yellow color for B tier with 50% opacity
    case "C":
      return "rgba(255, 153, 102, 0.2)"; // Orange color for C tier with 50% opacity
    case "D":
      return "rgba(255, 102, 102, 0.20)"; // Red color for D tier with 50% opacity
    default:
      return "rgba(29, 29, 29, 0.20)"; // Use paper color with 50% opacity for undefined tiers
  }
};

const DungeonInfo = ({ dungeon }) => {
  const backgroundColor = getTierColor(dungeon.Solo_Tier || dungeon.Glyph_Tier);

  return (
    <Card variant="outlined" sx={{ mb: 2, backgroundColor: backgroundColor }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {dungeon.Dungeon}
        </Typography>
        <Typography color="text.secondary">
          Rank: {dungeon.Solo_Rank || dungeon.Glyph_Rank}
        </Typography>
        <Typography color="text.secondary">
          Tier: {dungeon.Solo_Tier || dungeon.Glyph_Tier}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default function Home() {
  const [tierList, setTierList] = useState("Solo XP Tier List");
  const [searchTerm, setSearchTerm] = useState("");
  const [dungeonData, setDungeonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const data =
      tierList === "Solo XP Tier List"
        ? require("../data/soloXPTierList.json")
        : require("../data/glyphLevelingTierList.json");
    setDungeonData(data);
    setFilteredData(data);
  }, [tierList]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = dungeonData.filter((dungeon) =>
      dungeon.Dungeon.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Header />
          <TextField
            select
            label="Tier List"
            value={tierList}
            onChange={(e) => setTierList(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          >
            <MenuItem value="Solo XP Tier List">Solo XP Tier List</MenuItem>
            <MenuItem value="Glyph Leveling Tier List">
              Glyph Leveling Tier List
            </MenuItem>
          </TextField>
          <TextField
            label="Search Dungeon"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            InputProps={{
              style: { color: "#fff" },
            }}
          />
          <Box sx={{ mt: 3 }}>
            {filteredData.length > 0 ? (
              filteredData.map((dungeon, index) => (
                <DungeonInfo key={index} dungeon={dungeon} />
              ))
            ) : (
              <Typography>No dungeons found.</Typography>
            )}
          </Box>
          <Footer />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
