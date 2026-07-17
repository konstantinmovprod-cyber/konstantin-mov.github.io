import { useMemo, useState } from 'react'
import Screen from '../components/Screen'
import ThreadItem from '../components/ThreadItem'
import { greeting, threads as allThreads } from '../data/mock'

export default function Home({ user, onOpenThread, onNewChat }) {
  const [query, setQuery] = useState('')
  const hello = useMemo(() => greeting(), [])
  const name = user?.firstName || 'друг'

  const filtered = allThreads.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.preview.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <Screen className="fade-in gap-5 pb-6 pt-8">
      {/* Greeting header */}
      <header className="flex items-start justify-between">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-lime">
            Pravda AI
          </div>
          <h1 className="mt-1 text-2xl font-extrabold leading-tight text-white">
            {hello},<br />
            {name}!
          </h1>
        </div>
        {user?.photoUrl ? (
          <img
            src={user.photoUrl}
            alt=""
            className="h-11 w-11 rounded-full object-cover ring-2 ring-lime/40"
          />
        ) : (
          <div className="grid h-11 w-11 place-items-center rounded-full bg-card text-sm font-bold text-lime ring-1 ring-white/10">
            {name.slice(0, 1).toUpperCase()}
          </div>
        )}
      </header>

      {/* New chat CTA */}
      <button
        onClick={onNewChat}
        className="flex w-full items-center gap-4 rounded-3xl bg-lime p-5 text-left text-ink shadow-glow transition-transform active:scale-[0.98]"
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink/10">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="#0D0D0D"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="min-w-0">
          <span className="block text-lg font-extrabold uppercase leading-none tracking-wide">
            Новый чат
          </span>
          <span className="mt-1 block text-sm font-semibold text-ink/70">
            Спросите AI-юриста о чём угодно
          </span>
        </span>
      </button>

      {/* Search */}
      <div className="flex items-center gap-2 rounded-2xl bg-card border border-white/[0.06] px-4 py-3">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-muted" fill="none">
          <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по чатам"
          className="w-full bg-transparent text-sm text-white placeholder:text-muted focus:outline-none"
        />
      </div>

      {/* Recent threads */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-white">
            Недавние чаты
          </h2>
          <span className="text-xs font-semibold text-muted">{filtered.length}</span>
        </div>

        {filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">Ничего не найдено</p>
        ) : (
          filtered.map((t) => <ThreadItem key={t.id} thread={t} onOpen={onOpenThread} />)
        )}
      </section>
    </Screen>
  )
}
