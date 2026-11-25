import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
export default function SubNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string>()
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const current = entries.find(entry => entry.isIntersecting)
      if (current) setActive(current.target.id)
      else if (window.scrollY < 100) setActive(undefined)
    }, { rootMargin: '-22% 0px -55% 0px' })
    items.forEach(({ id }) => { const element = document.getElementById(id); if (element) observer.observe(element) })
    return () => observer.disconnect()
  }, [items])
  useEffect(() => {
    if (!hash) return
    const element = document.getElementById(hash.slice(1))
    element?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }, [hash])
  return <div className="subnav"><div className="wrap subnav-inner">
    <nav aria-label="Page sections">{items.map(item => <a href={`#${pathname}#${item.id}`} key={item.id} aria-current={active === item.id ? 'location' : undefined} onClick={event => {
      event.preventDefault()
      if (hash === `#${item.id}`) document.getElementById(item.id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
      else navigate({ pathname, hash: `#${item.id}` })
      setActive(item.id)
    }}>{item.label}</a>)}</nav>
    <Link className="btn" to="/results">Compare results</Link>
  </div></div>
}
