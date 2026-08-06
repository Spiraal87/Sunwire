"use client";

import Image from "next/image";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";

type Category = {
  name: string;
  description: string;
  image: string;
  alt: string;
};

const categories: Category[] = [
  {
    name: "Restaurants & Bars",
    description:
      "Reservations, to-go orders, private events — answered every time, even during the dinner rush.",
    image: "/images/restaurant-bars.png",
    alt: "Restaurants & Bars in Phoenix",
  },
  {
    name: "Home Services",
    description:
      "HVAC, plumbing, garage doors, auto services — never miss an emergency call again, day or night.",
    image: "/images/home-service.png",
    alt: "Home Services in Phoenix",
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
      className="overflow-hidden rounded-panel border border-line bg-gradient-panel shadow-surface transition-shadow duration-300 hover:shadow-forge"
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
          {categories.map((category, i) => (
            <CategoryCard
              key={category.name}
              category={category}
              index={i}
              distance={distance}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        <p className="mt-10 text-center font-body text-sm text-text-muted-dark">
          And more — if your business runs on phone calls and foot traffic, we should talk.
        </p>
      </div>
    </section>
  );
}
