import { Link } from "react-router";
import { NavBar, TopTabs } from "./nav-bar";
import { SidePanel } from "./side-panel";
import { RecentRequest } from "./recent-request";
import { EquipmentHealth } from "./equipment-health";
import { ServicesUsageThisYear } from "./services-usage-this-year";
import { Announcement } from "./announcement";
import { useEffect, useState } from "react";
import type { ServiceRequest } from "./recent-request";

export function meta() { return [{ title: "Services portal | Transafrica Medical" }, { name: "description", content: "Transafrica Medical services portal" }]; }
const summary = [["Open requests", "3", "↑ 1 new this week", "teal"], ["Equipment items", "12", "↑ 10 operational", "teal"], ["Next service", "18 Jun", "◷ 3 days away", "gold"], ["Training credits", "4", "◷ Expires Dec 2026", "gold"]];
const actions = [["⚒", "Maintenance", "& support", "/maintenance-and-support", "teal"], ["▤", "Product training", "Book a session", "/product-training", "gold"], ["♧", "Consultancy", "Expert advice", "/consultancy", "blue"], ["▥", "Practice design", "Clinic planning", "/practice-design", "purple"], ["⚒", "Services portal", "Submit requests", "/service-portal", "green"]];
export default function ServicePortal() {
	const [requests, setRequests] = useState<ServiceRequest[]>([]);
	const [showRequest, setShowRequest] = useState(false);
	const [notice, setNotice] = useState(false);
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	useEffect(() => { const saved = localStorage.getItem("ems-requests"); if (saved) setRequests(JSON.parse(saved)); }, []);
	const allRequests = [...requests, ["◉", "Dental chair servicing – Unit 1", "10 Jun 2026", "In progress", "amber"] as ServiceRequest].slice(0, 4);
	function addRequest(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); const request: ServiceRequest = ["◉", String(data.get("subject")), "Today", "Open", "green"]; const updated = [request, ...requests].slice(0, 4); setRequests(updated); localStorage.setItem("ems-requests", JSON.stringify(updated)); setShowRequest(false); }
	return <main className="portal-page"><TopTabs /><div className="portal-shell"><SidePanel /><div className="portal-content"><NavBar onNewRequest={() => setShowRequest(true)} onNotifications={() => setNotice((current) => !current)} />{notice && <div className="notification-popover" role="status"><strong>Notifications</strong><span>Autoclave service is due on 18 Jun.</span><span>New training session available on 25 Jun.</span></div>}<div className="summary-grid">{summary.map(([label, value, hint, tone]) => <div className={`summary-card ${tone}`} key={label}><span>{label}</span><strong>{label === "Open requests" ? Number(value) + requests.length : value}</strong><small>{hint}</small></div>)}</div><div className="dashboard-grid"><RecentRequest requests={allRequests} /><EquipmentHealth /><ServicesUsageThisYear /><Announcement /></div><section className="quick-actions"><h2>♧ &nbsp;Quick service actions</h2><div className="action-grid">{actions.map(([icon, label, sub, href, tone]) => <Link className={`action ${tone}`} to={href} key={label}><span>{icon}</span><strong>{label}</strong><small>{sub}</small></Link>)}</div></section></div></div>{showRequest && <div className="modal-backdrop" role="presentation"><form className="request-modal" onSubmit={addRequest}><button className="modal-close" type="button" aria-label="Close" onClick={() => setShowRequest(false)}>×</button><h2>New service request</h2><p>Tell us how we can help your clinic.</p><label>Request subject<input name="subject" required placeholder="e.g. Schedule equipment servicing" /></label><label>Service type<select name="type" defaultValue="maintenance"><option value="maintenance">Maintenance & support</option><option value="training">Product training</option><option value="consultancy">Consultancy</option><option value="design">Practice design</option></select></label><label>Details<textarea name="details" required placeholder="Add a few details..." /></label><button className="auth-submit" type="submit">Submit request →</button></form></div>}<footer>© 2026 Transafrica Medical Supplies Ltd · Greenlife Tower, Off Mombasa Road, Nairobi · <a href="mailto:info@transafricamedical.co.ke">info@transafricamedical.co.ke</a></footer></main>;
}
