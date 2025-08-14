import { getRouteApi, useNavigate } from "@tanstack/react-router";
import type { ChangeEvent } from "react";
import arrowLg from "~/assets/arrow-lg.svg";
import { TimetableRoute } from "~/global/routes";
import { buses } from "~/shared/data/buses";
import { e112 } from "~/shared/data/e11.2";

const routeApi = getRouteApi("/");

export default function StopsSelector() {
	const { stopArrive, stopLeave, bus } = routeApi.useSearch();
	const navigate = useNavigate({ from: TimetableRoute.fullPath });

	const selectedBus = buses.find((b) => b.name === bus) ?? e112;

	const stopsAmount = selectedBus.stops.length;

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
		<div className="flex items-center">
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
		</div>
	);
}
