
import routes from '../../constants/routes.json'
const API_BASE_URL = routes.serverUrl+routes.sendAnswers

export const updateProcessInput = async (processId, questions, userId) => {

  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        processId,
        questions,
        userId
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to update process input');
    }

    return {
      success: true,
      message: data.message,
      analysisId: data.analysisId,
    };
  } catch (error) {
    console.error('Error calling updateProcessInput:', error);
    return {
      success: false,
      error: error.message || 'An error occurred while updating process input',
    };
  }
};