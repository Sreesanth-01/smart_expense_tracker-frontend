import React from 'react'
import { LineChart,Line,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer } from 'recharts'

const SpendingLineChart = ({data}) => {
  return (
    <div className='w-full h-80 '>
      <h2 className='text-lg font-semibold mb-4 p-5'>Daily Spending Trend <span className='text-sm text-gray-200'>(Last 7 days)</span></h2>
      

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="date"/>
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="totalAmount" stroke='#CCC9DC' strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SpendingLineChart
