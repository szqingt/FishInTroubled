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

const TextTag = (value: string) => (
  <View style={styles.textTag} key={value}>
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
          source={item.titleFilePath ? {uri: item.titleFilePath} : LOGO}
          style={styles.image}
        />
        <View style={styles.rightView}>
          <View>
            <Text style={styles.titleText} numberOfLines={1}>
              {item.albumName}
            </Text>
            <Text style={styles.remarkText} numberOfLines={1}>
              更新时间:{item.updateTimeStr}
            </Text>
          </View>

          <View style={styles.bottomView}>
            {item.albumFlag.map((text) => {
              return TextTag(text);
            })}
          </View>

          <View style={styles.bottomView}>
            <View style={styles.playedView}>
              <Icon name="icon-Listen" size={14} />
              <Text style={{marginLeft: 5}}>{item.playNum}</Text>
            </View>
            <View style={styles.playingView}>
              <Icon name="icon-Comment" size={14} />
              <Text style={{marginLeft: 5}}>{item.playNum}</Text>
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
