import { useState } from "react";
import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  Bell,
  ClipboardList,
  Cog,
  FileText,
  FlaskConical,
  LayoutDashboard,
  Menu,
  Lightbulb,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
  Stethoscope,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const serviceItems = [
  ["Services portal", "/service-portal", "▦"],
  ["Maintenance & support", "/maintenance-and-support", "⚙"],
  ["Practice design", "/practice-design", "▤"],
  ["Consultancy", "/consultancy", "♧"],
  ["Product training", "/product-training", "▣"],
];

const accountItems: [string, string, LucideIcon][] = [
  ["My equipment", "/my-equipment", Package],
  ["Documents", "/documents", FileText],
  ["Notification", "/notifications", Bell],
];

const serviceIcons: LucideIcon[] = [ClipboardList, Cog, Lightbulb, Stethoscope, FlaskConical];

export function SidePanel({ collapsed = false, onToggle }: { collapsed?: boolean; onToggle?: () => void }) {
  const navigate = useNavigate();
  const [localCollapsed, setLocalCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState({ firstName: "Jane", lastName: "Njoroge", organisation: "Nairobi Dental Clinic", email: "you@clinic.co.ke" });
  useEffect(() => {
    const saved = localStorage.getItem("ems-user");
    if (saved) setUser((current) => ({ ...current, ...JSON.parse(saved) }));
  }, []);
  const initials = `${user.firstName[0] || "J"}${user.lastName[0] || "N"}`.toUpperCase();
  const isCollapsed = onToggle ? collapsed : localCollapsed;
  const toggle = onToggle || (() => setLocalCollapsed((current) => !current));
  function signOut() {
    localStorage.removeItem("ems-session");
    setProfileOpen(false);
    navigate("/login");
  }
  return (
    <><button className="customer-mobile-menu" type="button" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={20} /></button><aside className={`side-panel${isCollapsed ? " collapsed" : ""}${mobileOpen ? " mobile-open" : ""}`}>
      <div className="side-brand-row"><div className="brand-mark">transafrica<span>medical</span><b>+</b></div><button className="sidebar-toggle" type="button" onClick={toggle} aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>{isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}</button><button className="customer-mobile-close" type="button" onClick={() => setMobileOpen(false)} aria-label="Close navigation">×</button></div>
      <div className="side-section-label">Overview</div>
      <nav className="side-nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? "side-link active" : "side-link"}>
          <span className="nav-icon"><LayoutDashboard size={15} strokeWidth={1.8} /></span><span className="nav-label">Overview</span>
        </NavLink>
      </nav>
      <div className="side-section-label">Services</div>
      <nav className="side-nav">
        {serviceItems.map(([label, href], index) => {
          const Icon = serviceIcons[index];
          return (
          <NavLink key={label} to={href} className={({ isActive }) => isActive ? "side-link active" : "side-link"}>
            <span className="nav-icon"><Icon size={15} strokeWidth={1.8} /></span><span className="nav-label">{label}</span>
            {label === "Services portal" && <em>3</em>}
          </NavLink>
          );
        })}
      </nav>
      <div className="side-section-label account-label">Account</div>
      <nav className="side-nav">
        {accountItems.map(([label, href, Icon]) => (
          <NavLink key={label} to={href} className={({ isActive }) => isActive ? "side-link active" : "side-link"}>
            <span className="nav-icon"><Icon size={15} strokeWidth={1.8} /></span><span className="nav-label">{label}</span>
            {label === "Notification" && <em>5</em>}
          </NavLink>
        ))}
      </nav>
      <div className="profile-wrap"><button className="profile" type="button" onClick={() => setProfileOpen((current) => !current)} aria-expanded={profileOpen} aria-label="Open profile menu"><span className="avatar">{initials}</span><div><strong>{user.firstName} {user.lastName}</strong><small>{user.organisation}</small></div><span className="profile-chevron">⌄</span></button>{profileOpen && <div className="profile-menu"><strong>{user.firstName} {user.lastName}</strong><small>{user.email}</small><Link to="/customer-account" onClick={() => setProfileOpen(false)}>My Account</Link><button type="button" onClick={signOut}>Sign out</button></div>}</div>
    </aside></>
  );
}
