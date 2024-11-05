import React from "react";
import {
  BookCheck,
  BarChart3,
  DollarSign,
  Package,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    name: "Productos en stock",
    value: "48",
    change: "+12%",
    changeType: "increase",
    icon: Package,
  },
  {
    name: "Dinero de producto",
    value: "$45,231",
    changeType: "increase",
    icon: DollarSign,
  },
  {
    name: "Ordenes pendientes",
    value: "12",
    changeType: "increase",
    icon: BarChart3,
  },
  {
    name: "Ordenes realizadas",
    value: "24",
    changeType: "increase",
    icon: TrendingUp,
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Panel de métricas</h1>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-blue-500 rounded-md p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.value}
              </p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold
                  ${
                    item.changeType === "increase"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
              >
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Últimos Productos ingresados
          </h2>
          <div className="space-y-5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Rueda {i + 1}
                    </p>
                    <p className="text-sm text-gray-500">
                      Agregado hace 2 horas
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">$890</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Resumen de presupuestos
          </h2>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-gray-700">
                      Categoría del presupuesto {i + 1}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">
                      {70 + i * 5}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
                  <div
                    style={{ width: `${70 + i * 5}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 grid-cols-1">
            Listado de Presupuestos Pendientes
          </h2>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <BookCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Presupuesto para Juan {i + 1}
                    </p>
                    <p className="text-sm text-gray-500">
                      Service completo del auto, incluye producto: Rueda
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">$890</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
