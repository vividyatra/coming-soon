import type { LegalPage } from "@/types/catalog";

/*
 * Legal pages. This is starter copy for design purposes only —
 * it must be reviewed by a legal professional before going live.
 */

const updated = "29 September 2026";

export const legalPages: LegalPage[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary: "How Vivid Yatra collects, uses and protects your personal information.",
    updated,
    sections: [
      { id: "information-we-collect", title: "Information we collect", body: ["We collect information you provide when you enquire, book or create an account, such as your name, phone number, email address, travel preferences and traveller details."], list: ["Contact details (name, email, phone)", "Travel details (dates, destinations, number of travellers)", "Identity documents required by hotels or authorities", "Payment information processed by our payment partners"] },
      { id: "how-we-use", title: "How we use your information", body: ["We use your information to plan and deliver your trip, communicate with you, process payments and improve our services."] },
      { id: "sharing", title: "Sharing with partners", body: ["We share only the details necessary with hotels, transport providers and guides to deliver your booked services. We never sell your personal data."] },
      { id: "security", title: "Data security", body: ["We use industry-standard safeguards, including encrypted connections and restricted access, to protect your information."] },
      { id: "your-rights", title: "Your rights", body: ["You can request access to, correction of or deletion of your personal data by writing to info@vividyatra.com."] },
      { id: "contact", title: "Contact us", body: ["For any privacy questions, contact our team at info@vividyatra.com or +91 98765 43210."] },
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    summary: "The terms that apply when you use our website and book travel with Vivid Yatra.",
    updated,
    sections: [
      { id: "scope", title: "Scope", body: ["These terms apply to all enquiries, quotations and bookings made with Vivid Yatra through our website, phone, email or WhatsApp."] },
      { id: "bookings", title: "Bookings and payments", body: ["A booking is confirmed only after we receive the advance payment and issue a written confirmation."], list: ["25% advance to confirm", "Balance payable 15 days before departure", "Prices are subject to availability until confirmed"] },
      { id: "travellers", title: "Traveller responsibilities", body: ["Travellers must carry valid ID and travel documents, follow local laws and respect the rules of hotels and monuments."] },
      { id: "changes", title: "Changes to itineraries", body: ["Itineraries may change due to weather, road conditions, strikes or government orders. We will always offer the closest suitable alternative."] },
      { id: "liability", title: "Limitation of liability", body: ["Vivid Yatra acts as an agent for hotels, transporters and other suppliers and is not liable for their acts or omissions beyond our reasonable control."] },
      { id: "law", title: "Governing law", body: ["These terms are governed by the laws of India, with jurisdiction in New Delhi."] },
    ],
  },
  {
    slug: "cancellation-policy",
    title: "Cancellation Policy",
    summary: "What happens if you need to cancel or change a confirmed booking.",
    updated,
    sections: [
      { id: "schedule", title: "Cancellation charges", body: ["Cancellation charges are calculated on the total package cost as follows:"], list: ["30 days or more before travel: 10% of package cost", "15–29 days before travel: 25% of package cost", "7–14 days before travel: 50% of package cost", "Less than 7 days or no-show: 100% of package cost"] },
      { id: "peak", title: "Peak season and special bookings", body: ["Bookings between 20 December and 5 January, festival periods and non-refundable hotel rates may carry higher charges, which will be shared at the time of booking."] },
      { id: "date-change", title: "Date changes", body: ["One free date change is allowed if requested at least 21 days before travel, subject to availability and any fare difference."] },
      { id: "how-to-cancel", title: "How to cancel", body: ["Email info@vividyatra.com or contact your trip manager with your booking ID. Cancellations are effective from the time we receive your written request."] },
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    summary: "How and when refunds are processed.",
    updated,
    sections: [
      { id: "eligibility", title: "Refund eligibility", body: ["Refunds are issued according to the cancellation schedule, after deducting applicable charges and any non-refundable supplier costs."] },
      { id: "timelines", title: "Refund timelines", body: ["Approved refunds are processed within 7–10 working days to the original mode of payment. Bank processing may take a few additional days."] },
      { id: "unused", title: "Unused services", body: ["No refund is given for services not used during the trip, such as meals, sightseeing or hotel nights cut short by the traveller."] },
      { id: "force-majeure", title: "Force majeure", body: ["If a trip is cancelled due to natural disasters, government restrictions or other events beyond our control, we will offer a credit note or refund after recovering amounts from suppliers."] },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    summary: "How we use cookies and similar technologies on vividyatra.com.",
    updated,
    sections: [
      { id: "what", title: "What are cookies?", body: ["Cookies are small text files stored on your device that help websites remember your preferences and understand how they are used."] },
      { id: "types", title: "Cookies we use", body: ["We use the following types of cookies:"], list: ["Essential cookies to keep you signed in and remember saved trip plans", "Analytics cookies to understand which pages are most useful", "Marketing cookies only with your consent"] },
      { id: "manage", title: "Managing cookies", body: ["You can control or delete cookies from your browser settings. Disabling essential cookies may affect some features of the website."] },
    ],
  },
];
