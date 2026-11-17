import type { ReactNode } from "react";

const lock = (
  <>
    <rect x="27" y="34" width="18" height="18" rx="3" />
    <path d="M31 34v-5a5 5 0 0 1 10 0v5M36 42v4" />
    <circle cx="36" cy="41" r="1" />
  </>
);

const icons: Record<string, ReactNode> = {
  "threat-protection": <>
    <path d="M13 27H9a3 3 0 0 0-3 3v23h52V30a3 3 0 0 0-3-3h-4M3 53h58v6H3z" />
    <path d="M32 5c6 5 11 6 17 7-1 16-5 23-17 30-12-7-16-14-17-30 6-1 11-2 17-7Z" />
    <path d="m23 23 6 6 12-13" />
  </>,
  "endpoint-security": <>
    <rect x="8" y="24" width="48" height="31" rx="3" />
    <path d="M3 55h58v5H3zM20 24v-9h-7V9M32 24V9M44 24v-9h7V9" />
    <circle cx="13" cy="6" r="3" /><circle cx="32" cy="6" r="3" /><circle cx="51" cy="6" r="3" />
    <g transform="translate(7 5) scale(.7)">{lock}</g>
  </>,
  "network-firewall": <>
    <path d="M8 30h41v27H8zM8 39h41M8 48h26M20 30v9M36 30v9M27 39v9M18 48v9" />
    <path d="M22 28c-9-10 3-13 3-23 10 5 12 12 9 17 4-2 7-5 7-9 6 8 7 12 2 15" />
    <path d="M46 38c4 3 8 4 13 5 0 9-3 14-13 19-9-5-12-10-12-19 5-1 9-2 12-5Z" />
    <path d="m41 49 4 4 7-8" />
  </>,
  "data-encryption": <>
    <ellipse cx="25" cy="12" rx="20" ry="8" />
    <path d="M5 12v37c0 5 9 9 20 9M45 12v12M5 25c0 5 9 9 20 9h3M5 37c0 5 9 9 20 9" />
    <g transform="translate(5 3)">{lock}</g>
  </>,
  "cloud-security": <>
    <path d="M20 47h-5a12 12 0 0 1-1-24 18 18 0 0 1 35-4 14 14 0 0 1 1 28h-3" />
    {lock}
  </>,
  "incident-recovery": <>
    <path d="M7 29A25 25 0 0 1 51 14l5 6M56 8v12H44M57 35A25 25 0 0 1 13 50l-5-6M8 56V44h12" />
    <path d="m28 17 8 0 1 5 4 2 5-2 4 7-4 3v4l4 3-4 7-5-2-4 2-1 5h-8l-1-5-4-2-5 2-4-7 4-3v-4l-4-3 4-7 5 2 4-2Z" />
    <circle cx="32" cy="34" r="8" />
  </>,
};

export default function ServiceIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {icons[name] ?? icons["threat-protection"]}
    </svg>
  );
}
