import { PieChart,Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = [
  "#3B82F6", // blue
  "#6366F1", // indigo
  "#0EA5E9", // sky blue
  "#14B8A6", // teal
  "#8B5CF6", // violet
];

const CategoryPieChart = ({data}) =>{
    return(
        <div className="w-full h-full  backdrop-blur-lg">

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={data} dataKey="totalAmount" nameKey="category" outerRadius={120} label fill={COLORS[4]} stroke="#0F172A" strokeWidth={2} >
                        {Object.entries(data).map((entry,index)=>(
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
export default CategoryPieChart;
