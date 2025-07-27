import { getAuth } from "firebase/auth";
import routes from '../../constants/routes.json';

export async function fetchUserCredits() {
  const auth = getAuth();

  try {
    // Get the Firebase ID token of the current user
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not logged in");
    }
    const idToken = await user.getIdToken();

    const response = await fetch(routes.serverUrl + routes.getUserCredits, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch credits");
    }

    const data = await response.json();

    // data.creditsPurchased is returned
    return data.creditsPurchased;

  } catch (error) {
    console.error("Error fetching user credits:", error);
    throw error;
  }
}