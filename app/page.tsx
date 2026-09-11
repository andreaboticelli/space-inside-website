'use client';

import { FormEvent, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Images, Mail, Maximize2, Menu, Phone, Play, Send, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Program = { title: string; genre: string; image: string; description: string; gallery: string[] };
type Direction = { id: string; number: string; title: string; note: string; description: string; navImage: string; programs: Program[] };

const directions: Direction[] = [
  {
    id: 'dance', number: '01', title: 'Брейк-данс шоу', note: 'Движение, техника и индивидуальный стиль', navImage: '/media/breakdance-solo.jpg',
    description: 'Брейк-данс строится на характере исполнителя: силовые элементы, пластика, музыкальность и импровизация складываются в динамичное сценическое выступление. Формат подходит для яркого открытия, самостоятельного номера или живого общения с публикой.',
    programs: [
      { title: 'Брейк-данс шоу', genre: 'Танцевальная программа', image: '/media/breakdance-light.jpg', description: 'Энергичное выступление с сольными выходами и общей хореографией команды.', gallery: ['/media/breakdance-light.jpg', '/media/breakdance-solo.jpg', '/media/breakdance.jpg'] },
      { title: 'Гангстеры', genre: 'Сюжетная танцевальная программа', image: '/media/gangsters.png', description: 'Брейкинг, кинематографичные персонажи и атмосфера криминальной истории.', gallery: ['/media/gangsters.png', '/media/breakdance.jpg', '/media/breakdance-solo.jpg'] },
      { title: 'Паучий динамит', genre: 'Экстрим брейк-данс шоу', image: '/media/spider-dynamite-crowd.jpg', description: 'Сценическое противостояние, акробатика и напряжение настоящего поединка.', gallery: ['/media/spider-dynamite-crowd.jpg', '/media/spider-dynamite-solo.jpg', '/media/spider-dynamite.jpg'] },
    ],
  },
  {
    id: 'fire', number: '02', title: 'Фаер-шоу', note: 'Огонь, масштаб и сценическое напряжение', navImage: '/media/hero-fire.jpg',
    description: 'Фаер-шоу собирает внимание вокруг живого огня, точной работы артистов и выразительной драматургии. Масштаб и набор трюков подбираются под площадку, количество зрителей и характер события.',
    programs: [
      { title: 'Пираты', genre: 'Экстрим фаер-шоу', image: '/media/fire-pirates.jpg', description: 'Огненные трюки и дерзкая подача в атмосфере морского приключения.', gallery: ['/media/fire-pirates.jpg', '/media/fire-pirates-wide.png', '/media/team-pirates.png'] },
      { title: 'Масленица', genre: 'Праздничное фаер-шоу', image: '/media/fire-maslenitsa.jpg', description: 'Выразительный огненный эпизод для проводов зимы и большого праздника.', gallery: ['/media/fire-maslenitsa.jpg', '/media/maslenitsa-team.jpg', '/media/maslenitsa-finale.jpg'] },
    ],
  },
  {
    id: 'animation', number: '03', title: 'Анимация', note: 'Персонажи, сюжет и живое участие гостей', navImage: '/media/spiderman-portrait.jpg',
    description: 'Анимационные программы вовлекают гостей через знакомых персонажей, игры, задания и общий сюжет. Сценарий и интенсивность общения адаптируются под возраст, повод и настроение компании.',
    programs: [
      { title: 'Человек-паук', genre: 'Анимационная программа', image: '/media/spiderman.jpg', description: 'Встреча с супергероем и приключение, где гости становятся участниками.', gallery: ['/media/spiderman.jpg', '/media/spiderman-portrait.jpg', '/media/spiderman-game.png'] },
      { title: 'Пираты', genre: 'Анимация-квест', image: '/media/pirate-slide.jpg', description: 'Задания и общий сюжет собирают гостей в настоящую пиратскую команду.', gallery: ['/media/pirate-slide.jpg', '/media/pirate-games.jpg', '/media/pirate-quest.jpg'] },
      { title: 'Дед Мороз', genre: 'Взрослая анимация', image: '/media/ded-moroz-portrait.jpg', description: 'Новогодняя программа с юмором, поздравлениями и общением с компанией.', gallery: ['/media/ded-moroz-portrait.jpg', '/media/ded-moroz-dance.jpg', '/media/ded-moroz.jpg'] },
      { title: 'Хеллоуин', genre: 'Анимация и шоу', image: '/media/halloween-close.jpg', description: 'Персонажи, игры и зрелищные эпизоды в атмосфере праздника.', gallery: ['/media/halloween-close.jpg', '/media/halloween-group.jpg', '/media/halloween.jpg'] },
    ],
  },
];

const videos = [
  { src: 'https://vk.ru/video_ext.php?oid=-169134080&id=456239152', poster: '/media/fire-pirates-wide.png' },
  { src: 'https://vk.ru/video_ext.php?oid=-169134080&id=456239094', poster: '/media/breakdance.jpg' },
  { src: 'https://vk.ru/video_ext.php?oid=305543770&id=456239249', poster: '/media/spider-dynamite.jpg' },
  { src: 'https://vk.ru/video_ext.php?oid=-169134080&id=456239020', poster: '/media/fire-maslenitsa.jpg' },
  { src: 'https://vk.ru/video_ext.php?oid=-169134080&id=456239019', poster: '/media/spiderman-game.png' },
  { src: 'https://vk.ru/video_ext.php?oid=-169134080&id=456239017', poster: '/media/ded-moroz-dance.jpg' },
] as const;

const faqs = [
  ['Как выбрать программу для наших гостей?', 'Расскажите о поводе, возрасте и количестве гостей, площадке и желаемом впечатлении. Мы предложим подходящий формат.'],
  ['Можно заказать отдельный номер?', 'Да, объём программы обсуждается под конкретное событие. Можно назвать понравившийся номер или попросить помочь с выбором.'],
  ['Нужно ли гостям участвовать?', 'Шоу можно смотреть, а анимационные форматы строятся вокруг общения и совместного действия. Степень вовлечения согласуем заранее.'],
  ['Подойдёт ли наша площадка для огня?', 'Сначала оцениваем пространство, расположение зрителей, ограничения площадки и погоду. Затем подтверждаем формат.'],
  ['За сколько времени бронировать?', 'Дата, город и формат помогают быстрее собрать программу. Начать разговор можно и без готовой концепции.'],
] as const;

function ProgramCard({ item, onOpenGallery }: { item: Program; onOpenGallery: (item: Program) => void }) {
  return (
    <article className="program-card">
      <img src={item.image} alt={`${item.title}: кадр программы`} loading="lazy" />
      <div className="program-card__shade" />
      <div className="program-card__copy">
        <p><span>Программа</span>{item.genre}</p>
        <h3>{item.title}</h3>
        <div className="program-card__details">
          <span>{item.description}</span>
          <button onClick={() => onOpenGallery(item)} aria-label={`Открыть фотографии программы «${item.title}»`}><Images /></button>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('Помогите выбрать');
  const [draft, setDraft] = useState('');
  const [selectedGalleryProgram, setSelectedGalleryProgram] = useState<Program | null>(null);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const galleryFullscreenRef = useRef<HTMLDivElement>(null);
  const allPrograms = directions.flatMap((direction) => direction.programs);

  function chooseProgram(title: string) {
    setSelectedProgram(title);
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const contact = String(data.get('contact') || '').trim();
    const eventText = String(data.get('event') || '').trim();
    const message = `Здравствуйте! ${name ? `Меня зовут ${name}. ` : ''}Хочу обсудить ${selectedProgram === 'Помогите выбрать' ? 'программу для события' : `программу «${selectedProgram}»`}.${eventText ? ` ${eventText}` : ''} Связаться со мной: ${contact}.`;
    setDraft(message);
    setFormStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, program: selectedProgram, event: eventText, website: data.get('website') }),
      });
      if (!response.ok) throw new Error('Request failed');
      setFormStatus('sent');
      form.reset();
      setSelectedProgram('Помогите выбрать');
    } catch {
      setFormStatus('error');
    }
  }

  async function openGalleryFullscreen() {
    const element = galleryFullscreenRef.current as (HTMLDivElement & { webkitRequestFullscreen?: () => Promise<void> }) | null;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    if (element?.requestFullscreen) await element.requestFullscreen();
    else await element?.webkitRequestFullscreen?.();
  }

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Космос Внутри — на главную"><span>Космос</span><span>Внутри</span></a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#programs">Программы</a><a href="#video">Видео</a><a href="#process">Как работаем</a><a href="#contact">Контакты</a>
        </nav>
        <a href="#contact" className="header-cta">Обсудить событие <ArrowRight /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        {menuOpen && <nav className="mobile-nav">{[['#programs','Программы'],['#video','Видео'],['#process','Как работаем'],['#contact','Контакты']].map(([href,label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
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
              <div className={`program-grid program-grid--${direction.programs.length}`}>{direction.programs.map((item, index) => <ProgramCard item={item} onOpenGallery={setSelectedGalleryProgram} key={`${item.title}-${index}`} />)}</div>
            </div>
          </section>
        ))}
      </section>

      <Dialog open={Boolean(selectedGalleryProgram)} onOpenChange={(open) => { if (!open) setSelectedGalleryProgram(null); }}>
        <DialogContent className="program-gallery-dialog" showCloseButton>
          <DialogTitle className="sr-only">Фотографии программы «{selectedGalleryProgram?.title}»</DialogTitle>
          <DialogDescription className="sr-only">Три фотографии программы с возможностью пролистывания и полноэкранного просмотра.</DialogDescription>
          {selectedGalleryProgram && <div className="program-gallery-view" ref={galleryFullscreenRef}>
            <div className="program-gallery-toolbar"><div><span>{selectedGalleryProgram.genre}</span><strong>{selectedGalleryProgram.title}</strong></div><button type="button" onClick={openGalleryFullscreen}><Maximize2 />На весь экран</button></div>
            <Carousel opts={{ loop: true }} className="program-gallery-carousel">
              <CarouselContent>{selectedGalleryProgram.gallery.map((src, index) => <CarouselItem key={src}><img src={src} alt={`${selectedGalleryProgram.title}, фотография ${index + 1}`} /></CarouselItem>)}</CarouselContent>
              <CarouselPrevious className="program-gallery-control program-gallery-control--prev" />
              <CarouselNext className="program-gallery-control program-gallery-control--next" />
            </Carousel>
            <button className="program-gallery-cta" type="button" onClick={() => {
              const program = `${selectedGalleryProgram.title} — ${selectedGalleryProgram.genre}`;
              setSelectedGalleryProgram(null);
              window.setTimeout(() => chooseProgram(program), 0);
            }}>Обсудить эту программу <ArrowRight /></button>
          </div>}
        </DialogContent>
      </Dialog>

      <section className="video-section" id="video" aria-labelledby="video-title">
        <div className="video-section__heading page-width"><div><p className="eyebrow">Видео</p><h2 id="video-title">Выступления<br />в движении.</h2></div><p>Нажмите на карточку, чтобы запустить видео. В плеере можно включить полноэкранный режим.</p></div>
        <div className="video-grid page-width">
          {videos.map((video, index) => <article className="video-card" key={video.src}>
            {activeVideo === index ? <iframe src={`${video.src}&autoplay=1`} title={`Видео выступления ${index + 1}`} allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock" allowFullScreen loading="lazy" /> : <button type="button" onClick={() => setActiveVideo(index)} aria-label={`Запустить видео ${index + 1}`}>
              <img src={video.poster} alt="" loading="lazy" /><span className="video-card__shade" /><span className="video-card__number">{String(index + 1).padStart(2, '0')}</span><span className="video-card__play"><Play fill="currentColor" /></span><strong>Смотреть выступление</strong>
            </button>}
          </article>)}
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
        <div className="contact__copy"><p className="eyebrow eyebrow--light">Начнём разговор</p><h2 id="contact-title">Что вы хотите почувствовать вместе с гостями?</h2><p>Можно начать с одной мысли: хочется удивить, собрать всех вместе или добавить вечеру движения.</p>
          <div className="contact-links" aria-label="Контакты команды">
            <a href="https://vk.ru/spaceinside23" target="_blank" rel="noreferrer"><span className="contact-link__icon">VK</span><span><small>ВКонтакте</small><strong>spaceinside23</strong></span><ArrowRight /></a>
            <a href="mailto:spaceinsidespb2305@gmail.com"><span className="contact-link__icon"><Mail /></span><span><small>Электронная почта</small><strong>spaceinsidespb2305@gmail.com</strong></span><ArrowRight /></a>
            <a href="tel:+79522302988"><span className="contact-link__icon"><Phone /></span><span><small>Телефон · Telegram · MAX</small><strong>+7 (952) 230-29-88</strong></span><ArrowRight /></a>
          </div>
          <div className="location">Команда из Санкт-Петербурга<br />География выступлений — по согласованию</div>
        </div>
        <form onSubmit={submitRequest} className="contact-form">
          <label htmlFor="name">Как вас зовут <span>необязательно</span></label><Input id="name" name="name" placeholder="Имя" />
          <label htmlFor="contact-field">Как с вами связаться</label><Input id="contact-field" name="contact" placeholder="Телефон, Telegram или email" required />
          <label htmlFor="program">Программа</label><select id="program" name="program" value={selectedProgram} onChange={(event) => setSelectedProgram(event.target.value)}><option>Помогите выбрать</option>{allPrograms.map((item,index) => <option key={`${item.title}-${index}`} value={`${item.title} — ${item.genre}`}>{item.title} — {item.genre}</option>)}</select>
          <label htmlFor="event">Что планируете? <span>необязательно</span></label><Textarea id="event" name="event" placeholder="Повод, дата, город, гости — всё, что уже известно" />
          <label className="honeypot" htmlFor="website">Ваш сайт</label><Input className="honeypot" id="website" name="website" tabIndex={-1} autoComplete="off" />
          <Button type="submit" disabled={formStatus === 'sending'}>{formStatus === 'sending' ? 'Отправляем…' : 'Отправить заявку'} <Send /></Button>
          <small>Заявка придёт команде на электронную почту.</small>
          {formStatus === 'sent' && <div className="form-message form-message--success" aria-live="polite">Спасибо! Заявка отправлена — мы свяжемся с вами.</div>}
          {formStatus === 'error' && <div className="draft form-message--error" aria-live="polite"><p>Автоматическая отправка пока не настроена. Отправьте подготовленный текст по электронной почте:</p><a href={`mailto:spaceinsidespb2305@gmail.com?subject=${encodeURIComponent('Заявка с сайта «Космос Внутри»')}&body=${encodeURIComponent(draft)}`}>Открыть письмо <ArrowRight /></a><button type="button" onClick={() => navigator.clipboard.writeText(draft)}>Скопировать текст</button></div>}
        </form>
      </div></section>

      <section className="faq page-width" aria-labelledby="faq-title"><div><p className="eyebrow">Частые вопросы</p><h2 id="faq-title">Осталось уточнить?</h2></div><Accordion className="faq-list">{faqs.map(([question,answer],index) => <AccordionItem value={`faq-${index}`} key={question}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>)}</Accordion></section>

      <footer className="footer page-width"><div className="brand">Космос<br />Внутри</div><p>То, чем мы живём,<br />становится вашим событием.</p><a href="#top">Наверх <ArrowDown /></a><small>© 2026 · Танец · огонь · общение</small></footer>
    </main>
  );
}
