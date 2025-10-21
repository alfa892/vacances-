import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import { HoverPreviewLink } from "./components/HoverPreviewLink";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const routePlan = (label: string, href: string) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer noopener"
    className="inline-flex items-center gap-1 text-[#214D34] underline decoration-dotted underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#214D34]/60"
  >
    {label}
  </a>
);

const budgetBreakdown = [
  { label: "Avion", amount: "650 €", note: "Paris ↔ Colombo." },
  { label: "Logement", amount: "470,62 €", note: "Hôtels & villas." },
  { label: "Activités", amount: "250 €", note: "Safari, zipline, sorties bateau, entrées temples." },
  { label: "Terrestre", amount: "50 €", note: "Train panoramique, tuk-tuk, ajustements chauffeur." },
  { label: "Repas & drinks", amount: "200 €", note: "Du kottu au resto chic + cocktails." },
  { label: "Visa", amount: "40 €", note: "ETA en ligne, reçu sous 48 h." },
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
  plan: ReactNode;
  price: string;
  note?: boolean;
}> = [
  {
    day: "Mercredi",
    city: "Paris",
    time: "En débauchant",
    plan: "Aller dormir à l’hôtel à côté de CDG",
    price: "Hôtel + train + restau",
  },
  { day: "Jeudi", city: "Paris", time: "10h30", plan: "🛫🛫🛫   Décollage  🛫🛫🛫", price: "325 €" },
  { day: "Day 1 — Vendredi", city: "Colombo", time: "2h50", plan: "🛬🛬🛬   Atterrissage   🛬🛬🛬", price: "" },
  {
    day: "Day 1 — Vendredi",
    city: "Colombo",
    time: "4h00",
    plan: (
      <HoverPreviewLink
        href="https://www.booking.com/hotel/lk/itc-ratnadipa-a-luxury-collection-colombo.fr.html"
        label="CHECK IN — ITC Ratnadipa"
        subtitle="40 min de voiture de l’aéroport · transfert disponible · accueil 24/24"
        srLabel="Ouvrir la fiche de l’hôtel"
        images={[
          {
            src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/592834813.jpg?k=2b549e03614fec2e7471f7fb54930d103b63039ebdfeed0a7b1e6ba5ee66317b&o=",
            alt: "ITC Ratnadipa — Lobby",
          },
          {
            src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/548877610.jpg?k=d64ce3152c9cbc0e7e0bd912ecb2e2c0e246bd035616131e1df7f70830c96de8&o=",
            alt: "ITC Ratnadipa — Chambre",
          },
        ]}
      />
    ),
    price: "80,00 €",
  },
  {
    day: "Day 1 — Vendredi",
    city: "Colombo",
    time: "10h",
    plan: "Petit déjeuner",
    price: "Gratuit",
  },
  {
    day: "Day 1 — Vendredi",
    city: "Colombo",
    time: "Matin",
    plan: (
      <HoverPreviewLink
        href="https://fr.tripadvisor.ca/Attraction_Review-g293962-d4091812-Reviews-or10-Jami_Ul_Alfar_Mosque-Colombo_Western_Province.html"
        label="🕌 Mosquée Jami Ul-Afar"
        srLabel="Ouvrir la fiche TripAdvisor"
        images={[
          {
            src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/4b/1a/0c/photo0jpg.jpg?w=1400&h=800&s=1",
            alt: "Mosquée Jami Ul-Afar — façade",
          },
          {
            src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/b6/3e/38/caption.jpg?w=1100&h=-1&s=1",
            alt: "Mosquée Jami Ul-Afar — intérieur",
          },
        ]}
      />
    ),
    price: "Gratuit",
  },
  {
    day: "Day 1 — Vendredi",
    city: "Colombo",
    time: "Matin",
    plan: (
      <HoverPreviewLink
        href="https://www.voyager-srilanka.fr/voyage/colombo/quartier-de-pettah/"
        label="🚦 Quartier de Pettah"
        subtitle="Déjeuner sur place"
        srLabel="Découvrir le quartier de Pettah"
        images={[
          {
            src: "https://l450v.alamy.com/450vfr/w13f6t/colombo-sri-lanka-21-decembre-2016-rue-commercante-animee-dans-le-quartier-de-pettah-c-est-la-principale-zone-commerciale-w13f6t.jpg",
            alt: "Rue commerçante animée dans le quartier de Pettah",
          },
          {
            src: "https://www.prochain-arret.com/wp-content/uploads/2023/10/colombo-lotus-marche-flottant.jpg",
            alt: "Marché flottant de Colombo",
          },
        ]}
      />
    ),
    price: "Prix d'un repas",
  },
  {
    day: "Day 1 — Vendredi",
    city: "Colombo",
    time: "Après-midi",
    plan: (
      <HoverPreviewLink
        href="https://www.buddhatoothrelictemple.org.sg/gangaramaya-monastery-colombo-sri-lanka"
        label="🛕 Temple Gangarama"
        srLabel="Explorer le temple Gangarama"
        images={[
          {
            src: "https://www.lovesrilanka.org/wp-content/uploads/2020/04/Gangaramaya-Temple-1920.jpg",
            alt: "Temple Gangarama au bord du lac",
          },
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPEYk9RoY2SO968hGx-P29QewbGuddhxso-A&s",
            alt: "Détails colorés du temple Gangarama",
          },
        ]}
      />
    ),
    price: "Gratuit",
  },
  {
    day: "Day 1 — Vendredi",
    city: "Colombo",
    time: "Après-midi",
    plan: (
      <HoverPreviewLink
        href="https://wandertropics.com/colombo-port-city/"
        label="🏝️ Plage artificielle à Port City"
        subtitle="si on veut se reposer"
        srLabel="Voir la plage artificielle de Port City"
        images={[
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQihMluB4l7n8eav8ixr-EbpmCO_a2o1pEw3A&s",
            alt: "Plage artificielle de Port City Colombo",
          },
        ]}
      />
    ),
    price: "Gratuit",
  },
  {
    day: "Day 1 — Vendredi",
    city: "Colombo",
    time: "Après-midi",
    plan: (
      <HoverPreviewLink
        href="https://www.therooftopguide.com/rooftop-bars-in-colombo/cloud-red-at-cinnamon-red.html"
        label="🌇 Golden hour sur la skyline"
        srLabel="Voir le rooftop Cloud Red"
        images={[
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2y_CRTasuGeX5a8QeL-paqDIZT_Xobj1q8A&s",
            alt: "Vue depuis le rooftop Cloud Red",
          },
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYUqGs1Ruk50DCu9t9Ke6TjUCO1oHWc_JjNw&s",
            alt: "Ambiance au bar Cloud Red au coucher du soleil",
          },
        ]}
      />
    ),
    price: "Gratuit",
  },
  { day: "Day 1 — Vendredi", city: "Colombo", time: "Fin de journée", plan: "🍸 Rooftop avec vue sur Lotus Tower", price: "Prix du cocktail" },
  {
    day: "Day 1 — Vendredi",
    city: "Colombo → Unawatuna",
    time: "Soir",
    plan: routePlan(
      "🚐 Route en van (2 h)",
      "https://www.google.com/maps/dir/Colombo+City+Port,+Sri+Lanka/X7XJ%2BFJ8+Thalpe+Beach,+Wellethota+Road,+Talpe,+Sri+Lanka/@6.5591437,79.7641324,9.39z/data=!4m14!4m13!1m5!1m1!1s0x3ae2592cf4eff9d9:0xb4db8c89d7d055b0!2m2!1d79.8368426!2d6.9378036!1m5!1m1!1s0x3ae16d44d2b29173:0x797de772d527c2c5!2m2!1d80.2878868!2d5.9952498!3e0?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
    ),
    price: "5,25 €",
  },
  {
    day: "Day 1 — Vendredi",
    city: "Unawatuna",
    time: "Soir",
    plan: (
      <HoverPreviewLink
        href="https://www.airbnb.fr/rooms/1265998667374290710?check_out=2026-06-07&viralityEntryPoint=1&unique_share_id=736C1D87-76F3-4658-97DE-E164FCD5C230&slcid=e30f31a350994cc98af2963a3869747f&s=76&adults=8&check_in=2026-06-05&slug=mNqkpYLM&source_impression_id=p3_1757952396_P3CnOf0tWM2kgM19"
        label="CHECK IN — Villa privée"
        subtitle="Piscine jungle rien que pour nous"
        srLabel="Ouvrir la villa Airbnb d'Unawatuna"
        images={[
          {
            src: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTI2NTk5ODY2NzM3NDI5MDcxMA==/original/e4fffc4f-d3d8-4fbc-8f51-51761ac980e3.jpeg?im_w=1200",
            alt: "Vue aérienne de la villa avec piscine",
          },
          {
            src: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTI2NTk5ODY2NzM3NDI5MDcxMA==/original/9348cb0c-7b51-407e-ab1b-0d9ad41380a4.jpeg?im_w=1200",
            alt: "Salon ouvert sur la jungle",
          },
        ]}
      />
    ),
    price: "75,00 €",
  },
  {
    day: "Day 2 — Samedi",
    city: "Mirissa",
    time: "Matin",
    plan: (
      <HoverPreviewLink
        href="https://www.tripadvisor.fr/Attraction_Review-g1407334-d17469090-Reviews-Coconut_Tree_Hill-Mirissa_Southern_Province.html"
        label="🌴 Coconut Tree Hill"
        srLabel="Découvrir Coconut Tree Hill"
        images={[
          {
            src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/10/4f/42/photo1jpg.jpg?w=1200&h=-1&s=1",
            alt: "Coconut Tree Hill au lever du soleil",
          },
          {
            src: "https://thirdeyetraveller.com/wp-content/uploads/COCONUTHILL-7-of-12-2-scaled-scaled.jpg",
            alt: "Palmier penché sur Coconut Tree Hill",
          },
        ]}
      />
    ),
    price: "Gratuit",
  },
  {
    day: "Day 2 — Samedi",
    city: "Mirissa",
    time: "Matin",
    plan: (
      <HoverPreviewLink
        href="https://www.tripadvisor.fr/Attraction_Review-g1407334-d19174694-Reviews-Turtle_Point-Mirissa_Southern_Province.html"
        label="🐢 Turtle Point"
        srLabel="Voir Turtle Point"
        images={[
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbEoleKYf6BKjPtimUUtJsjLNPLAcPR3C-1Q&s",
            alt: "Tortue nageant à Turtle Point",
          },
        ]}
      />
    ),
    price: "Gratuit",
  },
  {
    day: "Day 2 — Samedi",
    city: "Mirissa",
    time: "Matin",
    plan: (
      <HoverPreviewLink
        href="https://www.tripadvisor.fr/AttractionProductReview-g612380-d26496018-Surf_lessons_weligama_by_surf_and_stay_surf_camp-Weligama_Matara_Southern_Province.html"
        label="🏄 Cours de surf à Weligama"
        subtitle="si on est chaud"
        srLabel="Voir les cours de surf à Weligama"
        images={[
          {
            src: "https://media.kazaden.com/imgth/1920x810/img/activity_school/4061/Sri-Lanka_Mirissa_Surfeurs-sur-la-plage-%28c%29-ksl-690429154.jpg",
            alt: "Surfeurs sur la plage de Weligama",
          },
        ]}
      />
    ),
    price: "20,00 €",
  },
  {
    day: "Day 2 — Samedi",
    city: "Unawatuna",
    time: "Après-midi",
    plan: (
      <HoverPreviewLink
        label="🌊 Plage : Dalawella / Mihiripenna / Ahangama"
        images={[
          {
            src: "https://beachsearcher.fr/images/beaches/144201194/LK201194.jpg",
            alt: "Plage de Dalawella au coucher du soleil",
          },
          {
            src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/09/c0/ad/mihiripenna-beach.jpg?w=1200&h=-1&s=1",
            alt: "Plage de Mihiripenna et ses rochers",
          },
        ]}
      />
    ),
    price: "Gratuit",
  },
  {
    day: "Day 2 — Samedi",
    city: "",
    time: "",
    plan: (
      <div className="flex flex-wrap items-center gap-2">
        <span>⚠️ Si météo capricieuse :</span>
        <HoverPreviewLink
          href="https://www.tripadvisor.fr/Attraction_Review-g297896-d3617497-Reviews-Galle_Dutch_Fort-Galle_Galle_District_Southern_Province.html"
          label="Visiter le fort de Galle"
          images={[
            {
              src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuE2yHJGxC3j7HfBqNS4hgNI7-V9Umrbszlg&s",
              alt: "Fort de Galle et ses remparts",
            },
            {
              src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkOlLGrIhdrWCIzdtbT-kZ6rwz04iAnyHrAQ&s",
              alt: "Vue sur le phare du fort de Galle",
            },
          ]}
        />
      </div>
    ),
    price: "",
    note: true,
  },
  {
    day: "Day 3 — Dimanche",
    city: "Unawatuna → Udawalawe",
    time: "Matin",
    plan: routePlan(
      "🚐 Route en van (2 h)",
      "https://www.google.com/maps/dir/Unawatuna,+Sri+Lanka/Udawalawe,+Sri+Lanka/@6.2817187,80.4832325,9.56z/data=!4m14!4m13!1m5!1m1!1s0x3ae172f162bf926d:0xc0444c5e8377446c!2m2!1d80.2488596!2d6.0174469!1m5!1m1!1s0x3ae40750763484ed:0x302cc7e3f95389b5!2m2!1d80.823938!2d6.4184828!3e0?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
    ),
    price: "3,13 €",
  },
  {
    day: "Day 3 — Dimanche",
    city: "Udawalawe",
    time: "Journée",
    plan: (
      <HoverPreviewLink
        href="https://www.unpasseportencavale.com/le-sri-lanka/parcs-reserves-et-safaris/faire-un-safari-a-uda-walawe/"
        label="🐘 Udawalawe National Park : safari"
        srLabel="Tout savoir sur le safari à Udawalawe"
        images={[
          {
            src: "https://media.tacdn.com/media/attractions-splice-spp-674x446/09/de/b4/21.jpg",
            alt: "Éléphants au parc national d'Udawalawe",
          },
          {
            src: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/0b/2a/7c.jpg",
            alt: "Jeep de safari à Udawalawe",
          },
        ]}
      />
    ),
    price: "70,00 €",
  },
  {
    day: "Day 3 — Dimanche",
    city: "Udawalawe → Ella",
    time: "Après-midi",
    plan: routePlan(
      "🚐 Route en van (2 h)",
      "https://www.google.com/maps/dir/Udawalawe,+Sri+Lanka/Ella,+Sri+Lanka/@6.5840189,80.7708802,10.34z/data=!4m14!4m13!1m5!1m1!1s0x3ae40750763484ed:0x302cc7e3f95389b5!2m2!1d80.823938!2d6.4184828!1m5!1m1!1s0x3ae465955bc09a25:0xbdfadcdadec487fb!2m2!1d81.0491074!2d6.8731332!3e0?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
    ),
    price: "2,62 €",
  },
  {
    day: "Day 3 — Dimanche",
    city: "Ella",
    time: "Soir",
    plan: (
      <HoverPreviewLink
        href="https://www.airbnb.fr/rooms/1313628001816572376?viralityEntryPoint=1&unique_share_id=A3E0BBB9-2B13-4B3D-A54A-0F50093FA969&slcid=a6fe49b2e35b4322908b785e6e6f27db&s=76&adults=1&slug=XEkpWBwW&source_impression_id=p3_1760987579_P3Ev1mvjfwlDoYVW"
        label="CHECK IN — Panorama Villa"
        subtitle="Terrasse avec vue sur Ella"
        srLabel="Ouvrir la villa Panorama à Ella"
        images={[
          {
            src: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMxMzYyODAwMTgxNjU3MjM3Ng%3D%3D/original/0fe613a4-cc8d-4b84-b590-4530c670bfed.jpeg?im_w=720",
            alt: "Vue sur la vallée depuis la terrasse",
          },
          {
            src: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMxMzYyODAwMTgxNjU3MjM3Ng%3D%3D/original/64a01a23-5c14-4988-a0b6-192da3a16f35.jpeg?im_w=720",
            alt: "Salon ouvert de la villa"
          },
        ]}
      />
    ),
    price: "27,37 €",
  },
  {
    day: "Day 4 — Lundi",
    city: "Ella",
    time: "8h",
    plan: (
      <HoverPreviewLink
        href="https://www.tripadvisor.fr/Attraction_Review-g616035-d3833433-Reviews-Halpewatte_Tea_Factory_Tour-Ella_Uva_Province.html"
        label="🍵 Halpewatte Tea Factory"
        srLabel="Visiter la Halpewatte Tea Factory"
        images={[
          {
            src: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/0d/73/23.jpg",
            alt: "Visite de la plantation de thé Halpewatte",
          },
          {
            src: "https://cdn.getyourguide.com/img/tour/8b728d0d2edfa9d07f79fed45f641adfbeaaf9565a410a25bd4e8c642f42149c.jpg/68.jpg",
            alt: "Feuilles de thé sur les collines d'Ella",
          },
        ]}
      />
    ),
    price: "10,00 €",
  },
  {
    day: "Day 4 — Lundi",
    city: "Ella",
    time: "10h",
    plan: (
      <HoverPreviewLink
        href="https://www.tripadvisor.fr/Attraction_Review-g616035-d15856320-Reviews-Flying_Ravana_Mega_Zipline-Ella_Uva_Province.html"
        label="🪽 Flying Ravana Mega Zipline"
        srLabel="Réserver Flying Ravana"
        images={[
          {
            src: "https://lh3.googleusercontent.com/p/AF1QipOVY4i6KfvSe945qrsuwdutnamSMT4l19lvRj8=s1360-w1360-h1020",
            alt: "Zipline au-dessus de la vallée d'Ella",
          },
        ]}
      />
    ),
    price: "25,00 €",
  },
  {
    day: "Day 4 — Lundi",
    city: "Ella → Kandy",
    time: "12h",
    plan: (
      <HoverPreviewLink
        href="https://www.tripadvisor.fr/AttractionProductReview-g616035-d11471223-Reviews-Ella_to_Kandy_Scenic_Train_Journey-Ella_Uva_Province.html"
        label="🚆 Train panoramique Ella → Kandy"
        subtitle="5–7 h · déjeuner à bord"
        srLabel="Voir le train panoramique Ella Kandy"
        images={[
          {
            src: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/1b/71/6f.jpg",
            alt: "Train bleu sur le viaduc des Neuf Arches",
          },
          {
            src: "https://cdn.getyourguide.com/img/tour/72bc58fb94e5a37e.jpeg/145.jpg",
            alt: "Paysages depuis le train panoramique",
          },
        ]}
      />
    ),
    price: "15,00 €",
  },
  {
    day: "Day 4 — Lundi",
    city: "Kandy",
    time: "Fin de journée",
    plan: (
      <HoverPreviewLink
        href="https://www.airbnb.fr/rooms/853604814351448100?check_out=2026-06-10&viralityEntryPoint=1&unique_share_id=D205B22C-FB27-495D-A1E5-05FD9E3708C6&slcid=2d6696eae7434453a3d93e5d4cd14efb&s=76&adults=8&check_in=2026-06-09&slug=CS7Pcr5m&source_impression_id=p3_1760987549_P3i75SI1DySSiH15"
        label="CHECK IN — Villa sur les hauteurs"
        subtitle="Piscine et staff aux petits soins"
        srLabel="Ouvrir la villa de Kandy"
        images={[
          {
            src: "https://a0.muscache.com/im/pictures/miso/Hosting-853604814351448100/original/2b57a5fe-ab2c-497c-a79d-5f53ea4a7238.jpeg?im_w=1440",
            alt: "Piscine à débordement à Kandy",
          },
          {
            src: "https://a0.muscache.com/im/pictures/miso/Hosting-853604814351448100/original/79a2b95d-2d87-41d7-b634-730a2309f00e.jpeg?im_w=1440",
            alt: "Terrasse panoramique de la villa",
          },
        ]}
      />
    ),
    price: "60,00 €",
  },
  {
    day: "Day 5 — Mardi",
    city: "Kandy",
    time: "Matin",
    plan: (
      <HoverPreviewLink
        href="https://www.unpasseportencavale.com/le-sri-lanka/le-triangle-culturel/visiter-le-temple-de-la-dent-a-kandy/"
        label="🦷 Temple de la Dent"
        srLabel="Visiter le temple de la Dent"
        images={[
          {
            src: "https://media-cdn.tripadvisor.com/media/photo-s/17/74/46/29/sri-dalada-maligawa-or.jpg",
            alt: "Temple de la Dent à Kandy",
          },
          {
            src: "https://backpackersunited.in/_next/image?url=https%3A%2F%2Fbpu-images-v1.s3.eu-north-1.amazonaws.com%2Fuploads%2F1721634681262_Sri%20Dalada%20Maligawa%201.jpg&w=3840&q=75",
            alt: "Intérieur du temple de la Dent",
          },
        ]}
      />
    ),
    price: "",
  },
  {
    day: "Day 5 — Mardi",
    city: "Kandy",
    time: "Après-midi",
    plan: (
      <HoverPreviewLink
        href="https://www.unpasseportencavale.com/le-sri-lanka/la-tour-dambuluwawa-pres-de-kandy/"
        label="🗼 Ambuluwawa Tower"
        srLabel="Monter à la tour d'Ambuluwawa"
        images={[
          {
            src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/7c/79/77/caption.jpg?w=800&h=800&s=1",
            alt: "Tour d'Ambuluwawa dans la brume",
          },
        ]}
      />
    ),
    price: "10,00 €",
  },
  {
    day: "Day 5 — Mardi",
    city: "Kandy",
    time: "Après-midi",
    plan: (
      <HoverPreviewLink
        href="https://www.tripadvisor.com/Attraction_Review-g1194819-d523519-Reviews-Royal_Botanical_Gardens-Peradeniya_Kandy_District_Central_Province.html"
        label="🎋 Botanical Gardens"
        srLabel="Explorer les jardins botaniques de Peradeniya"
        images={[
          {
            src: "https://www.andbeyond.com/wp-content/uploads/sites/5/Peridenya-Gardens-kandy-sri-lanka1.jpg",
            alt: "Allée de palmiers aux jardins botaniques",
          },
          {
            src: "https://cdn.forevervacation.com/uploads/digital/assets/royal-botanic-gardens.jpg",
            alt: "Jardins botaniques de Peradeniya",
          },
        ]}
      />
    ),
    price: "Gratuit",
  },
  {
    day: "Day 5 — Mardi",
    city: "Kandy",
    time: "Après-midi",
    plan: (
      <HoverPreviewLink
        label="🪷 Visite de la ville"
        images={[
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKLUomu_SP5OM_QOdAg_U1FURttw5NNiigsw&s",
            alt: "Rue colorée de Kandy",
          },
          {
            src: "https://www.mondeasie.com/voyages-sur-mesure/images/BLOG/QUE-VOIR-SRI-LANKA/KANDY/slide-voyage-sri-lanka-kandy-2.jpg",
            alt: "Vue sur le lac de Kandy",
          },
        ]}
      />
    ),
    price: "Gratuit",
  },
  {
    day: "Day 5 — Mardi",
    city: "Kandy",
    time: "Soir",
    plan: (
      <HoverPreviewLink
        href="https://www.viator.com/fr-FR/tours/Kandy/Exciting-evening-with-Fire-Dancing-cultural-show/d22283-108917P220"
        label="🔥 Spectacle YMBA (danses & cracheurs de feu)"
        srLabel="Réserver le spectacle YMBA"
        images={[
          {
            src: "https://www.viator.com/images/108917P220_1_95.jpg",
            alt: "Danseurs enflammés au spectacle YMBA",
          },
        ]}
      />
    ),
    price: "6,00 €",
  },
  {
    day: "Day 6 — Mercredi",
    city: "Kandy → Dambulla",
    time: "Matin",
    plan: routePlan(
      "🚐 Route en van (1 h 30)",
      "https://www.google.com/maps/dir/Kandy,+Sri+Lanka/Dambulla,+Sri+Lanka/@7.5818242,80.219165,10z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x3ae366266498acd3:0x411a3818a1e03c35!2m2!1d80.6337262!2d7.2905715!1m5!1m1!1s0x3afcaff4c8adcc4f:0x67ae3cc5b1536914!2m2!1d80.6510856!2d7.8741017!3e0?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
    ),
    price: "1,50 €",
  },
  {
    day: "Day 6 — Mercredi",
    city: "Dambulla",
    time: "Matin",
    plan: (
      <HoverPreviewLink
        href="https://www.unpasseportencavale.com/le-sri-lanka/le-triangle-culturel/dambulla/"
        label="⚜️ Temple Dambulla Royal Cave"
        srLabel="Explorer les grottes de Dambulla"
        images={[
          {
            src: "https://images.squarespace-cdn.com/content/v1/6298cb774cf3830bc9b342bf/1667540226303-HTH4O4VEDHBVWP63JUSB/Seated+Buddhas+at+Dambulla+Cave+Temple.jpg",
            alt: "Statues de Bouddha à Dambulla",
          },
          {
            src: "https://www.historyhit.com/app/uploads/2021/06/shutterstock_Dambulla-Cave-Temple-1.jpg",
            alt: "Peintures murales des grottes de Dambulla",
          },
          {
            src: "https://www.ceylonexpeditions.com/medias/destination_places/big/131/dambulla-cave-temple.jpg",
            alt: "Entrée du temple de Dambulla",
          },
        ]}
      />
    ),
    price: "8,00 €",
  },
  {
    day: "Day 6 — Mercredi",
    city: "Dambulla → Sigiriya",
    time: "Matin",
    plan: routePlan(
      "🚐 Route en van (30 min)",
      "https://www.google.com/maps/dir/Dambulla,+Sri+Lanka/Sigiriya,+Sri+Lanka/@7.9141015,80.6617092,13z/data=!4m14!4m13!1m5!1m1!1s0x3afcaff4c8adcc4f:0x67ae3cc5b1536914!2m2!1d80.6510856!2d7.8741017!1m5!1m1!1s0x3afca0dfa73179d1:0x1e04c1150cff0edf!2m2!1d80.754698!2d7.9541085!3e0?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
    ),
    price: "0,40 €",
  },
  {
    day: "Day 6 — Mercredi",
    city: "Sigiriya",
    time: "Après-midi",
    plan: (
      <HoverPreviewLink
        href="https://www.unpasseportencavale.com/le-sri-lanka/le-triangle-culturel/le-rocher-du-lion-a-sigiriya-notre-guide-complet/"
        label="🦁 Forteresse de Sigiriya (randonnée)"
        srLabel="Tout savoir sur Sigiriya"
        images={[
          {
            src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ed/85/6b/um-palacio-no-topo-da.jpg?w=1200&h=-1&s=1",
            alt: "Rocher du Lion à Sigiriya",
          },
          {
            src: "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/muqzinlhem1y4kem2aiz/ExcursiondunejournéeàlaforteresseduLionsRockdeSigiriyaaudépartdeColombo-KlookÉtats-Unis.jpg",
            alt: "Escaliers monumentaux de Sigiriya",
          },
        ]}
      />
    ),
    price: "35,00 €",
  },
  {
    day: "Day 6 — Mercredi",
    city: "Sigiriya → Trincomalee",
    time: "Après-midi",
    plan: routePlan(
      "🚐 Route en van (1 h 50)",
      "https://www.google.com/maps/dir/Sigiriya,+Sri+Lanka/Trincomalee,+Sri+Lanka/@8.0752492,80.6588082,10.94z/data=!4m14!4m13!1m5!1m1!1s0x3afca0dfa73179d1:0x1e04c1150cff0edf!2m2!1d80.754698!2d7.9541085!1m5!1m1!1s0x3afbbcb6902dbe27:0x7de76a7a331b0fbb!2m2!1d81.2152121!2d8.5873638!3e0?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
    ),
    price: "2,12 €",
  },
  {
    day: "Day 6 — Mercredi",
    city: "Trincomalee",
    time: "Soir",
    plan: (
      <HoverPreviewLink
        href="https://www.airbnb.fr/rooms/1338965861207369303?check_out=2026-06-13&viralityEntryPoint=1&unique_share_id=6B355377-0E5F-4E38-8F02-0A6EEFC79D6C&slcid=d70159edb8814f74832fab4a1d9d06ea&s=76&adults=8&check_in=2026-06-10&slug=vk8ap3K9&source_impression_id=p3_1757953239_P3Hf3woRCOP_cR6D"
        label="CHECK IN — Villa Uppuveli"
        subtitle="Face à la mer d’huile"
        srLabel="Ouvrir la villa Uppuveli"
        images={[
          {
            src: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMzODk2NTg2MTIwNzM2OTMwMw%3D%3D/original/db8b5fbc-c408-4fc5-b31a-4162e1947e6d.jpeg?im_w=1440",
            alt: "Piscine avec vue sur l'océan à Trincomalee",
          },
          {
            src: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMzODk2NTg2MTIwNzM2OTMwMw%3D%3D/original/961e458f-5dca-4027-8e5a-8d9c8548986a.jpeg?im_w=1440",
            alt: "Salon ouvert de la villa Uppuveli",
          },
        ]}
      />
    ),
    price: "228,25 €",
  },
  {
    day: "Day 7 — Jeudi",
    city: "Trincomalee",
    time: "Matin",
    plan: (
      <HoverPreviewLink
        href="https://ann.fr/observer-les-baleines-du-sri-lanka/"
        label="🐳 Sortie baleines"
        srLabel="Tout savoir sur l'observation des baleines"
        images={[
          {
            src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/13/0b/31/caption.jpg?w=1200&h=-1&s=1",
            alt: "Baleines observées au large de Trincomalee",
          },
        ]}
      />
    ),
    price: "30,00 €",
  },
  {
    day: "Day 7 — Jeudi",
    city: "Trincomalee",
    time: "Après-midi",
    plan: (
      <HoverPreviewLink
        href="https://www.unpasseportencavale.com/le-sri-lanka/la-cote-est/pigeon-island-au-sri-lanka/"
        label="🐦 Pigeon Island"
        srLabel="Guide complet de Pigeon Island"
        images={[
          {
            src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/0c/b8/01/getlstd-property-photo.jpg?w=900&h=500&s=1",
            alt: "Plage de Pigeon Island",
          },
          {
            src: "https://www.carnetdescapades.com/app/uploads/2019/01/pigeon-island-sri-lanka.jpg",
            alt: "Eaux turquoise autour de Pigeon Island",
          },
        ]}
      />
    ),
    price: "55,00 €",
  },
  {
    day: "Day 7 — Jeudi",
    city: "Trincomalee",
    time: "Après-midi",
    plan: "🤿 Snorkelling",
    price: "20,00 €",
  },
  {
    day: "Day 8 — Vendredi",
    city: "Trincomalee",
    time: "Matin",
    plan: (
      <HoverPreviewLink
        href="https://www.comptoirdesvoyages.fr/blog-voyage/sri-lanka/temple-koneswaram/lka"
        label="🏯 Temple Koneswaram"
        srLabel="Découvrir le temple Koneswaram"
        images={[
          {
            src: "https://www.lovesrilanka.org/wp-content/uploads/2020/04/LS_Koneswaram-TempleDesktop_1920x7001.jpg",
            alt: "Temple Koneswaram dominant l'océan",
          },
          {
            src: "https://media.timeout.com/images/102022443/image.jpg",
            alt: "Intérieur coloré du temple Koneswaram",
          },
        ]}
      />
    ),
    price: "1,00 €",
  },
  {
    day: "Day 8 — Vendredi",
    city: "Trincomalee",
    time: "Matin",
    plan: (
      <HoverPreviewLink
        href="https://www.tripadvisor.fr/Attraction_Review-g424963-d12676764-Reviews-Sri_Pathrakali_Amman_Temple-Trincomalee_Eastern_Province.html"
        label="🌈 Temple Sri Badrakali Amman"
        srLabel="Voir le temple Sri Badrakali Amman"
        images={[
          {
            src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/83/91/a7/sri-pathrakali-amman.jpg?w=1200&h=-1&s=1",
            alt: "Façade colorée du temple Badrakali",
          },
          {
            src: "https://preview.redd.it/sri-lankas-shri-badrakali-amman-hindu-temple-v0-uq1vrnx2kwoc1.jpeg?auto=webp&s=eb9dad2f2e788e8cf1a0cdec5b76925a7bba4df3",
            alt: "Details sculptés du temple Badrakali",
          },
        ]}
      />
    ),
    price: "Gratuit",
  },
  {
    day: "Day 8 — Vendredi",
    city: "Trincomalee",
    time: "Après-midi",
    plan: (
      <HoverPreviewLink
        href="https://www.viator.com/fr-FR/tours/Sri-Lanka/TRINCOMALEE-HALF-DAY-CITY-TOUR/d19-145816P11"
        label="🥥 Visite de la ville"
        images={[
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTbCtpnOSKCdv-XoYhkijTDBGvf1ruQ6F8DQ&s",
            alt: "Rue animée de Trincomalee",
          },
        ]}
      />
    ),
    price: "Gratuit",
  },
  {
    day: "Day 8 — Vendredi",
    city: "Trincomalee",
    time: "Après-midi",
    plan: (
      <HoverPreviewLink
        href="https://www.tripadvisor.fr/Attraction_Review-g424963-d10756130-Reviews-Uppuveli_Beach-Trincomalee_Eastern_Province.html"
        label="🌅 Uppuveli Beach"
        images={[
          {
            src: "https://www.trawell.in/admin/images/upload/685870490Uppuveli_Beach.jpg",
            alt: "Plage d'Uppuveli au coucher du soleil",
          },
        ]}
      />
    ),
    price: "Gratuit",
  },
  {
    day: "Day 9 — Samedi",
    city: "Trincomalee",
    time: "Journée",
    plan: (
      <HoverPreviewLink
        href="https://beachsearcher.fr/fr/beach/144201067/sandy-cove-beach"
        label="🐚 Sandy Cove Beach"
        images={[
          {
            src: "https://lh5.googleusercontent.com/p/AF1QipP_IK2nseJWdJnvB9q_r3DTaDRpSTsnoA8A3iNe=s1600",
            alt: "Sable fin de Sandy Cove Beach",
          },
        ]}
      />
    ),
    price: "Gratuit",
  },
  {
    day: "Day 9 — Samedi",
    city: "Trincomalee",
    time: "Journée",
    plan: (
      <HoverPreviewLink
        href="https://www.tripadvisor.fr/Attraction_Review-g424963-d19416250-Reviews-Dutch_Bay-Trincomalee_Eastern_Province.html"
        label="🦌 Dutch Bay"
        images={[
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiPzM4hEJghWqdMmdEd_huSj1a7rzogdUARQ&s",
            alt: "Plage de Dutch Bay",
          },
        ]}
      />
    ),
    price: "Gratuit",
  },
  {
    day: "Day 9 — Samedi",
    city: "Trincomalee → Colombo",
    time: "Soir",
    plan: routePlan(
      "🚐 Route en van (5 h, départ 19h)",
      "https://www.google.com/maps/dir/Trincomalee,+Sri+Lanka/Colombo,+Sri+Lanka/@7.7571598,79.8787404,9z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x3afbbcb6902dbe27:0x7de76a7a331b0fbb!2m2!1d81.2152121!2d8.5873638!1m5!1m1!1s0x3ae253d10f7a7003:0x320b2e4d32d3838d!2m2!1d79.861243!2d6.9270786!3e0?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
    ),
    price: "11,62 €",
  },
  { day: "Day 9 — Samedi", city: "Colombo", time: "4h05", plan: "🛫🛫🛫   Décollage  🛫🛫🛫", price: "325 €" },
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
    <div className="bg-[var(--background)] text-[var(--foreground)]">
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
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 70vw"
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="bg-[#214D34] py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 sm:px-10">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className={`${playfair.className} text-3xl font-semibold text-white sm:text-4xl`}>
              Dates de départ
            </h2>
            <div className="w-full max-w-xl rounded-[32px] border border-white/40 bg-white px-8 py-6 text-[#214D34] shadow-lg sm:px-12 sm:py-8">
              <p className={`${playfair.className} text-3xl font-semibold sm:text-4xl`}>
                Du 18 au 28 juin 2025
              </p>
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
          <div className="rounded-[36px] border border-[#214D34] bg-white">
            <div className="rounded-t-[36px] bg-[#214D34] px-8 py-8 text-center text-white sm:px-12">
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
                    className="relative overflow-visible rounded-[28px] border border-[#214D34]/30 bg-white"
                  >
                    <summary
                      className={`${playfair.className} flex cursor-pointer list-none items-center justify-between gap-3 border-b border-[#214D34]/20 bg-white px-5 py-4 text-left text-[#214D34]`}
                    >
                      <span className="text-lg font-semibold">{label}</span>
                      <span className="text-sm text-[#214D34]/80">{firstCity}</span>
                    </summary>
                    <div className="relative overflow-x-auto border-t border-[#214D34]/20">
                      <div className="min-w-[680px] text-sm text-slate-700">
                        <div className="grid grid-cols-[1.1fr_0.8fr_2fr_0.9fr] bg-slate-900 text-xs font-semibold uppercase tracking-[0.35em] text-white">
                          <div className="px-4 py-3">Ville</div>
                          <div className="px-4 py-3">Horaire</div>
                          <div className="px-4 py-3">Planning</div>
                          <div className="px-4 py-3">Prix (/pers)</div>
                        </div>
                        <div>
                          {entries.map((entry, entryIndex) => {
                            if (entry.note) {
                              return (
                                <div
                                  key={`note-${label}-${entryIndex}`}
                                  className="grid grid-cols-[1.1fr_0.8fr_2fr_0.9fr] bg-slate-100 px-4 py-3 text-slate-600"
                                >
                                  <div className="col-span-4 italic">{entry.plan}</div>
                                </div>
                              );
                            }

                            const city = entry.city && entry.city.trim() !== "" ? entry.city : "—";
                            const time = entry.time && entry.time.trim() !== "" ? entry.time : "—";
                            const price = entry.price && entry.price.trim() !== "" ? entry.price : "—";
                            const planContent =
                              typeof entry.plan === "string"
                                ? entry.plan.trim() !== "" ? entry.plan : "—"
                                : entry.plan;

                            return (
                              <div
                                key={`${label}-${entryIndex}`}
                                className={`grid grid-cols-[1.1fr_0.8fr_2fr_0.9fr] gap-0 px-4 py-3 ${
                                  entryIndex % 2 === 0 ? "bg-white" : "bg-slate-50"
                                }`}
                              >
                                <div className="pr-4 font-medium text-slate-800">{city}</div>
                                <div className="pr-4 text-slate-500">{time}</div>
                                <div className="relative pr-4 text-slate-700">{planContent}</div>
                                <div className="text-slate-900">{price}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
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
