"use client";
import React from "react";
import NextLink from "next/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { Link } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/utils/ui";
import { subtitleVariants, titleVariants } from "@/Components/variants";
import { CanvasRevealEffect } from "./canvas-reveal-effect";

export function CanvasRevealEffectDemo3() {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative mx-auto flex h-screen w-full flex-col items-center justify-center gap-4 overflow-hidden bg-white dark:bg-black px-8 lg:flex-row"
    >
      <div className="z-30 flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
          }}
          className="inline-block justify-center text-center md:max-w-3xl lg:max-w-6xl"
        >
          <h1 className={cn(titleVariants(), "text-stone-500 dark:text-slate-300")}>From&nbsp;</h1>
          <h1 className={titleVariants({ color: "yellow" })}>Chaos&nbsp;</h1>
          <h1 className={cn(titleVariants(), "text-stone-500 dark:text-slate-300")}>to&nbsp;</h1>
          <h1 className={titleVariants({ color: "golden" })}>Cohesion&nbsp;</h1>
          <br />
          <h1 className={cn(titleVariants({}), "block text-stone-500 dark:text-slate-300")}>
            Elevate Your&nbsp;
          </h1>
          <h1 className={cn(titleVariants(), "text-stone-500 dark:text-slate-300")}>
            Game in Construction.
          </h1>
          <motion.h2
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            className={cn(
              subtitleVariants({ class: "mt-4" }),
              "text-stone-800 dark:text-slate-500 ",
            )}
          >
            Providing Effortless Management, Navigation of Projects,
          </motion.h2>
        </motion.div>
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 0.7,
            duration: 0.7,
          }}
        >
          <Link
            as={NextLink}
            about="Find out why you should care about us"
            href={"/analytics"}
            className={buttonStyles({
              color: "success",
              radius: "full",
              variant: "shadow",
            })}
          >
            Get started
          </Link>
          <Link
            as={NextLink}
            className={buttonStyles({
              variant: "bordered",
              radius: "full",
              color: "primary",
            })}
            href="/about"
          >
            Learn More →
          </Link>
        </motion.div>
      </div>
      {/* </div> */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 h-full w-full"
          >
            <CanvasRevealEffect
              animationSpeed={5}
              containerClassName="bg-transparent"
              colors={[
                [59, 130, 246],
                [139, 92, 246],
              ]}
              opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1]}
              dotSize={2}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute inset-0  [mask-image:radial-gradient(400px_at_center,white,transparent)] dark:bg-black/90" />
    </div>
  );
}
