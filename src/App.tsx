import { lazy, Suspense, useEffect } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { Button, DropdownMenu, IconButton, Spinner } from '@radix-ui/themes'
import { ArrowUpRight, Menu } from 'lucide-react'
import Home from './pages/Home'
import { LINKS } from './site'

const Results = lazy(() => import('./pages/Results'))
const Findings = lazy(() => import('./pages/Findings'))
const Supplement = lazy(() => import('./pages/Supplement'))
const Paper = lazy(() => import('./pages/Paper'))
const destinations = [['/findings', 'Findings'], ['/results', 'Results'], ['/paper', 'Paper'], ['/supplement', 'Supplement']] as const

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${pathname === '/' ? 'From Points to Trajectories' : pathname.slice(1).replace(/^./, c => c.toUpperCase())} | CounterPoint`
  }, [pathname])
  return <>
    <a className="skip" href="#main" onClick={event => { event.preventDefault(); document.getElementById('main')?.focus() }}>Skip to content</a>
    <header className="topbar"><div className="wrap topbar-inner">
      <NavLink className="brand" to="/" aria-label="CounterPoint home"><img src="./brand/counterpoint.png" width="1701" height="367" alt="CounterPoint" /></NavLink>
      <nav className="desktop-nav" aria-label="Main">{destinations.map(([to, title]) => <NavLink key={to} to={to}>{title}</NavLink>)}</nav>
      <Button asChild variant="outline" size="2" className="header-paper"><a href={LINKS.arxiv}>View on arXiv<ArrowUpRight size={14} /></a></Button>
      <div className="mobile-navigation"><DropdownMenu.Root>
        <DropdownMenu.Trigger><IconButton id="menu-toggle" size="3" variant="ghost" aria-label="Open navigation"><Menu size={22} /></IconButton></DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" size="2">{destinations.map(([to, title]) => <DropdownMenu.Item asChild key={to}><Link to={to}>{title}</Link></DropdownMenu.Item>)}<DropdownMenu.Separator /><DropdownMenu.Item asChild><a href={LINKS.arxiv}>View on arXiv<ArrowUpRight size={14} /></a></DropdownMenu.Item></DropdownMenu.Content>
      </DropdownMenu.Root></div>
    </div></header>
    <main id="main" tabIndex={-1}>
      <Suspense fallback={<div className="page-loading" role="status"><Spinner size="3" /><span>Loading research</span></div>}>
        <Routes><Route path="/" element={<Home />} /><Route path="/results" element={<Results />} /><Route path="/findings" element={<Findings />} /><Route path="/paper" element={<Paper />} /><Route path="/supplement" element={<Supplement />} /><Route path="*" element={<section className="wrap band"><h1>Page not found</h1><Button asChild mt="5"><Link to="/">Return to CounterPoint</Link></Button></section>} /></Routes>
      </Suspense>
    </main>
    <footer className="footer"><div className="wrap footer-inner">
      <Link className="footer-brand" to="/">CounterPoint<span>From points to trajectories.</span></Link>
      <p>Nanyang Technological University<br />Zhejiang University</p>
      <div><Link to="/paper">Paper & resources</Link><a href={LINKS.arxiv}>arXiv<ArrowUpRight size={13} /></a><span>© 2026 CounterPoint</span></div>
    </div></footer>
  </>
}
