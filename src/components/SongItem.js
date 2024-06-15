import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const SongItem = ({ song, onPress, isFavorite, onFavoriteToggle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: song.artworkUrl100 }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{song.trackName}</Text>
        <Text style={styles.artist}>{song.artistName}</Text>
      </View>
      <TouchableOpacity onPress={onFavoriteToggle}>
        <Text style={styles.favorite}>{isFavorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
  },
  favorite: {
    fontSize: 24,
  },
});

export default SongItem;
