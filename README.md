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
4. Дождитесь успешного задания `deploy`. Сайт будет доступен по адресу `https://andreaboticelli.github.io/space-inside-website/`.

В workflow переменная `NEXT_PUBLIC_BASE_PATH` равна `/space-inside-website`, чтобы изображения и файлы Next.js работали под адресом репозитория. Если позже привязать отдельный домен к GitHub Pages, уберите это значение из workflow и настройте домен в **Settings → Pages**: на собственном домене сайт должен собираться для корня `/`.
