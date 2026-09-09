"use client";

import { motion } from "framer-motion";
import { useMotionPreference as useReducedMotion } from "@/lib/useMotionPreference";
import { MessageSquare, Clock, RotateCw, Star } from "lucide-react";

const items = [
  {
    title: "Texts back instantly",
    description:
      "Someone hangs up before you answer? They get a text within seconds instead of calling your competitor next.",
  },
  {
    title: "Reminds before appointments",
    description:
      "Automatic reminders cut down no-shows without anyone having to remember to send them.",
  },
  {
    title: "Re-engages cold leads",
    description: "A quote that's gone quiet for a week gets a follow-up on its own.",
  },
  {
    title: "Asks for the review",
    description:
      "After the job's done, a quick text asks for the Google review while it's still fresh.",
  },
];

const icons = [MessageSquare, Clock, RotateCw, Star];

export default function BeyondTheCall() {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;

  return (
    <section className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: distance }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-[color:var(--steel-blue)]">
            Beyond the call
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
            It doesn't stop when the call ends.
          </h2>
          <p className="mt-3 font-body text-text-muted">
            Most answering services stop at "we picked up." This keeps working after.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const IconComponent = icons[index];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: distance }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: prefersReducedMotion ? 0.2 : 0.6,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                className="flex flex-col items-start"
              >
                <div className="mb-4">
                  <IconComponent size={40} className="text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 font-body text-sm text-text-muted">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
