
"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

import { motion, } from "framer-motion";
import { FaShieldAlt } from "react-icons/fa";
import { HeroData } from "@/types/template.type";
import { SectionTagline, Container } from "../layouts/layout";
import { AnimatedText } from "../common/AnimatedContent";
import styles from "./HeroSection.module.css";

const h = HeroData;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 45 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.85,
      delay,
      ease: EASE,
    },
  });

  return (
    <section
      id="home"
      className="relative isolate flex sm:min-h-[100vh] min-h-[80vh] items-center justify-center overflow-hidden border-b border-cyan-400/10 bg-[#020e24] py-14 font-poppins"
    >

      <HeroBackDesignPattern />

      {/* Hero content */}
      <Container>
        <div className="relative z-10 text-center pt-8">

          {/* Subtitle */}
          <motion.div {...reveal(0.1)}>
            <SectionTagline className={`inline-flex max-w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-cyan-400/80 bg-[#061c37]/80 px-2 py-3 shadow-[inset_0_0_18px_rgba(0,229,240,0.08)] sm:gap-3 sm:px-8 ${styles.tagline}`}>
              <FaShieldAlt className="shrink-0 text-xs text-cyan-400 sm:text-lg" />
              {h.subtitle.trim()}
            </SectionTagline>
          </motion.div>

          {/* Heading */}
          <motion.div {...reveal(0.25)}>
            <h1 className="mx-auto mt-10 max-w-5xl font-poppins text-[clamp(2.1rem,4.4vw,4.5rem)] font-semibold leading-[1.1] tracking-tight text-white">
              <span className="block"><AnimatedText>{h.title1}</AnimatedText></span>{" "}

              <span className="inline-block text-[#00e5f0]">
                <AnimatedText>{h.title2}</AnimatedText>
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            {...reveal(0.4)}
            className="mx-auto font-normal mt-10 max-w-4xl text-sm leading-7 text-slate-300 sm:text-lg sm:leading-8"
          >
            {h.description}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}


const HeroBackDesignPattern = () => {
  const reduceMotion = useReducedMotion();

  return <>
    {/* Background gradient */}
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,rgba(15,53,127,0.65)_0%,rgba(3,20,53,0.45)_45%,#020e24_100%)]" />

    {/* Vertical glowing lines */}
    <div className="pointer-events-none absolute inset-0 z-0 flex justify-between px-[3.2%]">
      {[0, 1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="relative h-full w-[2px] bg-cyan-400/15"
        >
          <motion.div
            className="absolute left-0 top-0 h-28 w-[2px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
            animate={
              reduceMotion
                ? undefined
                : { y: ["-150px", "900px"] }
            }
            transition={{
              duration: 7 + item,
              repeat: Infinity,
              ease: "linear",
              delay: item * 0.7,
            }}
          />
        </div>
      ))}
    </div>

    {/* Oversized circles sit outside the hero; only their glowing edges show. */}
    <div aria-hidden="true" className={styles.sidePatterns}>
      <div className={`${styles.arc} ${styles.leftArc}`} />
      <div className={`${styles.arc} ${styles.rightArc}`} />
      <div className={`${styles.edgeLine} ${styles.leftLine}`} />
      <div className={`${styles.edgeLine} ${styles.rightLine}`} />
    </div>

    {/* Left ambient glow */}
    <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-cyan-500/15 blur-[110px]" />

    {/* Right ambient glow */}
    <div className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-[110px]" />

  </>
}
