import React from "react";
import { Input } from "../ui/Input";

const PresupuestoFilters = () => {
  return (
    <div className="flex">
      <Input
        placeholder="Buscar presupuesto por estado"
        //value={searchTerm}
        /*onChange={(e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
      }}*/
        className="min-w-[150px] sm:min-w-[200px] md:min-w-[300px] lg:min-w-[400px] max-w-full"
      />
    </div>
  );
};

export default PresupuestoFilters;
