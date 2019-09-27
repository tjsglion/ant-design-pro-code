import dva from 'dva';
import models from './models';

// 1. 初始化
const app = dva({});

// 2. 加载中间件
// app.use({});

// 3. 加载模块
models.forEach(m => {
  console.log(m);
  app.model(m);
});

// 4. 加载路由
app.router(require('./router'));

// 5. 启动
app.start('#app');
