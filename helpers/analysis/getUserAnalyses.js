import routes from '../../constants/routes.json'
const url = routes.serverUrl+routes.getUserAnalyses
import { getAuth } from "firebase/auth";


export async function getUserAnalyses() {
  const auth = getAuth();
  // Get the Firebase ID token of the current user
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not logged in");
  }

  const idToken = await user.getIdToken();

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error || 'Failed to fetch analyses';
    throw new Error(errorMessage);
  }
  const data = await response.json();
  return data.analyses || [];
}