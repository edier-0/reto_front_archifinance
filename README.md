# ArchiFinance 🏗️💰

**Sistema de Gestión Financiera para Arquitectos**

ArchiFinance es una aplicación web moderna diseñada específicamente para arquitectos que necesitan gestionar las finanzas de sus proyectos de manera eficiente. Con inteligencia artificial integrada y análisis en tiempo real, ayuda a los profesionales de la arquitectura a mantener el control total sobre la rentabilidad de sus proyectos.

## ✨ Características Principales

### 📊 **Dashboard de Proyectos**
- Vista general de todos los proyectos activos
- Indicadores de rentabilidad en tiempo real
- Barras de progreso de presupuesto
- Tarjetas de resumen financiero

### 💳 **Gestión de Transacciones**
- Registro rápido de ingresos y gastos
- Formularios intuitivos con validación
- Historial de transacciones recientes
- Actualización automática de métricas

### 📈 **Análisis de Rentabilidad**
- Cálculos automáticos de margen de ganancia
- ROI (Retorno de Inversión) por proyecto
- Eficiencia presupuestaria
- Gráficos interactivos con tendencias mensuales

### 🤖 **Asistente IA "Andrés"**
- Alertas inteligentes sobre el estado financiero
- Advertencias de presupuesto (>80% utilizado)
- Notificaciones de pérdidas
- Alertas de baja rentabilidad (<15%)

### 📋 **Reportes Avanzados**
- Análisis comparativo entre proyectos
- Tendencias de ingresos y gastos
- Métricas de rendimiento
- Gráficos de barras y circulares

### 📚 **Historial de Proyectos**
- Archivo de proyectos completados
- Filtros por estado y rentabilidad
- Resúmenes históricos
- Análisis de rendimiento pasado

### ⚙️ **Configuración Personalizada**
- Perfil de usuario personalizable
- Configuración de notificaciones
- Gestión de cuenta
- Soporte y ayuda integrados

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18 con TypeScript
- **Estilos**: Tailwind CSS v4
- **Gráficos**: Recharts
- **Iconos**: Lucide React
- **Framework**: Next.js (App Router)
- **Moneda**: Formateo en Pesos Colombianos (COP)

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Probar demo
👉 https://v0-archi-finance-project-reports.vercel.app/

### Pasos de Instalación

1. **Clonar el repositorio**
\`\`\`bash
git clone https://github.com/tu-usuario/archifinance.git
cd archifinance
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
# o
yarn install
\`\`\`

3. **Ejecutar en modo desarrollo**
\`\`\`bash
npm run dev
# o
yarn dev
\`\`\`

4. **Abrir en el navegador**
\`\`\`
http://localhost:3000
\`\`\`

## 📱 Uso de la Aplicación

### Inicio de Sesión
- Ingresa con tu email y contraseña
- La aplicación incluye datos de demostración para pruebas

### Gestión de Proyectos
1. **Crear Proyecto**: Usa el botón "+" en el dashboard
2. **Ver Detalles**: Toca cualquier tarjeta de proyecto
3. **Agregar Transacciones**: Usa los botones "Agregar Ingreso" y "Agregar Gasto"

### Navegación
- **Inicio**: Dashboard principal con proyectos activos
- **Reportes**: Análisis y gráficos comparativos
- **Historial**: Proyectos completados y archivo
- **Configuración**: Perfil y ajustes de la aplicación

## 📊 Datos de Ejemplo

La aplicación incluye proyectos de muestra:

- **Casa Moderna Laureles** (Rentable - 25%)
- **Remodelación Oficina** (En Riesgo - -5%)
- **Villa Costera** (Rentable - 20%)

## 🎨 Diseño y UX

### Paleta de Colores
- **Primario**: Azul (#2563eb)
- **Éxito**: Verde (#16a34a) 
- **Advertencia**: Amarillo (#eab308)
- **Error**: Rojo (#dc2626)
- **Neutros**: Escala de grises

### Responsive Design
- **Mobile First**: Optimizado para dispositivos móviles
- **Navegación Inferior**: Acceso rápido en móviles
- **Adaptable**: Funciona en tablets y desktop

## 🔧 Estructura del Proyecto

\`\`\`
archifinance/
├── app/
│   ├── page.tsx          # Componente principal
│   ├── layout.tsx        # Layout base
│   └── globals.css       # Estilos globales
├── lib/
│   ├── types.ts          # Definiciones TypeScript
│   └── utils.ts          # Utilidades y helpers
├── components/
│   └── ui/               # Componentes UI base
├── public/
│   └── images/           # Imágenes y assets
└── README.md
\`\`\`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si encuentras algún problema o tienes sugerencias:

1. Abre un issue en GitHub
2. Contacta al equipo de desarrollo
3. Revisa la documentación en la sección de ayuda

## 🔮 Próximas Funcionalidades

- [ ] Integración con APIs de bancos colombianos
- [ ] Exportación de reportes en PDF
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] Integración con calendarios
- [ ] Múltiples monedas
- [ ] Roles de usuario (arquitecto, contador, cliente)

---

**Desarrollado con ❤️ para la comunidad de arquitectos colombianos**

*ArchiFinance - Donde la arquitectura se encuentra con las finanzas inteligentes*
