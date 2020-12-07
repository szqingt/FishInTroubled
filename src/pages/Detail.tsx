import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {MainStackParmList} from 'navigator/MainStack';
import {Button, Flex, WingBlank} from '@ant-design/react-native';
import {getAlbumInfo} from '@services/index';
import LOGO from '@assets/images/logo.png';
import {getRandomColor} from '@utils/index';

const Detail: React.FC = () => {
  const route = useRoute<RouteProp<MainStackParmList, 'Detail'>>();
  const id = route.params.id;
  const [albumInfo, setInfo] = useState<AlbumInfo>();

  useEffect(() => {
    getAlbumInfo(id).then((res) => {
      setInfo(res as AlbumInfo);
    });
  }, [id]);

  if (!albumInfo) {
    return null;
  }

  const {albumInfo: albumDetil, progrmaList, albumTagList} = albumInfo;

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
            <Button size="small">按钮1</Button>
          </Flex.Item>
        </Flex>
        <Flex justify="start" style={{marginBottom: 10}}>
          {albumTagList.map((tag) => (
            <Text style={{...styles.tag, backgroundColor: getRandomColor()}}>
              {tag.tag_name}
            </Text>
          ))}
        </Flex>
      </WingBlank>
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
  },
});

export default Detail;
