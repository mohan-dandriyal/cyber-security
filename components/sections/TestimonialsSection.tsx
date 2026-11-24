
"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

import { useState } from "react";
import Image from "next/image";
import { AnimatedNumber } from "../common/AnimatedContent";
import ClientAvatar from "../common/ClientAvatar";
import {
    AnimatePresence,
    motion,
    useIsPresent,
    type Variants,
} from "framer-motion";

import {
    FaRegCommentDots,
    FaStar,
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

const slideVariants: Variants = {
    enter: (direction: number) => ({ x: direction * 108 + "%" }),
    active: { x: "0%" },
    exit: (direction: number) => ({ x: direction * -108 + "%" }),
};

const reviewVariants: Variants = {
    enter: { opacity: 0, y: 7 },
    active: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.08, ease: EASE } },
};

const authorVariants: Variants = {
    enter: { opacity: 0, y: 5 },
    active: { opacity: 1, y: 0, transition: { duration: 0.28, delay: 0.15, ease: EASE } },
};

function TestimonialContent({ testimonial, sizing = false, animateText = false }: {
    testimonial: (typeof content.items)[number];
    sizing?: boolean;
    animateText?: boolean;
}) {
    const isPresent = useIsPresent();

    return (
        <div aria-hidden={sizing || !isPresent} className="flex h-full flex-col justify-between gap-4">
            {/* Review */}
            <motion.blockquote
                variants={animateText ? reviewVariants : undefined}
                className="text-sm leading-relaxed text-white sm:text-base lg:text-lg"
            >
                &ldquo;{testimonial.review}&rdquo;
            </motion.blockquote>

            {/* Author */}
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-[#00e5f0] sm:h-14 sm:w-14">
                    {!sizing && <ClientAvatar src={testimonial.image} name={testimonial.name} />}
                </div>

                <motion.div variants={animateText ? authorVariants : undefined}>
                    <h4 className="font-montserrat text-base font-semibold text-white sm:text-lg">
                        {testimonial.name}
                    </h4>
                    <p className="mt-1 text-sm text-slate-300 sm:text-[15px]">
                        {testimonial.designation}
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

export default function TestimonialsSection() {
    const reduceMotion = useReducedMotion();

    const [{ index, direction }, setSlide] = useState({ index: 0, direction: 1 });
    const testimonials = content.items;
    const total = testimonials.length;
    const active = testimonials[index];
    const offsetDirection = reduceMotion ? 0 : direction;

    const changeSlide = (step: number) => {
        setSlide((current) => ({
            index: (current.index + step + total) % total,
            direction: step,
        }));
    };

    return (
        <section
            id="testimonials"
            className="relative isolate overflow-hidden bg-[#00142c] py-14 font-poppins"
        >
            <Container>
            <div className="relative z-10 mx-auto w-full">

                {/* Header */}
                <motion.div
                    variants={containerVariants}
                    initial={reduceMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="mb-9 flex flex-col justify-between gap-6 sm:mb-12 lg:flex-row lg:items-center"
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
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 lg:grid-cols-[0.85fr_1.9fr] lg:gap-10">

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
                        className="flex flex-col items-center justify-center rounded-[30px] border-2 border-[#00e5f0] bg-gradient-to-br from-[#062b4c]/80 to-[#00142c] p-5 text-center sm:p-6"
                    >
                        <h3 className="font-montserrat text-[clamp(2.5rem,4vw,4.5rem)] font-bold leading-none text-white">
                            <AnimatedNumber value={content.rating.score} />
                        </h3>

                        {/* Stars */}
                        <div className="mt-3 flex justify-center gap-2 text-2xl text-[#00e5f0] sm:text-2xl">
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

                        <div className="my-4 h-px w-full max-w-[300px] bg-[#00e5f0]/60" />

                        {/* Satisfaction icon */}
                        <div className="relative flex items-center justify-center">
                            <div>
                                <Image
                                    src={content.rating.image}
                                    alt={content.rating.alt}
                                    width={80}
                                    height={80}
                                    className="h-auto w-20 sm:w-24"
                                />
                            </div>
                        </div>

                        <p className="mt-3 max-w-[250px] font-montserrat text-base font-semibold leading-snug text-white/90">
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
                        className="relative flex min-w-0 flex-col rounded-[30px] border-2 border-[#00e5f0] bg-gradient-to-br from-[#00142c] to-[#00142c] p-5 sm:p-7"
                    >
                        {/* Quote icon */}
                        <div className="absolute -top-5 left-5 bg-[#00142c] px-3 text-3xl text-[#00e5f0] sm:left-7 sm:text-4xl">
                            <FaQuoteLeft />
                        </div>

                        <div className="relative flex-1 overflow-hidden">
                            {/* Reserve the tallest slide so the arrows stay in place. */}
                            <div aria-hidden="true" className="invisible grid pt-4">
                                {testimonials.map((testimonial) => (
                                    <div key={testimonial.id} className="col-start-1 row-start-1">
                                        <TestimonialContent testimonial={testimonial} sizing />
                                    </div>
                                ))}
                            </div>
                            <AnimatePresence initial={false} custom={offsetDirection}>
                                <motion.div
                                    key={active.id}
                                    custom={offsetDirection}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="active"
                                    exit="exit"
                                    transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.4, 0, 0.2, 1] }}
                                    className="absolute inset-0 pt-4"
                                >
                                    <TestimonialContent testimonial={active} animateText={!reduceMotion} />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <span className="sr-only" role="status">
                            Testimonial {index + 1} of {total}: {active.name}
                        </span>
                        {/* Slider buttons */}
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => changeSlide(-1)}
                                disabled={total < 2}
                                aria-label="Previous testimonial"
                                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-cyan-400/50 text-lg text-white transition-colors hover:border-[#00e5f0] hover:bg-[#00e5f0] hover:text-[#001329] disabled:opacity-40"
                            >
                                <FaArrowLeft />
                            </button>

                            <button
                                type="button"
                                onClick={() => changeSlide(1)}
                                disabled={total < 2}
                                aria-label="Next testimonial"
                                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-cyan-400/50 text-lg text-white transition-colors hover:border-[#00e5f0] hover:bg-[#00e5f0] hover:text-[#001329] disabled:opacity-40"
                            >
                                <FaArrowRight />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
            </Container>
        </section>
    );
}
