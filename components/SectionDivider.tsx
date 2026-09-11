import ForgeJunction from './ForgeJunction';
export default function SectionDivider({ id, onIgnite, variant = 'major' }: { id?: string; litCount?: number; tintSide?: 'top' | 'bottom'; ringScale?: number; onIgnite?: () => void; variant?: 'major' | 'contact' }) {
  return <div id={id} className="sf-power-divider"><ForgeJunction variant={variant} onIgnite={onIgnite} /></div>;
}
