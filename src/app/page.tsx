import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const budgetBreakdown = [
  { label: "Avion", amount: "650 €", note: "Paris ↔ Colombo." },
  { label: "Logement", amount: "470,62 €", note: "Hôtels & villas." },
  { label: "Activités", amount: "250 €", note: "Safari, zipline, sorties bateau, entrées temples." },
  { label: "Terrestre", amount: "50 €", note: "Train panoramique, tuk-tuk, ajustements chauffeur." },
  { label: "Repas & drinks", amount: "200 €", note: "Du kottu au resto chic + cocktails." },
  { label: "Visa", amount: "40 €", note: "ETA en ligne, reçu sous 48 h." },
];

const travelWindows = [
  { id: "Choix 1", label: "4 → 14 juin 2026" },
  { id: "Choix 2", label: "11 → 21 juin 2026" },
  { id: "Choix 3", label: "18 → 28 juin 2026" },
];

const tripStats = [
  { value: "11 jours", description: "Durée totale du voyage" },
  { value: "9 jours", description: "Sur place" },
  { value: "7 jours", description: "Congés à poser" },
];

const itinerary: Array<{
  day: string;
  city: string;
  time: string;
  plan: string;
  price: string;
  note?: boolean;
}> = [
  { day: "Mercredi", city: "Paris", time: "En débauchant", plan: "Aller dormir à l’hôtel à côté de CDG", price: "" },
  { day: "Jeudi", city: "Paris", time: "10h30", plan: "🛫🛫🛫   Décollage  🛫🛫🛫", price: "" },
  { day: "Day 1 — Vendredi", city: "Colombo", time: "2h50", plan: "🛬🛬🛬   Atterrissage   🛬🛬🛬", price: "" },
  { day: "Day 1 — Vendredi", city: "Colombo", time: "Très tôt", plan: "CHECK IN", price: "80,00 €" },
  { day: "Day 1 — Vendredi", city: "Colombo", time: "Matin", plan: "🕌 Mosquée Jami Ul-Afar", price: "Gratuit" },
  { day: "Day 1 — Vendredi", city: "Colombo", time: "Matin", plan: "🚦 Visite du quartier Pettah et déjeuner sur place", price: "Gratuit" },
  { day: "Day 1 — Vendredi", city: "Colombo", time: "Après-midi", plan: "🛕 Temple Gangarama", price: "Gratuit" },
  { day: "Day 1 — Vendredi", city: "Colombo", time: "Après-midi", plan: "🏝️ Plage artificielle à Port City", price: "Gratuit" },
  { day: "Day 1 — Vendredi", city: "Colombo", time: "Après-midi", plan: "🌇 Golden hour sur la skyline", price: "Gratuit" },
  { day: "Day 1 — Vendredi", city: "Colombo", time: "Fin de journée", plan: "🍸 Rooftop avec vue sur Lotus Tower", price: "Variable" },
  { day: "Day 1 — Vendredi", city: "Colombo", time: "Soir", plan: "CHECK OUT", price: "" },
  { day: "Day 1 — Vendredi", city: "Colombo → Unawatuna", time: "Soir", plan: "Route en van (2 h)", price: "5,25 €" },
  { day: "Day 1 — Vendredi", city: "Unawatuna", time: "Soir", plan: "CHECK IN", price: "75,00 €" },
  { day: "Day 2 — Samedi", city: "Mirissa", time: "Matin", plan: "🌴 Coconut Tree Hill", price: "Gratuit" },
  { day: "Day 2 — Samedi", city: "Mirissa", time: "Matin", plan: "🐢 Turtle Beach (nage avec les tortues)", price: "Gratuit" },
  { day: "Day 2 — Samedi", city: "Mirissa", time: "Matin", plan: "🏄 Cours de surf à Weligama", price: "20,00 €" },
  { day: "Day 2 — Samedi", city: "Unawatuna", time: "Après-midi", plan: "🌊 Plage : Dalawella / Mihiripenna / Ahangama", price: "Gratuit" },
  { day: "Day 2 — Samedi", city: "Unawatuna", time: "Après-midi", plan: "🐢 Mise à l’eau de bébés tortues", price: "10,00 €" },
  { day: "Day 2 — Samedi", city: "", time: "", plan: "⚠️ Pas la pleine saison : si météo capricieuse, chill à la villa.", price: "", note: true },
  { day: "Day 3 — Dimanche", city: "Unawatuna", time: "Matin", plan: "CHECK OUT", price: "" },
  { day: "Day 3 — Dimanche", city: "Unawatuna → Udawalawe", time: "Matin", plan: "Route en van (2 h)", price: "3,13 €" },
  { day: "Day 3 — Dimanche", city: "Udawalawe", time: "Journée", plan: "🐘 Udawalawe National Park : safari", price: "70,00 €" },
  { day: "Day 3 — Dimanche", city: "Udawalawe → Ella", time: "Après-midi", plan: "Route en van (2 h)", price: "2,62 €" },
  { day: "Day 3 — Dimanche", city: "Ella", time: "Soir", plan: "CHECK IN", price: "27,37 €" },
  { day: "Day 4 — Lundi", city: "Ella", time: "7h30", plan: "CHECK OUT", price: "" },
  { day: "Day 4 — Lundi", city: "Ella", time: "8h", plan: "🍵 Uva Halpewatte : plantation de thé", price: "10,00 €" },
  { day: "Day 4 — Lundi", city: "Ella", time: "10h", plan: "🪽 Flying Ravana Mega Zipline", price: "25,00 €" },
  { day: "Day 4 — Lundi", city: "Ella → Kandy", time: "12h", plan: "Train panoramique (5–7 h, déjeuner à bord)", price: "15,00 €" },
  { day: "Day 4 — Lundi", city: "Kandy", time: "Fin de journée", plan: "CHECK IN", price: "60,00 €" },
  { day: "Day 5 — Mardi", city: "Kandy", time: "Matin", plan: "🦷 Temple Sri Dalada Maligawa", price: "" },
  { day: "Day 5 — Mardi", city: "Kandy", time: "Après-midi", plan: "🗼 Ambuluwawa Tower", price: "10,00 €" },
  { day: "Day 5 — Mardi", city: "Kandy", time: "Après-midi", plan: "🎋 Botanical Gardens", price: "Gratuit" },
  { day: "Day 5 — Mardi", city: "Kandy", time: "Après-midi", plan: "🪷 Visite de la ville", price: "Gratuit" },
  { day: "Day 5 — Mardi", city: "Kandy", time: "Soir", plan: "🔥 Spectacle YMBA (danses & cracheurs de feu)", price: "6,00 €" },
  { day: "Day 6 — Mercredi", city: "Kandy", time: "Matin", plan: "CHECK OUT", price: "" },
  { day: "Day 6 — Mercredi", city: "Kandy → Dambulla", time: "Matin", plan: "Route en van (1 h 30)", price: "1,50 €" },
  { day: "Day 6 — Mercredi", city: "Dambulla", time: "Matin", plan: "⚜️ Temple Dambulla Royal Cave", price: "8,00 €" },
  { day: "Day 6 — Mercredi", city: "Dambulla → Sigiriya", time: "Matin", plan: "Route en van (30 min)", price: "0,40 €" },
  { day: "Day 6 — Mercredi", city: "Sigiriya", time: "Après-midi", plan: "🦁 Forteresse de Sigiriya (randonnée)", price: "35,00 €" },
  { day: "Day 6 — Mercredi", city: "Sigiriya → Trincomalee", time: "Après-midi", plan: "Route en van (1 h 50)", price: "2,12 €" },
  { day: "Day 6 — Mercredi", city: "Trincomalee", time: "Soir", plan: "CHECK IN", price: "228,25 €" },
  { day: "Day 7 — Jeudi", city: "Trincomalee", time: "Matin", plan: "🐳 Sortie baleines", price: "30,00 €" },
  { day: "Day 7 — Jeudi", city: "Trincomalee", time: "Après-midi", plan: "🐦 Pigeon Island", price: "55,00 €" },
  { day: "Day 7 — Jeudi", city: "Trincomalee", time: "Après-midi", plan: "🤿 Snorkelling", price: "20,00 €" },
  { day: "Day 8 — Vendredi", city: "Trincomalee", time: "Matin", plan: "🏯 Temple Koneshwaram Kovil", price: "1,00 €" },
  { day: "Day 8 — Vendredi", city: "Trincomalee", time: "Matin", plan: "🌈 Temple Sri Badrakali Amman", price: "Gratuit" },
  { day: "Day 8 — Vendredi", city: "Trincomalee", time: "Après-midi", plan: "🥥 Visite de la ville", price: "Gratuit" },
  { day: "Day 8 — Vendredi", city: "Trincomalee", time: "Après-midi", plan: "🌅 Uppuveli Beach", price: "Gratuit" },
  { day: "Day 9 — Samedi", city: "Trincomalee", time: "Journée", plan: "🐚 Sandy Cove Beach", price: "Gratuit" },
  { day: "Day 9 — Samedi", city: "Trincomalee", time: "Journée", plan: "🦌 Dutch Bay Beach", price: "Gratuit" },
  { day: "Day 9 — Samedi", city: "Trincomalee", time: "Soir", plan: "CHECK OUT", price: "" },
  { day: "Day 9 — Samedi", city: "Trincomalee → Colombo", time: "Soir", plan: "Route en van (5 h, départ 19h)", price: "11,62 €" },
  { day: "Day 9 — Samedi", city: "Colombo", time: "4h05", plan: "🛫🛫🛫   Décollage  🛫🛫🛫", price: "" },
  { day: "Dimanche", city: "Paris", time: "13h50", plan: "🛬🛬🛬   Atterrissage   🛬🛬🛬", price: "" },


];

