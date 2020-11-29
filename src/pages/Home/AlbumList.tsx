import Touchable from '@components/Tachable';
import React from 'react';
import Icon from '@assets/iconfont';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Album} from './store/reducer';
import {LOGO_URL} from '@config/consts';
type IProps = {
  item: Album;
  onPress: (item: Album) => void;
};

const AlbumItem: React.FC<IProps> = ({item, onPress}) => {
  const url = item.title_file_url || LOGO_URL;

  const press = () => {
    onPress(item);
  };
  return (
    <Touchable onPress={press} style={styles.container}>
      <View style={styles.item}>
        <Image source={{uri: url}} style={styles.image} />
        <View style={styles.rightView}>
          <View style={{flex: 1}}>
            <Text style={styles.titleText} numberOfLines={2}>
              {item.album_title}
            </Text>
            <Text style={styles.remarkText} numberOfLines={2}>
              更新时间:{item.update_time}
            </Text>
          </View>

          <View style={styles.bottomView}>
            <View style={styles.playedView}>
              <Icon name="icon-Listen" size={14} />
              <Text style={{marginLeft: 5}}>{item.play_num}</Text>
            </View>
            <View style={styles.playingView}>
              <Icon name="icon-Comment" size={14} />
              <Text style={{marginLeft: 5}}>{item.replay_num}</Text>
            </View>
          </View>
        </View>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowColor: '#ccc',
    elevation: 80,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#dedede',
  },
  rightView: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    marginBottom: 10,
  },
  remarkText: {
    padding: 5,
  },
  bottomView: {
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  playedView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  playingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AlbumItem;
