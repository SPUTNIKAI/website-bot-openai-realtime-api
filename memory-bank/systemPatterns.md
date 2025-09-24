# System Patterns

## Архитектура
- SPA на React (React Router) с тремя основными экранами: `ScrapeForm`, `PromptLibrary`, `VoiceChat`.
- Интеграция с OpenAI Realtime API через `@openai/realtime-api-beta`.
- Аудио-стек: `wavtools` (рекордер, проигрыватель, анализ спектра) + визуализация через canvas.

## Ключевые решения
- Хранение ключа OpenAI в `localStorage` с быстрым переключением (`resetAPIKey`).
- Передача скрапнутого контента как часть системных инструкций для сессии Realtime.
- Авто-скролл логов диалога, рендер спектров клиента/сервера.

## Взаимодействие компонентов
- `App` управляет маршрутизацией и пробрасывает `scrapedContent` в `VoiceChat`.
- `PromptLibrary` сохраняет выбранный системный промпт в `localStorage` и переходит в `/voice-chat`.
- `VoiceChat` конфигурирует `RealtimeClient`, аудио захват/воспроизведение и события диалога.

## Потоки данных
- Микрофон ⇒ `WavRecorder` ⇒ `client.appendInputAudio` (при VAD) ⇒ Realtime API.
- Ответ ⇒ `wavStreamPlayer.add16BitPCM` ⇒ визуализация ⇒ опциональное декодирование в WAV.
