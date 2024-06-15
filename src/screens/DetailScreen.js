import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DetailScreen = ({ route }) => {
  const { song } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: song.artworkUrl100 }} style={styles.image} />
      <Text style={styles.title}>{song.trackName}</Text>
      <Text style={styles.artist}>{song.artistName}</Text>
      <Text style={styles.album}>{song.collectionName}</Text>
      <Text style={styles.genre}>{song.primaryGenreName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  artist: {
    fontSize: 18,
    marginBottom: 10,
  },
  album: {
    fontSize: 16,
    marginBottom: 10,
  },
  genre: {
    fontSize: 14,
  },
});

export default DetailScreen;
