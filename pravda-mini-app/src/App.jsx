import { useCallback, useState } from 'react'
import { useTelegram } from './hooks/useTelegram'
import BottomNav from './components/BottomNav'

import Onboarding from './screens/Onboarding'
import Home from './screens/Home'
import Chat from './screens/Chat'
import Premium from './screens/Premium'

// Simple state router — no external routing dependency.
const ROUTES = {
  ONBOARDING: 'onboarding',
  HOME: 'home',
  CHAT: 'chat',
  PREMIUM: 'premium',
}

export default function App() {
  const { user, haptic, WebApp } = useTelegram()
  const [route, setRoute] = useState(ROUTES.ONBOARDING)
  const [activeThread, setActiveThread] = useState(null)

  const go = useCallback(
    (next) => {
      haptic.select()
      setRoute(next)
    },
    [haptic],
  )

  // --- Navigation handlers -------------------------------------------------
  const handleStart = () => go(ROUTES.HOME)

  const handleNewChat = () => {
    haptic.impact('medium')
    setActiveThread(null)
    setRoute(ROUTES.CHAT)
  }

  const handleOpenThread = (thread) => {
    setActiveThread(thread)
    go(ROUTES.CHAT)
  }

  const handleSubscribe = (planId) => {
    haptic.notify('success')
    try {
      WebApp.showPopup?.({
        title: 'Скоро',
        message:
          planId === 'yearly'
            ? 'Годовой тариф за 2499₽ будет доступен в ближайшем обновлении.'
            : 'Месячный тариф за 395₽ будет доступен в ближайшем обновлении.',
        buttons: [{ type: 'ok' }],
      })
    } catch (e) {
      /* noop outside Telegram */
    }
  }

  // --- Render --------------------------------------------------------------
  const showNav = route === ROUTES.HOME || route === ROUTES.PREMIUM

  return (
    <div className="flex h-full flex-col bg-ink">
      <main className="min-h-0 flex-1">
        {route === ROUTES.ONBOARDING && <Onboarding onStart={handleStart} user={user} />}

        {route === ROUTES.HOME && (
          <Home user={user} onOpenThread={handleOpenThread} onNewChat={handleNewChat} />
        )}

        {route === ROUTES.CHAT && (
          <Chat thread={activeThread} onBack={() => go(ROUTES.HOME)} haptic={haptic} />
        )}

        {route === ROUTES.PREMIUM && <Premium onSubscribe={handleSubscribe} />}
      </main>

      {showNav && <BottomNav current={route} onNavigate={go} />}
    </div>
  )
}
