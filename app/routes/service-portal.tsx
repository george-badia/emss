import { useState } from "react";
import { NavBar, TopTabs } from "../service-portal/nav-bar";
import { SidePanel } from "../service-portal/side-panel";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  Monitor,
  PenLine,
  Radio,
  Upload,
} from "lucide-react";

export function meta() {
  return [{ title: "Technical Services Request | Transafrica Medical" }];
}

export default function ServicePortal() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMaintenanceRequest = selectedService === "Prescheduled Maintenance Program";
  const isSparePartRequest = selectedService === "Equipment Spare Part Request";
  const isRepairRequest = selectedService === "Send Out Small Equipment & Handpieces for Repair";

  const services = [
    ["Field Service Technician Visit", "An engineer visits your clinic for on-site diagnosis and repair", Monitor],
    ["Prescheduled Maintenance Program", "Regular scheduled preventative maintenance visits", PenLine],
    ["Equipment Spare Part Request", "Order specific replacement parts for your equipment", Radio],
    ["Send Out Small Equipment & Handpieces for Repair", "Ship your device to our repair centre", MapPin],
  ] as const;

  function continueToNext(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 3) {
      setSubmitted(true);
    } else {
      setStep((current) => current + 1);
    }
  }

  return (
    <main className="portal-page technical-portal-page">
      <TopTabs />
      <div className={`portal-shell${sidebarCollapsed ? " sidebar-collapsed" : ""}`}>
        <SidePanel collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((current) => !current)} />
        <div className="portal-content">
          <NavBar onNewRequest={() => { setSubmitted(false); setStep(1); }} onNotifications={() => undefined} />
          <div className="technical-request-page">
      <header className="technical-request-header">
        <h1>Technical Services Request</h1>
        <p>For all non-urgent requests, complete the form below. We review<br />submissions continuously and respond during regular business hours.</p>
      </header>

      <ol className="request-steps" aria-label="Request progress">
        {[
          [1, "Clinic Details"],
          [2, "Service Type"],
          [3, "Request Details"],
        ].map(([number, label]) => (
          <li className={step > Number(number) ? "complete" : step === Number(number) ? "current" : ""} key={number}>
            <span>{step > Number(number) ? <Check size={16} strokeWidth={3} /> : number}</span>
            <small>{label}</small>
          </li>
        ))}
      </ol>

      {submitted ? (
        <section className="request-success">
          <span><Check size={28} /></span>
          <h2>Request submitted</h2>
          <p>Thank you. Our technical services team will review your request and respond during regular business hours.</p>
          <button type="button" onClick={() => { setSubmitted(false); setStep(1); setSelectedService(""); }}>Submit another request</button>
        </section>
      ) : (
        <form className="technical-request-card" onSubmit={continueToNext}>
          {step === 1 && <>
            <div className="request-card-heading"><h2>Clinic &amp; Contact Information</h2><p>All fields marked with * are required</p></div>
            <div className="request-card-body">
              <h3>Contact Information</h3>
              <div className="request-form-grid">
                <label>Clinic Name <b>*</b><input required placeholder="e.g. Nairobi Dental Clinic" /></label>
                <label>Practitioner Name<input placeholder="Dr. Full Name" /></label>
                <label>Email Address <b>*</b><input required type="email" placeholder="clinic@example.com" /></label>
                <label>Office Phone Number <b>*</b><input required type="tel" placeholder="+254 7XX XXX XXX" /></label>
              </div>
              <label>Office Address <b>*</b><textarea required placeholder="Full address including building, street, city, county" /></label>
            </div>
          </>}

          {step === 2 && <>
            <div className="request-card-heading"><h2>Select Service Type</h2><p>Choose one service — you can submit additional requests separately</p></div>
            <div className="request-card-body service-choice-body">
              <h3>Choose a Service Type</h3>
              <div className="service-choice-grid">
                {services.map(([title, description, Icon]) => <label className={`service-choice${selectedService === title ? " selected" : ""}`} key={title}>
                  <input type="radio" name="service" value={title} checked={selectedService === title} onChange={() => { setSelectedService(title); if (title === "Field Service Technician Visit" || title === "Prescheduled Maintenance Program" || title === "Equipment Spare Part Request" || title === "Send Out Small Equipment & Handpieces for Repair") setStep(3); }} required />
                  <span className="service-choice-icon"><Icon size={21} /></span><strong>{title}</strong><small>{description}</small><i />
                </label>)}
              </div>
            </div>
          </>}

          {step === 3 && <>
            <div className="request-card-heading"><h2>Request Details</h2><p>All fields marked with * are required</p></div>
            <div className="request-card-body">
              {isRepairRequest ? <>
                <div className="repair-notice"><strong>ⓘ &nbsp;Key Procedures for Returning Devices</strong><ul><li><b>Get Pre-authorisation:</b> Contact us for a Repair Authorisation Number (RMA) before shipping.</li><li><b>Sterilise &amp; Pack:</b> Clean and decontaminate the device; pack securely in a sterilisation pouch or original packaging.</li><li><b>Include Paperwork:</b> Include a detailed fault description and purchase invoice.</li><li><b>Ship:</b> Use a tracked and insured method. Transafrica Medical will not be liable for items lost in transit.</li></ul></div>
                <h3>Device Information</h3>
                <label>Equipment Type <b>*</b><input required placeholder="e.g. Handpiece, Small Motor, Scaler" /></label>
                <div className="request-form-grid">
                  <label>Manufacturer, Make &amp; Model <b>*</b><input required placeholder="e.g. W&amp;H, Synea TA-98" /></label>
                  <label>Serial Number <b>*</b><input required placeholder="e.g. SN-12345678" /></label>
                </div>
                <label>Detailed Description of Issue(s) <b>*</b><textarea required placeholder="Describe the fault in detail. Include when the problem started, any error codes, and what the device does or doesn't do." /></label>
              </> : <>
                <h3>{isSparePartRequest ? "Part Request Details" : isMaintenanceRequest ? "Maintenance Visit Preferences" : "Technician Visit Preferences"}</h3>
                <fieldset className="preferred-date"><legend>{isSparePartRequest ? "Preferred Delivery / Visit Date" : "Preferred Day or Next Available"}</legend><label><input type="radio" name="preferred-date" value="next" defaultChecked /> Next Available</label><label><input type="radio" name="preferred-date" value="date" /> Choose Date</label></fieldset>
                <h3>Equipment Information</h3>
                <label>Equipment Type <b>*</b><input required placeholder={isSparePartRequest ? "e.g. Dental Chair, Autoclave, Compressor" : "e.g. Compressor, Suction, Autoclave, Handpiece"} /></label>
                <div className="request-form-grid">
                  <label>Manufacturer, Make &amp; Model <b>*</b><input required placeholder={isSparePartRequest ? "e.g. Durr Dental, VS 900 S" : "e.g. W&amp;H, Synea TA-98"} /></label>
                  <label>Serial Number(s) <b>*</b><input required placeholder="e.g. SN-12345678" /></label>
                  {isSparePartRequest && <label>Part Number(s) <b>*</b><input required placeholder="e.g. PN-78901 (include photo if unknown)" /></label>}
                  {isSparePartRequest && <label>Quantity <b>*</b><input required type="number" min="1" defaultValue="1" /></label>}
                </div>
                {isSparePartRequest && <p className="request-note">If ordering upholstery: please specify the style and colour in the description below.</p>}
                <label>Detailed Description{isSparePartRequest ? "" : " of Issue(s)"} <b>*</b><textarea required placeholder={isSparePartRequest ? "Describe the part needed, where it's located on the equipment, and any upholstery style/colour if applicable." : isMaintenanceRequest ? "Describe all tasks needing attention and the scope of maintenance required." : "Describe all tasks needing attention, the nature of the problem, when it started, etc."} /></label>
              </>}
              <label>File Upload<input className="file-input" type="file" /><span className="file-drop"><Upload size={22} /><strong>Drag &amp; Drop Files Here</strong><small>or click to browse</small></span></label>
            </div>
          </>}

          <div className="request-card-actions">
            {step > 1 && <button className="request-back" type="button" onClick={() => setStep((current) => current - 1)}><ChevronLeft size={17} /> Back</button>}
            <button className="request-continue" type="submit">{step === 3 ? "Submit Request" : "Continue"}<ChevronRight size={17} /></button>
          </div>
        </form>
      )}

      <a className="whatsapp-button" href="https://wa.me/254700000000" aria-label="Contact us on WhatsApp"><MessageCircle size={29} fill="currentColor" /></a>
          </div>
        </div>
      </div>
    </main>
  );
}
