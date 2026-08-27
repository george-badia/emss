import { useState } from "react";
import { ChevronDown, Maximize2, Table2 } from "lucide-react";
import { TechnicianSidePanel } from "../technician/side-panel";

function EmptyReport({ title }: { title: string }) {
  return <article className="report-card"><div className="report-card-heading"><h2>{title}</h2><button type="button" aria-label={`Expand ${title}`}><Maximize2 size={15} /></button></div><div className="report-empty"><Table2 size={40} strokeWidth={1.5} /><span>Not Enough Data</span></div></article>;
}

const statusItems = [["Open", 6, "100%", "blue"], ["On Hold", 0, "0%", "gray"], ["In Progress", 0, "0%", "green"], ["In Review", 0, "0%", "purple"], ["Waiting for Parts", 0, "0%", "slate"], ["Waiting for Cost", 0, "0%", "gold"], ["Waiting for Invoice", 0, "0%", "orange"]];
const priorityItems = [["Critical", 1, "17%", "red"], ["High", 2, "33%", "orange"], ["Medium", 2, "33%", "yellow"], ["Low", 1, "17%", "lime"], ["None", 0, "0%", "gray"]];

function DonutReport({ title, total, centerLabel, items, className }: { title: string; total: string; centerLabel: string; items: (string | number)[][]; className: string }) {
  return <article className="report-card donut-report"><div className="report-card-heading"><h2>{title}</h2><button type="button" aria-label={`Expand ${title}`}><Maximize2 size={15} /></button></div><div className="donut-layout"><div className={`donut-chart ${className}`}><div><strong>{centerLabel}</strong><b>{total}</b></div></div><div className="donut-legend">{items.map(([label, count, percent, color]) => <div key={String(label)}><span className={`legend-dot ${color}`} /><strong>{label}</strong><span>{count}</span><small>{percent}</small></div>)}</div></div></article>;
}

function AssigneeReport() {
  return <article className="report-card assignee-report"><div className="report-card-heading"><h2>Maintenance Backlog by Assignee</h2><button type="button" aria-label="Expand Maintenance Backlog by Assignee"><Maximize2 size={15} /></button></div><div className="assignee-summary"><strong>6 <small>Active</small></strong><strong>0 <small>Overdue</small></strong></div><div className="assignee-table"><div><span>Assignee</span><span>Active</span><span>Overdue</span></div><div><span>george badia</span><span>6 <i /></span><span>0</span></div></div></article>;
}

function AssetCostsReport() {
  return <article className="report-card asset-costs-report"><div className="report-card-heading"><h2>Asset Costs</h2><button type="button" aria-label="Expand Asset Costs"><Maximize2 size={15} /></button></div><strong className="asset-cost-total">$0.00</strong><div className="asset-cost-labels"><span>Top 10 Highest Costing Assets</span><span>Cost</span></div></article>;
}

function PartsUsageReport() {
  return <article className="report-card parts-usage-report"><div className="report-card-heading"><h2>Parts Usage</h2><button type="button" aria-label="Expand Parts Usage"><Maximize2 size={15} /></button></div><strong className="parts-cost">Costs this period: $0.00</strong><div className="parts-chart"><span>No parts usage data</span></div></article>;
}

export function meta() {
  return [{ title: "Reports & KPIs | Transafrica Medical" }, { name: "description", content: "Technician reports and key performance indicators" }];
}

export default function TechnicianReports() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [period, setPeriod] = useState("today");

  return <main className="technician-app reports-app"><button className="technician-mobile-menu" type="button" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><span>☰</span></button><TechnicianSidePanel collapsed={collapsed} mobileOpen={mobileOpen} onToggle={() => setCollapsed((current) => !current)} onMobileClose={() => setMobileOpen(false)} /><section className="technician-main"><header className="reports-header"><h1>Reports &amp; KPIs</h1><label><span>Period</span><select value={period} onChange={(event) => setPeriod(event.target.value)} aria-label="Report period"><option value="today">Today</option><option value="month">This month</option><option value="quarter">This quarter</option><option value="year">This year</option></select><ChevronDown size={14} /></label></header><div className="reports-content"><DonutReport title="Maintenance Backlog by Status" total="6" centerLabel="Open" items={statusItems} className="status-donut" /><DonutReport title="Maintenance Backlog by Priority" total="6" centerLabel="Total" items={priorityItems} className="priority-donut" /><AssigneeReport /><EmptyReport title="WO Completed vs. Created" /><EmptyReport title="Maintenance History by Cost" /><EmptyReport title="Maintenance History by Status" /><AssetCostsReport /><PartsUsageReport /></div></section><button className="technician-chat" type="button" aria-label="Open support chat">?</button></main>;
}
