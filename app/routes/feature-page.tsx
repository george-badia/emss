import { Link } from "react-router";
import { useState } from "react";
import { NavBar, TopTabs } from "../service-portal/nav-bar";
import { SidePanel } from "../service-portal/side-panel";

export function FeaturePage({ title, description }: { title: string; description: string }) { const [collapsed, setCollapsed] = useState(false); return <main className="portal-page feature-dashboard"><TopTabs /><div className={`portal-shell${collapsed ? " sidebar-collapsed" : ""}`}><SidePanel /><div className="portal-content"><NavBar onNewRequest={() => undefined} onNotifications={() => undefined} /><div className="feature-content"><Link to="/service-portal" className="back-link">← Services portal</Link><div className="feature-mark">transafrica<span>medical</span><b>+</b></div><h1>{title}</h1><p>{description}</p><div className="feature-placeholder"><strong>{title} workspace</strong><span>Your requests, account information, and service updates will appear here.</span><button type="button">Create a request</button></div></div></div></div></main>; }
