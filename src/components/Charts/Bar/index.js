import React, { Component } from 'react';
import G2 from 'g2';
import styles from '../index.less';

export default class Bar extends Component {

  componentDidMount () {
    // 渲染图表
    this.renderChart(this.props.data);
  }

  // data属性值变化时
  componentWillReceiveProps (newProps) {
    if (newProps.data !== this.props.data) {
      this.renderChart(newProps.data);
    }
  }

  handleRef = (ref) => {
    this.node = ref;
  }

  renderChart (data) {
    const { height = 0, fit = true, color = '#33abfb', margin = [32, 40] } = this.props;

    if (!data || (data && data.length < 1)) return;

    // 清空图表
    this.node.innerHTML = '';

    const Frame = G2.Frame;
    const frame = new Frame(data);
    // 初始化图表
    const chart = new G2.Chart({
      container: this.node, // 指定容器
      forceFit: fit, // 宽度自适应
      height: height - 22,
    });
    // 设置x, y轴参数
    chart.axis('x', {
      title: false
    });
    chart.axis('y', {
      title: false,
      line: false,
      tickLine: false
    });
    // 加载数据
    chart.source(frame, {
      x: { type: 'cat' },
      y: { min: 0 }
    })
    //
    chart.tooltip({
      title: null,
      crosshairs: false,
      map: {
        name: 'x'
      }
    });
    // 设置绘制形状及位置
    chart.interval().position('x*y').color(color);
    // 渲染
    chart.render();
  }

  render () {
    const { height, title } = this.props;
    return (
      <div className={styles.chart} style={{ height }}>
        <div>
          { title && <h3 style={{ textAlign: 'center'}}>{title}</h3> }
          <div ref={this.handleRef}></div>
        </div>
      </div>
    )
  }
};
