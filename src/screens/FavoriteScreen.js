import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import SongItem from '../components/SongItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
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
      <FlatList
        data={Object.values(favorites)}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={({ item }) => (
          <SongItem
            song={item}
            onPress={() => navigation.navigate('Detail', { song: item })}
            isFavorite={true}
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
});

export default FavoriteScreen;
