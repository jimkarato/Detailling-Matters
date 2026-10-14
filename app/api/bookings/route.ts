import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const allowedVehicles = ["Μικρό / Hatchback","Sedan","Coupe","SUV / Crossover","Μεγάλο SUV / 4x4","Van / Pickup"];
const allowedServices = [
  "Γυάλισμα και διόρθωση χρώματος","Κεραμική επίστρωση","Αποκατάσταση / γυάλισμα φαναριών",
  "PPF σε φανάρια","Καθαρισμός ζαντών και ελαστικών","Βιολογικός καθαρισμός σαλονιού",
  "Απολύμανση καμπίνας","Περιποίηση δερμάτινων επιφανειών","Άλλο / χρειάζομαι συμβουλή"
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const vehicle = String(body.vehicle ?? "");
    const model = String(body.model ?? "").trim();
    const preferredDate = body.date ? String(body.date) : null;
    const notes = String(body.notes ?? "").trim();
    const selected = Array.isArray(body.services) ? body.services.filter((s: unknown) => typeof s === "string" && allowedServices.includes(s)) : [];

    if (name.length < 2 || name.length > 120) return NextResponse.json({error:"Ελέγξτε το ονοματεπώνυμο."},{status:400});
    if (phone.length < 8 || phone.length > 30) return NextResponse.json({error:"Ελέγξτε το τηλέφωνο επικοινωνίας."},{status:400});
    if (!allowedVehicles.includes(vehicle) || selected.length === 0) return NextResponse.json({error:"Επιλέξτε όχημα και τουλάχιστον μία υπηρεσία."},{status:400});
    if (email.length > 254 || model.length > 120 || notes.length > 2000) return NextResponse.json({error:"Κάποια πεδία είναι υπερβολικά μεγάλα."},{status:400});
    if (preferredDate && !/^\\d{4}-\\d{2}-\\d{2}$/.test(preferredDate)) return NextResponse.json({error:"Μη έγκυρη ημερομηνία."},{status:400});

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return NextResponse.json({error:"Η υπηρεσία κρατήσεων δεν έχει συνδεθεί ακόμη. Επικοινωνήστε απευθείας με την επιχείρηση."},{status:503});

    const supabase = createClient(url, key, {auth:{persistSession:false, autoRefreshToken:false}});
    const { error } = await supabase.from("booking_requests").insert({
      customer_name:name, phone, email:email || null, vehicle_type:vehicle,
      vehicle_model:model || null, services:selected, preferred_date:preferredDate,
      notes:notes || null, status:"pending"
    });
    if (error) {
      console.error("Booking insert failed", error.message);
      return NextResponse.json({error:"Δεν ήταν δυνατή η καταχώριση. Δοκιμάστε ξανά αργότερα."},{status:500});
    }
    return NextResponse.json({ok:true},{status:201});
  } catch {
    return NextResponse.json({error:"Μη έγκυρο αίτημα."},{status:400});
  }
}