"use client";

import { useRef, useState, useCallback } from "react";

interface CardImageProps {
  rotation?: number;
  holderName?: string;
  orgName?: string;
  className?: string;
  scale?: number;
  holographic?: boolean;
  cardType?: "virtual" | "physical" | null;
}

export function CardImage({
  rotation = -12,
  holderName = "",
  orgName = "",
  className = "",
  scale = 1,
  holographic = false,
  cardType = "virtual",
}: CardImageProps) {
  const w = 280 * scale;
  const h = 176 * scale;

  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!holographic || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setTilt({
        x: (y - 0.5) * -20,
        y: (x - 0.5) * 20,
      });
      setMousePos({ x: x * 100, y: y * 100 });
    },
    [holographic]
  );

  const handleMouseEnter = useCallback(() => {
    if (holographic) setIsHovered(true);
  }, [holographic]);

  const handleMouseLeave = useCallback(() => {
    if (!holographic) return;
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setMousePos({ x: 50, y: 50 });
  }, [holographic]);

  const cardImage = "/gbcard.png";

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: w,
        height: h,
        // Only apply static rotation when NOT holographic (float animation handles it)
        transform: holographic ? undefined : `rotate(${rotation}deg)`,
        transformOrigin: "center center",
      }}
    >
      {/* Tilt wrapper — only active when holographic */}
      <div
        ref={cardRef}
        className="relative cursor-pointer"
        style={{
          width: w,
          height: h,
          transform: holographic
            ? `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            : undefined,
          transition: holographic
            ? isHovered
              ? "transform 0.1s ease-out"
              : "transform 0.5s ease-out"
            : undefined,
          transformStyle: holographic ? "preserve-3d" : undefined,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Card body */}
        <div
          className="absolute inset-0 rounded-[20px] overflow-hidden"
          style={{
            boxShadow: holographic
              ? undefined
              : "0 24px 48px -12px rgba(24,24,27,0.18)",
          }}
        >
          {/* Card image */}
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={cardImage}
            draggable={false}
          />

          {/* Card holder name (bottom left) */}
          <div
            className="absolute truncate font-medium"
            style={{
              left: 24 * scale,
              bottom: 20 * scale,
              right: 24 * scale,
              fontSize: 11 * scale,
              lineHeight: "1.2",
              color: "rgba(0,0,0,0.6)",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            {holderName || "CARD HOLDER"}
          </div>

          {/* Org name (top left) */}
          <div
            className="absolute truncate font-semibold"
            style={{
              left: 24 * scale,
              top: 24 * scale,
              maxWidth: 120 * scale,
              fontSize: 12 * scale,
              lineHeight: "1.2",
              color: "rgba(0,0,0,0.5)",
            }}
          >
            {orgName}
          </div>
        </div>

        {/* === Holographic overlay layers (only when holographic) === */}
        {holographic && (
          <>
            {/* Holographic rainbow overlay */}
            <div
              className="absolute inset-0 rounded-[20px] overflow-hidden pointer-events-none"
              style={{
                background: `
                  radial-gradient(
                    circle at ${mousePos.x}% ${mousePos.y}%,
                    rgba(255, 0, 128, 0.25) 0%,
                    rgba(0, 255, 128, 0.2) 20%,
                    rgba(0, 128, 255, 0.25) 40%,
                    rgba(255, 0, 255, 0.2) 60%,
                    rgba(255, 200, 0, 0.15) 80%,
                    transparent 100%
                  )
                `,
                opacity: isHovered ? 1 : 0.3,
                transition: "opacity 0.3s ease",
                mixBlendMode: "color-dodge",
              }}
            />

            {/* Shimmer sweep effect */}
            <div
              className="absolute inset-0 rounded-[20px] overflow-hidden pointer-events-none"
              style={{
                background: `linear-gradient(
                  105deg,
                  transparent 30%,
                  rgba(255, 255, 255, 0.15) 45%,
                  rgba(255, 255, 255, 0.4) 50%,
                  rgba(255, 255, 255, 0.15) 55%,
                  transparent 70%
                )`,
                backgroundSize: "200% 100%",
                animation: "shimmerSweep 3s ease-in-out infinite",
                opacity: isHovered ? 0.8 : 0.4,
                transition: "opacity 0.3s ease",
              }}
            />

            {/* Prismatic edge glow */}
            <div
              className="absolute inset-0 rounded-[20px] pointer-events-none"
              style={{
                background: `conic-gradient(
                  from ${mousePos.x * 3.6}deg at ${mousePos.x}% ${mousePos.y}%,
                  rgba(255, 0, 0, 0.15),
                  rgba(255, 127, 0, 0.15),
                  rgba(255, 255, 0, 0.15),
                  rgba(0, 255, 0, 0.15),
                  rgba(0, 127, 255, 0.15),
                  rgba(127, 0, 255, 0.15),
                  rgba(255, 0, 0, 0.15)
                )`,
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.3s ease",
                mixBlendMode: "overlay",
              }}
            />

            {/* Specular highlight */}
            <div
              className="absolute inset-0 rounded-[20px] pointer-events-none"
              style={{
                background: `radial-gradient(
                  ellipse at ${mousePos.x}% ${mousePos.y}%,
                  rgba(255, 255, 255, 0.35) 0%,
                  transparent 50%
                )`,
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
