import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {MainStackParmList} from 'navigator/MainStack';
import {Button, Flex, Toast, WingBlank} from '@ant-design/react-native';
import {
  bugAlbum,
  getAlbumInfo,
  getProgramList,
  QueryProgramParams,
} from '@services/index';
import LOGO from '@assets/images/logo.png';
import {getRandomColor} from '@utils/index';
import Empty from '@components/Empty';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {SET_ALBUM_INFO} from '@store/playInfo';

const ProgramItem = ({
  item,
  onPress,
}: {
  item: Progrma;
  onPress: (progrma: Progrma) => void;
}) => {
  const press = () => {
    onPress(item);
  };
  return (
    <Flex style={styles.programItem}>
      <Flex.Item>
        <Text>{item.programName}</Text>
        <Text style={styles.rogramSubText}>{item.updateTimeStr}</Text>
      </Flex.Item>
      <View>
        <Button size="small" disabled={!item.hasProgram} onPress={press}>
          播放
        </Button>
      </View>
    </Flex>
  );
};

const Detail: React.FC = () => {
  const route = useRoute<RouteProp<MainStackParmList, 'Detail'>>();
  const id = route.params.id;
  const [albumInfo, setInfo] = useState<AlbumInfo>();
  const [programList, setProgramList] = useState<Progrma[]>([]);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<QueryProgramParams>({
    pageIndex: 1,
    albumId: id,
  });
  const dispatch = useDispatch();
  const navigation = useNavigation<
    StackNavigationProp<MainStackParmList, 'Detail'>
  >();

  useEffect(() => {
    (async () => {
      const alnumInfo = await getAlbumInfo(id);
      setInfo(alnumInfo);
      const {records} = await getProgramList(queryParams);
      setProgramList(records);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      if (isEnd) {
        return;
      }
      const {records, pages} = await getProgramList(queryParams);
      if (queryParams.pageIndex === pages) {
        setIsEnd(true);
      }
      setProgramList([...programList, ...records]);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  if (!albumInfo) {
    return null;
  }

  const onEndReached = () => {
    const pageIndex = queryParams.pageIndex + 1;
    setQueryParams({
      ...queryParams,
      pageIndex,
    });
  };

  const onPress = (program: Progrma) => {
    navigation.navigate('Listen', {id: program.programId});
    dispatch({
      type: SET_ALBUM_INFO,
      album: albumInfo,
    });
  };

  const WarpItem = ({item}: ListRenderItemInfo<Progrma>) => (
    <ProgramItem item={item} onPress={onPress} />
  );

  const gain = async () => {
    try {
      await bugAlbum(albumInfo.albumId);
      const newAlbumInfo = await getAlbumInfo(id);
      setInfo(newAlbumInfo);
      Toast.success('购买成功！');
    } catch (e) {
      const {data} = e;
      Toast.fail(data.message || '购买失败!');
    }
  };
  return (
    <View style={styles.detailContainer}>
      <WingBlank style={styles.albumContainer}>
        <Flex align="start" style={styles.album}>
          <View style={styles.albumCover}>
            <Image
              source={
                albumInfo.titleFilePath ? {uri: albumInfo.titleFilePath} : LOGO
              }
              style={styles.coverImage}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.titleText} numberOfLines={2}>
              {albumInfo.albumName}
            </Text>
            <Text style={styles.descText} numberOfLines={3}>
              {albumInfo.albumDesc}
            </Text>
            <Text style={{color: 'green'}} numberOfLines={3}>
              {albumInfo.serializeStatus ? '完结' : '连载中'}
            </Text>
          </View>
          <Flex.Item style={styles.opreationContainer}>
            <Button size="small" onPress={gain} disabled={!!albumInfo.hasAlbum}>
              {albumInfo.hasAlbum ? '已购买' : '￥' + albumInfo.albumPrice}
            </Button>
          </Flex.Item>
        </Flex>
      </WingBlank>
      <Flex justify="start" wrap="wrap" style={{marginBottom: 10}}>
        {albumInfo.albumTag.map((tagName) => (
          <Text
            key={tagName}
            style={{...styles.tag, backgroundColor: getRandomColor()}}>
            {tagName}
          </Text>
        ))}
      </Flex>
      <FlatList
        data={programList}
        renderItem={WarpItem}
        ListEmptyComponent={Empty}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  albumContainer: {
    marginBottom: 5,
  },
  album: {
    marginTop: 10,
  },
  albumCover: {},
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 3,
    paddingLeft: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
  },
  descText: {
    fontSize: 12,
    marginBottom: 10,
  },
  opreationContainer: {
    width: 40,
  },
  tag: {
    marginLeft: 5,
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    color: '#fff',
    marginBottom: 3,
  },
  programItem: {
    height: 50,
    borderTopWidth: 0.5,
    borderTopColor: '#acacac',
    paddingHorizontal: 6,
  },
  rogramSubText: {
    fontSize: 12,
    color: '#acacac',
  },
});

export default Detail;
