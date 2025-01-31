import { fetchSeriesInfo } from '../services/seriesData.js';

export const getSeriesInfo = async (req, res) => {
  const { seriesId } = req.params; // Assuming the seriesId is passed as a URL parameter

  try {
    const data = await fetchSeriesInfo(seriesId);
    
    console.log(data);

    if (data.seriesData && data.seriesData.length > 0) {
        console.log(data);
        
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: `Series with ID ${seriesId} not found` });
        }
  } catch (error) {
    console.error('Error fetching series data:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
