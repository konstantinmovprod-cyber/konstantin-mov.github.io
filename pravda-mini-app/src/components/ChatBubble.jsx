/**
 * A single chat message bubble.
 * - assistant: dark card, left-aligned
 * - user: lime, ink text, right-aligned
 */
export default function ChatBubble({ role, text, typing = false }) {
  const isUser = role === 'user'

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[82%] rounded-3xl px-4 py-3 text-[14px] leading-relaxed ${
          isUser
            ? 'bg-lime text-ink rounded-br-lg font-medium'
            : 'bg-card text-white border border-white/[0.06] rounded-bl-lg'
        }`}
      >
        {typing ? <TypingDots /> : text}
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-0.5" aria-label="печатает">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-muted"
          style={{ animation: `blink 1.2s ${i * 0.2}s infinite ease-in-out` }}
        />
      ))}
    </span>
  )
}
