import { type LoanResult } from "../pages/Index.tsx";
import { Brain, CheckCircle2, XCircle, ArrowUp, ArrowDown, FileText, Search, User, AlertTriangle, ShieldCheck } from "lucide-react";

interface ExplainabilityPanelProps {
  result: LoanResult | null;
  isAnalyzing: boolean;
}

const ExplainabilityPanel = ({ result, isAnalyzing }: ExplainabilityPanelProps) => {
  if (isAnalyzing) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-8 flex flex-col items-center justify-center gap-4 min-h-[500px]">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
        <p className="font-display text-sm text-muted-foreground">Running ML models & explainability...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-8 space-y-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">AI Explainability</h2>
            <p className="text-sm text-muted-foreground">Risk assessment with full transparency</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <p className="font-display text-lg font-semibold">Waiting for Input</p>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            Submit an application to see the AI-powered risk assessment with SHAP explanations.
          </p>
        </div>
      </div>
    );
  }

  const DecisionIcon = result.decision === "Approved" ? CheckCircle2 : XCircle;
  const decisionColor = result.decision === "Approved" ? "text-success" : "text-destructive";
  const decisionBg = result.decision === "Approved" ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30";

  const positiveFeatures = result.features.filter(f => f.direction === "positive");
  const negativeFeatures = result.features.filter(f => f.direction === "negative");

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-8 space-y-6">
      {/* Header with applicant name */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">AI Assessment</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <User className="h-3 w-3" /> {result.applicantName}
            </p>
          </div>
        </div>
        <span className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${decisionBg} ${decisionColor}`}>
          <DecisionIcon className="inline h-4 w-4 mr-1.5 -mt-0.5" />
          {result.decision}
        </span>
      </div>

      {/* Risk score gauge */}
      <div className="flex items-center gap-6 rounded-xl bg-muted/40 p-5">
        <div className="relative flex h-28 w-28 items-center justify-center flex-shrink-0">
          <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--secondary))" strokeWidth="7" />
            <circle cx="50" cy="50" r="42" fill="none"
              stroke={result.riskScore >= 70 ? "hsl(var(--success))" : result.riskScore >= 40 ? "hsl(var(--warning))" : "hsl(var(--destructive))"}
              strokeWidth="7" strokeLinecap="round"
              strokeDasharray={`${result.riskScore * 2.64} 264`} />
          </svg>
          <span className="absolute font-display text-3xl font-bold">{result.riskScore}</span>
        </div>
        <div className="space-y-1.5">
          <p className="font-display text-base font-semibold">Credit Worthiness Score</p>
          <p className="text-sm text-muted-foreground">Default Probability: <span className="font-mono font-medium text-foreground">{(result.probability * 100).toFixed(1)}%</span></p>
          <p className="text-sm text-muted-foreground">Threshold: <span className="font-mono font-medium text-foreground">40%</span></p>
          <p className="text-xs text-muted-foreground mt-1">
            {result.riskScore >= 70 ? "✅ Low risk — strong creditworthiness" : result.riskScore >= 40 ? "⚠️ Medium risk — review recommended" : "🚫 High risk — likely to default"}
          </p>
        </div>
      </div>

      {/* SHAP Explanation Summary */}
      <div className="rounded-xl bg-muted/30 p-4 space-y-2">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          How the AI Made This Decision
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The model analyzed {result.features.length} key features using <span className="font-semibold text-foreground">SHAP (SHapley Additive exPlanations)</span>. 
          Each feature's contribution is measured — <span className="text-success">green bars</span> reduce default risk while <span className="text-destructive">red bars</span> increase it. 
          The final probability of <span className="font-mono font-medium text-foreground">{(result.probability * 100).toFixed(1)}%</span> is compared against a <span className="font-mono">40%</span> threshold.
        </p>
      </div>

      {/* Positive factors */}
      {positiveFeatures.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-success" />
            Factors Reducing Risk ({positiveFeatures.length})
          </h3>
          <div className="space-y-2.5">
            {positiveFeatures.map((f) => (
              <div key={f.name} className="flex items-center gap-3 text-sm">
                <ArrowUp className="h-4 w-4 text-success flex-shrink-0" />
                <span className="flex-1 truncate text-muted-foreground">{f.name}</span>
                <span className="text-xs font-mono text-success/80 w-16 text-right">{f.rawValue.toFixed(3)}</span>
                <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-success transition-all" style={{ width: `${Math.min(f.impact, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Negative factors */}
      {negativeFeatures.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            Factors Increasing Risk ({negativeFeatures.length})
          </h3>
          <div className="space-y-2.5">
            {negativeFeatures.map((f) => (
              <div key={f.name} className="flex items-center gap-3 text-sm">
                <ArrowDown className="h-4 w-4 text-destructive flex-shrink-0" />
                <span className="flex-1 truncate text-muted-foreground">{f.name}</span>
                <span className="text-xs font-mono text-destructive/80 w-16 text-right">{f.rawValue.toFixed(3)}</span>
                <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-destructive transition-all" style={{ width: `${Math.min(f.impact, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Decision reasons */}
      <div className="space-y-3 rounded-xl bg-muted/30 p-4">
        <h3 className="text-sm font-semibold">Decision Rationale</h3>
        <ul className="space-y-2">
          {result.reasons.map((r, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExplainabilityPanel;