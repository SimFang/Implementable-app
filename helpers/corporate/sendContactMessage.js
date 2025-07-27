// helpers/contact/sendContactMessage.ts
import routes from '../../constants/routes.json';

const destination = routes.serverUrl + routes.sendContactMessage;

export async function sendContactMessage(payload){
  try {
    const res = await fetch(destination, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to send message');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending contact message:', error.message);
    return { success: false, error: error.message };
  }
}