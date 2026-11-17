"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

import { Children, cloneElement, isValidElement, useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// Keep the original elements, colors, spaces, and accessible reading order.
function splitWords(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string") {
      return child.split(/(\s+)/).map((word, index) =>
        /^\s+$/.test(word) ? word : (
          <motion.span
            key={index}
            className="inline-block"
            variants={{ hidden: { opacity: 0, y: 18, rotateX: -35 }, visible: { opacity: 1, y: 0, rotateX: 0 } }}
            transition={{ duration: 0.7, ease }}
          >
            {word}
          </motion.span>
        ),
      );
    }
    if (isValidElement<{ children?: ReactNode }>(child)) {
      return cloneElement(child, {}, splitWords(child.props.children));
    }
    return child;
  });
}

export function AnimatedText({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className="animated-heading"
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ visible: { transition: { staggerChildren: 0.045 } } }}
    >
      {splitWords(children)}
    </motion.span>
  );
}

export function ImageReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.15 });
  return (
    <div
      ref={ref}
      className={`image-reveal relative overflow-hidden ${className}`}
    >
    <motion.div
      className="absolute inset-0"
      initial={reduced ? false : "hidden"}
      animate={visible || reduced ? "visible" : "hidden"}
      variants={{ hidden: { clipPath: "inset(0 100% 0 0)" }, visible: { clipPath: "inset(0 0% 0 0)" } }}
      transition={{ duration: 1, ease }}
    >
      <motion.div
        className="absolute inset-0"
        variants={{ hidden: { scale: 1.15 }, visible: { scale: 1 } }}
        transition={{ duration: 1.2, ease }}
      >
        {children}
      </motion.div>
    </motion.div>
    </div>
  );
}

export function AnimatedNumber({ value }: { value: string | number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const text = String(value);
  const match = text.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  const target = match ? Number(match[2].replaceAll(",", "")) : 0;
  const decimals = match?.[2].split(".")[1]?.length ?? 0;
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    if (!visible || reduced || !target) return;
    const controls = animate(0, target, { duration: 1.5, ease, onUpdate: setCurrent });
    return () => controls.stop();
  }, [visible, reduced, target]);

  const formatted = current === null || reduced || !match ? text :
    `${match[1]}${current.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: match[2].includes(",") })}${match[3]}`;

  return <span ref={ref} aria-label={text}><span aria-hidden="true">{formatted}</span></span>;
}
