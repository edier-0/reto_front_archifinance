"use client"

import type React from "react"

import { useState } from "react"
import {
  Eye,
  EyeOff,
  BarChart3,
  Plus,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  DollarSign,
  Minus,
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  Bot,
  X,
  Archive,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import type { Project, Transaction, AIAlert } from "@/lib/types"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"

function formatCOP(amount: number): string {
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

function calculateProfitability(income: number, expenses: number): number {
  if (income === 0) return 0
  return ((income - expenses) / income) * 100
}

function calculateBudgetUsage(expenses: number, budget: number): number {
  if (budget === 0) return 0
  return (expenses / budget) * 100
}

function getProjectStatus(profitability: number, budgetUsage: number, netProfit: number): "profitable" | "at-risk" {
  if (netProfit < 0 || budgetUsage > 80) {
    return "at-risk"
  }
  return "profitable"
}

// Sample data
const sampleProjects: Project[] = [
  {
    id: "1",
    name: "Casa Moderna Laureles",
    client: "María González",
    budget: 50000000,
    status: "active",
    profitability: 33.0,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Remodelación Oficina",
    client: "Empresas SAS",
    budget: 30000000,
    status: "at-risk",
    profitability: -23.3,
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "3",
    name: "Coastal Villa Renovation",
    client: "Roberto Silva",
    budget: 60000000,
    status: "active",
    profitability: 20.0,
    createdAt: new Date("2024-01-20"),
  },
]

const sampleTransactions: Transaction[] = [
  // Casa Moderna Laureles
  {
    id: "1",
    projectId: "1",
    type: "income",
    amount: 35000000,
    description: "Client Payment",
    date: new Date("2024-01-20"),
  },
  {
    id: "2",
    projectId: "1",
    type: "expense",
    amount: 18500000,
    description: "Material Purchase",
    date: new Date("2024-01-25"),
  },
  {
    id: "3",
    projectId: "1",
    type: "expense",
    amount: 5000000,
    description: "Contractor Fee",
    date: new Date("2024-02-01"),
  },

  // Remodelación Oficina (at risk)
  {
    id: "4",
    projectId: "2",
    type: "income",
    amount: 15000000,
    description: "Initial Payment",
    date: new Date("2024-02-05"),
  },
  {
    id: "5",
    projectId: "2",
    type: "expense",
    amount: 22000000,
    description: "Material Purchase",
    date: new Date("2024-02-10"),
  },
  {
    id: "6",
    projectId: "2",
    type: "expense",
    amount: 3500000,
    description: "Permit Fees",
    date: new Date("2024-02-15"),
  },

  // Coastal Villa
  {
    id: "7",
    projectId: "3",
    type: "income",
    amount: 40000000,
    description: "Client Payment",
    date: new Date("2024-01-25"),
  },
  {
    id: "8",
    projectId: "3",
    type: "expense",
    amount: 25000000,
    description: "Material Purchase",
    date: new Date("2024-02-01"),
  },
  {
    id: "9",
    projectId: "3",
    type: "expense",
    amount: 7000000,
    description: "Labor Costs",
    date: new Date("2024-02-10"),
  },
]

function generateAIAlerts(project: Project, financials: any): AIAlert[] {
  const alerts: AIAlert[] = []

  // Budget warning alert (expenses > 80% of budget)
  if (financials.budgetUsed > 80) {
    alerts.push({
      id: `budget-${project.id}-${Date.now()}`,
      projectId: project.id,
      type: "budget-warning",
      message: `¡Atención! El proyecto "${project.name}" ha utilizado ${financials.budgetUsed.toFixed(1)}% del presupuesto. Te recomiendo revisar los gastos restantes y considerar renegociar con ${project.client} si es necesario.`,
      severity: "warning",
      createdAt: new Date(),
    })
  }

  // Loss alert (net profit < 0)
  if (financials.netProfit < 0) {
    alerts.push({
      id: `loss-${project.id}-${Date.now()}`,
      projectId: project.id,
      type: "loss-alert",
      message: `⚠️ El proyecto "${project.name}" está generando pérdidas de ${formatCOP(Math.abs(financials.netProfit))}. Sugiero analizar los costos y buscar formas de optimizar el presupuesto con urgencia.`,
      severity: "danger",
      createdAt: new Date(),
    })
  }

  // Low profitability alert (profitability < 15% but > 0)
  if (financials.profitability > 0 && financials.profitability < 15) {
    alerts.push({
      id: `low-profit-${project.id}-${Date.now()}`,
      projectId: project.id,
      type: "low-profitability",
      message: `El proyecto "${project.name}" tiene una rentabilidad baja del ${financials.profitability.toFixed(1)}%. Para proyectos futuros, considera aumentar tus honorarios o reducir costos operativos.`,
      severity: "warning",
      createdAt: new Date(),
    })
  }

  return alerts
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple authentication - in real app would validate credentials
    if (email && password) {
      setIsAuthenticated(true)
    }
  }

  if (isAuthenticated) {
    return <Dashboard />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-xl">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">ArchiFinance</h1>
          <p className="text-gray-600 text-sm mt-1">Gestión financiera para arquitectos</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-gray-100 border-0 text-gray-900 placeholder:text-gray-500"
                  required
                />
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-gray-100 border-0 text-gray-900 placeholder:text-gray-500 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              >
                Log In
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <button className="text-blue-600 hover:text-blue-700 font-medium">Sign Up</button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Dashboard Component
function Dashboard() {
  const [currentScreen, setCurrentScreen] = useState("home")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [projects, setProjects] = useState<Project[]>(sampleProjects)
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions)
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set())

  const getProjectFinancials = (projectId: string) => {
    const projectTransactions = transactions.filter((t) => t.projectId === projectId)
    const totalIncome = projectTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
    const totalExpenses = projectTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
    const netProfit = totalIncome - totalExpenses
    const profitability = calculateProfitability(totalIncome, totalExpenses)

    const project = projects.find((p) => p.id === projectId)
    const budgetUsed = project ? calculateBudgetUsage(totalExpenses, project.budget) : 0

    return {
      totalIncome,
      totalExpenses,
      netProfit,
      profitability,
      budgetUsed,
    }
  }

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    }
    setTransactions((prev) => [...prev, newTransaction])
  }

  const getAllActiveAlerts = (): AIAlert[] => {
    const allAlerts: AIAlert[] = []
    projects.forEach((project) => {
      const financials = getProjectFinancials(project.id)
      const projectAlerts = generateAIAlerts(project, financials)
      allAlerts.push(...projectAlerts.filter((alert) => !dismissedAlerts.has(alert.id)))
    })
    return allAlerts
  }

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts((prev) => new Set([...prev, alertId]))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            {selectedProject && (
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <BarChart3 className="h-6 w-6" />
            <h1 className="text-lg font-semibold">ArchiFinance</h1>
          </div>
          <div className="text-sm">Ethan Carter</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto p-4 pb-20">
        {selectedProject ? (
          <ProjectDetailScreen
            project={projects.find((p) => p.id === selectedProject)!}
            transactions={transactions.filter((t) => t.projectId === selectedProject)}
            financials={getProjectFinancials(selectedProject)}
            onAddTransaction={addTransaction}
            dismissedAlerts={dismissedAlerts}
            onDismissAlert={dismissAlert}
          />
        ) : (
          <>
            {currentScreen === "home" && (
              <ProjectsScreen
                projects={projects}
                setProjects={setProjects}
                getProjectFinancials={getProjectFinancials}
                onSelectProject={setSelectedProject}
                activeAlerts={getAllActiveAlerts()}
                onDismissAlert={dismissAlert}
              />
            )}
            {currentScreen === "reports" && <ReportsScreen />}
            {currentScreen === "history" && <HistoryScreen />}
            {currentScreen === "settings" && <SettingsScreen />}
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      {!selectedProject && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-md mx-auto px-4">
            <div className="flex justify-around py-2">
              {[
                { id: "home", label: "Home", icon: "🏠" },
                { id: "reports", label: "Reports", icon: "📊" },
                { id: "history", label: "History", icon: "🕒" },
                { id: "settings", label: "Settings", icon: "⚙️" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id)}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                    currentScreen === item.id ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span className="text-lg mb-1">{item.icon}</span>
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </div>
  )
}

function ProjectsScreen({
  projects,
  setProjects,
  getProjectFinancials,
  onSelectProject,
  activeAlerts,
  onDismissAlert,
}: {
  projects: Project[]
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>
  getProjectFinancials: (projectId: string) => any
  onSelectProject: (projectId: string) => void
  activeAlerts: AIAlert[]
  onDismissAlert: (alertId: string) => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Projects</h2>
        <NewProjectModal onAddProject={(project) => setProjects((prev) => [...prev, project])} />
      </div>

      {activeAlerts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Andrés - Tu Asistente IA</h3>
          </div>
          {activeAlerts.map((alert) => (
            <AIAlertCard key={alert.id} alert={alert} onDismiss={() => onDismissAlert(alert.id)} />
          ))}
        </div>
      )}

      {/* Project Cards */}
      <div className="space-y-4">
        {projects.map((project) => {
          const financials = getProjectFinancials(project.id)
          const status = getProjectStatus(financials.profitability, financials.budgetUsed, financials.netProfit)

          return (
            <ProjectCard
              key={project.id}
              project={project}
              financials={financials}
              status={status}
              onSelect={() => onSelectProject(project.id)}
            />
          )
        })}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="text-green-600 text-sm font-medium">Total Income</div>
            <div className="text-green-900 text-xl font-bold">
              {formatCOP(projects.reduce((sum, p) => sum + getProjectFinancials(p.id).totalIncome, 0))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="text-red-600 text-sm font-medium">Total Expenses</div>
            <div className="text-red-900 text-xl font-bold">
              {formatCOP(projects.reduce((sum, p) => sum + getProjectFinancials(p.id).totalExpenses, 0))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AIAlertCard({ alert, onDismiss }: { alert: AIAlert; onDismiss: () => void }) {
  const bgColor = alert.severity === "danger" ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200"
  const iconColor = alert.severity === "danger" ? "text-red-600" : "text-yellow-600"
  const textColor = alert.severity === "danger" ? "text-red-800" : "text-yellow-800"

  return (
    <Card className={`${bgColor} shadow-sm`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-full bg-white ${iconColor}`}>
            <Bot className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-sm font-medium ${textColor} mb-1`}>Andrés - Asistente IA</p>
                <p className={`text-sm ${textColor} leading-relaxed`}>{alert.message}</p>
              </div>
              <button onClick={onDismiss} className={`p-1 hover:bg-white rounded-full transition-colors ${iconColor}`}>
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectCard({
  project,
  financials,
  status,
  onSelect,
}: {
  project: Project
  financials: any
  status: "profitable" | "at-risk"
  onSelect: () => void
}) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg">{project.name}</h3>
            <p className="text-gray-600 text-sm">Client: {project.client}</p>
          </div>
          <div className="flex items-center space-x-2">
            {status === "profitable" ? (
              <div className="flex items-center text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium">
                <CheckCircle className="h-3 w-3 mr-1" />
                Profitable
              </div>
            ) : (
              <div className="flex items-center text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-medium">
                <AlertTriangle className="h-3 w-3 mr-1" />
                At Risk
              </div>
            )}
          </div>
        </div>

        {/* Budget Progress */}
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Budget Used</span>
            <span className="font-medium">{financials.budgetUsed.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                financials.budgetUsed > 80 ? "bg-red-500" : financials.budgetUsed > 60 ? "bg-yellow-500" : "bg-blue-500"
              }`}
              style={{ width: `${Math.min(financials.budgetUsed, 100)}%` }}
            />
          </div>
        </div>

        {/* Financial Summary */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-xs text-gray-500">Income</div>
            <div className="text-sm font-semibold text-green-600">{formatCOP(financials.totalIncome)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Expenses</div>
            <div className="text-sm font-semibold text-red-600">{formatCOP(financials.totalExpenses)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Profit</div>
            <div className={`text-sm font-semibold ${financials.netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
              {formatCOP(financials.netProfit)}
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={onSelect}
          className="w-full mt-3 flex items-center justify-center text-blue-600 hover:text-blue-700 text-sm font-medium py-2 hover:bg-blue-50 rounded-lg transition-colors"
        >
          View Details
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </CardContent>
    </Card>
  )
}

function ProjectDetailScreen({
  project,
  transactions,
  financials,
  onAddTransaction,
  dismissedAlerts,
  onDismissAlert,
}: {
  project: Project
  transactions: Transaction[]
  financials: any
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void
  dismissedAlerts: Set<string>
  onDismissAlert: (alertId: string) => void
}) {
  const status = getProjectStatus(financials.profitability, financials.budgetUsed, financials.netProfit)
  const recentTransactions = transactions.slice(-5).reverse()

  const profitMargin = financials.totalIncome > 0 ? (financials.netProfit / financials.totalIncome) * 100 : 0
  const roi = project.budget > 0 ? (financials.netProfit / project.budget) * 100 : 0
  const remainingBudget = project.budget - financials.totalExpenses
  const projectedCompletion = financials.budgetUsed > 0 ? (100 / financials.budgetUsed) * 100 : 0

  const projectAlerts = generateAIAlerts(project, financials).filter((alert) => !dismissedAlerts.has(alert.id))

  // Monthly transaction analysis
  const monthlyData = transactions.reduce(
    (acc, transaction) => {
      const month = transaction.date.toLocaleDateString("es-CO", { month: "short", year: "2-digit" })
      if (!acc[month]) {
        acc[month] = { month, income: 0, expenses: 0, net: 0 }
      }
      if (transaction.type === "income") {
        acc[month].income += transaction.amount
      } else {
        acc[month].expenses += transaction.amount
      }
      acc[month].net = acc[month].income - acc[month].expenses
      return acc
    },
    {} as Record<string, any>,
  )

  const chartData = Object.values(monthlyData).map((data: any) => ({
    ...data,
    income: data.income / 1000000, // Convert to millions for display
    expenses: data.expenses / 1000000,
    net: data.net / 1000000,
  }))

  // Expense breakdown
  const expenseBreakdown = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (acc, transaction) => {
        const category = transaction.description.includes("Material")
          ? "Materials"
          : transaction.description.includes("Labor") || transaction.description.includes("Contractor")
            ? "Labor"
            : transaction.description.includes("Permit")
              ? "Permits"
              : "Other"
        acc[category] = (acc[category] || 0) + transaction.amount
        return acc
      },
      {} as Record<string, number>,
    )

  const pieData = Object.entries(expenseBreakdown).map(([name, value]) => ({
    name,
    value: value / 1000000, // Convert to millions
    percentage: ((value / financials.totalExpenses) * 100).toFixed(1),
  }))

  const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"]

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">{project.name}</h2>
        <p className="text-gray-600">Client: {project.client}</p>
      </div>

      {projectAlerts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Andrés - Análisis del Proyecto</h3>
          </div>
          {projectAlerts.map((alert) => (
            <AIAlertCard key={alert.id} alert={alert} onDismiss={() => onDismissAlert(alert.id)} />
          ))}
        </div>
      )}

      {/* Enhanced Analytics Dashboard */}
      <div className="space-y-4">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-xs font-medium">Profit Margin</p>
                  <p className="text-blue-900 text-lg font-bold">{profitMargin.toFixed(1)}%</p>
                </div>
                <div className="p-2 bg-blue-200 rounded-full">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-xs font-medium">ROI</p>
                  <p className="text-purple-900 text-lg font-bold">{roi.toFixed(1)}%</p>
                </div>
                <div className="p-2 bg-purple-200 rounded-full">
                  <Target className="h-4 w-4 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-xs font-medium">Remaining Budget</p>
                  <p className="text-orange-900 text-sm font-bold">{formatCOP(remainingBudget)}</p>
                </div>
                <div className="p-2 bg-orange-200 rounded-full">
                  <DollarSign className="h-4 w-4 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-600 text-xs font-medium">Efficiency</p>
                  <p className="text-teal-900 text-lg font-bold">{(100 - financials.budgetUsed).toFixed(0)}%</p>
                </div>
                <div className="p-2 bg-teal-200 rounded-full">
                  <CheckCircle className="h-4 w-4 text-teal-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Financial Blocks */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-green-600 text-sm font-medium mb-1">Income</div>
              <div className="text-green-900 text-2xl font-bold">{formatCOP(financials.totalIncome)}</div>
              <div className="text-green-600 text-xs mt-1">
                {transactions.filter((t) => t.type === "income").length} payments
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-red-600 text-sm font-medium mb-1">Expenses</div>
              <div className="text-red-900 text-2xl font-bold">{formatCOP(financials.totalExpenses)}</div>
              <div className="text-red-600 text-xs mt-1">
                {transactions.filter((t) => t.type === "expense").length} transactions
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Net Profit with Trend */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-blue-600 text-sm font-medium mb-1">Net Profit</div>
            <div className={`text-3xl font-bold ${financials.netProfit >= 0 ? "text-blue-900" : "text-red-600"}`}>
              {formatCOP(financials.netProfit)}
            </div>
            <div className="flex items-center justify-center mt-2 text-xs">
              {financials.profitability >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={financials.profitability >= 0 ? "text-green-600" : "text-red-600"}>
                {Math.abs(financials.profitability).toFixed(1)}% profitability
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Project Status */}
        <div className="text-center">
          {status === "profitable" ? (
            <div className="inline-flex items-center text-green-600 bg-green-100 px-4 py-2 rounded-full font-medium">
              <CheckCircle className="h-5 w-5 mr-2" />
              Profitable
            </div>
          ) : (
            <div className="inline-flex items-center text-red-600 bg-red-100 px-4 py-2 rounded-full font-medium">
              <AlertTriangle className="h-5 w-5 mr-2" />
              At Risk
            </div>
          )}
        </div>

        {/* Enhanced Budget Progress */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Budget Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Budget Used</span>
              <span className="font-medium">
                {financials.budgetUsed.toFixed(1)}% of {formatCOP(project.budget)}
              </span>
            </div>
            <Progress value={Math.min(financials.budgetUsed, 100)} className="h-3" />
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-500">Spent: </span>
                <span className="font-medium text-red-600">{formatCOP(financials.totalExpenses)}</span>
              </div>
              <div>
                <span className="text-gray-500">Remaining: </span>
                <span className="font-medium text-green-600">{formatCOP(remainingBudget)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend Chart */}
        {chartData.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Monthly Financial Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `${formatCOP(value * 1000000)}`,
                        name === "income" ? "Income" : name === "expenses" ? "Expenses" : "Net",
                      ]}
                    />
                    <Bar dataKey="income" fill="#22c55e" name="income" />
                    <Bar dataKey="expenses" fill="#ef4444" name="expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Expense Breakdown */}
        {pieData.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCOP(value * 1000000)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {pieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center text-xs">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-gray-600">
                      {entry.name}: {entry.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <TransactionModal
          type="income"
          projectId={project.id}
          onAddTransaction={onAddTransaction}
          trigger={
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Income
            </Button>
          }
        />

        <TransactionModal
          type="expense"
          projectId={project.id}
          onAddTransaction={onAddTransaction}
          trigger={
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              <Minus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          }
        />
      </div>

      {/* Recent Transactions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Transactions</h3>
        {recentTransactions.length > 0 ? (
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <Card key={transaction.id} className="shadow-sm">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <DollarSign className="h-4 w-4" />
                        ) : (
                          <Minus className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{transaction.description}</div>
                        <div className="text-sm text-gray-500">{transaction.date.toLocaleDateString("es-CO")}</div>
                      </div>
                    </div>
                    <div
                      className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCOP(transaction.amount)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No transactions yet</p>
            <p className="text-sm">Add your first income or expense above</p>
          </div>
        )}
      </div>
    </div>
  )
}

function TransactionModal({
  type,
  projectId,
  onAddTransaction,
  trigger,
}: {
  type: "income" | "expense"
  projectId: string
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void
  trigger: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onAddTransaction({
      projectId,
      type,
      amount: Number.parseInt(formData.amount),
      description: formData.description,
      date: new Date(formData.date),
    })

    setIsOpen(false)
    setFormData({
      amount: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    })
  }

  const isIncome = type === "income"

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className={isIncome ? "text-green-600" : "text-red-600"}>
            Add {isIncome ? "Income" : "Expense"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount (COP)</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
              placeholder="1000000"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder={isIncome ? "Client Payment" : "Material Purchase"}
              required
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>

          <div className="flex space-x-3">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              className={`flex-1 ${isIncome ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
            >
              Add {isIncome ? "Income" : "Expense"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function ReportsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  // Sample data for reports
  const monthlyData = [
    { month: "Ene", income: 45000000, expenses: 32000000, profit: 13000000 },
    { month: "Feb", income: 52000000, expenses: 38000000, profit: 14000000 },
    { month: "Mar", income: 48000000, expenses: 35000000, profit: 13000000 },
    { month: "Abr", income: 55000000, expenses: 40000000, profit: 15000000 },
    { month: "May", income: 60000000, expenses: 42000000, profit: 18000000 },
    { month: "Jun", income: 58000000, expenses: 41000000, profit: 17000000 },
  ]

  const projectComparison = [
    { name: "Casa Moderna", income: 35000000, expenses: 25000000, profit: 10000000 },
    { name: "Oficina", income: 25000000, expenses: 27000000, profit: -2000000 },
    { name: "Villa Costera", income: 40000000, expenses: 32000000, profit: 8000000 },
  ]

  const totalIncome = monthlyData.reduce((sum, item) => sum + item.income, 0)
  const totalExpenses = monthlyData.reduce((sum, item) => sum + item.expenses, 0)
  const totalProfit = totalIncome - totalExpenses

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Reportes</h2>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
        >
          <option value="month">Este Mes</option>
          <option value="quarter">Trimestre</option>
          <option value="year">Año</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-600">Ingresos Totales</p>
              <p className="text-lg md:text-xl font-bold text-green-600 break-words">{formatCOP(totalIncome)}</p>
            </div>
            <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-green-500 flex-shrink-0 ml-2" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-600">Gastos Totales</p>
              <p className="text-lg md:text-xl font-bold text-red-600 break-words">{formatCOP(totalExpenses)}</p>
            </div>
            <TrendingDown className="h-6 w-6 md:h-8 md:w-8 text-red-500 flex-shrink-0 ml-2" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-600">Ganancia Neta</p>
              <p
                className={`text-lg md:text-xl font-bold break-words ${totalProfit >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {formatCOP(totalProfit)}
              </p>
            </div>
            <DollarSign className="h-6 w-6 md:h-8 md:w-8 text-blue-500 flex-shrink-0 ml-2" />
          </div>
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Tendencia Mensual</h3>
        <div className="h-64 w-full overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`} />
              <Tooltip formatter={(value) => formatCOP(value)} />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#16a34a" name="Ingresos" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#dc2626" name="Gastos" strokeWidth={2} />
              <Line type="monotone" dataKey="profit" stroke="#2563eb" name="Ganancia" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Comparativo por Proyecto</h3>
        <div className="h-64 w-full overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={projectComparison} margin={{ bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} interval={0} />
              <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`} />
              <Tooltip formatter={(value) => formatCOP(value)} />
              <Legend />
              <Bar dataKey="income" fill="#16a34a" name="Ingresos" />
              <Bar dataKey="expenses" fill="#dc2626" name="Gastos" />
              <Bar dataKey="profit" fill="#2563eb" name="Ganancia" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Métricas de Rendimiento</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-blue-600">
              {((totalProfit / totalIncome) * 100).toFixed(1)}%
            </p>
            <p className="text-xs md:text-sm text-gray-600">Margen de Ganancia</p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-green-600">6</p>
            <p className="text-xs md:text-sm text-gray-600">Proyectos Activos</p>
          </div>
          <div className="text-center">
            <p className="text-sm md:text-lg font-bold text-orange-600 break-words">{formatCOP(totalIncome / 6)}</p>
            <p className="text-xs md:text-sm text-gray-600">Ingreso Promedio</p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-purple-600">85%</p>
            <p className="text-xs md:text-sm text-gray-600">Eficiencia Presupuestal</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function HistoryScreen() {
  const [filter, setFilter] = useState("all")

  const completedProjects = [
    {
      id: "2023-001",
      name: "The Modernist Residence",
      client: "María González",
      completedDate: "2024-01-15",
      totalBudget: 500000000,
      totalExpenses: 450000000,
      profit: 50000000,
      profitability: 10,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Depth%200%2C%20Frame%200-4-pg3SZY3DYu8d2V1ieA6Grah4iQnAoe.png",
      status: "completed",
    },
    {
      id: "2023-002",
      name: "Urban Loft Conversion",
      client: "Carlos Mendoza",
      completedDate: "2023-12-20",
      totalBudget: 200000000,
      totalExpenses: 180000000,
      profit: 20000000,
      profitability: 10,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Depth%200%2C%20Frame%200-5-QVtMm106SJZ5A0L5yIw29W3USH2HGx.png",
      status: "completed",
    },
    {
      id: "2023-003",
      name: "Sustainable Office Building",
      client: "EcoTech Solutions",
      completedDate: "2023-11-05",
      totalBudget: 1000000000,
      totalExpenses: 950000000,
      profit: 50000000,
      profitability: 5,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Depth%200%2C%20Frame%200-3-SieEtDxtrNYrtK6SNZ13QlIJalISkc.png",
      status: "completed",
    },
    {
      id: "2024-004",
      name: "Coastal Villa Renovation",
      client: "Ana Rodríguez",
      completedDate: "2024-02-28",
      totalBudget: 350000000,
      totalExpenses: 320000000,
      profit: 30000000,
      profitability: 8.6,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Depth%200%2C%20Frame%200-2-59RcMJw0LaxwJEAX2W4uCSoNliRnvv.png",
      status: "completed",
    },
  ]

  const filteredProjects = completedProjects.filter((project) => {
    if (filter === "all") return true
    if (filter === "profitable") return project.profit > 0
    if (filter === "recent") return new Date(project.completedDate) > new Date("2024-01-01")
    return true
  })

  const totalHistoricalProfit = completedProjects.reduce((sum, project) => sum + project.profit, 0)
  const totalHistoricalRevenue = completedProjects.reduce((sum, project) => sum + project.totalBudget, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Historial</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
        >
          <option value="all">Todos</option>
          <option value="profitable">Rentables</option>
          <option value="recent">Recientes</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-600">Proyectos Completados</p>
              <p className="text-xl md:text-2xl font-bold text-blue-600">{completedProjects.length}</p>
            </div>
            <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-blue-500 flex-shrink-0 ml-2" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-600">Ingresos Históricos</p>
              <p className="text-lg md:text-xl font-bold text-green-600 break-words">
                {formatCOP(totalHistoricalRevenue)}
              </p>
            </div>
            <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-green-500 flex-shrink-0 ml-2" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-600">Ganancia Total</p>
              <p className="text-lg md:text-xl font-bold text-blue-600 break-words">
                {formatCOP(totalHistoricalProfit)}
              </p>
            </div>
            <DollarSign className="h-6 w-6 md:h-8 md:w-8 text-blue-500 flex-shrink-0 ml-2" />
          </div>
        </div>
      </div>

      {/* Completed Projects List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Proyectos Completados</h3>
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-start space-x-4">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.name}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-500">Proyecto ID: {project.id}</p>
                    <h4 className="font-semibold text-gray-900 truncate">{project.name}</h4>
                    <p className="text-sm text-gray-600 truncate">Cliente: {project.client}</p>
                    <p className="text-sm text-gray-500">
                      Completado: {new Date(project.completedDate).toLocaleDateString("es-CO")}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completado
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 md:gap-4 text-sm">
                  <div className="min-w-0">
                    <p className="text-gray-500 text-xs">Presupuesto Total</p>
                    <p className="font-semibold break-words text-sm">{formatCOP(project.totalBudget)}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-500 text-xs">Gastos Totales</p>
                    <p className="font-semibold text-red-600 break-words text-sm">{formatCOP(project.totalExpenses)}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-500 text-xs">Ganancia</p>
                    <p
                      className={`font-semibold break-words text-sm ${project.profit >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {formatCOP(project.profit)}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-500 text-xs">Rentabilidad</p>
                    <p
                      className={`font-semibold text-sm ${project.profitability >= 15 ? "text-green-600" : project.profitability >= 0 ? "text-yellow-600" : "text-red-600"}`}
                    >
                      {project.profitability.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Archive className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>No se encontraron proyectos con los filtros seleccionados</p>
        </div>
      )}
    </div>
  )
}

function SettingsScreen() {
  const [user, setUser] = useState({
    name: "Ethan Carter",
    title: "Architect",
    email: "ethan.carter@archifinance.com",
    phone: "+57 300 123 4567",
    company: "Carter Architecture Studio",
    avatar: "/professional-architect-avatar.png",
  })

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    weeklyReports: false,
    projectUpdates: true,
  })

  const handleLogout = () => {
    // In a real app, this would clear authentication tokens
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      {/* User Profile Header */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover bg-orange-100"
            />
            <button className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.title}</p>
            <p className="text-sm text-gray-500">{user.company}</p>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Account</h3>

        <SettingsItem
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
          title="Personal Information"
          subtitle="Update your profile and contact details"
          onClick={() => {}}
        />

        <SettingsItem
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          }
          title="Password"
          subtitle="Change your password"
          onClick={() => {}}
        />

        <SettingsItem
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h8v-2H4v2zM4 11h10V9H4v2zM4 7h12V5H4v2z"
              />
            </svg>
          }
          title="Notifications"
          subtitle="Manage your notification preferences"
          onClick={() => {}}
        />
      </div>

      {/* Notifications Settings */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Notification Preferences</h4>
        <div className="space-y-3">
          <NotificationToggle
            label="Email Alerts"
            description="Receive alerts via email"
            checked={notifications.emailAlerts}
            onChange={(checked) => setNotifications((prev) => ({ ...prev, emailAlerts: checked }))}
          />
          <NotificationToggle
            label="Push Notifications"
            description="Receive push notifications"
            checked={notifications.pushNotifications}
            onChange={(checked) => setNotifications((prev) => ({ ...prev, pushNotifications: checked }))}
          />
          <NotificationToggle
            label="Weekly Reports"
            description="Get weekly financial summaries"
            checked={notifications.weeklyReports}
            onChange={(checked) => setNotifications((prev) => ({ ...prev, weeklyReports: checked }))}
          />
          <NotificationToggle
            label="Project Updates"
            description="Notifications for project milestones"
            checked={notifications.projectUpdates}
            onChange={(checked) => setNotifications((prev) => ({ ...prev, projectUpdates: checked }))}
          />
        </div>
      </div>

      {/* Support Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Support</h3>

        <SettingsItem
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          title="Help Center"
          subtitle="Find answers to common questions"
          onClick={() => {}}
        />

        <SettingsItem
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
          title="Contact Us"
          subtitle="Get in touch with our support team"
          onClick={() => {}}
        />
      </div>

      {/* Legal Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Legal</h3>

        <SettingsItem
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
          title="Terms of Service"
          subtitle="Read our terms and conditions"
          onClick={() => {}}
        />

        <SettingsItem
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          }
          title="Privacy Policy"
          subtitle="Learn how we protect your data"
          onClick={() => {}}
        />
      </div>

      {/* App Info */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-gray-900">ArchiFinance</span>
          </div>
          <p className="text-sm text-gray-600">Version 1.0.0</p>
          <p className="text-xs text-gray-500">Financial management for architects</p>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span>Logout</span>
      </button>
    </div>
  )
}

function SettingsItem({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-gray-600">{icon}</div>
          <div className="text-left">
            <p className="font-medium text-gray-900">{title}</p>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
        </div>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  )
}

function NotificationToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-blue-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )
}

function NewProjectModal({ onAddProject }: { onAddProject: (project: Project) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    budget: "",
    initialPayment: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newProject: Project = {
      id: Date.now().toString(),
      name: formData.name,
      client: formData.client,
      budget: Number.parseInt(formData.budget),
      status: "active",
      profitability: 0,
      createdAt: new Date(),
    }

    onAddProject(newProject)
    setIsOpen(false)
    setFormData({ name: "", client: "", budget: "", initialPayment: "" })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Casa Moderna Laureles"
              required
            />
          </div>

          <div>
            <Label htmlFor="client">Client Name</Label>
            <Input
              id="client"
              value={formData.client}
              onChange={(e) => setFormData((prev) => ({ ...prev, client: e.target.value }))}
              placeholder="e.g., María González"
              required
            />
          </div>

          <div>
            <Label htmlFor="budget">Budget (COP)</Label>
            <Input
              id="budget"
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
              placeholder="50000000"
              required
            />
          </div>

          <div>
            <Label htmlFor="initialPayment">Initial Payment (Optional)</Label>
            <Input
              id="initialPayment"
              type="number"
              value={formData.initialPayment}
              onChange={(e) => setFormData((prev) => ({ ...prev, initialPayment: e.target.value }))}
              placeholder="0"
            />
          </div>

          <div className="flex space-x-3">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Create Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(amount)
}
