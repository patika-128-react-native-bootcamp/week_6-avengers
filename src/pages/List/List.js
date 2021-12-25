import React, {useState , useContext} from 'react';
import {View, FlatList, TouchableOpacity, TextInput} from 'react-native';
import CharacterListCard from '../../components/CharacterCards/CharacterListCard';
import routes from '../../Navigation/routes';
import {useNavigation} from '@react-navigation/core';
import useHeroData from '../../context/data/useHeroData';
import I18n from '../../lang/_i18n';
import Search from './../../components/Search/Search';
import LottieView from 'lottie-react-native';
import styles from './List.styles'
import { MarvelContext } from './../../context/MarvelProvider';
export default function List() {
  const navigation = useNavigation();

  const {state} = useContext(MarvelContext)

  const [searchValue, setSearchValue] = useState('');

  const {fetchHeroes, heroLoading, heroes} = useHeroData();

  function handleHeroSearch() {
    const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchValue}&orderBy=name&ts=100&apikey=efcbf1c5b56e5c77cf9bb79cb4a164be&hash=8ad8de2dec0d80436a3ec5414494217c`;
    if (searchValue === '') {
      fetchHeroes();
      return;
    }
    fetchHeroes(url);
  }

  const renderItem = ({item}) => (
      <TouchableOpacity style={styles.cardContainerStyles}
        onPress={() => navigation.navigate(routes.DETAIL_PAGE, {hero: item})}>
        <CharacterListCard hero={item} mode={state.mode}/>
      </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {!heroLoading ? (
        <View style={styles.container}>
          <TextInput
          style={styles.searchStyles}
            placeholder={I18n.t('search_placeholder')}
            onChangeText={setSearchValue}
            onSubmitEditing={handleHeroSearch}
            value={searchValue}
          />
          <FlatList
            style={styles.flatListStyles}
            data={heroes}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      ) : (
        <LottieView
          source={require('../../assets/iron-man.json')}
          autoPlay
          loop
        
        />
      )}
    </View>
  );
}
