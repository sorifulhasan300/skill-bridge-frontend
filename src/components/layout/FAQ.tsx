import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      question: "How do I book a session with a tutor?",
      answer:
        "Simply browse our tutor list, view their profile and available time slots, and click 'Book Now' to secure your session instantly.",
    },
    {
      question: "Are the tutors verified?",
      answer:
        "Yes, every tutor on our platform undergoes a strict background check and academic credential verification process.",
    },
    {
      question: "Can I reschedule or cancel a booking?",
      answer:
        "Yes, you can manage your bookings through your dashboard. Rescheduling is allowed up to 24 hours before the session starts.",
    },
    {
      question: "How do payments work?",
      answer:
        "Payments are handled securely through our platform. Tutors are paid only after the session is successfully completed.",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about our tutoring platform.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full border-t">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b px-2"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
