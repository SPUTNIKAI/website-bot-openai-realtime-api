# Active Context

## Текущий фокус
- Апгрейд: ключ OpenAI только через relay + внедрение Tailwind/shadcn.

## Недавние изменения
- Включён локальный релей в `VoiceChat.tsx`.
- Удалён запрос ключа и логика `localStorage` в клиенте.
- Установлены Tailwind и зависимости shadcn/ui; добавлены `tailwind.config.js`, `postcss.config.js`, слои в `src/index.css`.
- Добавлен shadcn `Button` (`src/components/ui/button.tsx`) и утилита `cn`.
- Заменены кнопки на shadcn в `VoiceChat.tsx` и `PromptLibrary.tsx`.

## Следующие шаги
- Расширить установку shadcn-компонентов (dialog, card, input и т.д.).
- Перевести оставшиеся компоненты/разметку на Tailwind + shadcn.
- Очистить SASS после миграции.

## Активные решения/соображения
- Ключ OpenAI хранится только на реле (env), в клиент не попадает.
- UI стандартизируется через shadcn/ui с Tailwind.
