import React, { PureComponent, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

const data = [
  {
    name: '5 am',
    Temperature: 18.72,
    Humidity: 40.57,
    amt: 2400
  },
  {
    name: '6 am',
    Temperature: 19.6,
    Humidity: 43.2,
    amt: 2210
  },
  {
    name: '7 am',
    Temperature: 17.34,
    Humidity: 48.3,
    amt: 2290
  },
  {
    name: '8 am',
    Temperature: 16.7,
    Humidity: 36.7,
    amt: 2000
  },
  {
    name: '9 am',
    Temperature: 20.5,
    Humidity: 39.4,
    amt: 2181
  },
  {
    name: '10 am',
    Temperature: 24.5,
    Humidity: 39.2,
    amt: 2500
  },
  {
    name: '11 am',
    Temperature: 27.4,
    Humidity: 38,
    amt: 2100
  }
]

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/'

  render() {
    return (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#ff6600" />
        <YAxis stroke="#003366" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Humidity"
          stroke="#003366"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Temperature" stroke="#82ca9d" />
      </LineChart>
    )
  }
}
