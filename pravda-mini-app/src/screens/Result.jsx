import Screen from '../components/Screen'
import ClauseItem from '../components/ClauseItem'
import { contractAnalysis, STATUS } from '../data/mock'
import { useMainButton, useBackButton } from '../hooks/useTelegram'

function ScorePill({ status, count }) {
  const s = STATUS[status]
  return (
    <div
      className="flex flex-1 flex-col items-center rounded-2xl border py-3"
      style={{ borderColor: `${s.color}33`, backgroundColor: `${s.color}12` }}
    >
      <span className="text-2xl font-black" style={{ color: s.color }}>
        {count}
      </span>
      <span className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-muted">
        {s.emoji}
      </span>
    </div>
  )
}

export default function Result({ document, onBack, onUpgrade }) {
  const data = contractAnalysis
  const title = document?.title || data.documentTitle

  useBackButton(onBack, true)
  useMainButton({
    text: 'РАЗБЛОКИРОВАТЬ PREMIUM',
    onClick: onUpgrade,
    visible: true,
  })

  return (
    <Screen className="fade-in gap-5 pb-8 pt-6">
      {/* In-app back for browsers where Telegram's BackButton isn't present */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 self-start text-sm font-bold uppercase tracking-wide text-muted"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <path
            d="M15 5l-7 7 7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Назад
      </button>

      <header>
        <div className="text-[11px] font-bold uppercase tracking-widest text-lime">
          Результат проверки
        </div>
        <h1 className="display mt-2 text-3xl text-white">{title}</h1>
      </header>

      {/* Score summary */}
      <div className="flex gap-3">
        <ScorePill status="danger" count={data.score.danger} />
        <ScorePill status="warn" count={data.score.warn} />
        <ScorePill status="safe" count={data.score.safe} />
      </div>

      {/* Clause list */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-extrabold uppercase tracking-widest text-white">
          Пункты договора
        </h2>
        {data.clauses.map((clause) => (
          <ClauseItem key={clause.id} clause={clause} />
        ))}
      </section>

      <p className="text-center text-[11px] leading-relaxed text-muted">
        Разбор носит справочный характер и не является юридической консультацией.
      </p>
    </Screen>
  )
}
