
"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion, } from "framer-motion";
import styles from "./buttons.module.css";
import { AnimatedText } from "../common/AnimatedContent";

type ComponentProps = {
  children: ReactNode;
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

// ========================================
// MAIN CONTAINER
// ========================================

export const Container = ({
  children,
  className = "",
}: ComponentProps) => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 ">
      <div className={`mx-auto min-w-0 max-w-[1400px] ${className}`}>
        {children}
      </div>
    </div>
  );
};


// ========================================
// SECTION TITLE
// ========================================

export const SectionTitle = ({
  children,
  className = "",
}: ComponentProps) => {
  return (
    <h2
      className={`
        font-montserrat
        my-4
        text-[clamp(24px,3.4vw,58px)]
        font-bold
        sm:font-semibold
        leading-[1.17]
        tracking-[-0.035em]
        text-[#FFFFFF]
        ${className}
      `}
    >
      <AnimatedText>{children}</AnimatedText>
    </h2>
  );
};

// ========================================
// SECTION HIGHLIGHT TEXT
// ========================================

export const SectionHighlight = ({
  children,
  className = "",
}: ComponentProps) => {
  return (
    <span className={`text-[#00e5f0] ${className}`}>
      {children}
    </span>
  );
};

// ========================================
// SECTION EYEBROW
// ========================================

export const SectionEyebrow = ({
  children,
  className = "",
}: ComponentProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        ease: EASE,
      }}
      className={`inline-flex items-center gap-3 rounded-full border border-[#CBEAD9] bg-[#F0FBF5] px-5 py-2 text-[#087A43] ${className}`}
    >
      <span className="inline-flex flex-wrap items-center justify-center gap-2 font-poppins text-sm font-semibold sm:text-base">
        {children}
      </span>
    </motion.div>
  );
};

// ========================================
// PARAGRAPH
// ========================================

export const Paragraph = ({
  children,
  className = "",
}: ComponentProps) => {
  return (
    <p
      className={`
        font-poppins
        text-sm
        font-normal
        leading-[1.5]
        text-[#FFFFFF]/75
        sm:text-base
        ${className}
      `}
    >
      {children}
    </p>
  );
};


type ButtonAppearance = {
  children: ReactNode;
  className?: string;
  Icon?: ReactNode;
};

type ActionButtonProps = ButtonAppearance & (
  | (Omit<ComponentPropsWithoutRef<"a">, keyof ButtonAppearance> & { href: string })
  | (Omit<ComponentPropsWithoutRef<"button">, keyof ButtonAppearance> & { href?: never })
);

function ActionButton({ variant, ...props }: ActionButtonProps & { variant: "primary" | "outline" }) {
  const { children, className = "", Icon = variant === "primary" ? <FaArrowRight /> : null, ...rest } = props;
  const classes = `${styles.button} ${styles[variant]} ${className}`;
  const content = <><span>{children}</span>{Icon && <span className={styles.icon} aria-hidden="true">{Icon}</span>}</>;

  if (rest.href !== undefined) {
    return <a {...rest} className={classes}>{content}</a>;
  }

  return <button {...rest} type={rest.type ?? "button"} className={classes}>{content}</button>;
}

export function PrimaryButton(props: ActionButtonProps) {
  return <ActionButton {...props} variant="primary" />;
}

export function OutlineButton(props: ActionButtonProps) {
  return <ActionButton {...props} variant="outline" />;
}

export function SectionTagline({ children, className = "" }: ComponentProps) {
  return <span className={`${styles.tagline} ${className}`}>{children}</span>;
}
