"use client";

import { useState } from "react";
import Image from "next/image";

export default function ClientAvatar({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(/\s+/).slice(0, 2).map(word => word[0]).join("");

  return failed ? (
    <span role="img" aria-label={name} className="flex h-full w-full items-center justify-center bg-[#082844] text-sm font-semibold text-cyan-300">
      {initials}
    </span>
  ) : (
    <Image src={src} alt={name} width={100} height={100} onError={() => setFailed(true)} className="h-full w-full object-cover" />
  );
}
