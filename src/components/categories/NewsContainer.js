/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

const NewsContainer = ({ article }) => {
  const { title, description, urlToImage } = article;

  return (
    <>
      {article ? (
        <View style={styles.container}>
          {urlToImage ? (
            <Image
              source={{ uri: urlToImage }}
              style={styles.image}
              resizeMode="cover"
              onError={() => console.log('Image failed to load')}
              defaultSource={require('../assets/defaultnewsimg.jpg')} // Optional: Use a local placeholder image
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={{color:'black'}}>No Image Available</Text>
            </View>
          )}
          {title ? (
            <Text style={styles.title}>{title}</Text>
          ) : (
            <Text style={styles.title}>No title is there</Text>
          )}
          <Text style={styles.desc}>Description</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    margin: 10,
    width: '100%',
    marginBottom: 20,
  },
  desc: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
});

export default NewsContainer;
