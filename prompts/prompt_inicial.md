# 🏗️ ArchiFinance - App de Gestión Financiera para Arquitectos

## 🎯 Funcionalidades Principales

### 📋 Funcionalidades Mínimas (MVP Inicial)
- **Crear proyectos** y registrar **ingresos/egresos**
- **Cálculo automático** de ganancia neta
- **Panel visual** de rentabilidad
- **Tarjetas de alerta** del agente IA (solo básicas: riesgo de pérdida y pagos pendientes)

---

## 📊 Funcionalidades Completas

### 📱 Dashboard de Proyectos Activos
- Tarjetas visuales que muestran **rentabilidad en tiempo real**

### 📈 Panel de Rentabilidad Visual
- Barras de progreso
- Indicadores de **ganancia neta**
- Estado general del proyecto

### 🤖 Agente IA "Andrés"
- Genera **tarjetas de alertas inteligentes** sobre:
  - Riesgos financieros
  - Pagos pendientes
  - Comparaciones entre proyectos

### 💰 Registro Rápido de Transacciones
- Formularios simples de **3 campos** (monto, concepto, fecha)

### 🆕 Creación de Proyectos
- Datos básicos (nombre, cliente, presupuesto inicial)

### 📚 Historial de Proyectos
- Proyectos cerrados con **métricas de rentabilidad** y aprendizajes

### 🧭 Navegación Inferior
- Acceso rápido a secciones principales

---

## ⚙️ Requisitos Técnicos

- **React** con gestión de estado local (`useState`/`useReducer`)
- **Tailwind CSS** para estilos responsivos y modernos
- **Lucide React** para iconografía consistente
- Diseño **mobile-first** optimizado para smartphones
- Persistencia en memoria durante la sesión
- Formato de moneda colombiano (**COP**)
- Cálculos automáticos de:
  - Rentabilidad
  - Margen de ganancia
  - Uso de presupuesto

---

## 🔄 Flujo de Usuario Completo

### 1. **Inicio de Sesión Simple**
- Acceso con correo electrónico
- Pantalla limpia con branding de la app

### 2. **Dashboard Principal - Proyectos Activos**
- Vista de todos los proyectos en curso en formato de tarjetas
- Cada tarjeta muestra:
  - Nombre del proyecto
  - Cliente
  - Barra de progreso del presupuesto
  - Estado de rentabilidad
- Botón "➕ Nuevo Proyecto" en parte superior
- Indicadores visuales:
  - "Rentable ✅" (verde)
  - "En riesgo ⚠️" (amarillo/rojo)

### 3. **Creación de Nuevo Proyecto**
- Modal con campos esenciales
- Campo opcional para dinero ya recibido
- Validación simple y creación inmediata

### 4. **Vista Detallada del Proyecto**
- **Panel de Rentabilidad**:
  - Ingresos (🟢 verde)
  - Gastos (🔴 rojo)
  - Ganancia neta (🔵 azul)
- Barra de estado: "Rentable ✅" o "En riesgo ⚠️"
- Botones de acción rápida:
  - "Agregar Ingreso"
  - "Agregar Gasto"

### 5. **Registro de Transacciones**
- Modal específico por tipo (ingreso/gasto)
- Tres campos simples: monto, concepto, fecha
- Actualización inmediata de cálculos

### 6. **Agente IA "Andrés" - Tarjetas de Alerta**
- Alertas automáticas:
  - "Tus gastos ya son el 80% del presupuesto"
  - "Faltan pagos a 2 empleados esta semana"
  - "Este proyecto está dejando menos margen que el anterior"
- Tarjetas amarillas con ícono de advertencia

### 7. **Navegación Inferior**
- 🏠 **Inicio**: Dashboard de proyectos activos
- 📊 **Reportes**: Gráficas y análisis (futuro)
- 📚 **Historial**: Proyectos cerrados con métricas
- ⚙️ **Ajustes**: Configuración de la app

---

## 🧩 Estructura de Componentes

- `LoginScreen`: Pantalla de autenticación
- `Dashboard`: Lista de proyectos activos
- `ProjectCard`: Tarjeta de proyecto reutilizable
- `ProjectDetail`: Vista completa del proyecto
- `ProfitabilityPanel`: Bloques visuales de finanzas
- `AIAgentCards`: Tarjetas de alertas IA
- `TransactionModal`: Registro de ingresos/gastos
- `NewProjectModal`: Formulario de creación
- `BottomNavigation`: Navegación inferior fija

---

## 🎨 Diseño Visual

### 🎨 Paleta de Colores
- **Azul primario** (`#2563eb`) - Elementos principales
- **Verde** (`#16a34a`) - Ingresos y estados positivos
- **Rojo** (`#dc2626`) - Gastos y alertas
- **Amarillo** (`#eab308`) - Advertencias
- **Grises neutros** - Texto y fondos

### ✨ Estilo
- **Tipografía**: System fonts con jerarquía clara
- **Espaciado**: Padding generoso (`p-4`, `p-3`)
- **Bordes redondeados**: `rounded-xl` (tarjetas), `rounded-lg` (botones)
- **Sombras sutiles**: `shadow-sm` para elevación
- **Estados hover**: Transiciones suaves

---

## 🧠 Lógica de Negocio

- **Cálculo de rentabilidad**: `(Ingresos - Gastos) / Ingresos * 100`
- **Uso de presupuesto**: `Gastos / Presupuesto * 100`
- **Estado "En riesgo"**:
  - Gastos > 80% del presupuesto
  - Ganancia neta < 0
- **Formato de moneda**: Pesos colombianos sin decimales
- **Alertas IA**: Se activan por umbrales predefinidos

---

## 🚀 MVP vs Funcionalidades Futuras
*(Por definir en próximas iteraciones)*