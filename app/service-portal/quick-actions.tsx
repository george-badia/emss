import { DraftingCompass, GraduationCap, Lightbulb, LayoutDashboard, Wrench } from "lucide-react";
import { Link } from "react-router";

const actions = [
  ["Maintenance & support", "Request equipment service", "/maintenance-and-support", "teal", Wrench],
  ["Product training", "Book a session", "/product-training", "gold", GraduationCap],
  ["Consultancy", "Get expert advice", "/consultancy", "blue", Lightbulb],
  ["Practice design", "Plan your clinic", "/practice-design", "purple", DraftingCompass],
  ["Services portal", "Submit a request", "/service-portal", "green", LayoutDashboard],
] as const;

export function QuickActions() {
  return <section className="quick-actions customer-quick-actions"><h2><Wrench size={16} /> Quick service actions</h2><div className="action-grid">{actions.map(([label, sub, href, tone, Icon]) => <Link className={`action ${tone}`} to={href} key={label}><span><Icon size={20} strokeWidth={1.8} /></span><strong>{label}</strong><small>{sub}</small></Link>)}</div></section>;
}
