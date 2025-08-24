# ArchiFinance - App de Gestión Financiera para Arquitectos

## Descripción del Proyecto

Crear ArchiFinance, una aplicación móvil especializada para arquitectos que necesitan gestionar las finanzas de sus proyectos de manera simple y efectiva, con alertas inteligentes de un agente IA.

## Tecnologías Específicas a Utilizar

### Framework y Librerías Base
- React 18 con Hooks (useState, useEffect, useReducer)
- TypeScript para tipado estático
- Tailwind CSS v4 para estilos responsivos y modernos
- Lucide React para iconografía consistente
- Recharts para gráficos y visualización de datos

### Características Técnicas
- Componentes funcionales con arquitectura moderna de React
- Responsive Design con enfoque mobile-first
- Gestión de estado local (sin localStorage por restricciones del entorno)
- Formato de moneda colombiano (COP) para presupuestos y transacciones
- Tema oscuro personalizado (#2D3748)

## Funcionalidades Principales

### Dashboard de Proyectos Activos
- Tarjetas visuales que muestran rentabilidad en tiempo real
- Barras de progreso del uso de presupuesto
- Indicadores de estado: "Rentable ✅" (verde) o "En riesgo ⚠️" (amarillo/rojo)
- Botón prominente "➕ Nuevo Proyecto"

### Panel de Rentabilidad Visual
- Tres bloques visuales: ingresos (verde), gastos (rojo) y ganancia neta (azul)
- Barra de estado grande: "Rentable ✅" o "En riesgo ⚠️"
- Cálculos automáticos de rentabilidad, margen de ganancia y uso de presupuesto

### Agente IA "Andrés" - Sistema de Alertas Inteligentes
- Tarjetas de alertas automáticas que aparecen cuando:
  - Gastos superan el 80% del presupuesto
  - Proyecto genera pérdidas (ganancia neta < 0)
  - Rentabilidad es baja (< 15%)
- Tarjetas amarillas con ícono de bot y texto explicativo
- Mensajes personalizados por proyecto

### Gestión de Transacciones
- Modales específicos para ingresos (verde) y gastos (rojo)
- Formularios simples de 3 campos: monto, concepto, fecha (prellenada con hoy)
- Actualización inmediata de cálculos de rentabilidad
- Botones de acción rápida: "Agregar Ingreso" y "Agregar Gasto"

### Creación de Proyectos
- Modal con campos esenciales: nombre del proyecto, cliente, presupuesto inicial
- Campo opcional para registrar dinero ya recibido
- Validación simple y creación inmediata

## Flujo de Usuario Completo

### 1. Inicio de Sesión Simple
- Pantalla con correo electrónico y contraseña
- Branding de la app con logo de BarChart3
- Botón de mostrar/ocultar contraseña
- Diseño limpio y centrado

### 2. Dashboard Principal
- Vista inmediata de proyectos en curso en formato de tarjetas
- Cada tarjeta muestra: nombre, cliente, barra de progreso, estado de rentabilidad
- Grid de métricas: ingresos, gastos, ganancia en formato "X.XM" (millones)

### 3. Vista Detallada del Proyecto
- Navegación "← Volver" al dashboard
- Panel de rentabilidad con bloques visuales grandes
- Lista de transacciones recientes (últimas 5)
- Botones para agregar ingresos/gastos

### 4. Navegación Inferior Fija
- Inicio: Dashboard de proyectos activos
- Reportes: Gráficas comparativas y métricas totales
- Historial: Proyectos cerrados con métricas
- Ajustes: Configuración y perfil de usuario

## Lógica de Negocio

### Cálculos Automáticos
- Rentabilidad: (Ingresos - Gastos) / Ingresos * 100
- Uso de presupuesto: Gastos / Presupuesto * 100
- Estado "En riesgo": Cuando gastos > 80% presupuesto O ganancia neta < 0
- Formato moneda: Pesos colombianos sin decimales, formato "X.XM"

### Alertas IA - Umbrales
- Alerta de presupuesto: gastos > 80%
- Alerta de pérdidas: ganancia neta < 0
- Alerta de baja rentabilidad: rentabilidad < 15% y > 0

## Diseño Visual

### Paleta de Colores
- Azul primario: #2563eb (elementos principales y branding)
- Verde: #16a34a (ingresos y estados positivos)
- Rojo: #dc2626 (gastos y alertas)
- Amarillo: #eab308 (advertencias)
- Grises neutros: Para texto y fondos

### Estilos
- Tipografía: System fonts con jerarquía clara
- Espaciado: Padding generoso (p-4, p-3) para uso táctil
- Bordes: rounded-xl para tarjetas, rounded-lg para botones
- Sombras: shadow-sm para elevación sutil
- Estados hover: Transiciones suaves en interacciones

## Estructura de Componentes Requerida

### Componentes Principales
- LoginScreen: Autenticación con diseño centrado
- Dashboard: Lista de proyectos con tarjetas interactivas
- ProjectCard: Componente reutilizable para info de proyecto
- ProjectDetail: Vista completa con panel de rentabilidad
- ProfitabilityPanel: Bloques visuales de métricas financieras
- AIAgentCards: Tarjetas de alertas del agente IA
- TransactionModal: Modal para registro de ingresos/gastos
- NewProjectModal: Formulario de creación de proyectos
- BottomNavigation: Navegación inferior fija

### Pantallas Adicionales
- ReportsScreen: Gráficos con BarChart de Recharts
- HistoryScreen: Proyectos completados
- SettingsScreen: Perfil y configuración

## Datos de Ejemplo Incluir

### Proyectos de muestra:
1. Casa Moderna Laureles
   - Cliente: María González
   - Presupuesto: $50,000,000 COP
   - Ingresos: $35,000,000
   - Gastos: $18,500,000
   - Transacciones variadas

2. Remodelación Oficina
   - Cliente: Empresas SAS
   - Presupuesto: $30,000,000 COP
   - Ingresos: $15,000,000
   - Gastos: $22,000,000 (proyecto en riesgo)

### Proyecto cerrado:
- Apartamento El Poblado (completado, rentabilidad 33.3%)

## Funcionalidades MVP vs Futuras

### MVP Inicial
- Crear proyectos y registrar transacciones
- Cálculo automático de rentabilidad
- Panel visual de estado financiero
- Alertas básicas del agente IA

## Indicaciones Especiales

- Usar gestión de estado con useState/useReducer
- NO usar localStorage (restricción del entorno)
- Mobile-first con max-width centrado
- Header fijo azul con branding
- Navegación inferior siempre visible
- Modales con overlay oscuro
- Validación de formularios básica
- Transiciones suaves en todos los elementos

## Resultado Esperado

Una aplicación React completa, funcional y con datos de ejemplo que demuestre todas las funcionalidades del MVP. La app debe sentirse como una aplicación móvil profesional, con navegación intuitiva y diseño moderno optimizado para arquitectos colombianos.