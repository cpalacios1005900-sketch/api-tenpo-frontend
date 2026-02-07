# API Tenpo Frontend 🚀

Frontend desarrollado en **React** usando **Vite** y **TypeScript**, diseñado para consumir la API Tenpo y ofrecer una interfaz moderna, rápida y escalable.

---

## 📌 Información General

- **Proyecto:** api-tenpo-frontend  
- **Autor:** Cristian Palacios  
- **Correo:** Cristian.palacios08@hotmail.com  
- **Versión del proyecto:** 0.0.0  
- **Versión de Node.js recomendada:** v25.5.0  
- **URL local:** http://localhost:5173/

---

## 🛠️ Tecnologías Utilizadas

- **React 19**
- **TypeScript**
- **Vite**
- **Bootstrap 5**
- **Axios**
- **TanStack React Query**
- **ESLint**

---

## 📦 Dependencias Principales

| Dependencia | Versión |
|------------|--------|
| react | ^19.2.0 |
| react-dom | ^19.2.0 |
| axios | ^1.13.4 |
| bootstrap | ^5.3.8 |
| @tanstack/react-query | ^5.90.20 |

---

## 🧩 Dependencias de Desarrollo

| Dependencia | Versión |
|------------|--------|
| vite | ^7.2.4 |
| typescript | ~5.9.3 |
| eslint | ^9.39.1 |
| @vitejs/plugin-react | ^5.1.1 |

---

## ⚙️ Instalación y Ejecución Local

### 1️⃣ Requisitos Previos
- Node.js **v25.5.0**
- npm (incluido con Node.js)

Verificar versiones:
```bash
node -v
npm -v
```

### 2️⃣ Instalación de dependencias
```bash
npm install
```

### 3️⃣ Ejecución en entorno de desarrollo
```bash
npm run dev
```

La aplicación estará disponible en:
```
http://localhost:5173/
```

---

## 🧪 Otros Scripts Disponibles

| Comando | Descripción |
|-------|------------|
| npm run build | Compila el proyecto para producción |
| npm run preview | Previsualiza el build |
| npm run lint | Ejecuta ESLint |

---

## 🐳 Docker

La aplicación cuenta con una imagen publicada en **Docker Hub**.

### 📥 Descargar imagen
```bash
docker pull cpalacios100590/api-tenpo-frontend:1.0
```

### ▶️ Ejecutar contenedor
```bash
docker run -p 5173:5173 cpalacios100590/api-tenpo-frontend:1.0
```

Luego acceder desde el navegador:
```
http://localhost:5173/
```

---

## 📂 Estructura del Proyecto (resumen)

```
api-tenpo-frontend/
├── src/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   └── main.tsx
├── public/
├── package.json
├── vite.config.ts
└── README.md
```

---

## 📄 Licencia
Proyecto de uso académico y demostrativo.

---

✅ **Desarrollado por Cristian Palacios**
