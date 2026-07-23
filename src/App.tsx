import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Mascot from './components/Mascot';

type MascotState = 'idle' | 'thinking' | 'working' | 'waiting' | 'error';

const states: MascotState[] = ['idle', 'thinking', 'working', 'waiting', 'error'];

export default function App() {
  const [state, setState] = useState<MascotState>('idle');

  const buttons = useMemo(
    () =>
      states.map((value) => ({
        value,
        label: value.charAt(0).toUpperCase() + value.slice(1),
      })),
    [],
  );

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">AI companion motion system</p>
          <h1>Motion makes the mascot feel intelligent.</h1>
          <p className="description">
            The logo remains unchanged; every bit of personality comes from elegant motion.
          </p>
        </div>

        <div className="mascot-stage">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={state}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Mascot state={state} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="controls" role="toolbar" aria-label="Mascot state selector">
          {buttons.map((button) => (
            <button
              key={button.value}
              className={state === button.value ? 'active' : ''}
              onClick={() => setState(button.value)}
            >
              {button.label}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
