import { useState } from 'react'
import { Box, Button, Flex, Tabs, Text } from '@radix-ui/themes'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Maximize2 } from 'lucide-react'
import { Figure } from './ui'

const panels = [
  { id: 'events', label: 'Twin events', figure: 'teaser', title: 'The same condition can produce different events.', text: 'Two executions share texture, speed, force and path. Synchronous fluctuations in sound and touch identify the individual interaction.' },
  { id: 'mechanism', label: 'The event gap', figure: 'col_mechanism', title: 'Correspondence comes from coupled dynamics.', text: 'Audio and haptics separate the same event from its twin. A path-only visual scan does not observe the event-specific contact.' },
  { id: 'method', label: 'CounterPoint', figure: 'framework', title: 'Keep the point. Compare the trajectories.', text: 'CounterPoint removes the temporal mean and scores agreement at matching instants, alongside the original point branch.' },
]

export default function ResearchGallery() {
  const [selected, setSelected] = useState('events')
  const reduceMotion = useReducedMotion()
  const panel = panels.find(item => item.id === selected)!
  return <Tabs.Root value={selected} onValueChange={setSelected} className="research-gallery">
    <Flex justify="between" align="center" gap="3" className="gallery-toolbar">
      <Tabs.List aria-label="Explore the research">{panels.map(item => <Tabs.Trigger value={item.id} key={item.id}>{item.label}</Tabs.Trigger>)}</Tabs.List>
      <Button asChild variant="ghost" size="1" className="original-figure"><a href={`./figures/${panel.figure}.png`} target="_blank" rel="noopener noreferrer"><Maximize2 size={14} />Original figure</a></Button>
    </Flex>
    <Tabs.Content value={selected} className="gallery-content" forceMount>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={selected} initial={{ opacity: 0, y: reduceMotion ? 0 : 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.16 }}>
          <Box className="gallery-image"><Figure name={panel.figure} caption={panel.text} /></Box>
          <Flex gap="4" direction={{ initial: 'column', sm: 'row' }} align={{ initial: 'start', sm: 'center' }} justify="between" className="gallery-description"><Text as="p" weight="medium">{panel.title}</Text><Text as="p" size="2" color="gray">{panel.text}</Text></Flex>
        </motion.div>
      </AnimatePresence>
    </Tabs.Content>
  </Tabs.Root>
}
