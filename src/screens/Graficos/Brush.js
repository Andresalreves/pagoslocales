/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import {
  BarChart, Bar, CartesianGrid, ReferenceArea,
  XAxis, YAxis, Tooltip, Legend, LabelList, Rectangle
} from 'recharts';
//import { scaleOrdinal } from 'd3-scale';
//import { schemeCategory10 } from 'd3-scale-chromatic';
import _ from 'lodash';
import { changeNumberOfData } from './utils';

//const colors = scaleOrdinal(schemeCategory10).range();

const data = [
  { name: 'food', uv: -2000, pv: -2013, amt: -4500, bmk: -4301, time: 1, uvError: [100, 50], pvError: [110, 20] },
  { name: 'cosmetic', uv: 3300, pv: 2000, amt: 6500, bmk: 2000, time: 2, uvError: 120, pvError: 50 },
  { name: 'storage', uv: 3200, pv: 1398, amt: 5000, bmk: 3000, time: 3, uvError: [120, 80], pvError: [200, 100] },
  { name: 'digital', uv: 2800, pv: 2800, amt: 4000, bmk: 1500, time: 4, uvError: 100, pvError: 30 },
];

const data01 = [
  { day: '05-01', wether: 'sunny' },
  { day: '05-02', wether: 'sunny' },
  { day: '05-03', wether: 'cloudy' },
  { day: '05-04', wether: 'rain' },
  { day: '05-05', wether: 'rain' },
  { day: '05-06', wether: 'cloudy' },
  { day: '05-07', wether: 'cloudy' },
  { day: '05-08', wether: 'sunny' },
  { day: '05-09', wether: 'sunny' },
];

const data02 = [
  { name: '201102', uv: -6.11, pv: 0 },
  { name: '201103', uv: 0.39, pv: 0 },
  { name: '201104', uv: -1.37, pv: 0 },
  { name: '201105', uv: 1.16, pv: 0 },
  { name: '201106', uv: 1.29, pv: 0 },
  { name: '201107', uv: 0.09, pv: 0 },
  { name: '201108', uv: 0.53, pv: 0 },
  { name: '201109', uv: 2.52, pv: 0 },
  { name: '201110', uv: 0.79, pv: 0 },
  { name: '201111', uv: 2.94, pv: 0 },
  { name: '201112', uv: 4.3, pv: 0 },
  { name: '201201', uv: 7.41, pv: 14.21 },
  { name: '201202', uv: -7.1, pv: 13.01 },
  { name: '201203', uv: -1.17, pv: 11.26 },
  { name: '201204', uv: -1.86, pv: 10.7 },
  { name: '201205', uv: -0.16, pv: 9.26 },
  { name: '201206', uv: -1.25, pv: 6.53 },
  { name: '201207', uv: 0.22, pv: 6.66 },
  { name: '201208', uv: 0.72, pv: 6.86 },
  { name: '201209', uv: 1.82, pv: 6.12 },
  { name: '201210', uv: 1.64, pv: 7.02 },
  { name: '201211', uv: 3.16, pv: 7.25 },
  { name: '201212', uv: 1.31, pv: 4.17 },
  { name: '201301', uv: 2.91, pv: -0.19 },
  { name: '201302', uv: -0.47, pv: 6.94 },
  { name: '201303', uv: -4.15, pv: 3.71 },
  { name: '201304', uv: -1.82, pv: 3.76 },
  { name: '201305', uv: -0.93, pv: 2.95 },
  { name: '201306', uv: -0.99, pv: 3.22 },
  { name: '201307', uv: -0.52, pv: 2.46 },
  { name: '201308', uv: 1.54, pv: 3.3 },
  { name: '201309', uv: 2.05, pv: 3.54 },
  { name: '201310', uv: 0.7, pv: 2.58 },
  { name: '201311', uv: 2.25, pv: 1.59 },
  { name: '201312', uv: 3.59, pv: 3.92 },
  { name: '201401', uv: 3.63, pv: 4.64 },
  { name: '201402', uv: -4.91, pv: -0.02 },
  { name: '201403', uv: -2.66, pv: 1.54 },
  { name: '201404', uv: -1.50, pv: 1.86 },
  { name: '201405', uv: -0.19, pv: 2.62 },
  { name: '201406', uv: -0.22, pv: 3.42 },
  { name: '201407', uv: -0.58, pv: 3.35 },
  { name: '201408', uv: 0.89, pv: 2.69 },
  { name: '201409', uv: 2.22, pv: 2.86 },
  { name: '201410', uv: 0.61, pv: 2.77 },
  { name: '201411', uv: 2.37, pv: 2.97 },
  { name: '201412', uv: 3.06, pv: 2.41 },
  { name: '201501', uv: 1.07, pv: -0.13 },
  { name: '201502', uv: 4.04, pv: 9.27 },
  { name: '201503', uv: -5.14, pv: 6.48 },
  { name: '201504', uv: -1.69, pv: 6.28 },
  { name: '201505', uv: 0.51, pv: 7.03 },
  { name: '201506', uv: 1.03, pv: 8.37 },
  { name: '201507', uv: -1.14, pv: 7.76 },
  { name: '201508', uv: 0.53, pv: 7.38 },
  { name: '201509', uv: 1.51, pv: 6.63 },
  { name: '201510', uv: -0.16, pv: 5.81 },
  { name: '201511', uv: 3.27, pv: 6.74 },
];

