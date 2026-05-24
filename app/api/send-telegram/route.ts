import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const CHAT_ID   = process.env.TELEGRAM_CHAT_ID   || '@cm95uz';

export async function POST(req: NextRequest) {
  if (!BOT_TOKEN) {
    return NextResponse.json(
      { success: false, error: 'Bot token sozlanmagan. .env.local fayliga TELEGRAM_BOT_TOKEN ni kiriting.' },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { firstName, lastName, phone, course, days, time, comment } = body;

    const now = new Date().toLocaleString('uz-UZ', {
      timeZone: 'Asia/Tashkent',
      day:    '2-digit',
      month:  '2-digit',
      year:   'numeric',
      hour:   '2-digit',
      minute: '2-digit',
    });

    const text = `
🎓 <b>Yangi ariza!</b>

👤 <b>Ism:</b> ${firstName || '—'}
👤 <b>Familiya:</b> ${lastName || '—'}
📞 <b>Telefon:</b> +998${phone || '—'}
📚 <b>Kurs:</b> ${course || '—'}
📅 <b>Dars kuni:</b> ${days || '—'}
⏰ <b>Dars vaqti:</b> ${time || '—'}
💬 <b>Izoh:</b> ${comment || '—'}

🕐 <b>Vaqt:</b> ${now}
    `.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id:    CHAT_ID,
          text,
          parse_mode: 'HTML',
        }),
      }
    );

    const data = await response.json();

    if (!data.ok) {
      console.error('Telegram API xatosi:', data);
      return NextResponse.json({ success: false, error: data.description }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Server xatosi:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
