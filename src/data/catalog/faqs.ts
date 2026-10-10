import type { FaqGroup } from "@/types/catalog";
import { site } from "@/data/site";

/*
 * Knowledge base for /faq (the "general" group is also shown on /contact).
 * Answers are written as direct, self-contained 40–60 word replies.
 * Honesty rule: no invented prices, percentages, refund timelines or payment claims.
 */

const { phone, email, supportEmail, address, hours } = site.contact;

export const faqGroups: FaqGroup[] = [
  {
    slug: "general",
    title: "General Travel",
    icon: "globe",
    items: [
      {
        question: "What is Vivid Yatra?",
        answer: `${site.name} is a travel planning company run by ${site.legalName} from Solan, Himachal Pradesh. We plan customised holidays, tour packages, weekend getaways and corporate trips across India, handling the itinerary, stays, transport and experiences so you can simply enjoy the journey.`,
      },
      {
        question: "Where is Vivid Yatra based?",
        answer: `Our office is at ${address}. Being in Himachal means we know the hill routes and seasons well, but we plan domestic trips right across India, from Kashmir and Ladakh to Rajasthan, Kerala and Goa.`,
      },
      {
        question: "Do you only plan trips within India?",
        answer:
          "Our focus is domestic travel within India — from Himachal and the wider Himalaya to the deserts of Rajasthan, the backwaters of Kerala and the beaches of Goa. If you have a different idea in mind, just ask and we will tell you honestly whether we can help.",
      },
      {
        question: "Are your trips private or shared group tours?",
        answer:
          "Most trips we plan are private, built only for you and your companions. We also organise group tours for friends, families, clubs and companies, planned around the group’s dates and interests. Tell us your group size and we will suggest the format that works best for you.",
      },
    ],
  },
  {
    slug: "services",
    title: "Travel Services",
    icon: "suitcase",
    items: [
      {
        question: "What travel services does Vivid Yatra offer?",
        answer:
          "We offer travel planning, holiday packages, tour packages, domestic travel, customized tours, family holidays, honeymoon packages, group tours, weekend getaways, adventure travel, cultural travel, luxury travel and corporate travel, along with travel consultation, trip planning, vacation planning, and destination experiences such as shikara rides and desert camps.",
      },
      {
        question: "Can you customise a holiday or tour package?",
        answer:
          "Yes. Every package we share is a starting point. We can change the destinations, number of nights, hotel style, transport and activities to suit your dates, pace and budget. You receive a revised itinerary and written quote for each change until the plan feels right.",
      },
      {
        question: "Do you plan weekend getaways near Solan, Shimla and Chandigarh?",
        answer:
          "Yes. Short breaks are easy to plan from our base in Solan. Kasauli, Chail, Barog and Shimla are popular choices, and we can arrange the stay, a cab and a simple day plan so a two or three-day weekend feels relaxed rather than rushed.",
      },
      {
        question: "Do you organise corporate travel and team offsites?",
        answer:
          "Yes. We plan corporate travel such as team offsites, retreats, incentive trips and business travel within India. Share your group size, dates, budget and any meeting or activity needs, and we will propose venues, stays and transport in a single written quote for your approval.",
      },
      {
        question: "Do you plan honeymoon packages?",
        answer:
          "Yes. Our honeymoon packages are planned around what you both enjoy — snow in Manali, a houseboat in Kashmir, lake views in Udaipur or the Kerala backwaters. We focus on comfortable stays, a relaxed pace and a few special moments, all agreed with you in advance.",
      },
      {
        question: "What is the difference between a travel consultation and full trip planning?",
        answer:
          "A travel consultation is a conversation to help you decide where to go, when to travel and what to expect. Full trip planning goes further: we build the itinerary, suggest stays and transport, share a written quote and, once you confirm, arrange the bookings for you.",
      },
    ],
  },
  {
    slug: "booking",
    title: "Enquiries & Booking",
    icon: "calendar",
    items: [
      {
        question: "How do I book a trip with Vivid Yatra?",
        answer:
          "Start by sending an enquiry through our contact form, or call, email or WhatsApp us. We discuss your plans, share an itinerary and written quote, and refine it with you. Your booking is confirmed only after you accept the quote in writing and the agreed payment is received.",
      },
      {
        question: "How quickly will you respond to my enquiry?",
        answer: `We aim to reply to every enquiry within 24 hours, and usually sooner during our office hours of ${hours}. If your trip is urgent or very close to your travel date, calling or messaging us on WhatsApp is the quickest way to reach us.`,
      },
      {
        question: "How far in advance should I plan my trip?",
        answer:
          "The earlier the better, especially for peak seasons, long weekends and festival holidays, when good hotels and vehicles fill up quickly. A few weeks ahead is usually comfortable for domestic trips, while group tours and corporate travel need more lead time. We can still help at shorter notice.",
      },
      {
        question: "What details should I share when I enquire?",
        answer:
          "Tell us your preferred destinations or type of holiday, travel dates or month, number of travellers including children and their ages, departure city, budget range and the hotel style you like. Mention any special occasions, health needs or must-see places, and we will plan around them.",
      },
    ],
  },
  {
    slug: "planning",
    title: "Trip Planning",
    icon: "map",
    items: [
      {
        question: "What is usually included in a holiday package?",
        answer:
          "Inclusions depend on the trip you choose. A typical package may cover hotel stays, a private vehicle with driver, sightseeing as per the itinerary and selected meals or activities. Every quote lists exactly what is included and excluded, so you know what you are paying for before you confirm.",
      },
      {
        question: "Can you help with flights and train tickets?",
        answer:
          "If you need help with flights or trains, mention it in your enquiry and we will advise on the options. We are equally happy to plan the land arrangements around tickets you have already booked. Fares change quickly, so any ticket price is confirmed only at the time of booking.",
      },
      {
        question: "Can you plan trips for elderly travellers or families with young children?",
        answer:
          "Yes. For family holidays we plan a gentler pace, shorter driving days, comfortable vehicles and stays with suitable rooms and food options. Let us know about mobility needs, medical conditions or dietary requirements in advance so we can plan sensible routes and suggest suitable hotels.",
      },
      {
        question: "Can I make changes to my itinerary after confirming?",
        answer:
          "Often, yes. Contact us as soon as you know about a change and we will check availability with hotels and transport providers. Some changes may involve extra charges or supplier penalties; we will explain these clearly before anything is changed, so the decision stays with you.",
      },
    ],
  },
  {
    slug: "payment",
    title: "Payments",
    icon: "rupee",
    items: [
      {
        question: "How do I pay for my trip?",
        answer:
          "Once you accept your written quote, we share payment details or a secure payment link along with the amount due. The quote explains any advance required and when the balance is payable. Please pay only through the details we send you directly, and keep your payment receipts for reference.",
      },
      {
        question: "Will my quote include all taxes and charges?",
        answer:
          "Your quote clearly states what is included, including applicable taxes where relevant, and lists what is not included, such as personal expenses or optional activities. If anything is unclear, ask us before paying — we would rather explain upfront than have you face surprises during the trip.",
      },
      {
        question: "Can prices change after I receive a quote?",
        answer:
          "Quotes are based on availability and rates at the time they are prepared. Until your booking is confirmed and paid, hotel, transport or ticket prices may change. If that happens, we will tell you before you pay and share a revised written quote for your approval.",
      },
    ],
  },
  {
    slug: "cancellation",
    title: "Cancellations & Changes",
    icon: "receipt",
    items: [
      {
        question: "What is your cancellation policy?",
        answer:
          "Cancellation terms depend on the hotels, transport and other services in your trip, so they can differ from one booking to another. We share the applicable cancellation and refund terms in writing with each quote, so you can review them carefully before you confirm and make any payment.",
      },
      {
        question: "How do refunds work if I cancel?",
        answer:
          "If you cancel, any refund is worked out as per the cancellation terms in your written quote or confirmation, after charges levied by hotels, airlines or transport providers. We explain the calculation clearly and process any eligible refund as agreed with you in writing, keeping you updated along the way.",
      },
      {
        question: "What happens if weather or road closures affect my trip?",
        answer:
          "Mountain roads in Himachal, Ladakh and Kashmir can close because of snow, landslides or official restrictions. If that happens, we work with you to adjust the route, timings or stays wherever possible. Any extra costs or refunds depend on supplier policies and are discussed with you openly.",
      },
    ],
  },
  {
    slug: "destinations",
    title: "Destinations",
    icon: "pin",
    items: [
      {
        question: "When is the best time to visit Himachal Pradesh?",
        answer:
          "March to June is ideal for pleasant sightseeing in Shimla, Manali and Kasauli. December to February brings snow to higher areas, perfect for a winter holiday. During the monsoon, roughly July to September, hill roads can see landslides, so we plan flexible itineraries with buffer time.",
      },
      {
        question: "Do I need a permit for Ladakh, Spiti or other border areas?",
        answer:
          "Some protected and border areas in Ladakh and Himachal Pradesh may require permits, and the rules can differ for Indian and foreign nationals. Requirements change from time to time, so we check the current rules with you while planning and explain how to apply where a permit is needed.",
      },
      {
        question: "Which destinations in India suit a first family holiday?",
        answer:
          "Shimla, Manali, Kerala, Goa and Rajasthan work well for many families because they offer comfortable stays, varied sightseeing and manageable travel times. The right choice depends on your children’s ages, the season and how much travel you enjoy, so we suggest options after understanding your family.",
      },
      {
        question: "Is Ladakh suitable for everyone?",
        answer:
          "Ladakh is at high altitude, so it needs care. Most itineraries include rest days in Leh to acclimatise before going higher. Travellers with heart or breathing conditions, pregnant travellers and families with very young children should consult a doctor first. We plan a gradual route and share practical advice.",
      },
    ],
  },
  {
    slug: "support",
    title: "Contact & Support",
    icon: "headset",
    items: [
      {
        question: "How can I contact Vivid Yatra?",
        answer: `Call or WhatsApp us on ${phone}, email ${email} for new enquiries, or write to ${supportEmail} for help with an existing trip. You can also use the contact form on our website. Our office hours are ${hours}, and we aim to reply within 24 hours.`,
      },
      {
        question: "Can I visit your office in Solan?",
        answer:
          "Yes. You are welcome to visit our office on Rajgarh Road, Solan, to discuss your trip in person. We recommend calling or messaging before you come so the right person is available to sit with you, especially if you are planning a group tour or corporate trip.",
      },
      {
        question: "Who do I contact if I need help during my trip?",
        answer: `Before you travel, we share the contact details you need for your trip. If something comes up on the road, call or WhatsApp us on ${phone} or write to ${supportEmail}, and we will do our best to help you sort it out quickly.`,
      },
    ],
  },
];
