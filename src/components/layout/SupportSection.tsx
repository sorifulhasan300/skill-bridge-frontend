import React from "react";
import {
  Search,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Faqs } from "@/types/faqs.type";

export default function SupportSection({ FAQS }: { FAQS: Faqs[] }) {
  return (
    <div className="min-h-screen bg-background">
      {/* 1. Hero Section with Search */}
      <section className="bg-muted/30 py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            How can we help you?
          </h1>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Search our help center or choose a category below to find the
            answers you need.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for articles (e.g. payment, booking...)"
              className="pl-10 h-12 rounded-full border-primary/20 shadow-sm"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 2. FAQ Section (Left Side) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-xl px-4"
                >
                  <AccordionTrigger className="hover:no-underline font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Button variant="link" className="mt-6 p-0 h-auto text-primary">
              View all help articles <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {/* 3. Contact Methods (Right Side) */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>

            {/* Live Chat */}
            <div className="p-6 rounded-2xl border bg-card hover:shadow-md transition-shadow">
              <MessageCircle className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-bold mb-1">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Chat with our support team in real-time.
              </p>
              <Button className="w-full">Start Chat</Button>
            </div>

            {/* Email Support */}
            <div className="p-6 rounded-2xl border bg-card hover:shadow-md transition-shadow">
              <Mail className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-bold mb-1">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Send us your query and we&apos;ll reply within 24h.
              </p>
              <Button variant="outline" className="w-full">
                support@tutorhub.com
              </Button>
            </div>

            {/* Documentation */}
            <div className="p-6 rounded-2xl border bg-muted/30">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-bold">Need Docs?</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Check our detailed guides for students and tutors.
              </p>
              <Link
                href="/docs"
                className="text-sm text-primary hover:underline font-medium"
              >
                Read Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
