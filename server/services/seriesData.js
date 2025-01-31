import axios from "axios";

export const fetchSeriesInfo = async (series_id) => {
    const API_URL = process.env.SERIES_INFO_API_URL;
    const API_KEY = process.env.API_KEY1;
  
    try {
      const response = await axios.get(API_URL, {
        params: { 
            apikey: API_KEY,
            id: series_id
         },
        
      });
      
      if (response.data && response.data.data) {
        return { seriesInfo: response.data.data
        };
      }
    } catch (error) {
      console.error("Error fetching upcoming matches:", error);
    }
  };