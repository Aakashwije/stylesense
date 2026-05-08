"use client";

import { SSButton } from "@/components/common/SSButton";
import { SSCard } from "@/components/common/SSCard";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Scissors,
  User,
} from "lucide-react";
import { useState } from "react";

const STEPS = ["Service", "Stylist", "Schedule", "Confirm"];

const SERVICES = [
  {
    id: "haircut",
    name: "Haircut & Style",
    duration: "60 min",
    price: 65,
    popular: true,
  },
  {
    id: "color",
    name: "Full Color",
    duration: "120 min",
    price: 150,
    popular: true,
  },
  {
    id: "keratin",
    name: "Keratin Treatment",
    duration: "180 min",
    price: 280,
    popular: false,
  },
  {
    id: "highlights",
    name: "Highlights",
    duration: "150 min",
    price: 200,
    popular: false,
  },
  {
    id: "blowout",
    name: "Blowout",
    duration: "45 min",
    price: 45,
    popular: true,
  },
  {
    id: "facial",
    name: "Signature Facial",
    duration: "75 min",
    price: 120,
    popular: false,
  },
];

const STYLISTS = [
  {
    id: "1",
    name: "Aria Johnson",
    specialty: "Color Specialist",
    rating: 4.9,
    reviews: 238,
  },
  {
    id: "2",
    name: "Marcus Chen",
    specialty: "Creative Director",
    rating: 4.8,
    reviews: 312,
  },
  {
    id: "3",
    name: "Sofia Rivera",
    specialty: "Hair Sculptor",
    rating: 5.0,
    reviews: 189,
  },
  {
    id: "4",
    name: "James Okafor",
    specialty: "Textured Hair Expert",
    rating: 4.9,
    reviews: 156,
  },
];

const TIMES = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "1:30 PM",
  "3:00 PM",
  "4:30 PM",
  "6:00 PM",
];

