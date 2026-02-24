"use client";

/**
 * Warm analog-inspired background for physical card previews.
 * Layers: wood texture → warm vignette → film grain → soft bokeh dots → warm spotlight
 * Counterpart to TronBackground — organic, tactile, real-world feel.
 */
export function AnalogBackground() {
  return (
    <>
      {/* Layer 1: Wood texture base (parent handles the img) — we add a warm color wash */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/wood.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Layer 2: Warm color overlay — gives the wood a richer, warmer tone */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(45, 30, 15, 0.4) 0%, rgba(30, 18, 8, 0.5) 100%)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Layer 3: Warm vignette — darker edges, lit center (like a desk lamp) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 50% 48%, transparent 0%, transparent 40%, rgba(15, 8, 2, 0.35) 70%, rgba(10, 5, 0, 0.6) 100%)",
        }}
      />

      {/* Layer 4: Warm spotlight — soft golden light from above center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 42%, rgba(255, 200, 120, 0.12) 0%, rgba(255, 180, 100, 0.04) 50%, transparent 70%)",
        }}
      />

      {/* Layer 5: Film grain texture — analog/organic feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.06'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          opacity: 0.8,
          mixBlendMode: "overlay",
        }}
      />

      {/* Layer 6: Soft bokeh dots — warm out-of-focus light specks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large warm bokeh - top right */}
        <div
          style={{
            position: "absolute",
            top: "12%",
            right: "15%",
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 200, 100, 0.08) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        {/* Medium warm bokeh - bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "10%",
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 180, 80, 0.06) 0%, transparent 70%)",
            filter: "blur(15px)",
          }}
        />
        {/* Small warm bokeh - top left */}
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "20%",
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 220, 140, 0.07) 0%, transparent 70%)",
            filter: "blur(12px)",
          }}
        />
        {/* Tiny bokeh - center right */}
        <div
          style={{
            position: "absolute",
            top: "55%",
            right: "22%",
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 190, 90, 0.06) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />
      </div>

      {/* Layer 7: Subtle warm inner edge glow — like light wrapping around edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 100px rgba(10, 5, 0, 0.3), inset 0 1px 0 rgba(255, 200, 120, 0.05)",
        }}
      />
    </>
  );
}
