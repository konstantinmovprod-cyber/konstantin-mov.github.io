import Screen from '../components/Screen'
import Logo from '../components/Logo'
import PillButton from '../components/PillButton'
import { useMainButton } from '../hooks/useTelegram'

export default function Onboarding({ onStart, user }) {
  useMainButton({ text: 'НАЧАТЬ', onClick: onStart, visible: true })

  return (
    <Screen className="fade-in justify-between py-10">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <Logo size={96} />

        <h1 className="display mt-10 text-5xl text-white">
          PRAVDA <span className="text-lime">AI</span>
        </h1>

        <p className="mt-4 max-w-[16rem] text-base font-medium text-muted">
          Ваш AI-юрист в чате. Задайте вопрос — получите понятный ответ за секунды.
        </p>

        {user?.firstName && (
          <p className="mt-6 text-sm font-semibold text-white/70">Привет, {user.firstName} 👋</p>
        )}
      </div>

      <div className="flex flex-col items-center gap-3 pb-2">
        <PillButton onClick={onStart} full>
          Начать
        </PillButton>
        <span className="text-xs text-muted">
          Уже задано <span className="text-white/80">128 000+</span> вопросов
        </span>
      </div>
    </Screen>
  )
}
