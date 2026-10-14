 "use client";
import { useState } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";

const services = [
  "Γυάλισμα και διόρθωση χρώματος",
  "Κεραμική επίστρωση",
  "Αποκατάσταση / γυάλισμα φαναριών",
  "PPF σε φανάρια",
  "Καθαρισμός ζαντών και ελαστικών",
  "Βιολογικός καθαρισμός σαλονιού",
  "Απολύμανση καμπίνας",
  "Περιποίηση δερμάτινων επιφανειών",
  "Άλλο / χρειάζομαι συμβουλή"
];
const vehicles = ["Μικρό / Hatchback", "Sedan", "Coupe", "SUV / Crossover", "Μεγάλο SUV / 4x4", "Van / Pickup"];

export default function BookingForm() {
  const [selected, setSelected] = useState<string[]>([services[0]]);
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name:"", phone:"", email:"", vehicle:vehicles[3], model:"", date:"", notes:"" });
  const update = (key: keyof typeof form, value: string) => setForm(old => ({...old, [key]:value}));
  const toggle = (service: string) => setSelected(old => old.includes(service) ? old.filter(x=>x!==service) : [...old,service]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setStatus("loading"); setMessage("");
    try {
      const response = await fetch("/api/bookings", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({...form, services:selected})
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Δεν ήταν δυνατή η αποστολή.");
      setStatus("success"); setMessage("Το αίτημά σας καταχωρίστηκε. Θα επικοινωνήσουμε μαζί σας για επιβεβαίωση.");
      setForm({name:"",phone:"",email:"",vehicle:vehicles[3],model:"",date:"",notes:""}); setSelected([]);
    } catch (err) {
      setStatus("error"); setMessage(err instanceof Error ? err.message : "Παρουσιάστηκε σφάλμα.");
    }
  }

  return <form className="booking-card" onSubmit={submit}>
    <div className="form-heading"><span>01 — BOOKING REQUEST</span><h3>Ζητήστε ραντεβού</h3><p>Τα πεδία με * είναι υποχρεωτικά.</p></div>
    <label>Τύπος οχήματος *</label><select value={form.vehicle} onChange={e=>update("vehicle",e.target.value)}>{vehicles.map(v=><option key={v}>{v}</option>)}</select>
    <label>Υπηρεσίες που σας ενδιαφέρουν *</label><div className="service-options">{services.map(s=><label className="check-option" key={s}><input type="checkbox" checked={selected.includes(s)} onChange={()=>toggle(s)}/><span>{s}</span></label>)}</div>
    <div className="field-row"><div><label>Ονοματεπώνυμο *</label><input required minLength={2} value={form.name} onChange={e=>update("name",e.target.value)} placeholder="Το όνομά σας"/></div><div><label>Τηλέφωνο *</label><input required value={form.phone} onChange={e=>update("phone",e.target.value)} placeholder="69XXXXXXXX" type="tel" minLength={8}/></div></div>
    <div className="field-row"><div><label>Email (προαιρετικό)</label><input type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="name@example.com"/></div><div><label>Μοντέλο οχήματος</label><input value={form.model} onChange={e=>update("model",e.target.value)} placeholder="π.χ. BMW X3"/></div></div>
    <label>Προτιμώμενη ημερομηνία (προαιρετικό)</label><input type="date" min={new Date().toISOString().slice(0,10)} value={form.date} onChange={e=>update("date",e.target.value)}/>
    <label>Πρόσθετες πληροφορίες</label><textarea rows={3} value={form.notes} onChange={e=>update("notes",e.target.value)} placeholder="Πείτε μας τι χρειάζεται το όχημά σας..."/>
    <label className="consent"><input type="checkbox" required/><span>Συμφωνώ να χρησιμοποιηθούν τα στοιχεία μου για την επικοινωνία σχετικά με το αίτημά μου. *</span></label>
    <button className="button primary submit" disabled={status==="loading"||selected.length===0}>{status==="loading"?<><LoaderCircle className="spin" size={17}/> Αποστολή...</>:"Αποστολή αιτήματος"}</button>
    {message && <div className={status==="success"?"notice success":"notice error"}>{status==="success"&&<CheckCircle2 size={18}/>} {message}</div>}
    <small className="privacy-note">Η υποβολή αποτελεί αίτημα και όχι επιβεβαιωμένη κράτηση. Μην καταχωρείτε ευαίσθητα προσωπικά δεδομένα.</small>
  </form>;
}