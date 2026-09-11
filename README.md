# Космос Внутри

Одностраничный сайт творческой команды: брейк-данс, фаер-шоу и анимационные программы.

## Запуск на компьютере

Нужны Node.js 22 и npm.

```bash
npm install
npm run dev
```

После запуска сайт будет доступен по адресу `http://localhost:3000`.

## Проверка production-версии

```bash
npm run build
npm run start
```

## Публикация через GitHub и Vercel

1. Создайте пустой репозиторий на GitHub без дополнительных файлов.
2. В терминале, находясь в этой папке, выполните:

```bash
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/ИМЯ_РЕПОЗИТОРИЯ.git
git push -u origin main
```

3. В Vercel выберите **Add New → Project** и импортируйте созданный репозиторий.
4. Vercel автоматически определит Next.js. Оставьте Root Directory пустым, Build Command — `npm run build`, Output Directory — значение по умолчанию.
5. Нажмите **Deploy**.

## Отправка заявок

Форма отправляет заявки через Resend. Самый простой способ подключения:

1. В проекте Vercel откройте **Storage / Marketplace** и подключите интеграцию **Resend**.
2. Убедитесь, что Vercel добавил переменную `RESEND_API_KEY`.
3. Добавьте переменную `CONTACT_TO_EMAIL` со значением `spaceinsidespb2305@gmail.com`.
4. Для первого теста можно использовать `CONTACT_FROM_EMAIL` со значением `Космос Внутри <onboarding@resend.dev>`. Для полноценной отправки подключите в Resend собственный домен и замените адрес отправителя.
5. Выполните повторный Deploy в Vercel, чтобы применились переменные.

Если Resend ещё не подключён, форма предложит посетителю открыть уже заполненное письмо в его почтовом приложении.

Каждый следующий push в ветку `main` будет автоматически обновлять production-сайт.
