export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';

export type SHOW_LOADING = typeof SHOW_LOADING;
export type HIDE_LOADING = typeof HIDE_LOADING;

export interface IShowLoadingAction {
  type: SHOW_LOADING;
}

export interface IHideLoadingAction {
  type: HIDE_LOADING;
}

// 显示
export const showLoading = (): IShowLoadingAction => ({
  type: SHOW_LOADING,
});

// 隐藏
export const hideLoading = (): IHideLoadingAction => ({
  type: HIDE_LOADING,
});

export interface ILoadingState {
  status: boolean;
  count: number;
}

export const initState: ILoadingState = {
  status: false,
  count: 0,
};

export type SetLoadingAction = IShowLoadingAction | IHideLoadingAction;

export default (state = initState, action: SetLoadingAction): ILoadingState => {
  console.log(action);
  switch (action.type) {
    case SHOW_LOADING:
      state.count += 1;
      break;
    case HIDE_LOADING:
      state.count -= 1;
      break;
    default:
      return state;
  }

  state.status = state.count >= 1;

  return {...state};
};
