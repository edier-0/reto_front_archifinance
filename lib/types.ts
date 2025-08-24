export interface Project {
  id: string
  name: string
  client: string
  budget: number
  status: "active" | "completed" | "at-risk"
  profitability: number
  createdAt: Date
  completedAt?: Date
}

export interface Transaction {
  id: string
  projectId: string
  type: "income" | "expense"
  amount: number
  description: string
  date: Date
}

export interface ProjectFinancials {
  totalIncome: number
  totalExpenses: number
  netProfit: number
  profitability: number
  budgetUsed: number
}

export interface AIAlert {
  id: string
  projectId: string
  type: "budget-warning" | "loss-alert" | "low-profitability"
  message: string
  severity: "warning" | "danger"
  createdAt: Date
}