// const rangeData = [
//   { day: '05-01', temperature: [-1, 10] },
//   { day: '05-02', temperature: [2, 15] },
//   { day: '05-03', temperature: [3, 12] },
//   { day: '05-04', temperature: [4, 12] },
//   { day: '05-05', temperature: [12, 16] },
//   { day: '05-06', temperature: [5, 16] },
//   { day: '05-07', temperature: [3, 12] },
//   { day: '05-08', temperature: [0, 8] },
//   { day: '05-09', temperature: [-3, 5] },
// ];

const pageData = [
  { name: 'Page A', uv: 300, pv: 2600, amt: 3400 },
  { name: 'Page B', uv: 400, pv: 4367, amt: 6400 },
  { name: 'Page C', uv: 300, pv: 1398, amt: 2400 },
  { name: 'Page D', uv: 200, pv: 9800, amt: 2400 },
  { name: 'Page E', uv: 278, pv: 3908, amt: 2400 },
  { name: 'Page F', uv: 189, pv: 4800, amt: 2400 },
  { name: 'Page G', uv: 189, pv: 4800, amt: 2400 },
];

const RenderLabel = (props) => {
  const { x, y, textAnchor, key, value, index, ...others } = props;

  if (x === +x && y === +y) {
    return (
      <text x={x} y={y} dy={-10} textAnchor={textAnchor} key={key}>
        {_.isArray(value) ? value[1] : value}
      </text>
    );
  }

  return null;
};
const CustomTick = function () {
  const { payload, x, y } = this.props;

  return <text x={x} y={y} fill="#666" textAnchor="middle" dy={-4}>{payload.province}</text>;
};

const CustomAxisTick = function () {
  const { x, y, payload } = this.props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
    </g>
  );
};

