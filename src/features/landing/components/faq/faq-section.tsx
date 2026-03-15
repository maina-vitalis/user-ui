import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "../shared/section-header";
import { faqs } from "../../constants";

export function FaqSection() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about getting started and growing your business with us."
        />
        <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card px-6 py-2 shadow-lg">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}