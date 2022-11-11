import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useDrawerContext } from "../shared/contexts";
import { Dashboard, ListagemDeTasks } from "../pages";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        label: "Home",
        path: "/home",
      },
      {
        icon: "task",
        label: "Tasks",
        path: "/tasks",
      },
    ])
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />

      <Route path="/tasks" element={<ListagemDeTasks />} />
      <Route path="/task/detalhe/:id" element={<p>Detalhe</p>} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
