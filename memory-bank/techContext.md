# Tech Context

## Технологии
- React 18, TypeScript
- React Router
- `@openai/realtime-api-beta`
- `wavtools` (локальная библиотека в `src/lib/wavtools`)
- SASS стили

## Скрипты
- `yarn start` — запуск dev-сервера
- `yarn build` — сборка
- `yarn test` — тесты

## Переменные окружения
- `.env` должен содержать `REACT_APP_SCRAPINGANT_API_KEY` для скрапинга
- Ключ OpenAI вводится в браузере по запросу и сохраняется в `localStorage`

## Ограничения
- Браузерные разрешения на микрофон обязательны
- Бета-статус Realtime API и клиента, возможны изменения
