import { useEffect, useMemo, useState } from 'react'
import WebApp from '@twa-dev/sdk'

/**
 * Central hook for talking to the Telegram WebApp runtime.
 *
 * - Initializes the WebApp (ready + expand) once on mount.
 * - Applies the dark design-system theme colors to the Telegram chrome.
 * - Exposes the current user (from initData), MainButton + BackButton helpers,
 *   and haptic feedback.
 *
 * The @twa-dev/sdk gracefully no-ops when the app runs outside Telegram
 * (e.g. in a normal browser during development), so all of this is safe.
 */
export function useTelegram() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      WebApp.ready()
      WebApp.expand()
      // Lock the chrome to the design system palette.
      WebApp.setHeaderColor('#0D0D0D')
      WebApp.setBackgroundColor('#0D0D0D')
      // Ask Telegram to confirm before the user swipes the app closed.
      WebApp.enableClosingConfirmation?.()
    } catch (e) {
      // Running outside Telegram — ignore.
    } finally {
      setReady(true)
    }
  }, [])

  const user = useMemo(() => {
    const u = WebApp.initDataUnsafe?.user
    if (!u) return null
    return {
      id: u.id,
      firstName: u.first_name || '',
      lastName: u.last_name || '',
      username: u.username || '',
      fullName: [u.first_name, u.last_name].filter(Boolean).join(' '),
      photoUrl: u.photo_url || '',
    }
  }, [ready])

  const haptic = useMemo(
    () => ({
      impact: (style = 'light') => {
        try {
          WebApp.HapticFeedback.impactOccurred(style)
        } catch (e) {
          /* noop */
        }
      },
      notify: (type = 'success') => {
        try {
          WebApp.HapticFeedback.notificationOccurred(type)
        } catch (e) {
          /* noop */
        }
      },
      select: () => {
        try {
          WebApp.HapticFeedback.selectionChanged()
        } catch (e) {
          /* noop */
        }
      },
    }),
    [],
  )

  return { WebApp, ready, user, haptic }
}

/**
 * Declaratively drive Telegram's native MainButton.
 * Renders nothing — it just wires the button up while mounted, and cleans
 * up (hides + unbinds) on unmount or when `visible` goes false.
 */
export function useMainButton({ text, onClick, visible = true, color = '#C4F82A', textColor = '#0D0D0D' }) {
  useEffect(() => {
    const btn = WebApp.MainButton
    if (!btn) return

    if (!visible) {
      btn.hide()
      return
    }

    btn.setParams({ text, color, text_color: textColor, is_active: true, is_visible: true })

    const handler = () => onClick?.()
    btn.onClick(handler)

    return () => {
      btn.offClick(handler)
      btn.hide()
    }
  }, [text, onClick, visible, color, textColor])
}

/**
 * Declaratively drive Telegram's native BackButton.
 */
export function useBackButton(onBack, visible = true) {
  useEffect(() => {
    const btn = WebApp.BackButton
    if (!btn) return

    if (!visible) {
      btn.hide()
      return
    }

    btn.show()
    const handler = () => onBack?.()
    btn.onClick(handler)

    return () => {
      btn.offClick(handler)
      btn.hide()
    }
  }, [onBack, visible])
}
