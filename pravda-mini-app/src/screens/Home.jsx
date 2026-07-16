import { useRef, useState } from 'react'
import Screen from '../components/Screen'
import Card from '../components/Card'
import StatusBadge from '../components/StatusBadge'
import Logo from '../components/Logo'
import { recentDocuments } from '../data/mock'

function UploadButton({ onFile }) {
  const inputRef = useRef(null)

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFile?.(file)
          e.target.value = '' // allow re-selecting the same file
        }}
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="group relative flex w-full items-center gap-4 overflow-hidden rounded-3xl bg-lime p-5 text-left text-ink shadow-glow transition-transform active:scale-[0.98]"
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink/10">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
            <path
              d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 20h14"
              stroke="#0D0D0D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="min-w-0">
          <span className="block text-lg font-extrabold uppercase leading-none tracking-wide">
            Проверить договор
          </span>
          <span className="mt-1 block text-sm font-semibold text-ink/70">
            Загрузите PDF — разберём по пунктам
          </span>
        </span>
      </button>
    </div>
  )
}

export default function Home({ user, onCheck, onOpenDoc }) {
  const [fileName, setFileName] = useState('')

  const handleFile = (file) => {
    setFileName(file.name)
    // Backend hookup goes here later; for now go straight to the mock result.
    onCheck?.(file)
  }

  return (
    <Screen className="fade-in gap-6 pb-6 pt-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={40} glow={false} />
          <div>
            <div className="display text-lg text-white">PRAVDA</div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              {user?.firstName ? `Привет, ${user.firstName}` : 'Юрист в кармане'}
            </div>
          </div>
        </div>
        {user?.photoUrl ? (
          <img
            src={user.photoUrl}
            alt=""
            className="h-10 w-10 rounded-full object-cover ring-2 ring-lime/40"
          />
        ) : (
          <div className="grid h-10 w-10 place-items-center rounded-full bg-card text-sm font-bold text-lime ring-1 ring-white/10">
            {(user?.firstName || 'U').slice(0, 1).toUpperCase()}
          </div>
        )}
      </header>

      {/* Primary action */}
      <UploadButton onFile={handleFile} />
      {fileName && (
        <p className="-mt-3 text-xs text-muted">
          Загружен файл: <span className="text-white/80">{fileName}</span>
        </p>
      )}

      {/* Recent documents */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-white">
            Недавние документы
          </h2>
          <span className="text-xs font-semibold text-muted">
            {recentDocuments.length}
          </span>
        </div>

        {recentDocuments.map((doc) => (
          <Card key={doc.id} as="button" onClick={() => onOpenDoc?.(doc)}>
            <div className="flex items-center gap-3">
              <StatusBadge status={doc.status} variant="dot" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-bold text-white">
                  {doc.title}
                </div>
                <div className="mt-0.5 truncate text-xs text-muted">
                  {doc.date} · {doc.pages} стр · {doc.summary}
                </div>
              </div>
              <StatusBadge status={doc.status} showEmoji={false} />
            </div>
          </Card>
        ))}
      </section>
    </Screen>
  )
}
