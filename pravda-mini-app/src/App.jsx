import { useCallback, useState } from 'react'
import { useTelegram } from './hooks/useTelegram'
import BottomNav from './components/BottomNav'

import Onboarding from './screens/Onboarding'
import Home from './screens/Home'
import Result from './screens/Result'
import Premium from './screens/Premium'

// Simple state router — no external routing dependency.
const ROUTES = {
  ONBOARDING: 'onboarding',
  HOME: 'home',
  RESULT: 'result',
  PREMIUM: 'premium',
}

export default function App() {
  const { user, haptic, WebApp } = useTelegram()
  const [route, setRoute] = useState(ROUTES.ONBOARDING)
  const [activeDoc, setActiveDoc] = useState(null)

  const go = useCallback(
    (next) => {
      haptic.select()
      setRoute(next)
    },
    [haptic],
  )

  // --- Navigation handlers -------------------------------------------------
  const handleStart = () => go(ROUTES.HOME)

  const handleCheck = () => {
    haptic.impact('medium')
    setActiveDoc(null) // fresh upload → default mock analysis
    setRoute(ROUTES.RESULT)
  }

  const handleOpenDoc = (doc) => {
    setActiveDoc(doc)
    go(ROUTES.RESULT)
  }

  const handleUpgrade = () => go(ROUTES.PREMIUM)

  const handleSubscribe = (planId) => {
    haptic.notify('success')
    // Real payment flow (Telegram invoice) plugs in later.
    try {
      WebApp.showPopup?.({
        title: 'Скоро',
        message:
          planId === 'yearly'
            ? 'Годовой тариф за 2499₽ будет доступен в ближайшем обновлении.'
            : 'Месячный тариф за 350₽ будет доступен в ближайшем обновлении.',
        buttons: [{ type: 'ok' }],
      })
    } catch (e) {
      /* noop outside Telegram */
    }
  }

  const handleWriteGuide = () => {
    haptic.impact('light')
    try {
      WebApp.showPopup?.({
        title: 'Гайд → скидка 50%',
        message:
          'Напиши гайд о том, как Pravda помогла тебе с договором, и получи промокод на скидку 50%.',
        buttons: [{ type: 'ok' }],
      })
    } catch (e) {
      /* noop */
    }
  }

  // --- Render --------------------------------------------------------------
  const showNav = route === ROUTES.HOME || route === ROUTES.PREMIUM

  return (
    <div className="flex min-h-full flex-col bg-ink">
      <main className="flex-1">
        {route === ROUTES.ONBOARDING && (
          <Onboarding onStart={handleStart} user={user} />
        )}

        {route === ROUTES.HOME && (
          <Home user={user} onCheck={handleCheck} onOpenDoc={handleOpenDoc} />
        )}

        {route === ROUTES.RESULT && (
          <Result
            document={activeDoc}
            onBack={() => go(ROUTES.HOME)}
            onUpgrade={handleUpgrade}
          />
        )}

        {route === ROUTES.PREMIUM && (
          <Premium onSubscribe={handleSubscribe} onWriteGuide={handleWriteGuide} />
        )}
      </main>

      {showNav && <BottomNav current={route} onNavigate={go} />}
    </div>
  )
}
