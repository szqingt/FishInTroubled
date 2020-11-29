import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {IQueryParams, queryAlbumList} from './store/action';
import {useDispatch, useSelector} from 'react-redux';
import AlbumItem from './AlbumList';
import Empty from '@components/Empty';
import {Album} from './store/reducer';

const Home: React.FC = () => {
  const {albumList} = useSelector((store) => store.home);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  console.log('render Home');
  const [queryParams, setQueryParams] = useState<IQueryParams>({
    aclassify_id: 3,
    page: 1,
    keyword: '',
    loadMore: false,
  });
  useEffect(() => {
    if (isLoading || (albumList.length >= 100 && queryParams.loadMore)) {
      return;
    }
    setLoading(true);
    queryAlbumList(queryParams)(dispatch).then(() => {
      setLoading(false);
    });
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

  // const navigation = useNavigation();
  const onPress = (item: Album) => {
    // navigation.navigate('Album', {item});
    // todo go details
    console.log(item);
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
    <FlatList
      style={styles.flatList}
      data={albumList}
      renderItem={WrapAlbumItem}
      refreshing={isLoading}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      ListFooterComponent={renderFooter}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={Empty}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  endContainer: {
    margin: 10,
    alignItems: 'center',
  },
  endText: {
    color: '#eee',
  },
});

export default Home;
