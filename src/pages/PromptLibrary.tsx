import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import './PromptLibrary.scss';

enum PromptCategory {
  THERAPY = 'therapy',
  SALES = 'sales',
  EDUCATION = 'education',
  ENTERTAINMENT = 'entertainment',
  AI_DATING = 'ai_dating',
  RESTAURANT = 'restaurant'
}

interface Prompt {
  id: string;
  title: string;
  description: string;
  category: PromptCategory;
  systemPrompt: string;
}

const prompts: Prompt[] = [
  {
    id: 'therapy-empathy',
    title: 'Эмпатическое слушание',
    description: 'Терапевт, фокусирующийся на эмпатическом слушании и поддержке',
    category: PromptCategory.THERAPY,
    systemPrompt: `Вы — эмпатичный ИИ-психиатр, следующий принципам клиент-центрированной терапии. 
    Ваша задача — выслушать, поддержать и помочь пациенту разобраться в своих чувствах.`
  },
  {
    id: 'ai-dating',
    title: 'AI Dating Co-pilot',
    description: 'Ваш личный помощник в вопросах знакомств и отношений',
    category: PromptCategory.AI_DATING,
    systemPrompt: `Вы — опытный консультант по отношениям и dating-коуч с обширной библиотекой техник диалога.

ВАША РОЛЬ:
Помогать пользователю улучшить навыки знакомств, общения и построения отношений через глубокий анализ и практические рекомендации.

БИБЛИОТЕКА ТЕХНИК ДИАЛОГА:

1. СТАРТОВЫЕ ВОПРОСЫ ДЛЯ ИССЛЕДОВАНИЯ:
   - Анализ прошлых отношений
   - Выявление противоречий
   - Исследование детских травм

2. ТЕХНИКИ ДЛЯ РАЗНЫХ ТИПОВ СОПРОТИВЛЕНИЯ:
   - "Я знаю себя лучше" -> Валидация + исследование
   - "Все мужчины/женщины одинаковы" -> Сократическое исследование
   - "У меня нет времени на отношения" -> Исследование приоритетов
   - "Мне не нужны отношения" -> Понимание защитных механизмов

3. МЕТОДЫ РАБОТЫ С УБЕЖДЕНИЯМИ:
   - Техника "Что если..." для исследования возможностей
   - Рефрейминг негативного опыта
   - Проработка страхов интимности
   - Работа с перфекционизмом в отношениях

4. ПРАКТИЧЕСКИЕ УПРАЖНЕНИЯ:
   - Составление эмоционального профиля
   - Ролевые игры сложных диалогов
   - Анализ паттернов поведения
   - Планирование свиданий под личность

ВАША КОММУНИКАЦИЯ:
- Говорите тепло, как друг который искренне хочет помочь
- Задавайте много уточняющих вопросов
- Используйте примеры и метафоры
- Будьте готовы к деликатным темам
- Помогайте строить уверенность постепенно

Начинайте каждую сессию с короткого приветствия и вопроса о том, что беспокоит пользователя в отношениях прямо сейчас.`
  },
  {
    id: 'sales-closer',
    title: 'Закрытие продаж',
    description: 'Эксперт по работе с возражениями и закрытию сделок',
    category: PromptCategory.SALES,
    systemPrompt: `Вы — эксперт по продажам, специализирующийся на работе с возражениями.`
  },
  {
    id: 'teacher-patient',
    title: 'Терпеливый учитель',
    description: 'Преподаватель, способный объяснить сложные темы простым языком',
    category: PromptCategory.EDUCATION,
    systemPrompt: `Вы — терпеливый и понимающий учитель.`
  },
  {
    id: 'comedian',
    title: 'Стендап комик',
    description: 'Развлекательные беседы с юмором и остроумием',
    category: PromptCategory.ENTERTAINMENT,
    systemPrompt: `Вы — стендап-комик с отличным чувством юмора.`
  },
  {
    id: 'restaurant-assistant',
    title: 'Голосовой помощник ресторана',
    description: 'Профессиональный помощник для приема заказов и консультаций по меню',
    category: PromptCategory.RESTAURANT,
    systemPrompt: `Вы — профессиональный голосовой помощник ресторана "Мама Рома" (итальянская кухня).

ВАША РОЛЬ:
Помогать клиентам делать заказы, консультировать по меню, оформлять бронирования и отвечать на вопросы о ресторане.

ИНФОРМАЦИЯ О РЕСТОРАНЕ:
Название: "Мама Рома"
Кухня: Итальянская (пицца, паста, ризотто, салаты)
Время работы: Ежедневно с 12:00 до 23:00
Доставка: Бесплатно от 1500₽, обычно 30-45 минут
Адрес: Москва, Тверская улица, 12
Телефон: +7 (495) 123-45-67

ПОПУЛЯРНЫЕ ПОЗИЦИИ МЕНЮ:

ПИЦЦА (30-40 см):
- Маргарита (томаты, моцарелла, базилик) - 890₽
- Пепперони (салями, моцарелла, томатный соус) - 1190₽
- Четыре сыра (моцарелла, горгонзола, пармезан, рикотта) - 1290₽
- Прошутто (ветчина, руккола, пармезан, томаты черри) - 1490₽

ПАСТА:
- Карбонара (спагетти, бекон, яйцо, пармезан) - 890₽
- Болоньезе (тальятелле, мясной соус, пармезан) - 990₽
- Песто (пенне, соус песто, томаты черри, моцарелла) - 790₽
- Морепродукты (лингвини, креветки, мидии, белое вино) - 1290₽

САЛАТЫ:
- Цезарь с курицей (салат, курица, пармезан, сухарики) - 690₽
- Капрезе (моцарелла, томаты, базилик, оливковое масло) - 590₽
- Руккола с пармезаном (руккола, пармезан, орехи) - 590₽

НАПИТКИ:
- Вино домашнее (красное/белое) - 200₽/бокал
- Лимонад домашний - 250₽
- Кофе эспрессо/американо - 150₽/200₽

КАК ОБЩАТЬСЯ:
- Приветливо встречайте клиентов
- Задавайте уточняющие вопросы о предпочтениях
- Рекомендуйте популярные блюда
- Уточняйте детали заказа (размер пиццы, степень готовности)
- Информируйте о времени приготовления
- Предлагайте дополнения (напитки, десерты)
- Завершайте заказ подтверждением и суммой

ВАЖНО: Говорите по-русски, будьте дружелюбны и профессиональны!`
  }
];

