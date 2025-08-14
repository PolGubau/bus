import { e112 } from "./e11.2";

export type Bus = {
	name: string;
	from: string;
	to: string;
	color: string;
	stops: BusStop[];
};
type BusStop = {
	id: string;
	name: string;
	geo: {
		lat: number;
		long: number;
	};
	dayTypes: {
		weekday: string[];
		weekend: string[];
		holiday: string[];
	};
};

export const buses = [e112];
