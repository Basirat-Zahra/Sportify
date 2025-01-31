import { fetchPlayers, fetchPlayerInfo } from '../services/playersData.js';


// Players by country
export const getTeamPlayers = async (req, res) => {
  const { country } = req.params;

  try {
    const players = await fetchPlayers();

    console.log(players);
    
    // Filter players by country
    const teamPlayers = players.filter(player => 
      player.country?.replace(/\s+/g, '').toLowerCase() === country.replace(/\s+/g, '').toLowerCase()
    );
    
        console.log(teamPlayers);

    res.status(200).json(teamPlayers);
    
  } catch (error) {
    console.error('Error fetching team players:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Controller to handle player info requests by ID
export const getPlayerInfo = async (req, res) => {
  const { playerId } = req.params;

  try {
    const playerInfo = await fetchPlayerInfo(playerId);

    if (!playerInfo) {
      return res.status(404).json({ message: `Player with ID ${playerId} not found` });
    }

    res.status(200).json(playerInfo);
  } catch (error) {
    console.error(`Error fetching player info for ID ${playerId}:`, error);
    res.status(500).json({ message: 'Server error while fetching player information' });
  }
};



