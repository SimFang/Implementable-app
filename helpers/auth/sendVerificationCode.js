import routes from "../../constants/routes.json";

export const sendVerificationCode = async (email) => {
  try {
    const response = await fetch(routes.serverUrl + routes.verifyEmailUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Verification failed');
    }

    return data; // { success: true, code: "123456" }
  } catch (error) {
    console.error('Verification error:', error);
    // TESTING PURPOSE, please remove the following line for production 
    return { success : false, code : "000000"}
    throw error 
  }
};