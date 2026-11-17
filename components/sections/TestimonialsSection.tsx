
"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatedNumber } from "../common/AnimatedContent";
import ClientAvatar from "../common/ClientAvatar";
import {
    AnimatePresence,
    motion, 
    type Variants,
} from "framer-motion";

import {
    FaRegCommentDots,
    FaStar,
    FaShieldAlt,
    FaCheck,
    FaQuoteLeft,
    FaArrowLeft,
    FaArrowRight,
} from "react-icons/fa";

import { TestimonialsData } from "@/types/template.type";
import { SectionTagline, SectionHighlight, SectionTitle, Container } from "../layouts/layout";

const content = TestimonialsData;

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 35,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.75,
            ease: EASE,
        },
    },
};

export default function TestimonialsSection() {
    const reduceMotion = useReducedMotion();

    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [paused, setPaused] = useState(false);

    const testimonials = content.items;
    const total = testimonials.length;
    const active = testimonials[activeIndex];

    const changeSlide = (step: number) => {
        if (total < 2) return;

        setDirection(step > 0 ? 1 : -1);
        setActiveIndex((prev) => (prev + step + total) % total);
    };

    // Auto slider
    useEffect(() => {
        if (paused || reduceMotion || total < 2) return;

        const interval = window.setInterval(() => {
            setDirection(1);
            setActiveIndex((prev) => (prev + 1) % total);
        }, 5500);

        return () => window.clearInterval(interval);
    }, [paused, reduceMotion, total]);

    return (
        <section
            id="testimonials"
            className="relative isolate overflow-hidden bg-[#00142c] py-14 font-poppins"
        >
            {/* Background glow */}
            {/* <div className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.025] blur-[120px]" /> */}

            <Container>
            <div className="relative z-10 mx-auto w-full">

                {/* Header */}
                <motion.div
                    variants={containerVariants}
                    initial={reduceMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="mb-14 flex flex-col justify-between gap-10 lg:flex-row lg:items-center"
                >
                    {/* Left heading */}
                    <div className="max-w-[950px]">
                        <motion.div variants={fadeUp}>
                            <SectionTagline className="inline-flex items-center gap-3 rounded-full border-2 border-[#00e5f0] bg-[#031a31] px-6 py-3">
                                <FaRegCommentDots className="text-xl text-[#00e5f0]" />
                                {content.subtitle}
                            </SectionTagline>
                        </motion.div>

                        <SectionTitle className="max-w-3xl">
                            {content.title1} {" "}
                            <SectionHighlight>
                                {content.title2}
                            </SectionHighlight>
                        </SectionTitle>
                    </div>

                    {/* Trusted businesses */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap items-center gap-4 sm:gap-6"
                    >
                        <div className="flex items-center pl-3">
                            {content.avatars.map((avatar, index) => (
                                <div
                                    key={`${avatar}-${index}`}
                                    className="-ml-3 h-14 w-14 overflow-hidden rounded-full border-2 border-[#00e5f0] bg-[#082844] sm:h-16 sm:w-16"
                                >
                                    <ClientAvatar
                                        src={avatar}
                                        name={content.items[index]?.name ?? `Client ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="h-14 w-[3px] bg-[#00e5f0]" />

                        <div>
                            <p className="text-sm sm:text-base text-slate-300">
                                {content.trustedText}
                            </p>
                            <p className="font-montserrat text-base font-bold text-[#00e5f0] sm:text-lg">
                                <AnimatedNumber value={content.trustedCount} />
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Rating and testimonial */}
                <div className="space-y-6 grid grid-cols-1 items-stretch gap-7 lg:grid-cols-[0.85fr_1.9fr] lg:gap-10">

                    {/* Rating card */}
                    <motion.div
                        initial={
                            reduceMotion
                                ? false
                                : { opacity: 0, x: -55 }
                        }
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.85, ease: EASE }}
                        className="flex min-h-[390px] flex-col items-center justify-center rounded-[30px] border-2 border-[#00e5f0] bg-gradient-to-br from-[#062b4c]/80 to-[#00142c] p-9 text-center"
                    >
                        <h3 className="font-montserrat text-[clamp(4rem,5vw,6rem)] font-bold leading-none text-white">
                            <AnimatedNumber value={content.rating.score} />
                        </h3>

                        {/* Stars */}
                        <div className="mt-5 flex justify-center gap-2 text-2xl text-[#00e5f0] sm:text-2xl">
                            {Array.from({
                                length: content.rating.totalStars,
                            }).map((_, index) => (
                                <motion.span
                                    key={index}
                                    initial={
                                        reduceMotion
                                            ? false
                                            : { opacity: 0, scale: 0 }
                                    }
                                    whileInView={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: index * 0.1 + 0.3,
                                        type: "spring",
                                        stiffness: 250,
                                    }}
                                >
                                    <FaStar />
                                </motion.span>
                            ))}
                        </div>

                        <p className="mt-3 text-sm text-slate-200 sm:text-base">
                            {content.rating.reviews}
                        </p>

                        <div className="my-8 h-px w-full max-w-[300px] bg-[#00e5f0]/60" />

                        {/* Satisfaction icon */}
                        <div className="relative flex items-center justify-center">
                            <div>
                                <Image
                                    src={content.rating.image}
                                    alt={content.rating.alt}
                                    width={80}
                                    height={80}
                                    className="h-auto w-50"
                                />
                            </div>
                        </div>

                        <p className="mt-5 max-w-[250px] font-montserrat text-xl font-semibold leading-snug text-white/90 sm:text-xl">
                            {content.rating.caption}
                        </p>
                    </motion.div>

                    {/* Testimonial slider */}
                    <motion.div
                        initial={
                            reduceMotion
                                ? false
                                : { opacity: 0, x: 55 }
                        }
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 0.85,
                            delay: 0.15,
                            ease: EASE,
                        }}
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                        onFocusCapture={() => setPaused(true)}
                        onBlurCapture={(event) => {
                            if (!event.currentTarget.contains(event.relatedTarget)) {
                                setPaused(false);
                            }
                        }}
                        className="relative flex min-h-[390px] flex-col justify-between rounded-[30px] border-2 border-[#00e5f0] bg-gradient-to-br from-[#00142c] to-[#00142c] p-7 sm:p-10 lg:p-12"
                    >
                        {/* Quote icon */}
                        <div className="absolute -top-7 left-8 bg-[#00142c] px-4 text-4xl text-[#00e5f0] sm:left-12 sm:text-5xl">
                            <FaQuoteLeft />
                        </div>

                        <div
                            className="relative flex flex-1 flex-col justify-between overflow-hidden pt-7"
                            aria-live="off"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={active.id}
                                    initial={
                                        reduceMotion
                                            ? { opacity: 0 }
                                            : {
                                                opacity: 0,
                                                x: direction * 45,
                                            }
                                    }
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    exit={
                                        reduceMotion
                                            ? { opacity: 0 }
                                            : {
                                                opacity: 0,
                                                x: direction * -45,
                                            }
                                    }
                                    transition={{
                                        duration: reduceMotion ? 0.1 : 0.45,
                                        ease: EASE,
                                    }}
                                    className="flex h-full flex-col justify-between gap-10"
                                >
                                    {/* Review */}
                                    <blockquote className="text-sm font-normal leading-[1.8] text-white sm:text-base lg:text-xl">
                                        “{active.review}”
                                    </blockquote>

                                    {/* Author and navigation */}
                                    <div className="flex flex-wrap items-end justify-between gap-6">
                                        <div className="flex items-center gap-5">
                                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-[#00e5f0] sm:h-14 sm:w-14">
                                                <ClientAvatar
                                                    key={active.image}
                                                    src={active.image}
                                                    name={active.name}
                                                />
                                            </div>

                                            <div>
                                                <h4 className="font-montserrat text-base font-semibold text-white sm:text-lg">
                                                    {active.name}
                                                </h4>
                                                <p className="mt-1 text-sm text-slate-300 sm:text-[15px]">
                                                    {active.designation}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Slider buttons */}
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => changeSlide(-1)}
                                                disabled={total < 2}
                                                aria-label="Previous testimonial"
                                                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-cyan-400/50 text-lg text-white transition-all hover:border-[#00e5f0] hover:bg-[#00e5f0] hover:text-[#001329] disabled:opacity-40 sm:h-14 sm:w-14"
                                            >
                                                <FaArrowLeft />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => changeSlide(1)}
                                                disabled={total < 2}
                                                aria-label="Next testimonial"
                                                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-cyan-400/50 text-lg text-white transition-all hover:border-[#00e5f0] hover:bg-[#00e5f0] hover:text-[#001329] disabled:opacity-40 sm:h-14 sm:w-14"
                                            >
                                                <FaArrowRight />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
            </Container>
        </section>
    );
}
