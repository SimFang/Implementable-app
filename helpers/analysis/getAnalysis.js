
import routes from '../../constants/routes.json'
const API_BASE_URL = routes.serverUrl+routes.getAnalysisFromId

export const getAnalysis = async (analysisId) => {
    try {
      const response = await fetch(`${API_BASE_URL}?analysisId=${encodeURIComponent(analysisId)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Failed to retrieve analysis');
      }
  
      return {
        success: true,
        message: data.message,
        data: data.data,
      };
    } catch (error) {
      console.error('Error calling getAnalysis:', error);
      return {
        success: false,
        error: error.message || 'An error occurred while retrieving analysis',
      };
    }
  };