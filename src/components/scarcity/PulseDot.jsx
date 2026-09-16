import { motion } from 'framer-motion';

export const HEARTBEAT_TRANSITION = {
  duration: 1.1,
  repeat: Infinity,
  ease: 'easeInOut',
};

export default function PulseDot() {
  return (
    <span className="relative flex h-2.5 w-2.5 shrink-0">
      <motion.span
        className="absolute inline-flex h-full w-full rounded-full bg-[#ff3d1f]/60"
        animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
        transition={HEARTBEAT_TRANSITION}
        style={{ willChange: 'transform, opacity' }}
      />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff3d1f] shadow-[0_0_10px_rgba(255,61,31,0.85)]" />
    </span>
  );
}
