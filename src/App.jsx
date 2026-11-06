import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { slides, slideTitles } from './slides.jsx'
import './App.css'

const W = 1920
const H = 1080

function useStageScale() {
  const [scale, setScale] = useState(1)
  useLayoutEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  return scale
}

function readHash() {
  const n = parseInt(window.location.hash.slice(1), 10)
  return Number.isFinite(n) && n >= 1 && n <= slides.length ? n - 1 : 0
}

export default function App() {
  const scale = useStageScale()
  const [[index, dir], setState] = useState(() => [readHash(), 1])
  const [overview, setOverview] = useState(false)
  const touchX = useRef(null)

  const go = useCallback((next) => {
    setState(([cur]) => {
      const n = Math.max(0, Math.min(slides.length - 1, next(cur)))
      return n === cur ? [cur, 1] : [n, n > cur ? 1 : -1]
    })
  }, [])
  const next = useCallback(() => go((i) => i + 1), [go])
  const prev = useCallback(() => go((i) => i - 1), [go])

  useEffect(() => {
    window.history.replaceState(null, '', `#${index + 1}`)
  }, [index])

  useEffect(() => {
    const onHash = () => go(() => readHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [go])

  useEffect(() => {
    const onKey = (e) => {
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) {
        e.preventDefault()
        if (!overview) next()
      } else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) {
        e.preventDefault()
        if (!overview) prev()
      } else if (e.key === 'Home') go(() => 0)
      else if (e.key === 'End') go(() => slides.length - 1)
      else if (e.key.toLowerCase() === 'f') toggleFullscreen()
      else if (e.key.toLowerCase() === 'g' || e.key === 'Escape') setOverview((o) => (e.key === 'Escape' ? false : !o))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, go, overview])

  const Slide = slides[index]

  return (
    <div
      className="viewport"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)()
        touchX.current = null
      }}
    >
      <div className="stage" style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})` }}>
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={index}
            className="slide-wrap"
            custom={dir}
            variants={{
              enter: (d) => ({ x: d * 140, opacity: 0, filter: 'blur(8px)' }),
              center: { x: 0, opacity: 1, filter: 'blur(0px)' },
              exit: (d) => ({ x: d * -140, opacity: 0, filter: 'blur(8px)' }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Slide />
          </motion.div>
        </AnimatePresence>
        <div className="click-zone left" onClick={prev} />
        <div className="click-zone right" onClick={next} />
      </div>

      <div className="progress">
        <motion.div
          className="progress-fill"
          animate={{ width: `${((index + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="hud">
        <button onClick={prev} disabled={index === 0} aria-label="Попередній слайд">
          ‹
        </button>
        <span className="hud-count">
          {index + 1} / {slides.length}
        </span>
        <button onClick={next} disabled={index === slides.length - 1} aria-label="Наступний слайд">
          ›
        </button>
        <i className="hud-sep" />
        <button onClick={() => setOverview(true)} aria-label="Усі слайди" title="Усі слайди (G)">
          ▦
        </button>
        <button onClick={toggleFullscreen} aria-label="На весь екран" title="На весь екран (F)">
          ⛶
        </button>
      </div>

      <AnimatePresence>
        {overview && (
          <motion.div
            className="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOverview(false)}
          >
            <div className="overview-grid" onClick={(e) => e.stopPropagation()}>
              {slideTitles.map((t, i) => (
                <motion.button
                  key={t}
                  className={`thumb ${i === index ? 'active' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.025 }}
                  onClick={() => {
                    go(() => i)
                    setOverview(false)
                  }}
                >
                  <b>{String(i + 1).padStart(2, '0')}</b>
                  <span>{t}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen()
  else document.documentElement.requestFullscreen?.()
}
