import Touchable from '@components/Touchable';
import React from 'react';
import Icon from '@assets/iconfont';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Album} from './store/reducer';
import LOGO from '@assets/images/logo.png';
type IProps = {
  item: Album;
  onPress: (item: Album) => void;
};

const TextTag = (value: string, darkBg: boolean = false) => (
  <View style={[styles.textTag, darkBg ? {backgroundColor: '#c3c3c3'} : null]}>
    <Text style={{fontSize: 12}}>{value}</Text>
  </View>
);

const AlbumItem: React.FC<IProps> = ({item, onPress}) => {
  const press = () => {
    onPress(item);
  };
  return (
    <Touchable onPress={press} style={styles.container}>
      <View style={styles.item}>
        <Image
          source={item.title_file_url ? {uri: item.title_file_url} : LOGO}
          style={styles.image}
        />
        <View style={styles.rightView}>
          <View>
            <Text style={styles.titleText} numberOfLines={1}>
              {item.album_title}
            </Text>
            <Text style={styles.remarkText} numberOfLines={1}>
              更新时间:{item.update_time}
            </Text>
          </View>

          <View style={styles.bottomView}>
            {item.is_new ? TextTag('更新') : null}
            {item.is_free ? TextTag('付费') : null}
            {item.scale ? null : TextTag('海外', true)}
            {item.serialize_status
              ? TextTag('完结', true)
              : TextTag('连载', true)}
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
    fontWeight: '700',
    marginBottom: 5,
  },
  remarkText: {
    marginBottom: 10,
  },
  textTag: {
    backgroundColor: '#d52424',
    paddingLeft: 5,
    paddingRight: 5,
    color: '#2a0808',
    borderRadius: 2,
    marginRight: 5,
  },
  bottomView: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    marginBottom: 5,
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
