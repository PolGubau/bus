import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "~/shared/ui/header/layout-header";

export const Route = createRootRoute({
	component: () => {
		return (
			<>
				<Header />
				<Outlet />
				{/* <TanstackDevtools
					config={{
						position: "bottom-left",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/> */}
			</>
		);
	},
});
