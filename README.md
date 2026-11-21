# ZSPM Community

Niezależny projekt społecznościowy tworzony z myślą o uczniach ZSPM. Projekt nie jest oficjalną aplikacją szkoły ani jej kanałem komunikacji.

## Co zawiera projekt

- aplikację internetową PWA: logowanie, profile, znajomi, czaty i grupy;
- aktywność społeczności, forum, pomysły, wydarzenia i ankiety;
- powiadomienia oraz ustawienia prywatności;
- stronę prezentacyjną i instalacyjną;
- dokumenty informacyjne, prywatności i bezpieczeństwa.

## Główne pliki

| Ścieżka | Zastosowanie |
|---|---|
| `index.html` | Punkt wejścia aplikacji |
| `public/app.js` | Logika aplikacji |
| `public/modern.css` | Główna warstwa stylów interfejsu |
| `public/supabase-config.js` | Publiczna konfiguracja klienta Supabase |
| `service-worker.js` | Pamięć podręczna PWA i powiadomienia |
| `manifest.webmanifest` | Metadane instalacji PWA |
| `download.html` | Strona prezentacyjna i instrukcja instalacji |
| `polityka-prywatnosci.html` | Informacje o prywatności |
| `polityka-bezpieczenstwa.html` | Zasady bezpieczeństwa społeczności |
| `nota-prawna.html` | Informacje prawne o projekcie |

## Uruchamianie i publikacja

Aktywna wersja aplikacji jest obecnie statyczną stroną internetową. Głównym punktem wejścia jest `index.html`; logika i style są ładowane z katalogu `public/`.

Projekt jest publikowany przez GitHub Pages z gałęzi `main`:

- aplikacja: https://tymur25112011-dev.github.io/Zspmapp/
- strona prezentacyjna: https://tymur25112011-dev.github.io/Zspmapp/download.html

W repozytorium znajduje się również początkowy szablon React/Vite w katalogu `src/`. Nie jest on obecnie główną wersją wdrożonej aplikacji. Nie należy zakładać, że polecenie `npm run build` buduje aktywną wersję PWA bez wcześniejszego uporządkowania procesu migracji.

## Backend i bezpieczeństwo

Aplikacja korzysta z Supabase. W publicznym kodzie klienta może znajdować się wyłącznie publishable/anon key — nigdy `service_role`, secret key, hasła ani klucze приватных сервисов.

- Dostęp do строк и действий должен ограничиваться RLS-политиками и проверками на стороне сервера.
- Не полагайтесь на скрытие кнопок в интерфейсе как на защиту доступа.
- Изменения схемы и политик базы данных нужно проверять на тестовых сценариях до публикации.
- Не добавляйте в репозиторий секреты, экспорт пользовательских данных или приватные ключи.

## Разработка

Перед изменениями:
1. Проверьте текущую реализацию и существующие пользовательские сценарии.
2. Сохраните рабочие функции и совместимость с GitHub Pages.
3. Проверьте мобильную версию и установку PWA.
4. После изменений проверьте связанные функции и обновление Service Worker.

## Статус

Проект развивается. Функции, доступность и документы могут меняться. Юридические страницы являются информационными материалами проекта и требуют проверки перед использованием в качестве окончательных юридических документов.
