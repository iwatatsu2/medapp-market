import { CATEGORIES } from "./types";

const labelMap = Object.fromEntries(
  CATEGORIES.map((c) => [c.value, c.label])
);

export function getCategoryLabel(value: string): string {
  return labelMap[value] || value;
}

export function getCategoryColor(value: string): string {
  const colors: Record<string, string> = {
    "diabetes-endocrine": "bg-emerald-100 text-emerald-700",
    nephrology: "bg-sky-100 text-sky-700",
    cardiology: "bg-red-100 text-red-700",
    "general-medicine": "bg-gray-100 text-gray-700",
    "general-practice": "bg-teal-100 text-teal-700",
    pulmonology: "bg-cyan-100 text-cyan-700",
    gastroenterology: "bg-amber-100 text-amber-700",
    neurology: "bg-violet-100 text-violet-700",
    emergency: "bg-rose-100 text-rose-700",
    pediatrics: "bg-pink-100 text-pink-700",
    surgery: "bg-orange-100 text-orange-700",
    orthopedics: "bg-lime-100 text-lime-700",
    psychiatry: "bg-indigo-100 text-indigo-700",
    resident: "bg-blue-100 text-blue-700",
    "medical-student": "bg-purple-100 text-purple-700",
    "infectious-disease": "bg-yellow-100 text-yellow-700",
  };
  return colors[value] || "bg-gray-100 text-gray-700";
}
