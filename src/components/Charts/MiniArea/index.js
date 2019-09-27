import React, { PureComponent } from 'react';
import G2 from 'g2';
import styles from '../index.less';

export default class MiniArea extends PureComponent {

  componentDidMount () {
    this.renderData(this.props.data);
  }

  componentWillReceiveProps (newProps) {
    if (newProps.data !== this.props.data) {
      this.renderData(newProps.data);
    }
  }

  renderData (data) {
    if (!data || (data && data.length < 1)) return;
    const { height = 0, fit = true, color = '#33abfb', line, xAxis, yAxis } = this.props;
    // 1. 清空数据
    this.node.innerHTML = '';
    // 2. 创建Chart
    const chart = new G2.Chart({
      container: this.node,
      height: height + 54,
      forceFit: fit,
      plotCfg: {
        margin: [36, 0, 30, 0]
      },
      legend: null
    });

    if (!(xAxis && yAxis)) {
      chart.axis(false);
    }

    xAxis ? chart.axis('x', true) : chart.axis('x', false);
    yAxis ? chart.axis('y', true) : chart.axis('y', false);

    // 加载数据
    chart.source(data, {
      x: {
        type: 'cat',
        rang: [0, 1],
        ...xAxis
      },
      y: {
        min: 0,
        ...yAxis
      }
    });
    // 设置提示信息
    chart.tooltip({
      title: null,
      crosshairs: false,
      map: {
        name: 'x'
      }
    });
    // 渲染的图片
    chart.area().position('x*y').color(color).shape('smooth');
    if (line) {
      chart.line().position('x*y').color(color).shape('smooth');
    }
    chart.render();
  }

  handleRef = (n) => {
    this.node = n;
  }

  render () {
    const { height } = this.props;
    return (
      <div className={styles.miniChart} style={{height}}>
        <div ref={this.handleRef}></div>
      </div>
    )
  }
}
