export function LpBackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-[-200px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#00C2D1]/[0.07] blur-3xl" />
      <div className="absolute right-[-120px] top-[12vh] h-[320px] w-[320px] rounded-full bg-[#00C2D1]/[0.05] blur-3xl md:right-[5%]" />
      <div className="absolute bottom-[10%] left-[-80px] h-[280px] w-[280px] rounded-full bg-[#00C2D1]/[0.04] blur-3xl" />
    </div>
  );
}
