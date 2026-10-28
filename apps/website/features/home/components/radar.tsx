import type { CSSProperties } from 'react';

type Blip = {
  id: string;
  label: string;
  /** CSS rotate angle: 0 is 3 o'clock, positive is clockwise. */
  angle: number;
  /** 1 = inner ring, 2 = middle, 3 = outer. */
  ring: 1 | 2 | 3;
};

const PERIOD = 14;
/** The bright edge of the conic sweep sits 70deg clockwise from 12 o'clock. */
const SWEEP_EDGE = 70;
const RING_RADIUS: Record<Blip['ring'], number> = { 1: 0.34, 2: 0.67, 3: 1 };

const BLIPS: Blip[] = [
  { id: 'trend-radar', label: 'Trend Radar', angle: 20, ring: 3 },
  { id: 'localai', label: 'LocalAI', angle: 95, ring: 2 },
  { id: 'mano-computer-simulator', label: 'Mano CPU', angle: 160, ring: 3 },
  { id: 'lorawan-sensor-node', label: 'LoRaWAN node', angle: 230, ring: 1 },
  { id: 'portfolio', label: 'ahmadsaad.dev', angle: 310, ring: 2 },
];

/** Seconds into the 14s cycle at which the sweep edge crosses this blip. */
function passTime(angle: number) {
  const compass = (90 + angle) % 360;
  const delta = (compass - SWEEP_EDGE + 360) % 360;
  return (delta / 360) * PERIOD;
}

/**
 * Three rings, a cross-hair, a rotating conic sweep and five labelled blips.
 * All CSS; the only script work is computing each blip's animation delay so
 * its flash lines up with the sweep. The labels are real text, so screen
 * readers hear the project names once (DESIGN.md sections 6 and 10).
 */
export function Radar() {
  return (
    <div className="radar">
      <div aria-hidden="true">
        <div className="radar-ring" data-ring="3" />
        <div className="radar-ring" data-ring="2" />
        <div className="radar-ring" data-ring="1" />
        <div className="radar-cross" data-axis="x" />
        <div className="radar-cross" data-axis="y" />
        <div className="radar-sweep" />
      </div>

      <ul className="radar-blips" aria-label="Projects on the radar">
        {BLIPS.map((blip) => {
          const compass = (90 + blip.angle) % 360;
          const style = {
            '--angle': `${blip.angle}deg`,
            '--ring': RING_RADIUS[blip.ring],
            '--delay': `${(passTime(blip.angle) - PERIOD).toFixed(2)}s`,
          } as CSSProperties;

          return (
            <li
              key={blip.id}
              style={style}
              data-side={compass > 180 ? 'left' : 'right'}
            >
              {blip.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
