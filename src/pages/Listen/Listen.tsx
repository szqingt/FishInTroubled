import React, {useEffect} from 'react';
import {View, StyleSheet, Animated, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {play, PlayInfoAction} from '@store/playInfo';
import {LOGO_URL} from '@config/consts';
import {Dispatch} from 'redux';
import PlayBar from './PlayBar';
import {MainStackParmList} from 'navigator/MainStack';
import {RouteProp, useRoute} from '@react-navigation/native';
import {getProgramInfo} from '@services/index';

const Listen: React.FC = () => {
  const route = useRoute<RouteProp<MainStackParmList, 'Listen'>>();
  const {album, program} = useSelector((state) => state.palyInfo);
  const dispatch = useDispatch<Dispatch<PlayInfoAction>>();
  const id = route.params.id;
  useEffect(() => {
    (async () => {
      if (id && id !== program?.programId) {
        const newProgram = await getProgramInfo(id);
        play(dispatch, newProgram);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const anim = new Animated.Value(1);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageView}>
          <Animated.Image
            style={[
              styles.image,
              {
                transform: [
                  {
                    scale: anim,
                  },
                ],
              },
            ]}
            source={{
              uri: album?.titleFilePath || LOGO_URL,
            }}
          />
        </View>
        <View style={styles.programView}>
          <Text style={styles.programTitle}>{program?.programName}</Text>
          <Text style={styles.programAuthor}>{album?.albumName}</Text>
        </View>
      </View>
      <PlayBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c5656',
  },
  scroll: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    right: 0,
    left: 0,
  },
  content: {
    paddingTop: 95,
    alignItems: 'center',
  },
  barrage: {
    height: 400,
    top: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
  },
  imageView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  programView: {
    marginTop: 5,
  },
  programTitle: {
    fontSize: 16,
    color: 'white',
  },
  programAuthor: {
    marginTop: 5,
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
});

export default Listen;
