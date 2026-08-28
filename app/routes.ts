import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/initial-auth.tsx"),
	route("login", "routes/login.tsx"),
	route("sign-up", "routes/sign-up.tsx"),
	route("home", "routes/home.tsx"),
	route("service-portal", "routes/service-portal.tsx"),
	route("maintenance-and-support", "routes/maintenance-and-support.tsx"),
	route("practice-design", "routes/practice-design.tsx"),
	route("product-training", "routes/product-training.tsx"),
	route("consultancy", "routes/consultancy.tsx"),
	route("my-equipment", "routes/my-equipment.tsx"),
	route("documents", "routes/documents.tsx"),
	route("notifications", "routes/notifications.tsx"),
	route("my-account", "routes/my-account.tsx"),
	route("customer-account", "routes/customer-account.tsx"),
	route("technician-dashboard", "routes/technician-dashboard.tsx"),
	route("technician-reports", "routes/technician-reports.tsx"),
	route("technician-users", "routes/technician-users.tsx"),
] satisfies RouteConfig;
