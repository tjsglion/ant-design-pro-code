import { query as queryUser, queryCurrentUser } from '../services/user'

export default {
  namespace: 'user',
  state: {
    list: [], // 用户列表
    loading: false,
    currentUser: {} // 当前用户信息
  },
  effects: {
    *fetch ({ payload }, { call, put }) {
      // 改变 loading 值，显示加载中...
      yield put({
        type: 'changeLoading',
        payload: true
      });
      // 加载调用所有用户接口
      const response = yield call(queryUser);
      // 改变store中list列表值
      yield put({
        type: 'save',
        payload: response
      });
      // 改变loading 值
      yield put({
        type: 'changeLoading',
        payload: true
      });
    },
    *fetchCurrentUser ({ payload }, { call, put }) {
      console.log('开始查找用户信息======', call);
      const response = yield call(queryCurrentUser);
      console.log('当前用户信息:', response);
      yield put({
        type: 'saveCurrentUser',
        payload: response
      });
    }
  },
  reducers: {
    save (state, action) {
      return {
        ...state,
        list: action.payload
      }
    },
    saveCurrentUser (state, action) {
      return {
        ...state,
        currentUser: action.payload
      }
    },
    changeLoading (state, action) {
      return {
        ...state,
        loading: action.payload
      }
    }
  }
};
