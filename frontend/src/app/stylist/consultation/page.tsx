"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ClipboardCheck, Eye, FileText, Plus, X } from "lucide-react";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

interface ConsultationForm {
  id: string;
  clientName: string;
  date: string;
  // Personal
  phone: string;
  dob: string;
  // Hair history
  lastColour: string;
  lastTreatment: string;
  damageLevel: "None" | "Mild" | "Moderate" | "Severe";
  // Goals
  goal: string;
  // Allergies
  allergies: string;
  // Lifestyle
  hairCareTime: "< 5 min" | "5–10 min" | "10–20 min" | "> 20 min";
  washFreq: "Daily" | "Every 2–3 days" | "Weekly" | "Less often";
  // Style prefs
  stylePrefs: string;
  notes: string;
}

const CLIENTS = [
  "Dilhani Perera",
  "Sanduni Fernando",
  "Thilini Silva",
  "Nadeesha Wickramasinghe",
  "Chamari Jayawardena",
  "Malsha Bandara",
  "New Client",
];
const DAMAGE_LEVELS = ["None", "Mild", "Moderate", "Severe"] as const;
const HAIR_CARE_TIMES = [
  "< 5 min",
  "5–10 min",
  "10–20 min",
  "> 20 min",
] as const;
const WASH_FREQS = ["Daily", "Every 2–3 days", "Weekly", "Less often"] as const;

const INITIAL_FORMS: ConsultationForm[] = [
  {
    id: "f1",
    clientName: "Dilhani Perera",
    date: "14 Jan 2026",
    phone: "+94 77 123 4567",
    dob: "12 Mar 1990",
    lastColour: "Balayage — 3 months ago",
    lastTreatment: "Keratin — 6 months ago",
    damageLevel: "Mild",
    goal: "Maintain balayage, add more warmth for summer",
    allergies: "None known",
    hairCareTime: "10–20 min",
    washFreq: "Every 2–3 days",
    stylePrefs: "Natural, effortless waves. Low-maintenance colour.",
    notes: "Prefers Wella products. Sensitive scalp — avoid ammonia.",
  },
  {
    id: "f2",
    clientName: "Sanduni Fernando",
    date: "10 Jan 2026",
    phone: "+94 71 234 5678",
    dob: "5 Jul 1988",
    lastColour: "None — natural",
    lastTreatment: "Brazilian Blowout — 4 months ago",
    damageLevel: "Moderate",
    goal: "Reduce frizz, get highlights for the first time",
    allergies: "PPD allergy — do patch test",
    hairCareTime: "5–10 min",
    washFreq: "Daily",
    stylePrefs: "Sleek and straight for work. Easy morning routine.",
    notes: "PPD allergy confirmed. Use PPD-free colour only.",
  },
  {
    id: "f3",
    clientName: "Thilini Silva",
    date: "5 Jan 2026",
    phone: "+94 76 345 6789",
    dob: "20 Nov 1995",
    lastColour: "Full colour — 8 weeks ago",
    lastTreatment: "None",
    damageLevel: "Mild",
    goal: "Refresh colour, trim split ends",
    allergies: "None",
    hairCareTime: "> 20 min",
    washFreq: "Every 2–3 days",
    stylePrefs: "Glamorous curls and volume for events.",
    notes: "Regular client, monthly visits.",
  },
];

function FormCard({
  form,
  onView,
}: {
  form: ConsultationForm;
  onView: () => void;
}) {
  const dmgColor = {
    None: "#10B981",
    Mild: "#F59E0B",
    Moderate: "#F97316",
    Severe: "#EF4444",
  }[form.damageLevel];
  return (
    <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-4 hover:border-[#3f3f46] transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[#F5F5F7] font-semibold text-sm">
            {form.clientName}
          </p>
          <p className="text-[#52525B] text-xs mt-0.5">
            {form.date} · {form.phone}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: `${dmgColor}15`, color: dmgColor }}
            >
              Damage: {form.damageLevel}
            </span>
          </div>
          <p className="text-[#A1A1AA] text-xs mt-2 line-clamp-1">
            <span className="text-[#52525B]">Goal: </span>
            {form.goal}
          </p>
        </div>
        <button
          onClick={onView}
          className="flex items-center gap-1.5 h-8 px-3 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[#22D3EE] text-xs font-semibold hover:bg-[#22D3EE]/20 transition-colors shrink-0"
        >
          <Eye className="w-3.5 h-3.5" /> View
        </button>
      </div>
    </div>
  );
}

