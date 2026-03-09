import React from 'react'
import { LineChart,Line,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer } from 'recharts'

const SpendingLineChart = ({data}) => {
  return (
    <div className='w-full h-80 '>
      <h2 className='text-lg font-semibold mb-4 p-5'>Daily Spending Trend</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="totalAmount" stroke='#9e04f0ff' strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SpendingLineChart
