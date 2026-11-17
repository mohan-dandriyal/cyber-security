

"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

import Image from "next/image";
import { ImageReveal } from "../common/AnimatedContent";
import { motion, } from "framer-motion";
import { FaShieldAlt } from "react-icons/fa";

import { AboutData } from "@/types/template.type";
import { SectionTagline, Paragraph, SectionHighlight, SectionTitle, Container } from "../layouts/layout";

const about = AboutData;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
    const reduceMotion = useReducedMotion();

    return (
        <section
            id="about"
            className="relative isolate overflow-hidden bg-[#001329] py-14 font-poppins"
        >
            {/* Subtle background glow */}
            <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-cyan-500/[0.035] blur-[120px]" />
        <Container>
            <div className="relative z-10 grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16  xl:gap-24">

                {/* Left content */}
                <motion.div
                    initial={
                        reduceMotion
                            ? false
                            : { opacity: 0, x: -70 }
                    }
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                        duration: 0.85,
                        ease: EASE,
                    }}
                    className="max-w-[680px]"
                >
                    {/* Section label */}
                    <motion.div
                        initial={
                            reduceMotion
                                ? false
                                : { opacity: 0, y: 20 }
                        }
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.6,
                            delay: 0.1,
                            ease: EASE,
                        }}
                        className="mb-5 flex items-center gap-3"
                    >
                        <span className="h-[3px] w-8 rounded-full bg-[#00e5f0]" />

                        <SectionTagline className="">
                            {about.subtitle}
                        </SectionTagline>
                    </motion.div>

                    {/* Heading */}
                    <SectionTitle className="max-w-[570px]">
                        {about.title1}
                        <SectionHighlight>
                            {about.title2}
                        </SectionHighlight>

                    </SectionTitle>


                    {/* Description */}
                    {about.description1?.map((p, index) => (
                        <Paragraph
                            key={index + 1}
                            className="mt-6 max-w-[650px]  text-sm sm:text-base leading-[1.9]"
                        >
                            {p}
                        </Paragraph>
                    ))}
                </motion.div>

                {/* Right image */}
                <motion.div
                    initial={
                        reduceMotion
                            ? false
                            : { opacity: 0, x: 70, scale: 0.94 }
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
                        delay: 0.15,
                        ease: EASE,
                    }}
                    className="relative"
                >
                    <motion.div
                        whileHover={
                            reduceMotion
                                ? undefined
                                : { y: -7 }
                        }
                        transition={{
                            duration: 0.4,
                            ease: EASE,
                        }}
                        className="group relative overflow-hidden rounded-[40px] border-[4px] border-[#00e5f0] bg-[#031d35] shadow-[0_0_30px_rgba(0,229,240,0.06)] sm:rounded-[80px]"
                    >
                        <ImageReveal className="aspect-[1.08/1] w-full">
                            <Image
                                src={about.imageMain}
                                alt={about.imageAlt}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
                                priority={false}
                            />
                        </ImageReveal>

                        {/* Image overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#001329]/15 via-transparent to-transparent" />
                    </motion.div>

                    {/* Decorative cyan glow */}
                    <div className="pointer-events-none absolute -bottom-8 left-1/2 -z-10 h-20 w-[75%] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-[45px]" />
                </motion.div>

            </div>
        </Container>
        </section>
    );
}
