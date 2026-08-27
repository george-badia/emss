import type { Route } from "./+types/home";
import ServicePortal from "../service-portal/page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Services portal | Transafrica Medical" },
    { name: "description", content: "Transafrica Medical services portal" },
  ];
}

export default function Home() {
  return <ServicePortal />;
}
