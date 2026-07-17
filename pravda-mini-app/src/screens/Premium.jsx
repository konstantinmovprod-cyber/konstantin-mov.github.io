import { useState } from 'react'
import Screen from '../components/Screen'
import PillButton from '../components/PillButton'
import Logo from '../components/Logo'
import { plans, premiumPerks } from '../data/mock'
import { useMainButton } from '../hooks/useTelegram'

function PlanCard({ plan, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(plan.id)}
      className={`relative flex w-full items-center justify-between rounded-3xl border p-5 text-left transition-transform active:scale-[0.98] ${
        selected ? 'border-lime bg-lime/10 shadow-glow' : 'border-white/10 bg-card'
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-2 right-5 rounded-pill bg-lime px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-ink">
          {plan.badge}
        </span>
      )}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-widest text-muted">
          {plan.title}
        </div>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-3xl font-black text-white">{plan.price}</span>
          <span className="text-sm font-semibold text-muted">{plan.period}</span>
        </div>
        <div className="mt-1 text-xs text-muted">{plan.note}</div>
      </div>

      <span
        className={`grid h-6 w-6 place-items-center rounded-full border-2 ${
          selected ? 'border-lime bg-lime' : 'border-white/25'
        }`}
      >
        {selected && (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path
              d="M5 12.5l4 4 10-10"
              stroke="#0D0D0D"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  )
}

export default function Premium({ onSubscribe }) {
  const [selected, setSelected] = useState('yearly')

  useMainButton({
    text: 'ОФОРМИТЬ PREMIUM',
    onClick: () => onSubscribe?.(selected),
    visible: true,
  })

  return (
    <Screen className="fade-in gap-6 pb-8 pt-8">
      <header className="flex flex-col items-center text-center">
        <Logo size={64} />
        <div className="mt-4 text-[11px] font-bold uppercase tracking-widest text-lime">
          Pravda Premium
        </div>
        <h1 className="display mt-2 text-4xl text-white">
          БЕЗ<br />
          <span className="text-lime">ЛИМИТОВ</span>
        </h1>
        <p className="mx-auto mt-3 max-w-[18rem] text-sm text-muted">
          Задавайте AI-юристу столько вопросов, сколько нужно.
        </p>
      </header>

      {/* Perks */}
      <ul className="flex flex-col gap-2.5">
        {premiumPerks.map((perk) => (
          <li key={perk} className="flex items-center gap-3 text-sm text-white/90">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime/15">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <path
                  d="M5 12.5l4 4 10-10"
                  stroke="#C4F82A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {perk}
          </li>
        ))}
      </ul>

      {/* Plans */}
      <div className="flex flex-col gap-3">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            selected={selected === plan.id}
            onSelect={setSelected}
          />
        ))}
      </div>

      <PillButton onClick={() => onSubscribe?.(selected)} full>
        Оформить Premium
      </PillButton>
    </Screen>
  )
}
