import { useState } from "react";
import { Search } from "lucide-react";
import { TechnicianSidePanel } from "../technician/side-panel";

export function meta() {
  return [{ title: "Users | Transafrica Medical" }, { name: "description", content: "Manage technician dashboard users" }];
}

export default function TechnicianUsers() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const showGeorge = "george badia george@transafricamedical.co.ke admin password".includes(query.trim().toLowerCase());

  return <main className="technician-app users-app"><button className="technician-mobile-menu" type="button" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><span>☰</span></button><TechnicianSidePanel collapsed={collapsed} mobileOpen={mobileOpen} onToggle={() => setCollapsed((current) => !current)} onMobileClose={() => setMobileOpen(false)} /><section className="technician-main"><header className="users-header"><h1>Users</h1><label className="users-search"><span>Search Users</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Users" aria-label="Search Users" /><Search size={16} /></label></header><div className="users-tabs"><button className="active" type="button">Users</button></div><div className="users-table" role="table"><div className="users-table-row users-table-heading" role="row"><span>Title</span><span>Profile</span><span>Email</span><span>Authentication Type</span><span>Role</span><span>Last visit</span></div>{showGeorge && <div className="users-table-row" role="row"><span className="user-title"><i>GB</i> george badia</span><span><b className="user-status"><i /> Active</b></span><span>george@transafricamedical.co.ke</span><span>Password</span><span>Admin</span><span>08/27/2026</span></div>}</div></section><button className="technician-chat" type="button" aria-label="Open support chat">?</button></main>;
}
