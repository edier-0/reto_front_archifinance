import { twMerge } from "tailwind-merge"

export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(inputs.filter(Boolean).join(" "))
}

export function formatCOP(amount: number): string {
  const millions = amount / 1000000
  if (millions >= 1) {
    return `$${millions.toFixed(1)}M`
  }
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function calculateProfitability(income: number, expenses: number): number {
  if (income === 0) return 0
  return ((income - expenses) / income) * 100
}

export function calculateBudgetUsage(expenses: number, budget: number): number {
  if (budget === 0) return 0
  return (expenses / budget) * 100
}

export function getProjectStatus(
  profitability: number,
  budgetUsage: number,
  netProfit: number,
): "profitable" | "at-risk" {
  if (netProfit < 0 || budgetUsage > 80) {
    return "at-risk"
  }
  return "profitable"
}

export function calculateProfitMargin(netProfit: number, totalIncome: number): number {
  if (totalIncome === 0) return 0
  return (netProfit / totalIncome) * 100
}

export function calculateROI(netProfit: number, budget: number): number {
  if (budget === 0) return 0
  return (netProfit / budget) * 100
}

export function calculateEfficiency(budgetUsed: number): number {
  return Math.max(0, 100 - budgetUsed)
}

export function getFinancialHealth(
  profitability: number,
  budgetUsage: number,
): {
  status: "excellent" | "good" | "warning" | "critical"
  message: string
} {
  if (profitability >= 20 && budgetUsage <= 70) {
    return { status: "excellent", message: "Project performing excellently" }
  }
  if (profitability >= 10 && budgetUsage <= 85) {
    return { status: "good", message: "Project on track" }
  }
  if (profitability >= 0 && budgetUsage <= 95) {
    return { status: "warning", message: "Monitor closely" }
  }
  return { status: "critical", message: "Immediate attention required" }
}
