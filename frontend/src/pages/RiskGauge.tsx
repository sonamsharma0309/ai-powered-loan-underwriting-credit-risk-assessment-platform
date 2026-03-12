import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts"

export default function RiskGauge({score}:{score:number}){

const data=[{name:"risk",value:score}]

const getRiskLevel=()=>{

if(score<40) return "Low"
if(score<70) return "Medium"
return "High"

}

const getColor=()=>{

if(score<40) return "#22c55e"
if(score<70) return "#facc15"
return "#ef4444"

}

return(

<div className="flex justify-center items-center relative w-full">

<RadialBarChart
width={260}
height={260}
cx="50%"
cy="50%"
innerRadius="75%"
outerRadius="100%"
barSize={18}
data={data}
startAngle={180}
endAngle={0}
>

<PolarAngleAxis
type="number"
domain={[0,100]}
tick={false}
/>

<RadialBar
background
dataKey="value"
cornerRadius={10}
fill={getColor()}
/>

</RadialBarChart>

{/* CENTER TEXT */}

<div className="absolute flex flex-col items-center justify-center">

<div className="text-4xl font-bold">
{score}%
</div>

<div
className={`text-sm font-semibold mt-1
${score<40?"text-green-400":score<70?"text-yellow-400":"text-red-400"}
`}
>
Risk Level : {getRiskLevel()}
</div>

</div>

</div>

)
}