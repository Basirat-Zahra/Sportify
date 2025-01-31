import axios from 'axios';



/*
there are a total of 15500 players in the list so adjust
 the batch size and offset to get desired ones

*/

/// Fetch all players with pagination
export const fetchPlayers = async () => {
  try {
    const PLAYER_LIST_API_URL = process.env.PLAYER_LIST_API_URL;
    const API_KEY = process.env.API_KEY2;
    const BATCH_SIZE = 100; // Number of players per API request
    const TOTAL_PLAYERS = 650;
    let allPlayers = [];

    for (let offset = 550; offset < TOTAL_PLAYERS; offset += BATCH_SIZE) {
      const response = await axios.get(PLAYER_LIST_API_URL, {
        params: {
          apikey: API_KEY,
          offset,
        },
      });

      // Check and collect data from each response batch
      if (response.data?.data?.length) {
        allPlayers = allPlayers.concat(response.data.data);
        console.log(`Fetched ${response.data.data.length} players starting at offset ${offset}`);
      } else {
        console.warn(`No more data returned at offset ${offset}`);
        break;
      }
    }
    // console.log(allPlayers);
    
    return allPlayers;
  } catch (error) {
    console.error('Error fetching player list:', error);
    return [];
  }
};


// Fetch detailed info for a player by ID
export const fetchPlayerInfo = async (playerId) => {
  try {
    const API_KEY = process.env.API_KEY2;
    const PLAYER_INFO_API_URL = process.env.PLAYER_INFO_API_URL;

    const response = await axios.get(PLAYER_INFO_API_URL, {
      params: { 
          apikey: API_KEY,
          id: playerId
       },
      
    });
    console.log(response.data.data);
    
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching player info for ID ${playerId}:`, error);
    return null;
  }
};
