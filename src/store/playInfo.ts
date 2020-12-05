export const SET_PLAYSTATE = 'SET_PLAYSTATE';
export const SET_PROGRAM_INFO = 'SET_PROGRAM_INFO';

export type SET_PLAYSTATE = typeof SET_PLAYSTATE;
export type SET_PROGRAM_INFO = typeof SET_PROGRAM_INFO;

export interface IPlayStateAction {
  type: SET_PLAYSTATE;
  playState: PlayState;
}

export interface IPlayProgramAction {
  type: SET_PROGRAM_INFO;
  programList: PlayAlbum[];
}

// 设置播放状态
export const setPlayState = (playState: PlayState): IPlayStateAction => ({
  type: SET_PLAYSTATE,
  playState,
});

// 设置播放专辑的信息
export const setPlayProgram = (
  programList: PlayAlbum[],
): IPlayProgramAction => ({
  type: SET_PROGRAM_INFO,
  programList,
});

export interface PlayAlbum {
  album_author_id: string;
  album_author_name: string;
  album_desc: string | null;
  album_id: string;
  album_title: string;
  is_gain: string; // 1 和 -1 代表购买和没购买
  play_num: number;
  price: string;
  replay_num: number;
  thumbs_num: number;
  title_file_url: null | string;
  update_time: string;
}

export type PlayState = 'none' | 'playing' | 'paused' | 'finish';

export interface IPlayInfoState {
  isPlaying: boolean;
  playState: PlayState;
  playSeconds: number; // 当前播放长度
  soundDuration: number; // 声音的长度
  percent: number;
  album?: PlayAlbum; // 当前播放的项
  previousId?: string;
  nextId?: string;
  programList?: PlayAlbum[];
  currentId?: string;
}

export const initState: IPlayInfoState = {
  isPlaying: false,
  playState: 'none',
  playSeconds: 0,
  soundDuration: 0,
  percent: 30,
};

export type SetPlayAction = IPlayStateAction | IPlayProgramAction;

export default (state = initState, action: SetPlayAction): IPlayInfoState => {
  switch (action.type) {
    case SET_PLAYSTATE:
      state.playState = action.playState;
      break;
    case SET_PROGRAM_INFO:
      state.programList = action.programList;
      break;
    default:
      return state;
  }

  return {...state};
};
