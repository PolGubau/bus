import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { InText } from "~/global/pages/in-text/in-text";
import { busParamsSchema } from ".";
 
export const Route = createFileRoute("/in-text")({
	component: InTextPage,
	validateSearch: zodValidator(busParamsSchema),
	
});

export const InTextRoute = Route
	

function InTextPage() {
	return <InText />;
}
