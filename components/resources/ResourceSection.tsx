import type { ReactNode } from "react";

type ResourceSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export default function ResourceSection({ id, title, children }: ResourceSectionProps) {
  return <section id={id} className="sf-article-section"><h2>{title}</h2><div>{children}</div></section>;
}
