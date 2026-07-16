// Mock data. Replace with real backend responses later.

// Status levels shared across the app.
export const STATUS = {
  danger: {
    key: 'danger',
    label: 'ОПАСНО',
    emoji: '🟥',
    color: '#FF3B3B',
  },
  warn: {
    key: 'warn',
    label: 'СОМНИТЕЛЬНО',
    emoji: '🟨',
    color: '#F8D82A',
  },
  safe: {
    key: 'safe',
    label: 'БЕЗОПАСНО',
    emoji: '🟩',
    color: '#C4F82A',
  },
}

// Recently checked documents shown on the Home screen.
export const recentDocuments = [
  {
    id: 'doc-1',
    title: 'Договор аренды квартиры',
    date: '14 июля',
    pages: 8,
    status: 'danger',
    summary: '3 опасных пункта · 2 сомнительных',
  },
  {
    id: 'doc-2',
    title: 'Трудовой договор — ООО «Вектор»',
    date: '9 июля',
    pages: 12,
    status: 'warn',
    summary: '4 сомнительных пункта',
  },
  {
    id: 'doc-3',
    title: 'Договор оказания услуг',
    date: '2 июля',
    pages: 5,
    status: 'safe',
    summary: 'Существенных рисков не найдено',
  },
]

// Clause-by-clause analysis used on the Result screen.
export const contractAnalysis = {
  documentTitle: 'Договор аренды квартиры',
  score: { danger: 3, warn: 2, safe: 6 },
  clauses: [
    {
      id: 'c1',
      section: 'п. 4.2',
      title: 'Односторонний рост арендной платы',
      status: 'danger',
      note: 'Арендодатель может повышать плату в любой момент без ограничений. Требуйте потолок и уведомление за 30 дней.',
    },
    {
      id: 'c2',
      section: 'п. 6.1',
      title: 'Удержание всего депозита',
      status: 'danger',
      note: 'Депозит удерживается полностью при любом досрочном выезде. Это несоразмерная неустойка.',
    },
    {
      id: 'c3',
      section: 'п. 8.4',
      title: 'Запрет на регистрацию',
      status: 'danger',
      note: 'Пункт ограничивает ваше право на временную регистрацию по месту пребывания.',
    },
    {
      id: 'c4',
      section: 'п. 3.3',
      title: 'Штраф за просрочку 1% в день',
      status: 'warn',
      note: 'Неустойка выше рыночной. Можно оспорить как несоразмерную (ст. 333 ГК РФ).',
    },
    {
      id: 'c5',
      section: 'п. 9.2',
      title: 'Подсудность по месту арендодателя',
      status: 'warn',
      note: 'Споры рассматриваются в удобном для собственника суде. Уточните формулировку.',
    },
    {
      id: 'c6',
      section: 'п. 1.1',
      title: 'Предмет договора',
      status: 'safe',
      note: 'Объект и адрес описаны корректно и однозначно.',
    },
    {
      id: 'c7',
      section: 'п. 2.1',
      title: 'Срок аренды',
      status: 'safe',
      note: 'Срок и порядок продления указаны без подводных камней.',
    },
    {
      id: 'c8',
      section: 'п. 5.1',
      title: 'Порядок оплаты',
      status: 'safe',
      note: 'Сроки и способ оплаты прозрачны, реквизиты указаны.',
    },
  ],
}

// Premium plans for the Premium screen.
export const plans = [
  {
    id: 'monthly',
    title: 'Месяц',
    price: '350₽',
    period: '/мес',
    note: 'Безлимитные проверки договоров',
    highlight: false,
  },
  {
    id: 'yearly',
    title: 'Год',
    price: '2499₽',
    period: '/год',
    note: 'Выгода −20% · меньше 209₽ в месяц',
    badge: '−20%',
    highlight: true,
  },
]
