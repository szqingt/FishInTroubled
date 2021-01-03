import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {IQueryParams, queryAlbumList} from './store/action';
import {useDispatch, useSelector} from 'react-redux';
import AlbumItem from './AlbumItem';
import Empty from '@components/Empty';
import {Album} from './store/reducer';
import {SearchBar} from '@ant-design/react-native';
import {navigate, statusBarHeight} from '@utils/index';

const Header: React.FC<{onSubmit: (val: string) => void}> = ({onSubmit}) => {
  const [search, setSearch] = useState('');
  return (
    <View>
      <SearchBar
        value={search}
        placeholder="搜索"
        onSubmit={(value) => onSubmit(value)}
        onChange={(value) => setSearch(value)}
      />
    </View>
  );
};

const Home: React.FC = () => {
  const {albumList} = useSelector((store) => store.home);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [queryParams, setQueryParams] = useState<IQueryParams>({
    aclassify_id: 2,
    page: 1,
    keyword: '',
    loadMore: false,
  });

  useEffect(() => {
    let isUnmounted = false;
    if (isLoading || (albumList.length >= 100 && queryParams.loadMore)) {
      return;
    }
    setLoading(true);
    queryAlbumList(queryParams)(dispatch).then(() => {
      if (!isUnmounted) {
        setLoading(false);
      }
    });
    return () => {
      isUnmounted = true;
      setLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  const onRefresh = () => {
    setQueryParams({
      ...queryParams,
      keyword: '',
      page: 1,
      loadMore: false,
    });
  };

  const onEndReached = () => {
    const page = queryParams.page + 1;
    setQueryParams({
      ...queryParams,
      page,
      loadMore: true,
    });
  };

  const search = (keyword: string) => {
    setQueryParams({
      ...queryParams,
      keyword,
      page: 1,
      loadMore: false,
    });
  };

  // const navigation = useNavigation();
  const onPress = (item: Album) => {
    navigate('MainStackParmList', {
      screen: 'Detail',
      params: {
        id: item.album_id,
      },
    });
  };

  const WrapAlbumItem = ({item}: ListRenderItemInfo<Album>) => {
    return <AlbumItem item={item} onPress={onPress} />;
  };
  const renderFooter = () => {
    if (albumList.length >= 100) {
      return (
        <View style={styles.endContainer}>
          <Text style={styles.endText}>没有更多了...</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Header onSubmit={search} />
      <FlatList
        data={albumList}
        renderItem={WrapAlbumItem}
        refreshing={isLoading}
        onEndReached={onEndReached}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            colors={['#f86442']}
          />
        }
        onEndReachedThreshold={0.1}
        ListEmptyComponent={Empty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: statusBarHeight,
  },
  endContainer: {
    margin: 5,
    alignItems: 'center',
  },
  endText: {
    color: '#eee',
  },
});

export default Home;
