const facts = [
  { label: "BASED IN", value: "Phoenix, Arizona" },
  { label: "FOCUS", value: "Local businesses across the Valley" },
  { label: "APPROACH", value: "Understand the business, then build" },
];

export default function About() {
 return <section id="about" className="sf-about">
  <p className="sf-eyebrow">THE PEOPLE AND THINKING BEHIND THE SYSTEMS</p><h1>About Sunforge</h1>
  <div className="sf-about-grid"><div><p className="sf-eyebrow">About the name</p><h2>Forged into<br />something useful.</h2>
  <p>The name Sunforge combines two ideas: the energy of the sun and the craft of shaping raw material into something useful, durable, and built to work.</p>
  <p>That same thinking guides what we build for local businesses - practical digital systems that turn missed calls, repetitive work, and an underperforming website into more booked jobs, more time, and a business that runs more smoothly.</p></div>
  <figure><img src="/images/hero-image3.png" alt="Sunforge's molten amber core and concentric machined rings" /><figcaption>ENERGY. PURPOSE. SOMETHING BUILT TO WORK.</figcaption></figure></div>
  <div className="sf-about-founder"><p>Run by Christopher Johnson - a Phoenix-based developer helping local businesses grow with better websites and AI receptionists.</p><dl>{facts.map(fact=><div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl></div>
 </section>;
}
