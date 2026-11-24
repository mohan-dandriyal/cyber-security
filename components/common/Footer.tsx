


"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

import Image from "next/image";
import {
  motion,
  type Variants,
} from "framer-motion";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import { FooterData } from "@/types/template.type";
import { Container } from "../layouts/layout";

const footer = FooterData;
const EASE = [0.22, 1, 0.36, 1] as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export default function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative isolate overflow-hidden font-poppins text-white"
      style={{
        background: "linear-gradient(103deg, #0a2041c9 21%, #0055c9c4)"
      }}>

      <Container>
        <div className="relative z-10 pt-16 lg:pt-20">
          <div
            className="grid grid-cols-1 gap-10 pb-14 md:grid-cols-3 md:gap-8 lg:gap-12"
          >
            {/* Brand */}
            <motion.div
              variants={itemVariants}
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? "visible" : undefined}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.15 }}
              className="md:pr-8"
            >
              <a href="#home" className="inline-block">
                <Image
                  src={footer.logo.src}
                  alt={footer.logo.alt}
                  width={2170}
                  height={725}
                  className="h-auto w-[152px] sm:w-[190px] lg:w-[190px]"
                />
              </a>

              <p className="mt-1 max-w-[390px] sm:text-[15px] text-sm leading-7 text-slate-100">
                {footer.description}
              </p>
            </motion.div>

            {/* Location */}
            <motion.div
              variants={itemVariants}
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? "visible" : undefined}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.15 }}
              className="border-white/40 md:border-l md:px-8 lg:px-12"
            >
              <div className="flex items-center gap-4">
                <h3 className="font-montserrat text-lg font-semibold sm:text-xl">
                  {footer.locationTitle}
                </h3>
              </div>

              <p className="mt-4 flex max-w-[360px] items-start gap-3 text-base leading-7 text-slate-100">
                <FaMapMarkerAlt aria-hidden="true" className="mt-1 shrink-0 text-lg text-[#00e5f0]" />
                <span>{footer.location}</span>
              </p>
            </motion.div>

            {/* Contact information */}
            <motion.div
              variants={itemVariants}
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? "visible" : undefined}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.15 }}
              className="border-white/40 md:border-l md:pl-8 lg:pl-12"
            >
              <h3 className="font-montserrat text-lg font-semibold sm:text-xl">
                {footer.contactTitle}
              </h3>

              <div className="mt-6 space-y-5">
                <a
                  href={`tel:${footer.phone.replace(/[^\d+]/g, "")}`}
                  className="group flex items-center gap-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00e5f0] text-xl text-white">
                    <FaPhoneAlt />
                  </span>

                  <span className="border-b border-white/40 pb-4 transition-colors group-hover:text-[#00e5f0] text-sm sm:text-base">
                    {footer.phone}
                  </span>
                </a>

                <a
                  href={`mailto:${footer.email}`}
                  className="group flex items-center gap-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00e5f0] text-xl text-white">
                    <FaEnvelope />
                  </span>

                  <span className="break-all text-sm sm:text-base transition-colors group-hover:text-[#00e5f0] ">
                    {footer.email}
                  </span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Bottom footer */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/50 py-6 lg:gap-5 lg:py-8 text-center lg:flex-row lg:text-left">
            <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 lg:gap-x-5">
              {footer.links.map((link, index) => (
                <div key={`${link.href}-${index}`} className="flex items-center gap-3 lg:gap-5">
                  {index > 0 && (
                    <span className="text-[#00e5f0]" aria-hidden="true">
                      |
                    </span>
                  )}

                  <a
                    href={link.href}
                    className="text-sm font-medium font-montserrat text-white transition-colors hover:text-[#00e5f0]"
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </nav>

            <p className="font-montserrat text-sm font-medium text-slate-100 lg:order-first">
              {footer.copyright}{" "}
              <span className=" text-[#00e5f0]">
                {footer.brandName}
              </span>
              . {footer.rights}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

