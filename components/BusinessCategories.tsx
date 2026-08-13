"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import { RefreshCw, ArrowLeft } from "lucide-react";
import { captureEvent } from "@/lib/analytics";

type Subcategory = { name: string; href?: string };

type Category = {
  name: string;
  description: string;
  image: string;
  alt: string;
  subcategories?: Subcategory[];
};

function hasSubcategories(category: Category): category is Category & { subcategories: Subcategory[] } {
  return Array.isArray(category.subcategories) && category.subcategories.length > 0;
}

const categories: Category[] = [
  {
    name: "Home Services",
    description:
      "HVAC, plumbing, electrical, garage doors, auto services — never miss an emergency call again, day or night.",
    image: "/images/home-service.png",
    alt: "Home Services in Phoenix",
    subcategories: [
      { name: "HVAC", href: "/hvac" },
      { name: "Plumbing" },
      { name: "Electrical" },
      { name: "Garage Doors" },
      { name: "Auto Services / Auto Repair" },
    ],
  },
  {
    name: "Restaurants & Bars",
    description:
      "Reservations, to-go orders, private events — answered every time, even during the dinner rush.",
    image: "/images/restaurant-bars.png",
    alt: "Restaurants & Bars in Phoenix",
  },
  {
    name: "Salons & Spas",
    description: "Appointment booking that doesn't stop just because your hands are full.",
    image: "/images/spa.png",
    alt: "Salons & Spas in Phoenix",
  },
  {
    name: "Fitness & Wellness Studios",
    description: "Class bookings and membership questions, answered instantly, any hour.",
    image: "/images/gym.png",
    alt: "Fitness & Wellness Studios in Phoenix",
  },
  {
    name: "Retail & Specialty Shops",
    description:
      "Product questions, availability, custom orders — covered while you're on the floor with a customer.",
    image: "/images/retail-specialty.png",
    alt: "Retail & Specialty Shops in Phoenix",
  },
  {
    name: "Dental & Medical Practices",
    description:
      "New patient calls and scheduling, handled the moment the phone rings, not after the third ring goes to voicemail.",
    image: "/images/dental.png",
    alt: "Dental & Medical Practices in Phoenix",
  },
];

function CategoryCard({
  category,
  index,
  distance,
  prefersReducedMotion,
}: {
  category: Category;
  index: number;
  distance: number;
  prefersReducedMotion: boolean | null;
}) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 22 };
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-4, 4]), springConfig);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.6,
        ease: "easeOut",
        delay: index * 0.1,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="overflow-hidden rounded-panel border border-line bg-gradient-panel shadow-surface transition-[border-color,box-shadow] duration-300 hover:border-gold/60 hover:shadow-forge"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-panel-2-textured">
        <Image
          src={category.image}
          alt={category.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg font-bold text-text-primary sm:text-xl">
          {category.name}
        </h3>
        <p className="mt-2 font-body text-sm text-text-muted">{category.description}</p>
      </div>
    </motion.div>
  );
}

// Home Services spans several trades but only HVAC has its own landing page
// today, so linking the whole tile straight to /hvac would mislead a
// plumber or electrician who clicks it. Click/tap flips the card to show
// which trade is which — same interaction on desktop and touch, since hover
// doesn't exist on mobile. Kept separate from CategoryCard so pointer tilt
// can live on an outer wrapper while the inner card handles the 180deg flip.
function FlippableCategoryCard({
  category,
  index,
  distance,
  prefersReducedMotion,
}: {
  category: Category & { subcategories: Subcategory[] };
  index: number;
  distance: number;
  prefersReducedMotion: boolean | null;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 22 };
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-4, 4]), springConfig);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  function handleFlip() {
    const opening = !isFlipped;
    setIsFlipped(opening);
    if (opening) {
      captureEvent("home_services_card_flipped", { placement: "business_categories" });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.6,
        ease: "easeOut",
        delay: index * 0.1,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
    >
      <motion.div
        className="grid"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: "easeInOut" }}
      >
        <button
          type="button"
          onClick={handleFlip}
          aria-expanded={isFlipped}
          aria-label={`${category.name} — tap to see the trades we cover`}
          tabIndex={isFlipped ? -1 : 0}
          style={{ backfaceVisibility: "hidden" }}
          className="col-start-1 row-start-1 block w-full cursor-pointer appearance-none overflow-hidden rounded-panel border border-line bg-gradient-panel p-0 text-left shadow-surface transition-colors duration-300 hover:border-gold/60 hover:shadow-forge focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-panel-2-textured">
            <Image
              src={category.image}
              alt={category.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent" />
            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-bg/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-gold backdrop-blur-sm"
            >
              <RefreshCw size={11} /> Tap to see trades
            </span>
          </div>
          <div className="p-6">
            <h3 className="font-display text-lg font-bold text-text-primary sm:text-xl">
              {category.name}
            </h3>
            <p className="mt-2 font-body text-sm text-text-muted">{category.description}</p>
          </div>
        </button>

        <div
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          className="col-start-1 row-start-1 flex h-full flex-col justify-center overflow-hidden rounded-panel border border-line bg-gradient-panel p-6 shadow-surface"
        >
          <button
            type="button"
            onClick={handleFlip}
            aria-expanded={isFlipped}
            aria-label={`Back to ${category.name} overview`}
            tabIndex={isFlipped ? 0 : -1}
            className="mb-4 inline-flex w-fit items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-text-muted transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <ArrowLeft size={13} /> Back
          </button>
          <h3 className="font-display text-lg font-bold text-text-primary sm:text-xl">
            {category.name}
          </h3>
          <p className="mt-1 font-body text-xs text-text-muted">Which trade are you in?</p>
          <ul className="mt-4 space-y-2.5">
            {category.subcategories.map((sub) =>
              sub.href ? (
                <li key={sub.name}>
                  <Link
                    href={sub.href}
                    tabIndex={isFlipped ? 0 : -1}
                    onClick={() =>
                      captureEvent("cta_clicked", {
                        cta: "hvac_category_tile",
                        placement: "business_categories",
                      })
                    }
                    className="flex items-center justify-between gap-2 rounded-btn border border-gold/40 bg-gold/5 px-3 py-2 font-body text-sm font-semibold text-text-primary transition-colors hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    {sub.name} <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ) : (
                <li key={sub.name} className="px-3 py-2 font-body text-sm text-text-muted-dark">
                  {sub.name}
                </li>
              )
            )}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function BusinessCategories() {
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
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
            Who we work with
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
            Built for Local Business
          </h2>
          <p className="mt-3 font-body text-text-muted">
            Whatever you run, if the phone rings and the site matters, this is for you.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) =>
            hasSubcategories(category) ? (
              <FlippableCategoryCard
                key={category.name}
                category={category}
                index={i}
                distance={distance}
                prefersReducedMotion={prefersReducedMotion}
              />
            ) : (
              <CategoryCard
                key={category.name}
                category={category}
                index={i}
                distance={distance}
                prefersReducedMotion={prefersReducedMotion}
              />
            )
          )}
        </div>

        <p className="mt-10 text-center font-body text-sm text-text-muted-dark">
          And more — if your business runs on phone calls and foot traffic, we should talk.
        </p>
      </div>
    </section>
  );
}
