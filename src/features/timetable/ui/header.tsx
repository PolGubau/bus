import { getRouteApi, useNavigate } from "@tanstack/react-router";
import type { ChangeEvent } from "react";
import arrow from "~/assets/arrow.svg";
import { TimetableRoute } from "~/global/routes";
import { buses } from "~/shared/data/buses";
import "./select.css";
import StopsChooser from "./stops-chooser";

const routeApi = getRouteApi("/");

export function Header() {
	const { dayType } = routeApi.useSearch();

	const navigate = useNavigate({ from: TimetableRoute.fullPath });

	return (
		<header className="bg-white sticky top-0 px-6 pt-4 z-10   after:content-[''] after:block after:h-6 after:w-full after:left-0 after:bg-gradient-to-b after:from-[#f0f1f2] after:to-transparent after:absolute">
			<div className="border-b border-black/10 pb-4">
				<form className="flex flex-col">
					<label className="text-base" htmlFor="pet-select">
						Horario
					</label>
					<select
						className="w-full md:w-1/2"
						id="pet-select"
						name="bus"
						onChange={(e: ChangeEvent<HTMLSelectElement>) => {
							navigate({
								search: (prev) => ({ ...prev, [e.target.name]: e.target.value }),
							});
						}}
						value={dayType}
					>
						{buses.map((bus) => (
							<option key={bus.name} value={bus.name}>
								<span
									aria-hidden="true"
									className="icon rounded-full w-4 h-4"
									style={{
										backgroundColor: bus.color || "#0BBC90",
									}}
								/>

								<span className="option-label">{bus.name}</span>
								<span className="text-foreground/70 flex items-center gap-1 direction">
									{bus.from} <img alt="arrow" className="mx-1.5" src={arrow} /> {bus.to}
								</span>
							</option>
						))}
					</select>
				</form>

				<select
					className="appearance-none font-inherit leading-inherit font-normal text-current pr-4 bg-transparent rounded-none border-0 bg-[url('./caret-down.svg')] bg-no-repeat bg-[top_10px_right] outline-none"
					name="dayType"
					onChange={(e: ChangeEvent<HTMLSelectElement>) => {
						navigate({
							search: (prev) => ({ ...prev, [e.target.name]: e.target.value }),
						});
					}}
					value={dayType}
				>
					<option value="weekday">Día laboral</option>
					<option value="weekend">Fin de semana</option>
					<option value="holiday">Día festivo</option>
				</select>
			</div>
			<StopsChooser />
		</header>
	);
}
