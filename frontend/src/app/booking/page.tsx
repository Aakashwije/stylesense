import { Suspense } from "react";
import BookingClient from "./BookingClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <BookingClient />
    </Suspense>
  );
}