import { Link, NavLink, useLocation } from "react-router";
import {
  BarChart3,
  Bell,
  Box,
  Building2,
  ChevronRight,
  ClipboardList,
  FileCheck2,
  FileText,
  Gauge,
  LayoutDashboard,
  MapPin,
  PanelLeftClose,
  PanelLeftOpen,
  Package,
  Settings,
  Users,
  Wrench,
  X,
} from "lucide-react";

const mainItems = [
  ["Enterprise", "/technician-dashboard", Building2],
  ["Default entity", "/technician-dashboard", LayoutDashboard],
  ["Requests", "/service-portal", ClipboardList],
  ["Work orders", "/technician-dashboard#work-orders", Wrench],
  ["PMs", "/technician-dashboard#pms", FileCheck2],
  ["Procedures", "/documents", FileText],
  ["Assets", "/my-equipment", Box],
  ["Locations", "/technician-dashboard#locations", MapPin],
  ["Floor plans", "/technician-dashboard#floor-plans", Gauge],
  ["Inventory & parts", "/technician-dashboard#inventory", Package],
  ["Vendors", "/technician-dashboard#vendors", Users],
  ["Users", "/technician-users", Users],
  ["Reports & KPIs", "/technician-reports", BarChart3],
] as const;

type TechnicianSidePanelProps = { collapsed: boolean; mobileOpen: boolean; onToggle: () => void; onMobileClose: () => void };

export function TechnicianSidePanel({ collapsed, mobileOpen, onToggle, onMobileClose }: TechnicianSidePanelProps) {
  const location = useLocation();
  const isSelected = (href: string, label: string) => {
    const [pathname, hash] = href.split("#");
    if (label === "Default entity") return false;
    return location.pathname === pathname && (hash ? location.hash === `#${hash}` : !location.hash);
  };

  return <aside className={`technician-sidebar${collapsed ? " collapsed" : ""}${mobileOpen ? " mobile-open" : ""}`}>
    <div className="technician-brand-row"><div className="technician-brand"><span className="technician-brand-mark">+</span><span>transafrica</span><b>medical</b></div><button className="technician-collapse" type="button" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={onToggle}>{collapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}</button><button className="technician-mobile-close" type="button" aria-label="Close navigation" onClick={onMobileClose}><X size={19} /></button></div>
    <div className="technician-nav-label">Workspace</div>
    <nav className="technician-nav">{mainItems.map(([label, href, Icon]) => <Link key={label} to={href} className={`technician-nav-link${isSelected(href, label) ? " active" : ""}`}><Icon size={16} strokeWidth={1.8} /><span>{label}</span>{label === "Requests" && <em>3</em>}{label === "Work orders" && <em className="coral">6</em>}{label === "Default entity" && <ChevronRight className="technician-chevron" size={14} />}</Link>)}</nav>
    <div className="technician-sidebar-footer"><Link className="technician-user" to="/my-account" aria-label="Open My Account"><span>GB</span><strong>George Badia</strong></Link><Link className={`technician-nav-link${isSelected("/technician-dashboard#settings", "Admin settings") ? " active" : ""}`} to="/technician-dashboard#settings"><Settings size={16} strokeWidth={1.8} /><span>Admin settings</span></Link></div>
  </aside>;
}
