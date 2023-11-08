import { useState, useEffect } from "react";

const DungeonInfo = ({ dungeon }) => {
  return (
    <div className="border p-4 rounded my-2">
      <h2 className="font-bold">{dungeon.Dungeon}</h2>
      <p>Rank: {dungeon.Solo_Rank || dungeon.Glyph_Rank}</p>
      <p>Tier: {dungeon.Solo_Tier || dungeon.Glyph_Tier}</p>
    </div>
  );
};

export default function Home() {
  const [tierList, setTierList] = useState("Solo XP Tier List");
  const [searchTerm, setSearchTerm] = useState("");
  const [dungeonData, setDungeonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Import data based on the current tier list selection
    const data =
      tierList === "Solo XP Tier List"
        ? require("../data/soloXPTierList.json")
        : require("../data/glyphLevelingTierList.json");
    setDungeonData(data);
    setFilteredData(data); // Reset filtered data on tier list change
  }, [tierList]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter the data as the user types
    const filtered = dungeonData.filter((dungeon) =>
      dungeon.Dungeon.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <select
          value={tierList}
          onChange={(e) => setTierList(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="Solo XP Tier List">Solo XP Tier List</option>
          <option value="Glyph Leveling Tier List">
            Glyph Leveling Tier List
          </option>
        </select>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Type the first three letters of the dungeon name"
          className="p-2 border rounded w-full"
        />
      </div>
      <div>
        {filteredData.length > 0 ? (
          filteredData.map((dungeon, index) => (
            <DungeonInfo key={index} dungeon={dungeon} />
          ))
        ) : (
          <p>No dungeons found.</p>
        )}
      </div>
    </div>
  );
}
