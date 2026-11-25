import { useId, useState } from 'react'
const events = [48, 112, 184, 262, 342, 408]
function signal(y: number, twin: boolean, haptic: boolean) {
  return Array.from({ length: 460 }, (_, i) => {
    const burst = events.reduce((v, t) => {
      const d = i - t - (twin ? 22 : 0)
      return v + (d >= 0 && d < 22 ? Math.sin(d * (haptic ? 1.48 : 1.7)) * Math.exp(-d / 6) * 24 : 0)
    }, 0)
    return `${i ? 'L' : 'M'}${i * 1.44 + 90},${y + Math.sin(i / 40) * 3 + burst}`
  }).join(' ')
}
export default function TrajectoryDemo() {
  const [pooled, setPooled] = useState(false)
  const descriptionId = useId()
  return <div className={`trajectory-demo ${pooled ? 'is-pooled' : ''}`}>
    <div className="demo-header">
      <span>Two executions. One shared condition.</span>
      <div className="demo-switch" role="group" aria-label="Representation">
        <button type="button" aria-pressed={!pooled} onClick={() => setPooled(false)}>Trajectories</button>
        <button type="button" aria-pressed={pooled} onClick={() => setPooled(true)}>Pooled points</button>
      </div>
    </div>
    <svg viewBox="0 0 760 200" role="img" aria-describedby={descriptionId} aria-label={pooled ? 'Pooling removes time: the event and its twin have identical condition representations in this schematic.' : 'Audio and touch fluctuate together in each event, at different instants from its twin.'}>
      <text x="0" y="50" className="event-label">Event x</text>
      <text x="0" y="144" className="event-label">Twin x′</text>
      {!pooled && <>
        {events.map(t => <g key={t} className="event-window"><rect x={t * 1.44 + 88} y="12" width="14" height="68" /><rect x={(t + 22) * 1.44 + 88} y="106" width="14" height="68" /></g>)}
        {[30, 64, 124, 158].map((y, i) => <path key={y} d={signal(y, i > 1, Boolean(i % 2))} className={i % 2 ? 'signal-haptic' : 'signal-audio'} />)}
        <path d="M90 88H752 M90 182H752" className="demo-axis" />
        <text x="752" y="198" textAnchor="end" className="axis-label">Shared capture clock</text>
      </>}
      {pooled && <>
        <path d="M120 46H320 M120 140H320 M360 46H560 M360 140H560" className="pool-connectors" />
        {[46, 140].map(y => <g key={y}><circle cx="340" cy={y} r="13" className="point-audio" /><circle cx="580" cy={y} r="13" className="point-haptic" /></g>)}
        <text x="340" y="96" textAnchor="middle" className="axis-label">Audio mean</text>
        <text x="580" y="96" textAnchor="middle" className="axis-label">Touch mean</text>
        <text x="460" y="192" textAnchor="middle" className="axis-label">Same condition, no temporal evidence</text>
      </>}
    </svg>
    <div className="demo-key"><span><i className="audio-dot" />Audio</span><span><i className="haptic-dot" />Touch</span><span className="demo-state" aria-live="polite">{pooled ? 'Event identity is lost' : 'Synchrony distinguishes the event'}</span></div>
    <p id={descriptionId} className="demo-note">Conceptual illustration of the paper’s argument; not measured sensor data.</p>
  </div>
}
