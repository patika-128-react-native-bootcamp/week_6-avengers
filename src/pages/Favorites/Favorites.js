import React, {useContext} from 'react';
import {View, Text, FlatList} from 'react-native';
import {MarvelContext} from '../../context/MarvelProvider';
import LottieView from 'lottie-react-native';
import styles from './Favorites.styles';

export default function Favorites() {
  const {state} = useContext(MarvelContext);

  const renderFavorite = ({item}) => <Text>{item.name}</Text>;

  return (
    <View style={styles.container}>
      {state.favoriteHeroes.length === 0 ? (
        <LottieView
          source={require('../../assets/empty.json')}
          autoPlay
          loop
        />
      ) : (
        <FlatList
        style={styles.container}
          data={state.favoriteHeroes}
          renderItem={renderFavorite}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
}
