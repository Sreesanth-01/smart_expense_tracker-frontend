import { PieChart,Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS =  ["#21838f","#7b1d7e","#e0e0e0","#5c0505ff","#ffe0c9"];

const CategoryPieChart = ({data}) =>{
    return(
        <div className="w-full h-full">

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={data} dataKey="totalAmount" nameKey="category" outerRadius={120} label fill={COLORS[4]} >
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
