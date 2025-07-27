import routes from '../../constants/routes.json'

export async function acceptAgreement(processId) {
    try {
      const response = await fetch(routes.serverUrl+routes.acceptAgreement, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ processId }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        return { success: false, error: data.error || 'Unknown error' };
      }
  
      return { success: true, data: data };
    } catch (error) {
      console.error('Error accepting agreement:', error);
      return { success: false, error: 'Network error' };
    }
  }