type LpSectionEyebrowProps = {
  label: string;
};

export function LpSectionEyebrow({ label }: LpSectionEyebrowProps) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-[#00C2D1]">{label}</p>
  );
}
