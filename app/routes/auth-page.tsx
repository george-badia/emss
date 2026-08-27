import { useState } from "react";
import { Link, useNavigate } from "react-router";

type AuthPageProps = {
  mode: "login" | "sign-up";
};

type StoredUser = { firstName: string; lastName: string; email: string; password: string; role: "client" | "technician"; phone?: string; organisation?: string };

const provisionedTechnician: StoredUser = { firstName: "George", lastName: "Badia", email: "george@transafricamedical.co.ke", password: "Technician@2026", role: "technician", organisation: "Transafrica Medical" };

export function AuthPage({ mode }: AuthPageProps) {
  const isLogin = mode === "login";
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", organisation: "", password: "" });

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = form.email.trim().toLowerCase();
    if (!email || !form.password) return setError("Enter your email and password.");
    if (!isLogin && (!form.firstName || !form.lastName || !form.organisation)) return setError("Complete all required fields.");
    if (form.password.length < 8) return setError("Password must be at least 8 characters.");
    const stored = JSON.parse(localStorage.getItem("ems-user") || "null") as StoredUser | null;
    const account = stored?.email === email && stored.password === form.password ? stored : provisionedTechnician.email === email && provisionedTechnician.password === form.password ? provisionedTechnician : null;
    if (isLogin && !account) return setError("Those login details are not recognised. Use your provisioned technician login or create a client account first.");
    if (!isLogin) localStorage.setItem("ems-user", JSON.stringify({ ...form, email, role: "client" }));
    if (isLogin && account) localStorage.setItem("ems-user", JSON.stringify(account));
    localStorage.setItem("ems-session", email);
    setMessage(isLogin ? "Signed in successfully." : "Account created successfully.");
    window.setTimeout(() => navigate(account?.role === "technician" ? "/technician-dashboard" : "/"), 350);
  }

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-intro">
          <div className="auth-brand">transafrica<span>medical</span><b>+</b></div>
          <div className="auth-message">
            <h1>{isLogin ? "Empowering East African healthcare professionals" : "Join the Transafrica network today"}</h1>
            <p>{isLogin ? "Access premium global brands, expert technical support, and specialised services — all in one place." : "Get full access to our services portal — equipment management, maintenance, training, consultancy and more."}</p>
          </div>
          <ul>
            {(isLogin ? ["Leading medical equipment supplier in Nairobi", "Expert maintenance & technical support", "Trusted by healthcare facilities across East Africa"] : ["Hospitals & dental clinics", "Laboratories & research facilities", "Individual healthcare professionals"]).map((item) => <li key={item}>✓ &nbsp;{item}</li>)}
          </ul>
        </div>
        <form className="auth-form" onSubmit={submit}>
          <h2>{isLogin ? "Welcome back" : "Create your account"}</h2>
          <p className="form-lead">{isLogin ? "Sign in to your Transafrica account" : "Start managing your medical equipment today"}</p>
          {!isLogin && <div className="form-row"><label>First name<input required value={form.firstName} onChange={(event) => updateField("firstName", event.target.value)} placeholder="Jane" /></label><label>Last name<input required value={form.lastName} onChange={(event) => updateField("lastName", event.target.value)} placeholder="Njoroge" /></label></div>}
          <label>{isLogin ? "Email address" : "Work email"}<input required type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="you@clinic.co.ke" /></label>
          {!isLogin && <><label>Phone number<input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+254 7XX XXX XXX" /></label><label>Organisation type<select required value={form.organisation} onChange={(event) => updateField("organisation", event.target.value)}><option value="" disabled>Select type...</option><option>Hospital</option><option>Dental clinic</option><option>Laboratory</option></select></label></>}
          <label>Password<input required type="password" value={form.password} onChange={(event) => updateField("password", event.target.value)} placeholder={isLogin ? "••••••••" : "Min. 8 characters"} /></label>
          {isLogin && <div className="form-options"><label className="checkbox"><input type="checkbox" /> Remember me</label><a href="#forgot-password">Forgot password?</a></div>}
          {error && <p className="form-error" role="alert">{error}</p>}
          {message && <p className="form-success" role="status">{message}</p>}
          <button className="auth-submit" type="submit">{isLogin ? "Sign in  →" : "Create account  →"}</button>
          {isLogin ? <><div className="or-divider"><span>or continue with</span></div><button className="google-button" type="button">🌈 &nbsp; Continue with Google</button><p className="form-switch">Don't have an account? <Link to="/sign-up">Create one free</Link></p></> : <p className="form-switch">Already have an account? <Link to="/login">Sign in</Link></p>}
        </form>
      </section>
      <footer>© 2026 Transafrica Medical Supplies Ltd · Greenlife Tower, Off Mombasa Road, Nairobi · <a href="mailto:info@transafricamedical.co.ke">info@transafricamedical.co.ke</a></footer>
    </main>
  );
}
