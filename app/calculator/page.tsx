import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Missed Call Revenue Calculator | Sunforge Digital",
  description:
    "See roughly how much revenue missed calls could be costing your business each month, based on your own call volume and average job value.",
  openGraph: {
    title: "Missed Call Revenue Calculator | Sunforge Digital",
    description:
      "See roughly how much revenue missed calls could be costing your business each month, based on your own call volume and average job value.",
    type: "website",
  },
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}
