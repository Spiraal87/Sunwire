export default function QuietDivider({ id, label = 'Built around your business' }: { id?: string; label?: string }) {
 return <div id={id} className="sf-quiet-divider"><span /><p>{label}</p><span /></div>;
}
