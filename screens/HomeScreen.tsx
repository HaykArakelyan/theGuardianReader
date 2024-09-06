import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import { RequestService } from '../Services/RequestService';
import { SingleNewsModel } from "../Models/SingleNewsModel";
import InputComponent from '../Components/InputComponent';
import TitleComponent from '../Components/TitleComponent';
import SubtitleComponent from '../Components/SubtitleComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import { isStringEmpty } from '../helpers';
import SingleNewsCardComponent from '../Components/SingleNewsCardComponent';
import { StorageService } from '../Services/StorageService';
import { useNetworkConnection } from '../hooks/useNetworkConnection';
import { Keyboard } from 'react-native';

const HomeScreen: React.FC = () => {
  const { isConnected } = useNetworkConnection();
  const [news, setNews] = useState<SingleNewsModel[]>([]);
  const [queryString, setQueryString] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    setNews([]);
    setPage(1);
    setHasMore(true);
    getAllNews(1);
  }, [isConnected]);

  const getAllNews = (page: number) => {
    isConnected
      ? getNewsFromApi(page)
      : getNewsFromStorage()
  };

  const getNewsFromApi = (page: number) => {
    RequestService.getAllNews(page, pageSize)
      .then(res => {
        const newNews = res.data.response.results;
        setNews(prevNews => [...prevNews, ...newNews]);
        setHasMore(newNews.length >= pageSize);
      }).catch(err => {
        console.error("Unable to Get News", err);
      });
  }

  const getNewsFromStorage = () => {
    StorageService.getKeys()
      .then(keys => {
        if (keys && keys.length > 0) {
          Promise.all(keys.map(key =>
            StorageService.get(key)
              .then(singleNews => singleNews)
              .catch(err => {
                console.log("Unable to Get a Key", { key, error: err });
                return null;
              })
          )).then(offlineNewsArray => {
            const filteredOfflineNews = offlineNewsArray.filter(news => news !== null) as SingleNewsModel[];
            setNews([...filteredOfflineNews]);
            setHasMore(false);
          }).catch(err => {
            console.log("Error in Processing Offline News", err);
          });
        } else {
          setNews([]);
          setHasMore(false);
        }
      })
      .catch(err => {
        console.log("Unable to Get Keys", err);
        setNews([]);
        setHasMore(false);
      });
  }

  const getNewsByQueryString = () => {
    Keyboard.dismiss();
    if (!isStringEmpty(queryString)) {
      RequestService.getNewsByQueryString(queryString, page, pageSize)
        .then(res => {
          setNews(res.data.response.results);
          setQueryString('');
        })
        .catch(err => console.error(err));
    }
  };

  const loadMoreData = () => {
    if (hasMore) {
      setPage(prevPage => {
        const newPage = prevPage + 1;
        getAllNews(newPage);
        return newPage;
      });
    }
  };

  const onRefreshButtonPress = () => {
    setNews([]);
    setPage(1);
    getAllNews(1);
  }

  const renderItem = ({ item }: { item: SingleNewsModel }) => (
    <SingleNewsCardComponent singleNews={item} key={item.id} />
  );

  return (
    <View style={styles.container}>
      <TitleComponent title='The Guardian Reader' />
      <SubtitleComponent title='All You Need To Be Aware' />

      <View style={styles.searchBlock}>
        <TouchableOpacity onPress={onRefreshButtonPress}>
          <Icon
            name="refresh"
            size={30}
            color="black"
          />
        </TouchableOpacity>

        <InputComponent
          onChange={setQueryString}
          value={queryString}
        />

        <TouchableOpacity onPress={getNewsByQueryString}>
          <Icon
            name="search"
            size={30}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text style={styles.centeredText}>Oops, You Don't Have Saved Data</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 5,
    paddingVertical: 10,
    flex: 1
  },
  searchBlock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  centeredText: {
    textAlign: "center",
    paddingTop: 40,
    fontStyle: "italic",
    fontSize: 20
  }
});

export default HomeScreen;