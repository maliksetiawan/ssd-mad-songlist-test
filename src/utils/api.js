const API_URL = 'https://itunes.apple.com/search';

export const searchSongs = async (term, entity = 'musicTrack') => {
  try {
    const response = await fetch(`${API_URL}?term=${term}&entity=${entity}&limit=30`);
    const result = await response.json();
    return result.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
