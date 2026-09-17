export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'Telegram is not configured' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const {
    name = '',
    contact = '',
    car = '',
    year = '',
    engine = '',
    price = '',
    source = ''
  } = body;

  if (!name || !contact || !car) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' });
  }

  const text = [
    '🚘 MAGISTRAL AUTO — новая заявка',
    '',
    `Имя: ${name}`,
    `Контакт: ${contact}`,
    `Автомобиль: ${car}`,
    `Год: ${year || '—'}`,
    `Двигатель / силовая установка / мощность: ${engine || '—'}`,
    `Стоимость: ${price || '—'}`,
    `Откуда покупка: ${source || '—'}`
  ].join('\n');

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true
      })
    });

    const data = await tg.json();
    if (!tg.ok || !data.ok) {
      return res.status(502).json({
        ok: false,
        error: 'Telegram send failed',
        telegram_status: tg.status,
        telegram_description: data?.description || null
      });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}
