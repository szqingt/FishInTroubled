import {Dispatch} from 'redux';
import {
  sound,
  initPlay,
  playComplete,
  stop,
  getCurrentTime,
} from '@utils/sound';
import store from '@store/index';

export const SET_PLAYSTATE = 'SET_PLAYSTATE';
export const SET_PLAYSECCONDS = 'SET_PLAYSECCONDS';
export const SET_ALBUM_INFO = 'SET_ALBUM_INFO';
export const SET_CURRENT_PROGRAM = 'SET_CURRENT_PROGRAM';

export type SET_PLAYSTATE = typeof SET_PLAYSTATE;
export type SET_PLAYSECCONDS = typeof SET_PLAYSECCONDS;
export type SET_ALBUM_INFO = typeof SET_ALBUM_INFO;
export type SET_CURRENT_PROGRAM = typeof SET_CURRENT_PROGRAM;
export interface IPlayStateAction {
  type: SET_PLAYSTATE;
  playState: PlayState;
}

export interface IPlayAlbumAction {
  type: SET_ALBUM_INFO;
  album: AlbumInfo['albumInfo'];
  programList: PlayProgram[];
}

export interface IPlayProgramAction {
  type: SET_CURRENT_PROGRAM;
  program: PlayProgram;
}

export interface IPlaySecondsAction {
  type: SET_PLAYSECCONDS;
  sec: number;
}
// 设置播放状态
export const setPlayState = (playState: PlayState): IPlayStateAction => ({
  type: SET_PLAYSTATE,
  playState,
});

export interface PlayProgram {
  album_id: string;
  file_net_encrypt_url: string;
  file_net_high_url: string;
  file_net_low_url: string;
  file_net_url: string;
  file_size: number; // 文件大小 单位M
  file_url: string | null;
  is_encrypt: number;
  is_gain: string; // 1 已经购买 0 否
  need_download: number;
  play_num: number;
  program_id: string;
  program_name: string;
  program_type: number;
  replay_num: number;
  thumbs_num: number;
  update_time: string;
}

export type PlayState =
  | 'none'
  | 'playing'
  | 'paused'
  | 'finish'
  | 'loading'
  | 'ready';

export interface IPlayInfoState {
  playState: PlayState;
  playSeconds: number; // 当前播放长度
  soundDuration: number; // 声音的长度
  percent: number;
  album: AlbumInfo['albumInfo'] | null; // 当前播放的专辑
  program: PlayProgram | null; // 当前播放的节目
  programList: PlayProgram[] | [];
}

export const initState: IPlayInfoState = {
  playState: 'none',
  playSeconds: 0,
  soundDuration: 0,
  percent: 0,
  album: null,
  program: null,
  programList: [],
};

export type PlayInfoAction =
  | IPlayStateAction
  | IPlayProgramAction
  | IPlayAlbumAction
  | IPlaySecondsAction;

const getFileUrl = (program: PlayProgram) => {
  const {
    file_net_encrypt_url,
    file_net_high_url,
    file_net_low_url,
    file_net_url,
  } = program;

  return (
    file_net_encrypt_url ||
    file_net_high_url ||
    file_net_low_url ||
    file_net_url
  );
};

export const play = async (dispatch: Dispatch<PlayInfoAction>, id?: string) => {
  try {
    const {
      programList,
      program,
      playState,
      playSeconds,
    } = store.getState().palyInfo;
    const data = id
      ? programList.find((item) => item.program_id === id)
      : programList[0];
    if (!data) {
      console.log('get program error', programList);
      return;
    }

    // 恢复播放
    if (playState === 'paused' && program?.program_id) {
      dispatch({
        type: SET_PLAYSTATE,
        playState: 'playing',
      });
      sound.setCurrentTime(playSeconds);
      sound.play();
      playTimeLoop(dispatch);
      return;
    }

    if (
      (program?.program_id === data.program_id || !id) &&
      (playState === 'loading' || playState === 'playing')
    ) {
      return;
    }
    dispatch({
      type: SET_PLAYSECCONDS,
      sec: 0,
    });
    dispatch({
      type: SET_CURRENT_PROGRAM,
      program: data,
    });

    dispatch({
      type: SET_PLAYSTATE,
      playState: 'loading',
    });
    const path = getFileUrl(data);
    console.log('paly path:', path);
    if (!path) {
      throw new Error('get sound file path error!');
    }
    await initPlay(path);
    dispatch({
      type: SET_PLAYSTATE,
      playState: 'playing',
    });
    playTimeLoop(dispatch);
    autoNext(dispatch);
  } catch (e) {
    dispatch({
      type: SET_PLAYSTATE,
      playState: 'paused',
    });
    console.log('play error:', e);
  }
};

const autoNext = async (dispatch: Dispatch<PlayInfoAction>) => {
  await playComplete();
  const {programList, program} = store.getState().palyInfo;
  const currentIndex = programList.findIndex(
    (item) => item.program_id === program?.program_id,
  );
  if (programList.length === currentIndex + 1) {
    dispatch({
      type: SET_PLAYSTATE,
      playState: 'finish',
    });
    return;
  }
  play(dispatch, programList[currentIndex + 1].program_id);
};

export const stopPlay = async (dispatch: Dispatch) => {
  try {
    await stop();
    dispatch({
      type: SET_PLAYSTATE,
      playState: 'none',
    });
  } catch (e) {
    console.log(e);
  }
};

export const pause = (dispatch: Dispatch<PlayInfoAction>) => {
  sound.pause();
  dispatch({
    type: SET_PLAYSTATE,
    playState: 'paused',
  });
};

export const setPlayTime = (
  sec: number,
  dispatch: Dispatch<PlayInfoAction>,
) => {
  stopPlayTimer();
  sound.setCurrentTime(sec);
  sound.play();
  playTimeLoop(dispatch);
};

export const stopPlayTimer = () => {
  playTimer && clearInterval(playTimer);
};

let playTimer: null | NodeJS.Timeout = null;

const playTimeLoop = (dispatch: Dispatch<PlayInfoAction>) => {
  stopPlayTimer();
  playTimer = setInterval(async () => {
    const sec = await getCurrentTime();
    dispatch({
      type: SET_PLAYSECCONDS,
      sec,
    });
  }, 1000);
};

export default (state = initState, action: PlayInfoAction): IPlayInfoState => {
  switch (action.type) {
    case SET_PLAYSTATE:
      const {playState} = action;
      state.playState = playState;

      if (playState === 'playing') {
        state.soundDuration = sound.getDuration();
      } else {
        stopPlayTimer();
      }

      if (playState === 'paused') {
        sound && sound.pause();
      }

      break;
    case SET_ALBUM_INFO:
      state.album = action.album;
      state.programList = action.programList;
      break;
    case SET_CURRENT_PROGRAM:
      state.program = action.program;
      break;
    case SET_PLAYSECCONDS:
      state.playSeconds = action.sec;
      state.percent = (state.playSeconds / state.soundDuration) * 100;
      break;
    default:
      return state;
  }

  return {...state};
};
