export type ServiceRequest = [string, string, string, string, string];
const defaultRequests: ServiceRequest[] = [
  ["◉", "Dental chair servicing – Unit 1", "10 Jun 2026", "In progress", "amber"],
  ["▣", "Autoclave operator training", "5 Jun 2026", "Open", "green"],
  ["♧", "Clinic layout consultancy", "1 Jun 2026", "Completed", "blue"],
  ["▤", "Practice design review", "20 May 2025", "Pending", "purple"],
];

export function RecentRequest({ requests = defaultRequests }: { requests?: ServiceRequest[] }) {
  return <section className="dashboard-card requests-card"><div className="card-heading"><h2>▧ &nbsp;Recent requests</h2><button className="card-link" type="button">View all</button></div><div className="request-list">{requests.map(([icon, title, date, status, tone]) => <div className="request-row" key={`${title}-${date}`}><span className={`row-icon ${tone}`}>{icon}</span><div><strong>{title}</strong><small>{date}</small></div><b className={`status ${tone}`}>{status}</b></div>)}</div></section>;
}
