import { useEffect } from "react";
import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import { useDrawerContext } from "../shared/contexts";
import { Dashboard } from "../pages";

export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

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
      <Route path="/tasks" element={<Button variant="contained" color="primary" onClick={toggleDrawerOpen}>
            Toggle Drawer
          </Button>} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
