

"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

import { useState } from "react";
import Image from "next/image";
import {
    AnimatePresence,
    motion, 
    type Variants,
} from "framer-motion";

import {
    FaQuestionCircle,
    FaPlus,
    FaMinus,
} from "react-icons/fa";

import { FAQsData } from "@/types/template.type";
import { SectionTagline, Paragraph, SectionHighlight, SectionTitle, Container } from "../layouts/layout";

const content = FAQsData;

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.15,
        },
    },
};

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 35,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: EASE,
        },
    },
};

export default function FAQSection() {
    const reduceMotion = useReducedMotion();

    const [activeId, setActiveId] = useState<string | null>(
        content.items[0]?.id ?? null
    );

    const toggleFAQ = (id: string) => {
        setActiveId((prev) => (prev === id ? null : id));
    };

    return (
        <section
            id="faq"
            className="relative isolate overflow-hidden bg-[#001329] py-14 font-poppins"
        >
            {/* Background glow */}
            <div className="pointer-events-none absolute -left-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-cyan-500/[0.035] blur-[120px]" />

            <Container>
            <div className="relative z-10 mx-auto grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16 xl:gap-20">

                {/* Left content */}
                <motion.div
                    variants={containerVariants}
                    initial={reduceMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="relative"
                >
                    {/* Subtitle */}
                    <motion.div variants={itemVariants}>
                        <SectionTagline className="inline-flex items-center gap-3 rounded-full border-2 border-[#00e5f0] bg-[#031a31] px-5 py-3">
                            <FaQuestionCircle className="text-xl text-[#00e5f0]" />
                            {content.subtitle}
                        </SectionTagline>
                    </motion.div>

                    {/* Heading */}
                    <motion.div
                        variants={itemVariants}
                    >
                        <SectionTitle>
                            {content.title1} {" "}
                            <SectionHighlight>
                                {content.title2}
                            </SectionHighlight>
                        </SectionTitle>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        variants={itemVariants}
                    >
                        <Paragraph>
                            {content.description}
                        </Paragraph>
                    </motion.div>

                    {/* Cyan underline */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-6 h-[4px] w-24 bg-[#00e5f0]"
                    />

                    {/* Cybersecurity illustration */}
                    <motion.div
                        variants={itemVariants}
                        className="relative mt-8 w-full max-w-[600px]"
                    >
                        <motion.div
                            animate={
                                reduceMotion
                                    ? undefined
                                    : { y: [0, -8, 0] }
                            }
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="relative aspect-[1.15/1] w-full"
                        >
                            <Image
                                src={content.image}
                                alt={content.imageAlt}
                                fill
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                className="object-contain"
                            />
                        </motion.div>

                        {/* Bottom glow */}
                        <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-20 w-[70%] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-[50px]" />
                    </motion.div>
                </motion.div>

                {/* Right FAQ accordion */}
                <motion.div
                    variants={containerVariants}
                    initial={reduceMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="space-y-5"
                >
                    {content.items.map((item) => {
                        const isOpen = activeId === item.id;

                        return (
                            <motion.div
                                key={item.id}
                                variants={itemVariants}
                                className={`overflow-hidden rounded-[20px] border-2 transition-colors duration-300 ${isOpen
                                    ? "border-[#00e5f0] bg-[#04233e]"
                                    : "border-slate-500/50 bg-[#031a31] hover:border-cyan-400/50"
                                    }`}
                            >
                                {/* Question */}
                                <button
                                    type="button"
                                    onClick={() => toggleFAQ(item.id)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${item.id}`}
                                    className="flex w-full items-center justify-between gap-5 px-6 py-6 text-left sm:px-8"
                                >
                                    <span className="font-montserrat text-base font-semibold leading-snug text-white/90 sm:text-lg lg:text-[20px]">
                                        {item.question}
                                    </span>

                                    {/* Plus/minus icon */}
                                    <motion.span
                                        animate={{
                                            rotate: isOpen ? 180 : 0,
                                        }}
                                        transition={{
                                            duration: reduceMotion ? 0 : 0.3,
                                        }}
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg transition-colors duration-300 ${isOpen
                                            ? "bg-[#00e5f0] text-[#001329]"
                                            : "border-2 border-white/80 text-white"
                                            }`}
                                    >
                                        {isOpen ? <FaMinus /> : <FaPlus />}
                                    </motion.span>
                                </button>

                                {/* Animated answer */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={`faq-answer-${item.id}`}
                                            key="answer"
                                            initial={
                                                reduceMotion
                                                    ? { opacity: 0 }
                                                    : { height: 0, opacity: 0 }
                                            }
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                            }}
                                            exit={
                                                reduceMotion
                                                    ? { opacity: 0 }
                                                    : { height: 0, opacity: 0 }
                                            }
                                            transition={{
                                                duration: reduceMotion ? 0 : 0.35,
                                                ease: EASE,
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mx-6 border-t border-cyan-400/40 px-0 pb-7 pt-5 sm:mx-8">
                                                <p className="text-sm leading-[1.85] text-slate-300 sm:text-[15px] lg:text-base">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
            </Container>
        </section>
    );
}



