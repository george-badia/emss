import { useState } from "react";
import { NavLink } from "react-router";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  ChevronRight,
  ClipboardList,
  Wrench,
  X,
  HardHat,
  Menu,
} from "lucide-react";
import { TechnicianSidePanel } from "../technician/side-panel";

export function meta() {
  return [{ title: "Technician dashboard | Transafrica Medical" }, { name: "description", content: "Technician work order dashboard" }];
}

export default function TechnicianDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [view, setView] = useState<"simple" | "detailed">("simple");

  return (
    <main className="technician-app">
      <button className="technician-mobile-menu" type="button" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
      <TechnicianSidePanel collapsed={collapsed} mobileOpen={mobileOpen} onToggle={() => setCollapsed((current) => !current)} onMobileClose={() => setMobileOpen(false)} />
      <section className="technician-main">
        <header className="technician-header"><div><p className="technician-eyebrow">Transafrica Medical / Operations</p><h1>Enterprise Dashboard <small>1 Entity</small></h1></div><div className="technician-header-actions"><button className="technician-info" type="button" aria-label="Dashboard information">i</button><label className="technician-period">Period<select defaultValue="month" aria-label="Dashboard period"><option value="month">This month</option><option value="quarter">This quarter</option><option value="year">This year</option></select></label><button className="technician-bell" type="button" aria-label="Notifications"><Bell size={17} /><span>5</span></button></div></header>
        <div className="technician-content">
          <div className="technician-welcome"><div><span className="technician-kicker"><HardHat size={15} /> Technician workspace</span><h2>Good morning, George</h2><p>Here is the latest status across your assigned service operations.</p></div><button className="technician-primary" type="button"><Wrench size={16} /> Create work order</button></div>
          <section className="entity-panel" id="work-orders">
            <div className="entity-heading"><div><h2>Default Entity <AlertTriangle size={17} fill="currentColor" /></h2><p>Active Work Orders</p></div><div className="entity-tabs" role="tablist"><button className={view === "simple" ? "active" : ""} type="button" role="tab" aria-selected={view === "simple"} onClick={() => setView("simple")}>Simple</button><button className={view === "detailed" ? "active" : ""} type="button" role="tab" aria-selected={view === "detailed"} onClick={() => setView("detailed")}>Detailed</button></div></div>
            <div className={`work-order-stats${view === "detailed" ? " detailed" : ""}`}><article><strong>6</strong><span>Total</span></article><article><strong>3</strong><span>Pending requests</span></article><article><strong>0</strong><span>Overdue</span></article><article className="critical"><strong>1</strong><span><i /> Critical</span></article></div>
            {view === "detailed" && <div className="detailed-metrics"><div className="detailed-group"><h3>Completed Work Orders</h3><p>From 2026-08-01 to 2026-08-27</p><div className="completed-stats"><article><strong>0</strong><span>Total</span></article><article><strong>$0.00</strong><span>Total Cost</span></article><article><strong>0% <i title="Completed on time">i</i></strong><span>Completed On Time</span></article></div></div><p className="timezone">Time Zone Etc/UTC UTC(+00:00)</p><div className="detailed-group"><h3>Assets</h3><div className="asset-stats"><article><strong>0</strong><span>Assets Offline</span></article><article><strong>75%</strong><span>Assets with PMs</span></article></div></div></div>}
            <NavLink className="work-order-link" to="/service-portal">View work orders <ChevronRight size={15} /></NavLink>
          </section>
          <div className="technician-lower-grid"><section className="technician-list-panel" id="pms"><div className="technician-section-heading"><div><span className="technician-section-icon"><Wrench size={16} /></span><h2>Today's schedule</h2></div><NavLink to="/technician-dashboard#work-orders">View all <ChevronRight size={14} /></NavLink></div><div className="schedule-row"><span className="schedule-time">09:00</span><div><strong>Dental chair servicing</strong><small>Nairobi Dental Clinic · Unit 1</small></div><b className="schedule-status">In progress</b></div><div className="schedule-row"><span className="schedule-time">14:30</span><div><strong>Autoclave preventive maintenance</strong><small>Westlands Medical Centre</small></div><b className="schedule-status upcoming">Upcoming</b></div></section><section className="technician-list-panel" id="reports"><div className="technician-section-heading"><div><span className="technician-section-icon gold"><BarChart3 size={16} /></span><h2>Service performance</h2></div><span className="technician-period-label">This month</span></div><div className="performance-row"><span>Completion rate</span><strong>92%</strong><div><i style={{ width: "92%" }} /></div></div><div className="performance-row"><span>Response time</span><strong>4.2h</strong><div><i className="gold" style={{ width: "72%" }} /></div></div></section></div>
        </div>
      </section>
      <button className="technician-chat" type="button" aria-label="Open support chat"><Bell size={18} /></button>
    </main>
  );
}
