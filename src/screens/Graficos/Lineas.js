import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Jun', mujeres: 3490, hombres: 4300, amt: 2100,
  },
  {
    name: 'Jul', mujeres: 4000, hombres: 2400, amt: 2400,
  },
  {
    name: 'Ago', mujeres: 3000, hombres: 1398, amt: 2210,
  },
  {
    name: 'Sep', mujeres: 2000, hombres: 9800, amt: 2290,
  },
  {
    name: 'Oct', mujeres: 2780, hombres: 3908, amt: 2000,
  },
  {
    name: 'Nov', mujeres: 1890, hombres: 4800, amt: 2181,
  },
  {
    name: 'Dic', mujeres: 2390, hombres: 3800, amt: 2500,
  },
];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  render() {
    return (
      <BarChart
        width={this.props.width}
        height={450}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="hombres" fill="#8884d8" />
        <Bar dataKey="mujeres" fill="#82ca9d" />
      </BarChart>
    );
  }
}
