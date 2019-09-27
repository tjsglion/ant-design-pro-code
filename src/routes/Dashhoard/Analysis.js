import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Tooltip, Icon, Card } from 'antd';
import { Bar, ChartCard, Field, Trend } from '../../components/Charts';
import numeral from 'numeral';
import styles from './Analysis.less';

const rankListData = [];

for (let i = 0; i < 7; i++) {
  rankListData.push({
    title: `周${i + 1}`,
    total: (i + 1) * Math.random(100)
  });
}

class Analysis extends Component {

  componentDidMount () {
    this.props.dispatch({
      type: 'chart/fetchSalesData'
    });
  }

  render () {
    const { chart } = this.props;
    const { salesData } = chart;

    const topColProps = {
      xs: 24,
      sm: 12,
      md: 6,
      style: {
        marginBottom: 24
      }
    };
    return (
      <div>
        <Row gutter={24}>
          <Col {...topColProps}>
            <ChartCard
              bordered={false}
              title='销售额'
              action={<Tooltip title='这是一段说明'><Icon type="exclamation-circle-o"/></Tooltip>}
              total={255}
              contentHeight={46}
              style={{width: '270px'}}
              footer={<Field label="日均销售额" value={123.00}></Field>}
            >
              <Trend colorType="gray">
                <Trend.Item title="周同比" flag="up">12.4%</Trend.Item>
                <Trend.Item title="日环比" flag="down">11%</Trend.Item>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColProps}>
            <ChartCard
              bordered={false}
              title="访问量"
              action={<Tooltip title="访问量相关指标"><Icon type="exclamation-circle-o"/></Tooltip>}
              total={numeral(8846).format('0.0')}
              footer={<Field label="日访问量" value={numeral(1234).format('0.0')} />}
              contentHeight={46}
            ></ChartCard>
          </Col>
        </Row>
        <Card
          bordered={false}
          bodyStyle={{ padding: 0 }}
        >
          <div className={styles.salesCard}>
            <Bar
              height={292}
              title="销售趋势"
              data={salesData}
            />
          </div>
        </Card>
      </div>
    )
  }
}

export default connect((state) => ({
  chart: state.chart
}))(Analysis);
