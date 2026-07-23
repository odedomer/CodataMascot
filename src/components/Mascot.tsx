import { motion, type Variants } from 'framer-motion';
import mascotImage from '../../Assets/clean_mascot.png';

export type MascotState = 'idle' | 'thinking' | 'working' | 'waiting' | 'error';

interface MascotProps {
  state?: MascotState;
  size?: number;
  className?: string;
}

// Split variants for container and image so Framer Motion can smoothly
// interpolate between states when `animate={state}` changes.
const containerVariants: Variants = {
  idle: { y: 0, rotate: 0, transition: { duration: 0.2, ease: 'easeInOut' } },

  thinking: {
    y: [0, -4, 0],
    rotate: [0, 120, 360],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
  },

  working: { y: 0, rotate: [0, 360], transition: { duration: 2.6, repeat: Infinity, ease: 'linear' } },

  waiting: { y: 0, rotate: 0, transition: { duration: 0.4, ease: 'easeInOut' } },

  error: { y: 0, rotate: [0, -30, 0], transition: { duration: 0.9, ease: 'easeInOut' } },
};

const imageVariants: Variants = {
  idle: { scale: 1, transition: { duration: 0.2, ease: 'easeInOut' } },

  thinking: { scale: [1, 1.002, 1], transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' } },

  working: { scale: [1, 1.02, 1], transition: { duration: 2.6, repeat: Infinity, ease: 'linear' } },

  waiting: { scale: [1, 0.7, 1], transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } },

  error: { scale: 1, transition: { duration: 0.4, ease: 'easeInOut' } },
};

export default function Mascot({ state = 'idle', size = 180, className }: MascotProps) {
  // Use `animate={state}` with `variants` and `initial={false}` to avoid
  // jarring initial animations and ensure smooth interpolation between states.

  return (
    <motion.div
      className={className}
      animate={containerAnimation}
      style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className="mascot-wrapper" style={{ width: '92%', height: '92%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.img
          src={mascotImage}
          alt="AI mascot"
          animate={imageAnimation}
          draggable={false}
          style={{ width: '30%', height: '30%', objectFit: 'cover', filter: 'drop-shadow(0 18px 38px rgba(0,0,0,0.12))' }}
        />
      </div>
    </motion.div>
  );
}
