/**
 * @description require.context 导入当前目录下的所有文件
 * require.context参数: 指定当前文件目录， 是否加载子目录， 正则表达式
 */
const files = require.context('./', false, /\.js$/);
// 获取当前目录下的所有文件名，除了 index.js文件
const keys = files.keys().filter(item => item !== './index.js');
// 定义导出的模块
const models = [];

keys.forEach(key => {
  models.push(files(key));
});
// console.log(files, keys);
// for (let i = 0, len = keys.length; i < len; i++) {
//   models.push(files(keys[i]));
// }
console.log(models);

export default models;