function StepIndicator({ step, current }: { step: number; current: number }) {
  const done = current > step;
  const active = current === step;
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
          done
            ? "bg-[#10B981] text-white"
            : active
              ? "bg-[#8B5CF6] text-white"
              : "bg-[#27272A] text-[#52525B]",
        )}
      >
        {done ? <Check className="w-4 h-4" /> : step + 1}
      </div>
      <span
        className={cn(
          "text-sm hidden sm:block",
          active
            ? "text-[#F5F5F7] font-medium"
            : done
              ? "text-[#A1A1AA]"
              : "text-[#52525B]",
        )}
      >
        {STEPS[step]}
      </span>
    </div>
  );
}

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const canNext =
    (currentStep === 0 && selectedService) ||
    (currentStep === 1 && selectedStylist) ||
    (currentStep === 2 && selectedDate && selectedTime) ||
    currentStep === 3;

  const service = SERVICES.find((s) => s.id === selectedService);
  const stylist = STYLISTS.find((s) => s.id === selectedStylist);

  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#0B0B0F] py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-[#F5F5F7] mb-2">
            Book an Appointment
          </h1>
          <p className="text-[#A1A1AA] mb-10">
            Complete the steps below to book your session
          </p>

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-10">
            {STEPS.map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <StepIndicator step={i} current={currentStep} />
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "h-px flex-1 w-8 sm:w-16 transition-colors duration-300",
                      currentStep > i ? "bg-[#8B5CF6]/50" : "bg-[#27272A]",
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {/* Step 0: Services */}
              {currentStep === 0 && (
                <div>
                  <h2 className="text-[#F5F5F7] font-semibold text-lg mb-4">
                    Choose a Service
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICES.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={cn(
                          "w-full text-left p-5 rounded-xl border transition-all duration-200",
                          selectedService === service.id
                            ? "bg-[#8B5CF6]/10 border-[#8B5CF6]/50"
                            : "bg-[#1C1C22] border-[#27272A] hover:border-[#3f3f46]",
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[#F5F5F7] font-medium text-sm">
                                {service.name}
                              </span>
                              {service.popular && (
                                <span className="text-[10px] bg-[#8B5CF6]/15 text-[#8B5CF6] px-1.5 py-0.5 rounded-full">
                                  Popular
                                </span>
                              )}
                            </div>
                            <span className="text-[#A1A1AA] text-xs">
                              {service.duration}
                            </span>
                          </div>
                          <span className="text-[#F5F5F7] font-semibold text-sm">
                            ${service.price}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: Stylists */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-[#F5F5F7] font-semibold text-lg mb-4">
                    Choose a Stylist
                  </h2>
                  <div className="space-y-3">
                    {STYLISTS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedStylist(s.id)}
                        className={cn(
                          "w-full text-left p-5 rounded-xl border transition-all duration-200 flex items-center gap-4",
                          selectedStylist === s.id
                            ? "bg-[#8B5CF6]/10 border-[#8B5CF6]/50"
                            : "bg-[#1C1C22] border-[#27272A] hover:border-[#3f3f46]",
                        )}
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center text-white font-bold flex-shrink-0">
                          {s.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-1">
                          <p className="text-[#F5F5F7] font-medium text-sm">
                            {s.name}
                          </p>
                          <p className="text-[#A1A1AA] text-xs">
                            {s.specialty}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#F5F5F7] text-sm font-medium">
                            ⭐ {s.rating}
                          </p>
                          <p className="text-[#A1A1AA] text-xs">
                            {s.reviews} reviews
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Schedule */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-[#F5F5F7] font-semibold text-lg mb-4">
                    Choose Date & Time
                  </h2>
                  <SSCard className="mb-4">
                    <p className="text-[#A1A1AA] text-sm mb-3">Select a date</p>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-[#0B0B0F] border border-[#27272A] rounded-xl px-4 h-11 text-[#F5F5F7] text-sm outline-none focus:border-[#8B5CF6]"
                    />
                  </SSCard>
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p className="text-[#A1A1AA] text-sm mb-3">
                        Available times
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {TIMES.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={cn(
                              "p-2.5 rounded-xl text-sm border transition-all duration-200",
                              selectedTime === time
                                ? "bg-[#8B5CF6]/10 border-[#8B5CF6]/50 text-[#8B5CF6]"
                                : "bg-[#1C1C22] border-[#27272A] text-[#A1A1AA] hover:border-[#3f3f46]",
                            )}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 3: Confirm */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-[#F5F5F7] font-semibold text-lg mb-4">
                    Confirm Booking
                  </h2>
                  <SSCard className="mb-4">
                    <h3 className="text-[#A1A1AA] text-xs uppercase tracking-wider mb-4">
                      Booking Summary
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          label: "Service",
                          value: service?.name,
                          icon: Scissors,
                        },
                        { label: "Stylist", value: stylist?.name, icon: User },
                        { label: "Date", value: selectedDate, icon: Calendar },
                        { label: "Time", value: selectedTime, icon: Clock },
                        { label: "Duration", value: service?.duration },
                        { label: "Total", value: `$${service?.price}` },
                      ].map(({ label, value, icon: Icon }) => (
                        <div
                          key={label}
                          className="flex items-center justify-between py-2 border-b border-[#27272A] last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            {Icon && (
                              <Icon
                                className="w-4 h-4 text-[#52525B]"
                                strokeWidth={1.5}
                              />
                            )}
                            <span className="text-[#A1A1AA] text-sm">
                              {label}
                            </span>
                          </div>
                          <span className="text-[#F5F5F7] text-sm font-medium">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </SSCard>
                  <SSButton
                    fullWidth
                    size="lg"
                    onClick={() => alert("Booking confirmed! 🎉")}
                  >
                    Confirm & Pay
                  </SSButton>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <SSButton
              variant="ghost"
              size="md"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => setCurrentStep((s) => s - 1)}
              disabled={currentStep === 0}
            >
              Back
            </SSButton>

            {currentStep < 3 && (
              <SSButton
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => setCurrentStep((s) => s + 1)}
                disabled={!canNext}
              >
                Continue
              </SSButton>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
