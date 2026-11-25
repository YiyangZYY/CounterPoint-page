import { useState } from 'react'
import type { ReactNode } from 'react'
import { Button, Dialog, Flex, IconButton, Text } from '@radix-ui/themes'
import { Check, Copy, Download, X } from 'lucide-react'

export function Section({ id, label, title, children, alt = false }: { id: string; label: string; title: string; children: ReactNode; alt?: boolean }) {
  return <section id={id} className={`band ${alt ? 'alt' : ''}`}><div className="wrap"><div className="head"><p className="label">{label}</p><h2>{title}</h2></div>{children}</div></section>
}
const figureSizes: Record<string, readonly [number, number]> = { col_mechanism: [2200, 948], col_scaling: [2200, 948], col_tsne_cluster: [2200, 1143], framework: [2200, 1094], margin_dist: [2200, 1400], row_law: [2200, 1101], teaser: [2200, 863], visual: [1811, 2200] }
export function Figure({ name, caption }: { name: string; caption: string }) {
  const source = `./figures/${name}.png`
  return <figure className="paper-figure">
    <Dialog.Root>
      <Dialog.Trigger><button className="figure-trigger" type="button" aria-label={`Enlarge figure: ${caption}`}><img src={source} alt={caption} width={figureSizes[name]?.[0]} height={figureSizes[name]?.[1]} loading="lazy" /></button></Dialog.Trigger>
      <Dialog.Content maxWidth="1400px" className="figure-modal">
        <Flex align="center" justify="between" gap="4" className="figure-modal-bar"><Dialog.Title size="3" mb="0">Figure from the paper</Dialog.Title><Flex gap="3" align="center"><Button asChild variant="soft" size="2"><a href={source} target="_blank" rel="noopener noreferrer"><Download size={15} />Original</a></Button><Dialog.Close><IconButton variant="ghost" aria-label="Close figure"><X size={20} /></IconButton></Dialog.Close></Flex></Flex>
        <img src={source} alt={caption} width={figureSizes[name]?.[0]} height={figureSizes[name]?.[1]} />
        <Dialog.Description size="2">{caption}</Dialog.Description>
      </Dialog.Content>
    </Dialog.Root>
    <figcaption>{caption}</figcaption>
  </figure>
}
export function CopyBlock({ text }: { text: string }) {
  const [status, setStatus] = useState('Copy BibTeX')
  return <div className="citation"><div className="citation-head"><Text size="2" weight="medium">BibTeX citation</Text><Button variant="surface" size="2" onClick={async () => { try { await navigator.clipboard.writeText(text); setStatus('Copied') } catch { setStatus('Select text to copy') } }}>{status === 'Copied' ? <Check size={15} /> : <Copy size={15} />}{status}</Button></div><pre tabIndex={0}>{text}</pre><span className="sr-only" role="status">{status}</span></div>
}
