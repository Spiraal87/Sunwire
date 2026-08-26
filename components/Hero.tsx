"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { captureEvent } from "@/lib/analytics";
import { CTA_LABELS } from "@/lib/cta";

type HeroCta = {
  label: string;
  href: string;
  cta: string;
  placement: string;
};

const DEFAULT_HEADING = (
  <>
    Stop losing good customers to{" "}
    <span className="gradient-text">missed calls and weak follow-up.</span>
  </>
);

const DEFAULT_SUBHEAD =
  "Practical systems for local businesses that want to capture more customers, book more work, and run smoother.";

const DEFAULT_PRIMARY_CTA: HeroCta = {
  label: CTA_LABELS.assessment,
  href: "#contact",
  cta: "assessment_request",
  placement: "hero",
};

const DEFAULT_SECONDARY_CTA: HeroCta = {
  label: CTA_LABELS.aiDemo,
  href: "#demo",
  cta: "ai_receptionist_demo",
  placement: "hero",
};

function isInternalPath(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

function HeroCtaLink({
  cta,
  className,
}: {
  cta: HeroCta;
  className: string;
}) {
  const onClick = () => captureEvent("cta_clicked", { cta: cta.cta, placement: cta.placement });

  if (isInternalPath(cta.href)) {
    return (
      <Link href={cta.href} onClick={onClick} className={className}>
        {cta.label}
      </Link>
    );
  }

  return (
    <a href={cta.href} onClick={onClick} className={className}>
      {cta.label}
    </a>
  );
}

export default function Hero({
  eyebrow = "Systems for Local Businesses",
  heading = DEFAULT_HEADING,
  subhead = DEFAULT_SUBHEAD,
  primaryCta = DEFAULT_PRIMARY_CTA,
  secondaryCta = DEFAULT_SECONDARY_CTA,
  videoSrc = "/images/hero-video.mp4",
  posterSrc = "/images/hero-image3.png",
  mediaAlt = "Concentric forged metal rings around a glowing molten core, with circuit-like data lines radiating outward",
  mediaObjectPosition = "68% center",
  mobileSubhead,
  mobileCompact = false,
  hideSecondaryCtaOnMobile = false,
  mobileMediaFirst = false,
}: {
  eyebrow?: string;
  heading?: ReactNode;
  subhead?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  videoSrc?: string;
  posterSrc?: string;
  mediaAlt?: string;
  mediaObjectPosition?: string;
  mobileSubhead?: string;
  mobileCompact?: boolean;
  hideSecondaryCtaOnMobile?: boolean;
  mobileMediaFirst?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 16;

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" },
    },
  };

  const renderMedia = ({
    overlayClassName,
    priority = false,
  }: {
    overlayClassName?: string;
    priority?: boolean;
  }) => (
    <>
      {prefersReducedMotion ? (
        <Image
          src={posterSrc}
          alt={mediaAlt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover brightness-110"
          style={{ objectPosition: mediaObjectPosition }}
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          aria-label={mediaAlt}
          className="h-full w-full object-cover brightness-110"
          style={{ objectPosition: mediaObjectPosition }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      <div
        className={
          overlayClassName ??
          "absolute inset-0 bg-[linear-gradient(to_right,rgba(8,8,10,0.94)_0%,rgba(8,8,10,0.78)_28%,rgba(8,8,10,0.28)_52%,rgba(8,8,10,0.04)_75%,rgba(8,8,10,0.15)_100%)]"
        }
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_60%,rgba(8,8,10,0.3)_85%,rgba(8,8,10,0.8)_100%)]" />
    </>
  );

  const renderContent = ({ mobile = false }: { mobile?: boolean } = {}) => (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className={`flex items-center gap-3 ${mobileCompact ? "mb-4" : "mb-6"}`}>
        <span aria-hidden="true" className="h-px w-8 bg-text-muted/60" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
          {eyebrow}
        </span>
      </motion.div>

      <motion.h1
        variants={item}
        className={`max-w-3xl font-display font-semibold leading-tight tracking-tight ${
          mobileCompact && mobile
            ? "text-[2.75rem]"
            : mobileCompact
              ? "text-[2.75rem] sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight"
              : "text-4xl sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight"
        }`}
      >
        {heading}
      </motion.h1>

      <motion.p
        variants={item}
        className={`max-w-xl font-body text-text-muted sm:text-lg ${
          mobileCompact ? "mt-5 text-[15px] leading-relaxed" : "mt-6 text-base"
        }`}
      >
        {mobile ? (
          <span>{mobileSubhead ?? subhead}</span>
        ) : (
          <>
            <span className="sm:hidden">{mobileSubhead ?? subhead}</span>
            <span className="hidden sm:inline">{subhead}</span>
          </>
        )}
      </motion.p>

      <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
        <HeroCtaLink
          cta={primaryCta}
          className="w-full rounded-btn bg-gradient-accent px-6 py-3 text-center font-display text-sm font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110 sm:w-auto"
        />
        <HeroCtaLink
          cta={secondaryCta}
          className={`rounded-btn border border-text-secondary/50 bg-bg/70 px-6 py-3 text-center font-display text-sm font-semibold text-text-primary shadow-surface backdrop-blur-md transition-all duration-200 hover:scale-[1.02] hover:border-text-primary hover:bg-panel/80 ${
            hideSecondaryCtaOnMobile ? "hidden w-full sm:block sm:w-auto" : "w-full sm:w-auto"
          }`}
        />
      </motion.div>

      <motion.p
        variants={item}
        className={`font-body text-sm text-text-muted-dark ${mobileCompact ? "mt-3 sm:mt-4" : "mt-4"}`}
      >
        15 minutes. No pressure. We will figure out where the biggest leak is.
      </motion.p>
    </motion.div>
  );

  if (mobileMediaFirst) {
    return (
      <div data-energy-marker="hero-bottom">
        <section className="relative sm:hidden">
          <div className="relative h-[47vh] min-h-[340px] overflow-hidden">
            {renderMedia({
              priority: true,
              overlayClassName:
                "absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,8,10,0.16)_0%,rgba(8,8,10,0.08)_36%,rgba(8,8,10,0.24)_62%,rgba(8,8,10,0.78)_100%)]",
            })}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_60%,rgba(8,8,10,0.3)_85%,rgba(8,8,10,0.8)_100%)]" />
          </div>
          <div className="bg-panel-2-textured">
            <div className="mx-auto w-full max-w-6xl px-6 pb-10 pt-8">{renderContent({ mobile: true })}</div>
          </div>
        </section>

        <section className="relative hidden items-center sm:flex lg:min-h-[82vh]">
          <div className="absolute inset-0 -z-20 overflow-hidden">{renderMedia({ priority: true })}</div>
          <div
            className="absolute inset-x-0 -top-px bottom-[-2px] -z-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\"), linear-gradient(to bottom, rgba(8,8,10,0.4) 0%, rgba(8,8,10,0.08) 25%, rgba(8,8,10,0.12) 40%, rgba(8,8,10,0.28) 55%, rgba(8,8,10,0.48) 65%, rgba(8,8,10,0.68) 74%, rgba(8,8,10,0.84) 82%, rgba(8,8,10,0.94) 90%, rgba(8,8,10,1) 100%)",
            }}
          />
          <div className="absolute inset-0 -z-10 bg-bg/55 lg:hidden" />

          <div
            className={`mx-auto w-full max-w-6xl px-6 ${
              mobileCompact ? "pb-10 pt-24 sm:py-16" : "py-12 sm:py-16"
            } lg:py-32`}
          >
            {renderContent()}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 lg:flex"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted-dark">
              Scroll
            </span>
            <motion.svg
              width="16"
              height="9"
              viewBox="0 0 16 9"
              fill="none"
              animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <path
                d="M1 1L8 8L15 1"
                stroke="#E6A84B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
        </section>
      </div>
    );
  }

  return (
    <section data-energy-marker="hero-bottom" className="relative flex items-center lg:min-h-[82vh]">
      <div className="absolute inset-0 -z-20 overflow-hidden">{renderMedia({ priority: true })}</div>
      <div
        className="absolute inset-x-0 -top-px bottom-[-2px] -z-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\"), linear-gradient(to bottom, rgba(8,8,10,0.4) 0%, rgba(8,8,10,0.08) 25%, rgba(8,8,10,0.12) 40%, rgba(8,8,10,0.28) 55%, rgba(8,8,10,0.48) 65%, rgba(8,8,10,0.68) 74%, rgba(8,8,10,0.84) 82%, rgba(8,8,10,0.94) 90%, rgba(8,8,10,1) 100%)",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-bg/55 lg:hidden" />

      <div
        className={`mx-auto w-full max-w-6xl px-6 ${
          mobileCompact ? "pb-10 pt-24 sm:py-16" : "py-12 sm:py-16"
        } lg:py-32`}
      >
        {renderContent()}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 lg:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted-dark">
          Scroll
        </span>
        <motion.svg
          width="16"
          height="9"
          viewBox="0 0 16 9"
          fill="none"
          animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <path
            d="M1 1L8 8L15 1"
            stroke="#E6A84B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