const itineraryDays = Array.from(
  itinerary.reduce((acc, entry) => {
    if (!acc.has(entry.day)) {
      acc.set(entry.day, [] as Array<(typeof itinerary)[number]>);
    }
    acc.get(entry.day)!.push(entry);
    return acc;
  }, new Map<string, Array<(typeof itinerary)[number]>>())
).map(([label, entries]) => ({ label, entries }));

const stays = [
  {
    title: "Colombo — ITC Ratnadipa",
    href: "https://www.booking.com/hotel/lk/itc-ratnadipa-a-luxury-collection-colombo.fr.html",
    description: "5 étoiles bord de mer pour atterrir en douceur et profiter de la skyline.",
    image: "/photos/colombo-itc.jpg",
  },
  {
    title: "Unawatuna — Villa entière",
    href: "https://www.airbnb.fr/rooms/1265998667374290710",
    description: "Grande maison à 5 min de la plage, jardin tropical pour les apéros.",
    image: "/photos/unawatuna-villa.jpg",
  },
  {
    title: "Ella — Panorama Villa",
    href: "https://www.airbnb.fr/rooms/1313628001816572376?viralityEntryPoint=1&unique_share_id=A3E0BBB9-2B13-4B3D-A54A-0F50093FA969&slcid=a6fe49b2e35b4322908b785e6e6f27db&s=76&adults=1&slug=XEkpWBwW&source_impression_id=p3_1760987579_P3Ev1mvjfwlDoYVW",
    description: "Terrasse avec vue sur la vallée, parfait pour le café du matin.",
    image: "https://a0.muscache.com/im/pictures/miso/Hosting-1313628001816572376/original/a1910ffd-ac90-4076-b77b-c1ccda25150c.jpeg?im_w=1200",
  },
  {
    title: "Kandy — Villa sur les hauteurs",
    href: "https://www.airbnb.fr/rooms/853604814351448100?check_out=2026-06-10&viralityEntryPoint=1&unique_share_id=D205B22C-FB27-495D-A1E5-05FD9E3708C6&slcid=2d6696eae7434453a3d93e5d4cd14efb&s=76&adults=8&check_in=2026-06-09&slug=CS7Pcr5m&source_impression_id=p3_1760987549_P3i75SI1DySSiH15",
    description: "Piscine, staff aux petits soins et ambiance jungle.",
    image: "https://a0.muscache.com/im/pictures/miso/Hosting-853604814351448100/original/0159a3a5-332c-4bb4-a8b2-30fc389bc27a.jpeg?im_w=1200",
  },
  {
    title: "Trincomalee — Villa Uppuveli",
    href: "https://www.airbnb.fr/rooms/1338965861207369303?check_out=2026-06-13&viralityEntryPoint=1&unique_share_id=6B355377-0E5F-4E38-8F02-0A6EEFC79D6C&slcid=d70159edb8814f74832fab4a1d9d06ea&s=76&adults=8&check_in=2026-06-10&slug=vk8ap3K9&source_impression_id=p3_1757953239_P3Hf3woRCOP_cR6D",
    description: "Face à la mer d’huile, snorkelling et lever de soleil privés.",
    image: "https://a0.muscache.com/im/pictures/miso/Hosting-1338965861207369303/original/4b1177bf-d9a0-4a11-8a44-b999fb86e14c.jpeg?im_w=1200",
  },
];


