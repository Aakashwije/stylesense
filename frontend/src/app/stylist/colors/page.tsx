"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// The colour guide is part of the trends page (Colour Palette tab)
export default function ColorsRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/stylist/trends");
  }, [router]);
  return null;
}
