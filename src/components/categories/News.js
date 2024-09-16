/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import NewsContainer from './NewsContainer';

const News = ({navigation}) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);

  const handleSearch = () => {
    console.log(query);
  };

  const handleNavigation = () =>{
    navigation.navigate('Home');
  };

  useEffect(() => {
    fetch(
      'https://newsapi.org/v2/everything?q=tesla&from=2024-07-15&sortBy=publishedAt&apiKey=280e56842b764c0080757e73e46270c6',
    )
      .then(response => response.json())
      .then(json => {
        setArticles(json.articles);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icons
          name="navigate-before"
          size={30}
          color="#000"
          onPress={() => handleNavigation()}
          style={styles.navigation}
        />
        <Icons
          name="search"
          size={25}
          color="#000"
          onPress={() => setSearchVisible(!searchVisible)}
          style={styles.searchIcon}
        />
        <Icons
          name="notifications"
          size={25}
          color="#000"
          style={styles.searchIcon}
        />
      </View>
      {searchVisible && (
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          placeholderTextColor='black'
        />
      )}
      <View style={styles.titleHeader}>
        <Text style={styles.BreakingNews}>Breaking News</Text>
        <Text style={styles.viewall}>View all</Text>
      </View>
      <View style={styles.bodyContainer}>
        <FlatList
          data={articles}
          renderItem={({ item }) => <NewsContainer article={item} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    color:'black',
  },
  navigation: {
    marginRight: '63%',
  },
  BreakingNews: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  titleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewall: {
    color: '#3498db',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bodyContainer: {
    margin: 10,
  },
  flatListContainer: {
    alignItems: 'center', // Centers items horizontally
  },
});

export default News;
