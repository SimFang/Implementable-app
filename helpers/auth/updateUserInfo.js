import routes from "../../constants/routes.json";

export async function updateName(userId, name) {
    const response = await fetch(routes.serverUrl+routes.updateUsername, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, name }),
    });
  
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to update name');
    return data;
  }

  export async function updateBio(userId, bio) {
    const response = await fetch(routes.serverUrl+routes.updateBio, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, bio }),
    });
  
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to update bio');
    return data;
  }

  export async function updateCountry(userId, country) {
    const response = await fetch(routes.serverUrl+routes.updateCountry, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, country }),
    });
  
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to update country');
    return data;
  }