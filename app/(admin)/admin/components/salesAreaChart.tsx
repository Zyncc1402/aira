"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  Legend,
} from "recharts";

export default function SalesAreaChart() {
  const data = [
    {
      name: "Mon",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Tue",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Wed",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Thu",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Fri",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Sat",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Sun",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={1000} height={1000} data={data}>
        {/* <YAxis /> */}
        <XAxis dataKey="name" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stackId="1"
          stroke="#000000"
          fill="#082161"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stackId="1"
          stroke="#000000"
          fill="#081c4d"
        />
        <Area
          type="monotone"
          dataKey="amt"
          stackId="1"
          stroke="#000000"
          fill="#071536"
        />
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  );
}
