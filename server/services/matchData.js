import axios from "axios";

export const fetchMatches = async () => {
  const API_URL = process.env.CURRENT_MATCHES_API_URL;
  const API_KEY = process.env.API_KEY1;

  try {
    const response = await axios.get(API_URL, {
      params: {
        apikey: API_KEY,
      },
    });

    if (response.data && response.data.data) {
      const allMatches = response.data.data;

      // Filter matches based on whether they have ended or not
      const liveMatches = allMatches.filter(match => !match.matchEnded);
      const endedMatches = allMatches.filter(match => match.matchEnded);

      // Log or use these arrays as needed
      console.log("Live Matches:", liveMatches);
      console.log("Ended Matches:", endedMatches);

      return { liveMatches, endedMatches};
    }
  } catch (error) {
    console.error("Error fetching matches:", error);
  }
};


export const fetchUpcomingMatches = async () => {
  const API_URL = process.env.ESCORE_API_URL;
  const API_KEY = process.env.API_KEY1;

  try {
    const response = await axios.get(API_URL, {
      params: { apikey: API_KEY },
    });

    if (response.data && response.data.data) {
      // Filter to include only matches with "ms": "fixture"
      const fixtureMatches = response.data.data.filter(
        (match) => match.ms === "fixture"
      );
      return { matches: fixtureMatches };
    }
  } catch (error) {
    console.error("Error fetching upcoming matches:", error);
    return { matches: [] };
  }
};

export const fetchMatchDetails = async (matchId) => {
  const API_URL = process.env.MATCH_DETAILS_API_URL;
  const API_KEY = process.env.API_KEY1;
  try {
    const response = await axios.get(API_URL, {
      params: {
        apikey: API_KEY,
        id: matchId,
      },
    },
    );

    const matchDetail = response.data.data;    
    return matchDetail;

  } catch (error) {
    console.error("Error fetching upcoming matches:", error);
  }
  
}







