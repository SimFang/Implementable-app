import routes from "../../constants/routes.json";


export const signupUser = async (email, password) => {
  console.log("signup request called on the front end")
  try {
    const response = await fetch(routes.serverUrl + routes.signUpUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data)

    if (!response.ok) throw new Error(data.error || 'Signup failed');

    return data;
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async (email, code) => {
  try {
    const response = await fetch(`${routes.serverUrl}/api/users/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Email verification failed');

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await fetch(`${routes.serverUrl}/api/users/${userId}/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Profile update failed');

    return data;
  } catch (error) {
    throw error;
  }
};