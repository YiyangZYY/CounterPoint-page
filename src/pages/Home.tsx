import { Link } from 'react-router-dom'
import { Badge, Box, Button, Card, Flex, Grid, Heading, Separator, Text } from '@radix-ui/themes'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, ArrowUpRight, BookOpen, FileText, Layers2, Plus, Quote } from 'lucide-react'
import ResearchGallery from '../components/ResearchGallery'
import { Figure } from '../components/ui'
import { AUTHORS, INTRO_QUESTION, LINKS } from '../site'

export default function Home() {
  const reduceMotion = useReducedMotion()
  return <>
    <section className="paper-hero">
      <div className="wrap">
        <motion.div className="paper-intro" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <Badge variant="surface" color="gray" size="2">arXiv:2611.24249</Badge>
          <h1>From points to trajectories.</h1>
          <p className="paper-subtitle">Rethinking Multimodal Alignment for Physical Events</p>
          <p className="hero-motivation">Physical AI must perceive how the world unfolds. We study what multimodal representations retain about the dynamics of an interaction.</p>
          <Flex wrap="wrap" gap="4" justify="center" className="authors">{AUTHORS.map((name, i) => <Text key={name} size="2">{name}<sup>{i === 3 ? '2' : '1'}</sup></Text>)}</Flex>
          <Text as="p" size="2" color="gray" className="institutions">¹ Nanyang Technological University <span>² Zhejiang University</span></Text>
          <Flex gap="3" justify="center" wrap="wrap" className="hero-actions"><Button asChild size="3" highContrast><a href={LINKS.paper}><FileText size={17} />Read the paper</a></Button><Button asChild variant="surface" size="3"><Link to="/results">Explore the results<ArrowRight size={16} /></Link></Button></Flex>
        </motion.div>
        <Box id="overview" className="question-panel">
          <Quote size={24} strokeWidth={1.5} aria-hidden="true" />
          <h2 className="intro-question">{INTRO_QUESTION}</h2>
          <p>The central question of this work. Matching the setup is not enough to establish correspondence between physical events.</p>
        </Box>
      </div>
    </section>

    <section id="twins" className="gallery-section"><div className="wrap">
      <div className="section-title"><div><h2>A closer look at physical correspondence.</h2><p>One interaction, multiple sensors. Repeating the setup exposes what alignment actually learns.</p></div><Button asChild variant="ghost"><Link to="/findings">Read the findings<ArrowUpRight size={15} /></Link></Button></div>
      <ResearchGallery />
    </div></section>

    <section id="method" className="method-section"><div className="wrap method-layout">
      <div className="method-copy"><Badge variant="soft" color="gray"><Layers2 size={13} />The CounterPoint module</Badge><h2>A trajectory branch for physical events.</h2><p>Points describe the condition. CounterPoint adds the synchronous evidence that identifies an individual execution.</p><p>The base aligner keeps its original loss and geometry. The trajectory branch adds <strong>0.4% parameters</strong>.</p><Button asChild variant="surface" size="3"><Link to="/findings"><BookOpen size={16} />Theory & mechanism</Link></Button></div>
      <Box className="method-visual"><Figure name="framework" caption="The original point branch captures the condition. A new branch demeans the token sequence and scores agreement at matching instants." /></Box>
    </div><div className="wrap"><Grid columns={{ initial: '1', sm: '3' }} gap="5" className="method-notes">
      <Box><Text as="p" size="3" weight="medium">Remove the mean</Text><Text as="p" size="2" color="gray">Center each recording in a shared 64-dimensional space.</Text></Box>
      <Box><Text as="p" size="3" weight="medium">Match the instants</Text><Text as="p" size="2" color="gray">Compare cross-modal dynamics on the shared capture clock.</Text></Box>
      <Box><Text as="p" size="3" weight="medium">Contrast the twins</Text><Text as="p" size="2" color="gray">Train with twin-event negatives whenever present.</Text></Box>
    </Grid></div></section>

    <section id="datasets" className="experiment-section"><div className="wrap">
      <div className="section-title"><div><h2>Two ways to repeat an interaction.</h2><p>Controlled robot strokes and free-hand slides test the theory under different physical regimes.</p></div></div>
      <Grid columns={{ initial: '1', sm: '2' }} gap="5">
        <Card size="4" className="dataset-card"><Flex justify="between" align="start" gap="3"><Heading as="h3" size="5">Cluster Haptic Texture</Heading><Badge color="gray" variant="surface">Controlled</Badge></Flex><Text as="p" color="gray" mt="3">Twins share texture, speed, force and path. Audio and haptics observe event-specific contact; path-only vision does not.</Text><Separator size="4" my="5" /><Flex gap="5" wrap="wrap"><Text size="2">118 textures</Text><Text size="2">1 s windows</Text><Text size="2">Held-out conditions</Text></Flex></Card>
        <Card size="4" className="dataset-card"><Flex justify="between" align="start" gap="3"><Heading as="h3" size="5">HAVdb</Heading><Badge color="gray" variant="surface">Free-hand</Badge></Flex><Text as="p" color="gray" mt="3">Separate slides by the same subject on the same texture share the setup, with independent motion and contact dynamics.</Text><Separator size="4" my="5" /><Flex gap="5" wrap="wrap"><Text size="2">10 subjects</Text><Text size="2">16 s windows</Text><Text size="2">Held-out subjects</Text></Flex></Card>
      </Grid>
      <Flex justify="between" align="center" gap="5" wrap="wrap" className="scope-line"><Text size="2" color="gray">Event evidence must be observed by both sensor streams.</Text><Button asChild variant="ghost"><Link to="/supplement">Protocols & assumptions<ArrowUpRight size={15} /></Link></Button></Flex>
    </div></section>

    <section id="results" className="home-results"><div className="wrap">
      <div className="section-title"><div><h2>From a shared condition to a specific event.</h2><p>Consistent retrieval gains across GRAM, HyperGRAM, PMRL and TRIANGLE.</p></div><Button asChild variant="surface"><Link to="/results">All experimental results<ArrowRight size={15} /></Link></Button></div>
      <Grid columns={{ initial: '1', sm: '2' }} gap="6" className="result-grid">
        <Box><Text as="p" size="3" weight="medium">HAVdb visual retrieval</Text><Flex align="center" gap="5" className="score-pair"><span>≤10.1%</span><ArrowRight size={24} strokeWidth={1.25} /><strong>≥93.7%</strong></Flex><Text as="p" size="2" color="gray">Recall@1 on free-hand interactions</Text></Box>
        <Box><Text as="p" size="3" weight="medium">Cluster audio–haptic retrieval</Text><Flex align="center" gap="5" className="score-pair"><span>≤27.4%</span><ArrowRight size={24} strokeWidth={1.25} /><strong>≥56.0%</strong></Flex><Text as="p" size="2" color="gray">Mean Recall@1 of AV→H and HV→A</Text></Box>
      </Grid>
      <Flex gap="2" align="center" className="score-legend"><span className="legend-base">Point aligners</span><Plus size={12} /><span>CounterPoint trajectory branch</span></Flex>
    </div></section>
  </>
}
