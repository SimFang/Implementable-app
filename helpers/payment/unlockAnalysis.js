import routes from '../../constants/routes.json';
import { getAuth } from 'firebase/auth';

export async function unlockAnalysis(analysisId) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('User not authenticated');
    }
    const idToken = user.uid;

    const response = await fetch(routes.serverUrl + routes.unlockAnalysis, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
      body: JSON.stringify({ analysisId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to unlock analysis');
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error('Unlock error:', error.message);
    return { success: false, error: error.message };
  }
}