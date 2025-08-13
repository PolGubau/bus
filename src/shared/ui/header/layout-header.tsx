import { Link } from "@tanstack/react-router";
import React from "react";
import arrow from "~/assets/arrow.svg";

const routes = [
  { path: "/", label: "Horario" },
  { path: "/in-text", label: "Ver en texto" },
];

export const Header: React.FC = () => {
  return (
    <header className="grid grid-cols-[1fr_auto] gap-4 items-center p-4">
      <div className="flex flex-col">

      <div className="text-base">Horario</div>
      <b className="flex items-center">
        E11.1 Mataró
        <img src={arrow} alt="arrow" className="mx-1.5" />
        Barcelona
      </b>


      
      </div>

      <nav className="flex gap-2 items-center">
        {routes.map((route) => (
          <Link
            key={route.path}
            className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded cursor-pointer"
        to={route.path}
        activeProps={{ className: "bg-gray-300" }}
      >
        {route.label}
      </Link>
    ))}

      </nav>

    </header>
  );
};

