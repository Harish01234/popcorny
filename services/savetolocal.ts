import AsyncStorage from '@react-native-async-storage/async-storage';

interface Movies {
  id: number | null;
  title: string | null;
  poster_path: string | null;
}

export const saveData = async (movie: Movies) => {
  try {
    const data = await AsyncStorage.getItem('favorites');
    const favorites = data ? JSON.parse(data) : [];

    const isAlreadySaved = favorites.find((m: Movie) => m.id === movie.id);
    if (isAlreadySaved) {
      console.log('Movie already in favorites:', movie.title);
      return;
    }

    favorites.push(movie);
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('Movie saved:', movie.title);
  } catch (error) {
    console.error('Error saving movie:', error);
  }
};

export const getData = async (): Promise<Movie[]> => {
  try {
    const data = await AsyncStorage.getItem('favorites');
    const favorites = data ? JSON.parse(data) : [];
    return favorites;
  } catch (error) {
    console.error('Error getting saved movies:', error);
    return [];
  }
};

export const deleteData = async (movieId: number) => {
  try {
    const data = await AsyncStorage.getItem('favorites');
    const favorites = data ? JSON.parse(data) : [];

    const updatedFavorites = favorites.filter((m: Movie) => m.id !== movieId);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    console.log('Movie deleted with id:', movieId);
  } catch (error) {
    console.error('Error deleting movie:', error);
  }
};


