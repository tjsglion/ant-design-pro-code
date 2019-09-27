import { stringify } from 'qs';
import request from '../utils/request';

// 加载图表数据
export async function fetchChartData () {
  return request('/api/fetch_chart_data');
}
