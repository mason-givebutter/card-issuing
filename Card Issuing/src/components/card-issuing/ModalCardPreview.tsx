"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, animate, type PanInfo } from "framer-motion";
import { CardImage } from "./CardImage";
import GridScan from "@/components/GridScan";
import { AnalogBackground } from "./AnalogBackground";
import type { CardType } from "@/types/card";

interface ModalCardPreviewProps {
  cardType: CardType | null;
  orgName: string;
}

const FLOOR_Y = 20;
const FLOOR_ROTATE = -5;
const DRAG_BOUNDS = { left: -180, right: 180, top: -260, bottom: 160 };

export function ModalCardPreview({ cardType, orgName }: ModalCardPreviewProps) {
  const isPhysical = cardType === "physical";
  const isVirtual = cardType === "virtual" || !cardType;

  const physX = useMotionValue(0);
  const physY = useMotionValue(0);
  const physRotate = useMotionValue(FLOOR_ROTATE);
  const [isHeld, setIsHeld] = useState(false);
  const returnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearReturnTimer = () => {
    if (returnTimerRef.current) {
      clearTimeout(returnTimerRef.current);
      returnTimerRef.current = null;
    }
  };

  const scheduleReturn = useCallback(() => {
    clearReturnTimer();
    returnTimerRef.current = setTimeout(() => {
      animate(physX, 0, { type: "spring", stiffness: 200, damping: 28 });
      animate(physY, FLOOR_Y, { type: "spring", stiffness: 200, damping: 28 });
      animate(physRotate, FLOOR_ROTATE, { type: "spring", stiffness: 200, damping: 28 });
    }, 3000);
  }, [physX, physY, physRotate]);

  // Cleanup on unmount
  useEffect(() => () => clearReturnTimer(), []);

  // Sync to card type
  useEffect(() => {
    clearReturnTimer();
    if (isPhysical) {
      physX.set(0);
      animate(physY, FLOOR_Y, { type: "spring", stiffness: 500, damping: 30, mass: 3 });
      animate(physRotate, FLOOR_ROTATE, { type: "spring", stiffness: 500, damping: 30, mass: 3 });
    } else {
      animate(physX, 0, { type: "spring", stiffness: 300, damping: 25 });
      animate(physY, 0, { type: "spring", stiffness: 300, damping: 25 });
      animate(physRotate, 0, { type: "spring", stiffness: 300, damping: 25 });
      setIsHeld(false);
    }
  }, [isPhysical]);

  // Pick up
  const onGrab = useCallback(() => {
    if (!isPhysical) return;
    clearReturnTimer();
    setIsHeld(true);
    animate(physY, physY.get() - 90, { type: "spring", stiffness: 550, damping: 20 });
    animate(physRotate, -12, { type: "spring", stiffness: 400, damping: 20 });
  }, [isPhysical, physY, physRotate]);

  // Tilt while dragging
  const onDrag = useCallback((_: PointerEvent, info: PanInfo) => {
    physRotate.set(info.velocity.x * 0.05);
  }, [physRotate]);

  // Throw + metal thud landing
  const onDrop = useCallback((_: PointerEvent, info: PanInfo) => {
    setIsHeld(false);
    const vx = info.velocity.x;
    const vy = info.velocity.y;

    // Clamp throw target inside bounds
    const throwX = Math.max(DRAG_BOUNDS.left, Math.min(DRAG_BOUNDS.right, physX.get() + vx * 0.14));
    const throwY = Math.max(DRAG_BOUNDS.top, Math.min(DRAG_BOUNDS.bottom, physY.get() + vy * 0.14));
    const throwRot = vx * 0.06;

    // Phase 1: fly with momentum
    animate(physX, throwX, { type: "spring", stiffness: 150, damping: 20, velocity: vx * 0.4 });
    animate(physY, throwY, { type: "spring", stiffness: 150, damping: 20, velocity: vy * 0.4 });
    animate(physRotate, throwRot, { type: "spring", stiffness: 150, damping: 18 });

    // Phase 2: metal thud — heavy, fast, clank on the floor
    setTimeout(() => {
      animate(physX, 0, { type: "spring", stiffness: 260, damping: 30 });

      // Primary impact — slam into floor
      animate(physY, FLOOR_Y, {
        type: "spring",
        stiffness: 750,
        damping: 48,
        mass: 4,
        velocity: 500, // falling into the floor
      });
      animate(physRotate, FLOOR_ROTATE + throwRot * 0.12, {
        type: "spring", stiffness: 550, damping: 38,
      });

      // Clank: micro-bounce like metal skipping on a hard surface
      setTimeout(() => {
        animate(physY, FLOOR_Y - 8, { type: "spring", stiffness: 1800, damping: 18, mass: 0.4 });
        animate(physRotate, FLOOR_ROTATE + throwRot * 0.06, {
          type: "spring", stiffness: 900, damping: 22,
        });
        setTimeout(() => {
          animate(physY, FLOOR_Y - 3, { type: "spring", stiffness: 1800, damping: 22, mass: 0.4 });
          setTimeout(() => {
            animate(physY, FLOOR_Y, { type: "spring", stiffness: 1200, damping: 30, mass: 0.5 });
            animate(physRotate, FLOOR_ROTATE, { type: "spring", stiffness: 600, damping: 30 });

            // After clanking to rest, return to dead center after 3s
            scheduleReturn();
          }, 80);
        }, 100);
      }, 90);
    }, 340);
  }, [physX, physY, physRotate, scheduleReturn]);

  return (
    <div
      className="relative flex h-full items-center justify-center overflow-hidden rounded-3xl"
      style={{ minHeight: 400 }}
    >
      {/* GridScan virtual background */}
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{
          opacity: isPhysical ? 0 : 1,
          transition: "opacity 0.5s ease",
          backgroundColor: "#0a0a0a",
        }}
      >
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#1e4060"
          gridScale={0.25}
          lineJitter={0.1}
          scanColor="#00c8ff"
          scanOpacity={0.4}
          scanGlow={2.0}
          scanSoftness={2}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.01}
          noiseIntensity={0.04}
        />
      </div>

      {/* Analog warm background */}
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{
          opacity: isPhysical ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <AnalogBackground />
      </div>

      {/* Outer: drag + physics layer */}
      <motion.div
        drag={isPhysical}
        dragMomentum={false}
        dragElastic={0.08}
        dragConstraints={DRAG_BOUNDS}
        style={{
          x: physX,
          y: physY,
          rotate: physRotate,
          cursor: isPhysical ? (isHeld ? "grabbing" : "grab") : "default",
          userSelect: "none",
          touchAction: "none",
        }}
        animate={{ scale: isHeld ? 1.12 : 1 }}
        transition={{ scale: { type: "spring", stiffness: 500, damping: 28 } }}
        onPointerDown={onGrab}
        onDrag={onDrag as any}
        onDragEnd={onDrop as any}
      >
        {/* Inner: virtual float layer */}
        <motion.div
          initial={false}
          animate={
            isVirtual
              ? { y: [0, -12, -6, -14, 0], rotate: -12 }
              : { y: 0, rotate: 0 }
          }
          transition={
            isVirtual
              ? {
                  y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                  rotate: { type: "spring", stiffness: 120, damping: 20 },
                }
              : {
                  y: { type: "spring", stiffness: 300, damping: 25 },
                  rotate: { type: "spring", stiffness: 300, damping: 25 },
                }
          }
        >
          <div
            style={{
              filter: isVirtual
                ? "drop-shadow(0 20px 30px rgba(51, 102, 255, 0.25)) drop-shadow(0 8px 12px rgba(0,0,0,0.15))"
                : isHeld
                  ? "drop-shadow(0 40px 55px rgba(0,0,0,0.55)) drop-shadow(0 12px 22px rgba(0,0,0,0.4))"
                  : "drop-shadow(0 3px 6px rgba(0,0,0,0.25)) drop-shadow(0 1px 3px rgba(0,0,0,0.15))",
              transition: "filter 0.3s ease",
            }}
          >
            <CardImage
              rotation={0}
              orgName={orgName}
              cardType={cardType}
              holographic={isVirtual}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
