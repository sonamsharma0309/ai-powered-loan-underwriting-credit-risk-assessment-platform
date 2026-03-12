import { useEffect, useState } from "react"

const API = "https://ai-powered-loan-underwriting-credit-risk-3at2.onrender.com"

function Dashboard(){

const [stats,setStats]=useState<any>(null)

useEffect(()=>{

fetch(`${API}/analytics`)
.then(res=>res.json())
.then(data=>setStats(data))
.catch(()=>setStats({
total:0,
approved:0,
rejected:0,
avg_risk:0
}))

},[])


if(!stats) return(

<div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

<div className="animate-pulse text-xl tracking-wide">
Initializing AI Risk Engine...
</div>

</div>

)


return(

<div className="relative min-h-screen overflow-hidden text-white">


{/* BACKGROUND */}

<div className="absolute inset-0 -z-10 bg-[#020617]" />

<div className="absolute w-[700px] h-[700px] bg-purple-500/40 blur-[160px] rounded-full top-[-150px] left-[-100px] animate-pulse"/>

<div className="absolute w-[700px] h-[700px] bg-blue-500/40 blur-[160px] rounded-full bottom-[-150px] right-[-100px] animate-pulse"/>

<div className="absolute w-[600px] h-[600px] bg-pink-500/30 blur-[140px] rounded-full top-[35%] left-[40%]" />


<div className="p-10 space-y-12">


{/* HEADER */}

<div className="flex items-center justify-between">

<div>

<h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">

AI Credit Risk Dashboard

</h1>

<p className="text-gray-400 mt-2">

Real-time insights for loan underwriting decisions

</p>

</div>


{/* AI STATUS */}

<div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-5 py-2 rounded-full border border-white/10">

<div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"/>

<span className="text-sm text-gray-300">

AI Engine Active

</span>

</div>

</div>



{/* STATS CARDS */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">


{/* TOTAL */}

<div className="group bg-white/5 backdrop-blur-xl p-7 rounded-2xl border border-white/10 hover:border-purple-500/40 transition hover:scale-[1.02] shadow-xl">

<p className="text-gray-400">Total Applications</p>

<h2 className="text-4xl font-bold mt-3 text-purple-400">

{stats.total}

</h2>

<div className="h-[3px] w-full mt-4 bg-purple-500/30 rounded-full"/>

</div>


{/* APPROVED */}

<div className="group bg-white/5 backdrop-blur-xl p-7 rounded-2xl border border-white/10 hover:border-green-500/40 transition hover:scale-[1.02] shadow-xl">

<p className="text-gray-400">Approved Loans</p>

<h2 className="text-4xl font-bold mt-3 text-green-400">

{stats.approved}

</h2>

<div className="h-[3px] w-full mt-4 bg-green-500/30 rounded-full"/>

</div>


{/* REJECTED */}

<div className="group bg-white/5 backdrop-blur-xl p-7 rounded-2xl border border-white/10 hover:border-red-500/40 transition hover:scale-[1.02] shadow-xl">

<p className="text-gray-400">Rejected Loans</p>

<h2 className="text-4xl font-bold mt-3 text-red-400">

{stats.rejected}

</h2>

<div className="h-[3px] w-full mt-4 bg-red-500/30 rounded-full"/>

</div>


{/* RISK */}

<div className="group bg-white/5 backdrop-blur-xl p-7 rounded-2xl border border-white/10 hover:border-yellow-500/40 transition hover:scale-[1.02] shadow-xl">

<p className="text-gray-400">Average Risk</p>

<h2 className="text-4xl font-bold mt-3 text-yellow-400">

{Math.round(stats.avg_risk)}

</h2>

<div className="h-[3px] w-full mt-4 bg-yellow-500/30 rounded-full"/>

</div>

</div>



{/* SECOND ROW */}

<div className="grid md:grid-cols-2 gap-8">


{/* SYSTEM STATUS */}

<div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl">

<h3 className="text-xl font-semibold text-purple-400">

System Status

</h3>

<p className="text-gray-400 mt-3">

AI underwriting engine is running normally and analyzing loan applications in real-time.

</p>


<div className="mt-6">

<div className="flex justify-between text-sm text-gray-400">

<span>AI Performance</span>

<span>98%</span>

</div>

<div className="w-full bg-white/10 h-2 rounded-full mt-2">

<div className="bg-purple-500 h-2 rounded-full w-[98%]" />

</div>

</div>

</div>


{/* MODEL INSIGHTS */}

<div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl">

<h3 className="text-xl font-semibold text-blue-400">

Model Insights

</h3>

<p className="text-gray-400 mt-3">

Risk model continuously evaluates borrower profiles and predicts default probability.

</p>


<div className="mt-6 space-y-3">

<div className="flex justify-between text-sm">

<span className="text-gray-400">Low Risk</span>

<span className="text-green-400">72%</span>

</div>

<div className="flex justify-between text-sm">

<span className="text-gray-400">Medium Risk</span>

<span className="text-yellow-400">18%</span>

</div>

<div className="flex justify-between text-sm">

<span className="text-gray-400">High Risk</span>

<span className="text-red-400">10%</span>

</div>

</div>

</div>

</div>

</div>

</div>

)

}

export default Dashboard