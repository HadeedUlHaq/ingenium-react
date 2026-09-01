/**
 * Plain data module, deliberately outside the "use client" FAQ component:
 * exports from a client module become client references, so the server
 * component building the FAQPage JSON-LD would receive a proxy, not the array.
 */
export const FAQS = [
  {
    q: "Are all of your ingredients Halal?",
    a: "Yes, 100% of our beef, buns, sauces, and cooking supplies are strictly Halal-certified.",
  },
  {
    q: "What do you require from the venue on event day?",
    a: "We are largely self-contained. We just require an outdoor flat ground space (minimum 3m x 3m) for our setup and vehicle access for loading.",
  },
  {
    q: "How fast can you serve a large crowd?",
    a: "Using our dual-griddle setup and structured assembly line, we maintain a baseline output of 60 to 80 freshly smashed burgers per hour per line to keep queue times short.",
  },
  {
    q: "How do payment and booking deposits work?",
    a: "Once we confirm availability for your date, we issue an official invoice with clear payment details via bank transfer.",
  },
] as const;
