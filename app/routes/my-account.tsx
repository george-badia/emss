import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Check, LogOut, Menu, Save, X } from "lucide-react";
import { TechnicianSidePanel } from "../technician/side-panel";
import { SidePanel } from "../service-portal/side-panel";

type User = { firstName: string; lastName: string; email: string; phone?: string; organisation?: string };

type AccountRowProps = {
  title: string;
  label: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  type?: string;
};

function AccountRow({ title, label, value, editing, onChange, onEdit, onSave, onCancel, type = "text" }: AccountRowProps) {
  return <section className="account-row"><h2>{title}</h2><div className="account-value"><span>{label}</span>{editing ? <input autoFocus type={type} value={value} onChange={(event) => onChange(event.target.value)} /> : <strong>{value || "Not provided"}</strong>}</div><div className="account-actions">{editing ? <><button type="button" onClick={onSave}><Save size={13} /> Save</button><button className="account-cancel" type="button" onClick={onCancel}><X size={13} /> Cancel</button></> : <button type="button" onClick={onEdit}>Change</button>}</div></section>;
}

export function meta() {
  return [{ title: "My Account | Transafrica Medical" }, { name: "description", content: "Manage your Transafrica Medical account" }];
}

export default function MyAccount({ customer = false }: { customer?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isCustomerAccount = customer || location.pathname === "/customer-account";
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User>({ firstName: "Jane", lastName: "Njoroge", email: "you@clinic.co.ke", phone: "" });
  const [draft, setDraft] = useState(user);
  const [editing, setEditing] = useState<string | null>(null);
  const [tab, setTab] = useState<"profile" | "notifications">("profile");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ems-user") || "null") as User | null;
    if (stored) { setUser((current) => ({ ...current, ...stored })); setDraft((current) => ({ ...current, ...stored })); }
  }, []);

  function beginEdit(field: string) { setDraft(user); setEditing(field); setSaved(false); }
  function saveField() { setUser(draft); localStorage.setItem("ems-user", JSON.stringify(draft)); setEditing(null); setSaved(true); window.setTimeout(() => setSaved(false), 2200); }
  function signOut() { localStorage.removeItem("ems-session"); navigate("/login"); }
  const fullName = `${user.firstName} ${user.lastName}`;

  return <main className={`account-layout${collapsed ? " sidebar-collapsed" : ""}`}>
    {!isCustomerAccount && <button className="technician-mobile-menu account-mobile-menu" type="button" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>}
    {isCustomerAccount ? <SidePanel collapsed={collapsed} onToggle={() => setCollapsed((current) => !current)} /> : <TechnicianSidePanel collapsed={collapsed} mobileOpen={mobileOpen} onToggle={() => setCollapsed((current) => !current)} onMobileClose={() => setMobileOpen(false)} />}
    <div className="account-page">
      <header className="account-header"><Link className="account-brand" to="/">transafrica<span>medical</span><b>+</b></Link><div className="account-header-right"><span className="account-avatar">{`${user.firstName[0] || "J"}${user.lastName[0] || "N"}`.toUpperCase()}</span><strong>{fullName}</strong><button className="account-signout" type="button" onClick={signOut}><LogOut size={16} /> Sign out</button></div></header>
      <div className="account-heading"><div><p>Account settings</p><h1>My Account</h1></div>{saved && <span className="account-saved"><Check size={15} /> Changes saved</span>}</div>
      <nav className="account-tabs" role="tablist"><button className={tab === "profile" ? "active" : ""} type="button" role="tab" aria-selected={tab === "profile"} onClick={() => setTab("profile")}>Profile Preferences</button><button className={tab === "notifications" ? "active" : ""} type="button" role="tab" aria-selected={tab === "notifications"} onClick={() => setTab("notifications")}>Notification Settings</button></nav>
      {tab === "profile" ? <div className="account-content"><AccountRow title="Phone Number" label="Phone Number" value={user.phone || ""} editing={editing === "phone"} onChange={(value) => setDraft((current) => ({ ...current, phone: value }))} onEdit={() => beginEdit("phone")} onSave={saveField} onCancel={() => setEditing(null)} type="tel" /><AccountRow title="Email" label="Email" value={user.email} editing={editing === "email"} onChange={(value) => setDraft((current) => ({ ...current, email: value }))} onEdit={() => beginEdit("email")} onSave={saveField} onCancel={() => setEditing(null)} type="email" /><AccountRow title="Password" label="Password" value="••••••••" editing={editing === "password"} onChange={() => undefined} onEdit={() => beginEdit("password")} onSave={() => setEditing(null)} onCancel={() => setEditing(null)} type="password" /><AccountRow title="Language" label="Language" value="English" editing={false} onChange={() => undefined} onEdit={() => undefined} onSave={() => undefined} onCancel={() => undefined} /><section className="account-row sessions-row"><h2>Sessions</h2><div className="session-item"><span className="session-dot" /><div><strong>Current browser session</strong><small>Active now · This device</small></div><Check size={16} /></div></section></div> : <div className="account-content notification-settings"><section><h2>Email notifications</h2><p>Choose which service updates you receive from Transafrica Medical.</p><label><input type="checkbox" defaultChecked /> Work order updates</label><label><input type="checkbox" defaultChecked /> Equipment service reminders</label><label><input type="checkbox" /> Product and training news</label><button className="account-save-settings" type="button" onClick={() => setSaved(true)}><Save size={14} /> Save preferences</button></section></div>}
      <footer className="account-footer"><a href="#terms">Terms of Service</a><span>and</span><a href="#privacy">Privacy Policy</a></footer><button className="account-chat" type="button" aria-label="Open support chat">?</button>
    </div>
  </main>;
}
