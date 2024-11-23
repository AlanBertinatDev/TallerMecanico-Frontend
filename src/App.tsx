import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { Navbar } from "./components/layout/navbar";
import { Login } from "./pages/Login";

// Enlazado con lazy de rutas
const Ordenes = React.lazy(() => import("./pages/Ordenes"));
const Inicio = React.lazy(() => import("./pages/Inicio"));
const Presupuesto = React.lazy(
  () => import("./pages/gestion/presupuestos/Presupuesto")
);

// Rutas para la sección de gestión
const Clientes = React.lazy(() => import("./pages/gestion/clientes/Clientes"));
const Productos = React.lazy(
  () => import("./pages/gestion/productos/Productos")
);
const Servicios = React.lazy(() => import("./pages/gestion/Servicios"));

// const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { user, isLoading } = useAuthStore();

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
//       </div>
//     );
//   }

//   return user ? <>{children}</> : <Navigate to="/login" />;
// };

function App() {
  // const checkAuth = useAuthStore((state) => state.checkAuth);

  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            // <PrivateRoute>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main className="max-w-7xl mx-auto py-6 sm:px-8 lg:px-10">
                <React.Suspense
                  fallback={
                    <div className="flex items-center justify-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
                    </div>
                  }
                >
                  <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/ordenes" element={<Ordenes />} />
                    <Route path="/presupuesto" element={<Presupuesto />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/servicios" element={<Servicios />} />
                    <Route path="/productos" element={<Productos />} />
                  </Routes>
                </React.Suspense>
              </main>
            </div>
            // </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
