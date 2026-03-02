import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";
import { Send, User, Briefcase, DollarSign, CreditCard, Percent, Home, TrendingUp, Clock, Hash, Upload, UserCircle } from "lucide-react";
import type { ApplicantData } from "../lib/api";

interface LoanFormProps {
  onSubmit: (data: ApplicantData) => void;
  isAnalyzing: boolean;
}

const LoanForm = ({ onSubmit, isAnalyzing }: LoanFormProps) => {
  const [form, setForm] = useState({
    applicant_name: "", person_age: "", person_income: "", person_home_ownership: "",
    person_emp_length: "", loan_intent: "", loan_grade: "",
    loan_amnt: "", loan_int_rate: "", loan_percent_income: "",
    cb_person_default_on_file: "", cb_person_cred_hist_length: "",
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      applicant_name: form.applicant_name,
      person_age: Number(form.person_age),
      person_income: Number(form.person_income),
      person_home_ownership: form.person_home_ownership,
      person_emp_length: Number(form.person_emp_length),
      loan_intent: form.loan_intent,
      loan_grade: form.loan_grade,
      loan_amnt: Number(form.loan_amnt),
      loan_int_rate: Number(form.loan_int_rate),
      loan_percent_income: Number(form.loan_percent_income),
      cb_person_default_on_file: form.cb_person_default_on_file,
      cb_person_cred_hist_length: Number(form.cb_person_cred_hist_length),
    });
  };

  const selectClass =
    "flex h-11 w-full rounded-lg border border-border/50 bg-muted/50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:border-primary/50 text-foreground";

  const inputClass = "h-11 bg-muted/50 border-border/50 focus:border-primary/50 rounded-lg";

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border/60 bg-card p-8 space-y-6">
      {/* Card header — KnowledgeAI style with icon badge */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold">Applicant Details</h2>
          <p className="text-sm text-muted-foreground">Enter financial & personal data</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="applicant_name" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <UserCircle className="h-3 w-3" /> Applicant Name
          </Label>
          <Input id="applicant_name" type="text" placeholder="John Doe" required value={form.applicant_name} onChange={(e) => update("applicant_name", e.target.value)} className={inputClass} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="person_age" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <User className="h-3 w-3" /> Age
          </Label>
          <Input id="person_age" type="number" placeholder="30" required value={form.person_age} onChange={(e) => update("person_age", e.target.value)} className={inputClass} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="person_income" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <DollarSign className="h-3 w-3" /> Annual Income ($)
          </Label>
          <Input id="person_income" type="number" placeholder="75000" required value={form.person_income} onChange={(e) => update("person_income", e.target.value)} className={inputClass} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="person_emp_length" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Briefcase className="h-3 w-3" /> Employment (Years)
          </Label>
          <Input id="person_emp_length" type="number" placeholder="5" required value={form.person_emp_length} onChange={(e) => update("person_emp_length", e.target.value)} className={inputClass} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="loan_amnt" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Home className="h-3 w-3" /> Loan Amount ($)
          </Label>
          <Input id="loan_amnt" type="number" placeholder="15000" required value={form.loan_amnt} onChange={(e) => update("loan_amnt", e.target.value)} className={inputClass} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="loan_int_rate" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <TrendingUp className="h-3 w-3" /> Interest Rate (%)
          </Label>
          <Input id="loan_int_rate" type="number" step="0.01" placeholder="10.5" required value={form.loan_int_rate} onChange={(e) => update("loan_int_rate", e.target.value)} className={inputClass} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="loan_percent_income" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Percent className="h-3 w-3" /> Loan % of Income
          </Label>
          <Input id="loan_percent_income" type="number" step="0.01" placeholder="0.20" required value={form.loan_percent_income} onChange={(e) => update("loan_percent_income", e.target.value)} className={inputClass} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cb_person_cred_hist_length" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Clock className="h-3 w-3" /> Credit History (Years)
          </Label>
          <Input id="cb_person_cred_hist_length" type="number" placeholder="10" required value={form.cb_person_cred_hist_length} onChange={(e) => update("cb_person_cred_hist_length", e.target.value)} className={inputClass} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="person_home_ownership" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Home className="h-3 w-3" /> Home Ownership
          </Label>
          <select id="person_home_ownership" required value={form.person_home_ownership} onChange={(e) => update("person_home_ownership", e.target.value)} className={selectClass}>
            <option value="" disabled>Select</option>
            <option value="RENT">Rent</option>
            <option value="OWN">Own</option>
            <option value="MORTGAGE">Mortgage</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="loan_intent" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <CreditCard className="h-3 w-3" /> Loan Intent
          </Label>
          <select id="loan_intent" required value={form.loan_intent} onChange={(e) => update("loan_intent", e.target.value)} className={selectClass}>
            <option value="" disabled>Select</option>
            <option value="PERSONAL">Personal</option>
            <option value="EDUCATION">Education</option>
            <option value="MEDICAL">Medical</option>
            <option value="VENTURE">Venture</option>
            <option value="HOMEIMPROVEMENT">Home Improvement</option>
            <option value="DEBTCONSOLIDATION">Debt Consolidation</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="loan_grade" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Hash className="h-3 w-3" /> Loan Grade
          </Label>
          <select id="loan_grade" required value={form.loan_grade} onChange={(e) => update("loan_grade", e.target.value)} className={selectClass}>
            <option value="" disabled>Select</option>
            {["A", "B", "C", "D", "E", "F", "G"].map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cb_person_default_on_file" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <CreditCard className="h-3 w-3" /> Previous Default
          </Label>
          <select id="cb_person_default_on_file" required value={form.cb_person_default_on_file} onChange={(e) => update("cb_person_default_on_file", e.target.value)} className={selectClass}>
            <option value="" disabled>Select</option>
            <option value="N">No</option>
            <option value="Y">Yes</option>
          </select>
        </div>
      </div>

      <Button type="submit" variant="hero" size="lg" className="w-full gap-2 h-12 text-base" disabled={isAnalyzing}>
        {isAnalyzing ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            Analyzing Risk...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Run AI Assessment
          </>
        )}
      </Button>
    </form>
  );
};

export default LoanForm;