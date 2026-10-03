# Космос Внутри

Одностраничный сайт творческой команды. Проект собирается в статические файлы и не требует сервера.

## Локальный запуск

Нужны Node.js 22 и npm.

```bash
npm ci
npm run dev
```

Сайт откроется на `http://localhost:3000`.

## Проверка сборки

```bash
npm run build
```

Результат будет в папке `out/`. Формы отправки на сайте нет; контакты доступны напрямую. Видео встроены через VK и зависят от доступности VK Видео у посетителя.

## GitHub Pages

Репозиторий: `andreaboticelli/space-inside-website`. В `.github/workflows/pages.yml` настроена публикация при каждом push в `main`.

1. В репозитории GitHub откройте **Settings → Pages**.
2. В разделе **Build and deployment** выберите **Source: GitHub Actions**.
3. Отправьте изменения в ветку `main` (или запустите workflow **Deploy to GitHub Pages** вручную во вкладке **Actions**).
4. Дождитесь успешного задания `deploy` и настройте собственный домен `spaceinside.ru` в **Settings → Pages → Custom domain**.

Сайт собирается для корня `/`, чтобы стили и изображения работали на `spaceinside.ru`. До подключения собственного домена адрес проекта `https://andreaboticelli.github.io/space-inside-website/` может отображаться некорректно.
