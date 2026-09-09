import OriginalHome from '@/components/OriginalHome';
import Link from 'next/link';
export const metadata = { title: 'Original homepage · Stage 1 comparison', robots: { index: false, follow: false } };
export default function OriginalReview() {
  return <><OriginalHome /><aside className="sf-review-bar" aria-label="Design comparison"><span>ORIGINAL HOMEPAGE</span><Link href="/">View Stage 1 prototype ↗</Link></aside></>;
}
