import BookingForm from "@/components/BookingForm";
import { Sparkles, ShieldCheck, CalendarCheck, ArrowUpRight } from "lucide-react";

export default function Home() {
  return <main>
    <nav className="nav wrap">
      <a className="brand" href="#"><span className="brand-mark">DM</span><span>DETAIL <b>MATTERS</b><small>PREMIUM AUTO CARE</small></span></a>
      <a className="nav-link" href="#booking">Κλείσε ραντεβού <ArrowUpRight size={16}/></a>
    </nav>
    <section className="hero wrap">
      <div className="hero-copy">
        <div className="eyebrow"><span/> PREMIUM AUTO CARE</div>
        <h1>Η λεπτομέρεια<br/>κάνει τη <em>διαφορά.</em></h1>
        <p>Επαγγελματική περιποίηση, προστασία και ανανέωση του οχήματός σας. Επιλέξτε υπηρεσίες και ζητήστε το ραντεβού σας online.</p>
        <a className="button primary" href="#booking">Κλείσε ραντεβού <ArrowUpRight size={17}/></a>
        <div className="hero-points"><span><ShieldCheck size={17}/> Προσεγμένη εργασία</span><span><Sparkles size={17}/> Premium φροντίδα</span></div>
      </div>
      <div className="hero-art" role="img" aria-label="Σκούρο premium αυτοκίνητο σε studio">
        <div className="art-glow"/><div className="art-label">CARE IN EVERY DETAIL <span>01 / 03</span></div>
        <div className="car-silhouette"><div className="car-roof"/><div className="car-body"/><div className="wheel wheel-a"/><div className="wheel wheel-b"/><div className="car-light"/></div>
      </div>
    </section>
    <section className="services wrap">
      <div><div className="eyebrow">OUR SERVICES</div><h2>Η φροντίδα που<br/>ταιριάζει στο όχημά σας.</h2></div>
      <div className="service-grid">
        <article><span>01</span><h3>Paint Correction</h3><p>Γυάλισμα και διόρθωση χρώματος για ανανεωμένη εμφάνιση.</p></article>
        <article><span>02</span><h3>Ceramic Coating</h3><p>Προστασία επιφάνειας και ευκολότερη συντήρηση.</p></article>
        <article><span>03</span><h3>Headlight Restoration</h3><p>Αποκατάσταση και γυάλισμα φαναριών.</p></article>
        <article><span>04</span><h3>Interior Care</h3><p>Καθαρισμός και περιποίηση εσωτερικού χώρου.</p></article>
      </div>
    </section>
    <section className="booking-section" id="booking"><div className="wrap booking-layout">
      <div className="booking-intro"><div className="eyebrow">BOOK YOUR APPOINTMENT</div><h2>Έτοιμοι να δώσουμε<br/>νέα ζωή στο όχημά σας;</h2><p>Συμπληρώστε τα στοιχεία σας και τις υπηρεσίες που σας ενδιαφέρουν. Θα επικοινωνήσουμε μαζί σας για την επιβεβαίωση της διαθεσιμότητας και της τελικής τιμής.</p><div className="booking-benefit"><CalendarCheck/><span><b>Εύκολο αίτημα κράτησης</b><small>Η κράτηση οριστικοποιείται μετά από επιβεβαίωση.</small></span></div></div>
      <BookingForm/>
    </div></section>
    <footer className="footer wrap"><a className="brand" href="#"><span className="brand-mark">DM</span><span>DETAIL <b>MATTERS</b><small>PREMIUM AUTO CARE</small></span></a><span>© {new Date().getFullYear()} DETAIL MATTERS · Premium Auto Care</span></footer>
  </main>;
}