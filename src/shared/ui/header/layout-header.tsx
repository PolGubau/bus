import { Link } from "@tanstack/react-router";
import type React from "react";

const routes = [
	{ label: "Horario", path: "/" },
	{ label: "Ver en texto", path: "/in-text" },
];

export const Header: React.FC = () => {
	return (
		<nav className="flex gap-2 items-center fixed top-4 right-4 z-20">
			{routes.map((route) => (
				<Link
					activeProps={{ className: "bg-gray-300" }}
					className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded cursor-pointer"
					key={route.path}
					to={route.path}
				>
					{route.label}
				</Link>
			))}
		</nav>
	);
};
