"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

// Mock data for the chart
const data = [
  {
    name: "Jan",
    total: 1500,
  },
  {
    name: "Feb",
    total: 2300,
  },
  {
    name: "Mar",
    total: 3200,
  },
  {
    name: "Apr",
    total: 4500,
  },
  {
    name: "May",
    total: 3800,
  },
  {
    name: "Jun",
    total: 5000,
  },
  {
    name: "Jul",
    total: 4800,
  },
  {
    name: "Aug",
    total: 5300,
  },
  {
    name: "Sep",
    total: 6000,
  },
  {
    name: "Oct",
    total: 5500,
  },
  {
    name: "Nov",
    total: 6500,
  },
  {
    name: "Dec",
    total: 7000,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `£${value}`}
        />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip formatter={(value: number) => [`£${value}`, "Revenue"]} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
        <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