export default function Home() {
  return (
    <div className="bg-slate-50 text-slate-900">
      <header className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="flex flex-col items-center gap-10 rounded-[40px] bg-[#214D34] px-8 py-12 text-center text-white shadow-[0_40px_120px_-40px_rgba(0,0,0,0.55)] sm:flex-row sm:items-center sm:gap-16 sm:px-12 sm:py-14 sm:text-left">
            <div className="flex flex-1 flex-col gap-6">
              <p className="text-xs uppercase tracking-[0.35em] text-white/70 sm:text-sm">11 jours d’aventure</p>
              <h1 className={`${playfair.className} text-5xl font-semibold leading-tight text-white sm:text-6xl`}>
                Sri Lanka De Luxe
              </h1>
              <div className="space-y-1 text-base text-white/80 sm:text-lg">
                <p className="text-xl font-semibold text-white sm:text-2xl">Marie Kris Alex</p>
                <p>Travel Experience Specialist</p>
              </div>
            </div>
            <div className="relative flex w-full max-w-xs items-center justify-center overflow-hidden rounded-[32px] p-6 sm:h-[320px] sm:max-w-sm">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Sri_Lanka.svg"
                alt="Drapeau du Sri Lanka"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="bg-[#214D34] py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 sm:px-10">
          <div className="flex flex-col gap-8">
            <h2 className={`${playfair.className} text-3xl font-semibold text-white sm:text-4xl text-center`}>
              Dates possibles
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {travelWindows.map((slot) => (
                <div
                  key={slot.id}
                  className="rounded-[28px] border border-white/40 bg-white text-[#214D34] px-6 py-8 text-center shadow-sm"
                >
                  <div className={`${playfair.className} text-4xl font-semibold`}>{slot.id}</div>
                  <p className="mt-3 text-lg text-slate-700">{slot.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="h-2" />
            <div className="text-center text-white">
              <h3 className={`${playfair.className} text-3xl font-semibold sm:text-4xl`}>
                Congés à poser : 7 jours max
              </h3>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {tripStats.map((stat) => (
                <div
                  key={stat.value}
                  className="rounded-[28px] border border-white/30 bg-white/95 px-6 py-6 text-center text-[#214D34]"
                >
                  <p className={`${playfair.className} text-3xl font-semibold`}>{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-600">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-16 sm:px-10">
        <section className="flex flex-col gap-8" aria-labelledby="budget">
          <div className="overflow-hidden rounded-[36px] border border-[#214D34] bg-white text-center text-[#214D34]">
            <div className="bg-[#214D34] px-8 py-8 text-white sm:px-12">
              <h2 id="budget" className={`${playfair.className} text-5xl font-semibold sm:text-6xl`}>
                1 670,00 €
              </h2>
            </div>
            <div className="px-8 py-10 sm:px-12">
              <p className={`${playfair.className} text-lg font-semibold text-[#214D34]`}>
                Budget quasi tout compris
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Transport, hébergements, activités, visa et repas pour une expérience complète et sans souci au Sri Lanka.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[36px] border border-[#214D34] bg-white text-[#214D34]">
            <div className="bg-[#214D34] px-8 py-8 text-center text-white sm:px-12">
              <h3 className={`${playfair.className} text-2xl font-semibold sm:text-3xl`}>
                Répartition détaillée
              </h3>
            </div>
            <div className="grid gap-4 px-8 py-10 sm:grid-cols-2 sm:px-12">
              {budgetBreakdown.map((line) => (
                <div
                  key={line.label}
                  className="rounded-[28px] border border-[#214D34]/20 bg-white/95 px-6 py-5 text-[#214D34] shadow-sm"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wide">
                      {line.label}
                    </h4>
                    <p className={`${playfair.className} text-lg font-semibold`}>{line.amount}</p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{line.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6" aria-labelledby="itineraire">
          <div className="overflow-hidden rounded-[36px] border border-[#214D34] bg-white">
            <div className="bg-[#214D34] px-8 py-8 text-center text-white sm:px-12">
              <h2 id="itineraire" className={`${playfair.className} text-3xl font-semibold sm:text-4xl`}>
                Planning jour par jour
              </h2>
              <p className="mt-2 text-sm text-white/70">
                Clique sur chaque jour pour dérouler la journée complète (horaires, activités, coûts).
              </p>
            </div>

            <div className="flex flex-col gap-4 px-4 py-6 sm:px-8 sm:py-8">
              {itineraryDays.map(({ label, entries }) => {
                const firstCity = entries.find((entry) => entry.city.trim() !== "")?.city ?? "—";
                return (
                  <details
                    key={label}
                    className="overflow-hidden rounded-[28px] border border-[#214D34]/30 bg-white"
                  >
                    <summary
                      className={`${playfair.className} flex cursor-pointer list-none items-center justify-between gap-3 border-b border-[#214D34]/20 bg-white px-5 py-4 text-left text-[#214D34]`}
                    >
                      <span className="text-lg font-semibold">{label}</span>
                      <span className="text-sm text-[#214D34]/80">{firstCity}</span>
                    </summary>
                    <div className="overflow-x-auto border-t border-[#214D34]/20">
                      <table className="min-w-[680px] w-full text-left text-sm text-slate-700">
                        <thead className="bg-slate-900 text-xs font-semibold uppercase tracking-[0.35em] text-white">
                          <tr>
                            <th className="px-4 py-3">Ville</th>
                            <th className="px-4 py-3">Horaire</th>
                            <th className="px-4 py-3">Planning</th>
                            <th className="px-4 py-3">Prix (/pers)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {entries.map((entry, entryIndex) => {
                          if (entry.note) {
                            return (
                              <tr key={`note-${label}-${entryIndex}`} className="bg-slate-100 text-slate-600">
                                <td colSpan={4} className="px-4 py-3 italic">{entry.plan}</td>
                              </tr>
                            );
                          }

                          const city = entry.city && entry.city.trim() !== "" ? entry.city : "—";
                          const time = entry.time && entry.time.trim() !== "" ? entry.time : "—";
                          const price = entry.price && entry.price.trim() !== "" ? entry.price : "—";
                          const plan = entry.plan && entry.plan.trim() !== "" ? entry.plan : "—";

                          return (
                            <tr
                              key={`${label}-${entry.plan}-${entryIndex}`}
                              className={entryIndex % 2 === 0 ? "bg-white" : "bg-slate-50"}
                            >
                              <td className="px-4 py-3 align-top">{city}</td>
                              <td className="px-4 py-3 align-top text-slate-500">{time}</td>
                              <td className="px-4 py-3 align-top text-slate-700">{plan}</td>
                              <td className="px-4 py-3 align-top text-slate-900">{price}</td>
                            </tr>
                          );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6" aria-labelledby="logements">
          <div className="flex flex-col gap-2">
            <h2 id="logements" className={`${playfair.className} text-3xl font-semibold`}>
              Logements jolis : hôtels & Airbnb
            </h2>
            <p className="text-sm text-slate-600">
              Chaque photo est cliquable et ouvre la fiche à réserver.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stays.map((stay) => (
              <a
                key={stay.title}
                href={stay.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group overflow-hidden rounded-[32px] border border-[#214D34]/60 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={stay.image}
                    alt={stay.title}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-[#214D34]/80 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white">
                    Cliquer pour voir
                  </span>
                </div>
                <div className="space-y-2 px-5 py-5 text-[#214D34]">
                  <h3 className={`${playfair.className} text-lg font-semibold`}>{stay.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{stay.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 py-12 text-sm text-slate-300">
        <div className="mx-auto flex max-w-5xl px-6 sm:px-10">
          Sri Lanka de Luxe — Itinéraire privé.
        </div>
      </footer>
    </div>
  );
}
