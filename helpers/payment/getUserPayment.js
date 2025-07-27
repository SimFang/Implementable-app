import { getAuth } from "firebase/auth";
import routes from '../../constants/routes.json';

export async function fetchUserPayments() {
  const auth = getAuth();

  try {
    // Get the Firebase ID token of the current user
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not logged in");
    }

    const idToken = await user.getIdToken();

    // Call the backend endpoint
    const response = await fetch(routes.serverUrl+routes.getUserPayment, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch payments");
    }

    const data = await response.json();

    // data.creditsPurchased and data.transactions
    return data;

  } catch (error) {
    console.error("Error fetching user payments:", error);
    throw error; // Let the caller handle it
  }
}