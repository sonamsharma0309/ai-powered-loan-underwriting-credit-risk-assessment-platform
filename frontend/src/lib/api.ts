const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://ai-powered-loan-underwriting-credit-risk-3at2.onrender.com/";

export interface PredictResponse {
  probability_of_default: number;
  decision: "Approved" | "Rejected";
}

export type ExplainResponse = Record<string, number>;

export interface ApplicantData {
  applicant_name?: string;
  person_age: number;
  person_income: number;
  person_home_ownership: string;
  person_emp_length: number;
  loan_intent: string;
  loan_grade: string;
  loan_amnt: number;
  loan_int_rate: number;
  loan_percent_income: number;
  cb_person_default_on_file: string;
  cb_person_cred_hist_length: number;
}

export async function predictLoan(data: ApplicantData): Promise<PredictResponse> {
  const { applicant_name, ...payload } = data;
  const res = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Prediction failed: ${res.status}`);
  return res.json();
}

export async function explainLoan(data: ApplicantData): Promise<ExplainResponse> {
  const { applicant_name, ...payload } = data;
  const res = await fetch(`${API_BASE_URL}/explain`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Explanation failed: ${res.status}`);
  return res.json();
}
