import { getRouteApi } from "@tanstack/react-router";
import type React from "react";
import { useMemo } from "react";
import { e112 } from "~/shared/data/e11.2";
import { Header } from "./header";

const hoursAndMinutesToMinutes = (hours: number, minutes: number) => hours * 60 + minutes;

const currentTimeToMinutes = hoursAndMinutesToMinutes(new Date().getHours(), new Date().getMinutes());

function dateToMinutes(date: Date): number {
	return hoursAndMinutesToMinutes(date.getHours(), date.getMinutes());
}

/**
 * Convierte un string HH:mm en un objeto Date del día actual
 */
export function timeToDate(time: string): Date {
	const [hours, minutes] = time.split(":").map(Number);
	const now = new Date();
	return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
}

const routeApi = getRouteApi("/");
export const Timetable: React.FC = () => {
	const { dayType, stopLeave, stopArrive } = routeApi.useSearch();

	const stopLeaveHours = e112.stops[stopLeave].dayTypes[dayType];
	const stopArriveHours = e112.stops[stopArrive].dayTypes[dayType];

	const firstStopInMinutes = stopLeaveHours.map((stop) => dateToMinutes(timeToDate(stop)));

	const nextBusHourInMinutes = firstStopInMinutes.find((m) => m > currentTimeToMinutes);

	const indexOfNextBusHourInMinutes = firstStopInMinutes.indexOf(nextBusHourInMinutes ?? -1);

	const firstStopList = useMemo(
		() =>
			stopLeaveHours.map((stop, index) => (
				<li
					className={`${index === indexOfNextBusHourInMinutes ? "text-red-500" : "text-foreground/70"} text-xl md:text-5xl leading-normal w-full text-center`}
					key={stop}
				>
					{stop}
				</li>
			)),
		[stopLeaveHours, indexOfNextBusHourInMinutes],
	);

	const secondStopList = useMemo(
		() =>
			stopArriveHours.map((stop, index) => (
				<li
					className={`${index === indexOfNextBusHourInMinutes ? "text-red-500" : "text-foreground/70"} text-xl md:text-5xl leading-normal w-full text-center`}
					key={stop}
				>
					{stop}
				</li>
			)),
		[stopArriveHours, indexOfNextBusHourInMinutes],
	);

	return (
		<main>
			<Header />
			{/* Hours */}
			<section className="grid grid-cols-2 py-4 pb-12">
				<ul>{firstStopList}</ul>
				<ul>{secondStopList}</ul>
			</section>

			{/* Bottom shadow */}
			<div className="h-6 w-full bg-gradient-to-t from-[#f0f1f2] to-transparent sticky bottom-0" />
		</main>
	);
};
