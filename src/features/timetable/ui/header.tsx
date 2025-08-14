import { getRouteApi, useNavigate } from "@tanstack/react-router";
import type { ChangeEvent } from "react";
import arrow from "~/assets/arrow.svg";
import arrowLg from "~/assets/arrow-lg.svg";
import { TimetableRoute } from "~/global/routes";
import { buses } from "~/shared/data/buses";
import { e112 } from "~/shared/data/e11.2";
import "./select.css";
const routeApi = getRouteApi("/");

export function Header() {
	const { dayType, stopArrive, stopLeave, bus } = routeApi.useSearch();

	const selectedBus = buses.find((b) => b.name === bus) ?? e112;
	const stopsAmount = selectedBus.stops.length;

	const navigate = useNavigate({ from: TimetableRoute.fullPath });
	const leaveStopNames = selectedBus.stops.map((stop, index) => (
		<option disabled={index === stopsAmount - 1} key={stop.id} value={index}>
			{stop.name}
		</option>
	));

	const arriveStopNames = selectedBus.stops.map((stop, index) => (
		<option disabled={index <= stopLeave} key={stop.id} value={index}>
			{stop.name}
		</option>
	));
	return (
		<header className="bg-white sticky top-0 px-6 pt-4 z-10   after:content-[''] after:block after:h-6 after:w-full after:left-0 after:bg-gradient-to-b after:from-[#f0f1f2] after:to-transparent after:absolute">
			<div className="border-b border-black/10 pb-4">
				<div className="flex flex-col">
					<div className="text-base">Horario</div>
				</div>
				<form>
					<p>
						<label className="text-base" htmlFor="pet-select">
							Horario
						</label>
						<select id="pet-select">
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
					</p>
				</form>

				<select
					className="appearance-none font-inherit leading-inherit font-normal text-current pr-4 bg-transparent rounded-none border-0 bg-[url('./caret-down.svg')] bg-no-repeat bg-[top_10px_right] outline-none"
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
							{bus.name}{" "}
							<span className="text-gray-500">
								<img alt="arrow" className="mx-1.5" src={arrow} />({bus.from} - {bus.to})
							</span>
						</option>
					))}
				</select>

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
			<header className="flex items-center">
				<div className="w-1/2 my-4">
					<div className="text-[10px] leading-4 font-bold tracking-[.05em]">SALIDA</div>
					<select
						className="w-full appearance-none pr-4 bg-transparent bg-[url('./caret-down.svg')] bg-no-repeat bg-[top_10px_right] outline-none"
						name="stopLeave"
						onChange={(e: ChangeEvent<HTMLSelectElement>) => {
							navigate({
								search: (prev) => ({ ...prev, [e.target.name]: Number(e.target.value) }),
							});
						}}
						value={stopLeave}
					>
						{leaveStopNames}
					</select>
				</div>

				<div className="mx-5">
					<img alt="arrow" src={arrowLg} />
				</div>

				<div className="w-1/2 my-4">
					<div className="text-[10px] leading-4 font-bold tracking-[.05em]">LLEGADA</div>
					<select
						className="w-full appearance-none pr-4 bg-transparent bg-[url('./caret-down.svg')] bg-no-repeat bg-[top_10px_right] outline-none"
						name="stopArrive"
						onChange={(e: ChangeEvent<HTMLSelectElement>) => {
							navigate({
								search: (prev) => ({ ...prev, [e.target.name]: Number(e.target.value) }),
							});
						}}
						value={stopArrive}
					>
						{arriveStopNames}
					</select>
				</div>
			</header>
			;
		</header>
	);
}
