import AsyncStorage from '@react-native-async-storage/async-storage';


// ---------------------Async Storage Get Set methods---------------------------
const storeHeroData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@FavoritedHeroes', jsonValue);
  } catch (e) {
    console.log(e);
  }
};
export async function getHeroData() {
  try {
    let jsonValue = await AsyncStorage.getItem('@FavoritedHeroes');
    return jsonValue === null ? null : JSON.parse(jsonValue);
  } catch (e) {
    console.log(e);
  }
}

const storeComicData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@FavoritedComics', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  export async function getComicData() {
    try {
      let jsonValue = await AsyncStorage.getItem('@FavoritedComics');
      return jsonValue === null ? null : JSON.parse(jsonValue);
    } catch (e) {
      console.log(e);
    }
  }


  // ----------------------------------------------------------------------------

export const setLoading = () => ({
  type: 'SET_LOADING',
});
export const setErrorData = error => ({
  type: 'SET_HEROES',
  payload: error,
});

export const setHeroData = heroList => ({
  type: 'SET_HEROES',
  payload: heroList,
});
export const setComicData = comicList => ({
  type: 'SET_COMICS',
  payload: comicList,
});

export const setFavoriteHeroesToState = favoriteHeroesList => ({
  type: 'SET_FAVORITE_HEROES',
  payload: favoriteHeroesList,
});

export const setFavoriteComicsToState = favoriteComicsList => ({
  type: 'SET_FAVORITE_COMICS',
  payload: favoriteComicsList,
});

// export const getHeroesFromApi = (heroData, dispatch) => {
//   const {heroes, heroError, heroLoading} = heroData;

//   if (heroLoading) {
//     dispatch(setLoading());
//   } else {
//     if (!!heroError) {
//       dispatch(setErrorData(heroError));
//     }
//     dispatch(setHeroData(heroes));
//   }
// };

// export const getComicsFromApi = (comicData, dispatch) => {
//   const {comics, comicError, comicLoading} = comicData;

//   if (comicLoading) {
//     dispatch(setLoading());
//   } else {
//     if (!!comicError) {
//       dispatch(setErrorData(comicError));
//     }
//     dispatch(setComicData(comics));
//   }
// };

export const setFavoriteHeroList = (hero, dispatch) => {
  dispatch(setLoading());
  let favoriteHeroList = [];
  getHeroData().then(data => {
    favoriteHeroList = data;

    if (favoriteHeroList.length === 0) {
      let updatedList = [hero];
      dispatch(setFavoriteHeroesToState(updatedList));
      storeHeroData(updatedList);
      return;
    }

    if (favoriteHeroList.length > 0) {
      const isFavorited = favoriteHeroList.findIndex(
        favoriteHero => favoriteHero.id === hero.id,
      );

      if (isFavorited < 0) {
        let updatedList = [...favoriteHeroList, hero];
        dispatch(setFavoriteHeroesToState(updatedList));
        storeHeroData(updatedList);
      } else {
        let updatedFavorites = [...favoriteHeroList];
        let filtered = updatedFavorites.filter(favoritedHero => {
          return favoritedHero.id !== hero.id;
        });
        dispatch(setFavoriteHeroesToState(filtered));
        storeHeroData(filtered);
      }
    }
  });
};


export const setFavoriteComicList = (comic, dispatch) => {
    dispatch(setLoading());
    let favoriteComicList = [];
    getComicData().then(data => {
      favoriteComicList = data;
  
      if (favoriteComicList.length === 0) {
        let updatedList = [comic];
        dispatch(setFavoriteComicsToState(updatedList));
        storeComicData(updatedList);
        return;
      }
  
      if (favoriteComicList.length > 0) {
        const isFavorited = favoriteComicList.findIndex(
          favoriteComic => favoriteComic.id === comic.id,
        );
  
        if (isFavorited < 0) {
          let updatedList = [...favoriteComicList, comic];
          dispatch(setFavoriteComicsToState(updatedList));
          storeComicData(updatedList);
        } else {
          let updatedFavorites = [...favoriteComicList];
          let filtered = updatedFavorites.filter(favoritedComic => {
            return favoritedComic.id !== hero.id;
          });
          dispatch(setFavoritecomicsToState(filtered));
          storeComicData(filtered);
        }
      }
    });
  };





export const getFavoritedHeroesList = async  (dispatch) => {
  let favoriteHeroes = [];

  let localStorageData = await getHeroData();
  localStorageData === null
    ? (favoriteHeroes = [])
    : (favoriteHeroes = localStorageData);
    dispatch(setFavoriteHeroesToState(favoriteHeroes))
};

export const getFavoritedComicsList = async  (dispatch) => {
    let favoriteComics = [];
  
    let localStorageData = await getComicData();
    localStorageData === null
      ? (favoriteComics = [])
      : (favoriteComics = localStorageData);
      dispatch(setFavoriteComicsToState(favoriteComics))
  };
  



