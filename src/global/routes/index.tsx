import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Timetable } from "~/features/timetable/ui/timetable";
import { e112 } from "~/shared/data/e11.2";

const dayTypeSchema = z.enum(["weekday", "weekend", "holiday"]).default("weekday");

export type DayType = z.infer<typeof dayTypeSchema>;

export const busParamsSchema = z.object({
	bus: z.string().default(e112.name),
	dayType: dayTypeSchema,
	stopArrive: z.number().default(0),
	stopLeave: z.number().default(0),
});
export const Route = createFileRoute("/")({
	component: App,
	validateSearch: zodValidator(busParamsSchema),
});

export type BusSearch = z.infer<typeof busParamsSchema>;

export const TimetableRoute = Route;

function App() {
	return <Timetable />;
}
