import Screen from '../components/Screen'
import Logo from '../components/Logo'
import PillButton from '../components/PillButton'
import { useMainButton } from '../hooks/useTelegram'

export default function Onboarding({ onStart, user }) {
  // Mirror the CTA onto Telegram's native MainButton.
  useMainButton({ text: 'НАЧАТЬ', onClick: onStart, visible: true })

  return (
    <Screen className="fade-in justify-between py-10">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <Logo size={96} />

        <h1 className="display mt-10 text-5xl text-white">
          ЭТО
          <br />
          <span className="text-lime">PRAVDA</span>
        </h1>

        <p className="mt-4 max-w-[16rem] text-base font-medium text-muted">
          Твой юрист в кармане. Проверяем договоры и находим ловушки за секунды.
        </p>

        {user?.firstName && (
          <p className="mt-6 text-sm font-semibold text-white/70">
            Привет, {user.firstName} 👋
          </p>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 pb-2">
        <PillButton onClick={onStart} full>
          Начать
        </PillButton>
        <span className="text-xs text-muted">
          Уже проверили <span className="text-white/80">12 400+</span> договоров
        </span>
      </div>
    </Screen>
  )
}
