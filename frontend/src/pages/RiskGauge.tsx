import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts"

export default function RiskGauge({score}:{score:number}){

const data=[{name:"risk",value:score}]

const getRiskLevel=()=>{
if(score<40) return "LOW RISK"
if(score<70) return "MEDIUM RISK"
return "HIGH RISK"
}

const getColor=()=>{
if(score<40) return "#22c55e"
if(score<70) return "#facc15"
return "#ef4444"
}

const getGlow=()=>{
if(score<40) return "shadow-[0_0_40px_rgba(34,197,94,0.6)]"
if(score<70) return "shadow-[0_0_40px_rgba(250,204,21,0.6)]"
return "shadow-[0_0_40px_rgba(239,68,68,0.6)]"
}

return(

<div className="flex flex-col items-center justify-center relative w-full">

{/* GAUGE */}

<div className={`rounded-full ${getGlow()} transition-all duration-700`}>

<RadialBarChart
width={280}
height={280}
cx="50%"
cy="50%"
innerRadius="75%"
outerRadius="100%"
barSize={20}
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
cornerRadius={15}
fill={getColor()}
/>

</RadialBarChart>

</div>


{/* CENTER CONTENT */}

<div className="absolute flex flex-col items-center justify-center">

<div className="text-5xl font-bold tracking-wide">
{score}
<span className="text-xl ml-1">%</span>
</div>

<div
className={`mt-2 px-3 py-1 text-xs rounded-full font-semibold tracking-wider
${score<40
?"bg-green-500/20 text-green-400 border border-green-400"
:score<70
?"bg-yellow-500/20 text-yellow-400 border border-yellow-400"
:"bg-red-500/20 text-red-400 border border-red-400"}
`}
>
{getRiskLevel()}
</div>

</div>


{/* LABELS */}

<div className="flex justify-between w-full max-w-[260px] text-xs text-gray-400 mt-2">

<span>0%</span>
<span>50%</span>
<span>100%</span>

</div>

</div>

)
}