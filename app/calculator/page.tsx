import type { Metadata } from "next";
import CalculatorWidget from "@/components/CalculatorWidget";
import { defaults, type VerticalKey } from "@/lib/calculator";

const DESCRIPTION =
  "See roughly how much revenue missed calls could be costing your business each month, based on your own call volume and average job value.";

export const metadata: Metadata = {
  title: "Missed Call Revenue Calculator",
  description: DESCRIPTION,
  openGraph: {
    title: "Missed Call Revenue Calculator | Sunforge Digital",
    description: DESCRIPTION,
    type: "website",
  },
};

function parseVertical(raw: string | string[] | undefined): VerticalKey {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value && value in defaults ? (value as VerticalKey) : "restaurant";
}

export default function CalculatorPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <CalculatorWidget defaultVertical={parseVertical(searchParams.vertical)} />;
}
