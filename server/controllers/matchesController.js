import {fetchMatches, fetchUpcomingMatches, fetchMatchDetails} from "../services/matchData.js";

// Handle live matches request
export const getLiveMatches = async (req, res) => {
  try {
    const { liveMatches } = await fetchMatches();
    res.status(200).json({ matches: liveMatches });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handle ended matches request
export const getEndedMatches = async (req, res) => {
  try {
    const { endedMatches } = await fetchMatches();
    
    res.status(200).json({ matches: endedMatches });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Handling upcoming matches request
export const getUpcomingMatches = async (req, res) => {
  try {
    const result = await fetchUpcomingMatches();
    console.log(result.matches);

    res.status(200).json({ matches: result.matches });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getMatchDetail = async (req, res) => {
  const { matchId } = req.params; // Assuming the matchId is passed as a URL parameter

  try {
    const data = await fetchMatchDetails(matchId);

      console.log(data);
      return res.status(200).json(data);

  } catch (error) {
    console.error('Error fetching match data:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
