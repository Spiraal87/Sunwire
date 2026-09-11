import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function WorkingDay() {
  return (
    <section className="sf-working-day" aria-labelledby="working-title">
      <figure><img src="/images/operations-assessment-scene.png" alt="A customer being helped at a busy local business front desk" loading="lazy" /><figcaption>MORE ROOM FOR THE PEOPLE IN FRONT OF YOU</figcaption></figure>
      <div className="sf-working-copy"><span className="sf-story-kicker">BUILT AROUND YOUR WORKDAY</span><h2 id="working-title">A busy day.<br /><span>A clearer way through.</span></h2><p>Give customers a clear response and your team the details to keep things moving. More attention for the work in front of you, with fewer loose ends behind it.</p>
        <div className="sf-working-outcomes"><span><b>01</b> A way to respond when you are busy</span><span><b>02</b> Customer details ready for your team</span><span><b>03</b> A clear next step for follow-up</span></div>
        <Link href="#contact">Talk through your workday <ArrowUpRight size={18} /></Link>
      </div>
    </section>
  );
}
