# Upgrade Plan

## Цель
- Убрать запрос OpenAI API Key из клиента, ключ только на реле (env).
- Внедрить Tailwind + shadcn/ui и заменить компоненты на shadcn.

## Этап 1 — Ключ OpenAI только из env (через relay)
- Удалить prompt и чтение ключа из localStorage в `VoiceChat.tsx`.
- Хранить ключ в `relay-server/.env` (`OPENAI_API_KEY`).
- Клиент работает только через локальный релей `ws://localhost:8080`.

## Этап 2 — Установка Tailwind + shadcn/ui
- Установить Tailwind, настроить `tailwind.config.js`, `postcss.config.js`.
- Подключить Tailwind в `src/index.css`.
- Установить shadcn/ui и базовые компоненты (`button`, `input`, `card`, `dialog`, ...).

## Этап 3 — Миграция компонентов
- Заменить кастомные кнопки на `@/components/ui/button` в `VoiceChat.tsx`, `PromptLibrary.tsx`, `ScrapeForm.tsx`.
- Перевести верстку с SCSS на utility-классы Tailwind и компоненты shadcn.
- По мере миграции удалять неиспользуемые `.scss`.

## Этап 4 — Чистка и дизайн
- Удалить SASS, если полностью не нужен.
- Настроить темы/цвета в `tailwind.config.js`.

## Проверка
- Запуск: `npm run relay` (ключ из env) + `npm start` (клиент без модалки).
