import { useEffect, useRef, useState } from 'react'
import ChatBubble from '../components/ChatBubble'
import { welcomeMessage, mockReply, suggestions } from '../data/mock'
import { useBackButton } from '../hooks/useTelegram'

export default function Chat({ thread, onBack, haptic }) {
  const [messages, setMessages] = useState(() => {
    const base = [welcomeMessage]
    // Opening an existing thread seeds it with a first user question.
    if (thread?.title) base.push({ role: 'user', text: thread.title })
    if (thread?.preview) base.push({ role: 'assistant', text: thread.preview })
    return base
  })
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useBackButton(onBack, true)

  // Auto-scroll to the newest message.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing])

  const send = (text) => {
    const value = (text ?? input).trim()
    if (!value || typing) return
    haptic?.impact('light')
    setMessages((m) => [...m, { role: 'user', text: value }])
    setInput('')
    setTyping(true)

    // Simulate the assistant thinking. Replace with a real API call later.
    const delay = 600 + Math.min(value.length * 18, 1400)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { role: 'assistant', text: mockReply(value) }])
      haptic?.notify('success')
    }, delay)
  }

  const showSuggestions = messages.length <= 1

  return (
    <div className="fade-in flex h-full flex-col bg-ink">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-white/[0.06] bg-ink/90 px-4 py-3 backdrop-blur">
        <button
          onClick={onBack}
          className="grid h-9 w-9 place-items-center rounded-full bg-card text-white"
          aria-label="Назад"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path
              d="M15 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] font-bold text-white">
            {thread?.title || 'Новый чат'}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-lime">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            Pravda AI · онлайн
          </div>
        </div>
      </header>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-4"
      >
        <div className="mx-auto w-full max-w-app space-y-3">
          {messages.map((m, i) => (
            <ChatBubble key={i} role={m.role} text={m.text} />
          ))}
          {typing && <ChatBubble role="assistant" typing />}

          {showSuggestions && (
            <div className="space-y-2 pt-2">
              <div className="px-1 text-[11px] font-bold uppercase tracking-widest text-muted">
                Попробуйте спросить
              </div>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="block w-full rounded-2xl border border-white/[0.08] bg-card px-4 py-3 text-left text-sm text-white/90 transition-transform active:scale-[0.98]"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-white/[0.06] bg-ink px-3 pb-[max(env(safe-area-inset-bottom),10px)] pt-3">
        <div className="mx-auto flex w-full max-w-app items-end gap-2">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                send()
              }
            }}
            placeholder="Опишите ситуацию…"
            className="no-scrollbar max-h-28 min-h-[46px] w-full resize-none rounded-3xl bg-card border border-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-muted focus:border-lime/40 focus:outline-none"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || typing}
            className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-lime text-ink transition-transform active:scale-95 disabled:opacity-40"
            aria-label="Отправить"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path
                d="M4 12l16-8-6 16-2.5-6.5L4 12z"
                stroke="#0D0D0D"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
