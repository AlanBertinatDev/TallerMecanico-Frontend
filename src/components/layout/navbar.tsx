import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  PackageSearch,
  CarFront,
  Car,
  Package,
  PiggyBank,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuthStore();
  const [isGestionOpen, setGestionOpen] = useState(false); // Estado para manejar el submenú

  const navItems = [
    { path: "/", label: "Inicio", icon: CarFront },
    {
      label: "Gestión",
      icon: PackageSearch,
      subItems: [
        { path: "/clientes", label: "Clientes" },
        { path: "/servicios", label: "Servicios" },
        { path: "/productos", label: "Productos" },
      ],
    },
    { path: "/presupuesto", label: "Presupuesto", icon: PiggyBank },
    { path: "/budget", label: "Órdenes", icon: Package },
  ];

  return (
    <nav className="bg-white border-b border-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Car className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Taller Mecanico
              </span>
            </div>
            <div className="flex items-center sm:ml-10 sm:flex sm:space-x-10">
              {navItems.map(({ path, label, icon: Icon, subItems }) => (
                <div key={label} className="relative">
                  {subItems ? (
                    <>
                      <button
                        onClick={() => setGestionOpen(!isGestionOpen)}
                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                          isGestionOpen
                            ? "border-b-2 border-blue-500 text-gray-900"
                            : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {label}
                      </button>
                      {isGestionOpen && (
                        <ul className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg">
                          {subItems.map((subItem) => (
                            <li key={subItem.label}>
                              <Link
                                to={subItem.path}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={path}
                      className={`
                        inline-flex items-center px-1 pt-1 text-sm font-medium
                        ${
                          location.pathname === path
                            ? "border-b-2 border-blue-500 text-gray-900"
                            : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={logout}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
