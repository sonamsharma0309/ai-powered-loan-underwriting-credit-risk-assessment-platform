import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import LoanForm from "../components/LoanForm.tsx";
import ExplainabilityPanel from "../components/ExplainabilityPanel.tsx";
import { predictLoan, explainLoan, type ApplicantData } from "../lib/api";
import { useToast } from "../hooks/use-toast";

export interface LoanResult {
  applicantName: string;
  riskScore: number;
  decision: "Approved" | "Rejected";
  probability: number;
  features: { name: string; impact: number; direction: "positive" | "negative"; rawValue: number }[];
  reasons: string[];
}

const Index = () => {
  const [result, setResult] = useState<LoanResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (formData: ApplicantData) => {
    setIsAnalyzing(true);
    setResult(null);

    try {
      const [prediction, explanation] = await Promise.all([
        predictLoan(formData),
        explainLoan(formData),
      ]);

      const shapEntries = Object.entries(explanation)
        .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
        .slice(0, 8);

      const maxAbsShap = Math.max(...shapEntries.map(([, v]) => Math.abs(v)), 0.01);

      const features = shapEntries.map(([name, value]) => ({
        name: name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        impact: Math.round((Math.abs(value) / maxAbsShap) * 100),
        direction: (value < 0 ? "positive" : "negative") as "positive" | "negative",
        rawValue: value,
      }));

      const prob = prediction.probability_of_default;
      const score = Math.round((1 - prob) * 100);

      const reasons =
        prediction.decision === "Approved"
          ? [
              `Low default probability: ${(prob * 100).toFixed(1)}%`,
              `Top positive factor: ${features.find((f) => f.direction === "positive")?.name || "N/A"}`,
              "Applicant meets risk threshold (< 40%)",
            ]
          : [
              `High default probability: ${(prob * 100).toFixed(1)}%`,
              `Top risk factor: ${features.find((f) => f.direction === "negative")?.name || "N/A"}`,
              "Default probability exceeds 40% threshold",
            ];

      setResult({ applicantName: formData.applicant_name || "Applicant", riskScore: score, decision: prediction.decision, probability: prob, features, reasons });
    } catch (err) {
      console.error("API Error:", err);
      toast({
        title: "Backend Connection Failed",
        description: "Could not reach the Flask API. Make sure your backend is running and CORS is enabled.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Navbar — KnowledgeAI style */}
      <header className="relative z-10 px-8 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-lg shadow-primary/20">
              <ShieldCheck className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              Credit<span className="text-gradient">AI</span>
            </span>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-2 text-sm font-medium text-success">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            Live
          </span>
        </div>
      </header>

      {/* Hero heading — KnowledgeAI style */}
      <section className="relative px-8 pt-12 pb-16 text-center">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
          <div className="h-[400px] w-[700px] rounded-full bg-primary/6 blur-[120px]" />
        </div>
        <div className="relative z-10">
          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Intelligent Loan
            <br />
            <span className="text-gradient">Underwriting Platform</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            AI-powered credit risk assessment with explainable decisions and role-based access control
          </p>
        </div>
      </section>

      {/* Cards — KnowledgeAI style */}
      <main className="relative z-10 mx-auto max-w-7xl px-8 pb-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <LoanForm onSubmit={handleSubmit} isAnalyzing={isAnalyzing} />
          <ExplainabilityPanel result={result} isAnalyzing={isAnalyzing} />
        </div>
      </main>
    </div>
  );
};

export default Index;