import { getAuth } from 'firebase/auth';
import routes from '../../constants/routes.json';

export async function deleteUser() {
    const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not logged in");
  }
  const idToken = await user.getIdToken();

  try {
    const response = await fetch(routes.serverUrl + routes.deleteUser, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete user');
    }

    return await response.json(); // { message: "User ... deleted successfully" }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}