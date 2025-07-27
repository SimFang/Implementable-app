import routes from "../../constants/routes.json";

export const updateUserField = async (userId, parameter, value ) => {
    try {
      const response = await fetch(routes.serverUrl + routes.updateUserUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, parameter, value }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update user field');
      }
  
      return data;
    } catch (error) {
      console.error('Error updating user field:', error);
      throw error;
    }
  };