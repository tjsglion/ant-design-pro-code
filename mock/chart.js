const salesData = [];
for (let i = 0; i < 12; i++) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  });
};

export const getFetchChartData = {
  salesData
};

export default {
  getFetchChartData
}
