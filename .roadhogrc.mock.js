import mockjs from 'mockjs';
import { imgMap } from './mock/util'
import { delay } from 'roadhog-api-doc';
import { getFetchChartData } from './mock/chart';
const proxy = {
  'GET /api/currentUser': {
    $desc: '获取当前用户信息',
    $params: {},
    $body: {
      name: 'momo.zxy',
      avatar: imgMap.user,
      userid: '00000001',
      notifyCount: 12,
    }
  },
  'GET /api/fetch_chart_data': getFetchChartData
};

export default delay(proxy, 1000);