function ViewModal({
  form,
  onClose,
}: {
  form: ConsultationForm;
  onClose: () => void;
}) {
  const sections = [
    {
      label: "Personal Info",
      fields: [
        ["Phone", form.phone],
        ["Date of Birth", form.dob],
      ],
    },
    {
      label: "Hair History",
      fields: [
        ["Last Colour", form.lastColour],
        ["Last Treatment", form.lastTreatment],
        ["Damage Level", form.damageLevel],
      ],
    },
    {
      label: "Goals & Allergies",
      fields: [
        ["Goal", form.goal],
        ["Allergies / Sensitivities", form.allergies],
      ],
    },
    {
      label: "Lifestyle",
      fields: [
        ["Morning Hair Time", form.hairCareTime],
        ["Wash Frequency", form.washFreq],
      ],
    },
    {
      label: "Style Preferences",
      fields: [
        ["Preferences", form.stylePrefs],
        ["Stylist Notes", form.notes],
      ],
    },
  ];
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#27272A] sticky top-0 bg-[#141419]">
          <div>
            <h3 className="text-[#F5F5F7] font-semibold">{form.clientName}</h3>
            <p className="text-[#52525B] text-xs">Consultation · {form.date}</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#52525B] hover:bg-[#1C1C22]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-5">
          {sections.map((s) => (
            <div key={s.label}>
              <p className="text-[#22D3EE] text-xs font-semibold uppercase tracking-wider mb-2">
                {s.label}
              </p>
              <div className="space-y-2">
                {s.fields.map(([k, v]) => (
                  <div key={k} className="flex gap-3">
                    <span className="text-[#52525B] text-xs w-36 shrink-0">
                      {k}
                    </span>
                    <span className="text-[#A1A1AA] text-xs">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="p-5 pt-0">
          <button
            onClick={onClose}
            className="w-full h-10 rounded-xl bg-[#22D3EE] text-[#0B0B0F] text-sm font-bold hover:bg-[#06B6D4]"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function NewFormModal({
  onSave,
  onClose,
}: {
  onSave: (f: ConsultationForm) => void;
  onClose: () => void;
}) {
  const blank: ConsultationForm = {
    id: "",
    clientName: CLIENTS[0],
    date: "",
    phone: "",
    dob: "",
    lastColour: "",
    lastTreatment: "",
    damageLevel: "Mild",
    goal: "",
    allergies: "",
    hairCareTime: "10–20 min",
    washFreq: "Every 2–3 days",
    stylePrefs: "",
    notes: "",
  };
  const [form, setForm] = useState<ConsultationForm>(blank);
  const set = (k: keyof ConsultationForm, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));
  const [section, setSection] = useState(0);

  const sections = [
    {
      label: "Personal Info",
      content: (
        <div className="space-y-3">
          <div>
            <label className="text-[#52525B] text-xs mb-1 block">Client</label>
            <select
              value={form.clientName}
              onChange={(e) => set("clientName", e.target.value)}
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50"
            >
              {CLIENTS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[#52525B] text-xs mb-1 block">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+94 77 XXX XXXX"
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50"
            />
          </div>
        </div>
      ),
    },
    {
      label: "Hair History",
      content: (
        <div className="space-y-3">
          {[
            ["lastColour", "Last Colour Service"],
            ["lastTreatment", "Last Treatment"],
          ].map(([k, l]) => (
            <div key={k}>
              <label className="text-[#52525B] text-xs mb-1 block">{l}</label>
              <input
                value={String(form[k as keyof ConsultationForm])}
                onChange={(e) =>
                  set(k as keyof ConsultationForm, e.target.value)
                }
                className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50"
              />
            </div>
          ))}
          <div>
            <label className="text-[#52525B] text-xs mb-1 block">
              Damage Level
            </label>
            <div className="flex gap-2">
              {DAMAGE_LEVELS.map((d) => (
                <button
                  key={d}
                  onClick={() => set("damageLevel", d)}
                  className={`flex-1 h-8 rounded-lg border text-xs font-medium transition-colors ${form.damageLevel === d ? "bg-[#22D3EE] border-[#22D3EE] text-[#0B0B0F]" : "border-[#27272A] text-[#52525B] hover:border-[#3f3f46]"}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Goals & Lifestyle",
      content: (
        <div className="space-y-3">
          <div>
            <label className="text-[#52525B] text-xs mb-1 block">
              Client Goal
            </label>
            <textarea
              value={form.goal}
              onChange={(e) => set("goal", e.target.value)}
              rows={2}
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50 resize-none"
            />
          </div>
          <div>
            <label className="text-[#52525B] text-xs mb-1 block">
              Allergies / Sensitivities
            </label>
            <input
              value={form.allergies}
              onChange={(e) => set("allergies", e.target.value)}
              placeholder="None known"
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50"
            />
          </div>
          <div>
            <label className="text-[#52525B] text-xs mb-2 block">
              Morning Hair Care Time
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {HAIR_CARE_TIMES.map((t) => (
                <button
                  key={t}
                  onClick={() => set("hairCareTime", t)}
                  className={`h-8 rounded-lg border text-xs font-medium transition-colors ${form.hairCareTime === t ? "bg-[#22D3EE] border-[#22D3EE] text-[#0B0B0F]" : "border-[#27272A] text-[#52525B]"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Style & Notes",
      content: (
        <div className="space-y-3">
          <div>
            <label className="text-[#52525B] text-xs mb-1 block">
              Style Preferences
            </label>
            <textarea
              value={form.stylePrefs}
              onChange={(e) => set("stylePrefs", e.target.value)}
              rows={2}
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50 resize-none"
            />
          </div>
          <div>
            <label className="text-[#52525B] text-xs mb-1 block">
              Stylist Notes
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50 resize-none"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#27272A] sticky top-0 bg-[#141419]">
          <div>
            <h3 className="text-[#F5F5F7] font-semibold">
              New Consultation Form
            </h3>
            <p className="text-[#52525B] text-xs">
              Step {section + 1} of {sections.length} —{" "}
              {sections[section].label}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#52525B] hover:bg-[#1C1C22]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* Step indicators */}
        <div className="flex px-5 pt-4 gap-1">
          {sections.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1 rounded-full transition-colors"
              style={{ backgroundColor: i <= section ? "#22D3EE" : "#27272A" }}
            />
          ))}
        </div>
        <div className="p-5">{sections[section].content}</div>
        <div className="flex gap-3 p-5 pt-0">
          {section > 0 && (
            <button
              onClick={() => setSection((s) => s - 1)}
              className="flex-1 h-10 rounded-xl border border-[#27272A] text-[#A1A1AA] text-sm"
            >
              Back
            </button>
          )}
          {section < sections.length - 1 ? (
            <button
              onClick={() => setSection((s) => s + 1)}
              className="flex-1 h-10 rounded-xl bg-[#22D3EE] text-[#0B0B0F] text-sm font-bold"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => {
                onSave({
                  ...form,
                  id: `f${Date.now()}`,
                  date: new Date().toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }),
                });
                onClose();
              }}
              className="flex-1 h-10 rounded-xl bg-[#22D3EE] text-[#0B0B0F] text-sm font-bold flex items-center justify-center gap-1.5"
            >
              <ClipboardCheck className="w-4 h-4" /> Save Form
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ConsultationPage() {
  const [forms, setForms] = useState<ConsultationForm[]>(INITIAL_FORMS);
  const [viewing, setViewing] = useState<ConsultationForm | null>(null);
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <motion.div
        {...fadeUp(0)}
        className="flex items-center justify-between flex-wrap gap-3"
      >
        <div>
          <h1 className="text-[#F5F5F7] text-xl font-bold">
            Consultation Forms
          </h1>
          <p className="text-[#52525B] text-sm">
            Digital client intake forms · {forms.length} saved
          </p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-2 h-10 px-4 rounded-xl bg-[#22D3EE] text-[#0B0B0F] text-sm font-bold hover:bg-[#06B6D4] transition-colors"
        >
          <Plus className="w-4 h-4" /> New Form
        </button>
      </motion.div>

      {/* KPI strip */}
      <motion.div {...fadeUp(0.05)} className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Forms", value: forms.length, color: "#22D3EE" },
          {
            label: "PPD Allergy Clients",
            value: forms.filter((f) =>
              f.allergies.toLowerCase().includes("ppd"),
            ).length,
            color: "#EF4444",
          },
          {
            label: "High Damage Clients",
            value: forms.filter(
              (f) => f.damageLevel === "Severe" || f.damageLevel === "Moderate",
            ).length,
            color: "#F59E0B",
          },
        ].map((k, i) => (
          <motion.div key={k.label} {...fadeUp(0.04 * i)}>
            <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-4">
              <p className="font-bold text-2xl" style={{ color: k.color }}>
                {k.value}
              </p>
              <p className="text-[#52525B] text-xs mt-0.5">{k.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Forms grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {forms.map((f, i) => (
          <motion.div key={f.id} {...fadeUp(0.04 * i)}>
            <FormCard form={f} onView={() => setViewing(f)} />
          </motion.div>
        ))}
      </div>

      {forms.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-8 h-8 text-[#52525B] mx-auto mb-3" />
          <p className="text-[#52525B] text-sm">
            No consultation forms yet. Create one to get started.
          </p>
        </div>
      )}

      <AnimatePresence>
        {viewing && (
          <ViewModal form={viewing} onClose={() => setViewing(null)} />
        )}
        {showNew && (
          <NewFormModal
            onSave={(f) => setForms((fs) => [f, ...fs])}
            onClose={() => setShowNew(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
