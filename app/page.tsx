'use client';

import { FormEvent, useState } from 'react';
import { ArrowDown, ArrowRight, Menu, Play, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Program = { title: string; genre: string; image: string; description: string };
type Direction = { id: string; number: string; title: string; note: string; description: string; navImage: string; programs: Program[] };

const directions: Direction[] = [
  {
    id: 'dance', number: '01', title: 'Брейк-данс шоу', note: 'Движение, техника и индивидуальный стиль', navImage: '/media/breakdance-solo.jpg',
    description: 'Брейк-данс строится на характере исполнителя: силовые элементы, пластика, музыкальность и импровизация складываются в динамичное сценическое выступление. Формат подходит для яркого открытия, самостоятельного номера или живого общения с публикой.',
    programs: [
      { title: 'Брейк-данс шоу', genre: 'Танцевальная программа', image: '/media/breakdance-light.jpg', description: 'Энергичное выступление с сольными выходами и общей хореографией команды.' },
      { title: 'Гангстеры', genre: 'Сюжетная танцевальная программа', image: '/media/gangsters.png', description: 'Брейкинг, кинематографичные персонажи и атмосфера криминальной истории.' },
      { title: 'Паучий динамит', genre: 'Экстрим брейк-данс шоу', image: '/media/spider-dynamite-crowd.jpg', description: 'Сценическое противостояние, акробатика и напряжение настоящего поединка.' },
    ],
  },
  {
    id: 'fire', number: '02', title: 'Фаер-шоу', note: 'Огонь, масштаб и сценическое напряжение', navImage: '/media/hero-fire.jpg',
    description: 'Фаер-шоу собирает внимание вокруг живого огня, точной работы артистов и выразительной драматургии. Масштаб и набор трюков подбираются под площадку, количество зрителей и характер события.',
    programs: [
      { title: 'Пираты', genre: 'Экстрим фаер-шоу', image: '/media/fire-pirates.jpg', description: 'Огненные трюки и дерзкая подача в атмосфере морского приключения.' },
      { title: 'Масленица', genre: 'Праздничное фаер-шоу', image: '/media/fire-maslenitsa.jpg', description: 'Выразительный огненный эпизод для проводов зимы и большого праздника.' },
    ],
  },
  {
    id: 'animation', number: '03', title: 'Анимация', note: 'Персонажи, сюжет и живое участие гостей', navImage: '/media/spiderman-portrait.jpg',
    description: 'Анимационные программы вовлекают гостей через знакомых персонажей, игры, задания и общий сюжет. Сценарий и интенсивность общения адаптируются под возраст, повод и настроение компании.',
    programs: [
      { title: 'Человек-паук', genre: 'Анимационная программа', image: '/media/spiderman.jpg', description: 'Встреча с супергероем и приключение, где гости становятся участниками.' },
      { title: 'Пираты', genre: 'Анимация-квест', image: '/media/pirate-slide.jpg', description: 'Задания и общий сюжет собирают гостей в настоящую пиратскую команду.' },
      { title: 'Дед Мороз', genre: 'Взрослая анимация', image: '/media/ded-moroz-portrait.jpg', description: 'Новогодняя программа с юмором, поздравлениями и общением с компанией.' },
      { title: 'Хеллоуин', genre: 'Анимация и шоу', image: '/media/halloween-close.jpg', description: 'Персонажи, игры и зрелищные эпизоды в атмосфере праздника.' },
    ],
  },
];

const gallery = [
  ['/media/fire-pirates-wide.png', 'Пираты · фаер-шоу'],
  ['/media/spiderman-game.png', 'Человек-паук · игра с гостями'],
  ['/media/breakdance-light.jpg', 'Брейк-данс · выступление'],
  ['/media/halloween-close.jpg', 'Хеллоуин · встреча с персонажем'],
  ['/media/maslenitsa-team.jpg', 'Масленица · огненное шоу'],
  ['/media/ded-moroz-dance.jpg', 'Дед Мороз · взрослая анимация'],
  ['/media/spider-dynamite-solo.jpg', 'Паучий динамит · сценический номер'],
  ['/media/pirate-games.jpg', 'Пираты · командные игры'],
] as const;

const faqs = [
  ['Как выбрать программу для наших гостей?', 'Расскажите о поводе, возрасте и количестве гостей, площадке и желаемом впечатлении. Мы предложим подходящий формат.'],
  ['Можно заказать отдельный номер?', 'Да, объём программы обсуждается под конкретное событие. Можно назвать понравившийся номер или попросить помочь с выбором.'],
  ['Нужно ли гостям участвовать?', 'Шоу можно смотреть, а анимационные форматы строятся вокруг общения и совместного действия. Степень вовлечения согласуем заранее.'],
  ['Подойдёт ли наша площадка для огня?', 'Сначала оцениваем пространство, расположение зрителей, ограничения площадки и погоду. Затем подтверждаем формат.'],
  ['За сколько времени бронировать?', 'Дата, город и формат помогают быстрее собрать программу. Начать разговор можно и без готовой концепции.'],
] as const;

function ProgramCard({ item, onChoose }: { item: Program; onChoose: (title: string) => void }) {
  return (
    <article className="program-card">
      <img src={item.image} alt={`${item.title}: кадр программы`} loading="lazy" />
      <div className="program-card__shade" />
      <div className="program-card__copy">
        <p><span>Программа</span>{item.genre}</p>
        <h3>{item.title}</h3>
        <div className="program-card__details">
          <span>{item.description}</span>
          <button onClick={() => onChoose(`${item.title} — ${item.genre}`)} aria-label={`Обсудить программу «${item.title}»`}><ArrowRight /></button>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('Помогите выбрать');
  const [draft, setDraft] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof gallery)[number] | null>(null);
  const allPrograms = directions.flatMap((direction) => direction.programs);

  function chooseProgram(title: string) {
    setSelectedProgram(title);
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  function prepareDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const contact = String(data.get('contact') || '').trim();
    const eventText = String(data.get('event') || '').trim();
    setDraft(`Здравствуйте! ${name ? `Меня зовут ${name}. ` : ''}Хочу обсудить ${selectedProgram === 'Помогите выбрать' ? 'программу для события' : `программу «${selectedProgram}»`}.${eventText ? ` ${eventText}` : ''} Связаться со мной: ${contact}.`);
  }

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Космос Внутри — на главную"><span>Космос</span><span>Внутри</span></a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#programs">Программы</a><a href="#gallery">Фото</a><a href="#process">Как работаем</a><a href="#contact">Контакты</a>
        </nav>
        <a href="#contact" className="header-cta">Обсудить событие <ArrowRight /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        {menuOpen && <nav className="mobile-nav">{[['#programs','Программы'],['#gallery','Фото'],['#process','Как работаем'],['#contact','Контакты']].map(([href,label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <img src="/media/fire-pirates-wide.png" alt="Огненное шоу команды «Космос Внутри»" />
        <div className="hero__shade" />
        <div className="hero__copy page-width">
          <p className="eyebrow eyebrow--light">Творческая команда · Санкт-Петербург</p>
          <h1 id="hero-title"><span>Характер</span><span>в каждом</span><span>событии</span></h1>
          <div className="hero__bottom">
            <p>Брейк-данс, огонь и анимация для праздников, корпоративов и вечеринок.</p>
            <a href="#contact">Обсудить событие <ArrowRight /></a>
          </div>
        </div>
      </section>

      <section className="about page-width" id="about" aria-labelledby="about-title">
        <p className="eyebrow">О команде</p>
        <figure className="team-portrait">
          <img src="/media/team-pirates.png" alt="Команда «Космос Внутри» в образах пиратского фаер-шоу" loading="lazy" />
          <div className="team-portrait__shade" />
          <h2 id="about-title">Одна команда.<br />Девять живых историй.</h2>
        </figure>
        <div className="team-copy">
          <p className="team-copy__lead">У каждого свой путь: брейк-данс, огонь, уличные выступления, преподавание и баттлы.</p>
          <p>Общий язык команды — движение, точная работа и контакт с гостями. Из этого рождается выступление с характером каждого артиста.</p>
          <div className="team-advantages" aria-label="Преимущества команды">
            <article><strong>Свой почерк</strong><p>Каждый артист приносит в программу личную технику, характер и сценический опыт.</p></article>
            <article><strong>Мастерство в практике</strong><p>Баттлы, преподавание и живая сцена поддерживают форму и точность исполнения.</p></article>
            <article><strong>Разные истории вместе</strong><p>Сильные стороны артистов соединяются под формат, площадку и настроение события.</p></article>
          </div>
        </div>
      </section>

      <section className="programs" id="programs" aria-labelledby="programs-title">
        <div className="programs__intro page-width">
          <div><p className="eyebrow">Программы</p><h2 id="programs-title">Три направления.<br />Девять программ.</h2></div>
          <p>Сначала выберите направление, затем конкретную программу внутри него.</p>
        </div>
        <nav className="direction-nav page-width" aria-label="Направления программ">
          {directions.map((direction) => <a href={`#${direction.id}`} key={direction.id}>
            <div className="direction-card__media"><img src={direction.navImage} alt={`Кадр направления «${direction.title}»`} loading="lazy" /></div>
            <div className="direction-card__copy">
              <strong>{direction.title}</strong><small>{direction.programs.length} {direction.programs.length < 5 ? 'программы' : 'программ'}</small>
              <p>{direction.description}</p><ArrowDown />
            </div>
          </a>)}
        </nav>

        {directions.map((direction) => (
          <section className={`direction ${direction.id === 'fire' ? 'direction--dark' : ''}`} id={direction.id} key={direction.id} aria-labelledby={`${direction.id}-title`}>
            <div className="page-width">
              <div className="direction__heading"><span>{direction.number} / Направление</span><div><h2 id={`${direction.id}-title`}>{direction.title}</h2><p>{direction.note}</p></div></div>
              <div className="direction__label">Программы направления</div>
              <div className={`program-grid program-grid--${direction.programs.length}`}>{direction.programs.map((item, index) => <ProgramCard item={item} onChoose={chooseProgram} key={`${item.title}-${index}`} />)}</div>
            </div>
          </section>
        ))}
      </section>

      <section className="gallery" id="gallery" aria-labelledby="gallery-title">
        <div className="gallery__heading page-width"><div><p className="eyebrow">Вживую</p><h2 id="gallery-title">Люди, движение,<br />огонь и реакция гостей.</h2></div><p>Кадры с реальных выступлений и праздников команды.</p></div>
        <div className="photo-mosaic page-width">
          {gallery.map(([src, caption], index) => <button type="button" className={`photo-tile photo-tile--${index + 1}`} key={src} onClick={() => setSelectedPhoto(gallery[index])} aria-label={`Открыть фотографию: ${caption}`}><img src={src} alt={caption} loading="lazy" /><span className="photo-tile__caption">{caption}</span></button>)}
        </div>
        <Dialog open={Boolean(selectedPhoto)} onOpenChange={(open) => { if (!open) setSelectedPhoto(null); }}>
          <DialogContent className="photo-lightbox" showCloseButton>
            <DialogTitle className="sr-only">{selectedPhoto?.[1]}</DialogTitle>
            <DialogDescription className="sr-only">Фотография с выступления команды «Космос Внутри»</DialogDescription>
            {selectedPhoto && <><img src={selectedPhoto[0]} alt={selectedPhoto[1]} /><p>{selectedPhoto[1]}</p></>}
          </DialogContent>
        </Dialog>
        <div className="video-gallery page-width">
          <div className="video-gallery__heading"><div><p className="eyebrow">Видео</p><h3>Выступления в движении</h3></div><p>Здесь появятся короткие ролики с программами и реакцией гостей.</p></div>
          <Carousel opts={{ align: 'start', loop: true }} className="video-carousel">
            <CarouselContent>
              {directions.map((direction) => <CarouselItem className="video-slide" key={direction.id}><div className={`video-placeholder video-placeholder--${direction.id}`}><span>Видео скоро</span><Play aria-hidden="true" /><strong>{direction.title}</strong><small>{direction.note}</small></div></CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="carousel-control carousel-control--prev" />
            <CarouselNext className="carousel-control carousel-control--next" />
          </Carousel>
        </div>
      </section>

      <section className="occasions page-width" aria-labelledby="occasions-title">
        <p className="eyebrow">Для вашего события</p><h2 id="occasions-title">Впечатление, которое останется с гостями.</h2>
        <div className="occasion-list">{[['Корпоратив','Раскачать зал и дать коллегам пережить общий яркий момент.'],['Частный праздник','Сделать героя и гостей частью истории, которую будут вспоминать.'],['Вечеринка','Добавить вечеру ритм и живой контакт с публикой.'],['Агентство или площадка','Встроить выразительный номер в общую драматургию события.']].map(([title,copy],index) => <article key={title}><span>{String(index + 1).padStart(2,'0')}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="process" id="process" aria-labelledby="process-title"><div className="page-width"><div className="process__heading"><div><p className="eyebrow">Как работаем</p><h2 id="process-title">От идеи до выхода к гостям.</h2></div><p>Четыре понятных шага до готового выступления.</p></div>
        <div className="steps">{[['Обсуждаем','Повод, гостей, место и желаемое впечатление.'],['Выбираем','Направление, программу и формат взаимодействия.'],['Согласуем','Условия площадки и важные детали выступления.'],['Готовимся','Фиксируем договорённости и собираем команду.']].map(([title,copy],index) => <article key={title}><span>{String(index + 1).padStart(2,'0')}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <aside className="fire-note"><b>Для фаер-шоу сначала обсуждаем площадку.</b><span>Оцениваем пространство, расположение зрителей, ограничения и погоду до подтверждения программы.</span></aside>
      </div></section>

      <section className="contact" id="contact" aria-labelledby="contact-title"><div className="contact__grid page-width">
        <div className="contact__copy"><p className="eyebrow eyebrow--light">Начнём разговор</p><h2 id="contact-title">Что вы хотите почувствовать вместе с гостями?</h2><p>Можно начать с одной мысли: хочется удивить, собрать всех вместе или добавить вечеру движения.</p><div className="location">Команда из Санкт-Петербурга<br />География выступлений — по согласованию</div></div>
        <form onSubmit={prepareDraft} className="contact-form">
          <label htmlFor="name">Как вас зовут <span>необязательно</span></label><Input id="name" name="name" placeholder="Имя" />
          <label htmlFor="contact-field">Как с вами связаться</label><Input id="contact-field" name="contact" placeholder="Телефон, Telegram или email" required />
          <label htmlFor="program">Программа</label><select id="program" value={selectedProgram} onChange={(event) => setSelectedProgram(event.target.value)}><option>Помогите выбрать</option>{allPrograms.map((item,index) => <option key={`${item.title}-${index}`} value={`${item.title} — ${item.genre}`}>{item.title} — {item.genre}</option>)}</select>
          <label htmlFor="event">Что планируете? <span>необязательно</span></label><Textarea id="event" name="event" placeholder="Повод, дата, город, гости — всё, что уже известно" />
          <Button type="submit">Подготовить обращение <ArrowRight /></Button>
          <small>Контакт команды будет добавлен перед открытой публикацией. Сейчас можно подготовить и скопировать текст.</small>
          {draft && <div className="draft" aria-live="polite"><p>{draft}</p><button type="button" onClick={() => navigator.clipboard.writeText(draft)}>Скопировать текст</button></div>}
        </form>
      </div></section>

      <section className="faq page-width" aria-labelledby="faq-title"><div><p className="eyebrow">Частые вопросы</p><h2 id="faq-title">Осталось уточнить?</h2></div><Accordion className="faq-list">{faqs.map(([question,answer],index) => <AccordionItem value={`faq-${index}`} key={question}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>)}</Accordion></section>

      <footer className="footer page-width"><div className="brand">Космос<br />Внутри</div><p>То, чем мы живём,<br />становится вашим событием.</p><a href="#top">Наверх <ArrowDown /></a><small>© 2026 · Танец · огонь · общение</small></footer>
    </main>
  );
}