const CustomBar = (props) => {
  const { x, y, width, height, fill } = props;

  if (x === +x && y === +y) {
    const path = `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;

    return <path d={path} stroke="none" fill={fill} />;
  }

  return null;
};

const CustomCursor = (props) => {
  const { x, y, width, height, fill, payloadIndex } = props;
  return (<Rectangle x={x} y={y} fill={fill} width={width} height={height} onMouseEnter={() => console.log(payloadIndex)} />);
}

class BarTwo extends Component {
  getPath() {
    const { x, y, width, height } = this.props;

    if (x === +x && y === +y) {
      const extend = width * 0.2;

      return `M${x - extend},${y + height}
              C${x - extend + width / 3},${y + height} ${x + width / 6},${y} ${x + width / 2}, ${y}
              C${x + 5 * width / 6},${y} ${x + extend + 2 * width / 3},${y + height} ${x + width + extend}, ${y + height}
              Z`;
    }

    return null;
  }

  render() {
    const { fill, fillOpacity } = this.props;

    return <path d={this.getPath()} stroke="none" fillOpacity={fillOpacity} fill={fill} />;
  }
}

class CustomAxis extends Component {
  getIcon() {
    const { x, y, payload } = this.props;
    let icon;

    switch (payload.value) {
      case 'food':
        icon = (
          <svg x={x - 10} y={y} width={20} height={20} version="1.1" viewBox="0 0 1024 1024">
            <path fill="#387908" d="M960 682.666667c-8.533333 0-21.333333 0-21.333333 0l-85.333333 0c-23.466667 0-42.666667-19.2-42.666667-42.666667 0-8.533333 0-21.333333 0-21.333333 0-6.4 0-14.933333 0-21.333333 0-164.266667-134.4-298.666667-298.666667-298.666667s-298.666667 134.4-298.666667 298.666667c0 6.4 0 14.933333 2.133333 21.333333 0 0-2.133333 12.8-2.133333 21.333333 0 23.466667-19.2 42.666667-42.666667 42.666667L85.333333 682.666667c0 0-12.8 0-21.333333 0-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666667c8.533333 0 21.333333 0 21.333333 0l42.666667 0c0-189.866667 138.666667-347.733333 320-377.6 0-2.133333 0-4.266667 0-6.4 0-36.266667 27.733333-64 64-64s64 27.733333 64 64c0 2.133333 0 4.266667 0 6.4 181.333333 29.866667 320 187.733333 320 377.6l42.666667 0c0 0 12.8 0 21.333333 0 23.466667 0 42.666667 19.2 42.666667 42.666667S983.466667 682.666667 960 682.666667zM469.333333 384 469.333333 384c0 0 6.4 0 10.666667 0 17.066667 0 32 14.933333 32 32S497.066667 448 480 448c-4.266667 0-10.666667 0-10.666667 0l0 0c-70.4 0-128 57.6-128 128 0 0 0 6.4 0 10.666667 0 17.066667-14.933333 32-32 32S277.333333 603.733333 277.333333 586.666667c0-4.266667 0-10.666667 0-10.666667C277.333333 469.333333 362.666667 384 469.333333 384zM64 789.333333l896 0c23.466667 0 42.666667 19.2 42.666667 42.666667s-19.2 42.666667-42.666667 42.666667L64 874.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667S40.533333 789.333333 64 789.333333z" />
          </svg>
        );
        break;
      case 'cosmetic':
        icon = (
          <svg x={x - 10} y={y} width={20} height={20} version="1.1" viewBox="0 0 1024 1024">
            <path fill="#387908" d="M874.666667 940.8 149.333333 940.8c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666667l42.666667 0 0-170.666667c0-23.466667 19.2-42.666667 42.666667-42.666667l64 0 0-512c0-23.466667 17.066667-42.666667 38.4-46.933333 8.533333-2.133333 19.2 2.133333 19.2 2.133333S680.533333 256 682.666667 258.133333c25.6 8.533333 42.666667 25.6 42.666667 42.666667l0 341.333333 64 0c23.466667 0 42.666667 19.2 42.666667 42.666667l0 170.666667 42.666667 0c23.466667 0 42.666667 19.2 42.666667 42.666667S898.133333 940.8 874.666667 940.8zM640 334.933333 384 196.266667l0 445.866667 256 0L640 334.933333zM746.666667 727.466667l-21.333333 0-85.333333 0L384 727.466667l-85.333333 0-21.333333 0 0 128 469.333333 0L746.666667 727.466667z" />
          </svg>
        );
        break;
      case 'storage':
        icon = (
          <svg x={x - 10} y={y} width={20} height={20} version="1.1" viewBox="0 0 1024 1024">
            <path fill="#387908" d="M896 928.234667 128 928.234667C104.426667 928.234667 85.333333 909.141333 85.333333 885.568L85.333333 629.568C85.333333 605.994667 104.426667 586.901333 128 586.901333L163.52 586.901333 434.837333 116.970667C446.613333 96.554667 472.704 89.578667 493.12 101.354667L714.816 229.354667C735.232 241.130667 742.208 267.221333 730.432 287.637333L714.176 315.797333 864.426667 402.56C884.842667 414.336 891.84 440.426667 880.042667 460.842667L807.274667 586.901333 896 586.901333C919.573333 586.901333 938.666667 605.994667 938.666667 629.568L938.666667 885.568C938.666667 909.141333 919.573333 928.234667 896 928.234667ZM487.402667 196.586667 262.058667 586.901333 459.114667 586.901333 635.2 281.92 487.402667 196.586667ZM557.653333 586.901333 708.736 586.901333 784.810667 455.125333 671.509333 389.696 557.653333 586.901333ZM853.333333 672.234667 170.666667 672.234667 170.666667 842.901333 853.333333 842.901333 853.333333 672.234667Z" />
          </svg>
        );
        break;
      case 'digital':
        icon = (
          <svg x={x - 10} y={y} width={20} height={20} version="1.1" viewBox="0 0 1024 1024">
            <path fill="#387908" d="M896 896 128 896C104.426667 896 85.333333 876.906667 85.333333 853.333333L85.333333 298.666667C85.333333 275.093333 104.426667 256 128 256L896 256C919.573333 256 938.666667 275.093333 938.666667 298.666667L938.666667 853.333333C938.666667 876.906667 919.573333 896 896 896ZM853.333333 341.333333 170.666667 341.333333 170.666667 810.666667 853.333333 810.666667 853.333333 341.333333ZM512 405.333333C606.250667 405.333333 682.666667 481.749333 682.666667 576 682.666667 670.250667 606.250667 746.666667 512 746.666667 417.749333 746.666667 341.333333 670.250667 341.333333 576 341.333333 481.749333 417.749333 405.333333 512 405.333333ZM512 661.333333C559.125333 661.333333 597.333333 623.125333 597.333333 576 597.333333 528.874667 559.125333 490.666667 512 490.666667 464.874667 490.666667 426.666667 528.874667 426.666667 576 426.666667 623.125333 464.874667 661.333333 512 661.333333ZM448 213.333333 234.666667 213.333333C211.093333 213.333333 192 194.24 192 170.666667 192 147.093333 211.093333 128 234.666667 128L448 128C471.573333 128 490.666667 147.093333 490.666667 170.666667 490.666667 194.24 471.573333 213.333333 448 213.333333Z" />
          </svg>
        );
        break;
    }

    return icon;
  }

  render() {
    const { x, y, payload } = this.props;

    return (
      <g>
        {this.getIcon()}
        <text textAnchor="middle" x={x} y={y} dy={34}>{payload.value}</text>
      </g>
    );
  }
}

const initialState = {
  data,
  data01,
  data02,
};

export default class Demo extends Component {

  static displayName = 'BarChartDemo';

  state = initialState;

  handleChangeData = () => {
    this.setState(() => _.mapValues(initialState, changeNumberOfData));
  };

  handlePvBarClick = (data, index, e) => {
    console.log(`Pv Bar (${index}) Click: `, data);
  };

  handleBarAnimationStart = () => {
    console.log('Animation start');
  };

  handleBarAnimationEnd = () => {
    console.log('Animation end');
  };

  handleMoreData = () => {
    const { data } = this.state;
    const count = data.length;
    console.log(count);

    this.setState({
      data: [...data, ..._.range(1 + Math.ceil(data.length * Math.random())).map((entry, index) => {
        console.log(index);
        return {
          name: `random${Math.random()}`.slice(0, 10),
          uv: 3000 * Math.random(),
          pv: 3000 * Math.random(),
          amt: 5000 * Math.random(),
          time: count + index,
          uvError: 100 * Math.random(),
          pvError: 50 * Math.random()
        };
      })],
    });
  };

  handleLessData = () => {
    const { data } = this.state;

    this.setState({
      data: data.slice(0, Math.ceil(data.length * Math.random())),
    });
  };

  render() {
    const { data, data01, data02 } = this.state;

    return (
      <div className="bar-charts">

        <p>Label alignment on Horizontal BarChart</p>
        <div className="area-chart-wrapper">
          <BarChart
            width={this.props.width}
            height={400}
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            layout="horizontal"
          >
            <YAxis type="number" />
            <XAxis dataKey="name" type="category" />
            <Tooltip />
            <ReferenceArea x1="food" x2="cosmetic"/>
            <Bar dataKey="uv" fill="#ff7300" label />
            <Bar dataKey="pv" fill="#387908">
              <LabelList position="top" invertNegativesOn="vertical" />
            </Bar>
            <Bar dataKey="amt" fill="#683a98">
              <LabelList position="bottom" />
            </Bar>
            <Bar dataKey="bmk" fill="#183a91">
              <LabelList position="insideTop" fill="#ffffff" invertNegativesOn="vertical" />
            </Bar>
          </BarChart>
        </div>

        <p>Custom cursor with hover action</p>
        <div className="bar-chart-wrapper">
          <BarChart width={this.props.width} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip cursor={<CustomCursor />} />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
          </BarChart>
        </div>

      </div>
    );
  }
}
