import { motion, type TargetAndTransition, type Variants } from 'framer-motion';
import mascotImage from '../../Assets/Mascot.png';

export type MascotState = 'idle' | 'thinking' | 'working' | 'waiting' | 'error';

interface MascotProps {
  state?: MascotState;
  size?: number;
  className?: string;
}

const variants: Record<MascotState, Variants> = {
  idle: {
    // Idle: static, no movement
    container: { y: 0, rotate: 0, transition: { duration: 0.01 } },
    image: { scale: 1 },
  },

  thinking: {
    // Thinking: slow controlled rotation with gentle accel/decel + subtle float
    container: {
      y: [0, -4, 0],
      rotate: [0, 120, 360],
      transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
    },
    image: { scale: [1, 1.002, 1], transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' } },
  },

  working: {
    // Working: smooth, continuous rotation (linear)
    container: { y: 0, rotate: [0, 360], transition: { duration: 2.6, repeat: Infinity, ease: 'linear' } },
    image: { scale: [1, 1.02, 1], transition: { duration: 2.6, repeat: Infinity, ease: 'linear' } },
  },

  // Waiting: breathing between full and 70%
  waiting: { container: { y: 0, rotate: 0 }, image: { scale: [1, 0.7, 1], transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } } },

  error: { container: { y: 0, rotate: [0, -30, 0], transition: { duration: 0.9, ease: 'easeInOut' } }, image: { scale: 1 } },
};

export default function Mascot({ state = 'idle', size = 180, className }: MascotProps) {
  const current = variants[state];

  const containerAnimation: TargetAndTransition = {
    ...(current.container as TargetAndTransition),
  };

  const imageAnimation: TargetAndTransition = {
    ...(current.image as TargetAndTransition),
  };

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
          style={{ width: '110%', height: '110%', objectFit: 'cover', filter: 'drop-shadow(0 18px 38px rgba(0,0,0,0.12))' }}
        />
      </div>
    </motion.div>
  );
}
