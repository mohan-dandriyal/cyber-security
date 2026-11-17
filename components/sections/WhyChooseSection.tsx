


"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

import Image from "next/image";
import { ImageReveal } from "../common/AnimatedContent";
import {
    motion, 
    type Variants,
} from "framer-motion";

import {
    FaCheck,
} from "react-icons/fa";

import { WhyChooseData } from "@/types/template.type";
import { SectionTagline, PrimaryButton, Paragraph, SectionHighlight, SectionTitle, Container } from "../layouts/layout";

const content = WhyChooseData;

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

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
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

export default function WhyChooseUsSection() {
    const reduceMotion = useReducedMotion();

    return (
        <section
            id="why-choose-us"
            className="relative isolate overflow-hidden bg-[#001329] py-14 font-poppins"
        >
            {/* Background glow */}
            <div className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-cyan-500/[0.04] blur-[120px]" />

            <Container>
            <div className="relative z-10 grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">

                {/* Left content */}
                <motion.div
                    variants={containerVariants}
                    initial={reduceMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="max-w-[760px]"
                >
                    {/* Section label */}
                    <motion.div variants={itemVariants}>
                        <SectionTagline className="inline-flex items-center gap-4 rounded-full border-2 border-[#00e5f0] bg-[#031a31] px-6 py-3">
                            <span className="h-4 w-4 rounded-full bg-[#00e5f0]" />
                            {content.subtitle}
                        </SectionTagline>
                    </motion.div>

                    {/* Heading */}
                    <SectionTitle>
                        {content.title1} {" "}
                        <SectionHighlight>
                            {content.title2}
                        </SectionHighlight>
                    </SectionTitle>


                    {/* Description */}
                    {content.description &&
                        <Paragraph>
                            {content.description}
                        </Paragraph>
                    }

                    {/* Features list */}
                    <motion.ul
                        variants={containerVariants}
                        className="mt-9 space-y-5 sm:space-y-6"
                    >
                        {content.features.map((feature) => (
                            <motion.li
                                key={feature.id}
                                variants={itemVariants}
                                whileHover={
                                    reduceMotion
                                        ? undefined
                                        : { x: 8 }
                                }
                                className="group w-fit flex items-center gap-5"
                            >
                                {/* Check icon */}
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-[#00e5f0] text-xl text-[#00e5f0] transition-colors duration-300 group-hover:bg-[#00e5f0] group-hover:text-[#001329]">
                                    <FaCheck className="text-lg" />
                                </span>

                                <h3 className="font-montserrat sm:text-lg font-bold text-white sm:text-xl lg:text-xl">
                                    {feature.title}
                                </h3>
                            </motion.li>
                        ))}
                    </motion.ul>

                    {/* CTA button */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-12"
                    >
                        <PrimaryButton href={content.cta.href} className="min-w-[230px]">
                            {content.cta.label}
                        </PrimaryButton>
                    </motion.div>
                </motion.div>

                {/* Right image */}
                <motion.div
                    initial={
                        reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: 80,
                                scale: 0.92,
                            }
                    }
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.15,
                    }}
                    transition={{
                        duration: 1,
                        delay: 0.2,
                        ease: EASE,
                    }}
                    className="relative"
                >
                    {/* Image glow */}
                    <div className="pointer-events-none absolute -inset-5 rounded-[45px] bg-cyan-400/10 blur-[55px]" />

                    <motion.div
                        whileHover={
                            reduceMotion
                                ? undefined
                                : { y: -8 }
                        }
                        transition={{
                            duration: 0.4,
                            ease: EASE,
                        }}
                        className="group relative overflow-hidden rounded-[35px] border-[4px] border-[#00e5f0] bg-[#031a31] shadow-[0_0_35px_rgba(0,229,240,0.1)] sm:rounded-[80px]"
                    >
                        <ImageReveal className="aspect-[1/1] w-full">
                            <Image
                                src={content.image.src}
                                alt={content.image.alt}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.07]"
                            />
                        </ImageReveal>

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#001329]/15 via-transparent to-transparent" />
                    </motion.div>
                </motion.div>

            </div>
            </Container>
        </section>
    );
}
