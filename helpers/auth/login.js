// helpers/auth/login.ts
import routes from '../../constants/routes.json'

export const login = async (firebaseIdToken) => {
  const response = await fetch(`${routes.serverUrl}${routes.loginUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${firebaseIdToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to log in to backend');
  }

  const data = await response.json();
  console.log(data)
  if (!data.verifiedEmail) {
    throw new Error('Email is not verified');
  }

  return data; // expected to contain userId, email, name, profile_picture, accessToken
};