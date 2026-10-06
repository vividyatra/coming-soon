import type { Booking, Customer, Enquiry } from "@/types/catalog";
import { site } from "./media";

/*
 * Demo customer data for the account area. Until authentication and the
 * backend exist, the /account pages render this sample customer.
 */

export const demoCustomer: Customer = {
  name: "Priya Mehta",
  email: "priya.mehta@example.com",
  phone: "+91 98100 12345",
  city: "New Delhi",
  memberSince: "March 2024",
  avatar: site("65.jpg", "Priya Mehta"),
  preferences: { styles: ["couple", "cultural", "luxury"], budget: "₹1,00,000 – ₹2,50,000", newsletter: true },
  savedPackages: ["kashmir-paradise-6-days", "switzerland-alpine-8-days", "kerala-backwaters-honeymoon-6-days"],
};

export const demoBookings: Booking[] = [
  {
    id: "VY-26-1048",
    packageSlug: "rajasthan-royal-heritage-7-days",
    status: "Confirmed",
    bookedOn: "12 Aug 2026",
    travelDate: "14 Nov 2026",
    returnDate: "20 Nov 2026",
    travellers: { adults: 2, children: 1 },
    amount: 98997,
    paid: 24750,
    travellerNames: ["Priya Mehta", "Rohan Mehta", "Aarav Mehta (8)"],
  },
  {
    id: "VY-26-1102",
    packageSlug: "kashmir-paradise-6-days",
    status: "Pending Payment",
    bookedOn: "20 Sep 2026",
    travelDate: "18 Apr 2027",
    returnDate: "23 Apr 2027",
    travellers: { adults: 2, children: 0 },
    amount: 59998,
    paid: 0,
    travellerNames: ["Priya Mehta", "Rohan Mehta"],
  },
  {
    id: "VY-25-0877",
    packageSlug: "kerala-backwaters-honeymoon-6-days",
    status: "Completed",
    bookedOn: "02 Oct 2025",
    travelDate: "12 Dec 2025",
    returnDate: "17 Dec 2025",
    travellers: { adults: 2, children: 0 },
    amount: 69998,
    paid: 69998,
    travellerNames: ["Priya Mehta", "Rohan Mehta"],
  },
  {
    id: "VY-25-0612",
    packageSlug: "golden-triangle-5-days",
    status: "Cancelled",
    bookedOn: "05 May 2025",
    travelDate: "20 Jun 2025",
    returnDate: "24 Jun 2025",
    travellers: { adults: 4, children: 0 },
    amount: 87996,
    paid: 0,
    travellerNames: ["Priya Mehta", "Rohan Mehta", "Anil Mehta", "Sunita Mehta"],
  },
];

export const demoEnquiries: Enquiry[] = [
  {
    id: "EQ-26-2231",
    destination: "Switzerland",
    status: "Quote Sent",
    createdOn: "24 Sep 2026",
    travelMonth: "June 2027",
    travellers: "2 adults",
    budget: "₹3,50,000 – ₹4,00,000",
    message: "Anniversary trip, would love the Glacier Express and a night in Zermatt.",
    followUps: [
      { date: "24 Sep 2026", by: "Sneha Iyer", note: "Enquiry received — shared a draft 8-day itinerary on WhatsApp." },
      { date: "26 Sep 2026", by: "Sneha Iyer", note: "Quote sent with 4★ hotels and Glacier Express first class." },
    ],
  },
  {
    id: "EQ-26-2190",
    destination: "Leh Ladakh",
    status: "In Discussion",
    createdOn: "18 Sep 2026",
    travelMonth: "July 2027",
    travellers: "4 adults",
    budget: "₹40,000 per person",
    message: "Friends’ trip, prefer a self-drive SUV and one night at Pangong.",
    followUps: [{ date: "19 Sep 2026", by: "Arjun Krishnan", note: "Call scheduled to discuss route and acclimatisation plan." }],
  },
  {
    id: "EQ-25-1544",
    destination: "Kerala",
    status: "Converted",
    createdOn: "28 Sep 2025",
    travelMonth: "December 2025",
    travellers: "2 adults",
    budget: "₹70,000",
    message: "Honeymoon with houseboat.",
    followUps: [{ date: "02 Oct 2025", by: "Sneha Iyer", note: "Converted to booking VY-25-0877." }],
  },
];
