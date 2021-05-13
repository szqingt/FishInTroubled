import {Dispatch} from 'redux';
import {sound, initPlay, stop, getCurrentTime} from '@utils/sound';
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
  album: AlbumInfo;
}

export interface IPlayProgramAction {
  type: SET_CURRENT_PROGRAM;
  program: Progrma;
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
  album: AlbumInfo | null; // 当前播放的专辑
  program?: Progrma; // 当前播放的节目
}

export const initState: IPlayInfoState = {
  playState: 'none',
  playSeconds: 0,
  soundDuration: 0,
  percent: 0,
  album: null,
};

export type PlayInfoAction =
  | IPlayStateAction
  | IPlayProgramAction
  | IPlayAlbumAction
  | IPlaySecondsAction;

const getFileUrl = (program: Progrma) => {
  const {outFileUrl} = program;

  return outFileUrl;
};

export const play = async (
  dispatch: Dispatch<PlayInfoAction>,
  newProgram?: Progrma,
) => {
  try {
    const {program, playState, playSeconds} = store.getState().palyInfo;

    // 需要更换播放的节目
    if (newProgram && program?.programId !== newProgram.programId) {
      dispatch({
        type: SET_CURRENT_PROGRAM,
        program: newProgram,
      });
      dispatch({
        type: SET_PLAYSECCONDS,
        sec: 0,
      });
      dispatch({
        type: SET_PLAYSTATE,
        playState: 'loading',
      });

      const path = getFileUrl(newProgram);
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
      sound.play();
      return;
    }
    // 恢复播放
    if (playState === 'paused' && program) {
      dispatch({
        type: SET_PLAYSTATE,
        playState: 'playing',
      });
      sound.setCurrentTime(playSeconds);
      sound.play();
      playTimeLoop(dispatch);
      return;
    }
  } catch (e) {
    dispatch({
      type: SET_PLAYSTATE,
      playState: 'paused',
    });
    console.log('play error:', e);
  }
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
