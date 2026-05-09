"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Redirect /stylist/settings to /stylist/profile for now
export default function StylistSettingsPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/stylist/profile");
  }, [router]);
  return null;
}
