import routes from '../../constants/routes.json'


async function createProcess(websiteUrl) {
    try {
      const response = await fetch(routes.serverUrl+routes.createProcess, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ website_url: websiteUrl }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create process');
      }
  
      return {
        success: true,
        data: {
          message: data.message,
          processId: data.processId,
          questions: data.questions || [],
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
  
  export { createProcess };