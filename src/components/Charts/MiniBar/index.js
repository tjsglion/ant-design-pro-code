import React, { PureComponent } from 'react';
import G2 from 'g2';
import styles from '../index.less';

export default class MiniBar extends PureComponent {

  componentDidMount () {
    this.renderChart(this.props.data);
  }

  componentWillReceiveProps (newProps) {
    if (newProps.data !== this.props.data) {
      this.renderChart(newProps.data);
    }
  }

  renderChart (data) {
    if (!data || (data && data.length < 1)) return;
    const { height = 0, fit = true, color = '33abfb' } = this.props;
    // clear
    this.node.innerHTML = '';
    // init
    const chart = new G2.Chart({
      container: this.node,
      height: height + 54,
      forceFit: fit,
      legend: null,
      plotCfg: {
        margin: [36, 0, 30, 0]
      }
    });
    chart.source(data, {
      x: {
        type: 'cat'
      },
      y: {
        min: 0
      }
    });

    chart.tooltip({
      title: null,
      crosshairs: false,
      map: {
        name: 'x'
      }
    });

    chart.interval().position('x*y').color(color);
    chart.render();
  }

  handleRef = (n) => {
    this.node = n;
  }

  render () {
    const { height } = this.props;
    return (
      <div className={styles.minibar} style={{height}}>
        <div ref={this.handleRef}></div>
      </div>
    );
  }
}
