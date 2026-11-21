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

Aplikacja korzysta z Supabase. W publicznym kodzie klienta może znajdować się wyłącznie klucz publishable/anon. Nigdy nie umieszczaj w kodzie publicznym klucza `service_role`, secret key, haseł ani prywatnych kluczy usług.

- Dostęp do danych i działań musi być ograniczony przez polityki RLS oraz kontrole po stronie serwera.
- Nie traktuj ukrywania przycisków w interfejsie jako zabezpieczenia dostępu.
- Zmiany schematu i polityk bazy danych sprawdzaj na odpowiednich scenariuszach przed publikacją.
- Nie dodawaj do repozytorium sekretów, eksportów danych użytkowników ani kluczy prywatnych.

## Zasady pracy nad projektem

Przed wprowadzeniem zmian:
1. Sprawdź aktualną implementację i istniejące scenariusze użytkownika.
2. Zachowaj działające funkcje i zgodność z GitHub Pages.
3. Sprawdź wersję mobilną oraz instalację PWA.
4. Po zmianach przetestuj powiązane funkcje i aktualizację Service Workera.

## Status

Projekt jest rozwijany. Funkcje, dostępność i dokumenty mogą się zmieniać. Strony prawne mają charakter informacyjny i wymagają weryfikacji przed wykorzystaniem jako ostateczne dokumenty prawne.
