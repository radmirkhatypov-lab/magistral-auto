# MAGISTRAL AUTO — деплой на Vercel

Файлы:
- index.html — лендинг
- api/lead.js — серверная отправка заявок в Telegram
- vercel.json — конфигурация

## После загрузки проекта в Vercel
Откройте:
Project → Settings → Environment Variables

Добавьте:
1. TELEGRAM_BOT_TOKEN = токен бота из BotFather
2. TELEGRAM_CHAT_ID = 5280808985

Переменные добавьте для Production (и Preview, если хотите тестировать Preview).

После добавления переменных выполните Redeploy.

## Проверка
1. Откройте сайт.
2. Заполните форму «Рассчитать мой автомобиль».
3. Заявка должна прийти в Telegram.
4. Кнопка «Написать в Telegram» отдельно ведёт на:
   https://t.me/uralmechanic

ВАЖНО:
- Никогда не вставляйте TELEGRAM_BOT_TOKEN в index.html.
- Если форма показывает ошибку, смотрите Vercel → Project → Logs.
