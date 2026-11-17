


"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

import { useEffect, useRef, useState } from "react";
import {
    FaBars,
    FaTimes,
} from "react-icons/fa";

import { HeaderData } from "@/types/template.type";
import { Container, PrimaryButton } from "../layouts/layout";
import Image from "next/image";
import { AnimatePresence, motion, } from "framer-motion";

const header = HeaderData;

export default function Header() {
    const reduceMotion = useReducedMotion();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState(header.navLinks[0]?.url ?? "#home");
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const desktop = window.matchMedia("(min-width: 1280px)");
        const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMenuOpen(false);
        };
        desktop.addEventListener("change", closeOnDesktop);
        window.addEventListener("keydown", onKeyDown);
        return () => {
            desktop.removeEventListener("change", closeOnDesktop);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);

            const activationLine = (headerRef.current?.getBoundingClientRect().height ?? 100) + Math.min(120, window.innerHeight * 0.15);
            const section = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"))
                .find((element) => {
                    const bounds = element.getBoundingClientRect();
                    return bounds.top <= activationLine && bounds.bottom > activationLine;
                });

            // Unlisted sections, including Contact, must not leave FAQs active.
            setActive(section ? `#${section.id}` : "");
        };

        onScroll();

        window.addEventListener("scroll", onScroll, {
            passive: true,
        });

        window.addEventListener("resize", onScroll);
        const observer = new ResizeObserver(onScroll);
        const main = document.querySelector("main");
        if (main) observer.observe(main);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <header
            ref={headerRef}
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
                ? "border-b border-cyan-400/10 bg-[#00152c]/95 shadow-lg backdrop-blur-xl"
                : "bg-transparent"
                }`}
        >
            <Container>
                <div className="relative z-10 flex items-center justify-between gap-3 py-4 xl:gap-5">

                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={() => setMenuOpen(false)}
                        className="flex shrink-0 items-center"
                    >
                        <Image
                            src={header.logo}
                            alt={header.logoAlt}
                            width={2170}
                            height={725}
                            priority
                            className="h-auto w-[180px] sm:w-[230px] lg:w-[220px]"
                        />
                    </a>

                    {/* Desktop navigation */}
                    <nav className="hidden font-poppins font-normal items-center gap-3 rounded-full border border-cyan-400/10 bg-[#071e38]/90 p-1.5 xl:flex">
                        {header.navLinks.map((item) => (
                            <a
                                key={item.id}
                                href={item.url}
                                aria-current={active === item.url ? "location" : undefined}
                                onClick={() => setActive(item.url)}
                                className={`rounded-full px-3 py-2 text-[15px] font-normal transition-all duration-300 ${active === item.url
                                    ? "bg-cyan-400/10 text-cyan-400"
                                    : "text-slate-200 hover:bg-white/5 hover:text-cyan-400"
                                    }`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* CTA */}
                    <PrimaryButton
                        href={header.contactButton.url}
                        className="hidden shrink-0 px-6 md:inline-flex"
                    >
                        {header.contactButton.text}
                    </PrimaryButton>

                    {/* Mobile toggle */}
                    <button
                        type="button"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-controls="mobile-navigation"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 text-xl text-cyan-400 xl:hidden"
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </Container>

            {/* Mobile navigation */}
            <AnimatePresence>
            {menuOpen && (
                <motion.nav
                    initial={reduceMotion ? false : { opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                    id="mobile-navigation" className="mobile-navigation pt-28 absolute left-0 top-0 h-[calc(100dvh-5rem)] w-full overflow-y-auto border-t border-cyan-400/10 bg-[#00152c] px-5 py-7 shadow-2xl xl:hidden">
                    <div className="flex flex-col gap-2">
                        {header.navLinks.map((item) => (
                            <a
                                key={item.id}
                                href={item.url}
                                aria-current={active === item.url ? "location" : undefined}
                                onClick={() => {
                                    setActive(item.url);
                                    setMenuOpen(false);
                                }}
                                className={`rounded-lg px-4 py-3 text-sm transition-colors ${active === item.url
                                    ? "bg-cyan-400/10 text-cyan-400"
                                    : "text-white hover:bg-white/5"
                                    }`}
                            >
                                {item.label}
                            </a>
                        ))}

                        <PrimaryButton
                        href={header.contactButton.url}
                        onClick={() => setMenuOpen(false)}
                        className="mt-5 w-full"
                    >
                        {header.contactButton.text}
                    </PrimaryButton>
                    </div>
                </motion.nav>
            )}
            </AnimatePresence>
        </header>
    );
}
