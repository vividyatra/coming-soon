import type { LegalPage } from "@/types/catalog";
import { site } from "@/data/site";

/*
 * Privacy Policy and Terms & Conditions.
 * Written in plain language for Vivid Yatra; have a qualified lawyer review
 * both documents (including the Solan jurisdiction clause) before relying on them.
 */

const updated = "9 October 2026";
const { address, email, supportEmail, phone, website } = site.contact;
const company = `${site.legalName} (“Vivid Yatra”, “we”, “us” or “our”)`;

export const legalPages: LegalPage[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary: `How ${site.legalName} collects, uses, shares and protects your personal data when you use our website or plan a trip with us.`,
    description:
      "Read how Vivid Yatra Private Limited collects, uses, shares and protects your personal data, and how to exercise your rights under India’s DPDP Act, 2023.",
    updated,
    sections: [
      {
        id: "who-we-are",
        title: "Who we are",
        body: [
          `This Privacy Policy explains how ${company} handles personal data. We are a travel planning company with our office at ${address}, and we operate the website ${website}.`,
          "By using our website or sharing your details with us, you acknowledge that your personal data will be handled as described in this policy.",
        ],
      },
      {
        id: "information-we-collect",
        title: "Information we collect",
        body: ["We collect only the information you choose to share with us, and the limited technical information needed to run our website."],
        list: [
          "Contact details such as your name, phone number and email address, shared through our contact form, by phone, by email or on WhatsApp",
          "Enquiry and trip details such as destinations, travel dates, number of travellers, budget, preferences and any message you send us",
          "Traveller details needed to make bookings, such as names, ages and, where hotels, transport providers or authorities require it, identity document details",
          "Information you choose to share about health, mobility or dietary needs, so that we can plan your trip suitably",
          "Payment records such as amounts paid and transaction references (our website itself does not collect card or bank details)",
          "Basic technical data such as browser type, device information and pages visited, collected through cookies or similar technologies",
        ],
      },
      {
        id: "how-we-use",
        title: "How we use your information",
        body: ["We use your personal data only for purposes connected with your enquiry or trip, or where the law requires it, including to:"],
        list: [
          "Respond to your enquiry and provide travel consultation",
          "Plan itineraries and prepare quotes",
          "Make, manage and confirm bookings with hotels, transport providers and other suppliers",
          "Contact you by phone, email or WhatsApp about your enquiry or trip",
          "Process payments and keep the records we are required to maintain by law",
          "Improve our website and services",
          "Send occasional travel ideas and updates, only if you have opted in",
        ],
      },
      {
        id: "consent",
        title: "Consent and legal basis",
        body: [
          "We process personal data in line with applicable Indian law, including the Digital Personal Data Protection Act, 2023 and the rules made under it as they come into force.",
          "In most cases we rely on the consent you give when you contact us or share your details, or on other lawful uses permitted by law, such as completing a booking you have asked us to make. Marketing messages are sent only if you tick the opt-in box on our contact form or otherwise agree, and you may withdraw your consent at any time.",
        ],
      },
      {
        id: "sharing",
        title: "Sharing your information",
        body: [
          "We share personal data only to the extent needed to plan and deliver your trip, or when the law requires it. We do not sell your personal data. The people and organisations we may share it with include:",
        ],
        list: [
          "Hotels, homestays and other accommodation providers",
          "Transport providers and drivers, airlines, railways and bus operators",
          "Guides, activity operators and other service providers included in your itinerary",
          "Payment service providers, where you choose to pay online",
          "Government authorities, where permits are required or where the law requires us to share information",
        ],
      },
      {
        id: "cookies",
        title: "Cookies and analytics",
        body: [
          "Our website uses essential cookies and similar technologies that it needs to work properly and securely.",
          "We may also use analytics tools to understand, in aggregate, how visitors use our website so that we can improve it. These tools may set their own cookies. You can block or delete cookies through your browser settings, although some parts of the website may then not work as expected.",
        ],
      },
      {
        id: "retention",
        title: "How long we keep your data",
        body: [
          "We keep personal data only for as long as it is needed for the purposes described in this policy — for example, to complete your trip, respond to follow-up questions, and meet legal, tax and accounting requirements. When it is no longer needed, we delete it or anonymise it.",
        ],
      },
      {
        id: "security",
        title: "How we protect your data",
        body: [
          "We use reasonable technical and organisational measures to protect personal data against unauthorised access, loss or misuse, and we limit access to the people who need it to help with your trip.",
          "No method of sending or storing data over the internet is completely secure, so we cannot guarantee absolute security. Please do not send identity documents or other sensitive information unless we ask for it for a booking.",
        ],
      },
      {
        id: "your-rights",
        title: "Your rights",
        body: ["Subject to applicable law, you have the right to:"],
        list: [
          "Access a summary of the personal data we hold about you and how we use it",
          "Ask us to correct, complete or update inaccurate or incomplete personal data",
          "Ask us to erase personal data that is no longer needed, unless we must keep it by law",
          "Withdraw your consent at any time, including for marketing messages (this does not affect processing already carried out)",
          "Have your grievances about the handling of your personal data addressed by us, and escalate them to the Data Protection Board of India where the law allows",
          "Nominate another person to exercise these rights on your behalf in the event of death or incapacity, as permitted by law",
        ],
      },
      {
        id: "grievances",
        title: "Grievances and contact",
        body: [
          `To use any of your rights or raise a concern about your personal data, write to ${email} or ${supportEmail}, or call ${phone}. You can also write to us at ${site.legalName}, ${address}.`,
          "Please mention “Privacy request” in your message. We will acknowledge your request and respond within the time required by applicable law.",
        ],
      },
      {
        id: "children",
        title: "Children’s data",
        body: [
          "Our website is not meant to be used by children on their own. When a trip includes children, we collect their details only from a parent or lawful guardian, and only what is needed for bookings and safety. If you believe a child has shared personal data with us without such consent, please contact us and we will delete it.",
        ],
      },
      {
        id: "changes",
        title: "Changes to this policy",
        body: [
          "We may update this Privacy Policy from time to time to reflect changes in our services or in the law. The latest version will always be available on this page, with the “Last updated” date shown at the top.",
        ],
      },
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    summary: `The terms that apply when you use our website or plan and book travel with ${site.legalName}.`,
    description:
      "Terms & Conditions for enquiries, quotes, bookings, payments, cancellations and travel services from Vivid Yatra Private Limited, Solan, Himachal Pradesh.",
    updated,
    sections: [
      {
        id: "scope",
        title: "About these terms",
        body: [
          `These Terms & Conditions apply to your use of the ${website} website and to any travel services you enquire about or book with ${company}, whose office is at ${address}.`,
          "By using our website or confirming a booking with us, you agree to these terms. Any specific terms in your written quote or booking confirmation also apply; if they differ from these terms, the written quote or confirmation will prevail for that booking.",
        ],
      },
      {
        id: "enquiries",
        title: "Enquiries and quotes",
        body: [
          "Sending an enquiry, asking for a travel consultation or receiving a draft itinerary does not create a booking. Quotes are prepared from the information you give us and from supplier rates and availability at that time.",
          "A quote is valid only for the period stated on it. Until a booking is confirmed, prices and availability may change, and we will tell you if they do.",
        ],
      },
      {
        id: "bookings",
        title: "Booking confirmation",
        body: [
          "A booking is confirmed only after you have accepted our written quote and we have received the payment requested, after which we will send you a written booking confirmation.",
          "Please check all names, dates and details in your confirmation and tell us straight away if anything is wrong. You are responsible for making sure the information you give us about every traveller in your group is accurate.",
        ],
      },
      {
        id: "payments",
        title: "Payments and pricing",
        body: [
          "Payment amounts, due dates and any advance required are set out in your quote or confirmation. Payments are made using the payment details or secure payment link that we share with you directly. Please do not pay into any other account that claims to be Vivid Yatra, and contact us if you are unsure.",
          "Prices are quoted in Indian Rupees and cover only the services and taxes listed in your quote. Anything not listed — such as personal expenses, optional activities, entry fees, tips or extra meals — is not included. If taxes or supplier charges change before your booking is fully paid, we will explain any resulting change to the price before you pay it.",
        ],
      },
      {
        id: "cancellations",
        title: "Cancellations and refunds",
        body: [
          "Cancellation and refund terms depend on the hotels, transport and other services included in your trip. The terms that apply to your booking are shared in writing with your quote and confirmation, and the cancellation policies of the suppliers concerned also apply.",
          "If you need to cancel, please tell us in writing as early as possible. Any refund will be calculated as per those written terms, after charges levied by suppliers such as hotels, airlines and transport operators, and processed as agreed with you in writing.",
          "If we need to cancel or significantly change a confirmed booking, we will tell you promptly and discuss the available alternatives or refund with you.",
        ],
      },
      {
        id: "travellers",
        title: "Traveller responsibilities",
        body: ["Every traveller is responsible for:"],
        list: [
          "Carrying valid government-issued photo ID and any documents required by hotels, airlines or authorities",
          "Obtaining any permits needed for restricted or protected areas, such as parts of Himachal Pradesh and Ladakh — we can guide you on the process, but the decision to issue a permit rests with the authorities",
          "Making sure they are fit to travel, especially for high-altitude or adventure trips, and consulting a doctor where needed",
          "Telling us in advance about any medical conditions, mobility needs or dietary requirements",
          "Following local laws and customs and the reasonable instructions of drivers, guides and hotel staff",
          "Looking after their own belongings, cash and documents during the trip",
        ],
      },
      {
        id: "changes",
        title: "Itinerary changes and force majeure",
        body: [
          "Travel, especially in the mountains, can be affected by weather, landslides, snowfall, road closures, strikes, government orders, health emergencies and other events beyond our control. In such cases, timings, routes, stays or activities may need to change, and we will try to arrange reasonable alternatives.",
          "We are not responsible for delays, changes or cancellations caused by such events. Additional costs arising from them, such as extra hotel nights or transport, are payable by the traveller, and any refunds depend on the policies of the suppliers concerned.",
        ],
      },
      {
        id: "suppliers",
        title: "Third-party suppliers and liability",
        body: [
          "Hotels, transport operators, airlines, guides and activity providers are independent businesses whose services are subject to their own terms and policies. We arrange these services with care, but we do not own or control them.",
          "To the extent permitted by law, we are not liable for any loss, injury, damage, delay or expense caused by the acts or omissions of third-party suppliers, by travellers themselves or by events beyond our control. Where we are found liable, our liability is limited to the amount you paid us for the specific service concerned. Nothing in these terms limits any liability that cannot be limited under Indian law.",
        ],
      },
      {
        id: "insurance",
        title: "Travel insurance",
        body: [
          "We strongly recommend that every traveller takes suitable travel insurance covering medical emergencies, evacuation, trip cancellation and loss of belongings — particularly for adventure and high-altitude travel. Travel insurance is not included unless your quote says so.",
        ],
      },
      {
        id: "website",
        title: "Website content and intellectual property",
        body: [
          "The text, design, logos and other content on this website belong to Vivid Yatra or are used under licence. You may view and share our pages for personal, non-commercial use, but you may not copy, reproduce or republish our content for commercial purposes without our written permission.",
          "We try to keep the information on this website accurate and up to date, but it is general guidance only. Destination details, seasons and suggested itineraries can change, and the details in your written quote and confirmation always take priority.",
        ],
      },
      {
        id: "law",
        title: "Governing law and jurisdiction",
        body: [
          "These terms are governed by the laws of India. Any dispute arising from them, or from services booked with us, is subject to the exclusive jurisdiction of the courts at Solan, Himachal Pradesh. We would always prefer to resolve concerns directly, so please contact us first.",
        ],
      },
      {
        id: "contact",
        title: "Contact us",
        body: [`If you have any questions about these terms, contact ${site.legalName} at ${email} or ${supportEmail}, call ${phone}, or write to us at ${address}.`],
      },
    ],
  },
];
