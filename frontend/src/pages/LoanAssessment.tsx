import { useState } from "react"
import RiskGauge from "../components/RiskGauge"

export default function LoanAssessment(){

const [form,setForm]=useState({
name:"",
age:"",
income:"",
loanAmount:"",
employmentYears:"",
interestRate:"",
homeOwnership:"",
loanIntent:"",
loanGrade:"",
previousDefault:""
})

const [risk,setRisk]=useState(0)
const [decision,setDecision]=useState("")
const [explanation,setExplanation]=useState<string[]>([])
const [loading,setLoading]=useState(false)
const [error,setError]=useState("")

const API="https://ai-powered-loan-underwriting-credit-risk-3at2.onrender.com"


const handleChange=(e:any)=>{
setForm({...form,[e.target.name]:e.target.value})
}


const runAssessment=async()=>{

setLoading(true)
setError("")
setExplanation([])
setDecision("")
setRisk(0)

try{

const res=await fetch(`${API}/predict`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(form)
})

const data=await res.json()

console.log("Predict:",data)

setRisk(data.risk_score || 0)
setDecision(data.decision || "Rejected")


const exp=await fetch(`${API}/explain`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(form)
})

const expData=await exp.json()

console.log("Explain:",expData)

setExplanation(expData.reasons || [])

}catch(e){

console.error(e)
setError("Backend connection failed")

}

setLoading(false)

}



return(

<div className="grid grid-cols-2 gap-8 p-8 text-white">

{/* LEFT PANEL */}

<div className="bg-slate-900 p-6 rounded-xl border border-slate-700">

<h2 className="text-2xl font-semibold mb-6">
Applicant Details
</h2>

<input
name="name"
placeholder="Full Name"
onChange={handleChange}
className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white border border-slate-600"
/>

<input
name="age"
placeholder="Age"
onChange={handleChange}
className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white border border-slate-600"
/>

<input
name="income"
placeholder="Annual Income"
onChange={handleChange}
className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white border border-slate-600"
/>

<input
name="loanAmount"
placeholder="Loan Amount"
onChange={handleChange}
className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white border border-slate-600"
/>

<input
name="employmentYears"
placeholder="Employment Years"
onChange={handleChange}
className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white border border-slate-600"
/>

<input
name="interestRate"
placeholder="Interest Rate (%)"
onChange={handleChange}
className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white border border-slate-600"
/>

<select
name="homeOwnership"
onChange={handleChange}
className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white border border-slate-600"
>
<option value="">Home Ownership</option>
<option value="rent">Rent</option>
<option value="own">Own</option>
<option value="mortgage">Mortgage</option>
</select>

<select
name="loanIntent"
onChange={handleChange}
className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white border border-slate-600"
>
<option value="">Loan Intent</option>
<option value="education">Education</option>
<option value="medical">Medical</option>
<option value="personal">Personal</option>
<option value="business">Business</option>
</select>

<select
name="loanGrade"
onChange={handleChange}
className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white border border-slate-600"
>
<option value="">Loan Grade</option>
<option value="A">A</option>
<option value="B">B</option>
<option value="C">C</option>
<option value="D">D</option>
</select>

<select
name="previousDefault"
onChange={handleChange}
className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white border border-slate-600"
>
<option value="">Previous Default</option>
<option value="0">No</option>
<option value="1">Yes</option>
</select>


<button
onClick={runAssessment}
disabled={loading}
className="bg-purple-600 hover:bg-purple-700 transition w-full p-3 rounded-lg mt-2 font-semibold"
>

{loading ? "Running AI Model..." : "Run AI Assessment"}

</button>

{error && (
<p className="text-red-400 mt-4">{error}</p>
)}

</div>



{/* RIGHT PANEL */}

<div className="bg-slate-900 p-6 rounded-xl border border-slate-700">

<h2 className="text-2xl font-semibold mb-6">
AI Risk Result
</h2>

<RiskGauge score={risk}/>


<div className="mt-8 text-center">

<div
className={`text-3xl font-bold px-6 py-3 rounded-xl inline-block
${decision==="Approved"
? "bg-green-500/20 text-green-400 border border-green-400"
: "bg-red-500/20 text-red-400 border border-red-400"}
`}
>

{decision || "Awaiting Assessment"}

</div>

</div>


<div className="mt-8">

<div className="flex justify-between text-sm text-gray-400">
<span>Risk Score</span>
<span>{risk}%</span>
</div>

<div className="w-full h-3 bg-slate-700 rounded-full mt-2">

<div
className={`h-3 rounded-full
${risk < 40 ? "bg-green-400" : risk < 70 ? "bg-yellow-400" : "bg-red-500"}
`}
style={{width:`${risk}%`}}
/>

</div>

</div>


<div className="mt-8">

<h3 className="font-semibold mb-3 text-lg">
AI Explanation
</h3>

<ul className="space-y-2 text-gray-300">

{explanation.length===0 && (
<p className="text-gray-500">Run assessment to see AI reasoning</p>
)}

{explanation.map((r,i)=>(
<li
key={i}
className="bg-slate-800 border border-slate-700 rounded-lg p-3"
>
{r}
</li>
))}

</ul>

</div>

</div>

</div>

)
}