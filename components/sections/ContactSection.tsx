
"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
    motion, 
    type Variants,
} from "framer-motion";

import {
    FaPaperPlane,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
} from "react-icons/fa";

import { ContactData } from "@/types/template.type";
import { SectionTagline, PrimaryButton, Paragraph, SectionHighlight, SectionTitle, Container } from "../layouts/layout";

const content = ContactData;
const EASE = [0.22, 1, 0.36, 1] as const;

const iconMap: Record<string, IconType> = {
    location: FaMapMarkerAlt,
    phone: FaPhoneAlt,
    email: FaEnvelope,
};

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
    hidden: { opacity: 0, y: 35 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, ease: EASE },
    },
};

type FormValues = {
    name: string;
    phone: string;
    email: string;
    company: string;
    message: string;
};

const initialValues: FormValues = {
    name: "",
    phone: "",
    email: "",
    company: "",
    message: "",
};

export default function ContactSection() {
    const reduceMotion = useReducedMotion();

    const [values, setValues] = useState<FormValues>(initialValues);
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const updateField = (field: keyof FormValues, value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!agreed || loading) return;

        setLoading(true);
        setStatus("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!response.ok) throw new Error("Submission failed");

            setStatus(content.form.successMessage);
            setValues(initialValues);
            setAgreed(false);
        } catch {
            setStatus(content.form.errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const fields = content.form.fields;

    const inputClass =
        "mt-3 w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-sm text-[#001329] outline-none transition-all placeholder:text-slate-500 focus:border-[#00e5f0] focus:ring-2 focus:ring-[#00e5f0]/30 sm:text-base";

    const labelClass = "block text-sm font-medium text-white sm:text-base";

    return (
        <section
            id="contact"
            className="relative isolate overflow-hidden bg-[#001329] py-14 font-poppins"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,100,160,0.07),transparent_65%)]" />
            
            <Container>
            <div className="relative z-10 mx-auto grid w-full grid-cols-1 items-start gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-12 xl:gap-16">

                {/* Left content */}
                <motion.div
                    variants={containerVariants}
                    initial={reduceMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    <motion.div variants={fadeUp}>
                        <SectionTagline className="inline-flex items-center gap-3 rounded-full border-2 border-[#00e5f0] px-5 py-3">
                            <FaPaperPlane className="text-[#00e5f0]" />
                            {content.subtitle}
                        </SectionTagline>
                    </motion.div>
                    <SectionTitle>
                        {content.title1}
                        <span className="block">
                            {content.title2} {" "}
                            <SectionHighlight>
                                {content.title3}
                            </SectionHighlight>
                        </span>
                    </SectionTitle>


                    <motion.div
                        variants={fadeUp}
                    >
                        <Paragraph>
                            {content.description}
                        </Paragraph>
                    </motion.div>

                    {/* Contact cards */}
                    <motion.div variants={containerVariants} className="mt-9 space-y-4">
                        {content.details.map((item) => {
                            const Icon = iconMap[item.icon] ?? FaEnvelope;

                            return (

                                item.href ?
                                    <motion.a
                                        key={item.id}
                                        variants={fadeUp}
                                        href={item.href}
                                        target={item.id === "address" ? "_blank" : undefined}
                                        rel={item.id === "address" ? "noopener noreferrer" : undefined}
                                        whileHover={reduceMotion ? undefined : { x: 6 }}
                                        className="group flex items-center gap-5 rounded-[22px] border border-[#377b9b] bg-[#031a31]/70 p-4 transition-colors hover:border-[#00e5f0] sm:gap-7"
                                    >
                                        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#00e5f0] text-2xl text-[#001329] sm:h-[62px] sm:w-[62px]">
                                            <Icon />
                                        </span>

                                        <span className="h-14 w-[2px] shrink-0 bg-[#00e5f0]" />

                                        <span className="min-w-0">
                                            <span className="block font-montserrat text-lg font-semibold text-white sm:text-lg">
                                                {item.title}
                                            </span>
                                            <span className="mt-1 block break-words text-sm leading-6 text-slate-300 sm:text-base">
                                                {item.value}
                                            </span>
                                        </span>
                                    </motion.a> :
                                    <motion.div
                                        key={item.id}
                                        variants={fadeUp}
                                        rel={item.id === "address" ? "noopener noreferrer" : undefined}
                                        whileHover={reduceMotion ? undefined : { x: 6 }}
                                        className="group flex items-center gap-5 rounded-[22px] border border-[#377b9b] bg-[#031a31]/70 p-4 transition-colors hover:border-[#00e5f0] sm:gap-7"
                                    >
                                        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#00e5f0] text-2xl text-[#001329] sm:h-[62px] sm:w-[62px]">
                                            <Icon />
                                        </span>

                                        <span className="h-14 w-[2px] shrink-0 bg-[#00e5f0]" />

                                        <span className="min-w-0">
                                            <span className="block font-montserrat text-lg font-semibold text-white sm:text-lg">
                                                {item.title}
                                            </span>
                                            <span className="mt-1 block break-words text-sm leading-6 text-slate-300 sm:text-base">
                                                {item.value}
                                            </span>
                                        </span>
                                    </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>

                {/* Right form */}
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, x: 65 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.85, ease: EASE }}
                    className="rounded-[26px] border border-[#1688ae] bg-gradient-to-br from-[#082c4b] via-[#05213d] to-[#031a32] p-6 shadow-[0_0_40px_rgba(0,229,240,0.035)] sm:p-9 lg:p-10"
                >
                    <h3 className="font-montserrat text-3xl font-bold text-white sm:text-3xl">
                        {content.form.title1}{" "}
                        <span className="text-[#00e5f0]">{content.form.title2}</span>
                    </h3>

                    <div className="mb-7 mt-4 h-[4px] w-24 bg-[#00e5f0]" />

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {(
                                [
                                    ["name", "text", true],
                                    ["phone", "tel", true],
                                    ["email", "email", true],
                                    ["company", "text", false],
                                ] as const
                            ).map(([key, type, required]) => (
                                <label key={key} className={labelClass}>
                                    {fields[key].label}
                                    <input
                                        type={type}
                                        name={key}
                                        required={required}
                                        value={values[key]}
                                        onChange={(e) => updateField(key, e.target.value)}
                                        placeholder={fields[key].placeholder}
                                        autoComplete={
                                            key === "name"
                                                ? "name"
                                                : key === "phone"
                                                    ? "tel"
                                                    : key === "email"
                                                        ? "email"
                                                        : "organization"
                                        }
                                        className={inputClass}
                                    />
                                </label>
                            ))}
                        </div>

                        <label className={labelClass}>
                            {fields.message.label}
                            <textarea
                                name="message"
                                rows={5}
                                value={values.message}
                                onChange={(e) => updateField("message", e.target.value)}
                                placeholder={fields.message.placeholder}
                                className={`${inputClass} resize-y`}
                            />
                        </label>

                        <div className="flex items-start gap-3">
                            <input
                                id="privacy-agreement"
                                type="checkbox"
                                required
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="mt-1 h-5 w-5 shrink-0 accent-[#00e5f0]"
                            />
                            <label htmlFor="privacy-agreement" className="text-sm text-slate-200 sm:text-base">
                                {content.form.privacyText}{" "}
                                <Link
                                    href={content.form.privacyHref}
                                    className="text-[#00e5f0] underline-offset-4 hover:underline"
                                >
                                    Read policy
                                </Link>
                            </label>
                        </div>

                        <PrimaryButton
                            type="submit"
                            disabled={loading || !agreed}
                            aria-busy={loading}
                            className="min-w-[210px]"
                        >
                            {loading ? "Submitting..." : content.form.buttonText}
                        </PrimaryButton>

                        {status && (
                            <p role="status" aria-live="polite" className="text-sm text-cyan-300">
                                {status}
                            </p>
                        )}
                    </form>
                </motion.div>
            </div>
            </Container>
        </section>
    );
}
