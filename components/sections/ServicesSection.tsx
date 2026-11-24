


"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

import {
    motion, 
    type Variants,
} from "framer-motion";

import { FaShieldAlt, FaArrowRight } from "react-icons/fa";
import ServiceIcon from "../common/ServiceIcon";
import styles from "./ServicesSection.module.css";

import { ServicesData } from "@/types/template.type";
import { SectionTagline, Paragraph, SectionHighlight, SectionTitle, Container } from "../layouts/layout";

const services = ServicesData;

const EASE = [0.22, 1, 0.36, 1] as const;

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 55,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.75,
            ease: EASE,
        },
    },
};

export default function ServicesSection() {
    const reduceMotion = useReducedMotion();

    return (
        <section
            id="services"
            className="relative isolate overflow-hidden bg-[#001329] py-14 font-poppins"
        >
            {/* Background glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/[0.025] blur-[120px]" />
            <Container>
            <div className="relative z-10">

                {/* Section header */}
                <motion.div
                    initial={
                        reduceMotion ? false : { opacity: 0, y: 35 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                        duration: 0.8,
                        ease: EASE,
                    }}
                    className="mx-auto mb-14 max-w-5xl text-center"
                >
                    {/* Subtitle */}
                    <div className="mb-6 flex items-center justify-center gap-2 sm:gap-4">
                        <span className="h-[2px] w-8 bg-[#00e5f0] sm:w-20" />

                        <FaShieldAlt className="shrink-0 text-lg text-[#00e5f0] sm:text-2xl" />

                        <SectionTagline className="whitespace-nowrap">
                            {services.subtitle}
                        </SectionTagline>

                        <span className="h-[2px] w-8 bg-[#00e5f0] sm:w-20" />
                    </div>


                    <SectionTitle className={`mx-auto max-w-[900px] `}>
                        {services.title1} {" "}
                        <SectionHighlight className="max-sm:block">
                            {services.title2}
                        </SectionHighlight>
                    </SectionTitle>

                    {
                        services.description &&
                        <Paragraph>
                            {services.description}
                        </Paragraph>
                    }
                </motion.div>

                {/* Services grid */}
                <div
                    className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    {services.services.map((service) => {


                        return (
                            <motion.article
                                key={service.id}
                                variants={cardVariants}
                                initial={reduceMotion ? false : "hidden"}
                                animate={reduceMotion ? "visible" : undefined}
                                whileInView={reduceMotion ? undefined : "visible"}
                                viewport={{ once: true, amount: 0.15 }}
                                whileHover={
                                    reduceMotion
                                        ? undefined
                                        : { y: -10, scale: 1.015 }
                                }
                                transition={{
                                    duration: 0.3,
                                    ease: EASE,
                                }}
                                className={`service-card group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[30px] border-[2px] p-6 transition-colors duration-500 sm:min-h-[380px] sm:p-8 xl:p-10 bg-gradient-to-br from-[#062c50] via-[#032142] to-[#001a35] border-[#00e5f0]
                                    `}
                            >
                                {/* Card decorative glow */}
                                <div
                                    className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[90px] transition-opacity duration-500 bg-cyan-300/35 `}
                                />

                                {/* Icon */}
                                <div className="relative z-10">
                                    <motion.div
                                        whileHover={
                                            reduceMotion
                                                ? undefined
                                                : { rotate: -8, scale: 1.12 }
                                        }
                                        transition={{ duration: 0.3 }}
                                        className={styles.icon}
                                    >
                                        <ServiceIcon name={service.icon} />
                                    </motion.div>
                                </div>

                                {/* Bottom content */}
                                <div className="relative z-10 flex items-end justify-between gap-5">
                                    <div className="max-w-[300px]">
                                        <h3 className="font-montserrat text-[clamp(1rem,1.4vw,1.6rem)] font-medium leading-[1.25] text-white">
                                            {service.title}
                                        </h3>
                                    </div>

                                    {/* Arrow button */}
                                    <a
                                        href={service.url}
                                        aria-label={`Learn more about ${service.title}`}
                                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl transition-all duration-300 group-hover:rotate-[-45deg] bg-[#00e5f0] text-[#001329] hover:bg-white
                                            `}
                                    >
                                        <FaArrowRight />
                                    </a>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
            </Container>
        </section>
    );
}
