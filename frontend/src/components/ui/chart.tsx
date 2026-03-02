import * as React from "react";
import {
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

/* =========================
   TYPES
========================= */

export type ChartConfig = {
  [key: string]: {
    label?: string;
    color?: string;
  };
};

type ChartContextType = {
  config: ChartConfig;
};

/* =========================
   CONTEXT
========================= */

const ChartContext = React.createContext<ChartContextType | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used inside ChartContainer");
  }
  return context;
}

/* =========================
   CONTAINER
========================= */

export const ChartContainer: React.FC<{
  config: ChartConfig;
  children: React.ReactNode;
  className?: string;
}> = ({ config, children, className }) => {
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={className} style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
};

/* =========================
   TOOLTIP
========================= */

// Custom tooltip props
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number | string;
    dataKey?: string | number;
    color?: string;
  }>;
  label?: string | number;
}

export const ChartTooltipContent: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  const { config } = useChart();

  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: "white",
        padding: "10px",
        border: "1px solid #ccc",
      }}
    >
      {label && <div style={{ fontWeight: 600 }}>{label}</div>}
      {payload.map((item, index) => {
        const key = item.dataKey?.toString() || item.name || `value-${index}`;
        const itemConfig = config[key];
        return (
          <div key={key}>
            {itemConfig?.label || item.name}: {item.value ?? ""}
          </div>
        );
      })}
    </div>
  );
};

/* =========================
   LEGEND
========================= */

interface CustomLegendProps {
  payload?: Array<{
    value?: string | number;
    color?: string;
    dataKey?: string;
  }>;
}

export const ChartLegendContent: React.FC<CustomLegendProps> = ({ payload }) => {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div style={{ display: "flex", gap: "12px" }}>
      {payload.map((item, index) => {
        const key = item.dataKey || item.value?.toString() || `legend-${index}`;
        const itemConfig = config[key];
        return (
          <div key={key} style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: item.color,
              }}
            />
            <span>{itemConfig?.label || item.value}</span>
          </div>
        );
      })}
    </div>
  );
};

/* =========================
   WRAPPER EXPORTS
========================= */

export const ChartTooltip = Tooltip;
export const ChartLegend = Legend;