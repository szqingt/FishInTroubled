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
import {bugAlbum, getAlbumInfo} from '@services/index';
import LOGO from '@assets/images/logo.png';
import {getRandomColor} from '@utils/index';
import Empty from '@components/Empty';
import { StackNavigationProp } from '@react-navigation/stack';

const ProgramItem = ({
  item,
  onPress,
}: {
  item: Progrma;
  onPress: (id: string) => void;
}) => {
  const press = () => {
    onPress(item.program_id);
  };
  return (
    <Flex style={styles.programItem}>
      <Flex.Item>
        <Text>{item.program_name}</Text>
        <Text style={styles.rogramSubText}>
          {item.file_size}M {'   ' + item.update_time}
        </Text>
      </Flex.Item>
      <View>
        <Button size="small" disabled={item.is_gain !== '1'} onPress={press}>
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
  const navigation = useNavigation<
    StackNavigationProp<MainStackParmList, 'Detail'>
  >();

  useEffect(() => {
    getAlbumInfo(id).then((res) => {
      setInfo(res as AlbumInfo);
    });
  }, [id]);

  if (!albumInfo) {
    return null;
  }

  const onPress = (programId: string) => {
    navigation.navigate('Listen', {id: programId});
  };

  const WarpItem = ({item}: ListRenderItemInfo<Progrma>) => (
    <ProgramItem item={item} onPress={onPress} />
  );

  const {albumInfo: albumDetil, programList, albumTagList} = albumInfo;

  const gain = async () => {
    try {
      await bugAlbum(albumDetil.album_id);
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
                albumDetil.title_file_url
                  ? {uri: albumDetil.title_file_url}
                  : LOGO
              }
              style={styles.coverImage}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.titleText} numberOfLines={2}>
              {albumDetil.album_title}
            </Text>
            <Text style={styles.descText} numberOfLines={3}>
              {albumDetil.album_desc}
            </Text>
            <Text style={{color: 'green'}} numberOfLines={3}>
              {albumDetil.serialize_status ? '完结' : '连载中'}
            </Text>
          </View>
          <Flex.Item style={styles.opreationContainer}>
            <Button
              size="small"
              onPress={gain}
              disabled={albumDetil.is_gain === '1'}>
              {albumDetil.is_gain === '1' ? '已购买' : '￥' + albumDetil.price}
            </Button>
          </Flex.Item>
        </Flex>
      </WingBlank>
      <Flex justify="start" wrap="wrap" style={{marginBottom: 10}}>
        {albumTagList.map((tag) => (
          <Text style={{...styles.tag, backgroundColor: getRandomColor()}}>
            {tag.tag_name}
          </Text>
        ))}
      </Flex>
      <FlatList
        data={programList}
        renderItem={WarpItem}
        ListEmptyComponent={Empty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
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
