import routes from "../../constants/routes.json";

const latestUrl = routes.serverUrl + routes.getLatestArticles;
const olderUrl = routes.serverUrl + routes.getOlderArticles;

/**
 * Fetches the 5 most recent articles
 * @returns {Promise<Array>} List of latest articles
 */
export async function fetchLatestArticles() {
  try {
    const response = await fetch(latestUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch latest articles");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchLatestArticles:", error);
    return [];
  }
}

/**
 * Fetches all articles except the 5 most recent ones
 * @returns {Promise<Array>} List of older articles
 */
export async function fetchOlderArticles() {
  try {
    const response = await fetch(olderUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch older articles");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchOlderArticles:", error);
    return [];
  }
}

export async function getRecommendations(excludeTitle) {
  try {
    const response = await fetch(`${routes.serverUrl + routes.getRecommendations}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ excludeTitle }) // Send in the body
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recommendations');
    }

    return await response.json();
  } catch (err) {
    console.error('Recommendation fetch error:', err);
    return [];
  }
}