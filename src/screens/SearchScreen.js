import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { searchSongs } from '../utils/api';
import SongItem from '../components/SongItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [favorites, setFavorites] = useState({});

  const handleSearch = async () => {
    const results = await searchSongs(query);
    setSongs(results);
  };

  const toggleFavorite = async (song) => {
    const updatedFavorites = { ...favorites };
    if (updatedFavorites[song.trackId]) {
      delete updatedFavorites[song.trackId];
      PushNotification.localNotification({
        title: song.trackName,
        message: `Removed '${song.trackName}' from favorite`,
        largeIconUrl: song.artworkUrl100,
      });
    } else {
      updatedFavorites[song.trackId] = song;
      PushNotification.localNotification({
        title: song.trackName,
        message: `Successfully added '${song.trackName}' to favorite`,
        largeIconUrl: song.artworkUrl100,
      });
    }
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
  
  React.useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    };
    loadFavorites();
  }, []);
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by song or artist"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      <FlatList
  data={songs}
  keyExtractor={(item) => item.trackId.toString()}
  renderItem={({ item }) => (
    <SongItem
      song={item}
      onPress={() => navigation.navigate('Detail', { song: item })}
      isFavorite={!!favorites[item.trackId]}
      onFavoriteToggle={() => toggleFavorite(item)}
    />
  )}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default SearchScreen;
