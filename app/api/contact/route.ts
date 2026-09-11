const CONTACT_EMAIL = 'spaceinsidespb2305@gmail.com';

function clean(value: unknown, maxLength: number) {
  return String(value ?? '').trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] ?? character);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = clean(body.name, 120);
    const contact = clean(body.contact, 180);
    const program = clean(body.program, 180);
    const event = clean(body.event, 2500);
    const website = clean(body.website, 200);

    if (website) return Response.json({ ok: true });
    if (!contact) return Response.json({ error: 'Укажите контакт для связи.' }, { status: 400 });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return Response.json({ error: 'Отправка ещё не подключена.' }, { status: 503 });

    const from = process.env.CONTACT_FROM_EMAIL || 'Космос Внутри <onboarding@resend.dev>';
    const text = [
      `Имя: ${name || 'не указано'}`,
      `Контакт: ${contact}`,
      `Программа: ${program || 'Помогите выбрать'}`,
      `Событие: ${event || 'не указано'}`,
    ].join('\n');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL],
        subject: `Новая заявка с сайта${name ? ` — ${name}` : ''}`,
        text,
        html: `<h2>Новая заявка с сайта</h2><p><b>Имя:</b> ${escapeHtml(name || 'не указано')}</p><p><b>Контакт:</b> ${escapeHtml(contact)}</p><p><b>Программа:</b> ${escapeHtml(program || 'Помогите выбрать')}</p><p><b>Событие:</b><br>${escapeHtml(event || 'не указано').replace(/\n/g, '<br>')}</p>`,
      }),
    });

    if (!response.ok) return Response.json({ error: 'Не удалось отправить заявку.' }, { status: 502 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Некорректный запрос.' }, { status: 400 });
  }
}
