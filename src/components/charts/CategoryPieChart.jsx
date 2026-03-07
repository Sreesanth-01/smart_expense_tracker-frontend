import { PieChart,Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const COLORS =  ["#0088FE","#00C49F","#FFBB28","#FF8042","#AF19FF"];

const CategoryPieChart = ({data}) =>{
    return(
        <div className="w-full h-80">
            <h2 className="text-lg font-semibold mb-4">Spendings By Category</h2>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={data} dataKey="totalAmount" nameKey="category" outerRadius={120} label />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
export default CategoryPieChart;
