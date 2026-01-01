import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, absolutely! You can cancel your subscription at any time from your account settings. If you cancel, you'll continue to have access until the end of your current billing period. No questions asked, no hidden fees.",
  },
  {
    question: "Do I get certificates with the free plan?",
    answer:
      "Certificates of completion are available with the Pro and Teams plans. With the free plan, you can still take courses and track your progress, but you won't receive official certificates.",
  },
  {
    question: "Is there a free trial for Pro?",
    answer:
      "We offer a 7-day free trial for the Pro plan. You can explore all Pro features without any commitment. If you decide it's not for you, simply cancel before the trial ends.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect at the start of your next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Teams plans. All payments are processed securely through Stripe.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied for any reason, contact our support team within 30 days of purchase for a full refund.",
  },
  {
    question: "How does team billing work?",
    answer:
      "With the Teams plan, you're billed per user per month. You can add or remove team members at any time, and your bill will be prorated accordingly. We also offer volume discounts for larger teams.",
  },
  {
    question: "Can I use the courses for commercial purposes?",
    answer:
      "Courses are licensed for personal learning and skill development. If you want to use course content for commercial purposes or team training, please contact us about our enterprise licensing options.",
  },
];

const PricingFAQ = () => {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-lg section-padding">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-2xl px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5 [&[data-state=open]>svg]:rotate-180">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;
