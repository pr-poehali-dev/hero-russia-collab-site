import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/1e5a85f0-8fa4-42c7-9147-65c3ae251167/files/2669fb03-bf43-4d59-beba-53f057a3322a.jpg';

const APPLICATIONS_URL =
  'https://functions.poehali.dev/a6b2d3e7-9b39-4bc3-87b8-5acdb97175a4';

const NAV = [
  { id: 'home', label: 'Главная' },
  { id: 'about', label: 'О проекте' },
  { id: 'roles', label: 'Роли' },
  { id: 'apply', label: 'Заявка' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contacts', label: 'Контакты' },
];

const ROLES = [
  {
    key: 'owner',
    title: 'Сотрудник владельца',
    icon: 'Crown',
    color: 'from-yellow-500 to-amber-600',
    desc: 'Высший уровень доступа. Работа напрямую с владельцем проекта.',
    perks: ['Полный доступ', 'Управление командой', 'Приоритет решений'],
  },
  {
    key: 'admin',
    title: 'Сотрудник администратора',
    icon: 'Shield',
    color: 'from-red-500 to-red-700',
    desc: 'Контроль порядка на сервере и помощь игрокам.',
    perks: ['Модерация', 'Поддержка игроков', 'Права админа'],
  },
  {
    key: 'free',
    title: 'Сотрудник бесплатный',
    icon: 'HandHeart',
    color: 'from-emerald-500 to-green-700',
    desc: 'Волонтёрская помощь проекту и старт карьеры в команде.',
    perks: ['Гибкий график', 'Обучение', 'Рост до админа'],
  },
  {
    key: 'youtuber',
    title: 'Сотрудник ютубер',
    icon: 'Video',
    color: 'from-fuchsia-500 to-purple-700',
    desc: 'Создание контента и продвижение HERO RUSSIA.',
    perks: ['Донат-бонусы', 'Реклама канала', 'Эксклюзивы'],
  },
];

const FAQ = [
  {
    q: 'Как быстро рассмотрят мою заявку?',
    a: 'Обычно заявки рассматриваются в течение 24 часов. После отправки просто ожидайте — мы свяжемся с вами.',
  },
  {
    q: 'Нужен ли опыт для вступления?',
    a: 'Нет. Для роли «Сотрудник бесплатный» опыт не требуется — мы всему обучим.',
  },
  {
    q: 'Можно ли подать заявку на несколько ролей?',
    a: 'Да, но рекомендуем выбрать одну основную роль, чтобы ускорить рассмотрение.',
  },
  {
    q: 'Что даёт роль ютубера?',
    a: 'Донат-бонусы, рекламу вашего канала внутри проекта и доступ к эксклюзивным событиям.',
  },
];

export default function Index() {
  const [form, setForm] = useState({
    vk: '',
    phone: '',
    nick: '',
    role: '',
    reason: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(APPLICATIONS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError('Не удалось отправить заявку. Проверьте поля и попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2 font-display font-bold text-xl tracking-wider"
          >
            <Icon name="Flame" className="text-primary" size={26} />
            HERO<span className="text-primary">RUSSIA</span>
          </button>
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <Button
            onClick={() => scrollTo('apply')}
            className="font-display uppercase tracking-wider"
          >
            Подать заявку
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center clip-slant overflow-hidden"
      >
        <img
          src={HERO_IMG}
          alt="HERO RUSSIA"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 grid-texture opacity-20" />
        <div className="container relative z-10 pt-20">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-sm font-medium mb-6">
              <Icon name="Zap" size={16} />
              Набор в команду открыт
            </div>
            <h1 className="font-display font-bold text-5xl md:text-7xl leading-none uppercase mb-6">
              Стань частью
              <br />
              <span className="text-gradient">HERO RUSSIA</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Присоединяйся к команде культовой игры. Выбирай свою роль,
              подавай заявку и развивайся вместе с нами.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => scrollTo('apply')}
                className="font-display uppercase tracking-wider text-base h-12 px-8 animate-glow"
              >
                Подать заявку
                <Icon name="ArrowRight" size={18} className="ml-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo('roles')}
                className="font-display uppercase tracking-wider text-base h-12 px-8 border-primary/40"
              >
                Смотреть роли
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 border-b border-border">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-display text-primary uppercase tracking-widest text-sm">
                О проекте
              </span>
              <h2 className="font-display font-bold text-4xl md:text-5xl uppercase mt-2 mb-6">
                Легендарный проект с большой командой
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                HERO RUSSIA — это динамичная игровая вселенная, где каждый
                находит своё место. Мы объединяем администраторов, контент-мейкеров
                и энтузиастов для создания лучшего игрового опыта.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { n: '10K+', l: 'Игроков' },
                  { n: '50+', l: 'В команде' },
                  { n: '24/7', l: 'Онлайн' },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="text-center p-4 rounded-lg bg-card border border-border"
                  >
                    <div className="font-display font-bold text-3xl text-primary">
                      {s.n}
                    </div>
                    <div className="text-sm text-muted-foreground uppercase">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {[
                { icon: 'Users', t: 'Дружная команда', d: 'Поддержка на каждом шаге' },
                { icon: 'TrendingUp', t: 'Карьерный рост', d: 'От волонтёра до владельца' },
                { icon: 'Gift', t: 'Бонусы и привилегии', d: 'Донаты, реклама, эксклюзивы' },
              ].map((f) => (
                <div
                  key={f.t}
                  className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Icon name={f.icon} size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg uppercase">
                      {f.t}
                    </h3>
                    <p className="text-muted-foreground">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section id="roles" className="py-24 border-b border-border">
        <div className="container">
          <div className="text-center mb-14">
            <span className="font-display text-primary uppercase tracking-widest text-sm">
              Вакансии
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl uppercase mt-2">
              Выбери свою роль
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROLES.map((r) => (
              <div
                key={r.key}
                className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/60 transition-all hover:-translate-y-2"
              >
                <div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${r.color} mb-5`}
                >
                  <Icon name={r.icon} size={28} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-xl uppercase mb-2">
                  {r.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-5">{r.desc}</p>
                <ul className="space-y-2 mb-6">
                  {r.perks.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2 text-sm text-foreground/90"
                    >
                      <Icon name="Check" size={16} className="text-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full font-display uppercase tracking-wide border-primary/30"
                  onClick={() => {
                    setForm((f) => ({ ...f, role: r.title }));
                    scrollTo('apply');
                  }}
                >
                  Выбрать
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY */}
      <section id="apply" className="py-24 border-b border-border grid-texture">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-10">
              <span className="font-display text-primary uppercase tracking-widest text-sm">
                Форма заявки
              </span>
              <h2 className="font-display font-bold text-4xl md:text-5xl uppercase mt-2">
                Подай заявку
              </h2>
            </div>

            {submitted ? (
              <div className="text-center p-10 rounded-2xl bg-card border border-accent/40 animate-scale-in">
                <div className="inline-flex p-5 rounded-full bg-accent/15 text-accent mb-5">
                  <Icon name="Hourglass" size={40} />
                </div>
                <h3 className="font-display font-bold text-3xl uppercase mb-3">
                  Ожидайте принятия
                </h3>
                <p className="text-muted-foreground">
                  Ваша заявка отправлена и находится на рассмотрении. Мы свяжемся
                  с вами в ближайшее время. Спасибо за интерес к HERO RUSSIA!
                </p>
                <Button
                  variant="outline"
                  className="mt-6 font-display uppercase border-primary/30"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ vk: '', phone: '', nick: '', role: '', reason: '' });
                  }}
                >
                  Подать ещё одну
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-8 rounded-2xl bg-card border border-border"
              >
                <div>
                  <label className="block text-sm font-medium mb-2 uppercase tracking-wide">
                    VK ID
                  </label>
                  <Input
                    required
                    placeholder="vk.com/id или ссылка"
                    value={form.vk}
                    onChange={(e) => setForm({ ...form, vk: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 uppercase tracking-wide">
                    Номер телефона
                  </label>
                  <Input
                    required
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 uppercase tracking-wide">
                    Ник в игре
                  </label>
                  <Input
                    required
                    placeholder="Ваш игровой никнейм"
                    value={form.nick}
                    onChange={(e) => setForm({ ...form, nick: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 uppercase tracking-wide">
                    Роль
                  </label>
                  <Select
                    value={form.role}
                    onValueChange={(v) => setForm({ ...form, role: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите роль" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map((r) => (
                        <SelectItem key={r.key} value={r.title}>
                          {r.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 uppercase tracking-wide">
                    Почему вы хотите стать сотрудником?
                  </label>
                  <Textarea
                    required
                    rows={4}
                    placeholder="Расскажите о себе и своей мотивации..."
                    value={form.reason}
                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-3">
                    <Icon name="TriangleAlert" size={18} />
                    {error}
                  </div>
                )}
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full font-display uppercase tracking-wider text-base h-12"
                >
                  {loading ? (
                    <>
                      <Icon name="Loader2" size={18} className="mr-1 animate-spin" />
                      Отправляем...
                    </>
                  ) : (
                    <>
                      Отправить заявку
                      <Icon name="Send" size={18} className="ml-1" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 border-b border-border">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="font-display text-primary uppercase tracking-widest text-sm">
              Вопросы
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl uppercase mt-2">
              Частые вопросы
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl bg-card border border-border px-5"
              >
                <AccordionTrigger className="font-display uppercase text-left tracking-wide hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24">
        <div className="container">
          <div className="text-center mb-10">
            <span className="font-display text-primary uppercase tracking-widest text-sm">
              Связь
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl uppercase mt-2">
              Контакты
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: 'Send', t: 'Telegram', d: '@herorussia' },
              { icon: 'MessageCircle', t: 'ВКонтакте', d: 'vk.com/herorussia' },
              { icon: 'Mail', t: 'Почта', d: 'team@herorussia.ru' },
            ].map((c) => (
              <div
                key={c.t}
                className="text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="inline-flex p-4 rounded-xl bg-primary/10 text-primary mb-4">
                  <Icon name={c.icon} size={26} />
                </div>
                <h3 className="font-display font-semibold text-lg uppercase mb-1">
                  {c.t}
                </h3>
                <p className="text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-display font-bold text-lg tracking-wider">
            <Icon name="Flame" className="text-primary" size={22} />
            HERO<span className="text-primary">RUSSIA</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 HERO RUSSIA. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}