import SupportSection from "@/components/layout/SupportSection";
import React from "react";

const FAQS = [
  {
    question: "How do I book a tutor?",
    answer:
      "You can book a tutor by browsing our 'Find Tutors' page, selecting a profile that matches your needs, and clicking the 'Book Now' button to schedule a session.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "If a session is cancelled 24 hours in advance, a full refund is processed. For last-minute cancellations, please refer to our terms of service.",
  },
  {
    question: "How can I become a verified tutor?",
    answer:
      "To become a verified tutor, you need to apply through the 'Become a Tutor' page and upload your educational certificates for our team to review.",
  },
  {
    question: "Are the sessions online or offline?",
    answer:
      "TutorHub supports both! You can filter tutors based on your preference for online video sessions or in-person home tutoring.",
  },
];

export default function SupportPage() {
  return <SupportSection FAQS={FAQS}></SupportSection>;
}