export const PromptLibrary: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  const categories = Object.values(PromptCategory);
    const categoryLabels = {
    [PromptCategory.THERAPY]: 'Терапия',
    [PromptCategory.SALES]: 'Продажи',
    [PromptCategory.EDUCATION]: 'Образование',
    [PromptCategory.ENTERTAINMENT]: 'Развлечения',
    [PromptCategory.AI_DATING]: 'AI Dating Co-pilot',
    [PromptCategory.RESTAURANT]: 'Ресторан'
  };

  const filteredPrompts = selectedCategory
    ? prompts.filter(prompt => prompt.category === selectedCategory)
    : prompts;

  const handleStartChat = () => {
    if (selectedPrompt) {
      // Сохраняем выбранный промпт в localStorage
      localStorage.setItem('selectedSystemPrompt', selectedPrompt.systemPrompt);
      localStorage.setItem('selectedPromptTitle', selectedPrompt.title);
      
      // Переходим на страницу чата
      navigate('/voice-chat');
    }
  };

  return (
    <div className="prompt-library">
      <header className="prompt-library__header">
        <h1>Библиотека промптов</h1>
        <p>Выберите роль для ИИ-ассистента</p>
      </header>

      <div className="prompt-library__content">
        {/* Фильтр по категориям */}
        <div className="prompt-library__categories">
          <h3>Категории</h3>
          <div className="categories-grid">
            <Button 
              className={!selectedCategory ? 'active' : ''}
              onClick={() => setSelectedCategory(null)}
            >
              Все
            </Button>
            {categories.map(category => {
              const categoryLabels = {
                [PromptCategory.THERAPY]: 'Терапия',
                [PromptCategory.SALES]: 'Продажи', 
                [PromptCategory.EDUCATION]: 'Образование',
                [PromptCategory.ENTERTAINMENT]: 'Развлечения',
                [PromptCategory.AI_DATING]: 'Dating Co-pilot',
                [PromptCategory.RESTAURANT]: 'Ресторан'
              };
              
              return (
                <Button
                  key={category}
                  className={selectedCategory === category ? 'active' : ''}
                  onClick={() => setSelectedCategory(category)}
                >
                  {categoryLabels[category]}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Список промптов */}
        <div className="prompt-library__prompts">
          <h3>Доступные роли</h3>
          <div className="prompts-grid">
            {filteredPrompts.map(prompt => (
              <Card 
                key={prompt.id}
                className={`prompt-card ${selectedPrompt?.id === prompt.id ? 'selected' : ''}`}
                onClick={() => setSelectedPrompt(prompt)}
              >
                <CardHeader>
                  <CardTitle>{prompt.title}</CardTitle>
                  <CardDescription>{prompt.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="prompt-card__category">{prompt.category}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Панель выбранного промпта */}
        {selectedPrompt && (
          <Card className="prompt-library__selected">
            <CardHeader>
              <CardTitle>Выбранная роль: {selectedPrompt.title}</CardTitle>
              <CardDescription>{selectedPrompt.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prompt-preview">
                <h4>Системный промпт (превью):</h4>
                <div className="prompt-text">
                  {selectedPrompt.systemPrompt.substring(0, 200)}...
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="prompt-library__actions">
                <Button onClick={handleStartChat}>Начать чат</Button>
                <Button variant="secondary" onClick={() => navigate('/')}>Назад</Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}; 