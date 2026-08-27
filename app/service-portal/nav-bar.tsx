import { NavLink } from "react-router";
import { BellDot, CircleHelp, LayoutDashboard, Plus, Home } from "lucide-react";

export function NavBar({ onNewRequest, onNotifications }: { onNewRequest: () => void; onNotifications: () => void }) {
  return <header className="portal-header"><div><h1>Services portal</h1><p>Welcome back, Jane <span>—</span> Mon 15 Jun 2026</p></div><div className="header-actions"><button className="new-request" onClick={onNewRequest}><Plus size={13} /> New request</button><button className="notification-button" aria-label="Notifications" onClick={onNotifications}><BellDot size={15} strokeWidth={1.9} /><i>5</i></button></div></header>;
}

export function TopTabs() {
  return <nav className="top-tabs"><NavLink to="/" end className={({ isActive }) => isActive ? "selected" : ""}><Home size={14} /> Overview</NavLink><NavLink to="/maintenance-and-support" className={({ isActive }) => isActive ? "selected" : ""}><CircleHelp size={14} /> Help &amp; support</NavLink><NavLink to="/service-portal" className={({ isActive }) => isActive ? "selected" : ""}><LayoutDashboard size={14} /> Services portal</NavLink></nav>;
}
