import React from 'react';
import {StyleSheet} from 'react-native';

type IAlbum = {
  title_file_url: string;
  album_title: string;
  album_id: string;
  is_new: number; // 是否连载 1 是 0 否
  is_free: number; // 是否付费 1 是 0 否
  play_num: number; // 播放数量
  update_time: string; // 更新时间
  replay_num: number; // 评论
};

type IProps = {
  data: IAlbum;
};

const Album: React.FC<IProps> = ({data}) => {
  return <></>;
};

const styles = StyleSheet.create({});

export default Album;
