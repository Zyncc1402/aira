"use client";

import React, { useEffect, useState } from "react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getNewUserCount } from "@/actions/action";

interface ChartData {
  month: string;
  NewUsers: number;
}

const chartConfig = {
  month: {
    label: "Month",
    color: "#2563eb",
  },
  Sales: {
    label: "Sales",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function SalesAreaChart() {
  const [chartData, setChartData] = useState<ChartData[]>();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    async function getTransactions() {
      const data = await getNewUserCount();
      const ordersPerMonth: Record<string, number> = monthNames.reduce(
        (acc, month) => {
          acc[month] = 0;
          return acc;
        },
        {} as Record<string, number>
      );
      data.forEach((order) => {
        const date = new Date(order.createdAt);
        const month = monthNames[date.getUTCMonth()];
        ordersPerMonth[month]++;
      });
      const groupedUserData: ChartData[] = monthNames.map((month) => ({
        month,
        NewUsers: ordersPerMonth[month],
      }));
      setChartData(groupedUserData);
      console.log(groupedUserData);
    }
    getTransactions();
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ChartContainer
        config={chartConfig}
        className="min-h-[500px] w-full pb-10"
      >
        <AreaChart accessibilityLayer data={chartData}>
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area type="monotone" dataKey="NewUsers" />
        </AreaChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
}
