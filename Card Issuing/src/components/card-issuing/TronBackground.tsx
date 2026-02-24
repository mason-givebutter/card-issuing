"use client";

/**
 * Tron-inspired animated background for virtual card previews.
 * Layers: deep gradient → perspective grid → radial glow → scanline → edge glow
 */
export function TronBackground() {
  return (
    <>
      {/* Layer 1: Deep dark gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0a0e27 0%, #101845 40%, #1a2460 70%, #0d1540 100%)",
        }}
      />

      {/* Layer 2: Perspective grid (scrolling toward viewer) */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          style={{
            position: "absolute",
            bottom: "-40%",
            left: "-20%",
            right: "-20%",
            height: "140%",
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                rgba(51, 195, 255, 0.08) 0px,
                rgba(51, 195, 255, 0.08) 1px,
                transparent 1px,
                transparent 60px
              ),
              repeating-linear-gradient(
                0deg,
                rgba(51, 195, 255, 0.08) 0px,
                rgba(51, 195, 255, 0.08) 1px,
                transparent 1px,
                transparent 60px
              )
            `,
            backgroundSize: "60px 60px",
            animation: "gridScroll 4s linear infinite",
            transformOrigin: "center bottom",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Layer 3: Horizontal accent lines */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              0deg,
              transparent 0%,
              transparent 58%,
              rgba(51, 195, 255, 0.05) 59%,
              transparent 60%,
              transparent 72%,
              rgba(51, 195, 255, 0.03) 73%,
              transparent 74%,
              transparent 100%
            )
          `,
        }}
      />

      {/* Layer 4: Radial glow from center (where the card sits) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(51, 102, 255, 0.3) 0%, rgba(51, 102, 255, 0.08) 40%, transparent 70%)",
          animation: "pulseGlow 6s ease-in-out infinite",
        }}
      />

      {/* Layer 5: Slow vertical scanline */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, rgba(51, 195, 255, 0.4), rgba(51, 195, 255, 0.6), rgba(51, 195, 255, 0.4), transparent)",
            boxShadow:
              "0 0 20px 4px rgba(51, 195, 255, 0.15), 0 0 60px 8px rgba(51, 195, 255, 0.08)",
            animation: "scanline 8s ease-in-out infinite",
          }}
        />
      </div>

      {/* Layer 6: Subtle edge glow (inner border) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 80px rgba(51, 102, 255, 0.15), inset 0 0 30px rgba(51, 195, 255, 0.08)",
          animation: "borderGlow 4s ease-in-out infinite",
        }}
      />

      {/* Layer 7: Very subtle noise/static overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          opacity: 0.5,
          mixBlendMode: "overlay",
        }}
      />
    </>
  );
}
