import { fetchChartData } from '../services/api';

export default {
  namespace: 'chart',
  state: {
    salesData: [] // 销售额
  },
  effects: {
    *fetchSalesData ({ payload }, { call, put }) {
      const response = yield call(fetchChartData);
      console.log('chart-data: ', response);
      yield put({
        type: 'saveSalesData',
        payload: response.salesData
      })
    }
  },
  reducers: {
    saveSalesData (state, action) {
      return {
        ...state,
        salesData: action.payload
      }
    }
  }
}
