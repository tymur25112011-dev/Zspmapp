"use strict";

const $ = id => document.getElementById(id);

const THEME_KEY = "zspm_community_theme";
const APP_LANG_KEY="zspm_community_language";
const APP_LANGS={"pl":{"lang":"Język aplikacji","intro":"Wybierz język całej aplikacji.","appearance":"Wygląd aplikacji","appearanceDesc":"Wybierz motyw interfejsu. Ustawienie zostanie zapamiętane na tym urządzeniu.","theme":"Motyw","push":"Powiadomienia na telefonie","pushDesc":"Otrzymuj powiadomienia o nowych wiadomościach i aktywności, nawet gdy aplikacja jest zamknięta. Wymagana jest zgoda systemu Android.","pushCheck":"Sprawdzanie ustawień...","pushOn":"Włącz powiadomienia","pushOff":"Wyłącz powiadomienia","privacy":"Prywatność","privacyDesc":"Ustawienia prywatności profilu są zapisywane na Twoim koncie.","visible":"Ankieta widoczna na liście","visibleDesc":"Gdy wyłączysz, Twój profil nie będzie wyświetlany w sekcji „Ankiety uczniów”.","showClass":"Pokazuj klasę w ankiecie","classDesc":"Ukrywa numer klasy na Twoim profilu publicznym.","showInterests":"Pokazuj zainteresowania w ankiecie","interestsDesc":"Ukrywa Twoje zainteresowania na profilu publicznym.","logout":"Wyloguj się"},"en":{"lang":"App language","intro":"Choose the language used across the app.","appearance":"App appearance","appearanceDesc":"Choose the interface theme. This setting is saved on this device.","theme":"Theme","push":"Phone notifications","pushDesc":"Receive notifications about new messages and activity even when the app is closed. Android permission is required.","pushCheck":"Checking settings...","pushOn":"Enable notifications","pushOff":"Disable notifications","privacy":"Privacy","privacyDesc":"Your profile privacy settings are saved to your account.","visible":"Show questionnaire in the list","visibleDesc":"When disabled, your profile will not appear in Student questionnaires.","showClass":"Show class in questionnaire","classDesc":"Hides your class on your public profile.","showInterests":"Show interests in questionnaire","interestsDesc":"Hides your interests on your public profile.","logout":"Log out"},"ru":{"lang":"Язык приложения","intro":"Выберите язык всего приложения.","appearance":"Внешний вид приложения","appearanceDesc":"Выберите тему интерфейса. Настройка сохранится на этом устройстве.","theme":"Тема","push":"Уведомления на телефоне","pushDesc":"Получайте уведомления о новых сообщениях и активности, даже когда приложение закрыто. Требуется разрешение Android.","pushCheck":"Проверка настроек...","pushOn":"Включить уведомления","pushOff":"Отключить уведомления","privacy":"Приватность","privacyDesc":"Настройки приватности профиля сохраняются в вашем аккаунте.","visible":"Показывать анкету в списке","visibleDesc":"Если отключить, ваш профиль не будет отображаться в разделе анкет учеников.","showClass":"Показывать класс в анкете","classDesc":"Скрывает номер класса в публичном профиле.","showInterests":"Показывать интересы в анкете","interestsDesc":"Скрывает ваши интересы в публичном профиле.","logout":"Выйти"},"uk":{"lang":"Мова застосунку","intro":"Виберіть мову всього застосунку.","appearance":"Вигляд застосунку","appearanceDesc":"Виберіть тему інтерфейсу. Налаштування збережеться на цьому пристрої.","theme":"Тема","push":"Сповіщення на телефоні","pushDesc":"Отримуйте сповіщення про нові повідомлення та активність, навіть коли застосунок закрито. Потрібен дозвіл Android.","pushCheck":"Перевірка налаштувань...","pushOn":"Увімкнути сповіщення","pushOff":"Вимкнути сповіщення","privacy":"Приватність","privacyDesc":"Налаштування приватності профілю зберігаються у вашому обліковому записі.","visible":"Показувати анкету у списку","visibleDesc":"Якщо вимкнути, ваш профіль не відображатиметься в анкетах учнів.","showClass":"Показувати клас в анкеті","classDesc":"Приховує номер класу у вашому публічному профілі.","showInterests":"Показувати інтереси в анкеті","interestsDesc":"Приховує ваші інтереси у публічному профілі.","logout":"Вийти"}};
let appLanguage=(()=>{try{const v=localStorage.getItem(APP_LANG_KEY);return APP_LANGS[v]?v:"pl";}catch(e){return "pl";}})();
const tr=(key)=>APP_LANGS[appLanguage]?.[key]||APP_LANGS.pl[key]||key;
const APP_SHELL={
pl:{feed:"Aktywność",feedDesc:"Nowe wpisy i pomysły społeczności",events:"Wydarzenia",eventsDesc:"Karty wydarzeń i ogłoszenia",home:"Główna",surveys:"Poznaj ludzi",profile:"Profil",chat:"Czat",friends:"Znajomi",settings:"Ustawienia",hello:"Cześć,",welcome:"Witamy w społeczności Twojej szkoły.",hero:"Witaj w ZSPM!",heroText:"Poznawaj nowych ludzi, nawiązuj przyjaźnie i integruj się ze społecznością szkolną.",discover:"Odkryj aplikację",profiles:"Poznawaj ludzi",profilesDesc:"Znajdź nowych znajomych w społeczności",myProfile:"Mój profil",myProfileDesc:"Twój profil w społeczności",messages:"Wiadomości",messagesDesc:"Prywatne rozmowy ze znajomymi",friendsTitle:"Znajomi",friendsDesc:"Zaproszenia i znajomi",settingsTitle:"Ustawienia",settingsDesc:"Zarządzaj swoim kontem",ideas:"Wasze Pomysły",ideasDesc:"Propozycje i głosowanie społeczności",forum:"Forum",forumDesc:"Dyskusje i szkolne tematy",timetable:"Plan lekcji",timetableDesc:"Rozkład zajęć dla klas technikum",planner:"Mój plan",plannerDesc:"Zadania i terminy",cosmetics:"Sklep wyglądu",cosmeticsDesc:"Odblokuj nowe ozdoby",ranking:"Ranking",rankingDesc:"Aktywność, wsparcie i polubienia",information:"Informacje",informationDesc:"O projekcie, Premium i zasadach",support:"Wesprzyj twórcę",supportDesc:"Wspieraj rozwój projektu",account:"Konto",logout:"Wyloguj się"},
en:{feed:"Activity",feedDesc:"New community posts and ideas",events:"Events",eventsDesc:"Event cards and announcements",home:"Home",surveys:"Meet people",profile:"Profile",chat:"Chat",friends:"Friends",settings:"Settings",hello:"Hello,",welcome:"Welcome to your school community.",hero:"Welcome to ZSPM!",heroText:"Meet new people, make friends and connect with your school community.",discover:"Explore the app",profiles:"Meet people",profilesDesc:"Find new friends in your community",myProfile:"My profile",myProfileDesc:"Your community profile",messages:"Messages",messagesDesc:"Private conversations with friends",friendsTitle:"Friends",friendsDesc:"Requests and friends",settingsTitle:"Settings",settingsDesc:"Manage your account",ideas:"Your Ideas",ideasDesc:"Community suggestions and voting",forum:"Forum",forumDesc:"Discussions and school topics",timetable:"Timetable",timetableDesc:"Class schedules",planner:"My planner",plannerDesc:"Tasks and deadlines",cosmetics:"Appearance shop",cosmeticsDesc:"Unlock new decorations",ranking:"Ranking",rankingDesc:"Activity, support and likes",information:"Information",informationDesc:"About the project, Premium and rules",support:"Support the creator",supportDesc:"Help the project grow",account:"Account",logout:"Log out"},
ru:{feed:"Активность",feedDesc:"Новые публикации и идеи сообщества",events:"События",eventsDesc:"Карточки мероприятий и объявления",home:"Главная",surveys:"Знакомства",profile:"Профиль",chat:"Чат",friends:"Друзья",settings:"Настройки",hello:"Привет,",welcome:"Добро пожаловать в школьное сообщество.",hero:"Добро пожаловать в ZSPM!",heroText:"Знакомься с новыми людьми, заводи друзей и общайся со школьным сообществом.",discover:"Открой приложение",profiles:"Знакомства",profilesDesc:"Находи новых друзей в школьном сообществе",myProfile:"Мой профиль",myProfileDesc:"Твой профиль в сообществе",messages:"Сообщения",messagesDesc:"Личные беседы с друзьями",friendsTitle:"Друзья",friendsDesc:"Заявки и друзья",settingsTitle:"Настройки",settingsDesc:"Управление аккаунтом",ideas:"Ваши идеи",ideasDesc:"Предложения и голосование сообщества",forum:"Форум",forumDesc:"Обсуждения и школьные темы",timetable:"Расписание",timetableDesc:"Расписание занятий классов",planner:"Мой план",plannerDesc:"Задачи и сроки",cosmetics:"Магазин оформления",cosmeticsDesc:"Открывай новые украшения",ranking:"Рейтинг",rankingDesc:"Активность, поддержка и лайки",information:"Информация",informationDesc:"О проекте, Premium и правилах",support:"Поддержать автора",supportDesc:"Помоги развитию проекта",account:"Аккаунт",logout:"Выйти"},
uk:{feed:"Активність",feedDesc:"Нові дописи та ідеї спільноти",events:"Події",eventsDesc:"Картки подій та оголошення",home:"Головна",surveys:"Знайомства",profile:"Профіль",chat:"Чат",friends:"Друзі",settings:"Налаштування",hello:"Привіт,",welcome:"Ласкаво просимо до шкільної спільноти.",hero:"Ласкаво просимо до ZSPM!",heroText:"Знайомся з новими людьми, знаходь друзів та спілкуйся зі шкільною спільнотою.",discover:"Відкрий застосунок",profiles:"Знайомства",profilesDesc:"Знаходь нових друзів у шкільній спільноті",myProfile:"Мій профіль",myProfileDesc:"Твій профіль у спільноті",messages:"Повідомлення",messagesDesc:"Приватні розмови з друзями",friendsTitle:"Друзі",friendsDesc:"Запити та друзі",settingsTitle:"Налаштування",settingsDesc:"Керуй обліковим записом",ideas:"Ваші ідеї",ideasDesc:"Пропозиції та голосування спільноти",forum:"Форум",forumDesc:"Обговорення та шкільні теми",timetable:"Розклад уроків",timetableDesc:"Розклад занять класів",planner:"Мій план",plannerDesc:"Завдання та терміни",cosmetics:"Крамниця оформлення",cosmeticsDesc:"Відкривай нові прикраси",ranking:"Рейтинг",rankingDesc:"Активність, підтримка та вподобання",information:"Інформація",informationDesc:"Про проєкт, Premium та правила",support:"Підтримати автора",supportDesc:"Допоможи розвитку проєкту",account:"Обліковий запис",logout:"Вийти"}
};
function shellTr(k){return APP_SHELL[appLanguage]?.[k]||APP_SHELL.pl[k]||k;}

const APP_UI_TEXT={
"Logowanie jest chwilowo niedostępne. Odśwież stronę i spróbuj ponownie.":["Login is temporarily unavailable. Refresh and try again.","Вход временно недоступен. Обновите страницу и попробуйте снова.","Вхід тимчасово недоступний. Оновіть сторінку та спробуйте ще раз."],
"Pseudonim musi mieć co najmniej 2 znaki.":["Nickname must be at least 2 characters.","Никнейм должен содержать не менее 2 символов.","Псевдонім має містити щонайменше 2 символи."],
"Hasło musi mieć co najmniej 8 znaków.":["Password must be at least 8 characters.","Пароль должен содержать не менее 8 символов.","Пароль має містити щонайменше 8 символів."],
"Zaloguj się ponownie, aby zapisać profil.":["Log in again to save your profile.","Войдите снова, чтобы сохранить профиль.","Увійдіть знову, щоб зберегти профіль."],
"Ten pseudonim jest już zajęty. Wybierz inną nazwę.":["This nickname is already taken. Choose another one.","Этот никнейм уже занят. Выберите другой.","Цей псевдонім уже зайнятий. Виберіть інший."],
"Oddzielna ankieta do poznawania innych uczniów":["A separate questionnaire for meeting other students","Отдельная анкета для знакомства с учениками","Окрема анкета для знайомства з іншими учнями"],
"Moderacja i statusy użytkowników":["Moderation and user statuses","Модерация и статусы пользователей","Модерація та статуси користувачів"],
"Panel administracji":["Admin panel","Панель администратора","Панель адміністратора"],
"Ładowanie panelu administracji...":["Loading admin panel...","Загрузка панели администратора...","Завантаження панелі адміністратора..."],
"Powód":["Reason","Причина","Причина"],
"Obraźliwe zachowanie":["Abusive behaviour","Оскорбительное поведение","Образлива поведінка"],
"Nękanie lub dokuczanie":["Harassment or bullying","Преследование или травля","Переслідування або цькування"],
"Nieodpowiednie treści":["Inappropriate content","Неподходящий контент","Неприйнятний вміст"],
"Zastosuj karę":["Apply penalty","Применить наказание","Застосувати покарання"],
"Usunięty użytkownik":["Deleted user","Удалённый пользователь","Видалений користувач"],
"Usuń z rankingu":["Remove from ranking","Убрать из рейтинга","Вилучити з рейтингу"],
"Nieznany użytkownik":["Unknown user","Неизвестный пользователь","Невідомий користувач"],
"Zgłoszona wiadomość":["Reported message","Жалоба на сообщение","Скарга на повідомлення"],
"Zgłoszony profil":["Reported profile","Жалоба на профиль","Скарга на профіль"],
"Zgłoszone wydarzenie":["Reported event","Жалоба на мероприятие","Скарга на подію"],
"Zgłoszony wpis forum":["Reported forum post","Жалоба на запись форума","Скарга на допис форуму"],
"Zarządzaj społecznością, wiadomościami i zgłoszeniami.":["Manage the community, messages and reports.","Управляйте сообществом, сообщениями и жалобами.","Керуйте спільнотою, повідомленнями та скаргами."],
"Użytkownicy":["Users","Пользователи","Користувачі"],
"Zgłoszenia":["Reports","Жалобы","Скарги"],
"Użytkownicy i moderacja":["Users and moderation","Пользователи и модерация","Користувачі та модерація"],
"Ranking wpłat":["Donation ranking","Рейтинг пожертвований","Рейтинг внесків"],
"Użytkownik":["User","Пользователь","Користувач"],
"Kwota (zł)":["Amount (PLN)","Сумма (злотые)","Сума (злоті)"],
"Zapisz kwotę":["Save amount","Сохранить сумму","Зберегти суму"],
"Zgłoszenia użytkowników i wiadomości":["User and message reports","Жалобы на пользователей и сообщения","Скарги на користувачів і повідомлення"],
"Wpisz poprawną kwotę od 0 do 1 000 000 zł.":["Enter a valid amount from 0 to PLN 1,000,000.","Введите сумму от 0 до 1 000 000 злотых.","Введіть суму від 0 до 1 000 000 злотих."],
"Nie udało się zapisać kwoty.":["Could not save the amount.","Не удалось сохранить сумму.","Не вдалося зберегти суму."],
"Nie udało się usunąć wpisu.":["Could not delete the entry.","Не удалось удалить запись.","Не вдалося видалити запис."],
"Nie możesz nałożyć kary na własne konto.":["You cannot apply a penalty to your own account.","Нельзя применить наказание к своему аккаунту.","Не можна застосувати покарання до власного облікового запису."],
"Nie udało się wykonać działania.":["The action failed.","Не удалось выполнить действие.","Не вдалося виконати дію."],
"Brak dostępu":["Access denied","Нет доступа","Немає доступу"],
"Ta sekcja jest dostępna wyłącznie dla administratora.":["This section is available to administrators only.","Этот раздел доступен только администраторам.","Цей розділ доступний лише адміністраторам."],
"Ładowanie profili...":["Loading profiles...","Загрузка профилей...","Завантаження профілів..."],
"Ładowanie pomysłów...":["Loading ideas...","Загрузка идей...","Завантаження ідей..."],
"Nie udało się załadować pomysłów. Spróbuj ponownie później.":["Could not load ideas. Try again later.","Не удалось загрузить идеи. Попробуйте позже.","Не вдалося завантажити ідеї. Спробуйте пізніше."],
"Uczeń":["Student","Ученик","Учень"],
"Dodaj nowy pomysł":["Add a new idea","Добавить новую идею","Додати нову ідею"],
"Tytuł":["Title","Название","Назва"],
"Opublikuj pomysł":["Publish idea","Опубликовать идею","Опублікувати ідею"],
"Nie udało się opublikować pomysłu.":["Could not publish the idea.","Не удалось опубликовать идею.","Не вдалося опублікувати ідею."],
"Nie udało się zapisać głosu.":["Could not save your vote.","Не удалось сохранить голос.","Не вдалося зберегти голос."],
"Czy na pewno chcesz usunąć ten pomysł?":["Are you sure you want to delete this idea?","Вы уверены, что хотите удалить эту идею?","Ви впевнені, що хочете видалити цю ідею?"],
"Nie udało się usunąć pomysłu.":["Could not delete the idea.","Не удалось удалить идею.","Не вдалося видалити ідею."],
"Ładowanie rankingów...":["Loading rankings...","Загрузка рейтингов...","Завантаження рейтингів..."],
"Nie udało się załadować rankingów.":["Could not load rankings.","Не удалось загрузить рейтинги.","Не вдалося завантажити рейтинги."],
"TOP aktywności":["Top activity","Топ активности","Топ активності"],
"Łączny szacowany czas aktywności w aplikacji.":["Estimated total time spent in the app.","Общее примерное время активности в приложении.","Орієнтовний загальний час активності в застосунку."],
"TOP wspierających":["Top supporters","Топ поддерживающих","Топ тих, хто підтримує"],
"Kwoty są aktualizowane ręcznie przez administratora.":["Amounts are updated manually by an administrator.","Суммы обновляются администратором вручную.","Суми оновлюються адміністратором вручну."],
"TOP polubień profili":["Top profile likes","Топ лайков профилей","Топ вподобань профілів"],
"Liczba polubień otrzymanych przez profil.":["Number of likes received by a profile.","Количество лайков, полученных профилем.","Кількість вподобань, отриманих профілем."],
"ZSPM Community · Niezależny projekt społecznościowy":["ZSPM Community · Independent community project","ZSPM Community · Независимый проект сообщества","ZSPM Community · Незалежний проєкт спільноти"],
"Twój profil":["Your profile","Твой профиль","Твій профіль"],
"Edytuj ankietę":["Edit questionnaire","Редактировать анкету","Редагувати анкету"],
"Zgłoś profil":["Report profile","Пожаловаться на профиль","Поскаржитися на профіль"],
"Zgłoszono profil":["Profile reported","Профиль отправлен на проверку","Профіль надіслано на перевірку"],
"Twój pseudonim":["Your nickname","Твой никнейм","Твій псевдонім"],
"Napisz w kilku zdaniach, czym się interesujesz...":["Write a few sentences about your interests...","Напишите несколько предложений о своих интересах...","Напишіть кілька речень про свої захоплення..."],
"Wybierz zdjęcie w formacie JPG, PNG lub WebP.":["Choose a JPG, PNG or WebP image.","Выберите изображение JPG, PNG или WebP.","Виберіть зображення JPG, PNG або WebP."],
"Plik jest za duży. Maksymalny rozmiar to 5 MB.":["The file is too large. Maximum size is 5 MB.","Файл слишком большой. Максимальный размер — 5 МБ.","Файл завеликий. Максимальний розмір — 5 МБ."],
"Nie udało się odczytać zdjęcia.":["Could not read the image.","Не удалось прочитать изображение.","Не вдалося прочитати зображення."],
"Nie udało się otworzyć zdjęcia.":["Could not open the image.","Не удалось открыть изображение.","Не вдалося відкрити зображення."],
"Nie udało się przygotować zdjęcia.":["Could not prepare the image.","Не удалось подготовить изображение.","Не вдалося підготувати зображення."],
"Nie udało się przetworzyć zdjęcia.":["Could not process the image.","Не удалось обработать изображение.","Не вдалося обробити зображення."],
"Bez zdjęcia":["No photo","Без фото","Без фото"],
"Nie udało się dodać zdjęcia.":["Could not add the photo.","Не удалось добавить фото.","Не вдалося додати фото."],
"Podaj swoją klasę, np. 2B.":["Enter your class, e.g. 2B.","Укажите свой класс, например 2B.","Вкажіть свій клас, наприклад 2B."],
"Profil został zapisany w bazie danych.":["Profile saved successfully.","Профиль сохранён в базе данных.","Профіль збережено в базі даних."],
"Nie udało się zapisać profilu.":["Could not save the profile.","Не удалось сохранить профиль.","Не вдалося зберегти профіль."],
"Zapisz ankietę":["Save questionnaire","Сохранить анкету","Зберегти анкету"],
"Zaloguj się, aby włączyć powiadomienia.":["Log in to enable notifications.","Войдите, чтобы включить уведомления.","Увійдіть, щоб увімкнути сповіщення."],
"Ta przeglądarka nie obsługuje powiadomień push.":["This browser does not support push notifications.","Этот браузер не поддерживает push-уведомления.","Цей браузер не підтримує push-сповіщення."],
"Powiadomienia są zablokowane. Włącz je w ustawieniach aplikacji Android.":["Notifications are blocked. Enable them in Android app settings.","Уведомления заблокированы. Включите их в настройках Android.","Сповіщення заблоковано. Увімкніть їх у налаштуваннях Android."],
"Nie udało się utworzyć subskrypcji push.":["Could not create push subscription.","Не удалось создать push-подписку.","Не вдалося створити push-підписку."],
"Powiadomienia push są włączone na tym urządzeniu.":["Push notifications are enabled on this device.","Push-уведомления включены на этом устройстве.","Push-сповіщення ввімкнено на цьому пристрої."],
"Powiadomienia push są wyłączone na tym urządzeniu.":["Push notifications are disabled on this device.","Push-уведомления отключены на этом устройстве.","Push-сповіщення вимкнено на цьому пристрої."],
"Nie udało się sprawdzić ustawień powiadomień.":["Could not check notification settings.","Не удалось проверить настройки уведомлений.","Не вдалося перевірити налаштування сповіщень."],
"Domyślny wygląd":["Default appearance","Вид по умолчанию","Типовий вигляд"],
"Pierwsza wiadomość":["First message","Первое сообщение","Перше повідомлення"],
"Aktywny rozmówca":["Active chatter","Активный собеседник","Активний співрозмовник"],
"Nie przeszkadzać":["Do not disturb","Не беспокоить","Не турбувати"],
"Zajęty":["Busy","Занят","Зайнятий"],
"Ten użytkownik nie dodał jeszcze opisu.":["This user has not added a description yet.","Этот пользователь ещё не добавил описание.","Цей користувач ще не додав опис."],
"Osiągnięcia":["Achievements","Достижения","Досягнення"],
"Ładowanie profilu...":["Loading profile...","Загрузка профиля...","Завантаження профілю..."],
"To jest Twój publiczny profil społeczności. Ankieta poznawania uczniów jest osobną funkcją.":["This is your public community profile. The student questionnaire is a separate feature.","Это твой публичный профиль сообщества. Анкета учеников — отдельная функция.","Це твій публічний профіль спільноти. Анкета учнів — окрема функція."],
"Otwórz moją ankietę":["Open my questionnaire","Открыть мою анкету","Відкрити мою анкету"],
"Nie udało się załadować profilu. Spróbuj ponownie.":["Could not load the profile. Try again.","Не удалось загрузить профиль. Попробуйте снова.","Не вдалося завантажити профіль. Спробуйте ще раз."],
"Wgraj własny baner":["Upload your own banner","Загрузить свой баннер","Завантажити власний банер"],
"Użyj gotowego banera":["Use a preset banner","Использовать готовый баннер","Використати готовий банер"],
"Dostępność":["Availability","Доступность","Доступність"],
"Imię":["First name","Имя","Ім'я"],
"Podgląd avatara":["Avatar preview","Предпросмотр аватара","Попередній перегляд аватара"],
"Nick musi mieć co najmniej 2 znaki.":["Nickname must be at least 2 characters.","Ник должен содержать не менее 2 символов.","Нік має містити щонайменше 2 символи."],
"Nie udało się skompresować obrazu.":["Could not compress the image.","Не удалось сжать изображение.","Не вдалося стиснути зображення."],
"Nie udało się otworzyć profilu.":["Could not open the profile.","Не удалось открыть профиль.","Не вдалося відкрити профіль."],
"Zablokować tego użytkownika?":["Block this user?","Заблокировать этого пользователя?","Заблокувати цього користувача?"],
"Nieprawidłowa osoba.":["Invalid user.","Неверный пользователь.","Некоректний користувач."],
"Odblokuj tę osobę, aby wysłać zaproszenie.":["Unblock this person to send a request.","Разблокируйте этого человека, чтобы отправить заявку.","Розблокуйте цю людину, щоб надіслати запит."],
"Ta osoba jest już Twoim znajomym.":["This person is already your friend.","Этот человек уже у вас в друзьях.","Ця людина вже у вас у друзях."],
"Zaproszenie zostało już wysłane.":["The request has already been sent.","Заявка уже отправлена.","Запит уже надіслано."],
"Ta osoba już Cię zaprosiła. Zaakceptuj zaproszenie.":["This person has already invited you. Accept the request.","Этот человек уже отправил вам заявку. Примите её.","Ця людина вже надіслала вам запит. Прийміть його."],
"Zaproszenie do tej osoby już oczekuje.":["A request to this person is already pending.","Заявка этому человеку уже ожидает ответа.","Запит цій людині вже очікує на відповідь."],
"Nie udało się wysłać zaproszenia.":["Could not send the request.","Не удалось отправить заявку.","Не вдалося надіслати запит."],
"Nie udało się zaakceptować zaproszenia.":["Could not accept the request.","Не удалось принять заявку.","Не вдалося прийняти запит."],
"Nie udało się zablokować użytkownika.":["Could not block the user.","Не удалось заблокировать пользователя.","Не вдалося заблокувати користувача."],
"Odblokuj użytkownika":["Unblock user","Разблокировать пользователя","Розблокувати користувача"],
"Już jesteście znajomymi":["You are already friends","Вы уже друзья","Ви вже друзі"],
"Zaakceptuj prośbę":["Accept request","Принять заявку","Прийняти запит"],
"Anuluj prośbę":["Cancel request","Отменить заявку","Скасувати запит"],
"Napisz wiadomość":["Send a message","Написать сообщение","Написати повідомлення"],
"Brak nowych zaproszeń.":["No new requests.","Новых заявок нет.","Нових запитів немає."],
"Nie masz jeszcze znajomych. Poznaj uczniów w sekcji „Ankiety uczniów”.":["You don't have any friends yet. Meet students in Student surveys.","У вас пока нет друзей. Познакомьтесь с учениками в разделе «Анкеты учеников».","У вас ще немає друзів. Познайомтеся з учнями в розділі «Анкети учнів»."],
"Zgłoszono":["Reported","Отправлено","Надіслано"],
"Brak wiadomości":["No messages","Нет сообщений","Немає повідомлень"],
"Nie masz jeszcze rozmów. Dodaj znajomego, aby rozpocząć czat.":["No conversations yet. Add a friend to start chatting.","У вас пока нет бесед. Добавьте друга, чтобы начать чат.","У вас ще немає розмов. Додайте друга, щоб почати чат."],
"Nie udało się załadować czatu. Odśwież stronę.":["Could not load chat. Refresh the page.","Не удалось загрузить чат. Обновите страницу.","Не вдалося завантажити чат. Оновіть сторінку."],
"Dodaj reakcję":["Add reaction","Добавить реакцию","Додати реакцію"],
"Usuń":["Delete","Удалить","Видалити"],
"Zgłoś":["Report","Пожаловаться","Поскаржитися"],
"🌐 Ogólny":["🌐 General","🌐 Общий","🌐 Загальний"],
"Przypięte wiadomości":["Pinned messages","Закреплённые сообщения","Закріплені повідомлення"],
"Nie udało się dodać reakcji.":["Could not add reaction.","Не удалось добавить реакцию.","Не вдалося додати реакцію."],
"Odpowiedź na wiadomość…":["Reply to message…","Ответ на сообщение…","Відповідь на повідомлення…"],
"Edytuj wiadomość:":["Edit message:","Изменить сообщение:","Редагувати повідомлення:"],
"Nie udało się edytować wiadomości.":["Could not edit the message.","Не удалось изменить сообщение.","Не вдалося відредагувати повідомлення."],
"Usunąć tę wiadomość?":["Delete this message?","Удалить это сообщение?","Видалити це повідомлення?"],
"Nie udało się usunąć wiadomości.":["Could not delete the message.","Не удалось удалить сообщение.","Не вдалося видалити повідомлення."],
"Nie udało się zmienić polubienia.":["Could not update the like.","Не удалось изменить отметку «Нравится».","Не вдалося змінити вподобання."],
"Nie udało się wysłać wiadomości. Możliwe, że obowiązuje wyciszenie.":["Could not send the message. You may be muted.","Не удалось отправить сообщение. Возможно, действует ограничение.","Не вдалося надіслати повідомлення. Можливо, діє обмеження."],
"Ważne informacje na tym czacie":["Important information in this chat","Важная информация в этом чате","Важлива інформація в цьому чаті"],
"Ta wiadomość jest już przypięta.":["This message is already pinned.","Это сообщение уже закреплено.","Це повідомлення вже закріплено."],
"Nie udało się zmienić przypiętej wiadomości.":["Could not update the pinned message.","Не удалось изменить закреплённое сообщение.","Не вдалося змінити закріплене повідомлення."],
"Brak wiadomości. Napisz pierwszą!":["No messages yet. Send the first one!","Сообщений пока нет. Напиши первым!","Повідомлень ще немає. Напиши першим!"],
"Odpowiadasz na wybraną wiadomość":["You are replying to the selected message","Вы отвечаете на выбранное сообщение","Ви відповідаєте на вибране повідомлення"],
"Wiadomość nie może być pusta.":["Message cannot be empty.","Сообщение не может быть пустым.","Повідомлення не може бути порожнім."],
"Powrót do rozmów":["Back to conversations","Вернуться к беседам","Повернутися до розмов"],
"Wyczyść wyszukiwanie":["Clear search","Очистить поиск","Очистити пошук"],
"Napisz wiadomość...":["Write a message...","Напишите сообщение...","Напишіть повідомлення..."],
"Wyślij":["Send","Отправить","Надіслати"],
"Nie udało się wysłać wiadomości. Sprawdź, czy rozmowa nie jest zablokowana.":["Could not send the message. Check whether the conversation is blocked.","Не удалось отправить сообщение. Проверьте, не заблокирована ли беседа.","Не вдалося надіслати повідомлення. Перевірте, чи не заблоковано розмову."],
"Nie masz jeszcze powiadomień.":["You don't have any notifications yet.","У вас пока нет уведомлений.","У вас ще немає сповіщень."],
"Nie udało się zaktualizować powiadomień.":["Could not update notifications.","Не удалось обновить уведомления.","Не вдалося оновити сповіщення."],
"Ogólne":["General","Общее","Загальне"],
"Szkoła":["School","Школа","Школа"],
"Pomysły":["Ideas","Идеи","Ідеї"],
"Ładowanie forum...":["Loading forum...","Загрузка форума...","Завантаження форуму..."],
"Nie udało się załadować forum.":["Could not load the forum.","Не удалось загрузить форум.","Не вдалося завантажити форум."],
"Treść":["Content","Содержание","Вміст"],
"Usuń temat":["Delete topic","Удалить тему","Видалити тему"],
"Zgłoś temat":["Report topic","Пожаловаться на тему","Поскаржитися на тему"],
"Dyskusja zamknięta.":["Discussion closed.","Обсуждение закрыто.","Обговорення закрито."],
"Nie udało się opublikować tematu.":["Could not publish the topic.","Не удалось опубликовать тему.","Не вдалося опублікувати тему."],
"Opisz krótko, dlaczego zgłaszasz ten temat:":["Briefly explain why you are reporting this topic:","Кратко объясните, почему вы жалуетесь на эту тему:","Коротко поясніть, чому ви скаржитеся на цю тему:"],
"Zgłoszenie zostało wysłane do administracji.":["Your report has been sent to the administrators.","Жалоба отправлена администраторам.","Скаргу надіслано адміністраторам."],
"Usunąć ten temat i komentarze?":["Delete this topic and its comments?","Удалить эту тему и комментарии?","Видалити цю тему та коментарі?"],
"Nie udało się usunąć tematu.":["Could not delete the topic.","Не удалось удалить тему.","Не вдалося видалити тему."],
"Nie udało się usunąć komentarza.":["Could not delete the comment.","Не удалось удалить комментарий.","Не вдалося видалити коментар."],
"Język polski":["Polish","Польский","Польська"],
"Biznes i zarządzanie":["Business and management","Бизнес и управление","Бізнес і управління"],
"Edukacja dla bezpieczeństwa":["Safety education","Образование в сфере безопасности","Освіта з безпеки"],
"Język niemiecki":["German","Немецкий язык","Німецька мова"],
"Język angielski":["English","Английский язык","Англійська мова"],
"Poniedziałek":["Monday","Понедельник","Понеділок"],
"Środa":["Wednesday","Среда","Середа"],
"Piątek":["Friday","Пятница","П'ятниця"],
"Wybierz dzień tygodnia":["Choose a weekday","Выберите день недели","Виберіть день тижня"],
"Nie masz zaplanowanych lekcji. Miłego odpoczynku!":["No lessons scheduled. Enjoy your break!","Уроков не запланировано. Хорошего отдыха!","Уроків не заплановано. Гарного відпочинку!"],
"Nie udało się załadować planera.":["Could not load the planner.","Не удалось загрузить планер.","Не вдалося завантажити планер."],
"Szczegóły":["Details","Подробности","Деталі"],
"Nie udało się dodać zadania.":["Could not add the task.","Не удалось добавить задачу.","Не вдалося додати завдання."],
"Nie udało się zmienić zadania.":["Could not update the task.","Не удалось изменить задачу.","Не вдалося змінити завдання."],
"Nie udało się usunąć zadania.":["Could not delete the task.","Не удалось удалить задачу.","Не вдалося видалити завдання."],
"Ładowanie sklepu...":["Loading shop...","Загрузка магазина...","Завантаження крамниці..."],
"Nie udało się załadować sklepu.":["Could not load the shop.","Не удалось загрузить магазин.","Не вдалося завантажити крамницю."],
"Odblokuje się na poziomie " :["Unlocks at level ","Откроется на уровне ","Відкриється на рівні "],
"Nie udało się zastosować wyglądu.":["Could not apply the appearance.","Не удалось применить оформление.","Не вдалося застосувати оформлення."],
"Numer rachunku nie został jeszcze skonfigurowany.":["The account number has not been configured yet.","Номер счёта ещё не настроен.","Номер рахунку ще не налаштовано."],
"Nie udało się skopiować. Spróbuj ponownie.":["Could not copy. Try again.","Не удалось скопировать. Попробуйте снова.","Не вдалося скопіювати. Спробуйте ще раз."],
"Nie udało się wylogować. Spróbuj ponownie.":["Could not log out. Try again.","Не удалось выйти. Попробуйте снова.","Не вдалося вийти. Спробуйте ще раз."],
"Nie udało się przywrócić sesji. Odśwież stronę i spróbuj ponownie.":["Could not restore the session. Refresh and try again.","Не удалось восстановить сеанс. Обновите страницу и попробуйте снова.","Не вдалося відновити сеанс. Оновіть сторінку та спробуйте ще раз."],
"Wysłał 10 wiadomości":["Sent 10 messages","Отправил 10 сообщений","Надіслав 10 повідомлень"],
"Wysłał 25 wiadomości":["Sent 25 messages","Отправил 25 сообщений","Надіслав 25 повідомлень"],
"Wysłał 100 wiadomości":["Sent 100 messages","Отправил 100 сообщений","Надіслав 100 повідомлень"],
"Wysłał 500 wiadomości":["Sent 500 messages","Отправил 500 сообщений","Надіслав 500 повідомлень"],
"Rozpoczął rozmowę w społeczności":["Started chatting in the community","Начал общаться в сообществе","Почав спілкуватися у спільноті"],
"Stały uczestnik":["Regular participant","Постоянный участник","Постійний учасник"],
"Głos społeczności":["Community voice","Голос сообщества","Голос спільноти"],
"Ładowanie rozmów...":["Loading conversations...","Загрузка бесед...","Завантаження розмов..."],
"Nie udało się załadować rozmów.":["Could not load conversations.","Не удалось загрузить беседы.","Не вдалося завантажити розмови."],
"Ta rozmowa jest niedostępna, ponieważ użytkownik jest zablokowany.":["This conversation is unavailable because the user is blocked.","Этот чат недоступен, потому что пользователь заблокирован.","Ця розмова недоступна, оскільки користувача заблоковано."],
"Nie można rozpocząć rozmowy. Możesz pisać tylko do znajomych, a blokada wyłącza wiadomości.":["You can only message friends. Blocking disables messages.","Можно писать только друзьям. Блокировка отключает сообщения.","Можна писати лише друзям. Блокування вимикає повідомлення."],
"Nie masz jeszcze rozmów. Dodaj znajomego, aby rozpocząć czat.":["No conversations yet. Add a friend to start chatting.","Пока нет бесед. Добавьте друга, чтобы начать чат.","Ще немає розмов. Додайте друга, щоб почати чат."],
"Ten użytkownik jest zablokowany. Odblokuj go, aby ponownie wysyłać wiadomości.":["This user is blocked. Unblock them to send messages again.","Этот пользователь заблокирован. Разблокируйте его, чтобы снова отправлять сообщения.","Цього користувача заблоковано. Розблокуйте його, щоб знову надсилати повідомлення."],
"Wiadomości w tej rozmowie są obecnie niedostępne.":["Messages in this conversation are currently unavailable.","Сообщения в этой беседе сейчас недоступны.","Повідомлення в цій розмові наразі недоступні."],
"Zaznacz wszystkie jako przeczytane":["Mark all as read","Отметить все как прочитанные","Позначити все як прочитані"],
"Oznacz wszystkie jako przeczytane":["Mark all as read","Отметить все как прочитанные","Позначити все як прочитані"],
"Nowy temat":["New topic","Новая тема","Нова тема"],
"Utwórz temat":["Create topic","Создать тему","Створити тему"],
"Dodaj komentarz":["Add comment","Добавить комментарий","Додати коментар"],
"Napisz komentarz...":["Write a comment...","Напишите комментарий...","Напишіть коментар..."],
"Pomoc":["Help","Помощь","Допомога"],
"Wydarzenia":["Events","События","Події"],
"Zamknij dyskusję":["Close discussion","Закрыть обсуждение","Закрити обговорення"],
"Otwórz dyskusję":["Open discussion","Открыть обсуждение","Відкрити обговорення"],
"Dodaj zadanie":["Add task","Добавить задачу","Додати завдання"],
"Nowe zadanie":["New task","Новая задача","Нове завдання"],
"Termin":["Due date","Срок","Термін"],
"Ukończone":["Completed","Выполнено","Виконано"],
"Zapisz zadanie":["Save task","Сохранить задачу","Зберегти завдання"],
"Brak zadań. Dodaj pierwsze!":["No tasks yet. Add the first one!","Задач пока нет. Добавьте первую!","Завдань ще немає. Додайте перше!"],
"Poziom":["Level","Уровень","Рівень"],
"Do następnego poziomu":["To the next level","До следующего уровня","До наступного рівня"],
"Polubienia":["Likes","Лайки","Вподобання"],
"Wyślij zaproszenie":["Send friend request","Отправить заявку в друзья","Надіслати запит у друзі"],
"Usuń ze znajomych":["Remove friend","Удалить из друзей","Видалити з друзів"],
"Zablokuj użytkownika":["Block user","Заблокировать пользователя","Заблокувати користувача"],
"Odblokuj":["Unblock","Разблокировать","Розблокувати"],
"Brak wyników wyszukiwania.":["No search results.","Ничего не найдено.","Нічого не знайдено."],
"Szukaj wiadomości...":["Search messages...","Поиск сообщений...","Пошук повідомлень..."],
"Edytuj":["Edit","Изменить","Редагувати"],
"Anuluj":["Cancel","Отмена","Скасувати"],
"Zapisz":["Save","Сохранить","Зберегти"],
"Zamknij":["Close","Закрыть","Закрити"],
"Potwierdź":["Confirm","Подтвердить","Підтвердити"],
"Odśwież":["Refresh","Обновить","Оновити"],
"Dodaj pomysł":["Add idea","Добавить идею","Додати ідею"],
"Dodaj temat":["Add topic","Добавить тему","Додати тему"],
"Wybierz wygląd karty":["Choose card design","Выберите дизайн карточки","Оберіть дизайн картки"],
"Klasyczny":["Classic","Классический","Класичний"],
"Prosty i elegancki":["Simple and elegant","Простой и элегантный","Простий та елегантний"],
"Kolorowy gradient":["Colorful gradient","Цветной градиент","Кольоровий градієнт"],
"Wyrazisty i nowoczesny":["Bold and modern","Яркий и современный","Яскравий і сучасний"],
"Czysty i spokojny":["Clean and calm","Чистый и спокойный","Чистий і спокійний"],
"Opublikuj pomysł":["Publish idea","Опубликовать идею","Опублікувати ідею"],
"Opublikuj temat":["Publish topic","Опубликовать тему","Опублікувати тему"],
"Opisz swoją propozycję i wybierz jej wygląd.":["Describe your suggestion and choose its look.","Опишите своё предложение и выберите его оформление.","Опишіть свою пропозицію та оберіть її вигляд."]
,

"Grupowe czaty":["Group chats","Групповые чаты","Групові чати"],
"Twórz rozmowy ze znajomymi. Do grup możesz zapraszać tylko zaakceptowanych znajomych.":["Create chats with friends. You can invite only accepted friends.","Создавай чаты с друзьями. Приглашать можно только подтверждённых друзей.","Створюй чати з друзями. Запрошувати можна лише підтверджених друзів."],
"Utwórz nową grupę":["Create a new group","Создать новую группу","Створити нову групу"],
"Nazwa grupy":["Group name","Название группы","Назва групи"],
"Krótki opis":["Short description","Краткое описание","Короткий опис"],
"Ikona grupy":["Group icon","Иконка группы","Іконка групи"],
"Dodaj znajomych":["Add friends","Добавить друзей","Додати друзів"],
"Utwórz grupę":["Create group","Создать группу","Створити групу"],
"Twoje grupy":["Your groups","Твои группы","Твої групи"],
"Nie należysz jeszcze do żadnej grupy":["You are not in any groups yet","Ты пока не состоишь ни в одной группе","Ти поки не входиш до жодної групи"],
"Utwórz pierwszą grupę powyżej.":["Create your first group above.","Создай первую группу выше.","Створи першу групу вище."],
"Wróć":["Back","Назад","Назад"],
"Odśwież":["Refresh","Обновить","Оновити"],
"Napisz wiadomość...":["Write a message...","Напиши сообщение...","Напиши повідомлення..."],
"Wyślij":["Send","Отправить","Надіслати"],
"Opuść grupę":["Leave group","Покинуть группу","Вийти з групи"],
"Usuń grupę":["Delete group","Удалить группу","Видалити групу"],
"Ankiety":["Polls","Опросы","Опитування"],
"Odpowiadaj i głosuj":["Answer and vote","Отвечай и голосуй","Відповідай і голосуй"],
"Twórz ankiety, poznawaj opinie społeczności i sprawdzaj wyniki.":["Create polls, discover community opinions and view results.","Создавай опросы, узнавай мнение сообщества и смотри результаты.","Створюй опитування, дізнавайся думки спільноти та переглядай результати."],
"Utwórz ankietę":["Create a poll","Создать опрос","Створити опитування"],
"Pytanie":["Question","Вопрос","Запитання"],
"Opcjonalnie":["Optional","Необязательно","Необов'язково"],
"Opublikuj ankietę":["Publish poll","Опубликовать опрос","Опублікувати опитування"],
"Głosuj":["Vote","Голосовать","Голосувати"],
"Zapisz":["Save","Сохранить","Зберегти"],
"Twoje ulubione":["Your saved items","Твои избранные","Твоє обране"],
"Wszystkie zapisane pomysły, tematy, ankiety i ogłoszenia w jednym miejscu.":["All your saved ideas, topics, polls and announcements in one place.","Все сохранённые идеи, темы, опросы и объявления в одном месте.","Усі збережені ідеї, теми, опитування та оголошення в одному місці."],
"Lista jest pusta":["Your list is empty","Список пуст","Список порожній"],
"Zapisuj ciekawe treści, aby wrócić do nich później.":["Save interesting content to revisit it later.","Сохраняй интересные материалы, чтобы вернуться к ним позже.","Зберігай цікаві матеріали, щоб повернутися до них пізніше."],
"Otwórz":["Open","Открыть","Відкрити"],
"Codzienne zadania":["Daily quests","Ежедневные задания","Щоденні завдання"],
"Wykonuj różne aktywności i odbieraj XP. Każde zadanie można odebrać raz dziennie.":["Complete activities and claim XP. Each quest can be claimed once per day.","Выполняй задания и получай XP. Каждую награду можно забрать раз в день.","Виконуй завдання та отримуй XP. Кожну нагороду можна забрати раз на день."],
"Zapisz treść w ulubionych":["Save an item to favorites","Сохрани материал в избранное","Збережи матеріал в обране"],
"Opublikuj pomysł":["Publish an idea","Опубликуй идею","Опублікуй ідею"],
"Skomentuj temat na forum":["Comment on a forum topic","Прокомментируй тему на форуме","Прокоментуй тему на форумі"],
"Weź udział w ankiecie":["Take part in a poll","Прими участие в опросе","Візьми участь в опитуванні"],
"Nagroda odebrana":["Reward claimed","Награда получена","Нагороду отримано"],
"Zadanie wykonane · gotowe do odbioru":["Quest completed · ready to claim","Задание выполнено · можно забрать награду","Завдання виконано · можна забрати нагороду"],
"Do wykonania":["To do","Нужно выполнить","Потрібно виконати"],
"Odbierz":["Claim","Забрать","Отримати"],
"Odebrano":["Claimed","Получено","Отримано"],
"Ogłoszenia":["Announcements","Объявления","Оголошення"]

};
const APP_UI_LANG_INDEX={pl:-1,en:0,ru:1,uk:2};
const appUiOriginalText=new WeakMap();
const appUiOriginalAttrs=new WeakMap();
function translateVisibleUI(root=document.body){
  if(!root)return;
  const langIndex=APP_UI_LANG_INDEX[appLanguage]??-1;
  if(langIndex<0)return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  for(const node of nodes){
    const parent=node.parentElement;
    if(!parent||parent.closest("script,style,textarea,[contenteditable='true'],[data-no-translate],.chat-message-body,.profile-bio,.forum-post-body,.user-generated"))continue;
    if(!appUiOriginalText.has(node))appUiOriginalText.set(node,node.nodeValue);
    const raw=appUiOriginalText.get(node),trimmed=raw.trim();
    if(!trimmed)continue;
    const translated=APP_UI_TEXT[trimmed];
    const nextValue=translated?raw.replace(trimmed,translated[langIndex]):raw;
    // Avoid writing identical text: the MutationObserver watches characterData.
    if(node.nodeValue!==nextValue)node.nodeValue=nextValue;
  }
  root.querySelectorAll?.("input[placeholder],textarea[placeholder],input[aria-label],button[aria-label],select[aria-label]").forEach(el=>{
    let originals=appUiOriginalAttrs.get(el);
    if(!originals){originals={};appUiOriginalAttrs.set(el,originals);}
    for(const attr of ["placeholder","aria-label"]){
      const current=el.getAttribute(attr);
      if(current&&!Object.prototype.hasOwnProperty.call(originals,attr))originals[attr]=current;
      const original=originals[attr];
      if(original&&APP_UI_TEXT[original])el.setAttribute(attr,APP_UI_TEXT[original][langIndex]);
      else if(original)el.setAttribute(attr,original);
    }
  });
}
let appUiTranslationObserver=null;
if(typeof MutationObserver!=="undefined"&&document.body){
  appUiTranslationObserver=new MutationObserver(records=>{
    for(const record of records){
      if(record.type==="childList")record.addedNodes.forEach(node=>{if(node.nodeType===Node.ELEMENT_NODE)translateVisibleUI(node);else if(node.nodeType===Node.TEXT_NODE)translateVisibleUI(node.parentElement);});
      else if(record.type==="characterData")translateVisibleUI(record.target.parentElement);
    }
  });
  appUiTranslationObserver.observe(document.body,{childList:true,subtree:true,characterData:true});
}

const APP_PAGE_LABELS={
search:[["Wyszukiwarka społeczności","Community search","Поиск по сообществу","Пошук спільноти"],["Znajdź osoby, tematy na forum i pomysły","Find people, forum topics and ideas","Найди людей, темы форума и идеи","Знайди людей, теми форуму та ідеї"]],
updates:[["Updates","Updates","Обновления","Оновлення"],["Historia zmian i nowości w aplikacji","App release notes and new features","История изменений и новых функций приложения","Історія змін і нових функцій застосунку"]],
feed:[["Aktywność społeczności","Community activity","Активность сообщества","Активність спільноти"],["Najnowsze wpisy z forum i pomysłów","The latest forum posts and ideas","Последние публикации форума и идеи","Останні дописи форуму та ідеї"]],
events:[["Wydarzenia","Events","События","Події"],["Karty wydarzeń i ogłoszenia społeczności","Community event cards and announcements","Карточки мероприятий и объявления сообщества","Картки подій та оголошення спільноти"]],
groups:[["Grupowe czaty","Group chats","Групповые чаты","Групові чати"],["Rozmowy ze znajomymi","Conversations with friends","Беседы с друзьями","Розмови з друзями"]],
polls:[["Ankiety społeczności","Community polls","Опросы сообщества","Опитування спільноти"],["Twórz ankiety i głosuj","Create polls and vote","Создавай опросы и голосуй","Створюй опитування та голосуй"]],
announcements:[["Ogłoszenia","Announcements","Объявления","Оголошення"],["Ważne informacje społeczności","Important community updates","Важная информация сообщества","Важлива інформація спільноти"]],
favorites:[["Ulubione","Saved","Избранное","Обране"],["Zapisane treści","Saved content","Сохранённые материалы","Збережені матеріали"]],
quests:[["Codzienne zadania","Daily quests","Ежедневные задания","Щоденні завдання"],["Zdobywaj XP za aktywność","Earn XP for activity","Получай XP за активность","Отримуй XP за активність"]],
profiles:[["Znajomości","Meet people","Знакомства","Знайомства"],["Odkrywaj profile, poznawaj osoby o podobnych zainteresowaniach i wysyłaj zaproszenia","Discover profiles, meet people with similar interests and send friend requests","Открывай профили, находи людей с похожими интересами и отправляй заявки в друзья","Переглядай профілі, знаходь людей зі схожими інтересами та надсилай запити в друзі"]],
"my-profile":[["Mój profil","My profile","Мой профиль","Мій профіль"],["Twój profil w społeczności ZSPM","Your ZSPM community profile","Твой профиль в сообществе ZSPM","Твій профіль у спільноті ZSPM"]],
chat:[["Wiadomości","Messages","Сообщения","Повідомлення"],["Prywatne rozmowy ze znajomymi","Private conversations with friends","Личные беседы с друзьями","Приватні розмови з друзями"]],
friends:[["Znajomi","Friends","Друзья","Друзі"],["Zaproszenia i Twoi znajomi","Requests and your friends","Заявки и твои друзья","Запити та твої друзі"]],
notifications:[["Powiadomienia","Notifications","Уведомления","Сповіщення"],["Twoja aktywność w społeczności","Your community activity","Твоя активность в сообществе","Твоя активність у спільноті"]],
settings:[["Ustawienia","Settings","Настройки","Налаштування"],["Zarządzaj swoim kontem","Manage your account","Управляй своим аккаунтом","Керуй обліковим записом"]],
ideas:[["Wasze Pomysły","Your Ideas","Ваши идеи","Ваші ідеї"],["Podziel się pomysłem i zagłosuj na propozycje innych","Share an idea and vote on others","Поделись идеей и голосуй за предложения других","Поділися ідеєю та голосуй за пропозиції інших"]],
forum:[["Forum społeczności","Community forum","Форум сообщества","Форум спільноти"],["Rozmawiaj na tematy szkolne i nie tylko","Discuss school topics and more","Обсуждай школьные и другие темы","Обговорюй шкільні та інші теми"]],
timetable:[["Plan lekcji","Timetable","Расписание","Розклад уроків"],["Rozkład zajęć klas technikum","Technical school class schedules","Расписание занятий классов","Розклад занять класів"]],
planner:[["Mój plan","My planner","Мой план","Мій план"],["Zadania, sprawdziany i terminy","Tasks, tests and deadlines","Задачи, контрольные и сроки","Завдання, контрольні та терміни"]],
cosmetics:[["Sklep wyglądu","Appearance shop","Магазин оформления","Крамниця оформлення"],["Odblokowuj ozdoby wraz z poziomem","Unlock decorations as you level up","Открывай украшения с повышением уровня","Відкривай прикраси з підвищенням рівня"]],
ranking:[["Ranking","Ranking","Рейтинг","Рейтинг"],["Najaktywniejsi, wspierający i lubiani","Most active, supporters and popular members","Самые активные, поддерживающие и популярные","Найактивніші, ті хто підтримує та популярні"]],
information:[["Informacje","Information","Информация","Інформація"],["Wszystko, co warto wiedzieć o ZSPM Community","Everything to know about ZSPM Community","Всё, что нужно знать о ZSPM Community","Усе, що варто знати про ZSPM Community"]],
support:[["Wesprzyj twórcę","Support the creator","Поддержать автора","Підтримати автора"],["Pomóż rozwijać projekt","Help the project grow","Помоги развивать проект","Допоможи розвивати проєкт"]]
};
function pageLabel(page,part,fallback){const pair=APP_PAGE_LABELS[page];return pair?pair[part][["pl","en","ru","uk"].indexOf(appLanguage)]:fallback;}

function applyShellTranslations(){
document.querySelectorAll("[data-i18n]").forEach(el=>{el.textContent=shellTr(el.dataset.i18n);});
const h=document.querySelector("#home-page .welcome h2"),n=document.getElementById("user-name");
if(h&&n){const name=n.textContent;h.innerHTML=shellTr("hello")+' <span id="user-name"></span>';document.getElementById("user-name").textContent=name;}
const bell=document.getElementById("notif-bell");if(bell)bell.setAttribute("aria-label",appLanguage==="pl"?"Powiadomienia":appLanguage==="en"?"Notifications":appLanguage==="ru"?"Уведомления":"Сповіщення");
const account=document.querySelector(".account-menu-heading");if(account)account.textContent=shellTr("account");
const logout=document.querySelector("#account-logout");if(logout){const svg=logout.querySelector("svg");logout.textContent="";if(svg)logout.appendChild(svg);logout.append(" "+shellTr("logout"));}
}
function setAppLanguage(value){appLanguage=APP_LANGS[value]?value:"pl";try{localStorage.setItem(APP_LANG_KEY,appLanguage);}catch(e){}document.documentElement.lang=appLanguage;applyShellTranslations();translateVisibleUI();if(typeof currentAppPage!=="undefined"&&currentAppPage!=="home"){const title=document.getElementById("page-title"),sub=document.getElementById("page-subtitle");if(title)title.textContent=pageLabel(currentAppPage,0,title.textContent);if(sub)sub.textContent=pageLabel(currentAppPage,1,sub.textContent);}if(typeof currentAppPage!=="undefined"&&currentAppPage==="settings")renderSettingsPage();}
applyShellTranslations();
translateVisibleUI();

// Add the verified public transfer account here only after an adult has approved it.
const SUPPORT_ACCOUNT_NUMBER = String(window.ZSPM_SUPPORT_ACCOUNT_NUMBER || "").replace(/\s+/g, "");

const SUPABASE_CONFIG = window.ZSPM_SUPABASE_CONFIG || {};
const supabaseClient = (
  window.supabase &&
  typeof SUPABASE_CONFIG.url === "string" &&
  SUPABASE_CONFIG.url.startsWith("https://") &&
  typeof SUPABASE_CONFIG.publishableKey === "string" &&
  SUPABASE_CONFIG.publishableKey.startsWith("sb_publishable_")
) ? window.supabase.createClient(
  SUPABASE_CONFIG.url,
  SUPABASE_CONFIG.publishableKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
) : null;

function getAppUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.user_metadata?.nickname || user.email?.split("@")[0] || "Uczeń",
    email: user.email || ""
  };
}

function applyTheme(theme) {
  const allowedThemes = ["system", "dark", "liquid-glass"];
  const selectedTheme = allowedThemes.includes(theme) ? theme : "system";
  document.documentElement.dataset.theme = selectedTheme;
  const themeColor = selectedTheme === "liquid-glass" ? "#dcecff" : selectedTheme === "dark" ? "#101010" : "#080f1d";
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.setAttribute("content", themeColor);
  try {
    localStorage.setItem(THEME_KEY, selectedTheme);
  } catch (error) {}
}

const CHRISTMAS_KEY = "zspm_christmas_decorations";
function applyChristmasDecorations(enabled) {
  const active = enabled !== false;
  document.documentElement.classList.toggle("christmas-enabled", active);
  document.body.classList.toggle("christmas-enabled", active);
  const decorations = document.getElementById("christmas-decorations");
  if (decorations) decorations.classList.toggle("hidden", !active);
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.setAttribute("content", document.documentElement.dataset.theme === "liquid-glass" ? "#dcecff" : document.documentElement.dataset.theme === "dark" ? "#101010" : "#080f1d");
  try {
    localStorage.setItem(CHRISTMAS_KEY, active ? "on" : "off");
  } catch (error) {}
}

try {
  applyTheme(localStorage.getItem(THEME_KEY) || "system");
  applyChristmasDecorations(localStorage.getItem(CHRISTMAS_KEY) !== "off");
} catch (error) {
  applyTheme("system");
  applyChristmasDecorations(true);
}

const PROFILES_KEY = "zspm_demo_profiles";
const REPORTS_KEY = "zspm_demo_reports";
const PROFILE_SOCIAL_KEY = "zspm_demo_profile_social";

const DEMO_PROFILES = [
  {
    id: "demo-1",
    avatar: "🦊",
    nickname: "SzybkiLis",
    klasa: "2B",
    bio: "Uwielbiam matematykę i gry planszowe. Zawsze chętny do wspólnego rozwiązywania zadań.",
    interests: ["Matematyka", "Gry planszowe", "Szachy"]
  },
  {
    id: "demo-2",
    avatar: "🐼",
    nickname: "KreatywnaAnia",
    klasa: "3A",
    bio: "Pasjonatka sztuki. Rysuję portrety i projektuję plakaty na szkolne wydarzenia.",
    interests: ["Sztuka", "Rysowanie", "Fotografia"]
  },
  {
    id: "demo-3",
    avatar: "🐺",
    nickname: "WilkSportowy",
    klasa: "1C",
    bio: "Piłka nożna to moje życie. Gram w szkolnej drużynie na pozycji napastnika.",
    interests: ["Sport", "Piłka nożna", "Bieganie"]
  },
  {
    id: "demo-4",
    avatar: "🦉",
    nickname: "NocnyCzytelnik",
    klasa: "2A",
    bio: "Zaczytany do granic możliwości. Fantastyka, kryminały i książki popularnonaukowe.",
    interests: ["Czytanie", "Fantastyka", "Nauka"]
  },
  {
    id: "demo-5",
    avatar: "🐬",
    nickname: "MelaKoduje",
    klasa: "3B",
    bio: "Uczę się programowania i tworzę proste gry. Szukam ludzi do projektu na konkurs.",
    interests: ["Programowanie", "Gry", "Technologie"]
  },
  {
    id: "demo-6",
    avatar: "🐝",
    nickname: "PracowityBartek",
    klasa: "1B",
    bio: "Muzyka i rower. Po szkole można mnie spotkać na szkolnych wydarzeniach.",
    interests: ["Muzyka", "Rower", "Podróże"]
  }
];

let currentUser = null;
let isAdmin = false;
let isBanned = false;
let currentMute = null;
let currentUserBadge = null;
let myProfileCache = null;
let communityProfileCache = null;
let publicProfilesCache = [];
let profileSocialCache = {};
let friendsDataCache = { incoming: [], outgoing: [], friends: [] };
let blockedUsersCache = [];
let notificationsCache = [];
let conversationsCache = [];
let activeConversationId = null;
let activeChatProfile = null;
let activeChatChannel = null;
let chatListChannel = null;
let globalChatChannel = null;
let activeGlobalRoomId = null;
let notificationsChannel = null;
let friendsChannel = null;
let feedChannel = null;
let socialChannel = null;
let presenceChannel = null;
let onlineUsers = new Set();
let reportsCache = [];
let reportedMessageIdsCache = [];
let chatMessageLikesCache = new Map();
let chatMessageReactionsCache = new Map();
let activePrivatePins = [];
let activeGlobalPins = [];
let replyToMessageId = null;
let activeCommunityProfileClose = null;

function showMessage(id, text, type = "error") {
  const element = $(id);
  element.textContent = text;
  element.className = "message " + type;
}

function clearMessage(id) {
  const element = $(id);
  element.textContent = "";
  element.className = "message";
}

function showLogin() {
  clearMessage("login-message");
  $("register-form").classList.add("hidden");
  $("login-form").classList.remove("hidden");
}

function showRegister() {
  clearMessage("register-message");
  $("login-form").classList.add("hidden");
  $("register-form").classList.remove("hidden");
}

function authUnavailableMessage() {
  return "Logowanie jest chwilowo niedostępne. Odśwież stronę i spróbuj ponownie.";
}

$("go-login").addEventListener("click", showLogin);
$("go-register").addEventListener("click", showRegister);


// REJESTRACJA — SUPABASE AUTH

$("register").addEventListener("submit", async event => {
  event.preventDefault();
  clearMessage("register-message");

  if (!supabaseClient) {
    showMessage("register-message", authUnavailableMessage());
    return;
  }

  const name = $("reg-name").value.trim();
  const email = $("reg-email").value.trim().toLowerCase();
  const password = $("reg-password").value;

  if (name.length < 2) {
    showMessage("register-message", "Pseudonim musi mieć co najmniej 2 znaki.");
    return;
  }

  if (password.length < 8) {
    showMessage("register-message", "Hasło musi mieć co najmniej 8 znaków.");
    return;
  }

  const button = $("register").querySelector("button[type=submit]");
  button.disabled = true;
  button.textContent = "Tworzenie konta...";
  let accountCreated = false;

  try {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: { nickname: name }
      }
    });

    if (error) throw error;

    if (data.session && data.user) {
      accountCreated = true;
      currentUser = getAppUser(data.user);
      await enterApp();
    } else {
      showMessage(
        "register-message",
        "Konto zostało utworzone. Sprawdź pocztę i potwierdź adres e-mail, a następnie zaloguj się.",
        "success"
      );
    }
  } catch (error) {
    console.error("Supabase registration error:", error);
    if (accountCreated) {
      await cleanupAllRealtimeChannels();
      currentUser = null;
      isAdmin = false;
      isBanned = false;
      currentUserBadge = null;
      currentMute = null;
      $("app").classList.add("hidden");
      $("auth").classList.remove("hidden");
      showMessage("register-message", "Konto zostało utworzone, ale aplikacja nie mogła się załadować. Spróbuj zalogować się ponownie.");
    } else {
      const message = /already registered|already exists|user already/i.test(error.message || "")
        ? "Ten adres e-mail jest już zarejestrowany. Zaloguj się."
        : (error.message || "Nie udało się utworzyć konta. Spróbuj ponownie.");
      showMessage("register-message", message);
    }
  } finally {
    button.disabled = false;
    button.textContent = "Utwórz konto →";
  }
});


// LOGOWANIE — SUPABASE AUTH

$("login").addEventListener("submit", async event => {
  event.preventDefault();
  clearMessage("login-message");

  if (!supabaseClient) {
    showMessage("login-message", authUnavailableMessage());
    return;
  }

  const email = $("login-email").value.trim().toLowerCase();
  const password = $("login-password").value;
  const button = $("login").querySelector("button[type=submit]");
  button.disabled = true;
  button.textContent = "Logowanie...";

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    currentUser = getAppUser(data.user);
    await enterApp();
  } catch (error) {
    console.error("Supabase login error:", error);
    await cleanupAllRealtimeChannels();
    currentUser = null;
    isAdmin = false;
    isBanned = false;
    currentUserBadge = null;
    currentMute = null;
    $("app").classList.add("hidden");
    $("auth").classList.remove("hidden");
    showLogin();
    const message = /email not confirmed/i.test(error.message || "")
      ? "Najpierw potwierdź adres e-mail, korzystając z wiadomości od Supabase."
      : /invalid login credentials/i.test(error.message || "")
        ? "Nieprawidłowy e-mail lub hasło. Sprawdź dane i spróbuj ponownie."
        : "Nie udało się uruchomić aplikacji. Sprawdź połączenie i spróbuj ponownie.";
    showMessage("login-message", message);
  } finally {
    button.disabled = false;
    button.textContent = "Zaloguj się →";
  }
});


// OTWARCIE APLIKACJI

async function enterApp() {
  if (!currentUser) return;

  // Use the same admin-status lookup as profile badges and admin labels.
  // This keeps global-chat pin controls consistent with the app's admin directory.
  const adminIds = await loadAdminFlagsByIds([currentUser.id]);
  isAdmin = adminIds.has(currentUser.id);
  if (!isAdmin) {
    const { data: adminResult, error: adminError } = await supabaseClient.rpc("is_app_admin");
    if (adminError) console.warn("Admin role check failed:", adminError);
    isAdmin = !adminError && adminResult === true;
  }

  const { data: badgeRow, error: badgeError } = await supabaseClient
    .from("user_badges").select("badge").eq("user_id", currentUser.id).maybeSingle();
  currentUserBadge = badgeError ? null : (badgeRow?.badge || null);

  $("auth").classList.add("hidden");
  $("app").classList.remove("hidden");
  $("user-name").textContent = currentUser.name + "!";
  updateNotifBadge();
  updateAdminHomeCard();

  const { data: ownModeration, error: moderationError } = await supabaseClient
    .from("user_moderation")
    .select("action,reason,expires_at,created_at")
    .eq("user_id", currentUser.id)
    .is("revoked_at", null)
    .order("created_at", { ascending: false });
  if (moderationError) throw moderationError;
  const activeBan = (ownModeration || []).find(item => item.action === "ban" &&
    (!item.expires_at || new Date(item.expires_at).getTime() > Date.now()));
  currentMute = (ownModeration || []).find(item => item.action === "mute" &&
    (!item.expires_at || new Date(item.expires_at).getTime() > Date.now())) || null;
  isBanned = Boolean(activeBan && !isAdmin);
  if (isBanned) {
    $("home-page").classList.add("hidden");
    $("other-page").classList.remove("hidden");
    $("page-title").textContent = "Konto zablokowane";
    $("page-subtitle").textContent = "Informacja o moderacji";
    $("page-content").innerHTML = '<div class="page-content moderation-lock"><h3>Twoje konto jest tymczasowo zablokowane</h3><p>Powód: ' +
      escapeHTML(activeBan.reason) + '</p><p>Termin: ' +
      (activeBan.expires_at ? escapeHTML(new Date(activeBan.expires_at).toLocaleString("pl-PL")) : "Bezterminowo") +
      '</p><p>Jeśli uważasz, że to pomyłka, skontaktuj się z administratorem.</p><button type="button" class="main-btn" id="ban-logout">Wyloguj się</button></div>';
    $("ban-logout").addEventListener("click", logout);
    return;
  }

  if (!window.zspmActivityHeartbeat) {
    const sendHeartbeat = () => {
      if (currentUser && !isBanned && document.visibilityState === "visible") {
        supabaseClient.rpc("heartbeat_user_activity").then(({error}) => {
          if (error) console.warn("Activity heartbeat failed:", error);
        });
      }
    };
    sendHeartbeat();
    window.zspmActivityHeartbeat = window.setInterval(sendHeartbeat, 60000);
    document.addEventListener("visibilitychange", sendHeartbeat);
  }

  await loadMyProfileFromSupabase();
  await loadBlockedUsers();
  await loadFriendsData();
  await loadNotifications();
  await loadReports();
  await setupRealtimeSubscriptions();
  await openPage("home");
}



/* ZSPM COMMUNITY: group chats, polls, favorites and daily quests */
let communityGroupChannel = null;

async function removeRealtimeChannels(channels) {
  if (!supabaseClient) return;
  await Promise.all((channels || []).filter(Boolean).map(async channel => {
    try {
      await supabaseClient.removeChannel(channel);
    } catch (error) {
      console.warn("Realtime channel cleanup failed:", error);
    }
  }));
}

async function cleanupChatRealtime() {
  const channels = [activeChatChannel, chatListChannel, globalChatChannel];
  activeChatChannel = null;
  chatListChannel = null;
  globalChatChannel = null;
  activeConversationId = null;
  activeChatProfile = null;
  activeGlobalRoomId = null;
  replyToMessageId = null;
  activePrivatePins = [];
  activeGlobalPins = [];
  chatMessageLikesCache.clear();
  chatMessageReactionsCache.clear();
  await removeRealtimeChannels(channels);
}

async function cleanupGroupRealtime() {
  const channel = communityGroupChannel;
  communityGroupChannel = null;
  await removeRealtimeChannels([channel]);
}

async function cleanupAllRealtimeChannels() {
  const channels = [
    activeChatChannel, chatListChannel, globalChatChannel, communityGroupChannel,
    notificationsChannel, friendsChannel, feedChannel, socialChannel, presenceChannel
  ];
  activeChatChannel = null;
  chatListChannel = null;
  globalChatChannel = null;
  communityGroupChannel = null;
  notificationsChannel = null;
  friendsChannel = null;
  feedChannel = null;
  socialChannel = null;
  presenceChannel = null;
  activeConversationId = null;
  activeChatProfile = null;
  activeGlobalRoomId = null;
  replyToMessageId = null;
  activePrivatePins = [];
  activeGlobalPins = [];
  chatMessageLikesCache.clear();
  chatMessageReactionsCache.clear();
  onlineUsers = new Set();
  await removeRealtimeChannels(channels);
}

async function renderCommunityGroupsPage() {
  const host=$("page-content");
  if(communityGroupChannel){await supabaseClient.removeChannel(communityGroupChannel);communityGroupChannel=null;}
  await loadFriendsData();
  await loadBlockedUsers();
  const membership=await supabaseClient.from("community_group_members").select("group_id,role").eq("user_id",currentUser.id);
  if(membership.error){host.innerHTML='<div class="page-content"><p>Nie udało się załadować grup.</p></div>';return;}
  const ids=(membership.data||[]).map(x=>x.group_id);
  const groupsResult=ids.length?await supabaseClient.from("community_group_chats").select("id,name,description,avatar_emoji,created_by,updated_at").in("id",ids).order("updated_at",{ascending:false}):{data:[],error:null};
  if(groupsResult.error){host.innerHTML='<div class="page-content"><p>Nie udało się załadować grup.</p></div>';return;}
  const friends=(friendsDataCache.friends||[]).filter(p=>!isBlocked(p.id));
  const friendChoices=friends.map(p=>'<label class="group-friend-choice"><input type="checkbox" name="group-friend" value="'+escapeHTML(p.id)+'"><span>'+escapeHTML(p.nickname||"Uczeń")+'</span></label>').join("");
  const cards=(groupsResult.data||[]).map(g=>{const unread=unreadNotificationCount("group_message",g.id);return '<button type="button" class="community-group-card" data-open-group="'+g.id+'"><span class="community-group-avatar">'+escapeHTML(g.avatar_emoji||"👥")+'</span><span class="community-group-copy"><strong>'+escapeHTML(g.name)+'</strong><small>'+escapeHTML(g.description||"Grupa znajomych")+'</small></span>'+(unread?'<span class="menu-unread-badge is-visible">'+(unread>99?"99+":unread)+'</span>':'')+'<span class="community-group-arrow">›</span></button>';}).join("");
  host.innerHTML='<section class="community-feature-hero community-feature-hero-action"><div><span class="community-feature-kicker">ZSPM COMMUNITY</span><h2>Grupowe czaty</h2><p>Twórz rozmowy ze znajomymi. Do grup możesz zapraszać tylko zaakceptowanych znajomych.</p></div><button type="button" class="community-create-cta" id="community-group-create-open"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>Utwórz grupę</button></section><div class="community-feature-modal" id="community-group-modal" hidden><div class="community-feature-modal-backdrop" data-group-modal-close></div><section class="community-feature-dialog" role="dialog" aria-modal="true" aria-labelledby="community-group-dialog-title"><header class="community-feature-dialog-head"><div><span class="community-feature-kicker">NOWA ROZMOWA</span><h3 id="community-group-dialog-title">Utwórz grupę</h3></div><button type="button" class="community-feature-dialog-close" data-group-modal-close aria-label="Zamknij">×</button></header><form id="community-group-form" class="community-feature-form"><label>Nazwa grupy<input id="community-group-name" maxlength="60" minlength="2" required placeholder="Np. Ekipa z klasy"></label><label>Krótki opis<input id="community-group-description" maxlength="240" placeholder="O czym jest grupa?"></label><div class="community-icon-field"><span class="community-icon-label">Ikona grupy</span><input type="hidden" id="community-group-emoji" value="👥"><div class="community-icon-picker" role="group" aria-label="Wybierz ikonę grupy"><button type="button" class="community-icon-choice is-selected" data-group-icon="👥" aria-pressed="true">👥</button><button type="button" class="community-icon-choice" data-group-icon="🎓" aria-pressed="false">🎓</button><button type="button" class="community-icon-choice" data-group-icon="🎮" aria-pressed="false">🎮</button><button type="button" class="community-icon-choice" data-group-icon="📚" aria-pressed="false">📚</button><button type="button" class="community-icon-choice" data-group-icon="⚽" aria-pressed="false">⚽</button><button type="button" class="community-icon-choice" data-group-icon="🎨" aria-pressed="false">🎨</button><button type="button" class="community-icon-choice" data-group-icon="🎵" aria-pressed="false">🎵</button><button type="button" class="community-icon-choice" data-group-icon="🚀" aria-pressed="false">🚀</button><button type="button" class="community-icon-choice" data-group-icon="🌟" aria-pressed="false">🌟</button><button type="button" class="community-icon-choice" data-group-icon="💬" aria-pressed="false">💬</button><button type="button" class="community-icon-choice" data-group-icon="🧩" aria-pressed="false">🧩</button><button type="button" class="community-icon-choice" data-group-icon="🔥" aria-pressed="false">🔥</button></div></div><div class="group-friends-list"><strong>Dodaj znajomych</strong>'+(friendChoices||'<small>Nie masz jeszcze znajomych do zaproszenia.</small>')+'</div><button class="community-create-submit" type="submit">Utwórz grupę</button><p id="community-group-feedback" class="feature-feedback" aria-live="polite"></p></form></section></div><section class="community-feature-panel community-list-panel"><div class="community-feature-section-head"><h3>Twoje grupy</h3><span>'+groupsResult.data.length+'</span></div><div class="community-groups-list">'+(cards||'<div class="community-empty-state"><span>👥</span><strong>Nie należysz jeszcze do żadnej grupy</strong><small>Utwórz pierwszą grupę powyżej.</small></div>')+'</div></section>';
  const groupModal=host.querySelector("#community-group-modal");
  const closeGroupModal=()=>{groupModal.hidden=true;document.removeEventListener("keydown",groupModalEscape);};
  const groupModalEscape=e=>{if(e.key==="Escape")closeGroupModal();};
  host.querySelector("#community-group-create-open").addEventListener("click",()=>{groupModal.hidden=false;host.querySelector("#community-group-name").focus();document.addEventListener("keydown",groupModalEscape);});
  groupModal.querySelectorAll("[data-group-modal-close]").forEach(el=>el.addEventListener("click",closeGroupModal));
  groupModal.querySelectorAll("[data-group-icon]").forEach(el=>el.addEventListener("click",()=>{groupModal.querySelector("#community-group-emoji").value=el.dataset.groupIcon;groupModal.querySelectorAll("[data-group-icon]").forEach(option=>{const active=option===el;option.classList.toggle("is-selected",active);option.setAttribute("aria-pressed",active?"true":"false");});}));
  host.querySelector("#community-group-form").addEventListener("submit",async e=>{
    e.preventDefault();const button=e.currentTarget.querySelector('button[type="submit"]');button.disabled=true;
    const name=host.querySelector("#community-group-name").value.trim();
    const selected=[...host.querySelectorAll('input[name="group-friend"]:checked')].map(x=>x.value).slice(0,15);
    const groupId=crypto.randomUUID();
    const created=await supabaseClient.from("community_group_chats").insert({id:groupId,created_by:currentUser.id,name,description:host.querySelector("#community-group-description").value.trim(),avatar_emoji:host.querySelector("#community-group-emoji").value});
    if(created.error){host.querySelector("#community-group-feedback").textContent=created.error.message||"Nie udało się utworzyć grupy.";button.disabled=false;return;}
    const ownerAdded=await supabaseClient.from("community_group_members").insert({group_id:groupId,user_id:currentUser.id,role:"owner"});
    if(ownerAdded.error){await supabaseClient.from("community_group_chats").delete().eq("id",groupId);host.querySelector("#community-group-feedback").textContent=ownerAdded.error.message||"Nie udało się dodać właściciela grupy.";button.disabled=false;return;}
    if(selected.length){const invited=await supabaseClient.from("community_group_members").insert(selected.map(user_id=>({group_id:groupId,user_id,role:"member"})));if(invited.error){host.querySelector("#community-group-feedback").textContent="Grupa utworzona, ale nie udało się dodać wszystkich znajomych.";}}
    closeGroupModal();
    await openCommunityGroupChat(groupId);
  });
  host.querySelectorAll("[data-open-group]").forEach(b=>b.addEventListener("click",()=>openCommunityGroupChat(b.dataset.openGroup)));
}

async function openCommunityGroupChat(groupId, fromRealtime=false) {
  const host=$("page-content");
  const groupResult=await supabaseClient.from("community_group_chats").select("id,name,description,avatar_emoji,created_by").eq("id",groupId).single();
  if(groupResult.error||!groupResult.data){await renderCommunityGroupsPage();return;}
  const group=groupResult.data;
  const [membersResult,messagesResult]=await Promise.all([
    supabaseClient.from("community_group_members").select("user_id,role").eq("group_id",groupId),
    supabaseClient.from("community_group_messages").select("id,group_id,sender_id,content,created_at").eq("group_id",groupId).order("created_at",{ascending:true}).limit(150)
  ]);
  if(membersResult.error||messagesResult.error){host.innerHTML='<div class="page-content"><p>Nie udało się otworzyć czatu grupowego.</p></div>';return;}
  await supabaseClient.from("notifications").update({read_at:new Date().toISOString()}).eq("user_id",currentUser.id).eq("type","group_message").eq("related_id",groupId).is("read_at",null);
  await loadNotifications();
  const members=membersResult.data||[];
  await loadProfilesByIds(members.map(m=>m.user_id));
  const names=new Map(members.map(m=>{const p=getProfileById(m.user_id);return [m.user_id,p?.nickname||"Uczeń"];}));
  const owner=group.created_by===currentUser.id;
  const messages=(messagesResult.data||[]).map(m=>'<article class="community-group-message '+(m.sender_id===currentUser.id?"mine":"")+'"><div class="community-group-message-meta">'+communityAuthorHTML(m.sender_id,names.get(m.sender_id)||"Uczeń")+'<time>'+escapeHTML(formatTime(m.created_at))+'</time></div><p>'+escapeHTML(m.content)+'</p>'+(m.sender_id===currentUser.id||owner?'<button type="button" data-group-message-delete="'+m.id+'">Usuń</button>':"")+(m.sender_id!==currentUser.id?'<button type="button" class="text-action" data-group-message-report="'+m.id+'" data-author="'+m.sender_id+'">Zgłoś</button>':"")+'</article>').join("");
  host.innerHTML='<section class="community-group-chat"><header class="community-group-chat-head"><button type="button" class="secondary-btn" id="group-chat-back">‹ Wróć</button><span class="community-group-avatar">'+escapeHTML(group.avatar_emoji||"👥")+'</span><div><h2>'+escapeHTML(group.name)+'</h2><small>'+members.length+' uczestników · czat tekstowy</small></div><button type="button" class="secondary-btn" id="group-chat-refresh">Odśwież</button></header><p class="community-group-description">'+escapeHTML(group.description||"")+'</p><div class="community-group-members">'+members.map(m=>'<span>'+escapeHTML(names.get(m.user_id)||"Uczeń")+(m.role==="owner"?" · właściciel":"")+'</span>').join("")+'</div><div class="community-group-messages" id="community-group-messages">'+(messages||'<div class="community-empty-state"><strong>To początek rozmowy</strong><small>Napisz pierwszą wiadomość.</small></div>')+'</div><form class="community-group-composer" id="community-group-message-form"><input id="community-group-message-input" maxlength="2000" required placeholder="Napisz wiadomość..." autocomplete="off"><button class="main-btn" type="submit">Wyślij</button></form><div class="community-group-footer">'+(owner?'<button type="button" class="text-action danger-text" id="group-delete">Usuń grupę</button>':'<button type="button" class="text-action" id="group-leave">Opuść grupę</button>')+'</div></section>';
  host.querySelector("#group-chat-back").addEventListener("click",renderCommunityGroupsPage);
  host.querySelector("#group-chat-refresh").addEventListener("click",()=>openCommunityGroupChat(groupId));
  host.querySelector("#community-group-message-form").addEventListener("submit",async e=>{
    e.preventDefault();const input=host.querySelector("#community-group-message-input"),button=e.currentTarget.querySelector("button");const content=input.value.trim();if(!content)return;button.disabled=true;
    const {error}=await supabaseClient.from("community_group_messages").insert({group_id:groupId,sender_id:currentUser.id,content});
    if(error){alert("Nie udało się wysłać wiadomości.");button.disabled=false;return;}input.value="";button.disabled=false;await openCommunityGroupChat(groupId);
  });
  host.querySelectorAll("[data-group-message-delete]").forEach(b=>b.addEventListener("click",async()=>{const {error}=await supabaseClient.from("community_group_messages").delete().eq("id",b.dataset.groupMessageDelete);if(error)alert("Nie udało się usunąć wiadomości.");else await openCommunityGroupChat(groupId);}));
  host.querySelector("#group-leave")?.addEventListener("click",async()=>{if(!confirm("Opuścić tę grupę?"))return;const {error}=await supabaseClient.from("community_group_members").delete().eq("group_id",groupId).eq("user_id",currentUser.id);if(error)alert("Nie udało się opuścić grupy.");else await renderCommunityGroupsPage();});
  host.querySelector("#group-delete")?.addEventListener("click",async()=>{if(!confirm("Usunąć grupę i całą jej historię?"))return;const {error}=await supabaseClient.from("community_group_chats").delete().eq("id",groupId);if(error)alert("Nie udało się usunąć grupy.");else await renderCommunityGroupsPage();});
  const container=host.querySelector("#community-group-messages");if(container)container.scrollTop=container.scrollHeight;
  if(!fromRealtime){
    if(communityGroupChannel)await supabaseClient.removeChannel(communityGroupChannel);
    communityGroupChannel=supabaseClient.channel("community-group-"+groupId).on("postgres_changes",{event:"*",schema:"public",table:"community_group_messages",filter:"group_id=eq."+groupId},()=>{if(currentAppPage==="groups")openCommunityGroupChat(groupId,true);}).subscribe();
  }
}

async function renderCommunityPollsPage() {
  const host=$("page-content");
  const [pollsResult,optionsResult,votesResult]=await Promise.all([
    supabaseClient.from("community_polls").select("id,author_id,question,created_at,closes_at").order("created_at",{ascending:false}).limit(60),
    supabaseClient.from("community_poll_options").select("id,poll_id,label,sort_order").order("sort_order"),
    supabaseClient.from("community_poll_votes").select("poll_id,option_id,user_id")
  ]);
  if(pollsResult.error||optionsResult.error||votesResult.error){host.innerHTML='<div class="page-content"><p>Nie udało się załadować ankiet.</p></div>';return;}
  const polls=pollsResult.data||[],options=optionsResult.data||[],votes=votesResult.data||[];
  await loadProfilesByIds(polls.map(p=>p.author_id));
  const cards=polls.map(p=>{
    const opts=options.filter(o=>o.poll_id===p.id),pollVotes=votes.filter(v=>v.poll_id===p.id),mine=pollVotes.find(v=>v.user_id===currentUser.id),total=pollVotes.length,closed=p.closes_at&&new Date(p.closes_at)<=new Date();
    const choices=opts.map(o=>{const count=pollVotes.filter(v=>v.option_id===o.id).length,percent=total?Math.round(count/total*100):0;return '<div class="community-poll-option '+(mine?.option_id===o.id?"selected":"")+'">'+(!mine&&!closed?'<label><input type="radio" name="poll-'+p.id+'" value="'+o.id+'"><span>'+escapeHTML(o.label)+'</span></label>':'<span>'+escapeHTML(o.label)+'</span>')+(mine||closed?'<div class="community-poll-bar"><i style="width:'+percent+'%"></i></div><small>'+count+' · '+percent+'%</small>':"")+'</div>';}).join("");
    return '<article class="community-poll-card"><div class="community-poll-top"><span>📊 Ankieta</span><time>'+escapeHTML(new Date(p.created_at).toLocaleDateString("pl-PL"))+'</time></div><h3>'+escapeHTML(p.question)+'</h3><div class="community-poll-author">'+communityAuthorHTML(p.author_id,getProfileById(p.author_id)?.nickname||"Uczeń")+'</div><div class="community-poll-options">'+choices+'</div><div class="community-poll-footer"><span>'+total+' głosów'+(mine?' · Twój głos zapisany':closed?' · Zakończona':"")+'</span>'+(mine||closed?"":'<button type="button" class="main-btn" data-poll-vote="'+p.id+'">Głosuj</button>')+(p.author_id===currentUser.id?'<button type="button" class="text-action" data-poll-delete="'+p.id+'">Usuń</button>':"")+'<button type="button" class="text-action" data-favorite-type="poll" data-favorite-id="'+p.id+'">☆ Zapisz</button></div></article>';
  }).join("");
  host.innerHTML='<section class="community-feature-hero community-feature-hero-action"><div><span class="community-feature-kicker">ZSPM COMMUNITY</span><h2>Odpowiadaj i głosuj</h2><p>Twórz ankiety, poznawaj opinie społeczności i sprawdzaj wyniki.</p></div><button type="button" class="community-create-cta" id="community-poll-create-open"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>Utwórz ankietę</button></section><div class="community-feature-modal" id="community-poll-modal" hidden><div class="community-feature-modal-backdrop" data-poll-modal-close></div><section class="community-feature-dialog" role="dialog" aria-modal="true" aria-labelledby="community-poll-dialog-title"><header class="community-feature-dialog-head"><div><span class="community-feature-kicker">GŁOS SPOŁECZNOŚCI</span><h3 id="community-poll-dialog-title">Utwórz ankietę</h3></div><button type="button" class="community-feature-dialog-close" data-poll-modal-close aria-label="Zamknij">×</button></header><form id="community-poll-form" class="community-feature-form"><label>Pytanie<input id="poll-question" maxlength="180" minlength="5" required placeholder="Np. Jaką funkcję dodać jako następną?"></label><div class="community-poll-create-options"><label>Opcja 1<input class="poll-option-input" maxlength="100" required></label><label>Opcja 2<input class="poll-option-input" maxlength="100" required></label><label>Opcja 3<input class="poll-option-input" maxlength="100" placeholder="Opcjonalnie"></label><label>Opcja 4<input class="poll-option-input" maxlength="100" placeholder="Opcjonalnie"></label></div><button type="submit" class="community-create-submit">Opublikuj ankietę</button><p id="poll-feedback" class="feature-feedback" aria-live="polite"></p></form></section></div><section class="community-polls-list">'+(cards||'<div class="community-empty-state"><span>📊</span><strong>Brak ankiet</strong><small>Utwórz pierwszą ankietę dla społeczności.</small></div>')+'</section>';
  const pollModal=host.querySelector("#community-poll-modal");
  const closePollModal=()=>{pollModal.hidden=true;document.removeEventListener("keydown",pollModalEscape);};
  const pollModalEscape=e=>{if(e.key==="Escape")closePollModal();};
  host.querySelector("#community-poll-create-open").addEventListener("click",()=>{pollModal.hidden=false;host.querySelector("#poll-question").focus();document.addEventListener("keydown",pollModalEscape);});
  pollModal.querySelectorAll("[data-poll-modal-close]").forEach(el=>el.addEventListener("click",closePollModal));
  host.querySelector("#community-poll-form").addEventListener("submit",async e=>{
    e.preventDefault();const form=e.currentTarget,button=form.querySelector('button[type="submit"]');button.disabled=true;
    const labels=[...form.querySelectorAll(".poll-option-input")].map(x=>x.value.trim()).filter(Boolean);
    if(labels.length<2){host.querySelector("#poll-feedback").textContent="Dodaj co najmniej dwie opcje.";button.disabled=false;return;}
    const created=await supabaseClient.from("community_polls").insert({author_id:currentUser.id,question:host.querySelector("#poll-question").value.trim()}).select("id").single();
    if(created.error){host.querySelector("#poll-feedback").textContent=created.error.message||"Nie udało się utworzyć ankiety.";button.disabled=false;return;}
    const added=await supabaseClient.from("community_poll_options").insert(labels.map((label,i)=>({poll_id:created.data.id,label,sort_order:i})));
    if(added.error){await supabaseClient.from("community_polls").delete().eq("id",created.data.id);host.querySelector("#poll-feedback").textContent="Nie udało się zapisać opcji.";button.disabled=false;return;}
    closePollModal();
    await renderCommunityPollsPage();
  });
  host.querySelectorAll("[data-poll-vote]").forEach(b=>b.addEventListener("click",async()=>{const selected=host.querySelector('input[name="poll-'+b.dataset.pollVote+'"]:checked');if(!selected){alert("Wybierz odpowiedź.");return;}b.disabled=true;const {error}=await supabaseClient.from("community_poll_votes").insert({poll_id:b.dataset.pollVote,option_id:selected.value,user_id:currentUser.id});if(error){alert("Nie udało się zapisać głosu. Być może już głosowałeś.");b.disabled=false;return;}await renderCommunityPollsPage();}));
  host.querySelectorAll("[data-poll-delete]").forEach(b=>b.addEventListener("click",async()=>{if(!confirm("Usunąć tę ankietę?"))return;const {error}=await supabaseClient.from("community_polls").delete().eq("id",b.dataset.pollDelete);if(error)alert("Nie udało się usunąć ankiety.");else await renderCommunityPollsPage();}));
}

async function toggleCommunityFavorite(type,id,button) {
  const existing=await supabaseClient.from("community_favorites").select("id").eq("user_id",currentUser.id).eq("target_type",type).eq("target_id",id).maybeSingle();
  if(existing.error){alert("Nie udało się sprawdzić zapisanych elementów.");return;}
  if(existing.data){const {error}=await supabaseClient.from("community_favorites").delete().eq("id",existing.data.id);if(error){alert("Nie udało się usunąć z ulubionych.");return;}if(button){button.classList.remove("saved");button.textContent="☆ Zapisz";}}
  else {const {error}=await supabaseClient.from("community_favorites").insert({user_id:currentUser.id,target_type:type,target_id:id});if(error){alert("Nie udało się dodać do ulubionych.");return;}if(button){button.classList.add("saved");button.textContent="★ Zapisano";}}
}

async function renderCommunityFavoritesPage() {
  const host=$("page-content");
  const {data:rows,error}=await supabaseClient.from("community_favorites").select("id,target_type,target_id,created_at").eq("user_id",currentUser.id).order("created_at",{ascending:false}).limit(100);
  if(error){host.innerHTML='<div class="page-content"><p>Nie udało się załadować ulubionych.</p></div>';return;}
  const byType={forum_post:[],idea:[],event:[],poll:[]};(rows||[]).forEach(r=>byType[r.target_type]?.push(r));
  const [forums,ideas,events,polls]=await Promise.all([
    byType.forum_post.length?supabaseClient.from("community_forum_posts").select("id,title,body").in("id",byType.forum_post.map(x=>x.target_id)):{data:[]},
    byType.idea.length?supabaseClient.from("community_ideas").select("id,title,description").in("id",byType.idea.map(x=>x.target_id)):{data:[]},
    byType.event.length?supabaseClient.from("community_events").select("id,title,description").in("id",byType.event.map(x=>x.target_id)):{data:[]},
    byType.poll.length?supabaseClient.from("community_polls").select("id,question").in("id",byType.poll.map(x=>x.target_id)):{data:[]}
  ]);
  const maps={forum_post:new Map((forums.data||[]).map(x=>[x.id,{title:x.title,preview:x.body,route:"forum"}])),idea:new Map((ideas.data||[]).map(x=>[x.id,{title:x.title,preview:x.description,route:"ideas"}])),event:new Map((events.data||[]).map(x=>[x.id,{title:x.title,preview:x.description,route:"events"}])),poll:new Map((polls.data||[]).map(x=>[x.id,{title:x.question,preview:"Ankieta społeczności",route:"polls"}]))};
  const labels={forum_post:"Forum",idea:"Pomysł",event:"Ogłoszenie / wydarzenie",poll:"Ankieta"};
  const cards=(rows||[]).map(r=>{const item=maps[r.target_type]?.get(r.target_id);if(!item)return "";return '<article class="community-favorite-card"><div><span>'+escapeHTML(labels[r.target_type]||"Zapisane")+'</span><h3>'+escapeHTML(item.title)+'</h3><p>'+escapeHTML(item.preview||"")+'</p><small>'+escapeHTML(new Date(r.created_at).toLocaleDateString("pl-PL"))+'</small></div><div><button type="button" class="secondary-btn" data-favorite-open="'+item.route+'">Otwórz</button><button type="button" class="text-action" data-favorite-remove="'+r.id+'">Usuń</button></div></article>';}).join("");
  host.innerHTML='<section class="community-feature-hero"><div><span class="community-feature-kicker">ZSPM COMMUNITY</span><h2>Twoje ulubione</h2><p>Wszystkie zapisane pomysły, tematy, ankiety i ogłoszenia w jednym miejscu.</p></div><span class="community-feature-hero-icon">⭐</span></section><div class="community-favorites-list">'+(cards||'<div class="community-empty-state"><span>☆</span><strong>Lista jest pusta</strong><small>Zapisuj ciekawe treści, aby wrócić do nich później.</small></div>')+'</div>';
  host.querySelectorAll("[data-favorite-open]").forEach(b=>b.addEventListener("click",()=>openPage(b.dataset.favoriteOpen)));
  host.querySelectorAll("[data-favorite-remove]").forEach(b=>b.addEventListener("click",async()=>{const {error}=await supabaseClient.from("community_favorites").delete().eq("id",b.dataset.favoriteRemove);if(error)alert("Nie udało się usunąć elementu.");else await renderCommunityFavoritesPage();}));
}

async function renderCommunityDailyQuestsPage() {
  const host=$("page-content");
  const day=new Date().toLocaleDateString("en-CA",{timeZone:"Europe/Warsaw"});
  const [claimsResult,favoritesResult,pollsResult,ideasResult,commentsResult,votesResult]=await Promise.all([
    supabaseClient.from("community_daily_quest_claims").select("quest_key").eq("user_id",currentUser.id).eq("quest_date",day),
    supabaseClient.from("community_favorites").select("created_at").eq("user_id",currentUser.id).order("created_at",{ascending:false}).limit(50),
    supabaseClient.from("community_polls").select("created_at").eq("author_id",currentUser.id).order("created_at",{ascending:false}).limit(30),
    supabaseClient.from("community_ideas").select("created_at").eq("author_id",currentUser.id).order("created_at",{ascending:false}).limit(30),
    supabaseClient.from("community_forum_comments").select("created_at").eq("author_id",currentUser.id).order("created_at",{ascending:false}).limit(50),
    supabaseClient.from("community_poll_votes").select("created_at").eq("user_id",currentUser.id).order("created_at",{ascending:false}).limit(50)
  ]);
  if([claimsResult,favoritesResult,pollsResult,ideasResult,commentsResult,votesResult].some(r=>r.error)){host.innerHTML='<div class="page-content"><p>Nie udało się załadować zadań.</p></div>';return;}
  const isToday=rows=>(rows||[]).some(x=>new Date(x.created_at).toLocaleDateString("en-CA",{timeZone:"Europe/Warsaw"})===day);
  const done={save_favorite:isToday(favoritesResult.data),create_poll:isToday(pollsResult.data),publish_idea:isToday(ideasResult.data),forum_comment:isToday(commentsResult.data),vote_poll:isToday(votesResult.data)};
  const claimed=new Set((claimsResult.data||[]).map(x=>x.quest_key));
  const quests=[
    ["save_favorite",'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/></svg>',"Zapisz treść w ulubionych","Dodaj ciekawy wpis do swojej listy."],
    ["create_poll",'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/><path d="M8 7h8M8 11h6"/></svg>',"Utwórz ankietę","Zadaj społeczności interesujące pytanie."],
    ["publish_idea",'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 22h4M8.5 14.5a7 7 0 1 1 7 0c-.8.6-1.2 1.4-1.3 2.5h-4.4c-.1-1.1-.5-1.9-1.3-2.5Z"/><path d="M12 2v2M4.9 4.9l1.4 1.4M19.1 4.9l-1.4 1.4"/></svg>',"Opublikuj pomysł","Podziel się propozycją ulepszenia aplikacji."],
    ["forum_comment",'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-3 2v-5.5a7.5 7.5 0 1 1 16-4Z"/><path d="M8 10h8M8 14h5"/></svg>',"Skomentuj temat na forum","Dodaj pomocny komentarz w dyskusji."],
    ["vote_poll",'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 12.5 11.5 15 16 9.5"/><circle cx="12" cy="12" r="9"/><path d="M12 3v2M21 12h-2"/></svg>',"Weź udział w ankiecie","Oddaj głos w ankiecie społeczności."]
  ];
  const completedCount=quests.filter(q=>done[q[0]]).length;
  const progressPercent=Math.round(completedCount/quests.length*100);
  const earnedXp=claimed.size*15;
  host.innerHTML='<section class="community-feature-hero community-quests-hero"><div class="community-quests-hero-copy"><span class="community-feature-kicker">ZSPM COMMUNITY</span><h2>Codzienne zadania</h2><p>Małe aktywności, które rozwijają społeczność. Wykonaj zadania i odbierz codzienne XP.</p><div class="community-quests-summary"><span><strong>'+completedCount+'</strong> / '+quests.length+' wykonane</span><span><strong>'+earnedXp+'</strong> XP zdobyte dzisiaj</span></div><div class="community-quests-progress" role="progressbar" aria-label="Postęp dzisiejszych zadań" aria-valuemin="0" aria-valuemax="'+quests.length+'" aria-valuenow="'+completedCount+'"><i style="width:'+progressPercent+'%"></i></div></div><span class="community-feature-hero-icon community-quests-trophy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4"/></svg></span></section><div class="community-quests-section-head"><div><h3>Twoje zadania</h3><p>Każde zadanie nagradza <strong>15 XP</strong> i można je odebrać raz dziennie.</p></div><span>'+claimed.size+'/'+quests.length+' odebrane</span></div><div class="community-quest-list">'+quests.map(q=>'<article class="community-quest-card '+(claimed.has(q[0])?"claimed":done[q[0]]?"completed":"")+'"><span class="community-quest-icon">'+q[1]+'</span><div class="community-quest-copy"><strong>'+q[2]+'</strong><p>'+q[3]+'</p><small>'+(claimed.has(q[0])?'<span class="community-quest-status-dot"></span>Nagroda odebrana':done[q[0]]?'<span class="community-quest-status-dot"></span>Gotowe do odbioru':'Do wykonania')+'</small></div><div class="community-quest-action"><b>+15 XP</b><button type="button" class="secondary-btn" data-quest-claim="'+q[0]+'" '+(!done[q[0]]||claimed.has(q[0])?"disabled":"")+'>'+(claimed.has(q[0])?"Odebrano":done[q[0]]?"Odbierz XP":"Wykonaj")+'</button></div></article>').join("")+'</div>';
  host.querySelectorAll("[data-quest-claim]").forEach(b=>b.addEventListener("click",async()=>{b.disabled=true;const {data,error}=await supabaseClient.rpc("claim_community_daily_quest",{p_quest_key:b.dataset.questClaim});if(error){alert("Nie udało się odebrać XP.");b.disabled=false;return;}if(!data?.ok){alert(data?.reason==="already_claimed"?"To zadanie zostało już odebrane.":"Najpierw wykonaj zadanie.");}await renderCommunityDailyQuestsPage();}));
}

async function renderCommunityAnnouncementsPage(){await renderCommunityEventsPage("announcement");}

// NAWIGACJA

const pages = {
  feed: { title: "Aktywność społeczności", subtitle: "Najnowsze wpisy z forum i pomysłów", content: "" },
  updates: { title: "Updates", subtitle: "Historia zmian i nowości w aplikacji", content: "" },
  events: { title: "Wydarzenia", subtitle: "Karty wydarzeń i ogłoszenia społeczności", content: "" },
  announcements: { title: "Ogłoszenia", subtitle: "Informacje i ogłoszenia społeczności", content: "" },
  groups: { title: "Grupowe czaty", subtitle: "Rozmowy ze znajomymi", content: "" },
  polls: { title: "Ankiety", subtitle: "Głosowania społeczności", content: "" },
  favorites: { title: "Ulubione", subtitle: "Zapisane treści", content: "" },
  quests: { title: "Codzienne zadania", subtitle: "Zdobywaj XP za aktywność", content: "" },
  search: { title: "Wyszukiwarka", subtitle: "Szukaj osób, tematów na forum i pomysłów", content: "" },

  profiles: {
    title: "Ankiety uczniów",
    subtitle: "Poznaj społeczność swojej szkoły",
    content: ""
  },

  "my-profile": {
    title: "Mój profil",
    subtitle: "Twój profil w społeczności ZSPM",
    content: ""
  },

  questionnaire: {
    title: "Moja ankieta",
    subtitle: "Oddzielna ankieta do poznawania innych uczniów",
    content: ""
  },

  chat: {
    title: "Wiadomości",
    subtitle: "Prywatne rozmowy ze znajomymi",
    content: ""
  },

  friends: {
    title: "Znajomi",
    subtitle: "Zaproszenia i Twoi znajomi",
    content: ""
  },

  notifications: {
    title: "Powiadomienia",
    subtitle: "Twoja aktywność w społeczności",
    content: ""
  },

  settings: {
    title: "Ustawienia",
    subtitle: "Zarządzaj swoim kontem",
    content: ""
  },

  admin: {
    title: "Panel administracji",
    subtitle: "Moderacja i statusy użytkowników",
    content: ""
  },

  ideas: {
    title: "Wasze Pomysły",
    subtitle: "Podziel się pomysłem i zagłosuj na propozycje innych",
    content: ""
  },

  forum: { title: "Forum społeczności", subtitle: "Rozmawiaj na tematy szkolne i nie tylko", content: "" },
  timetable: { title: "Plan lekcji", subtitle: "Rozkład zajęć klas technikum", content: "" },
  planner: { title: "Mój plan", subtitle: "Zadania, sprawdziany i terminy", content: "" },
  cosmetics: { title: "Sklep wyglądu", subtitle: "Odblokowuj ozdoby wraz z poziomem", content: "" },

  ranking: {
    title: "Ranking",
    subtitle: "Najaktywniejsi, wspierający i lubiani",
    content: ""
  },

  information: {
    title: "Informacje",
    subtitle: "Wszystko, co warto wiedzieć o ZSPM Community",
    content: ""
  },

  support: {
    title: "Wesprzyj twórcę",
    subtitle: "Pomóż rozwijać projekt",
    content: `
      <div class="page-content support-page">
        <section class="profile-card">
          <h3>Wesprzyj ZSPM Community</h3>
          <p>Dziękujemy, że chcesz wesprzeć rozwój projektu!</p>
          <h4>Przelew bankowy</h4>
          <p>Możesz wysłać dowolną kwotę ze swojego banku. W aplikacji bankowej wybierz zwykły przelew i wpisz wybraną przez siebie sumę.</p>
          <div class="support-account-box">
            <span class="small-label">Numer rachunku</span>
            <strong class="support-account-number" id="support-account-display">${SUPPORT_ACCOUNT_NUMBER || "Numer rachunku zostanie uzupełniony."}</strong>
            <button type="button" class="support-copy-btn" id="copy-support-account">⧉ <span>Kopiuj numer konta</span></button>
            <p class="support-copy-status" id="support-copy-status" aria-live="polite"></p>
          </div>
          <p><strong>Tytuł przelewu:</strong> Wsparcie ZSPM Community</p>
          <p class="muted">Przed zatwierdzeniem sprawdź dane odbiorcy i kwotę w swojej aplikacji bankowej. Wsparcie jest dobrowolne.</p>
          <p class="muted">Kod QR do szybkiego przelewu dodamy wkrótce.</p>
        </section>
      </div>
    `
  }
};


function updateAdminHomeCard() {
  const adminMoreLink = $("more-admin-link");
  if (adminMoreLink) adminMoreLink.hidden = !isAdmin;
  const grid = document.querySelector("#home-page .menu-grid");
  if (!grid) return;
  const existing = grid.querySelector('[data-page="admin"]');
  if (!isAdmin && existing) existing.remove();
  if (isAdmin && !existing) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "menu-item admin-menu-item";
    card.dataset.page = "admin";
    card.innerHTML = '<div class="menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></svg></div><h3>Panel administracji</h3><p>Moderacja i statusy użytkowników</p>';
    grid.appendChild(card);
    card.addEventListener("click", () => openPage("admin"));
  }
}

function formatModerationExpiry(value) {
  return value ? new Date(value).toLocaleString("pl-PL") : "Bezterminowo";
}

function formatStorageBytes(value) {
  const bytes = Math.max(0, Number(value) || 0);
  if (bytes < 1024) return bytes + " B";
  const units = ["KB", "MB", "GB", "TB"];
  let size = bytes / 1024, unit = 0;
  while (size >= 1024 && unit < units.length - 1) { size /= 1024; unit++; }
  return size.toFixed(size >= 10 ? 1 : 2) + " " + units[unit];
}

async function renderAdminPage() {
  const host = $("page-content");
  host.innerHTML = '<div class="page-content"><p>Ładowanie panelu administracji...</p></div>';
  const [profilesResult, reportsResult, moderationResult, badgesResult, donationResult, pendingEventsResult, storageResult, cleanupPreviewResult] = await Promise.all([
    supabaseClient.from("profiles").select("id,nickname,class_name,is_visible").order("nickname"),
    supabaseClient.from("content_reports").select("id,reporter_id,reported_user_id,target_type,target_id,reason,created_at").order("created_at", {ascending:false}).limit(100),
    supabaseClient.from("user_moderation").select("id,user_id,action,reason,expires_at,created_at").is("revoked_at", null).order("created_at", {ascending:false}),
    supabaseClient.from("user_badges").select("user_id,badge"),
    supabaseClient.from("donation_ranking").select("user_id,amount,updated_at").order("amount",{ascending:false}),
    supabaseClient.from("community_events").select("id").eq("status","pending"),
    supabaseClient.rpc("admin_get_storage_stats"),
    supabaseClient.rpc("admin_preview_old_messages")
  ]);
  const errors = [profilesResult.error,reportsResult.error,moderationResult.error,badgesResult.error].filter(Boolean);
  if (errors.length) console.warn("Admin data load warnings:", errors);
  const profiles = profilesResult.data || [];
  const storageStats = storageResult.data || {};
  const cleanupPreview = cleanupPreviewResult.data || {};
  const storageLoadError = storageResult.error || cleanupPreviewResult.error;
  const dbBytes = Number(storageStats.database_bytes) || 0;
  const dbLimit = Number(storageStats.database_limit_bytes) || 524288000;
  const storageBytes = Number(storageStats.storage_bytes) || 0;
  const storageLimit = Number(storageStats.storage_limit_bytes) || 1073741824;
  const dbPercent = dbLimit ? Math.min(100, dbBytes / dbLimit * 100) : 0;
  const storagePercent = storageLimit ? Math.min(100, storageBytes / storageLimit * 100) : 0;
  const cleanupCount = Number(cleanupPreview.total) || 0;
  const memoryCritical = dbPercent >= 90 || storagePercent >= 90;
  const nameById = new Map(profiles.map(p => [p.id,p.nickname]));
  const badgeById = new Map((badgesResult.data || []).map(b => [b.user_id,b.badge]));
  const activeById = new Map();
  (moderationResult.data || []).filter(m => !m.expires_at || new Date(m.expires_at).getTime() > Date.now())
    .forEach(m => { if (!activeById.has(m.user_id)) activeById.set(m.user_id,[]); activeById.get(m.user_id).push(m); });

  const usersHtml = profiles.map(profile => {
    const actions = activeById.get(profile.id) || [];
    const activeHtml = actions.map(m => '<div class="admin-active-action"><strong>' +
      (m.action === "ban" ? "BAN" : "MUTE") + '</strong> · ' + escapeHTML(m.reason) +
      '<small>' + escapeHTML(formatModerationExpiry(m.expires_at)) +
      '</small><button type="button" class="admin-small-btn" data-admin-action="revoke" data-id="' +
      escapeHTML(m.id) + '">Zdejmij</button></div>').join("");
    const badge = profile.id === currentUser.id ? '<span class="user-role-badge admin-role">ADMIN</span>' :
      badgeById.get(profile.id) === "premium" ? '<span class="user-role-badge premium-role">PREMIUM</span>' : "";
    return '<article class="admin-user-card"><div class="admin-user-head"><div><strong>' +
      escapeHTML(profile.nickname) + '</strong> ' + badge + '<small>' +
      escapeHTML(profile.class_name || "Klasa niepodana") + '</small></div></div>' +
      (activeHtml || '<p class="admin-no-action">Brak aktywnych kar</p>') +
      '<div class="admin-controls"><label>Rodzaj<select data-kind="' + profile.id +
      '"><option value="mute">Mute</option><option value="ban">Ban</option></select></label>' +
      '<label>Czas<select data-duration="' + profile.id +
      '"><option value="1h">1 godzina</option><option value="24h">24 godziny</option><option value="7d" selected>7 dni</option><option value="30d">30 dni</option><option value="permanent">Na zawsze</option></select></label>' +
      '<label>Powód<select data-reason="' + profile.id +
      '"><option value="Spam">Spam</option><option value="Obraźliwe zachowanie">Obraźliwe zachowanie</option><option value="Nękanie lub dokuczanie">Nękanie lub dokuczanie</option><option value="Nieodpowiednie treści">Nieodpowiednie treści</option><option value="Inne naruszenie zasad">Inne naruszenie zasad</option></select></label>' +
      '<button type="button" class="admin-action-btn" data-admin-action="apply" data-id="' + profile.id +
      '">Zastosuj karę</button>' +
      (profile.id === currentUser.id ? '' : '<button type="button" class="admin-premium-btn" data-admin-action="premium" data-id="' +
        profile.id + '">' + (badgeById.get(profile.id) === "premium" ? "Usuń PREMIUM" : "Nadaj PREMIUM") + '</button>') +
      '</div></article>';
  }).join("");

  const donationRowsHtml = (donationResult.data || []).map(row => {
    const profile = profiles.find(item => item.id === row.user_id);
    return '<div class="donation-admin-row"><div><strong>' +
      escapeHTML(profile?.nickname || "Usunięty użytkownik") +
      '</strong><small>' + Number(row.amount).toFixed(2).replace(".", ",") + ' zł</small></div>' +
      '<button type="button" class="admin-small-btn" data-donation-remove="' + row.user_id + '">Usuń z rankingu</button></div>';
  }).join("");
  const messageReportIds = (reportsResult.data || []).filter(r => r.target_type === "message").map(r => r.target_id);
  const groupReportIds = (reportsResult.data || []).filter(r => r.target_type === "group_message").map(r => r.target_id);
  const [privateReported, globalReported, groupReported] = await Promise.all([
    messageReportIds.length ? supabaseClient.from("messages").select("id,content").in("id",messageReportIds) : Promise.resolve({data:[]}),
    messageReportIds.length ? supabaseClient.from("global_chat_messages").select("id,content").in("id",messageReportIds) : Promise.resolve({data:[]}),
    groupReportIds.length ? supabaseClient.from("community_group_messages").select("id,content").in("id",groupReportIds) : Promise.resolve({data:[]})
  ]);
  const reportedText = new Map([...(privateReported.data || []), ...(globalReported.data || []), ...(groupReported.data || [])].map(m => [m.id,m.content]));
  const reportsHtml = (reportsResult.data || []).map(report =>
    '<div class="admin-report"><strong>' + escapeHTML(nameById.get(report.reported_user_id) || "Nieznany użytkownik") +
    '</strong><small>' + escapeHTML(report.target_type === "message" ? "Zgłoszona wiadomość" : report.target_type === "group_message" ? "Zgłoszona wiadomość grupowa" : report.target_type === "event" ? "Zgłoszone wydarzenie" : report.target_type === "forum_post" ? "Zgłoszony wpis forum" : "Zgłoszony profil") +
    ' · ' + escapeHTML(new Date(report.created_at).toLocaleString("pl-PL")) + '</small>' +
    ((report.target_type === "message" || report.target_type === "group_message") ? '<blockquote class="admin-reported-content">' + escapeHTML(reportedText.get(report.target_id) || "Wiadomość została usunięta.") + '</blockquote>' : '') +
    '<p>' + escapeHTML(report.reason || "Brak dodatkowego opisu.") + '</p></div>'
  ).join("");

  host.innerHTML = '<div class="admin-overview"><div class="admin-stat"><strong>' + profiles.length +
    '</strong><span>Widoczne profile</span></div><div class="admin-stat"><strong>' +
    (reportsResult.data || []).length + '</strong><span>Zgłoszenia</span></div><div class="admin-stat"><strong>' +
    (moderationResult.data || []).length + '</strong><span>Kary</span></div></div>' +
    '<div class="page-content admin-intro"><h3>Panel administracji</h3><p>Zarządzaj społecznością, wiadomościami i zgłoszeniami.</p></div>' +
    '<div class="admin-tabs" role="tablist">' +
      '<button type="button" class="admin-tab active" data-admin-tab="users">Użytkownicy</button>' +
      '<button type="button" class="admin-tab" data-admin-tab="events">Wydarzenia (' + ((pendingEventsResult.data || []).length) + ')</button>' +
      '<button type="button" class="admin-tab" data-admin-tab="reports">Zgłoszenia (' + (reportsResult.data || []).length + ')</button>' +
      '<button type="button" class="admin-tab" data-admin-tab="donations">Donaty</button>' +
      '<button type="button" class="admin-tab" data-admin-tab="database">Baza i pamięć</button>' +
    '</div>' +
    '<section class="admin-panel active" data-admin-panel="users"><h3 class="admin-section-title">Użytkownicy i moderacja</h3><input class="chat-search-input admin-search-input" id="admin-user-search" type="search" placeholder="Szukaj użytkownika lub klasy…" aria-label="Szukaj użytkownika lub klasy">' +
    '<div class="admin-user-list">' + (usersHtml || '<div class="page-content"><p>Brak widocznych profili.</p></div>') + '</div></section>' +
    '<section class="admin-panel" data-admin-panel="donations"><h3 class="admin-section-title">Ranking wpłat</h3>' +
    '<section class="donation-admin-card"><p>Wybierz użytkownika i wpisz łączną kwotę potwierdzonych wpłat. Miejsca w rankingu ustawią się automatycznie.</p>' +
    '<div class="donation-admin-form"><label>Użytkownik<select id="donation-user-select">' +
    profiles.map(profile => '<option value="' + profile.id + '">' + escapeHTML(profile.nickname) + '</option>').join("") +
    '</select></label><label>Kwota (zł)<input id="donation-amount-input" type="number" min="0" max="1000000" step="0.01" placeholder="100.00"></label>' +
    '<button type="button" class="admin-action-btn" id="donation-save">Zapisz kwotę</button></div>' +
    '<div class="donation-admin-list">' + (donationRowsHtml || '<p class="muted">Nie dodano jeszcze żadnych osób do rankingu.</p>') + '</div></section></section>' +
    '<section class="admin-panel" data-admin-panel="events"><h3 class="admin-section-title">' + escapeHTML(eventText("adminTitle")) + '</h3><div id="admin-events-list"></div></section>' +
    '<section class="admin-panel" data-admin-panel="reports"><h3 class="admin-section-title">Zgłoszenia użytkowników i wiadomości</h3><input class="chat-search-input admin-search-input" id="admin-report-search" type="search" placeholder="Szukaj w zgłoszeniach…" aria-label="Szukaj w zgłoszeniach">' +
    '<div class="admin-report-list">' + (reportsHtml || '<div class="page-content"><p>Nie ma nowych zgłoszeń.</p></div>') + '</div></section>' +
    '<section class="admin-panel" data-admin-panel="database"><div class="storage-panel-heading"><h3 class="admin-section-title">Pamięć i stan bazy danych</h3><button type="button" class="admin-small-btn" id="admin-refresh-storage">Odśwież pomiar</button></div>' +
    '<div class="storage-monitor-grid">' +
      '<article class="storage-monitor-card"><div class="storage-monitor-head"><strong>Baza danych</strong><span class="storage-monitor-value">' + formatStorageBytes(dbBytes) + '</span></div><div class="storage-meter"><span style="width:' + dbPercent.toFixed(1) + '%"></span></div><p>' + dbPercent.toFixed(1) + '% · wolne ' + formatStorageBytes(Math.max(0, dbLimit - dbBytes)) + ' · limit ' + formatStorageBytes(dbLimit) + '</p></article>' +
      '<article class="storage-monitor-card"><div class="storage-monitor-head"><strong>Pliki Storage</strong><span class="storage-monitor-value">' + formatStorageBytes(storageBytes) + '</span></div><div class="storage-meter"><span style="width:' + storagePercent.toFixed(1) + '%"></span></div><p>' + storagePercent.toFixed(1) + '% · wolne ' + formatStorageBytes(Math.max(0, storageLimit - storageBytes)) + ' · limit ' + formatStorageBytes(storageLimit) + '</p><small>Obiekty: ' + (Number(storageStats.storage_objects) || 0) + '</small></article>' +
    '</div>' +
    '<div class="storage-status ' + (memoryCritical ? 'critical' : (dbPercent >= 80 || storagePercent >= 80 ? 'warning' : 'healthy')) + '">' +
      (storageLoadError ? '<strong>Nie udało się pobrać pełnych danych.</strong> ' + escapeHTML(storageLoadError.message || "Sprawdź uprawnienia i połączenie.") : (memoryCritical ? '<strong>Uwaga: wykorzystanie osiągnęło 90%.</strong> Zatwierdź czyszczenie starych wiadomości po sprawdzeniu podglądu.' : (dbPercent >= 80 || storagePercent >= 80 ? '<strong>Ostrzeżenie: wykorzystanie przekroczyło 80%.</strong> Warto sprawdzić zużycie pamięci.' : '<strong>Pamięć w normie.</strong> Automatyczne usuwanie nie jest uruchamiane.'))) +
    '</div>' +
    '<div class="storage-cleanup-card"><h4>Stare wiadomości (90 dni)</h4><p>Do ewentualnego usunięcia: prywatne — ' + (Number(cleanupPreview.private_messages) || 0) + ', globalny czat — ' + (Number(cleanupPreview.global_messages) || 0) + ', czaty grupowe — ' + (Number(cleanupPreview.group_messages) || 0) + '.</p><p class="muted">Wiadomości ze zgłoszeniami oraz przypięte zostają zachowane. Usunięcie wymaga każdorazowego potwierdzenia administratora.</p><button type="button" class="admin-action-btn" id="admin-cleanup-old-messages" ' + (cleanupCount === 0 ? 'disabled' : '') + '>' + (memoryCritical ? 'Zatwierdź czyszczenie (' + cleanupCount + ')' : 'Wyczyść po zatwierdzeniu (' + cleanupCount + ')') + '</button></div>' +
    '<p class="storage-updated-at">Ostatni pomiar: ' + (storageStats.measured_at ? escapeHTML(new Date(storageStats.measured_at).toLocaleString("pl-PL")) : "brak danych") + '</p></section>' +
    '<p class="admin-feedback" id="admin-feedback" aria-live="polite"></p>';

  renderAdminEventQueue();
  const refreshStorageButton = host.querySelector("#admin-refresh-storage");
  if (refreshStorageButton) refreshStorageButton.addEventListener("click", () => renderAdminPage());
  const cleanupButton = host.querySelector("#admin-cleanup-old-messages");
  if (cleanupButton) cleanupButton.addEventListener("click", async () => {
    const preview = "Будет удалено старше 90 дней: " + (Number(cleanupPreview.private_messages)||0) + " личных, " + (Number(cleanupPreview.global_messages)||0) + " общих и " + (Number(cleanupPreview.group_messages)||0) + " групповых сообщений. Сообщения с жалобами и закреплённые сохраняются. Продолжить?";
    if (!window.confirm(preview)) return;
    cleanupButton.disabled = true;
    const feedback = host.querySelector("#admin-feedback");
    if (feedback) feedback.textContent = "Выполняется безопасная очистка…";
    const { data, error } = await supabaseClient.rpc("admin_cleanup_old_messages");
    if (error) {
      if (feedback) feedback.textContent = error.message || "Не удалось выполнить очистку.";
      cleanupButton.disabled = false;
      return;
    }
    window.alert("Очистка завершена. Удалено сообщений: " + (Number(data?.deleted_total)||0) + ".");
    await renderAdminPage();
  });
  const userSearch = host.querySelector("#admin-user-search");
  if (userSearch) userSearch.addEventListener("input", () => host.querySelectorAll(".admin-user-card").forEach(card => { card.hidden = !card.textContent.toLocaleLowerCase("pl").includes(userSearch.value.trim().toLocaleLowerCase("pl")); }));
  const reportSearch = host.querySelector("#admin-report-search");
  if (reportSearch) reportSearch.addEventListener("input", () => host.querySelectorAll(".admin-report").forEach(card => { card.hidden = !card.textContent.toLocaleLowerCase("pl").includes(reportSearch.value.trim().toLocaleLowerCase("pl")); }));
  const donationSave = host.querySelector("#donation-save");
  if (donationSave) donationSave.addEventListener("click", async () => {
    const userId = host.querySelector("#donation-user-select")?.value;
    const amountRaw = host.querySelector("#donation-amount-input")?.value;
    const amount = Number(amountRaw);
    const feedback = host.querySelector("#admin-feedback");
    if (!userId || amountRaw === "" || !Number.isFinite(amount) || amount < 0 || amount > 1000000) {
      if (feedback) feedback.textContent = "Wpisz poprawną kwotę od 0 do 1 000 000 zł.";
      return;
    }
    donationSave.disabled = true;
    const { error } = await supabaseClient.from("donation_ranking").upsert({
      user_id:userId, amount:amount, updated_at:new Date().toISOString(), updated_by:currentUser.id
    }, {onConflict:"user_id"});
    if (error) {
      if (feedback) feedback.textContent = error.message || "Nie udało się zapisać kwoty.";
      donationSave.disabled = false;
      return;
    }
    await renderAdminPage();
  });
  host.querySelectorAll("[data-donation-remove]").forEach(button => {
    button.addEventListener("click", async () => {
      button.disabled = true;
      const { error } = await supabaseClient.from("donation_ranking").delete().eq("user_id", button.dataset.donationRemove);
      if (error) {
        const feedback = host.querySelector("#admin-feedback");
        if (feedback) feedback.textContent = error.message || "Nie udało się usunąć wpisu.";
        button.disabled = false;
        return;
      }
      await renderAdminPage();
    });
  });

  host.querySelectorAll("[data-admin-action]").forEach(button => {
    button.addEventListener("click", async () => {
      const action = button.dataset.adminAction;
      const id = button.dataset.id;
      button.disabled = true;
      try {
        if (action === "apply") {
          if (id === currentUser.id) throw new Error("Nie możesz nałożyć kary na własne konto.");
          const kind = host.querySelector('[data-kind="' + id + '"]').value;
          const duration = host.querySelector('[data-duration="' + id + '"]').value;
          const reason = host.querySelector('[data-reason="' + id + '"]').value;
          const expires = duration === "permanent" ? null : new Date(Date.now() + ({
            "1h":3600000,"24h":86400000,"7d":604800000,"30d":2592000000
          })[duration]).toISOString();
          const { error } = await supabaseClient.from("user_moderation").insert({
            user_id:id, action:kind, reason, expires_at:expires, moderator_id:currentUser.id
          });
          if (error) throw error;
        } else if (action === "revoke") {
          const { error } = await supabaseClient.from("user_moderation")
            .update({revoked_at:new Date().toISOString(),revoked_by:currentUser.id})
            .eq("id",id);
          if (error) throw error;
        } else if (action === "premium") {
          const existing = badgeById.get(id);
          const result = existing === "premium"
            ? await supabaseClient.from("user_badges").delete().eq("user_id",id)
            : await supabaseClient.from("user_badges").upsert({
                user_id:id,badge:"premium",updated_at:new Date().toISOString(),updated_by:currentUser.id
              },{onConflict:"user_id"});
          if (result.error) throw result.error;
        }
        await renderAdminPage();
      } catch (error) {
        console.error("Admin action failed:", error);
        const feedback = $("admin-feedback");
        if (feedback) feedback.textContent = error.message || "Nie udało się wykonać działania.";
        button.disabled = false;
      }
    });
  });

  host.querySelectorAll("[data-admin-tab]").forEach(tab => tab.addEventListener("click", () => {
    host.querySelectorAll("[data-admin-tab]").forEach(item => item.classList.toggle("active", item === tab));
    host.querySelectorAll("[data-admin-panel]").forEach(panel => panel.classList.toggle("active", panel.dataset.adminPanel === tab.dataset.adminTab));
  }));
}


let appPageHistory = [];
let currentAppPage = "home";

async function openPage(page, options = {}) {
  if (isBanned) return;
  if (page !== "home" && !pages[page]) return;
  if (activeCommunityProfileClose) activeCommunityProfileClose();
  if (page !== "chat") await cleanupChatRealtime();
  if (page !== "groups") await cleanupGroupRealtime();
  if (!options.fromBack && page !== currentAppPage) appPageHistory.push(currentAppPage);
  currentAppPage = page;
  const backButton = $("app-back-button");
  if (backButton) backButton.hidden = page === "home" || appPageHistory.length === 0;
  const home = $("home-page");
  const other = $("other-page");

  if (page === "home") {
    home.classList.remove("hidden");
    renderHomeOverview().catch(error=>console.warn("Home overview load failed:",error));
    other.classList.add("hidden");
  } else {
    const selected = pages[page];

    if (!selected) return;

    home.classList.add("hidden");
    other.classList.remove("hidden");

    $("page-title").textContent = pageLabel(page,0,selected.title);
    $("page-subtitle").textContent = pageLabel(page,1,selected.subtitle);

    if (page === "admin") {
      if (!isAdmin) {
        $("page-content").innerHTML = '<div class="page-content"><h3>Brak dostępu</h3><p>Ta sekcja jest dostępna wyłącznie dla administratora.</p></div>';
      } else {
        await renderAdminPage();
      }
    } else if (page === "updates") {
      await renderUpdatesPage();
    } else if (page === "events") {
      await renderCommunityEventsPage();
    } else if (page === "announcements") {
      await renderCommunityAnnouncementsPage();
    } else if (page === "groups") {
      await renderCommunityGroupsPage();
    } else if (page === "polls") {
      await renderCommunityPollsPage();
    } else if (page === "favorites") {
      await renderCommunityFavoritesPage();
    } else if (page === "quests") {
      await renderCommunityDailyQuestsPage();
    } else if (page === "feed") {
      await renderCommunityFeedPage();
    } else if (page === "search") {
      renderCommunitySearchPage();
    } else if (page === "profiles") {
      $("page-content").innerHTML = '<div class="page-content"><p>Ładowanie profili...</p></div>';
      await loadPublicProfilesFromSupabase();
      await loadFriendsData();
      await loadBlockedUsers();
      await loadReports();
      await loadProfileSocialData([currentUser.id, ...publicProfilesCache.map(item => item.id)]);
      $("page-content").innerHTML = renderProfilesPage();
      bindProfilesPage();
    } else if (page === "my-profile") {
      await renderCommunityProfilePage();
    } else if (page === "questionnaire") {
      renderQuestionnairePage();
    } else if (page === "chat") {
      await renderChatList();
    } else if (page === "friends") {
      await renderFriendsPage();
    } else if (page === "notifications") {
      await renderNotificationsPage();
    } else if (page === "settings") {
      renderSettingsPage();
    } else if (page === "ideas") {
      await renderIdeasPage();
    } else if (page === "forum") {
      await renderCommunityForumPage();
    } else if (page === "timetable") {
      renderSchoolTimetablePage();
    } else if (page === "planner") {
      await renderCommunityPlannerPage();
    } else if (page === "cosmetics") {
      await renderCommunityCosmeticsPage();
    } else if (page === "ranking") {
      await renderRankingPage();
    } else if (page === "information") {
      renderInformationPage();
    } else {
      $("page-content").innerHTML = selected.content;
    }
  }

  document.querySelectorAll(".nav-item[data-page]").forEach(button => {
    const isCurrent = button.dataset.page === page;
    button.classList.toggle("active", isCurrent);
    if (isCurrent) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  const moreButton = $("more-nav-toggle");
  const morePages = ["profiles","my-profile","friends","forum","polls","updates","settings","admin"];
  const isMorePage = morePages.includes(page);
  if (moreButton) {
    moreButton.classList.toggle("active", isMorePage);
    if (isMorePage) moreButton.setAttribute("aria-current", "page");
    else moreButton.removeAttribute("aria-current");
  }
  document.querySelectorAll(".more-nav-link[data-page]").forEach(button => {
    if (button.dataset.page === page) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  const moreMenu = $("more-nav-menu");
  if (moreMenu) moreMenu.classList.add("hidden");
  if (moreButton) moreButton.setAttribute("aria-expanded","false");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}




// COMMUNITY SEARCH — searches public community profiles, forum posts and ideas.
const SEARCH_TEXT = {
  pl:{placeholder:"Wpisz nazwę osoby, temat lub słowo kluczowe...",button:"Szukaj",hint:"Wpisz co najmniej 2 znaki. Przeszukujemy publiczne profile, forum i pomysły.",loading:"Szukamy...",people:"Osoby",forum:"Forum",ideas:"Pomysły",empty:"Brak wyników. Spróbuj innego hasła.",error:"Nie udało się wykonać wyszukiwania. Spróbuj ponownie.",openProfile:"Otwórz profil",openSection:"Otwórz sekcję",min:"Wpisz co najmniej 2 znaki."},
  en:{placeholder:"Search a person, topic or keyword...",button:"Search",hint:"Enter at least 2 characters. We search public profiles, the forum and ideas.",loading:"Searching...",people:"People",forum:"Forum",ideas:"Ideas",empty:"No results. Try another search.",error:"Search failed. Please try again.",openProfile:"Open profile",openSection:"Open section",min:"Enter at least 2 characters."},
  ru:{placeholder:"Имя пользователя, тема или ключевое слово...",button:"Найти",hint:"Введите минимум 2 символа. Поиск по публичным профилям, форуму и идеям.",loading:"Ищем...",people:"Люди",forum:"Форум",ideas:"Идеи",empty:"Ничего не найдено. Попробуйте другой запрос.",error:"Не удалось выполнить поиск. Попробуйте ещё раз.",openProfile:"Открыть профиль",openSection:"Открыть раздел",min:"Введите минимум 2 символа."},
  uk:{placeholder:"Ім’я користувача, тема або ключове слово...",button:"Знайти",hint:"Введіть щонайменше 2 символи. Пошук у публічних профілях, форумі та ідеях.",loading:"Шукаємо...",people:"Люди",forum:"Форум",ideas:"Ідеї",empty:"Нічого не знайдено. Спробуйте інший запит.",error:"Не вдалося виконати пошук. Спробуйте ще раз.",openProfile:"Відкрити профіль",openSection:"Відкрити розділ",min:"Введіть щонайменше 2 символи."}
};
function searchText(key){return SEARCH_TEXT[appLanguage]?.[key]||SEARCH_TEXT.pl[key]||key;}

function renderCommunitySearchPage(){
  const host=$("page-content");
  host.innerHTML='<section class="community-search-panel"><form id="community-search-form" class="community-search-form"><label class="community-search-field"><span aria-hidden="true">⌕</span><input id="community-search-query" type="search" maxlength="80" autocomplete="off" placeholder="'+escapeHTML(searchText("placeholder"))+'" aria-label="'+escapeHTML(searchText("placeholder"))+'"></label><button class="main-btn" type="submit">'+escapeHTML(searchText("button"))+'</button></form><p class="community-search-hint">'+escapeHTML(searchText("hint"))+'</p><div id="community-search-results" aria-live="polite"></div></section>';
  const form=host.querySelector("#community-search-form");
  const input=host.querySelector("#community-search-query");
  const results=host.querySelector("#community-search-results");
  form.addEventListener("submit",async event=>{
    event.preventDefault();
    const query=input.value.trim().replace(/[%,_()]/g," ").slice(0,80);
    if(query.length<2){results.innerHTML='<p class="community-search-message">'+escapeHTML(searchText("min"))+'</p>';return;}
    const button=form.querySelector('button[type="submit"]');
    button.disabled=true;
    results.innerHTML='<p class="community-search-message">'+escapeHTML(searchText("loading"))+'</p>';
    try{
      const pattern="%"+query+"%";
      const [peopleResult,forumResult,ideasResult]=await Promise.all([
        supabaseClient.from("community_profiles").select("user_id,nickname,bio,class_name,avatar_path,avatar_decoration,banner_theme").ilike("nickname",pattern).limit(12),
        supabaseClient.from("community_forum_posts").select("id,author_id,title,body,created_at").or("title.ilike."+pattern+",body.ilike."+pattern).order("created_at",{ascending:false}).limit(12),
        supabaseClient.from("community_ideas").select("id,author_id,title,description,created_at").or("title.ilike."+pattern+",description.ilike."+pattern).order("created_at",{ascending:false}).limit(12)
      ]);
      const error=peopleResult.error||forumResult.error||ideasResult.error;
      if(error)throw error;
      const people=(peopleResult.data||[]).filter(p=>p.user_id!==currentUser.id&&!isBlocked(p.user_id));
      const forum=(forumResult.data||[]).filter(p=>!isBlocked(p.author_id));
      const ideas=(ideasResult.data||[]).filter(p=>!isBlocked(p.author_id));
      const authorIds=[...new Set([...forum,...ideas].map(x=>x.author_id).filter(Boolean))];
      let authors=new Map();
      if(authorIds.length){
        const authorResult=await supabaseClient.from("community_profiles").select("user_id,nickname").in("user_id",authorIds);
        if(authorResult.error)throw authorResult.error;
        authors=new Map((authorResult.data||[]).map(x=>[x.user_id,x.nickname]));
      }
      const section=(title,items,kind)=>items.length?'<section class="community-search-group"><h3>'+escapeHTML(title)+' <span>'+items.length+'</span></h3><div class="community-search-list">'+items.map(item=>{
        if(kind==="people")return '<button type="button" class="community-search-result community-search-person" data-search-user="'+escapeHTML(item.user_id)+'"><span class="community-search-avatar">'+escapeHTML((item.nickname||"U").slice(0,1).toUpperCase())+'</span><span class="community-search-copy"><strong>'+escapeHTML(item.nickname||"Uczeń")+'</strong><small>'+escapeHTML(item.class_name||"")+'</small></span><span class="community-search-arrow">›</span></button>';
        const excerpt=kind==="forum"?(item.body||""):(item.description||"");
        return '<article class="community-search-result"><span class="community-search-kind">'+escapeHTML(kind==="forum"?searchText("forum"):searchText("ideas"))+'</span><div class="community-search-copy"><strong>'+escapeHTML(item.title)+'</strong><small>'+escapeHTML(authors.get(item.author_id)||"")+'</small><p>'+escapeHTML(excerpt.slice(0,150))+'</p></div><button type="button" class="community-search-open" data-search-page="'+(kind==="forum"?"forum":"ideas")+'">'+escapeHTML(searchText("openSection"))+' ›</button></article>';
      }).join("")+'</div></section>':'';
      const markup=section(searchText("people"),people,"people")+section(searchText("forum"),forum,"forum")+section(searchText("ideas"),ideas,"ideas");
      results.innerHTML=markup||'<p class="community-search-message">'+escapeHTML(searchText("empty"))+'</p>';
      results.querySelectorAll("[data-search-user]").forEach(el=>el.addEventListener("click",()=>openCommunityProfile(el.dataset.searchUser)));
      results.querySelectorAll("[data-search-page]").forEach(el=>el.addEventListener("click",()=>openPage(el.dataset.searchPage)));
    }catch(error){
      console.error("Community search error:",error);
      results.innerHTML='<p class="community-search-message">'+escapeHTML(searchText("error"))+'</p>';
    }finally{button.disabled=false;}
  });
}

// COMMUNITY IDEAS, RANKING AND INFORMATION


const COMMUNITY_CARD_STYLES=[{id:"classic",name:"Klasyczny",desc:"Prosty i elegancki"},{id:"aurora",name:"Aurora",desc:"Kolorowy gradient"},{id:"neon",name:"Neon",desc:"Wyrazisty i nowoczesny"},{id:"minimal",name:"Minimal",desc:"Czysty i spokojny"}];
function communityCardStylePicker(selected="classic",inputId="community-card-style"){
 return '<fieldset class="community-style-picker"><legend>Wybierz wygląd karty</legend><div class="community-style-options">'+COMMUNITY_CARD_STYLES.map(style=>'<button type="button" class="community-style-option '+(selected===style.id?"active":"")+'" data-card-style-option="'+style.id+'" aria-pressed="'+(selected===style.id)+'"><span class="community-style-preview preview-'+style.id+'"><i></i><i></i><i></i></span><strong>'+style.name+'</strong><small>'+style.desc+'</small></button>').join("")+'</div><input type="hidden" id="'+inputId+'" value="'+selected+'"></fieldset>';
}
function bindCommunityCardStylePicker(root,inputId){
 const input=root.querySelector("#"+inputId);if(!input)return;
 root.querySelectorAll("[data-card-style-option]").forEach(button=>button.addEventListener("click",()=>{
  input.value=button.dataset.cardStyleOption;
  root.querySelectorAll("[data-card-style-option]").forEach(option=>{const active=option===button;option.classList.toggle("active",active);option.setAttribute("aria-pressed",String(active));});
 }));
}
function communityCardCover(style,kind){
 const labels={classic:"SPOŁECZNOŚĆ",aurora:"CREATIVE SPACE",neon:"IDEA LAB",minimal:"COMMUNITY"};
 return '<div class="community-card-cover cover-'+style+'"><span class="community-cover-symbol">'+(kind==="idea"?"✦":"✧")+'</span><span class="community-cover-label">'+labels[style]+'</span><span class="community-cover-orbit"></span></div>';
}
async function renderIdeasPage() {
 const host=$("page-content");host.innerHTML='<div class="page-content"><p>Ładowanie pomysłów...</p></div>';
 const [ideasResult,votesResult,profilesResult]=await Promise.all([
  supabaseClient.from("community_ideas").select("id,author_id,title,description,card_style,created_at").order("created_at",{ascending:false}).limit(100),
  supabaseClient.from("community_idea_votes").select("idea_id,user_id,vote"),
  supabaseClient.from("public_profiles").select("id,nickname")
 ]);
 const error=ideasResult.error||votesResult.error||profilesResult.error;
 if(error){host.innerHTML='<div class="page-content"><p>Nie udało się załadować pomysłów. Spróbuj ponownie później.</p></div>';console.error("Ideas load error:",error);return;}
 const names=new Map((profilesResult.data||[]).map(p=>[p.id,p.nickname])),votes=votesResult.data||[];
 await loadProfilesByIds((ideasResult.data||[]).map(idea=>idea.author_id));
 const voteByUser=new Map(votes.filter(v=>v.user_id===currentUser.id).map(v=>[v.idea_id,v.vote])),totals=new Map();
 votes.forEach(v=>{const item=totals.get(v.idea_id)||{up:0,down:0};if(v.vote===1)item.up++;else item.down++;totals.set(v.idea_id,item);});
 const cards=(ideasResult.data||[]).map(idea=>{
  const total=totals.get(idea.id)||{up:0,down:0},myVote=voteByUser.get(idea.id),own=idea.author_id===currentUser.id,style=COMMUNITY_CARD_STYLES.some(s=>s.id===idea.card_style)?idea.card_style:"classic";
  return '<article class="idea-card community-designed-card style-'+style+'">'+communityCardCover(style,"idea")+'<div class="community-designed-content"><div class="idea-card-head"><div><h3>'+escapeHTML(idea.title)+'</h3><button type="button" class="community-save-button" data-favorite-type="idea" data-favorite-id="'+idea.id+'">☆ Zapisz</button><div class="idea-author-meta">'+communityAuthorHTML(idea.author_id,names.get(idea.author_id)||"Uczeń")+'<small>'+escapeHTML(new Date(idea.created_at).toLocaleDateString("pl-PL"))+'</small></div></div>'+(own||isAdmin?'<button type="button" class="idea-delete" data-idea-delete="'+idea.id+'" aria-label="Usuń pomysł"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M5 7l1 14h12l1-14M9 7V4h6v3"/></svg></button>':"")+'</div><p>'+escapeHTML(idea.description).replace(/\n/g,"<br>")+'</p><div class="idea-votes"><button type="button" class="idea-vote up '+(myVote===1?"selected":"")+'" data-idea-vote="1" data-idea-id="'+idea.id+'" aria-label="Popieram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg> <span>'+total.up+'</span></button><button type="button" class="idea-vote down '+(myVote===-1?"selected":"")+'" data-idea-vote="-1" data-idea-id="'+idea.id+'" aria-label="Nie popieram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg> <span>'+total.down+'</span></button></div></div></article>';
 }).join("");
 host.innerHTML='<section class="ideas-intro ideas-intro-redesigned"><div class="ideas-intro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 22h4M8.5 14.5a6 6 0 1 1 7 0c-.8.6-1.2 1.3-1.3 2.5h-4.4c-.1-1.2-.5-1.9-1.3-2.5Z"/><path d="M12 2v2M4.9 4.9l1.4 1.4M19.1 4.9l-1.4 1.4"/></svg></div><div><strong>Masz pomysł na rozwój aplikacji?</strong><p>Podziel się propozycją. Społeczność może ją poprzeć lub odrzucić.</p></div><button type="button" class="community-create-button" id="open-idea-modal">＋ Dodaj pomysł</button></section><div class="ideas-list">'+(cards||'<div class="community-empty-state"><span>✦</span><strong>Jeszcze nie ma pomysłów</strong><small>Dodaj pierwszy pomysł i zainspiruj społeczność.</small></div>')+'</div><div class="community-create-backdrop" id="idea-modal" hidden><section class="community-create-dialog" role="dialog" aria-modal="true" aria-labelledby="idea-modal-title"><header class="community-dialog-header"><div><span class="community-dialog-eyebrow">ZSPM COMMUNITY · IDEAS</span><h3 id="idea-modal-title">Dodaj pomysł</h3><p>Opisz swoją propozycję i wybierz jej wygląd.</p></div><button type="button" class="community-dialog-close" id="close-idea-modal" aria-label="Zamknij">×</button></header><form class="community-create-form" id="idea-form"><label>Tytuł<input id="idea-title" maxlength="90" minlength="4" required placeholder="Np. Nowa funkcja czatu"></label><label>Opis<textarea id="idea-description" maxlength="1200" minlength="10" required rows="4" placeholder="Opisz, jak miałaby działać ta funkcja..."></textarea></label>'+communityCardStylePicker("classic","idea-card-style")+'<button type="submit" class="community-dialog-submit">Opublikuj pomysł</button><p class="idea-feedback" id="idea-feedback" aria-live="polite"></p></form></section></div>';
 const modal=host.querySelector("#idea-modal"),form=host.querySelector("#idea-form");
 const close=()=>{modal.hidden=true;form.reset();host.querySelector("#idea-card-style").value="classic";host.querySelectorAll("[data-card-style-option]").forEach(b=>{const active=b.dataset.cardStyleOption==="classic";b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));});document.removeEventListener("keydown",onKey);};
 const onKey=e=>{if(e.key==="Escape"&&!modal.hidden)close();};
 host.querySelector("#open-idea-modal").addEventListener("click",()=>{modal.hidden=false;document.addEventListener("keydown",onKey);});
 host.querySelector("#close-idea-modal").addEventListener("click",close);modal.addEventListener("click",e=>{if(e.target===modal)close();});bindCommunityCardStylePicker(host,"idea-card-style");
 form.addEventListener("submit",async event=>{event.preventDefault();const button=form.querySelector('button[type="submit"]');button.disabled=true;const {error}=await supabaseClient.from("community_ideas").insert({author_id:currentUser.id,title:host.querySelector("#idea-title").value.trim(),description:host.querySelector("#idea-description").value.trim(),card_style:host.querySelector("#idea-card-style").value});if(error){host.querySelector("#idea-feedback").textContent=error.message||"Nie udało się opublikować pomysłu.";button.disabled=false;return;}close();await renderIdeasPage();});
 host.querySelectorAll("[data-idea-vote]").forEach(button=>button.addEventListener("click",async()=>{button.disabled=true;const ideaId=button.dataset.ideaId,value=Number(button.dataset.ideaVote),existing=voteByUser.get(ideaId);let result;if(existing===value)result=await supabaseClient.from("community_idea_votes").delete().eq("idea_id",ideaId).eq("user_id",currentUser.id);else result=await supabaseClient.from("community_idea_votes").upsert({idea_id:ideaId,user_id:currentUser.id,vote:value,updated_at:new Date().toISOString()},{onConflict:"idea_id,user_id"});if(result.error){button.disabled=false;alert(result.error.message||"Nie udało się zapisać głosu.");return;}await renderIdeasPage();}));
 host.querySelectorAll("[data-idea-delete]").forEach(button=>button.addEventListener("click",async()=>{if(!confirm("Czy na pewno chcesz usunąć ten pomysł?"))return;button.disabled=true;const {error}=await supabaseClient.from("community_ideas").delete().eq("id",button.dataset.ideaDelete);if(error){button.disabled=false;alert(error.message||"Nie udało się usunąć pomysłu.");return;}await renderIdeasPage();}));
}

function formatActiveTime(seconds) {
  const hours = Math.floor(Number(seconds || 0) / 3600);
  const minutes = Math.floor((Number(seconds || 0) % 3600) / 60);
  return hours ? hours + " godz. " + minutes + " min" : minutes + " min";
}

async function renderRankingPage() {
  const host = $("page-content");
  host.innerHTML = '<div class="page-content"><p>Ładowanie rankingów...</p></div>';
  const [profilesResult, donationsResult, activityResult, likesResult] = await Promise.all([
    supabaseClient.from("public_profiles").select("id,nickname"),
    supabaseClient.from("donation_ranking").select("user_id,amount").order("amount",{ascending:false}).limit(100),
    supabaseClient.from("user_activity").select("user_id,active_seconds").order("active_seconds",{ascending:false}).limit(100),
    supabaseClient.from("profile_likes").select("profile_id")
  ]);
  const error = profilesResult.error || donationsResult.error || activityResult.error || likesResult.error;
  if (error) {
    host.innerHTML = '<div class="page-content"><p>Nie udało się załadować rankingów.</p></div>';
    console.error("Ranking load error:", error);
    return;
  }
  const names = new Map((profilesResult.data || []).map(p => [p.id,p.nickname]));
  const likes = new Map();
  (likesResult.data || []).forEach(row => likes.set(row.profile_id,(likes.get(row.profile_id)||0)+1));
  const donationRows = (donationsResult.data || []).filter(r => names.has(r.user_id));
  const activityRows = (activityResult.data || []).filter(r => names.has(r.user_id));
  const likeRows = [...likes.entries()].map(([user_id,count]) => ({user_id,count})).filter(r => names.has(r.user_id)).sort((a,b)=>b.count-a.count);
  const rowsHtml = (rows, valueFn) => rows.length ? rows.slice(0,50).map((row,index) =>
    '<div class="ranking-row"><span class="ranking-place ' + (index<3?'top-'+(index+1):'') + '">' + (index+1) +
    '</span><strong>' + escapeHTML(names.get(row.user_id) || "Uczeń") + '</strong><span class="ranking-value">' +
    valueFn(row) + '</span></div>').join("") : '<div class="page-content"><p>Ranking jest jeszcze pusty.</p></div>';
  host.innerHTML = '<div class="ranking-tabs" role="tablist"><button type="button" class="active" data-ranking-tab="online">🕒 Online</button><button type="button" data-ranking-tab="donations">💙 Donaty</button><button type="button" data-ranking-tab="likes">❤️ Polubienia</button></div>' +
    '<section class="ranking-panel" data-ranking-panel="online"><h3>TOP aktywności</h3><p class="muted">Łączny szacowany czas aktywności w aplikacji.</p>' + rowsHtml(activityRows,(r)=>formatActiveTime(r.active_seconds)) + '</section>' +
    '<section class="ranking-panel hidden" data-ranking-panel="donations"><h3>TOP wspierających</h3><p class="muted">Kwoty są aktualizowane ręcznie przez administratora.</p>' + rowsHtml(donationRows,(r)=>Number(r.amount).toFixed(2).replace(".",",")+" zł") + '</section>' +
    '<section class="ranking-panel hidden" data-ranking-panel="likes"><h3>TOP polubień profili</h3><p class="muted">Liczba polubień otrzymanych przez profil.</p>' + rowsHtml(likeRows,(r)=>r.count+" ❤️") + '</section>';
  host.querySelectorAll("[data-ranking-tab]").forEach(button => button.addEventListener("click", () => {
    const tab = button.dataset.rankingTab;
    host.querySelectorAll("[data-ranking-tab]").forEach(item=>item.classList.toggle("active",item===button));
    host.querySelectorAll("[data-ranking-panel]").forEach(panel=>panel.classList.toggle("hidden",panel.dataset.rankingPanel!==tab));
  }));
}

function renderInformationPage() {
  $("page-content").innerHTML = '<div class="information-list">' +
    '<section class="information-card"><div class="information-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7" r="3"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="M10 9.5 6.5 15.5M14 9.5l3.5 6M7.5 18h9"/></svg></div><h3>Czym jest ZSPM Community?</h3><p>To niezależna społeczność internetowa, która umożliwia użytkownikom tworzenie profili, poznawanie innych osób, rozmowy, dzielenie się pomysłami i wspieranie rozwoju projektu.</p></section>' +
    '<section class="information-card"><div class="information-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/></svg></div><h3>Jak zdobyć status PREMIUM?</h3><p>Status PREMIUM jest specjalnym wyróżnieniem w aplikacji. Może zostać przyznany przez administratora. Jeśli chcesz dowiedzieć się więcej o dostępności i zasadach jego przyznawania, skontaktuj się z administratorem.</p></section>' +
    '<section class="information-card"><div class="information-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4h11v16H5V7l3-3Z"/><path d="M8 4v4H5M9 12h7M9 16h7"/></svg></div><h3>Zasady społeczności</h3><p>Szanuj innych użytkowników, nie publikuj cudzych danych prywatnych, nie nękaj innych i nie wysyłaj spamu. Zgłaszaj treści naruszające zasady.</p></section>' +
    '<section class="information-card"><div class="information-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m10.3 4.3-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-2.7l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg></div><h3>Ważne zastrzeżenie</h3><p>ZSPM Community jest projektem niezależnym, nieoficjalnym i nie jest w żaden sposób powiązany ze szkołą Poligraficzno-Medialną nr 20 w Krakowie ani przez nią sponsorowany, zatwierdzony czy prowadzony. Nazwa szkoły służy wyłącznie do określenia społeczności, do której kierowany jest projekt.</p></section>' +
    '<section class="information-card"><div class="information-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></svg></div><h3>Prywatność i bezpieczeństwo</h3><p>Nie udostępniaj haseł, kodów logowania ani prywatnych danych. Korzystaj z funkcji blokowania i zgłaszania, jeśli ktoś zachowuje się niewłaściwie.</p></section>' +
    '<p class="information-footnote">ZSPM Community · Niezależny projekt społecznościowy</p></div>';
}

// PROFILE UCZNIÓW

const DEFAULT_PRIVACY = {
  visible: true,
  showClass: true,
  showInterests: true
};

function getUserProfiles() {
  try {
    const data = localStorage.getItem(PROFILES_KEY);
    const parsed = data ? JSON.parse(data) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    return {};
  }
}

function saveUserProfiles(profiles) {
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  } catch (error) {
    console.warn("Local profile cache unavailable:", error);
  }
}

function getMyProfile() {
  if (!currentUser) return null;
  if (myProfileCache) return myProfileCache;
  const profiles = getUserProfiles();
  return profiles[currentUser.email] || null;
}

async function mapDatabaseProfile(row) {
  if (!row) return null;
  let photoUrl = "";
  if (row.photo_path) {
    const { data, error } = await supabaseClient.storage
      .from("profile-photos")
      .createSignedUrl(row.photo_path, 604800);
    if (error) console.warn("Profile photo URL error:", error);
    else photoUrl = data?.signedUrl || "";
  }
  return {
    id: row.id,
    nickname: row.nickname || currentUser?.name || "Uczeń",
    klasa: row.class_name || "",
    bio: row.bio || "",
    interests: Array.isArray(row.interests) ? row.interests : [],
    photo: photoUrl,
    photoPath: row.photo_path || "",
    privacy: {
      visible: row.is_visible !== false,
      showClass: row.show_class !== false,
      showInterests: row.show_interests !== false
    }
  };
}

async function loadMyProfileFromSupabase() {
  if (!supabaseClient || !currentUser?.id) return null;
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("id,nickname,class_name,bio,interests,photo_path,is_visible,show_class,show_interests")
    .eq("id", currentUser.id)
    .maybeSingle();

  if (error) {
    console.error("Profile load error:", error);
    return null;
  }

  myProfileCache = await mapDatabaseProfile(data);
  if (myProfileCache) {
    myProfileCache.isAdmin = isAdmin;
    myProfileCache.badge = isAdmin ? "admin" : currentUserBadge;

    const profiles = getUserProfiles();
    profiles[currentUser.email] = myProfileCache;
    saveUserProfiles(profiles);
    $("user-name").innerHTML = escapeHTML(myProfileCache.nickname) + "!" +
      (isAdmin ? ' <span class="user-role-badge admin-role">ADMIN</span>' :
        currentUserBadge === "premium" ? ' <span class="user-role-badge premium-role">PREMIUM</span>' : "");
  }
  return myProfileCache;
}

async function saveMyProfile(profile) {
  if (!currentUser?.id || !supabaseClient) {
    throw new Error("Zaloguj się ponownie, aby zapisać profil.");
  }

  const previous = getMyProfile();
  const oldPhotoPath = previous?.photoPath || null;
  let photoPath = profile.photoPath || oldPhotoPath;

  if (profile.photo && profile.photo.startsWith("data:image/")) {
    const response = await fetch(profile.photo);
    const blob = await response.blob();
    const newPath = currentUser.id + "/" + Date.now() + ".jpg";
    const { error: uploadError } = await supabaseClient.storage
      .from("profile-photos")
      .upload(newPath, blob, {
        contentType: "image/jpeg",
        cacheControl: "3600",
        upsert: true
      });
    if (uploadError) throw uploadError;
    photoPath = newPath;
  } else if (!profile.photo) {
    photoPath = null;
  }

  const row = {
    id: currentUser.id,
    nickname: profile.nickname,
    class_name: profile.klasa || null,
    bio: profile.bio || "",
    interests: Array.isArray(profile.interests) ? profile.interests : [],
    photo_path: photoPath,
    is_visible: profile.privacy?.visible !== false,
    show_class: profile.privacy?.showClass !== false,
    show_interests: profile.privacy?.showInterests !== false
  };

  const { data, error } = await supabaseClient
    .from("profiles")
    .upsert(row, { onConflict: "id" })
    .select("id,nickname,class_name,bio,interests,photo_path,is_visible,show_class,show_interests")
    .single();

  if (error?.code === "23505") {
    throw new Error("Ten pseudonim jest już zajęty. Wybierz inną nazwę.");
  }
  if (error) throw error;

  if (oldPhotoPath && oldPhotoPath !== photoPath) {
    const { error: removeError } = await supabaseClient.storage
      .from("profile-photos")
      .remove([oldPhotoPath]);
    if (removeError) console.warn("Old profile photo cleanup failed:", removeError);
  }

  myProfileCache = await mapDatabaseProfile(data);
  const profiles = getUserProfiles();
  profiles[currentUser.email] = myProfileCache;
  saveUserProfiles(profiles);
  return myProfileCache;
}

async function loadPublicProfilesFromSupabase() {
  if (!supabaseClient) return [];
  const { data, error } = await supabaseClient
    .from("public_profiles")
    .select("id,nickname,class_name,bio,photo_path,interests,is_visible,show_class,show_interests")
    .eq("is_visible", true)
    .order("nickname", { ascending: true });

  if (error) {
    console.error("Public profiles load error:", error);
    return [];
  }

  const visibleRows = (data || []).filter(row => row.id !== currentUser?.id);
  const ids = visibleRows.map(row => row.id);
  const adminIds = await loadAdminFlagsByIds(ids);
  let badgeMap = new Map();
  if (ids.length) {
    const { data: badges, error: badgeError } = await supabaseClient
      .from("user_badges").select("user_id,badge").in("user_id", ids);
    if (badgeError) console.warn("Profile badges load error:", badgeError);
    (badges || []).forEach(row => badgeMap.set(row.user_id, row.badge));
  }
  publicProfilesCache = (await Promise.all(visibleRows.map(async row => {
    const profile = await mapDatabaseProfile(row);
    if (profile) {
      profile.isAdmin = adminIds.has(row.id);
      profile.badge = profile.isAdmin ? "admin" : (badgeMap.get(row.id) || null);
    }
    return profile;
  }))).filter(Boolean);
  return publicProfilesCache;
}

function getReports() {
  return reportsCache;
}

async function loadReports() {
  if (!currentUser?.id) return [];
  const { data, error } = await supabaseClient.from("content_reports")
    .select("target_type,target_id")
    .eq("reporter_id", currentUser.id);
  if (error) {
    console.error("Reports load error:", error);
    return reportsCache;
  }
  reportsCache = (data || []).filter(item => item.target_type === "profile").map(item => item.target_id);
  reportedMessageIdsCache = (data || []).filter(item => item.target_type === "message").map(item => item.target_id);
  return reportsCache;
}

function getProfileSocialData() {
  return profileSocialCache;
}

async function loadProfileSocialData(profileIds) {
  profileSocialCache = {};
  const ids = [...new Set((profileIds || []).filter(Boolean))];
  if (!ids.length || !supabaseClient) return profileSocialCache;

  const [likesResult, commentsResult] = await Promise.all([
    supabaseClient.from("profile_likes")
      .select("profile_id,user_id")
      .in("profile_id", ids),
    supabaseClient.from("profile_comments")
      .select("id,profile_id,author_id,content,created_at")
      .in("profile_id", ids)
      .order("created_at", { ascending: true })
  ]);

  if (likesResult.error) console.error("Profile likes load error:", likesResult.error);
  if (commentsResult.error) console.error("Profile comments load error:", commentsResult.error);

  const comments = commentsResult.data || [];
  const authorIds = [...new Set(comments.map(item => item.author_id).filter(Boolean))];
  await loadProfilesByIds(authorIds);
  let authorMap = new Map();
  if (authorIds.length) {
    const { data, error } = await supabaseClient.from("public_profiles")
      .select("id,nickname")
      .in("id", authorIds);
    if (error) console.error("Comment authors load error:", error);
    (data || []).forEach(item => authorMap.set(item.id, item.nickname));
  }

  ids.forEach(id => {
    const likes = (likesResult.data || []).filter(item => item.profile_id === id);
    const profileComments = comments.filter(item => item.profile_id === id);
    profileSocialCache[id] = {
      liked: likes.some(item => item.user_id === currentUser?.id),
      likes: likes.length,
      comments: profileComments.map(item => ({
        id: item.id,
        author_id: item.author_id,
        author: authorMap.get(item.author_id) || "Uczeń",
        text: item.content,
        time: new Date(item.created_at).getTime()
      }))
    };
  });
  return profileSocialCache;
}

function profileSocialHTML(profile) {
  const item = profileSocialCache[profile.id] || { liked: false, likes: 0, comments: [] };
  const liked = item.liked === true;
  const likes = Math.max(0, Number(item.likes) || 0);
  const comments = Array.isArray(item.comments) ? item.comments : [];
  const own = profile.id === currentUser?.id;
  const commentsHTML = comments.map((comment, index) =>
    '<div class="profile-comment' + (index >= 2 ? ' profile-comment-extra"' : '') + '">' +
    communityAuthorHTML(comment.author_id,comment.author || "Uczeń") +
    '<span>' + escapeHTML(comment.text || "") + '</span></div>'
  ).join("");
  const commentsToggle = comments.length > 2
    ? '<button type="button" class="profile-comments-toggle" data-action="toggle-comments" aria-expanded="true">Mniej</button>'
    : "";

  return '<div class="profile-social">' +
    '<div class="profile-social-actions">' +
    (own ? '<span class="profile-own-likes" aria-label="Liczba polubień">♥ <span>' + likes + '</span> polubień</span>' : '<button type="button" class="social-like' + (liked ? ' liked' : '') +
    '" data-action="toggle-like" data-profile-id="' + escapeHTML(profile.id) +
    '" aria-pressed="' + (liked ? 'true' : 'false') + '">' +
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"/></svg>' +
    (liked ? 'Lubisz' : 'Lubię to') + ' <span>' + likes + '</span></button>') +
    '<span class="profile-comment-count">' + comments.length + ' komentarzy</span></div>' +
    '<div class="profile-comments expanded">' +
    (commentsHTML || '<p class="no-comments">Jeszcze nie ma komentarzy.</p>') +
    '</div>' + commentsToggle +
    '<form class="profile-comment-form" data-profile-id="' +
    escapeHTML(profile.id) + '">' +
    '<input type="text" name="comment" maxlength="240" placeholder="Napisz komentarz..." aria-label="Napisz komentarz" required>' +
    '<button type="submit">Dodaj</button></form></div>';
}

function renderInterests(p, privacy) {
  if (!p.interests || !p.interests.length) return "";
  if (privacy && privacy.showInterests === false) return "";
  const tags = p.interests
    .map(item => `<span class="interest-tag">${escapeHTML(item)}</span>`)
    .join("");
  return `<div class="profile-interests">${tags}</div>`;
}

function profileAvatarHTML(profile, className = "profile-avatar") {
  const photo = typeof profile.photo === "string" &&
    (/^data:image\/(jpeg|png|webp);base64,/i.test(profile.photo) ||
     /^https:\/\//i.test(profile.photo))
    ? profile.photo : "";
  const userId = profile?.id || profile?.user_id || "";
  const openAttrs = userId ? ' data-open-community-profile="' + escapeHTML(userId) + '" role="button" tabindex="0" aria-label="Otwórz profil użytkownika"' : "";
  return photo
    ? `<div class="${className} has-photo community-avatar-clickable"${openAttrs}><img src="${escapeHTML(photo)}" alt="Zdjęcie profilu"></div>`
    : `<div class="${className} profile-avatar-placeholder community-avatar-clickable" aria-label="Brak zdjęcia"${openAttrs}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg></div>`;
}


function communityAuthorHTML(userId, fallbackNickname = "Uczeń") {
  const profile = userId === currentUser?.id ? (myProfileCache || getProfileById(userId)) : getProfileById(userId);
  const nickname = profile?.nickname || fallbackNickname || "Uczeń";
  const id = userId ? escapeHTML(userId) : "";
  const avatar = userId
    ? profileAvatarHTML({id:userId,nickname,photo:profile?.photo||""},"community-author-avatar")
    : '<span class="community-author-avatar profile-avatar-placeholder" aria-hidden="true">👤</span>';
  const online = Boolean(userId && onlineUsers.has(userId));
  return '<div class="community-author-row">' + avatar +
    (userId ? '<span class="community-author-presence '+(online?'is-online':'is-offline')+'" data-author-presence-user="'+id+'" aria-label="'+(online?'Online':'Offline')+'" title="'+(online?'Online':'Offline')+'"></span>' : '') +
    '<button type="button" class="community-author-name" '+(userId?'data-open-community-profile="'+id+'"':'disabled')+'>'+escapeHTML(nickname)+'</button></div>';
}

function profileCardHTML(profile, own) {
  const privacy = own ? (profile.privacy || DEFAULT_PRIVACY) : null;
  const klasa = (!privacy || privacy.showClass !== false)
    ? `<div class="profile-klasa">Klasa ${escapeHTML(profile.klasa)}</div>`
    : "";

  const roleBadge = profile.isAdmin || (profile.id === currentUser?.id && isAdmin)
    ? '<span class="user-role-badge admin-role">ADMIN</span>'
    : profile.badge === "premium"
      ? '<span class="user-role-badge premium-role">PREMIUM</span>' : "";
  const badge = (own ? `<span class="you-badge">Twój profil</span>` : "") + roleBadge;

  const action = own
    ? `<button class="report-btn" data-action="edit-profile">Edytuj ankietę</button>`
    : `<button class="report-btn" data-action="report" data-profile-id="${escapeHTML(profile.id)}">Zgłoś profil</button>`;

  const friendAction = own ? "" : friendButtonHTML(profile);

  return `
    <div class="profile-card${own ? " own" : ""}">
      <div class="profile-head">
        ${profileAvatarHTML(profile)}
        <div>
          <div class="profile-nick">${escapeHTML(profile.nickname)}${badge}</div>
          ${klasa}
        </div>
      </div>
      <div class="profile-bio">${escapeHTML(profile.bio)}</div>
      ${renderInterests(profile, privacy)}
      ${profileSocialHTML(profile)}
      <div class="btn-row">
        ${friendAction}
        ${action}
      </div>
    </div>
  `;
}

function renderProfilesPage() {
  const reports = getReports();
  const myProfile = getMyProfile();
  const profiles = publicProfilesCache.filter(profile => profile.id !== currentUser?.id && profile.privacy?.visible !== false);
  if (myProfile && currentUser?.id) profiles.push({ ...myProfile, id: currentUser.id, isAdmin: Boolean(myProfile.isAdmin || isAdmin) });
  // Pin only the account verified as admin by Supabase, never by nickname.
  profiles.sort((a, b) => Number(Boolean(b.isAdmin)) - Number(Boolean(a.isAdmin)));
  const cards = profiles.map(profile => {
    const own = profile.id === currentUser?.id;
    const reported = reports.includes(profile.id);
    let card = profileCardHTML(profile, own);
    if (!own) {
      const reportButton = '<button class="report-btn" data-action="report" data-profile-id="' + profile.id + '">Zgłoś profil</button>';
      const replacementButton = reported ? '<button class="report-btn" disabled>Zgłoszono profil</button>' : reportButton;
      card = card.replace(reportButton, replacementButton);
    }
    return card;
  });
  return `
    <div class="profiles-page-header">
      <div class="page-content">
        <h3>Poznaj nowych ludzi</h3>
        <p>Przeglądaj profile uczniów, odkrywaj wspólne zainteresowania i wysyłaj zaproszenia do znajomych.</p>
      </div>
      <button type="button" class="main-btn create-profile-btn" data-action="create-profile">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
        Utwórz ankietę
      </button>
      <p class="section-sub">Polubienia i komentarze są widoczne dla użytkowników, którzy mogą zobaczyć daną ankietę.</p>
    </div>
    <div class="profile-grid">${cards.join("")}</div>
  `;
}
function bindProfilesPage() {
  const container = $("page-content");

  const rerenderProfiles = async () => {
    await loadFriendsData();
    await loadProfileSocialData([currentUser?.id, ...publicProfilesCache.map(item => item.id)]);
    $("page-content").innerHTML = renderProfilesPage();
    bindProfilesPage();
    updateNotifBadge();
  };

  container.querySelectorAll("[data-action='create-profile'], [data-action='edit-profile']").forEach(button => {
    button.addEventListener("click", () => openPage("questionnaire"));
  });

  container.querySelectorAll("[data-action='add-friend']").forEach(button => {
    button.addEventListener("click", async () => {
      const error = await sendFriendInvite(button.dataset.personId);
      if (error) alert(error);
      await rerenderProfiles();
    });
  });

  container.querySelectorAll("[data-action='cancel-invite']").forEach(button => {
    button.addEventListener("click", async () => {
      await cancelFriendInvite(button.dataset.requestId);
      await rerenderProfiles();
    });
  });

  container.querySelectorAll("[data-action='accept-invite']").forEach(button => {
    button.addEventListener("click", async () => {
      await acceptFriendInvite(button.dataset.requestId);
      await rerenderProfiles();
    });
  });

  container.querySelectorAll("[data-action='unblock']").forEach(button => {
    button.addEventListener("click", async () => {
      await unblockUser(button.dataset.personId);
      await rerenderProfiles();
    });
  });

  container.querySelectorAll("[data-action='block-person']").forEach(button => {
    button.addEventListener("click", async () => {
      await blockUser(button.dataset.personId);
      await rerenderProfiles();
    });
  });

  container.querySelectorAll("[data-action='toggle-like']").forEach(button => {
    button.addEventListener("click", async () => {
      const profileId = button.dataset.profileId;
      const current = profileSocialCache[profileId] || { liked: false };
      let result;
      if (current.liked) {
        result = await supabaseClient.from("profile_likes")
          .delete().eq("profile_id", profileId).eq("user_id", currentUser.id);
      } else {
        result = await supabaseClient.from("profile_likes")
          .insert({ profile_id: profileId, user_id: currentUser.id });
      }
      if (result.error) {
        console.error("Like update error:", result.error);
        alert("Nie udało się zaktualizować polubienia.");
        return;
      }
      await rerenderProfiles();
    });
  });

  container.querySelectorAll("[data-action='toggle-comments']").forEach(button => {
    button.addEventListener("click", () => {
      const social = button.closest(".profile-social");
      const comments = social && social.querySelector(".profile-comments");
      if (!comments) return;
      const expanded = button.getAttribute("aria-expanded") !== "true";
      comments.querySelectorAll(".profile-comment-extra").forEach(comment => {
        comment.hidden = !expanded;
      });
      comments.classList.toggle("expanded", expanded);
      button.textContent = expanded ? "Mniej" : "Więcej";
      button.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  });

  container.querySelectorAll(".profile-comment-form").forEach(form => {
    form.addEventListener("submit", async event => {
      event.preventDefault();
      const input = form.querySelector("input[name='comment']");
      const value = input.value.trim().slice(0, 240);
      const profileId = form.dataset.profileId;
      if (!value || !profileId) return;
      const existing = profileSocialCache[profileId]?.comments || [];
      if (existing.length >= 50) {
        alert("Osiągnięto limit komentarzy dla tej ankiety.");
        return;
      }
      const { error } = await supabaseClient.from("profile_comments").insert({
        profile_id: profileId,
        author_id: currentUser.id,
        content: value
      });
      if (error) {
        console.error("Comment save error:", error);
        alert("Nie udało się dodać komentarza.");
        return;
      }
      await rerenderProfiles();
    });
  });

  container.querySelectorAll("[data-action='report']").forEach(button => {
    button.addEventListener("click", async () => {
      const profileId = button.dataset.profileId;
      const { error } = await supabaseClient.from("content_reports").insert({
        reporter_id: currentUser.id,
        reported_user_id: profileId,
        target_type: "profile",
        target_id: profileId
      });
      if (error) {
        console.error("Profile report error:", error);
        alert("Nie udało się wysłać zgłoszenia.");
        return;
      }
      reportsCache.push(profileId);
      button.disabled = true;
      button.textContent = "Zgłoszono profil";
    });
  });
}


// MÓJ PROFIL

function renderQuestionnairePage() {
  const myProfile = getMyProfile();
  const photo = myProfile?.photo || "";
  const nickname = myProfile?.nickname || currentUser.name;
  const klasa = myProfile?.klasa || "";
  const bio = myProfile?.bio || "";
  const interests = myProfile?.interests ? myProfile.interests.join(", ") : "";

  $("page-content").innerHTML = `
    <div id="my-profile-message" class="message"></div>

    <form id="my-profile-form">
      <div class="page-content">
        <h3>Edytuj ankietę</h3><p class="section-sub">Ankieta jest niezależna od Twojego publicznego profilu społeczności.</p>

        <div class="field">
          <label>Pseudonim</label>
          <input id="my-nick" type="text" maxlength="25"
            placeholder="Twój pseudonim" value="${escapeHTML(nickname)}" required>
        </div>

        <div class="field">
          <label>Klasa</label>
          <input id="my-klasa" type="text" maxlength="6"
            placeholder="np. 2B" value="${escapeHTML(klasa)}" required>
        </div>

        <div class="field">
          <label>Zdjęcie profilowe</label>
          <div class="profile-photo-editor">
            <div id="my-photo-preview" class="profile-photo-preview">${photo ? `<img src="${escapeHTML(photo)}" alt="Podgląd zdjęcia">` : `<span>Bez zdjęcia</span>`}</div>
            <div class="profile-photo-controls">
              <input id="my-photo" type="file" accept="image/jpeg,image/png,image/webp">
              <p class="section-sub">JPG, PNG lub WebP. Maksymalny rozmiar pliku: 5 MB.</p>
              <button type="button" id="remove-my-photo" class="pill-btn"${photo ? "" : " disabled"}>Usuń zdjęcie</button>
            </div>
          </div>
        </div>

        <div class="field">
          <label>Krótki opis</label>
          <textarea id="my-bio" maxlength="200"
            placeholder="Napisz w kilku zdaniach, czym się interesujesz...">${escapeHTML(bio)}</textarea>
        </div>

        <div class="field">
          <label>Zainteresowania (oddzielone przecinkami)</label>
          <input id="my-interests" type="text" maxlength="120"
            placeholder="np. sport, muzyka, gry" value="${escapeHTML(interests)}">
        </div>

        <button class="main-btn" type="submit">Zapisz ankietę</button>
      </div>
    </form>
  `;

  bindQuestionnairePage();
}

function compressProfilePhoto(file) {
  return new Promise((resolve, reject) => {
    if (!file || !/^image\/(jpeg|png|webp)$/i.test(file.type)) {
      reject(new Error("Wybierz zdjęcie w formacie JPG, PNG lub WebP."));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error("Plik jest za duży. Maksymalny rozmiar to 5 MB."));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Nie udało się odczytać zdjęcia."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Nie udało się otworzyć zdjęcia."));
      image.onload = () => {
        const pixelCount = image.width * image.height;
        if (!image.width || !image.height || pixelCount > 40000000) {
          reject(new Error("Zdjęcie ma zbyt dużą rozdzielczość. Wybierz obraz do 40 megapikseli."));
          return;
        }
        const maxSide = 512;
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("Nie udało się przygotować zdjęcia."));
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        try {
          resolve(canvas.toDataURL("image/jpeg", 0.78));
        } catch (error) {
          reject(new Error("Nie udało się przetworzyć zdjęcia."));
        }
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function bindQuestionnairePage() {
  const existing = getMyProfile();
  let selectedPhoto = existing?.photo || "";
  const photoInput = $("my-photo");
  const photoPreview = $("my-photo-preview");
  const removePhotoButton = $("remove-my-photo");

  const updatePhotoPreview = () => {
    photoPreview.innerHTML = selectedPhoto
      ? `<img src="${escapeHTML(selectedPhoto)}" alt="Podgląd zdjęcia">`
      : "<span>Bez zdjęcia</span>";
    removePhotoButton.disabled = !selectedPhoto;
  };

  photoInput.addEventListener("change", async () => {
    const file = photoInput.files && photoInput.files[0];
    if (!file) return;
    try {
      selectedPhoto = await compressProfilePhoto(file);
      updatePhotoPreview();
      clearMessage("my-profile-message");
    } catch (error) {
      photoInput.value = "";
      showMessage("my-profile-message", error.message || "Nie udało się dodać zdjęcia.");
    }
  });

  removePhotoButton.addEventListener("click", () => {
    selectedPhoto = "";
    photoInput.value = "";
    updatePhotoPreview();
  });

  $("my-profile-form").addEventListener("submit", async event => {
    event.preventDefault();

    const nickname = $("my-nick").value.trim();
    const klasa = $("my-klasa").value.trim();
    const bio = $("my-bio").value.trim();
    const interests = $("my-interests").value
      .split(",")
      .map(item => item.trim())
      .filter(Boolean)
      .slice(0, 6);

    if (nickname.length < 2) {
      showMessage("my-profile-message", "Pseudonim musi mieć co najmniej 2 znaki.");
      return;
    }

    if (!klasa) {
      showMessage("my-profile-message", "Podaj swoją klasę, np. 2B.");
      return;
    }

    const existing = getMyProfile();

    const submitButton = $("my-profile-form").querySelector("button[type=submit]");
    submitButton.disabled = true;
    submitButton.textContent = "Zapisywanie...";
    try {
      const saved = await saveMyProfile({
        nickname,
        klasa,
        bio,
        interests,
        photo: selectedPhoto,
        photoPath: existing?.photoPath || null,
        privacy: existing?.privacy || { ...DEFAULT_PRIVACY }
      });
      selectedPhoto = saved?.photo || "";
      $("user-name").textContent = nickname;
      showMessage("my-profile-message", "Profil został zapisany w bazie danych.", "success");
    } catch (error) {
      console.error("Profile save error:", error);
      showMessage("my-profile-message", error.message || "Nie udało się zapisać profilu.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Zapisz ankietę";
    }
  });
}



const PUSH_VAPID_PUBLIC_KEY = "BF3WtS7KovwgrIq3dWQBkpjkQeSU46gL5Y_Fj9ksAWqBjXq590cdOBuLNZllMtGjCOcjIiBiG-PPPGneVYfNGaM";

function pushBase64ToUint8Array(value) {
  const padding = "=".repeat((4 - value.length % 4) % 4);
  const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  return Uint8Array.from(raw, char => char.charCodeAt(0));
}

async function enablePhonePush() {
  if (!currentUser || !supabaseClient) throw new Error("Zaloguj się, aby włączyć powiadomienia.");
  if (!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) {
    throw new Error("Ta przeglądarka nie obsługuje powiadomień push.");
  }
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error(permission === "denied"
      ? "Powiadomienia są zablokowane. Włącz je w ustawieniach aplikacji Android."
      : "Nie przyznano zgody na powiadomienia.");
  }
  const registration = await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: pushBase64ToUint8Array(PUSH_VAPID_PUBLIC_KEY)
    });
  }
  const value = subscription.toJSON();
  if (!value.endpoint || !value.keys?.p256dh || !value.keys?.auth) {
    throw new Error("Nie udało się utworzyć subskrypcji push.");
  }
  const { error } = await supabaseClient.from("push_subscriptions").upsert({
    user_id: currentUser.id,
    endpoint: value.endpoint,
    p256dh: value.keys.p256dh,
    auth: value.keys.auth,
    updated_at: new Date().toISOString()
  }, { onConflict: "endpoint" });
  if (error) throw error;
  return subscription;
}

async function disablePhonePush() {
  if (!currentUser || !supabaseClient) return;
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (subscription) {
    const { error } = await supabaseClient.from("push_subscriptions").delete()
      .eq("user_id", currentUser.id).eq("endpoint", subscription.endpoint);
    if (error) throw error;
    await subscription.unsubscribe();
  }
}

async function refreshPhonePushSettings() {
  const status = $("push-settings-status");
  const enable = $("push-enable-button");
  const disable = $("push-disable-button");
  if (!status || !enable || !disable) return;
  if (!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) {
    status.textContent = "Ta przeglądarka nie obsługuje powiadomień push.";
    enable.hidden = true;
    disable.hidden = true;
    return;
  }
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    const isEnabled = !!subscription && Notification.permission === "granted";
    enable.hidden = isEnabled;
    disable.hidden = !isEnabled;
    if (Notification.permission === "denied") {
      status.textContent = "Powiadomienia są zablokowane w Androidzie. Zmień uprawnienia aplikacji w ustawieniach telefonu.";
    } else if (isEnabled) {
      status.textContent = "Powiadomienia push są włączone na tym urządzeniu.";
    } else {
      status.textContent = "Powiadomienia push są wyłączone na tym urządzeniu.";
    }
  } catch (error) {
    status.textContent = "Nie udało się sprawdzić ustawień powiadomień.";
    console.warn("Push settings check failed:", error);
  }
}

// USTAWIENIA

function renderSettingsPage() {
  const myProfile=getMyProfile(),privacy=myProfile?.privacy||{...DEFAULT_PRIVACY};
  const selectedTheme=document.documentElement.dataset.theme||"system";
  const christmasEnabled=!document.getElementById("christmas-decorations")?.classList.contains("hidden");
  const languages=[["pl","🇵🇱","Polski"],["en","🇬🇧","English"],["ru","🇷🇺","Русский"],["uk","🇺🇦","Українська"]];
  const themes=[
    ["system","◐",appLanguage==="ru"?"Системная":appLanguage==="uk"?"Системна":appLanguage==="en"?"System":"Systemowy",appLanguage==="ru"?"Стандартный вид":appLanguage==="uk"?"Стандартний вигляд":appLanguage==="en"?"Default appearance":"Domyślny wygląd"],
    ["dark","☾","DarkOS",appLanguage==="ru"?"Тёмная синяя тема":appLanguage==="uk"?"Темна синя тема":appLanguage==="en"?"Deep blue dark theme":"Ciemny niebieski motyw"],
    ["liquid-glass","✧","Liquid Glass",appLanguage==="ru"?"Стеклянные эффекты":appLanguage==="uk"?"Скляні ефекти":appLanguage==="en"?"Glass interface effects":"Szklane efekty interfejsu"]
  ];
  $("page-content").innerHTML=`
    <section class="page-content settings-choice-panel language-panel">
      <div class="settings-panel-heading"><span class="settings-panel-icon">文</span><div><h3>${tr("lang")}</h3><p>${tr("intro")}</p></div></div>
      <div class="settings-language-grid">${languages.map(([id,flag,name])=>`<button type="button" class="settings-choice language-choice ${appLanguage===id?"selected":""}" data-language-choice="${id}" aria-pressed="${appLanguage===id}"><span class="choice-flag">${flag}</span><span class="choice-copy"><strong>${name}</strong><small>${name}</small></span><span class="choice-check">✓</span></button>`).join("")}</div>
    </section>
    <section class="page-content settings-choice-panel theme-panel">
      <div class="settings-panel-heading"><span class="settings-panel-icon">◈</span><div><h3>${tr("appearance")}</h3><p>${tr("appearanceDesc")}</p></div></div>
      <div class="settings-theme-grid">${themes.map(([id,icon,name,desc])=>`<button type="button" class="settings-choice theme-choice theme-${id} ${selectedTheme===id?"selected":""}" data-theme-choice="${id}" aria-pressed="${selectedTheme===id}"><span class="theme-preview"><i></i><i></i><i></i></span><span class="choice-copy"><strong>${icon} ${name}</strong><small>${desc}</small></span><span class="choice-check">✓</span></button>`).join("")}</div>
      <div class="switch-row"><div><div class="switch-label">Christmas Update</div><div class="switch-hint">${appLanguage==="ru"?"Временное рождественское оформление: гирлянда, снег, ёлка и снеговик.":appLanguage==="uk"?"Тимчасове різдвяне оформлення: гірлянда, сніг, ялинка та сніговик.":appLanguage==="en"?"Temporary Christmas decorations: garland, snow, tree and snowman.":"Tymczasowe dekoracje świąteczne: girlanda, śnieg, choinka i bałwan."}</div></div><label class="toggle"><input type="checkbox" id="christmas-toggle" ${christmasEnabled?"checked":""}><span class="slider"></span></label></div>
    </section>
    <div class="page-content"><h3>${tr("push")}</h3><p>${tr("pushDesc")}</p><p id="push-settings-status" class="switch-hint">${tr("pushCheck")}</p><button type="button" class="main-btn" id="push-enable-button">${tr("pushOn")}</button><button type="button" class="logout" id="push-disable-button" hidden>${tr("pushOff")}</button></div>
    <div class="page-content"><h3>${tr("privacy")}</h3><p>${tr("privacyDesc")}</p>
      <div class="switch-row"><div><div class="switch-label">${tr("visible")}</div><div class="switch-hint">${tr("visibleDesc")}</div></div><label class="toggle"><input type="checkbox" id="privacy-visible" ${privacy.visible!==false?"checked":""}><span class="slider"></span></label></div>
      <div class="switch-row"><div><div class="switch-label">${tr("showClass")}</div><div class="switch-hint">${tr("classDesc")}</div></div><label class="toggle"><input type="checkbox" id="privacy-class" ${privacy.showClass!==false?"checked":""}><span class="slider"></span></label></div>
      <div class="switch-row"><div><div class="switch-label">${tr("showInterests")}</div><div class="switch-hint">${tr("interestsDesc")}</div></div><label class="toggle"><input type="checkbox" id="privacy-interests" ${privacy.showInterests!==false?"checked":""}><span class="slider"></span></label></div></div>
    <button class="logout" id="logout-button">${tr("logout")}</button>`;
  document.querySelectorAll("[data-language-choice]").forEach(b=>b.addEventListener("click",()=>setAppLanguage(b.dataset.languageChoice)));
  document.querySelectorAll("[data-theme-choice]").forEach(b=>b.addEventListener("click",()=>{applyTheme(b.dataset.themeChoice);renderSettingsPage();}));
  const on=$("push-enable-button"),off=$("push-disable-button");
  if(on)on.addEventListener("click",async()=>{on.disabled=true;try{await enablePhonePush();}catch(error){const st=$("push-settings-status");if(st)st.textContent=error.message||"Error";}finally{on.disabled=false;await refreshPhonePushSettings();}});
  if(off)off.addEventListener("click",async()=>{off.disabled=true;try{await disablePhonePush();}catch(error){const st=$("push-settings-status");if(st)st.textContent=error.message||"Error";}finally{off.disabled=false;await refreshPhonePushSettings();}});
  refreshPhonePushSettings();
  $("christmas-toggle").addEventListener("change",e=>applyChristmasDecorations(e.target.checked));
  const privacyInputs={visible:$("privacy-visible"),showClass:$("privacy-class"),showInterests:$("privacy-interests")};
  Object.keys(privacyInputs).forEach(key=>privacyInputs[key].addEventListener("change",()=>{const old=getMyProfile();saveMyProfile({nickname:old?.nickname||currentUser.name,klasa:old?.klasa||"",bio:old?.bio||"",interests:old?.interests||[],photo:old?.photo||"",photoPath:old?.photoPath||null,privacy:{visible:privacyInputs.visible.checked,showClass:privacyInputs.showClass.checked,showInterests:privacyInputs.showInterests.checked}}).catch(error=>{console.error("Privacy settings save error:",error);alert("Nie udało się zapisać ustawień prywatności. Spróbuj ponownie.");});}));
  $("logout-button").addEventListener("click",logout);
}


// PUBLIC COMMUNITY PROFILES — independent from student discovery questionnaires.
const COMMUNITY_ASSET_BUCKET = "community-profile-assets";
const COMMUNITY_BANNERS = ["aurora","ocean","midnight","nebula","waves"];
const AVATAR_DECORATIONS = ["none","orbit","glow","crown","ice","arch","halo","comet","spark","prism","flame"];

async function loadCommunityProfile(userId) {
  if (!userId || !supabaseClient) return null;
  const { data, error } = await supabaseClient.from("community_profiles")
    .select("user_id,nickname,status_text,status_mode,bio,interests,class_name,first_name,last_name,avatar_path,banner_path,avatar_decoration,banner_theme,created_at,updated_at")
    .eq("user_id", userId).maybeSingle();
  if (error) {
    console.error("Community profile load error:", error);
    throw error;
  }
  return data || null;
}

function communityAssetUrl(path) {
  if (!path || !supabaseClient) return "";
  return supabaseClient.storage.from(COMMUNITY_ASSET_BUCKET).getPublicUrl(path).data?.publicUrl || "";
}

function communityAvatarMarkup(profile, extraClass = "") {
  const url = communityAssetUrl(profile?.avatar_path);
  const decoration = AVATAR_DECORATIONS.includes(profile?.avatar_decoration) ? profile.avatar_decoration : "none";
  return '<div class="community-avatar-wrap decor-' + escapeHTML(decoration) + ' ' + extraClass + '">' +
    (url ? '<img class="community-avatar-img" src="' + escapeHTML(url) + '" alt="Avatar">' :
      '<div class="community-avatar-fallback">' + escapeHTML((profile?.nickname || "U").trim().slice(0,1).toUpperCase()) + '</div>') +
    '<span class="community-avatar-ring" aria-hidden="true"></span></div>';
}

function communityBannerMarkup(profile) {
  const url = communityAssetUrl(profile?.banner_path);
  const theme = COMMUNITY_BANNERS.includes(profile?.banner_theme) ? profile.banner_theme : "aurora";
  return '<div class="community-profile-banner theme-' + theme + '"' +
    (url ? ' style="background-image:linear-gradient(180deg,rgba(4,10,24,.05),rgba(4,10,24,.5)),url(&quot;' + escapeHTML(url) + '&quot;)"' : "") + '></div>';
}

function communityAchievements(profile, roleBadge) {
  const items = [{icon:"✦",name:"Członek społeczności",desc:"Dołączył do ZSPM Community"}];
  const keys = new Set(profile?.achievementKeys || []);
  if (keys.has("first_message")) items.push({icon:"💬",name:"Pierwsza wiadomość",desc:"Rozpoczął rozmowę w społeczności"});
  if (keys.has("messages_10")) items.push({icon:"🗨️",name:"Rozmowny",desc:"Wysłał 10 wiadomości"});
  if (keys.has("messages_100")) items.push({icon:"🏅",name:"Aktywny rozmówca",desc:"Wysłał 100 wiadomości"});
  if (keys.has("level_5")) items.push({icon:"⭐",name:"Poziom 5",desc:"Osiągnął 5 poziom społeczności"});
  if (keys.has("messages_25")) items.push({icon:"🎯",name:"Stały uczestnik",desc:"Wysłał 25 wiadomości"});
  if (keys.has("messages_500")) items.push({icon:"🏆",name:"Głos społeczności",desc:"Wysłał 500 wiadomości"});
  if (keys.has("level_10")) items.push({icon:"🌟",name:"Poziom 10",desc:"Osiągnął 10 poziom społeczności"});
  if (keys.has("level_20")) items.push({icon:"💎",name:"Weteran",desc:"Osiągnął 20 poziom społeczności"});
  if (profile?.bio && profile?.interests?.length && profile?.avatar_path) {
    items.push({icon:"◆",name:"Dopracowany profil",desc:"Uzupełnione informacje i avatar"});
  }
  if (roleBadge === "premium") items.push({icon:"✧",name:"PREMIUM",desc:"Wyróżnienie społeczności"});
  if (roleBadge === "admin") items.push({icon:"★",name:"Administrator",desc:"Opieka nad społecznością"});
  return items;
}

function communityProfileHTML(profile, roleBadge, own) {
  const name = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ");
  const interests = Array.isArray(profile?.interests) ? profile.interests : [];
  const achievements = communityAchievements(profile, roleBadge);
  const accountRole = roleBadge === "admin" ? "Admin" : roleBadge === "premium" ? "Premium" : "User";
  const joined = profile?.created_at ? new Date(profile.created_at).toLocaleDateString("pl-PL",{month:"long",year:"numeric"}) : "Niedawno";
  const profileId = profile?.user_id || profile?.id || "";
  const statusMode = ["busy","dnd","invisible"].includes(profile?.status_mode) ? profile.status_mode : "online";
  const isOnline = statusMode === "invisible" ? false : onlineUsers.has(profileId);
  const presenceClass = statusMode === "dnd" ? "is-dnd" : statusMode === "busy" ? "is-busy" : isOnline ? "is-online" : "is-offline";
  const presenceLabel = statusMode === "dnd" ? "Nie przeszkadzać" : statusMode === "busy" ? "Zajęty" : isOnline ? "Online" : "Offline";
  const presenceHTML = '<span class="community-presence '+presenceClass+'" data-presence-user="'+escapeHTML(profileId)+'" data-status-mode="'+statusMode+'"><i></i>'+presenceLabel+'</span>';
  const friendProfile = {...profile,id:profileId};
  const socialActions = own ? '' : '<div class="community-profile-actions">'+friendButtonHTML(friendProfile)+'</div>';
  return '<article class="community-profile-card">' +
    communityBannerMarkup(profile) +
    '<div class="community-profile-main">' +
      '<div class="community-profile-identity">' + communityAvatarMarkup(profile) +
        '<div class="community-profile-heading"><h2>' + escapeHTML(profile?.nickname || "Uczeń") + '</h2>' +
          (name ? '<p class="community-profile-realname">' + escapeHTML(name) + '</p>' : '') +
          '<div class="community-profile-meta">'+presenceHTML+'<p class="community-profile-status community-role-badge role-' + accountRole + '">' + accountRole.toUpperCase() + '</p></div>' +
          (profile?.status_text ? '<p class="community-custom-status">'+escapeHTML(profile.status_text)+'</p>' : '') +
        '</div>' +
        (own ? '<button type="button" class="community-edit-btn" id="community-edit-profile">✎ Edytuj profil</button>' : '') +
      '</div>' + socialActions +
      '<div class="community-profile-columns">' +
        '<section class="community-profile-section"><h3>O mnie</h3><p>' + escapeHTML(profile?.bio || "Ten użytkownik nie dodał jeszcze opisu.") + '</p>' +
          '<div class="community-level-card"><div class="community-level-top"><strong>Poziom '+(profile?.progress?.level || 1)+'</strong><span>'+(profile?.progress?.xp || 0)+' XP</span></div><div class="community-level-track"><i style="width:'+Math.min(100,(profile?.progress?.xp || 0)%100)+'%"></i></div><small>'+(100-((profile?.progress?.xp || 0)%100))+' XP do następnego poziomu</small></div>' +
          (profile?.class_name ? '<div class="community-info-line"><span>Klasa</span><strong>' + escapeHTML(profile.class_name) + '</strong></div>' : '') +
          '<div class="community-info-line"><span>Dołączył(a)</span><strong>' + escapeHTML(joined) + '</strong></div>' +
          (interests.length ? '<div class="community-interests">' + interests.map(x=>'<span>'+escapeHTML(x)+'</span>').join("") + '</div>' : '') +
        '</section>' +
        '<section class="community-profile-section"><h3>Osiągnięcia</h3><div class="community-achievements">' +
          achievements.map(a=>'<div class="community-achievement"><span class="community-achievement-icon">'+a.icon+'</span><div><strong>'+escapeHTML(a.name)+'</strong><small>'+escapeHTML(a.desc)+'</small></div></div>').join("") +
        '</div></section>' +
      '</div>' +
    '</div></article>';
}

async function renderCommunityProfilePage() {
  const host = $("page-content");
  host.innerHTML = '<div class="page-content"><p>Ładowanie profilu...</p></div>';
  try {
    communityProfileCache = await loadCommunityProfile(currentUser.id);
    const profile = communityProfileCache || {
      user_id:currentUser.id,nickname:currentUser.name,status_text:"",status_mode:"online",bio:"",interests:[],
      class_name:"",first_name:"",last_name:"",avatar_path:null,banner_path:null,
      avatar_decoration:"none",banner_theme:"aurora",created_at:new Date().toISOString()
    };
    const [{data:badgeRow},{data:progressRow},{data:achievementRows}] = await Promise.all([
      supabaseClient.from("user_badges").select("badge").eq("user_id",currentUser.id).maybeSingle(),
      supabaseClient.from("community_progress").select("xp,level,message_count").eq("user_id",currentUser.id).maybeSingle(),
      supabaseClient.from("community_achievements").select("achievement_key").eq("user_id",currentUser.id)
    ]);
    profile.progress = progressRow || {xp:0,level:1,message_count:0};
    profile.achievementKeys = (achievementRows || []).map(row=>row.achievement_key);
    const roleBadge = isAdmin ? "admin" : (badgeRow?.badge || currentUserBadge);
    host.innerHTML = '<div class="community-profile-page">' +
      communityProfileHTML(profile, roleBadge, true) +
      '<div class="community-profile-note">To jest Twój publiczny profil społeczności. Ankieta poznawania uczniów jest osobną funkcją.</div>' +
      '<button type="button" class="community-questionnaire-link" id="open-own-questionnaire">Otwórz moją ankietę</button>' +
      '</div>';
    $("community-edit-profile").addEventListener("click", () => renderCommunityProfileEditor(profile, roleBadge));
    $("open-own-questionnaire").addEventListener("click", () => openPage("questionnaire"));
  } catch (error) {
    console.error(error);
    host.innerHTML = '<div class="page-content"><p>Nie udało się załadować profilu. Spróbuj ponownie.</p></div>';
  }
}

async function renderCommunityProfileEditor(profile, roleBadge) {
  const [{data:levelRow},{data:cosmeticRows}] = await Promise.all([
    supabaseClient.from("community_progress").select("level").eq("user_id",currentUser.id).maybeSingle(),
    supabaseClient.from("community_cosmetics").select("cosmetic_type,cosmetic_value,unlock_level").eq("is_active",true)
  ]);
  const currentLevel = levelRow?.level || 1;
  const unlockedCosmetics = new Set((cosmeticRows||[]).filter(item=>item.unlock_level<=currentLevel).map(item=>item.cosmetic_type+":"+item.cosmetic_value));

  const host = $("page-content");
  const accountRole = roleBadge === "admin" ? "admin" : roleBadge === "premium" ? "premium" : "zwykły";
  const current = profile || {nickname:currentUser.name,interests:[],avatar_decoration:"none",banner_theme:"aurora",status_mode:"online"};
  const bannerChoices = COMMUNITY_BANNERS.filter(theme => theme === current.banner_theme || unlockedCosmetics.has("banner_theme:"+theme)).map(theme =>
    '<label class="community-theme-choice"><input type="radio" name="community-banner-theme" value="'+theme+'" '+((current.banner_theme||"aurora")===theme?"checked":"")+'><span class="theme-preview theme-'+theme+'"></span><small>'+({aurora:"Aurora",ocean:"Ocean",midnight:"Midnight",nebula:"Nebula",waves:"Waves"}[theme])+'</small></label>'
  ).join("");
  const decorationChoices = AVATAR_DECORATIONS.filter(theme => theme === "none" || theme === current.avatar_decoration || unlockedCosmetics.has("avatar_decoration:"+theme)).map(theme =>
    '<label class="community-decoration-choice"><input type="radio" name="community-avatar-decoration" value="'+theme+'" '+((current.avatar_decoration||"none")===theme?"checked":"")+'><span class="decor-preview decor-'+theme+'">'+(theme==="none"?"○":theme==="orbit"?"◉":theme==="glow"?"✧":theme==="crown"?"♛":theme==="ice"?"❄":theme==="arch"?"⌒":theme==="halo"?"☼":theme==="comet"?"☄":theme==="spark"?"✦":theme==="prism"?"◇":"♨")+'</span><small>'+({none:"Brak",orbit:"Orbit",glow:"Glow",crown:"Korona",ice:"Ice",arch:"Łuk",halo:"Aureola",comet:"Kometa",spark:"Iskry",prism:"Pryzmat",flame:"Płomień"}[theme])+'</small></label>'
  ).join("");
  const avatarUrl = communityAssetUrl(current.avatar_path);
  const bannerUrl = communityAssetUrl(current.banner_path);
  host.innerHTML = '<div class="community-editor">' +
    '<div class="community-editor-head"><button type="button" class="pill-btn" id="community-editor-back">‹ Wróć</button><div><h3>Personalizacja profilu</h3><p>Ustaw wygląd, który widzą inni użytkownicy.</p></div></div>' +
    '<form id="community-profile-form">' +
      '<section class="community-editor-section"><h4>Baner profilu</h4><div class="community-editor-banner '+('theme-'+(current.banner_theme||"aurora"))+'" id="community-banner-preview" '+(bannerUrl?'style="background-image:url(&quot;'+escapeHTML(bannerUrl)+'&quot;)"':'')+'></div>' +
      '<label class="community-upload-btn">Wgraj własny baner<input id="community-banner-file" type="file" accept="image/jpeg,image/png,image/webp" hidden></label><button type="button" class="pill-btn" id="community-clear-banner">Użyj gotowego banera</button>' +
      '<div class="community-theme-grid">'+bannerChoices+'</div></section>' +
      '<section class="community-editor-section"><h4>Avatar i dekoracje</h4><div class="community-avatar-editor-row">'+communityAvatarMarkup(current,"editor-avatar")+'<div><label class="community-upload-btn">Zmień avatar<input id="community-avatar-file" type="file" accept="image/jpeg,image/png,image/webp" hidden></label><button type="button" class="pill-btn" id="community-clear-avatar">Usuń avatar</button></div></div>' +
      '<div class="community-decoration-grid">'+decorationChoices+'</div></section>' +
      '<section class="community-editor-section"><h4>Informacje</h4><p class="community-public-note">Informacje na tej stronie widzą inni zalogowani użytkownicy. Imię i nazwisko są opcjonalne — nie wpisuj danych, których nie chcesz udostępniać.</p>' +
        '<label class="community-form-field">Nick<input id="community-nickname" maxlength="32" minlength="2" required value="'+escapeHTML(current.nickname||currentUser.name)+'"></label>' +
        ' <div class="community-form-field community-account-role"><span>Typ konta</span><strong class="community-role-badge role-'+accountRole+'">'+accountRole.toUpperCase()+'</strong><small>Typ konta jest nadawany przez system lub administratora.</small></div>' +
        '<label class="community-form-field">Status <span>(widoczny dla innych)</span><input id="community-status-text" maxlength="80" value="'+escapeHTML(current.status_text||'')+'" placeholder="np. Uczę się do sprawdzianu"></label>' +
        '<label class="community-form-field">Dostępność<select id="community-status-mode"><option value="online" '+((current.status_mode||"online")==="online"?"selected":"")+'>Online</option><option value="busy" '+(current.status_mode==="busy"?"selected":"")+'>Zajęty</option><option value="dnd" '+(current.status_mode==="dnd"?"selected":"")+'>Nie przeszkadzać</option><option value="invisible" '+(current.status_mode==="invisible"?"selected":"")+'>Niewidoczny</option></select></label>' +
        '<label class="community-form-field">Opis<textarea id="community-bio" maxlength="500" rows="4" placeholder="Napisz kilka słów o sobie...">'+escapeHTML(current.bio||'')+'</textarea></label>' +
        '<label class="community-form-field">Zainteresowania<input id="community-interests" maxlength="200" placeholder="Muzyka, gry, sport..." value="'+escapeHTML((current.interests||[]).join(", "))+'"></label>' +
        '<label class="community-form-field">Klasa <span>(opcjonalnie)</span><input id="community-class" maxlength="20" value="'+escapeHTML(current.class_name||'')+'" placeholder="np. 1A"></label>' +
        '<div class="community-name-fields"><label class="community-form-field">Imię <span>(opcjonalnie)</span><input id="community-first-name" maxlength="60" value="'+escapeHTML(current.first_name||'')+'"></label><label class="community-form-field">Nazwisko <span>(opcjonalnie)</span><input id="community-last-name" maxlength="60" value="'+escapeHTML(current.last_name||'')+'"></label></div>' +
      '</section><p class="community-editor-feedback" id="community-editor-feedback" aria-live="polite"></p>' +
      '<button type="submit" class="main-btn community-save-btn">Zapisz profil</button></form></div>';

  $("community-editor-back").addEventListener("click", () => renderCommunityProfilePage());
  host.querySelectorAll('input[name="community-banner-theme"]').forEach(input => input.addEventListener("change", () => {
    bannerPreview.className = "community-editor-banner theme-" + input.value;
    if (!bannerFile && !current.banner_path) bannerPreview.style.backgroundImage = "";
  }));
  let avatarFile = null, bannerFile = null, removeAvatar = false, removeBanner = false;
  const bannerPreview = $("community-banner-preview");
  $("community-banner-file").addEventListener("change", e => {
    bannerFile = e.target.files?.[0] || null;
    removeBanner = false;
    if (bannerFile) {
      const url = URL.createObjectURL(bannerFile);
      bannerPreview.style.backgroundImage = 'url("'+url+'")';
    }
  });
  $("community-clear-banner").addEventListener("click", () => {
    bannerFile = null; removeBanner = true; $("community-banner-file").value = "";
    bannerPreview.style.backgroundImage = "";
  });
  $("community-clear-avatar").addEventListener("click", () => {
    avatarFile = null; removeAvatar = true; $("community-avatar-file").value = "";
    const preview = host.querySelector(".editor-avatar");
    preview?.querySelector("img")?.remove();
    if (preview && !preview.querySelector(".community-avatar-fallback")) {
      const fallback = document.createElement("div"); fallback.className = "community-avatar-fallback";
      fallback.textContent = (current.nickname || "U").trim().slice(0,1).toUpperCase(); preview.prepend(fallback);
    }
  });
  $("community-avatar-file").addEventListener("change", e => {
    avatarFile = e.target.files?.[0] || null;
    removeAvatar = false;
    const preview = host.querySelector(".editor-avatar");
    if (avatarFile && preview) {
      const img = preview.querySelector("img") || document.createElement("img");
      img.className = "community-avatar-img"; img.src = URL.createObjectURL(avatarFile); img.alt = "Podgląd avatara";
      preview.querySelector(".community-avatar-fallback")?.remove();
      if (!img.parentNode) preview.prepend(img);
    }
  });

  const communityForm = $("community-profile-form");
  communityForm.addEventListener("submit", async event => {
    event.preventDefault();
    const feedback = $("community-editor-feedback");
    const button = event.currentTarget.querySelector('button[type="submit"]');
    const nickname = $("community-nickname").value.trim();
    if (nickname.length < 2) { feedback.textContent = "Nick musi mieć co najmniej 2 znaki."; return; }
    button.disabled = true; button.textContent = "Zapisywanie...";
    try {
      const uploadAsset = async (file, kind, oldPath, removeExisting) => {
        if (removeExisting) return null;
        if (!file) return oldPath || null;
        const blob = await compressCommunityImage(file, kind === "banner" ? 1600 : 512);
        const path = currentUser.id + "/" + kind + "-" + Date.now() + ".jpg";
        const {error} = await supabaseClient.storage.from(COMMUNITY_ASSET_BUCKET).upload(path,blob,{contentType:"image/jpeg",cacheControl:"3600",upsert:false});
        if (error) throw error;
        return path;
      };
      const avatarPath = await uploadAsset(avatarFile,"avatar",current.avatar_path,removeAvatar);
      const bannerPath = await uploadAsset(bannerFile,"banner",current.banner_path,removeBanner);
      const row = {
        user_id:currentUser.id,nickname,
        status_text:$("community-status-text").value.trim(),status_mode:$("community-status-mode").value,
        bio:$("community-bio").value.trim(),
        interests:$("community-interests").value.split(",").map(x=>x.trim()).filter(Boolean).slice(0,10),
        class_name:$("community-class").value.trim(),first_name:$("community-first-name").value.trim(),
        last_name:$("community-last-name").value.trim(),avatar_path:avatarPath,banner_path:bannerPath,
        avatar_decoration:communityForm.querySelector('input[name="community-avatar-decoration"]:checked')?.value||"none",
        banner_theme:communityForm.querySelector('input[name="community-banner-theme"]:checked')?.value||"aurora",
        updated_at:new Date().toISOString()
      };
      const {data,error}=await supabaseClient.from("community_profiles").upsert(row,{onConflict:"user_id"})
        .select("user_id,nickname,status_text,status_mode,bio,interests,class_name,first_name,last_name,avatar_path,banner_path,avatar_decoration,banner_theme,created_at,updated_at").single();
      if (error) throw error;
      communityProfileCache=data;
      const obsoleteAssets = [current.avatar_path && current.avatar_path !== avatarPath ? current.avatar_path : null, current.banner_path && current.banner_path !== bannerPath ? current.banner_path : null].filter(Boolean);
      if (obsoleteAssets.length) {
        const {error:cleanupError} = await supabaseClient.storage.from(COMMUNITY_ASSET_BUCKET).remove(obsoleteAssets);
        if (cleanupError) console.warn("Old community profile assets cleanup failed:",cleanupError);
      }
      $("user-name").textContent = nickname;
      await renderCommunityProfilePage();
    } catch (error) {
      console.error("Community profile save error:",error);
      feedback.textContent = error.message || "Nie udało się zapisać profilu.";
      button.disabled=false; button.textContent="Zapisz profil";
    }
  });
}

function compressCommunityImage(file, maxSide) {
  return new Promise((resolve,reject)=>{
    if (!file || !/^image\/(jpeg|png|webp)$/i.test(file.type)) return reject(new Error("Wybierz obraz JPG, PNG lub WebP."));
    if (file.size > 5*1024*1024) return reject(new Error("Maksymalny rozmiar pliku to 5 MB."));
    const reader=new FileReader();
    reader.onerror=()=>reject(new Error("Nie udało się odczytać obrazu."));
    reader.onload=()=>{
      const image=new Image();
      image.onerror=()=>reject(new Error("Nie udało się otworzyć obrazu."));
      image.onload=()=>{
        const pixelCount=image.width*image.height;
        if(!image.width||!image.height||pixelCount>40000000) return reject(new Error("Obraz ma zbyt dużą rozdzielczość. Wybierz plik do 40 megapikseli."));
        const scale=Math.min(1,maxSide/Math.max(image.width,image.height));
        const canvas=document.createElement("canvas");
        canvas.width=Math.max(1,Math.round(image.width*scale)); canvas.height=Math.max(1,Math.round(image.height*scale));
        const ctx=canvas.getContext("2d"); if(!ctx) return reject(new Error("Nie udało się przygotować obrazu."));
        ctx.drawImage(image,0,0,canvas.width,canvas.height);
        canvas.toBlob(blob=>blob?resolve(blob):reject(new Error("Nie udało się skompresować obrazu.")),"image/jpeg",0.82);
      };
      image.src=reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function openCommunityProfile(userId) {
  if (!userId || !supabaseClient) return;
  if (activeCommunityProfileClose) activeCommunityProfileClose();
  let profile;
  try {
    profile = await loadCommunityProfile(userId);
  } catch (error) {
    alert("Nie udało się otworzyć profilu.");
    return;
  }
  if (!profile) profile = {user_id:userId,nickname:"Uczeń",status_text:"",status_mode:"online",bio:"",interests:[],avatar_decoration:"none",banner_theme:"aurora"};
  await Promise.all([loadFriendsData(),loadBlockedUsers()]);
  const [{data:badgeRow},{data:adminRows},{data:progressRow},{data:achievementRows}] = await Promise.all([
    supabaseClient.from("user_badges").select("badge").eq("user_id",userId).maybeSingle(),
    loadAdminFlagsByIds([userId]).then(ids=>({data:[{is_admin:ids.has(userId)}]})),
    supabaseClient.from("community_progress").select("xp,level,message_count").eq("user_id",userId).maybeSingle(),
    supabaseClient.from("community_achievements").select("achievement_key").eq("user_id",userId)
  ]);
  profile.progress = progressRow || {xp:0,level:1,message_count:0};
  profile.achievementKeys = (achievementRows || []).map(row=>row.achievement_key);
  const roleBadge = adminRows?.[0]?.is_admin ? "admin" : (badgeRow?.badge || null);
  const own = userId === currentUser?.id;
  const overlay=document.createElement("div");
  overlay.className="community-profile-overlay";
  overlay.innerHTML='<div class="community-profile-dialog" role="dialog" aria-modal="true" aria-label="Profil użytkownika">' +
    '<button type="button" class="community-profile-close" aria-label="Zamknij">×</button>' +
    communityProfileHTML(profile,roleBadge,own) + '</div>';
  document.body.appendChild(overlay);
  let escapeHandler = null;
  const close = () => {
    overlay.remove();
    if (escapeHandler) document.removeEventListener("keydown", escapeHandler);
    if (activeCommunityProfileClose === close) activeCommunityProfileClose = null;
  };
  activeCommunityProfileClose = close;
  overlay.querySelector(".community-profile-close").addEventListener("click",close);
  overlay.addEventListener("click",e=>{if(e.target===overlay)close();});
  overlay.querySelector("#community-edit-profile")?.addEventListener("click",()=>{close();openPage("my-profile");});
  overlay.querySelectorAll("[data-action='add-friend']").forEach(button=>button.addEventListener("click",async()=>{
    button.disabled=true; const error=await sendFriendInvite(button.dataset.personId);
    if(error) alert(error); close(); await openCommunityProfile(userId);
  }));
  overlay.querySelectorAll("[data-action='cancel-invite']").forEach(button=>button.addEventListener("click",async()=>{
    await cancelFriendInvite(button.dataset.requestId); close(); await openCommunityProfile(userId);
  }));
  overlay.querySelectorAll("[data-action='accept-invite']").forEach(button=>button.addEventListener("click",async()=>{
    await acceptFriendInvite(button.dataset.requestId); close(); await openCommunityProfile(userId);
  }));
  overlay.querySelectorAll("[data-action='block-person']").forEach(button=>button.addEventListener("click",async()=>{
    if(!confirm("Zablokować tego użytkownika?")) return; await blockUser(userId); close();
  }));
  overlay.querySelectorAll("[data-action='unblock']").forEach(button=>button.addEventListener("click",async()=>{
    await unblockUser(userId); close(); await openCommunityProfile(userId);
  }));
  escapeHandler = event => { if (event.key === "Escape") close(); };
  document.addEventListener("keydown", escapeHandler);
}

document.addEventListener("click", event => {
  const avatar = event.target.closest("[data-open-community-profile]");
  if (avatar) {
    event.preventDefault();
    event.stopPropagation();
    openCommunityProfile(avatar.dataset.openCommunityProfile);
  }
}, true);
document.addEventListener("keydown", event => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-open-community-profile]")) {
    event.preventDefault();
    event.stopPropagation();
    openCommunityProfile(event.target.dataset.openCommunityProfile);
  }
}, true);

// ZNAJOMI, POWIADOMIENIA I CZAT — SUPABASE

const MAX_MESSAGE_LENGTH = 500;

function getProfileById(id) {
  if (id === currentUser?.id) return myProfileCache;
  return publicProfilesCache.find(profile => profile.id === id) || null;
}

async function loadAdminFlagsByIds(ids) {
  const uniqueIds = [...new Set((ids || []).filter(Boolean))];
  if (!uniqueIds.length) return new Set();
  const { data, error } = await supabaseClient.rpc("get_public_admin_status", { p_user_ids: uniqueIds });
  if (error) {
    console.warn("Admin status lookup failed:", error);
    return new Set();
  }
  return new Set((data || []).filter(row => row.is_admin).map(row => row.user_id));
}

async function loadProfilesByIds(ids) {
  const uniqueIds = [...new Set((ids || []).filter(Boolean))];
  if (!uniqueIds.length) return [];
  const { data, error } = await supabaseClient
    .from("public_profiles")
    .select("id,nickname,class_name,bio,photo_path,interests,is_visible,show_class,show_interests")
    .in("id", uniqueIds);
  if (error) {
    console.error("Related profiles load error:", error);
    return [];
  }
  const mapped = (await Promise.all((data || []).map(row => mapDatabaseProfile(row)))).filter(Boolean);
  const adminIds = await loadAdminFlagsByIds(uniqueIds);
  const { data: badgeRows, error: badgeError } = await supabaseClient
    .from("user_badges").select("user_id,badge").in("user_id", uniqueIds);
  if (badgeError) console.warn("Related profile badges load error:", badgeError);
  const badgeMap = new Map((badgeRows || []).map(row => [row.user_id, row.badge]));
  mapped.forEach(profile => {
    profile.isAdmin = adminIds.has(profile.id);
    profile.badge = profile.isAdmin ? "admin" : (badgeMap.get(profile.id) || null);
  });
  const byId = new Map(publicProfilesCache.map(profile => [profile.id, profile]));
  mapped.forEach(profile => byId.set(profile.id, profile));
  publicProfilesCache = [...byId.values()].filter(profile => profile.id !== currentUser?.id);
  return mapped;
}

async function loadFriendsData() {
  if (!currentUser?.id) return friendsDataCache;
  const [requestsResult, friendshipsResult] = await Promise.all([
    supabaseClient.from("friend_requests")
      .select("id,sender_id,receiver_id,status,created_at")
      .or("sender_id.eq." + currentUser.id + ",receiver_id.eq." + currentUser.id)
      .order("created_at", { ascending: false }),
    supabaseClient.from("friendships")
      .select("user_one,user_two")
      .or("user_one.eq." + currentUser.id + ",user_two.eq." + currentUser.id)
  ]);
  if (requestsResult.error) console.error("Friend requests load error:", requestsResult.error);
  if (friendshipsResult.error) console.error("Friendships load error:", friendshipsResult.error);

  const requests = requestsResult.data || [];
  const friendships = friendshipsResult.data || [];
  const otherIds = [
    ...requests.map(row => row.sender_id === currentUser.id ? row.receiver_id : row.sender_id),
    ...friendships.map(row => row.user_one === currentUser.id ? row.user_two : row.user_one)
  ];
  await loadProfilesByIds(otherIds);

  friendsDataCache = {
    incoming: requests.filter(row => row.receiver_id === currentUser.id && row.status === "pending")
      .map(row => ({ requestId: row.id, profile: getProfileById(row.sender_id) })).filter(item => item.profile),
    outgoing: requests.filter(row => row.sender_id === currentUser.id && row.status === "pending")
      .map(row => ({ requestId: row.id, profile: getProfileById(row.receiver_id) })).filter(item => item.profile),
    friends: friendships.map(row => getProfileById(row.user_one === currentUser.id ? row.user_two : row.user_one)).filter(Boolean)
  };
  return friendsDataCache;
}

async function sendFriendInvite(personId) {
  if (!personId || personId === currentUser?.id) return "Nieprawidłowa osoba.";
  if (isBlocked(personId)) return "Odblokuj tę osobę, aby wysłać zaproszenie.";
  const existing = friendsDataCache;
  if (existing.friends.some(profile => profile.id === personId)) return "Ta osoba jest już Twoim znajomym.";
  if (existing.outgoing.some(item => item.profile.id === personId)) return "Zaproszenie zostało już wysłane.";
  if (existing.incoming.some(item => item.profile.id === personId)) return "Ta osoba już Cię zaprosiła. Zaakceptuj zaproszenie.";

  const { error } = await supabaseClient.from("friend_requests").insert({
    sender_id: currentUser.id,
    receiver_id: personId,
    status: "pending"
  });
  if (error) {
    console.error("Friend request error:", error);
    return error.code === "23505"
      ? "Zaproszenie do tej osoby już oczekuje."
      : "Nie udało się wysłać zaproszenia.";
  }
  await loadFriendsData();
  await loadNotifications();
  return null;
}

async function acceptFriendInvite(requestId) {
  const { error } = await supabaseClient.from("friend_requests")
    .update({ status: "accepted" }).eq("id", requestId);
  if (error) {
    console.error("Accept friend request error:", error);
    alert("Nie udało się zaakceptować zaproszenia.");
    return;
  }
  await loadFriendsData();
  await loadNotifications();
}

async function rejectFriendInvite(requestId) {
  const { error } = await supabaseClient.from("friend_requests")
    .update({ status: "rejected" }).eq("id", requestId);
  if (error) console.error("Reject friend request error:", error);
  await loadFriendsData();
}

async function cancelFriendInvite(requestId) {
  const { error } = await supabaseClient.from("friend_requests")
    .delete().eq("id", requestId);
  if (error) console.error("Cancel friend request error:", error);
  await loadFriendsData();
}

async function removeFriend(personId) {
  const a = currentUser.id < personId ? currentUser.id : personId;
  const b = currentUser.id < personId ? personId : currentUser.id;
  const { error } = await supabaseClient.from("friendships")
    .delete().eq("user_one", a).eq("user_two", b);
  if (error) console.error("Remove friend error:", error);
  await loadFriendsData();
}

async function loadBlockedUsers() {
  if (!currentUser?.id) return [];
  const { data, error } = await supabaseClient.from("user_blocks")
    .select("blocked_id").eq("blocker_id", currentUser.id);
  if (error) {
    console.error("Blocked users load error:", error);
    return blockedUsersCache;
  }
  blockedUsersCache = (data || []).map(row => row.blocked_id);
  return blockedUsersCache;
}

function isBlocked(personId) {
  return blockedUsersCache.includes(personId);
}

async function blockUser(personId) {
  if (!personId || personId === currentUser?.id) return;
  const { error } = await supabaseClient.from("user_blocks").insert({
    blocker_id: currentUser.id,
    blocked_id: personId
  });
  if (error && error.code !== "23505") {
    console.error("Block user error:", error);
    alert("Nie udało się zablokować użytkownika.");
    return;
  }
  await loadBlockedUsers();
  await loadFriendsData();
}

async function unblockUser(personId) {
  const { error } = await supabaseClient.from("user_blocks")
    .delete().eq("blocker_id", currentUser.id).eq("blocked_id", personId);
  if (error) console.error("Unblock user error:", error);
  await loadBlockedUsers();
}

async function submitContentReport(targetType, targetId, reportedUserId, reason = "") {
  const { error } = await supabaseClient.from("content_reports").insert({
    reporter_id: currentUser.id,
    reported_user_id: reportedUserId,
    target_type: targetType,
    target_id: targetId,
    reason: String(reason || "").trim().slice(0,500)
  });
  if (error) {
    console.error("Content report error:", error);
    alert("Nie udało się wysłać zgłoszenia.");
    return false;
  }
  return true;
}

function friendButtonHTML(profile) {
  const blockButton = '<button class="report-btn" data-action="block-person" data-person-id="' + escapeHTML(profile.id) + '">Blokuj</button>';
  if (isBlocked(profile.id)) {
    return '<button class="pill-btn" data-action="unblock" data-person-id="' + escapeHTML(profile.id) + '">Odblokuj użytkownika</button>';
  }
  if (friendsDataCache.friends.some(item => item.id === profile.id)) {
    return '<button class="pill-btn" disabled>Już jesteście znajomymi</button>' + blockButton;
  }
  const incoming = friendsDataCache.incoming.find(item => item.profile.id === profile.id);
  if (incoming) {
    return '<button class="accept-btn" data-action="accept-invite" data-request-id="' + escapeHTML(incoming.requestId) + '">Zaakceptuj prośbę</button>' + blockButton;
  }
  const outgoing = friendsDataCache.outgoing.find(item => item.profile.id === profile.id);
  if (outgoing) {
    return '<button class="report-btn" data-action="cancel-invite" data-request-id="' + escapeHTML(outgoing.requestId) + '">Anuluj prośbę</button>' + blockButton;
  }
  return '<button class="accept-btn" data-action="add-friend" data-person-id="' + escapeHTML(profile.id) + '">Dodaj do znajomych</button>' + blockButton;
}

function personCardHTML(profile, buttonsHTML) {
  return `
    <div class="profile-card">
      <div class="profile-head">
        ${profileAvatarHTML(profile)}
        <div>
          <div class="profile-nick">${escapeHTML(profile.nickname)}</div>
          ${profile.klasa ? '<div class="profile-klasa">Klasa ' + escapeHTML(profile.klasa) + '</div>' : ''}
        </div>
      </div>
      <div class="btn-row">${buttonsHTML}</div>
    </div>
  `;
}

async function renderFriendsPage() {
  await loadFriendsData();
  await loadBlockedUsers();

  const incomingHTML = friendsDataCache.incoming.map(item => personCardHTML(item.profile, `
    <button class="accept-btn" data-action="accept-invite" data-request-id="${escapeHTML(item.requestId)}">Zaakceptuj</button>
    <button class="report-btn" data-action="reject-invite" data-request-id="${escapeHTML(item.requestId)}">Odrzuć zaproszenie</button>
  `)).join("");

  const outgoingHTML = friendsDataCache.outgoing.map(item => personCardHTML(item.profile, `
    <button class="report-btn" data-action="cancel-invite" data-request-id="${escapeHTML(item.requestId)}">Anuluj zaproszenie</button>
  `)).join("");

  const sortedFriends = [...friendsDataCache.friends].sort((a,b) => Number(onlineUsers.has(b.id)) - Number(onlineUsers.has(a.id)) || String(a.nickname).localeCompare(String(b.nickname), "pl"));
  const friendsHTML = sortedFriends.map(profile => personCardHTML(profile, `
    <span class="community-presence ${onlineUsers.has(profile.id) ? "is-online" : "is-offline"}" data-presence-user="${escapeHTML(profile.id)}" data-status-mode="online"><i></i>${onlineUsers.has(profile.id) ? "Online" : "Offline"}</span>
    ${isBlocked(profile.id)
      ? '<button class="pill-btn" data-action="unblock" data-person-id="' + escapeHTML(profile.id) + '">Odblokuj użytkownika</button>'
      : '<button class="accept-btn" data-action="open-friend-chat" data-person-id="' + escapeHTML(profile.id) + '">Napisz wiadomość</button><button class="report-btn" data-action="block-person" data-person-id="' + escapeHTML(profile.id) + '">Blokuj</button>'}
    <button class="report-btn" data-action="remove-friend" data-person-id="${escapeHTML(profile.id)}">Usuń ze znajomych</button>
    <button class="report-btn" data-action="report-person" data-person-id="${escapeHTML(profile.id)}">Zgłoś</button>
  `)).join("");

  $("page-content").innerHTML = `
    <div class="page-content">
      <h3>Znajomi i zaproszenia</h3>
      <p>Zaproszenia i lista znajomych są synchronizowane z Twoim kontem.</p>
    </div>
    <div class="page-content">
      <h3>Prośby o kontakt (${friendsDataCache.incoming.length})</h3>
      ${incomingHTML || '<p class="section-sub">Brak nowych zaproszeń.</p>'}
    </div>
    ${friendsDataCache.outgoing.length ? `
      <div class="page-content">
        <h3>Wysłane zaproszenia (${friendsDataCache.outgoing.length})</h3>
        ${outgoingHTML}
      </div>` : ""}
    <div class="page-content">
      <h3>Moi znajomi (${friendsDataCache.friends.length})</h3>
      ${friendsHTML || '<p class="section-sub">Nie masz jeszcze znajomych. Poznaj uczniów w sekcji „Ankiety uczniów”.</p>'}
    </div>
  `;
  bindFriendsPage();
}

function bindFriendsPage() {
  const container = $("page-content");
  const rerender = () => renderFriendsPage();

  container.querySelectorAll("[data-action='accept-invite']").forEach(button => {
    button.addEventListener("click", async () => {
      await acceptFriendInvite(button.dataset.requestId);
      await rerender();
    });
  });
  container.querySelectorAll("[data-action='reject-invite']").forEach(button => {
    button.addEventListener("click", async () => {
      await rejectFriendInvite(button.dataset.requestId);
      await rerender();
    });
  });
  container.querySelectorAll("[data-action='cancel-invite']").forEach(button => {
    button.addEventListener("click", async () => {
      await cancelFriendInvite(button.dataset.requestId);
      await rerender();
    });
  });
  container.querySelectorAll("[data-action='open-friend-chat']").forEach(button => {
    button.addEventListener("click", () => openFriendConversation(button.dataset.personId));
  });
  container.querySelectorAll("[data-action='remove-friend']").forEach(button => {
    button.addEventListener("click", async () => {
      await removeFriend(button.dataset.personId);
      await rerender();
    });
  });
  container.querySelectorAll("[data-action='block-person']").forEach(button => {
    button.addEventListener("click", async () => {
      await blockUser(button.dataset.personId);
      await rerender();
    });
  });
  container.querySelectorAll("[data-action='unblock']").forEach(button => {
    button.addEventListener("click", async () => {
      await unblockUser(button.dataset.personId);
      await rerender();
    });
  });
  container.querySelectorAll("[data-action='report-person']").forEach(button => {
    button.addEventListener("click", async () => {
      const ok = await submitContentReport("profile", button.dataset.personId, button.dataset.personId);
      if (ok) {
        button.disabled = true;
        button.textContent = "Zgłoszono";
      }
    });
  });
}

async function openFriendConversation(personId) {
  if (isBlocked(personId)) {
    alert("Ta rozmowa jest niedostępna, ponieważ użytkownik jest zablokowany.");
    return;
  }
  const { data, error } = await supabaseClient.rpc("create_direct_conversation", {
    p_other_user: personId
  });
  if (error || !data) {
    console.error("Create conversation error:", error);
    alert("Nie można rozpocząć rozmowy. Możesz pisać tylko do znajomych, a blokada wyłącza wiadomości.");
    return;
  }
  await openPage("chat");
  await openChat(data);
}

function bindMessageSearch(inputId, containerId, itemSelector) {
  const input = $(inputId), container = $(containerId);
  if (!input || !container) return;
  const clearButton = input.parentElement?.querySelector(".chat-search-clear");
  const filterMessages = () => {
    const query = input.value.trim().toLocaleLowerCase("pl");
    container.querySelectorAll(itemSelector).forEach(item => {
      item.hidden = Boolean(query) && !item.textContent.toLocaleLowerCase("pl").includes(query);
    });
    if (clearButton) clearButton.hidden = !input.value;
  };
  input.addEventListener("input", filterMessages);
  if (clearButton) clearButton.addEventListener("click", () => {
    input.value = "";
    filterMessages();
    input.focus();
  });
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatConversationTime(timestamp) {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (sameDay) return formatTime(date.getTime());
  if (date.toDateString() === yesterday.toDateString()) return "Wczoraj";
  return date.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" });
}

function formatChatDateLabel(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  if (date.toDateString() === now.toDateString()) return "Dzisiaj";
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "Wczoraj";
  return date.toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
}

function myDisplayInfo() {
  const myProfile = getMyProfile();
  return { nickname: myProfile?.nickname || currentUser.name };
}

async function renderChatList() {
  await cleanupChatRealtime();
  const { data, error } = await supabaseClient.from("conversations")
    .select("id,user_one,user_two,updated_at")
    .order("updated_at", { ascending: false });
  if (error) {
    console.error("Conversations load error:", error);
    $("page-content").innerHTML = '<div class="page-content"><p>Nie udało się załadować rozmów.</p></div>';
    return;
  }
  conversationsCache = data || [];
  const otherIds = conversationsCache.map(conv => conv.user_one === currentUser.id ? conv.user_two : conv.user_one);
  await loadProfilesByIds(otherIds);

  const latestByConversation = new Map();
  if (conversationsCache.length) {
    const { data: messages, error: messagesError } = await supabaseClient.from("messages")
      .select("id,conversation_id,sender_id,content,created_at")
      .in("conversation_id", conversationsCache.map(conv => conv.id))
      .order("created_at", { ascending: false })
      .limit(100);
    if (messagesError) console.error("Conversation previews error:", messagesError);
    (messages || []).forEach(message => {
      if (!latestByConversation.has(message.conversation_id)) latestByConversation.set(message.conversation_id, message);
    });
  }

  const items = conversationsCache.map(conv => {
    const otherId = conv.user_one === currentUser.id ? conv.user_two : conv.user_one;
    const profile = getProfileById(otherId) || { id: otherId, nickname: "Uczeń", photo: "" };
    const last = latestByConversation.get(conv.id);
    const preview = last
      ? (last.sender_id === currentUser.id ? "Ty: " : "") + last.content
      : "Brak wiadomości";
    const unread = unreadNotificationCount("message", conv.id);
    const time = formatConversationTime(last?.created_at || conv.updated_at);
    return `
      <button type="button" class="conv-item telegram-conv-item" data-conv="${escapeHTML(conv.id)}">
        ${profileAvatarHTML(profile, "conv-avatar")}
        <span class="conv-info">
          <span class="conv-topline">
            <span class="conv-nick">${escapeHTML(profile.nickname)}${profile.isAdmin ? '<span class="user-role-badge admin-role">ADMIN</span>' : profile.badge === "premium" ? '<span class="user-role-badge premium-role">PREMIUM</span>' : ""}</span>
            <time class="conv-time">${escapeHTML(time)}</time>
          </span>
          <span class="conv-bottomline">
            <span class="conv-last">${escapeHTML(preview)}</span>
            ${unread ? '<span class="menu-unread-badge is-visible">'+unread+'</span>' : ""}
          </span>
        </span>
      </button>
    `;
  }).join("");

  $("page-content").innerHTML = `
    <section class="private-chat-overview">
      <div class="private-chat-overview-copy">
        <span class="private-chat-kicker">ZSPM COMMUNITY</span>
        <h3>Wiadomości</h3>
        <p>Twoje prywatne rozmowy ze znajomymi</p>
      </div>
      <span class="private-chat-count">${conversationsCache.length}</span>
    </section>
    <button type="button" class="global-chat-entry telegram-global-entry" id="open-global-chat">
      <span class="global-chat-entry-icon">🌐</span>
      <span class="global-chat-entry-copy"><strong>Czat ogólny</strong><small>Rozmowa całej społeczności</small></span>
      <span class="global-chat-entry-arrow">›</span>
    </button>
    <div class="chat-search-box telegram-list-search">
      <span class="chat-search-icon" aria-hidden="true">⌕</span>
      <input id="conversation-search" class="chat-search-input" type="search" maxlength="80" placeholder="Szukaj rozmowy…" aria-label="Szukaj rozmowy">
      <button type="button" class="chat-search-clear" aria-label="Wyczyść wyszukiwanie" hidden>×</button>
    </div>
    <div class="telegram-list-heading"><strong>Ostatnie rozmowy</strong><span>${conversationsCache.length}</span></div>
    <div class="conv-list telegram-conv-list" id="private-conversation-list">${items || '<div class="telegram-empty-state"><span>✉</span><strong>Nie masz jeszcze rozmów</strong><small>Dodaj znajomego, aby rozpocząć rozmowę.</small></div>'}</div>
  `;
  $("open-global-chat").addEventListener("click", () => openGlobalChat());
  $("page-content").querySelectorAll("[data-conv]").forEach(button => {
    button.addEventListener("click", () => openChat(button.dataset.conv));
  });
  bindMessageSearch("conversation-search", "private-conversation-list", ".conv-item");
  chatListChannel = supabaseClient.channel("chat-list-" + currentUser.id)
    .on("postgres_changes", {
      event: "INSERT", schema: "public", table: "messages"
    }, async () => {
      if (document.querySelector("#page-title")?.textContent === "Wiadomości" && !activeConversationId) {
        await renderChatList();
      }
    })
    .subscribe();
}

async function openGlobalChat(roomId = null) {
  if(activeChatChannel){await supabaseClient.removeChannel(activeChatChannel);activeChatChannel=null;}
  if(chatListChannel){await supabaseClient.removeChannel(chatListChannel);chatListChannel=null;}
  if(globalChatChannel){await supabaseClient.removeChannel(globalChatChannel);globalChatChannel=null;}
  activeConversationId=null;activeGlobalRoomId=roomId||null;
  let query=supabaseClient.from("global_chat_messages").select("id,sender_id,content,created_at,edited_at,reply_to_id,room_id").order("created_at",{ascending:false}).limit(100);
  query=activeGlobalRoomId?query.eq("room_id",activeGlobalRoomId):query.is("room_id",null);
  const [{data,error},{data:roomsData,error:roomsError}]=await Promise.all([query,supabaseClient.from("chat_rooms").select("id,slug,name,description,icon").eq("is_active",true).order("sort_order")]);
  if(error){console.error("Global chat load error:",error);$("page-content").innerHTML='<div class="page-content"><p>Nie udało się załadować czatu. Odśwież stronę.</p></div>';return;}
  if(roomsError)console.warn("Chat rooms load error:",roomsError);
  const messages=(data||[]).reverse(),rooms=roomsData||[];await loadProfilesByIds(messages.map(x=>x.sender_id));
  activeGlobalPins = await loadCommunityChatPins("global", null, activeGlobalRoomId);
  const ids=messages.map(x=>x.id);
  const [{data:likeRows},{data:reactionRows}]=await Promise.all([
    ids.length?supabaseClient.from("global_chat_message_likes").select("message_id,user_id").in("message_id",ids):Promise.resolve({data:[]}),
    ids.length?supabaseClient.from("global_chat_message_reactions").select("message_id,user_id,emoji").in("message_id",ids):Promise.resolve({data:[]})
  ]);
  const likeMap=new Map(),reactionMap=new Map();
  (likeRows||[]).forEach(r=>{const v=likeMap.get(r.message_id)||{count:0,liked:false};v.count++;if(r.user_id===currentUser.id)v.liked=true;likeMap.set(r.message_id,v);});
  (reactionRows||[]).forEach(r=>{const m=reactionMap.get(r.message_id)||new Map(),v=m.get(r.emoji)||{count:0,reacted:false};v.count++;if(r.user_id===currentUser.id)v.reacted=true;m.set(r.emoji,v);reactionMap.set(r.message_id,m);});
  const byId=new Map(messages.map(x=>[x.id,x]));
  const rows=messages.map(item=>{
    const mine=item.sender_id===currentUser.id,profile=mine?getMyProfile():getProfileById(item.sender_id);
    const role=(mine?isAdmin:profile?.isAdmin)?'<span class="user-role-badge admin-role">ADMIN</span>':profile?.badge==="premium"?'<span class="user-role-badge premium-role">PREMIUM</span>':"";
    const likes=likeMap.get(item.id)||{count:0,liked:false},parent=byId.get(item.reply_to_id),reactions=reactionMap.get(item.id)||new Map();
    const currentPin=activeGlobalPins.find(pin=>pin.message_id===item.id);
    const pinAction=isAdmin?'<button type="button" class="msg-action pin-msg-action" data-global-action="toggle-pin" data-id="'+item.id+'" data-pin-id="'+(currentPin?.id||'')+'">'+(currentPin?'📌 Odpnij':'📌 Przypnij')+'</button>':'';
    const chips=[...reactions.entries()].map(([emoji,v])=>'<button type="button" class="chat-reaction'+(v.reacted?' active':'')+'" data-global-action="react" data-id="'+item.id+'" data-emoji="'+emoji+'">'+emoji+' '+v.count+'</button>').join("");
    const picker=['👍','❤️','😂','🔥','👏','😮'].map(emoji=>'<button type="button" class="chat-reaction-pick" data-global-action="react" data-id="'+item.id+'" data-emoji="'+emoji+'">'+emoji+'</button>').join("");
    return '<article class="global-message'+(mine?' own':'')+'" data-global-message="'+item.id+'"><div class="global-message-meta">'+communityAuthorHTML(item.sender_id,mine?(getMyProfile()?.nickname||currentUser.name):(profile?.nickname||"Użytkownik"))+role+'<time>'+escapeHTML(formatTime(item.created_at))+(item.edited_at?' · edytowano':'')+'</time></div>'+
      (parent?'<div class="bubble-reply-context">↳ '+escapeHTML(parent.content.slice(0,100))+'</div>':'')+'<p>'+escapeHTML(item.content)+'</p><div class="chat-reaction-row">'+chips+'<button type="button" class="chat-reaction-add" data-global-action="toggle-picker" aria-label="Dodaj reakcję">＋</button><span class="chat-reaction-picker">'+picker+'</span></div><div class="bubble-actions">'+
      (mine?'<button type="button" class="msg-action" data-global-action="edit" data-id="'+item.id+'">Edytuj</button><button type="button" class="msg-action danger" data-global-action="delete" data-id="'+item.id+'">Usuń</button>':'<button type="button" class="msg-action" data-global-action="report" data-id="'+item.id+'" data-user="'+item.sender_id+'">Zgłoś</button>')+
      '<button type="button" class="msg-action" data-global-action="reply" data-id="'+item.id+'">Odpowiedz</button>'+pinAction+'<button type="button" class="msg-action'+(likes.liked?' liked':'')+'" data-global-action="like" data-id="'+item.id+'">♥ '+likes.count+'</button></div></article>';
  }).join("");
  const tabs='<div class="chat-room-tabs"><button type="button" class="chat-room-tab'+(!activeGlobalRoomId?' active':'')+'" data-chat-room="">🌐 Ogólny</button>'+rooms.map(r=>'<button type="button" class="chat-room-tab'+(r.id===activeGlobalRoomId?' active':'')+'" data-chat-room="'+r.id+'">'+escapeHTML(r.icon)+' '+escapeHTML(r.name)+'</button>').join("")+'</div>';
  const room=rooms.find(r=>r.id===activeGlobalRoomId);
  $("page-content").innerHTML='<div class="global-chat-head"><button type="button" class="chat-back" id="global-chat-back">‹</button><div><strong>'+(room?escapeHTML(room.icon+" "+room.name):"Czat ogólny")+'</strong><small>'+(room?escapeHTML(room.description):"Rozmowa wszystkich użytkowników")+'</small></div></div>'+tabs+
    '<div class="global-chat-notice">Rozmawiaj z szacunkiem. Nie publikuj danych osobowych.</div>'+pinnedMessagesHTML(activeGlobalPins, "data-global-action", { variant: "global", canManage: isAdmin, title: "Przypięte wiadomości" })+'<div class="chat-search-box global-search-box"><span class="chat-search-icon" aria-hidden="true">⌕</span><input id="global-chat-search" class="chat-search-input" type="search" maxlength="80" placeholder="Szukaj w wiadomościach…" aria-label="Szukaj w wiadomościach"><button type="button" class="chat-search-clear" aria-label="Wyczyść wyszukiwanie" hidden>×</button></div><div class="global-chat-messages" id="global-chat-messages">'+(rows||'<p class="global-chat-empty">Nie ma jeszcze wiadomości. Napisz pierwszą!</p>')+'</div>'+
    (currentMute?'<div class="global-chat-muted">Wysyłanie wiadomości jest tymczasowo wyłączone.<br>Powód: '+escapeHTML(currentMute.reason)+'<br>Do: '+escapeHTML(formatModerationExpiry(currentMute.expires_at))+'</div>':'<form class="global-chat-composer" id="global-chat-form"><div id="global-reply-hint" class="chat-reply-hint hidden"></div><input id="global-chat-input" maxlength="500" autocomplete="off" placeholder="Napisz na czacie…"><button type="submit" aria-label="Wyślij">➤</button></form>');
  $("global-chat-back").addEventListener("click",renderChatList);
  bindMessageSearch("global-chat-search", "global-chat-messages", ".global-message");
  $("page-content").querySelectorAll("[data-chat-room]").forEach(b=>b.addEventListener("click",()=>openGlobalChat(b.dataset.chatRoom||null)));
  $("page-content").querySelectorAll("[data-global-action]").forEach(button=>button.addEventListener("click",async()=>{
    const id=button.dataset.id,action=button.dataset.globalAction,message=byId.get(id);
    if(action==="toggle-picker"){button.parentElement.classList.toggle("show-picker");return;}
    if(action==="toggle-pin"){await toggleCommunityChatPin("global",id,button.dataset.pinId||null);return;}
    if(action==="remove-pin"){await toggleCommunityChatPin("global",null,button.dataset.pinId);return;}
    if(action==="react"){
      const emoji=button.dataset.emoji,exists=(reactionRows||[]).some(r=>r.message_id===id&&r.user_id===currentUser.id&&r.emoji===emoji);
      const result=exists?await supabaseClient.from("global_chat_message_reactions").delete().eq("message_id",id).eq("user_id",currentUser.id).eq("emoji",emoji):await supabaseClient.from("global_chat_message_reactions").insert({message_id:id,user_id:currentUser.id,emoji});
      if(result.error)return alert("Nie udało się dodać reakcji.");await openGlobalChat(activeGlobalRoomId);
    }else if(action==="report"){
      const ok=await submitContentReport("message",id,button.dataset.user,"");if(ok){button.textContent="Zgłoszono";button.disabled=true;}
    }else if(action==="reply"){
      replyToMessageId=id;const input=$("global-chat-input");if(input){input.placeholder="Odpowiedź na wiadomość…";input.focus();}
      const hint=$("global-reply-hint");if(hint){hint.textContent="Odpowiadasz: "+(message?.content||"").slice(0,90);hint.classList.remove("hidden");}
    }else if(action==="edit"){
      const value=prompt("Edytuj wiadomość:",message?.content||"");if(value===null)return;const content=value.trim().slice(0,500);if(!content)return alert("Wiadomość nie może być pusta.");
      const {error}=await supabaseClient.from("global_chat_messages").update({content,edited_at:new Date().toISOString()}).eq("id",id).eq("sender_id",currentUser.id);
      if(error)return alert("Nie udało się edytować wiadomości.");await openGlobalChat(activeGlobalRoomId);
    }else if(action==="delete"){
      if(!confirm("Usunąć tę wiadomość?"))return;const {error}=await supabaseClient.from("global_chat_messages").delete().eq("id",id).eq("sender_id",currentUser.id);
      if(error)return alert("Nie udało się usunąć wiadomości.");await openGlobalChat(activeGlobalRoomId);
    }else if(action==="like"){
      const liked=likeMap.get(id)?.liked,result=liked?await supabaseClient.from("global_chat_message_likes").delete().eq("message_id",id).eq("user_id",currentUser.id):await supabaseClient.from("global_chat_message_likes").insert({message_id:id,user_id:currentUser.id});
      if(result.error)return alert("Nie udało się zmienić polubienia.");await openGlobalChat(activeGlobalRoomId);
    }
  }));
  if(!currentMute)$("global-chat-form").addEventListener("submit",async event=>{
    event.preventDefault();const input=$("global-chat-input"),content=input.value.trim();if(!content)return;const button=event.currentTarget.querySelector("button");button.disabled=true;
    const {error:sendError}=await supabaseClient.from("global_chat_messages").insert({sender_id:currentUser.id,content,reply_to_id:replyToMessageId,room_id:activeGlobalRoomId});
    button.disabled=false;if(sendError){console.error("Global chat send error:",sendError);alert("Nie udało się wysłać wiadomości. Możliwe, że obowiązuje wyciszenie.");return;}
    replyToMessageId=null;input.value="";await openGlobalChat(activeGlobalRoomId);
  });
  const box=$("global-chat-messages");if(box)box.scrollTop=box.scrollHeight;
  globalChatChannel=supabaseClient.channel("global-chat-live").on("postgres_changes",{event:"*",schema:"public",table:"global_chat_messages"},async()=>{if($("global-chat-messages"))await openGlobalChat(activeGlobalRoomId);}).on("postgres_changes",{event:"*",schema:"public",table:"global_chat_message_reactions"},async()=>{if($("global-chat-messages"))await openGlobalChat(activeGlobalRoomId);}).on("postgres_changes",{event:"*",schema:"public",table:"community_chat_pins"},async()=>{if($("global-chat-messages"))await openGlobalChat(activeGlobalRoomId);}).subscribe();
}

async function loadConversationMessages(conversationId) {
  const { data, error } = await supabaseClient.from("messages")
    .select("id,conversation_id,sender_id,content,created_at,edited_at,reply_to_id")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(200);
  if (error) {
    console.error("Messages load error:", error);
    return [];
  }
  const rows = data || [];
  const ids = rows.map(item => item.id);
  chatMessageLikesCache = new Map();
  chatMessageReactionsCache = new Map();
  if (ids.length) {
    const [{data:likeRows,error:likeError},{data:reactionRows,error:reactionError}] = await Promise.all([
      supabaseClient.from("message_likes").select("message_id,user_id").in("message_id",ids),
      supabaseClient.from("message_reactions").select("message_id,user_id,emoji").in("message_id",ids)
    ]);
    if (likeError) console.warn("Message likes load error:",likeError);
    if (reactionError) console.warn("Message reactions load error:",reactionError);
    (likeRows || []).forEach(row => {
      const item = chatMessageLikesCache.get(row.message_id) || {count:0,liked:false};
      item.count++; if (row.user_id === currentUser.id) item.liked = true;
      chatMessageLikesCache.set(row.message_id,item);
    });
    (reactionRows || []).forEach(row => {
      const byEmoji=chatMessageReactionsCache.get(row.message_id)||new Map();
      const item=byEmoji.get(row.emoji)||{count:0,reacted:false};
      item.count++; if(row.user_id===currentUser.id)item.reacted=true;
      byEmoji.set(row.emoji,item); chatMessageReactionsCache.set(row.message_id,byEmoji);
    });
  }
  return rows;
}

async function loadCommunityChatPins(chatType, conversationId = null, roomId = null) {
  let query = supabaseClient.from("community_chat_pins")
    .select("id,message_id,pinned_by,created_at")
    .eq("chat_type", chatType)
    .order("created_at", { ascending: false })
    .limit(5);
  if (chatType === "private") query = query.eq("conversation_id", conversationId);
  else query = roomId ? query.eq("room_id", roomId) : query.is("room_id", null);
  const { data: pins, error } = await query;
  if (error) {
    console.warn("Pinned messages load error:", error);
    return [];
  }
  if (!pins?.length) return [];
  const table = chatType === "private" ? "messages" : "global_chat_messages";
  const { data: messages, error: messageError } = await supabaseClient.from(table)
    .select("id,sender_id,content,created_at")
    .in("id", pins.map(pin => pin.message_id));
  if (messageError) {
    console.warn("Pinned message content load error:", messageError);
    return [];
  }
  const byId = new Map((messages || []).map(message => [message.id, message]));
  const rows = pins.map(pin => ({ ...pin, message: byId.get(pin.message_id) })).filter(pin => pin.message);
  await loadProfilesByIds(rows.map(pin => pin.message.sender_id));
  return rows;
}

function pinnedMessagesHTML(pins, actionAttribute, options = {}) {
  if (!pins?.length) return "";
  const globalStyle = options.variant === "global";
  const canManage = options.canManage !== false;
  const title = options.title || "Przypięte wiadomości";
  const items = pins.map(pin => {
    const profile = pin.message.sender_id === currentUser.id ? getMyProfile() : getProfileById(pin.message.sender_id);
    const author = profile?.nickname || "Użytkownik";
    const unpin = canManage
      ? '<button type="button" class="chat-unpin-btn" ' + actionAttribute + '="remove-pin" data-pin-id="' + escapeHTML(pin.id) + '" aria-label="Odepnij wiadomość" title="Odepnij wiadomość">×</button>'
      : '';
    return '<article class="chat-pinned-item"><div class="chat-pinned-copy"><strong>' + escapeHTML(author) + '</strong><span>' + escapeHTML(pin.message.content.slice(0, 150)) + '</span></div>' + unpin + '</article>';
  }).join("");
  if (globalStyle) {
    return '<section class="chat-pinned-list global-chat-pinned" aria-label="Przypięte wiadomości"><div class="chat-pinned-title"><span class="global-pinned-heading"><span class="global-pinned-icon">📌</span><span><strong>' + escapeHTML(title) + '</strong><small>Ważne informacje na tym czacie</small></span></span><small class="global-pinned-count">' + pins.length + '</small></div><div class="global-pinned-items">' + items + '</div></section>';
  }
  return '<section class="chat-pinned-list"><div class="chat-pinned-title"><span>📌 ' + escapeHTML(title) + '</span><small>' + pins.length + '/5</small></div>' + items + '</section>';
}

async function toggleCommunityChatPin(chatType, messageId = null, pinId = null) {
  let result;
  if (pinId) {
    result = await supabaseClient.from("community_chat_pins").delete().eq("id", pinId);
  } else {
    const payload = {
      chat_type: chatType,
      message_id: messageId,
      pinned_by: currentUser.id
    };
    if (chatType === "private") payload.conversation_id = activeConversationId;
    else payload.room_id = activeGlobalRoomId;
    result = await supabaseClient.from("community_chat_pins").insert(payload);
  }
  if (result.error) {
    console.error("Pin message error:", result.error);
    alert(result.error.code === "23505" ? "Ta wiadomość jest już przypięta." : "Nie udało się zmienić przypiętej wiadomości.");
    return;
  }
  if (chatType === "private") await openChat(activeConversationId);
  else await openGlobalChat(activeGlobalRoomId);
}

function messageBubbleHTML(message, allMessages = []) {
  const mine = message.sender_id === currentUser.id;
  const profile = mine ? getMyProfile() : getProfileById(message.sender_id);
  const sender = profile || { nickname: "Uczeń", photo: "" };
  const senderBadge = (mine ? isAdmin : sender.isAdmin)
    ? '<span class="user-role-badge admin-role">ADMIN</span>'
    : sender.badge === "premium" ? '<span class="user-role-badge premium-role">PREMIUM</span>' : "";
  const alreadyReported = reportedMessageIdsCache.includes(message.id);
  const likes = chatMessageLikesCache.get(message.id) || {count:0,liked:false};
  const reactions = chatMessageReactionsCache.get(message.id) || new Map();
  const reactionChips = [...reactions.entries()].map(([emoji,v]) => '<button type="button" class="chat-reaction'+(v.reacted?' active':'')+'" data-action="react-msg" data-msg-id="'+escapeHTML(message.id)+'" data-emoji="'+emoji+'">'+emoji+' '+v.count+'</button>').join("");
  const reactionPicker = ['👍','❤️','😂','🔥','👏','😮'].map(emoji => '<button type="button" class="chat-reaction-pick" data-action="react-msg" data-msg-id="'+escapeHTML(message.id)+'" data-emoji="'+emoji+'">'+emoji+'</button>').join("");
  const parent = allMessages.find(item => item.id === message.reply_to_id);
  const currentPin = activePrivatePins.find(pin => pin.message_id === message.id);
  const pinAction = '<button type="button" class="msg-action pin-msg-action" data-action="toggle-pin-msg" data-msg-id="' + escapeHTML(message.id) + '" data-pin-id="' + escapeHTML(currentPin?.id || "") + '">' + (currentPin ? '📌 Odpnij' : '📌 Przypnij') + '</button>';
  const actions = '<div class="bubble-actions">' +
    (mine
      ? '<button type="button" class="msg-action" data-action="edit-msg" data-msg-id="' + escapeHTML(message.id) + '">Edytuj</button><button type="button" class="msg-action danger" data-action="delete-msg" data-msg-id="' + escapeHTML(message.id) + '">Usuń</button>'
      : (alreadyReported ? '<span class="chat-reported">Zgłoszono</span>' : '<button type="button" class="msg-action" data-action="report-msg" data-msg-id="' + escapeHTML(message.id) + '" data-sender-id="' + escapeHTML(message.sender_id) + '">Zgłoś</button>') +
        '<button type="button" class="msg-action" data-action="block-person" data-person-id="' + escapeHTML(message.sender_id) + '">Blokuj</button>') +
    '<button type="button" class="msg-action" data-action="reply-msg" data-msg-id="' + escapeHTML(message.id) + '">Odpowiedz</button>' +
    pinAction +
    '<button type="button" class="msg-action' + (likes.liked ? ' liked' : '') + '" data-action="like-msg" data-msg-id="' + escapeHTML(message.id) + '">♥ ' + likes.count + '</button></div>';
  return '<div class="chat-row' + (mine ? ' mine' : '') + '"><div class="bubble">' +
    (parent ? '<div class="bubble-reply-context">↳ ' + escapeHTML(parent.content.slice(0,100)) + '</div>' : '') +
    '<div class="bubble-text" data-msg-id="' + escapeHTML(message.id) + '"></div>' +
    '<div class="bubble-time">' + formatTime(new Date(message.created_at).getTime()) + (message.edited_at ? ' · edytowano' : '') + '</div>' +
    '<div class="chat-reaction-row">'+reactionChips+'<button type="button" class="chat-reaction-add" data-action="toggle-reaction-picker" aria-label="Dodaj reakcję">＋</button><span class="chat-reaction-picker">'+reactionPicker+'</span></div>' +
    actions + '</div></div>';
}

function renderMessages(messages) {
  const container = $("chat-msgs");
  if (!container) return;
  let previousDay = "";
  const timeline = messages.map(message => {
    const date = new Date(message.created_at);
    const dayKey = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    let divider = "";
    if (dayKey !== previousDay) {
      previousDay = dayKey;
      divider = '<div class="chat-date-divider"><span>' + escapeHTML(formatChatDateLabel(message.created_at)) + '</span></div>';
    }
    return divider + messageBubbleHTML(message, messages);
  }).join("");
  container.innerHTML = pinnedMessagesHTML(activePrivatePins, "data-action") + (timeline
    ? timeline
    : '<div class="telegram-message-empty"><span>✦</span><strong>To początek Waszej rozmowy</strong><small>Napisz pierwszą wiadomość.</small></div>');
  messages.forEach(message => {
    const element = container.querySelector('.bubble-text[data-msg-id="' + CSS.escape(message.id) + '"]');
    if (element) element.textContent = message.content;
  });
  container.querySelectorAll("[data-action]").forEach(button => button.addEventListener("click", async () => {
    const action = button.dataset.action, id = button.dataset.msgId;
    if (action === "toggle-reaction-picker") {
      button.parentElement.classList.toggle("show-picker");
    } else if (action === "toggle-pin-msg") {
      await toggleCommunityChatPin("private", id, button.dataset.pinId || null);
    } else if (action === "remove-pin") {
      await toggleCommunityChatPin("private", null, button.dataset.pinId);
    } else if (action === "report-msg") {
      const reason = "";
      const ok = await submitContentReport("message", id, button.dataset.senderId, reason);
      if (ok) { reportedMessageIdsCache.push(id); button.textContent = "Zgłoszono"; button.disabled = true; }
    } else if (action === "block-person") {
      await blockUser(button.dataset.personId); await openChat(activeConversationId);
    } else if (action === "reply-msg") {
      replyToMessageId = id;
      const input = $("chat-input");
      if (input) { input.placeholder = "Odpowiedź na wiadomość…"; input.focus(); }
      const hint = $("char-hint"); if (hint) hint.textContent = "Odpowiadasz na wybraną wiadomość";
    } else if (action === "edit-msg") {
      const current = messages.find(item => item.id === id);
      const value = prompt("Edytuj wiadomość:", current?.content || "");
      if (value === null) return;
      const content = value.trim().slice(0,MAX_MESSAGE_LENGTH);
      if (!content) return alert("Wiadomość nie może być pusta.");
      const {error} = await supabaseClient.from("messages").update({content,edited_at:new Date().toISOString()}).eq("id",id).eq("sender_id",currentUser.id);
      if (error) return alert("Nie udało się edytować wiadomości.");
      await openChat(activeConversationId);
    } else if (action === "delete-msg") {
      if (!confirm("Usunąć tę wiadomość?")) return;
      const {error} = await supabaseClient.from("messages").delete().eq("id",id).eq("sender_id",currentUser.id);
      if (error) return alert("Nie udało się usunąć wiadomości.");
      await openChat(activeConversationId);
    } else if (action === "react-msg") {
      const emoji=button.dataset.emoji;
      const existing=chatMessageReactionsCache.get(id)?.get(emoji)?.reacted;
      const result=existing
        ? await supabaseClient.from("message_reactions").delete().eq("message_id",id).eq("user_id",currentUser.id).eq("emoji",emoji)
        : await supabaseClient.from("message_reactions").insert({message_id:id,user_id:currentUser.id,emoji});
      if(result.error)return alert("Nie udało się dodać reakcji.");
      await openChat(activeConversationId);
    } else if (action === "like-msg") {
      const existing = chatMessageLikesCache.get(id)?.liked;
      const result = existing
        ? await supabaseClient.from("message_likes").delete().eq("message_id",id).eq("user_id",currentUser.id)
        : await supabaseClient.from("message_likes").insert({message_id:id,user_id:currentUser.id});
      if (result.error) return alert("Nie udało się zmienić polubienia.");
      await openChat(activeConversationId);
    }
  }));
  requestAnimationFrame(() => { container.scrollTop = container.scrollHeight; });
}

async function openChat(conversationId) {
  if (chatListChannel) {
    await supabaseClient.removeChannel(chatListChannel);
    chatListChannel = null;
  }
  if (activeChatChannel) {
    await supabaseClient.removeChannel(activeChatChannel);
    activeChatChannel = null;
  }
  const { data: conversation, error } = await supabaseClient.from("conversations")
    .select("id,user_one,user_two")
    .eq("id", conversationId).single();
  if (error || !conversation) {
    console.error("Open conversation error:", error);
    await renderChatList();
    return;
  }
  activeConversationId = conversationId;
  const otherId = conversation.user_one === currentUser.id ? conversation.user_two : conversation.user_one;
  await loadProfilesByIds([otherId]);
  activeChatProfile = getProfileById(otherId) || { id: otherId, nickname: "Uczeń", photo: "" };
  await loadBlockedUsers();
  const blocked = isBlocked(otherId);
  const { data: canSendResult, error: canSendError } = await supabaseClient.rpc("can_send_message", {
    p_conversation_id: conversationId
  });
  const canSend = !canSendError && canSendResult === true;

  $("page-content").innerHTML = `
    <div class="chat-head telegram-chat-head">
      <button type="button" class="chat-back" id="chat-back" aria-label="Powrót do rozmów">‹</button>
      ${profileAvatarHTML(activeChatProfile, "conv-avatar small")}
      <div class="chat-head-info">
        <div class="chat-head-nick">${escapeHTML(activeChatProfile.nickname)}${activeChatProfile.isAdmin ? '<span class="user-role-badge admin-role">ADMIN</span>' : activeChatProfile.badge === "premium" ? '<span class="user-role-badge premium-role">PREMIUM</span>' : ""}</div>
        <div class="chat-head-status">Prywatna rozmowa · tylko tekst</div>
      </div>
      <button type="button" class="chat-block-btn" id="chat-block">${blocked ? "Odblokuj" : "Blokuj"}</button>
    </div>
    <div class="chat-search-box telegram-message-search">
      <span class="chat-search-icon" aria-hidden="true">⌕</span>
      <input id="private-chat-search" class="chat-search-input" type="search" maxlength="80" placeholder="Szukaj w rozmowie…" aria-label="Szukaj w rozmowie">
      <button type="button" class="chat-search-clear" aria-label="Wyczyść wyszukiwanie" hidden>×</button>
    </div>
    <div class="chat-msgs telegram-chat-msgs" id="chat-msgs"></div>
    ${blocked
      ? '<div class="page-content"><p>Ten użytkownik jest zablokowany. Odblokuj go, aby ponownie wysyłać wiadomości.</p></div>'
      : !canSend
        ? '<div class="page-content"><p>Wiadomości w tej rozmowie są obecnie niedostępne.</p></div>'
        : `
      <div class="composer-wrap">
        <form class="chat-composer" id="chat-form">
          <textarea id="chat-input" class="chat-input telegram-chat-input" rows="1" maxlength="${MAX_MESSAGE_LENGTH}"
            placeholder="Napisz wiadomość..." autocomplete="off"></textarea>
          <button class="chat-send" type="submit" aria-label="Wyślij">➤</button>
        </form>
        <div class="char-hint" id="char-hint">0 / ${MAX_MESSAGE_LENGTH}</div>
      </div>`}
  `;

  $("chat-back").addEventListener("click", () => renderChatList());
  bindMessageSearch("private-chat-search", "chat-msgs", ".chat-row");
  $("chat-block").addEventListener("click", async () => {
    if (isBlocked(otherId)) await unblockUser(otherId);
    else await blockUser(otherId);
    await openChat(conversationId);
  });

  const messages = await loadConversationMessages(conversationId);
  await loadProfilesByIds(messages.map(message=>message.sender_id));
  activePrivatePins = await loadCommunityChatPins("private", conversationId);
  renderMessages(messages);

  if (canSend) bindComposer(conversationId);

  await supabaseClient.from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("user_id", currentUser.id)
    .eq("type", "message")
    .eq("related_id", conversationId)
    .is("read_at", null);
  await loadNotifications();

  activeChatChannel = supabaseClient.channel("messages-" + conversationId)
    .on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "messages",
      filter: "conversation_id=eq." + conversationId
    }, async () => {
      const fresh = await loadConversationMessages(conversationId);
      renderMessages(fresh);
      await loadNotifications();
    })
    .on("postgres_changes", {
      event: "*", schema: "public", table: "message_reactions"
    }, async () => {
      if (activeConversationId !== conversationId) return;
      const fresh = await loadConversationMessages(conversationId);
      renderMessages(fresh);
    })
    .on("postgres_changes", {
      event: "*", schema: "public", table: "community_chat_pins",
      filter: "conversation_id=eq." + conversationId
    }, async () => {
      if (activeConversationId !== conversationId) return;
      activePrivatePins = await loadCommunityChatPins("private", conversationId);
      const fresh = await loadConversationMessages(conversationId);
      renderMessages(fresh);
    })
    .subscribe();
}

function bindComposer(conversationId) {
  const form = $("chat-form");
  const input = $("chat-input");
  const hint = $("char-hint");
  input.addEventListener("input", () => {
    hint.textContent = input.value.length + " / " + MAX_MESSAGE_LENGTH;
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 120) + "px";
  });
  input.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const content = input.value.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!content) return;
    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    const { error } = await supabaseClient.from("messages").insert({
      conversation_id: conversationId,
      sender_id: currentUser.id,
      content,
      reply_to_id: replyToMessageId
    });
    button.disabled = false;
    if (error) {
      console.error("Send message error:", error);
      alert("Nie udało się wysłać wiadomości. Sprawdź, czy rozmowa nie jest zablokowana.");
      return;
    }
    input.value = "";
    input.style.height = "44px";
    replyToMessageId = null;
    input.placeholder = "Napisz wiadomość...";
    hint.textContent = "0 / " + MAX_MESSAGE_LENGTH;
    const fresh = await loadConversationMessages(conversationId);
    renderMessages(fresh);
    await loadNotifications();
    input.focus();
  });
}

async function renderUpdatesPage() {
  const host = $("page-content");
  const { data: releases, error } = await supabaseClient.from("community_updates")
    .select("id,version,title,details,published_at")
    .order("published_at", { ascending: false })
    .limit(100);
  if (error) {
    console.error("Updates load error:", error);
    host.innerHTML = '<div class="page-content"><h3>Updates</h3><p>Nie udało się załadować historii aktualizacji. Spróbuj ponownie później.</p></div>';
    return;
  }
  const cards = (releases || []).map(release => {
    const date = new Date(release.published_at).toLocaleDateString("pl-PL", {day:"2-digit",month:"2-digit",year:"numeric"});
    const details = Array.isArray(release.details) ? release.details : [];
    return '<article class="updates-release-card"><div class="updates-release-meta"><span>'+escapeHTML(date)+'</span><span>'+escapeHTML(release.version)+'</span></div><h3>'+escapeHTML(release.title)+'</h3><ul>'+details.map(item=>'<li>'+escapeHTML(String(item))+'</li>').join("")+'</ul></article>';
  }).join("");
  host.innerHTML = '<section class="updates-hero"><span class="updates-kicker">ZSPM COMMUNITY</span><h2>Updates</h2><p>Tutaj znajdziesz historię nowych funkcji, poprawek i zmian w aplikacji.</p></section><div class="updates-release-list">'+(cards || '<div class="community-empty-state"><strong>Brak aktualizacji</strong><small>Nowości pojawią się tutaj po publikacji.</small></div>')+'</div><p class="updates-footnote">Historia jest zapisywana na serwerze i pozostaje dostępna po ponownym uruchomieniu aplikacji.</p>';
  const { error: readError } = await supabaseClient.from("notifications").update({read_at:new Date().toISOString()})
    .eq("user_id",currentUser.id).eq("type","app_update").is("read_at",null);
  if (readError) console.error("Update notifications read error:", readError);
  await loadNotifications();
}

async function renderHomeOverview() {
 const host=document.getElementById("home-recent-updates");
 const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=Number.isFinite(v)?v.toLocaleString("pl-PL"):"—";};
 if(!supabaseClient)return;
 const [u,p,pl,m,g,gm]=await Promise.all([
  supabaseClient.from("community_updates").select("id,version,title,details,published_at").order("published_at",{ascending:false}).limit(3),
  supabaseClient.from("public_profiles").select("id",{count:"exact",head:true}),
  supabaseClient.from("community_polls").select("id",{count:"exact",head:true}),
  supabaseClient.from("messages").select("id",{count:"exact",head:true}),
  supabaseClient.from("global_chat_messages").select("id",{count:"exact",head:true}),
  supabaseClient.from("community_group_messages").select("id",{count:"exact",head:true})
 ]);
 if(host){if(u.error)host.innerHTML='<div class="home-overview-empty">Nie udało się pobrać aktualizacji.</div>';else if(!(u.data||[]).length)host.innerHTML='<div class="home-overview-empty">Nowości pojawią się tutaj po publikacji.</div>';else host.innerHTML=u.data.map((x,i)=>{const d=x.published_at?new Date(x.published_at).toLocaleDateString("pl-PL",{day:"2-digit",month:"short",year:"numeric"}):"";const detail=Array.isArray(x.details)?x.details[0]:"";return '<button type="button" class="home-update-item" data-page="updates"><span class="home-update-icon">'+(i===0?"✦":"↗")+'</span><span class="home-update-copy"><span class="home-update-meta"><i>Nowość</i><time>'+escapeHTML(d)+'</time></span><strong>'+escapeHTML(x.title||("Wersja "+(x.version||"")))+'</strong><small>'+escapeHTML(String(detail||("Wersja "+(x.version||"")+" — zobacz szczegóły aktualizacji.")))+'</small></span><span class="home-update-arrow">›</span></button>';}).join("");}
 set("home-stat-users",p.error?NaN:(p.count??NaN));set("home-stat-polls",pl.error?NaN:(pl.count??NaN));const ms=[m,g,gm];set("home-stat-messages",ms.every(x=>!x.error&&Number.isFinite(x.count))?ms.reduce((a,x)=>a+x.count,0):NaN);
}

async function loadNotifications() {
  if (!currentUser?.id) return [];
  const { data, error } = await supabaseClient.from("notifications")
    .select("id,type,title,body,related_user_id,related_id,read_at,created_at")
    .eq("user_id", currentUser.id)
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) {
    console.error("Notifications load error:", error);
    return notificationsCache;
  }
  notificationsCache = data || [];
  updateNotifBadge();
  updateHomeUnreadBadges();
  return notificationsCache;
}

function unreadNotificationCount(type, relatedId) {
  return notificationsCache.filter(item => !item.read_at && item.type === type && (!relatedId || item.related_id === relatedId)).length;
}

function updateHomeUnreadBadges() {
  const counts = {chat:unreadNotificationCount("message"),groups:unreadNotificationCount("group_message"),polls:unreadNotificationCount("new_poll")+unreadNotificationCount("poll_vote"),updates:unreadNotificationCount("app_update")};
  document.querySelectorAll("[data-unread-page]").forEach(badge => {
    const count = counts[badge.dataset.unreadPage] || 0;
    badge.textContent = count > 99 ? "99+" : String(count);
    badge.classList.toggle("is-visible",count>0);
    badge.setAttribute("aria-label",count ? count+" nieprzeczytanych" : "Brak nieprzeczytanych");
  });
}

function updateNotifBadge() {
  const badge = $("notif-badge");
  if (!badge) return;
  const count = notificationsCache.filter(item => !item.read_at).length;
  if (count > 0) {
    badge.textContent = count > 9 ? "9+" : String(count);
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}

async function renderNotificationsPage() {
  await loadNotifications();
  const items = notificationsCache.map(item => {
    const date = new Date(item.created_at).toLocaleString("pl-PL", {
      day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit"
    });
    return `
      <button type="button" class="conv-item notification-item${item.read_at ? "" : " unread"}"
        data-notification-id="${escapeHTML(item.id)}" data-type="${escapeHTML(item.type)}"
        data-related-id="${escapeHTML(item.related_id || "")}">
        <div class="conv-info">
          <div class="conv-nick">${escapeHTML(item.title)}</div>
          <div class="conv-last">${escapeHTML(item.body || "")}</div>
          <div class="section-sub">${escapeHTML(date)}</div>
        </div>
      </button>`;
  }).join("");
  $("page-content").innerHTML = `
    <div class="page-content notif-page-head">
      <div><h3>Powiadomienia</h3><p>Zaproszenia, wiadomości i aktywność w społeczności.</p></div>
      <button type="button" class="secondary-btn" id="mark-all-notifications">Oznacz wszystkie jako przeczytane</button>
    </div>
    <div class="conv-list">${items || '<div class="page-content"><p>Nie masz jeszcze powiadomień.</p></div>'}</div>
  `;
  const markAll = $("mark-all-notifications");
  if (markAll) markAll.addEventListener("click", async () => {
    markAll.disabled = true;
    const {error} = await supabaseClient.from("notifications").update({read_at:new Date().toISOString()})
      .eq("user_id",currentUser.id).is("read_at",null);
    if (error) alert("Nie udało się zaktualizować powiadomień.");
    await renderNotificationsPage();
  });
  $("page-content").querySelectorAll("[data-notification-id]").forEach(button => {
    button.addEventListener("click", async () => {
      const notification = notificationsCache.find(item => item.id === button.dataset.notificationId);
      if (!notification) return;
      if (!notification.read_at) {
        await supabaseClient.from("notifications").update({ read_at: new Date().toISOString() })
          .eq("id", notification.id).eq("user_id", currentUser.id);
      }
      await loadNotifications();
      if (notification.type === "message" && notification.related_id) {
        await openPage("chat");
        await openChat(notification.related_id);
      } else if (notification.type === "group_message" && notification.related_id) {
        await openPage("groups");
        await openCommunityGroupChat(notification.related_id);
      } else if (notification.type === "new_poll" || notification.type === "poll_vote") {
        await openPage("polls");
      } else if (notification.type === "app_update") {
        await openPage("updates");
      } else if (notification.type === "friend_request" || notification.type === "friend_accepted") {
        await openPage("friends");
      } else if (notification.type === "event" || notification.type === "announcement") {
        await openPage(notification.type === "event" ? "events" : "announcements");
      } else {
        await openPage("profiles");
      }
    });
  });
}

async function setupRealtimeSubscriptions() {
  if (notificationsChannel) {
    await supabaseClient.removeChannel(notificationsChannel);
    notificationsChannel = null;
  }
  if (friendsChannel) {
    await supabaseClient.removeChannel(friendsChannel);
    friendsChannel = null;
  }
  if (socialChannel) {
    await supabaseClient.removeChannel(socialChannel);
    socialChannel = null;
  }
  if (feedChannel) {
    await supabaseClient.removeChannel(feedChannel);
    feedChannel = null;
  }
  if (presenceChannel) { await supabaseClient.removeChannel(presenceChannel); presenceChannel = null; }
  onlineUsers = new Set();
  presenceChannel = supabaseClient.channel("community-presence", {config:{presence:{key:currentUser.id}}})
    .on("presence", {event:"sync"}, () => {
      const state = presenceChannel?.presenceState?.() || {};
      onlineUsers = new Set(Object.keys(state));
      document.querySelectorAll("[data-author-presence-user]").forEach(node => {
        const online = onlineUsers.has(node.dataset.authorPresenceUser);
        node.classList.toggle("is-online",online);
        node.classList.toggle("is-offline",!online);
        node.setAttribute("aria-label",online?"Online":"Offline");
        node.title = online ? "Online" : "Offline";
      });
      document.querySelectorAll("[data-presence-user]").forEach(node => {
        const mode = node.dataset.statusMode || "online";
        const online = mode === "invisible" ? false : onlineUsers.has(node.dataset.presenceUser);
        node.classList.toggle("is-online", mode === "online" && online);
        node.classList.toggle("is-offline", mode === "online" && !online || mode === "invisible");
        node.classList.toggle("is-dnd", mode === "dnd");
        node.classList.toggle("is-busy", mode === "busy");
        const label = mode === "dnd" ? "Nie przeszkadzać" : mode === "busy" ? "Zajęty" : online ? "Online" : "Offline";
        if (node.lastChild) node.lastChild.textContent = label;
      });
    })
    .subscribe(async status => {
      if (status === "SUBSCRIBED" && currentUser?.id) {
        const {error} = await presenceChannel.track({user_id:currentUser.id,online_at:new Date().toISOString()});
        if (error) console.warn("Presence tracking failed:",error);
      }
    });
  notificationsChannel = supabaseClient.channel("notifications-" + currentUser.id)
    .on("postgres_changes", {
      event: "*", schema: "public", table: "notifications",
      filter: "user_id=eq." + currentUser.id
    }, () => loadNotifications())
    .subscribe();

  friendsChannel = supabaseClient.channel("friends-" + currentUser.id)
    .on("postgres_changes", { event: "*", schema: "public", table: "friend_requests" }, async () => {
      await loadFriendsData();
      const pageTitle = document.querySelector("#page-title")?.textContent;
      if (pageTitle === "Znajomi") await renderFriendsPage();
      if (pageTitle === "Ankiety uczniów") {
        await loadBlockedUsers();
        await loadProfileSocialData([currentUser.id, ...publicProfilesCache.map(item => item.id)]);
        $("page-content").innerHTML = renderProfilesPage();
        bindProfilesPage();
      }
    })
    .on("postgres_changes", { event: "*", schema: "public", table: "friendships" }, async () => {
      await loadFriendsData();
      const pageTitle = document.querySelector("#page-title")?.textContent;
      if (pageTitle === "Znajomi") await renderFriendsPage();
      if (pageTitle === "Ankiety uczniów") {
        await loadBlockedUsers();
        await loadProfileSocialData([currentUser.id, ...publicProfilesCache.map(item => item.id)]);
        $("page-content").innerHTML = renderProfilesPage();
        bindProfilesPage();
      }
    })
    .subscribe();

  socialChannel = supabaseClient.channel("profile-social-" + currentUser.id)
    .on("postgres_changes", { event: "*", schema: "public", table: "profile_likes" }, async () => {
      if (document.querySelector("#page-title")?.textContent === "Ankiety uczniów") {
        await loadProfileSocialData([currentUser.id, ...publicProfilesCache.map(item => item.id)]);
        $("page-content").innerHTML = renderProfilesPage();
        bindProfilesPage();
      }
    })
    .on("postgres_changes", { event: "*", schema: "public", table: "profile_comments" }, async () => {
      if (document.querySelector("#page-title")?.textContent === "Ankiety uczniów") {
        await loadProfileSocialData([currentUser.id, ...publicProfilesCache.map(item => item.id)]);
        $("page-content").innerHTML = renderProfilesPage();
        bindProfilesPage();
      }
    })
    .subscribe();

  feedChannel = supabaseClient.channel("community-feed-live")
    .on("postgres_changes", { event: "*", schema: "public", table: "community_forum_posts" }, () => {
      if (currentAppPage === "feed") renderCommunityFeedPage();
    })
    .on("postgres_changes", { event: "*", schema: "public", table: "community_ideas" }, () => {
      if (currentAppPage === "feed") renderCommunityFeedPage();
    })
    .on("postgres_changes", { event: "*", schema: "public", table: "community_events" }, () => {
      if (currentAppPage === "events") renderCommunityEventsPage();
      if (currentAppPage === "admin" && isAdmin) renderAdminPage();
    })
    .subscribe(status => {
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        console.warn("Community feed live updates unavailable:", status);
      }
    });
}


// COMMUNITY FEED — aggregates public forum topics and community ideas without a new table.
const FEED_TEXT = {
  pl:{intro:"Wszystko, co dzieje się w społeczności.",all:"Wszystko",forum:"Forum",ideas:"Pomysły",refresh:"Odśwież",loading:"Ładowanie aktywności...",empty:"Na razie jest tu spokojnie. Gdy pojawią się nowe wpisy, zobaczysz je tutaj.",error:"Nie udało się pobrać aktywności. Spróbuj ponownie.",topic:"Temat na forum",idea:"Nowy pomysł",openForum:"Otwórz forum",openIdeas:"Zobacz pomysły",student:"Uczeń",noDescription:"Bez dodatkowego opisu"},
  en:{intro:"Everything happening in the community.",all:"All",forum:"Forum",ideas:"Ideas",refresh:"Refresh",loading:"Loading activity...",empty:"It's quiet here for now. New posts will appear here.",error:"Could not load activity. Please try again.",topic:"Forum topic",idea:"New idea",openForum:"Open forum",openIdeas:"View ideas",student:"Student",noDescription:"No additional description"},
  ru:{intro:"Всё самое новое в нашем сообществе.",all:"Всё",forum:"Форум",ideas:"Идеи",refresh:"Обновить",loading:"Загружаем активность...",empty:"Пока здесь тихо. Новые публикации появятся здесь.",error:"Не удалось загрузить активность. Попробуйте ещё раз.",topic:"Тема на форуме",idea:"Новая идея",openForum:"Открыть форум",openIdeas:"Посмотреть идеи",student:"Ученик",noDescription:"Без дополнительного описания"},
  uk:{intro:"Усе найновіше в нашій спільноті.",all:"Усе",forum:"Форум",ideas:"Ідеї",refresh:"Оновити",loading:"Завантажуємо активність...",empty:"Поки тут тихо. Нові дописи з'являться тут.",error:"Не вдалося завантажити активність. Спробуйте ще раз.",topic:"Тема на форумі",idea:"Нова ідея",openForum:"Відкрити форум",openIdeas:"Переглянути ідеї",student:"Учень",noDescription:"Без додаткового опису"}
};
function feedText(key){return FEED_TEXT[appLanguage]?.[key]||FEED_TEXT.pl[key]||key;}

async function renderCommunityFeedPage(){
  const host=$("page-content");
  host.innerHTML='<div class="feed-loading"><span class="feed-spinner"></span><p>'+escapeHTML(feedText("loading"))+'</p></div>';
  const [postsResult,ideasResult,profilesResult]=await Promise.all([
    supabaseClient.from("community_forum_posts").select("id,author_id,category,title,body,created_at").order("created_at",{ascending:false}).limit(30),
    supabaseClient.from("community_ideas").select("id,author_id,title,description,created_at").order("created_at",{ascending:false}).limit(30),
    supabaseClient.from("public_profiles").select("id,nickname")
  ]);
  if(postsResult.error&&ideasResult.error){
    host.innerHTML='<div class="page-content feed-error"><p>'+escapeHTML(feedText("error"))+'</p><button type="button" class="secondary-btn" id="feed-retry">'+escapeHTML(feedText("refresh"))+'</button></div>';
    host.querySelector("#feed-retry")?.addEventListener("click",renderCommunityFeedPage);
    return;
  }
  const names=new Map((profilesResult.data||[]).map(p=>[p.id,p.nickname]));
  const items=[
    ...(postsResult.data||[]).filter(item=>!isBlocked(item.author_id)).map(item=>({...item,kind:"forum",preview:item.body||"",label:feedText("topic")})),
    ...(ideasResult.data||[]).filter(item=>!isBlocked(item.author_id)).map(item=>({...item,kind:"ideas",preview:item.description||"",label:feedText("idea")}))
  ].sort((a,b)=>new Date(b.created_at)-new Date(a.created_at)).slice(0,50);
  await loadProfilesByIds(items.map(item=>item.author_id));
  const locale={pl:"pl-PL",en:"en-GB",ru:"ru-RU",uk:"uk-UA"}[appLanguage]||"pl-PL";
  const cards=items.map(item=>{
    const destination=item.kind==="forum"?"forum":"ideas";
    const preview=String(item.preview||"").trim();
    return '<article class="feed-card"><div class="feed-card-top"><span class="feed-type '+item.kind+'">'+escapeHTML(item.label)+'</span><time datetime="'+escapeHTML(item.created_at)+'">'+escapeHTML(new Date(item.created_at).toLocaleString(locale,{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}))+'</time></div><h3>'+escapeHTML(item.title)+'</h3><button type="button" class="community-save-button" data-favorite-type="'+(item.kind==="forum"?"forum_post":"idea")+'" data-favorite-id="'+item.id+'">☆ Zapisz</button><p class="feed-preview">'+escapeHTML(preview||feedText("noDescription"))+'</p><div class="feed-card-bottom"><span class="feed-author">'+communityAuthorHTML(item.author_id,names.get(item.author_id)||feedText("student"))+'</span><button type="button" class="feed-open" data-feed-open="'+destination+'">'+escapeHTML(destination==="forum"?feedText("openForum"):feedText("openIdeas"))+' <span aria-hidden="true">→</span></button></div></article>';
  }).join("");
  host.innerHTML='<section class="feed-intro"><div class="feed-orb" aria-hidden="true">✦</div><div><strong>'+escapeHTML(feedText("intro"))+'</strong><p>'+items.length+' '+(appLanguage==="en"?"recent posts":appLanguage==="ru"?"свежих публикаций":appLanguage==="uk"?"свіжих дописів":"najnowszych wpisów")+'</p></div><button type="button" class="feed-refresh" id="feed-refresh" aria-label="'+escapeHTML(feedText("refresh"))+'" title="'+escapeHTML(feedText("refresh"))+'">↻</button></section><div class="feed-toolbar" role="group" aria-label="Feed filters"><button type="button" class="feed-filter active" data-feed-filter="all">'+escapeHTML(feedText("all"))+'</button><button type="button" class="feed-filter" data-feed-filter="forum">'+escapeHTML(feedText("forum"))+'</button><button type="button" class="feed-filter" data-feed-filter="ideas">'+escapeHTML(feedText("ideas"))+'</button></div><div class="feed-list">'+(cards||'<div class="feed-empty"><span>✧</span><strong>'+escapeHTML(feedText("empty"))+'</strong></div>')+'</div>';
  host.querySelector("#feed-refresh")?.addEventListener("click",renderCommunityFeedPage);
  host.querySelectorAll("[data-feed-filter]").forEach(button=>button.addEventListener("click",()=>{
    const filter=button.dataset.feedFilter;
    host.querySelectorAll("[data-feed-filter]").forEach(node=>node.classList.toggle("active",node===button));
    host.querySelectorAll(".feed-card").forEach(card=>{card.hidden=filter!=="all"&&!card.querySelector(".feed-type")?.classList.contains(filter);});
  }));
  host.querySelectorAll("[data-feed-open]").forEach(button=>button.addEventListener("click",()=>openPage(button.dataset.feedOpen)));
}


const EVENT_TEXT={
pl:{intro:"Miejsca, spotkania i ogłoszenia tworzone przez społeczność.",create:"Dodaj wydarzenie",category:"Rodzaj publikacji",event:"Wydarzenie",announcement:"Ogłoszenie",title:"Tytuł",description:"Opis",date:"Data i godzina",location:"Miejsce",submit:"Wyślij do sprawdzenia",editSubmit:"Wyślij ponownie do sprawdzenia",hint:"Każda publikacja jest najpierw sprawdzana przez administratora.",all:"Wszystkie",upcoming:"Nadchodzące",mine:"Moje zgłoszenia",loading:"Ładowanie wydarzeń...",empty:"Nie ma jeszcze opublikowanych kart.",pending:"Oczekuje na sprawdzenie",approved:"Opublikowano",rejected:"Odrzucono",noDate:"Termin nie został podany",noLocation:"Miejsce nie zostało podane",interested:"Interesuje mnie",going:"Pójdę",report:"Zgłoś",edit:"Edytuj",delete:"Usuń",sent:"Karta została wysłana do sprawdzenia.",updated:"Zmieniono kartę i wysłano ją ponownie do sprawdzenia.",error:"Nie udało się zapisać karty.",reason:"Powód odrzucenia",rejectReason:"Podaj krótki powód odrzucenia:",reported:"Zgłoszenie wysłane.",reportPrompt:"Dlaczego zgłaszasz tę kartę?",confirmDelete:"Usunąć tę kartę?",adminTitle:"Oczekujące karty wydarzeń",adminEmpty:"Nie ma kart oczekujących na sprawdzenie.",approve:"Zatwierdź",reject:"Odrzuć",reviewError:"Nie udało się zmienić statusu."},
en:{intro:"Meetups, events and announcements from the community.",create:"Add event",category:"Publication type",event:"Event",announcement:"Announcement",title:"Title",description:"Description",date:"Date and time",location:"Location",submit:"Submit for review",editSubmit:"Resubmit for review",hint:"Every submission is reviewed by an administrator first.",all:"All",upcoming:"Upcoming",mine:"My submissions",loading:"Loading events...",empty:"No cards have been published yet.",pending:"Awaiting review",approved:"Published",rejected:"Rejected",noDate:"No date provided",noLocation:"No location provided",interested:"Interested",going:"I'll go",report:"Report",edit:"Edit",delete:"Delete",sent:"Your card was submitted for review.",updated:"Your card was updated and resubmitted for review.",error:"Could not save the card.",reason:"Rejection reason",rejectReason:"Enter a short reason for rejection:",reported:"Report submitted.",reportPrompt:"Why are you reporting this card?",confirmDelete:"Delete this card?",adminTitle:"Event cards awaiting review",adminEmpty:"No cards are waiting for review.",approve:"Approve",reject:"Reject",reviewError:"Could not update the status."},
ru:{intro:"Встречи, мероприятия и объявления от участников сообщества.",create:"Добавить событие",category:"Тип публикации",event:"Мероприятие",announcement:"Объявление",title:"Заголовок",description:"Описание",date:"Дата и время",location:"Место",submit:"Отправить на проверку",editSubmit:"Повторно отправить на проверку",hint:"Каждая публикация сначала проверяется администратором.",all:"Все",upcoming:"Предстоящие",mine:"Мои заявки",loading:"Загружаем события...",empty:"Пока нет опубликованных карточек.",pending:"Ожидает проверки",approved:"Опубликовано",rejected:"Отклонено",noDate:"Дата не указана",noLocation:"Место не указано",interested:"Интересует",going:"Пойду",report:"Пожаловаться",edit:"Изменить",delete:"Удалить",sent:"Карточка отправлена на проверку.",updated:"Карточка изменена и повторно отправлена на проверку.",error:"Не удалось сохранить карточку.",reason:"Причина отказа",rejectReason:"Укажи короткую причину отказа:",reported:"Жалоба отправлена.",reportPrompt:"Почему ты жалуешься на эту карточку?",confirmDelete:"Удалить эту карточку?",adminTitle:"Карточки мероприятий на проверке",adminEmpty:"Нет карточек, ожидающих проверки.",approve:"Одобрить",reject:"Отклонить",reviewError:"Не удалось изменить статус."},
uk:{intro:"Зустрічі, події та оголошення від учасників спільноти.",create:"Додати подію",category:"Тип публікації",event:"Подія",announcement:"Оголошення",title:"Заголовок",description:"Опис",date:"Дата й час",location:"Місце",submit:"Надіслати на перевірку",editSubmit:"Повторно надіслати на перевірку",hint:"Кожну публікацію спочатку перевіряє адміністратор.",all:"Усі",upcoming:"Найближчі",mine:"Мої заявки",loading:"Завантажуємо події...",empty:"Поки немає опублікованих карток.",pending:"Очікує перевірки",approved:"Опубліковано",rejected:"Відхилено",noDate:"Дату не вказано",noLocation:"Місце не вказано",interested:"Цікавить",going:"Піду",report:"Поскаржитися",edit:"Змінити",delete:"Видалити",sent:"Картку надіслано на перевірку.",updated:"Картку змінено та повторно надіслано на перевірку.",error:"Не вдалося зберегти картку.",reason:"Причина відмови",rejectReason:"Вкажи коротку причину відмови:",reported:"Скаргу надіслано.",reportPrompt:"Чому ти скаржишся на цю картку?",confirmDelete:"Видалити цю картку?",adminTitle:"Картки подій на перевірці",adminEmpty:"Немає карток, що очікують перевірки.",approve:"Схвалити",reject:"Відхилити",reviewError:"Не вдалося змінити статус."}
};
function eventText(key){return EVENT_TEXT[appLanguage]?.[key]||EVENT_TEXT.pl[key]||key;}

async function renderCommunityEventsPage(categoryFilter=null){
 const host=$("page-content");
 host.innerHTML='<div class="events-loading"><span class="feed-spinner"></span><p>'+escapeHTML(eventText("loading"))+'</p></div>';
 const eventQuery=supabaseClient.from("community_events").select("*").order("created_at",{ascending:false}).limit(80);
 if(categoryFilter)eventQuery.eq("category",categoryFilter);
 const [eventsResult,profilesResult,responsesResult]=await Promise.all([
  eventQuery,
  supabaseClient.from("profiles").select("id,nickname"),
  supabaseClient.from("community_event_responses").select("event_id,user_id,response")
 ]);
 if(eventsResult.error){host.innerHTML='<div class="events-error">'+escapeHTML(eventsResult.error.message||eventText("error"))+'</div>';return;}
 const events=eventsResult.data||[],names=new Map((profilesResult.data||[]).map(p=>[p.id,p.nickname])),responses=responsesResult.data||[],counts=new Map(),mine=new Map();
 await loadProfilesByIds(events.map(item=>item.author_id));
 responses.forEach(row=>{if(!counts.has(row.event_id))counts.set(row.event_id,{interested:0,going:0});counts.get(row.event_id)[row.response]=(counts.get(row.event_id)[row.response]||0)+1;if(row.user_id===currentUser.id)mine.set(row.event_id,row.response);});
 let editingId=null;const locale={pl:"pl-PL",en:"en-GB",ru:"ru-RU",uk:"uk-UA"}[appLanguage]||"pl-PL";
 const dateLabel=value=>value?new Date(value).toLocaleString(locale,{weekday:"short",day:"numeric",month:"long",hour:"2-digit",minute:"2-digit"}):eventText("noDate");
 const cards=events.map(item=>{
  const own=item.author_id===currentUser.id,stats=counts.get(item.id)||{interested:0,going:0};
  const status=item.status!=="approved"?'<span class="event-status '+(item.status==="rejected"?"rejected":"pending")+'">'+escapeHTML(eventText(item.status))+'</span>':"";
  const rejection=item.status==="rejected"&&item.moderator_note?'<p class="event-rejection">'+escapeHTML(eventText("reason"))+': '+escapeHTML(item.moderator_note)+'</p>':"";
  const actions=own?'<div class="event-owner-actions"><button type="button" data-event-edit="'+item.id+'">✎ '+escapeHTML(eventText("edit"))+'</button><button type="button" data-event-delete="'+item.id+'">⌫ '+escapeHTML(eventText("delete"))+'</button></div>':item.status==="approved"?'<div class="event-response-actions"><button type="button" class="'+(mine.get(item.id)==="interested"?"selected":"")+'" data-event-response="interested" data-id="'+item.id+'">☆ '+escapeHTML(eventText("interested"))+' <b>'+stats.interested+'</b></button><button type="button" class="'+(mine.get(item.id)==="going"?"selected":"")+'" data-event-response="going" data-id="'+item.id+'">✓ '+escapeHTML(eventText("going"))+' <b>'+stats.going+'</b></button><button type="button" class="event-report-btn" data-event-report="'+item.id+'" data-author="'+item.author_id+'">'+escapeHTML(eventText("report"))+'</button></div>':"";
  return '<article class="community-event-card" data-event-card data-status="'+item.status+'" data-own="'+own+'" data-event-date="'+(item.event_at||"")+'"><div class="event-card-art '+(item.category==="announcement"?"announcement":"")+'"><span>'+(item.category==="announcement"?"📣":"✦")+'</span><small>'+escapeHTML(eventText(item.category))+'</small></div><div class="event-card-content"><div class="event-card-meta">'+status+'<time>'+escapeHTML(dateLabel(item.event_at))+'</time></div><h3>'+escapeHTML(item.title)+'</h3><button type="button" class="community-save-button" data-favorite-type="event" data-favorite-id="'+item.id+'">☆ Zapisz</button><p class="event-description">'+escapeHTML(item.description)+'</p><div class="event-details"><span>⌖ '+escapeHTML(item.location||eventText("noLocation"))+'</span><span class="event-author">'+communityAuthorHTML(item.author_id,names.get(item.author_id)||"Uczeń")+'</span></div>'+rejection+actions+'</div></article>';
 }).join("");
 host.innerHTML='<section class="events-page-head"><div class="events-heading-copy"><span class="events-eyebrow">ZSPM COMMUNITY</span><h2>'+escapeHTML(eventText("intro"))+'</h2><p>'+escapeHTML(eventText("hint"))+'</p></div><button type="button" class="events-add-button" id="open-event-modal"><span>＋</span>'+escapeHTML(eventText("create"))+'</button></section><div class="events-toolbar"><button type="button" class="active" data-event-filter="all">'+escapeHTML(eventText("all"))+'</button><button type="button" data-event-filter="upcoming">'+escapeHTML(eventText("upcoming"))+'</button><button type="button" data-event-filter="mine">'+escapeHTML(eventText("mine"))+'</button></div><div class="community-events-list">'+(cards||'<div class="events-empty"><span>✧</span><strong>'+escapeHTML(eventText("empty"))+'</strong><small>'+escapeHTML(eventText("hint"))+'</small></div>')+'</div><div class="event-modal-backdrop" id="event-modal" hidden><section class="event-modal-card" role="dialog" aria-modal="true" aria-labelledby="event-modal-title"><header class="event-modal-header"><div><span class="events-eyebrow">ZSPM COMMUNITY</span><h3 id="event-modal-title">'+escapeHTML(eventText("create"))+'</h3></div><button type="button" class="event-modal-close" id="close-event-modal" aria-label="Close">×</button></header><form class="event-submit-form" id="community-event-form"><label>'+escapeHTML(eventText("category"))+'<select id="event-category"><option value="event">'+escapeHTML(eventText("event"))+'</option><option value="announcement">'+escapeHTML(eventText("announcement"))+'</option></select></label><label>'+escapeHTML(eventText("title"))+'<input id="event-title" maxlength="100" minlength="4" placeholder="'+escapeHTML(eventText("title"))+'" required></label><label>'+escapeHTML(eventText("description"))+'<textarea id="event-description" maxlength="2500" minlength="10" rows="4" placeholder="'+escapeHTML(eventText("description"))+'" required></textarea></label><div class="event-form-grid"><label>'+escapeHTML(eventText("date"))+'<input id="event-date" type="datetime-local"></label><label>'+escapeHTML(eventText("location"))+'<input id="event-location" maxlength="160" placeholder="'+escapeHTML(eventText("location"))+'"></label></div><p class="event-modal-note">ⓘ '+escapeHTML(eventText("hint"))+'</p><button class="events-submit-button" type="submit" id="event-submit">'+escapeHTML(eventText("submit"))+'</button><p class="event-form-feedback" id="event-feedback" aria-live="polite"></p></form></section></div>';
 const modal=host.querySelector("#event-modal"),form=host.querySelector("#community-event-form"),category=host.querySelector("#event-category"),dateInput=host.querySelector("#event-date"),submit=host.querySelector("#event-submit");
 const closeModal=()=>{modal.hidden=true;editingId=null;form.reset();submit.textContent=eventText("submit");};
 const openModal=item=>{editingId=item?.id||null;if(item){category.value=item.category;host.querySelector("#event-title").value=item.title;host.querySelector("#event-description").value=item.description;host.querySelector("#event-location").value=item.location||"";dateInput.value=item.event_at?new Date(item.event_at).toISOString().slice(0,16):"";}dateInput.required=category.value==="event";submit.textContent=eventText(editingId?"editSubmit":"submit");modal.hidden=false;setTimeout(()=>host.querySelector("#event-title").focus(),30);};
 host.querySelector("#open-event-modal").addEventListener("click",()=>openModal(null));host.querySelector("#close-event-modal").addEventListener("click",closeModal);modal.addEventListener("click",e=>{if(e.target===modal)closeModal();});
 const escHandler=e=>{if(e.key==="Escape"&&!modal.hidden)closeModal();};document.addEventListener("keydown",escHandler);
 category.addEventListener("change",()=>{dateInput.required=category.value==="event";});
 form.addEventListener("submit",async e=>{e.preventDefault();const title=host.querySelector("#event-title").value.trim(),description=host.querySelector("#event-description").value.trim();if(title.length<4||description.length<10)return;if(category.value==="event"&&!dateInput.value){host.querySelector("#event-feedback").textContent=eventText("date");return;}const payload={author_id:currentUser.id,category:category.value,title,description,event_at:dateInput.value?new Date(dateInput.value).toISOString():null,location:host.querySelector("#event-location").value.trim(),status:"pending",moderator_note:"",reviewed_by:null,reviewed_at:null};submit.disabled=true;const result=editingId?await supabaseClient.from("community_events").update(payload).eq("id",editingId):await supabaseClient.from("community_events").insert(payload);if(result.error){host.querySelector("#event-feedback").textContent=result.error.message||eventText("error");submit.disabled=false;return;}const wasEditing=Boolean(editingId);closeModal();await renderCommunityEventsPage();const head=$("page-content").querySelector(".events-page-head");if(head){const note=document.createElement("p");note.className="events-toast";note.textContent=eventText(wasEditing?"updated":"sent");head.appendChild(note);}});
 host.querySelectorAll("[data-event-filter]").forEach(button=>button.addEventListener("click",()=>{const filter=button.dataset.eventFilter;host.querySelectorAll("[data-event-filter]").forEach(b=>b.classList.toggle("active",b===button));host.querySelectorAll("[data-event-card]").forEach(card=>{const future=!card.dataset.eventDate||new Date(card.dataset.eventDate).getTime()>=Date.now();card.hidden=filter==="mine"?card.dataset.own!=="true":filter==="upcoming"?(card.dataset.status!=="approved"||!future):false;});}));
 host.querySelectorAll("[data-event-edit]").forEach(button=>button.addEventListener("click",()=>{const item=events.find(x=>x.id===button.dataset.eventEdit);if(item)openModal(item);}));
 host.querySelectorAll("[data-event-delete]").forEach(button=>button.addEventListener("click",async()=>{if(!confirm(eventText("confirmDelete")))return;button.disabled=true;const {error}=await supabaseClient.from("community_events").delete().eq("id",button.dataset.eventDelete);if(error){button.disabled=false;alert(error.message);return;}await renderCommunityEventsPage();}));
 host.querySelectorAll("[data-event-response]").forEach(button=>button.addEventListener("click",async()=>{button.disabled=true;const id=button.dataset.id,response=button.dataset.eventResponse,current=mine.get(id);const result=current===response?await supabaseClient.from("community_event_responses").delete().eq("event_id",id).eq("user_id",currentUser.id):await supabaseClient.from("community_event_responses").upsert({event_id:id,user_id:currentUser.id,response},{onConflict:"event_id,user_id"});if(result.error){button.disabled=false;alert(result.error.message);return;}await renderCommunityEventsPage();}));
 host.querySelectorAll("[data-event-report]").forEach(button=>button.addEventListener("click",async()=>{const reason=prompt(eventText("reportPrompt"));if(!reason||!reason.trim())return;const {error}=await supabaseClient.from("content_reports").insert({reporter_id:currentUser.id,reported_user_id:button.dataset.author,target_type:"event",target_id:button.dataset.eventReport,reason:reason.trim().slice(0,500)});if(error){alert(error.message);return;}alert(eventText("reported"));}));
}

async function renderAdminEventQueue(){
 const host=$("admin-events-list");if(!host)return;host.innerHTML='<p class="muted">'+escapeHTML(eventText("loading"))+'</p>';
 const {data,error}=await supabaseClient.from("community_events").select("id,author_id,category,title,description,event_at,location,created_at").eq("status","pending").order("created_at",{ascending:true}).limit(100);
 if(error){host.innerHTML='<p class="muted">'+escapeHTML(error.message)+'</p>';return;}if(!data?.length){host.innerHTML='<p class="muted">'+escapeHTML(eventText("adminEmpty"))+'</p>';return;}
 const ids=[...new Set(data.map(x=>x.author_id))],profiles=await supabaseClient.from("profiles").select("id,nickname").in("id",ids),names=new Map((profiles.data||[]).map(x=>[x.id,x.nickname]));
 host.innerHTML=data.map(item=>'<article class="admin-event-card"><div class="event-card-meta"><span class="event-status pending">'+escapeHTML(eventText("pending"))+'</span><time>'+escapeHTML(new Date(item.created_at).toLocaleString())+'</time></div><h3>'+escapeHTML(item.title)+'</h3><p>'+escapeHTML(item.description)+'</p><small>'+escapeHTML(names.get(item.author_id)||"Uczeń")+' · '+escapeHTML(item.location||eventText("noLocation"))+'</small><div class="admin-event-actions"><button type="button" class="admin-action-btn" data-event-review="approve" data-id="'+item.id+'">'+escapeHTML(eventText("approve"))+'</button><button type="button" class="admin-small-btn" data-event-review="reject" data-id="'+item.id+'">'+escapeHTML(eventText("reject"))+'</button></div></article>').join("");
 host.querySelectorAll("[data-event-review]").forEach(button=>button.addEventListener("click",async()=>{
  const approved=button.dataset.eventReview==="approve",note=approved?"":prompt(eventText("rejectReason"));if(!approved&&(!note||!note.trim()))return;button.disabled=true;
  const {error}=await supabaseClient.from("community_events").update({status:approved?"approved":"rejected",moderator_note:approved?"":note.trim().slice(0,500),reviewed_by:currentUser.id,reviewed_at:new Date().toISOString()}).eq("id",button.dataset.id);
  if(error){button.disabled=false;alert(error.message||eventText("reviewError"));return;}await renderAdminEventQueue();
 }));
}

// FORUM, SZKOLNY PLANER I PERSONALIZACJA

const FORUM_CATEGORIES = {general:"Ogólne",school:"Szkoła",help:"Pomoc w nauce",ideas:"Pomysły",events:"Wydarzenia"};

async function renderCommunityForumPage() {
 const host=$("page-content");host.innerHTML='<div class="page-content"><p>Ładowanie forum...</p></div>';
 const [postsResult,profilesResult]=await Promise.all([
  supabaseClient.from("community_forum_posts").select("id,author_id,category,title,body,is_locked,card_style,created_at").order("created_at",{ascending:false}).limit(60),
  supabaseClient.from("public_profiles").select("id,nickname")
 ]);
 if(postsResult.error){host.innerHTML='<div class="page-content"><p>Nie udało się załadować forum.</p></div>';return;}
 const posts=postsResult.data||[],names=new Map((profilesResult.data||[]).map(p=>[p.id,p.nickname]));
 const commentsResult=posts.length?await supabaseClient.from("community_forum_comments").select("id,post_id,author_id,body,created_at").in("post_id",posts.map(p=>p.id)).order("created_at",{ascending:true}).limit(300):{data:[],error:null};
 const comments=commentsResult.data||[];
 await loadProfilesByIds([...posts.map(post=>post.author_id),...comments.map(comment=>comment.author_id)]);
 const cards=posts.map(post=>{
  const own=post.author_id===currentUser.id,postComments=comments.filter(c=>c.post_id===post.id),style=COMMUNITY_CARD_STYLES.some(s=>s.id===post.card_style)?post.card_style:"classic";
  return '<article class="feature-card forum-post-card community-designed-card style-'+style+'">'+communityCardCover(style,"forum")+'<div class="community-designed-content"><div class="feature-card-top"><span class="feature-tag">'+escapeHTML(FORUM_CATEGORIES[post.category]||"Ogólne")+'</span><div class="forum-author-meta">'+communityAuthorHTML(post.author_id,names.get(post.author_id)||"Uczeń")+'<small>'+escapeHTML(new Date(post.created_at).toLocaleDateString("pl-PL"))+'</small></div></div><h3>'+escapeHTML(post.title)+'</h3><button type="button" class="community-save-button" data-favorite-type="forum_post" data-favorite-id="'+post.id+'">☆ Zapisz</button><p class="feature-body">'+escapeHTML(post.body)+'</p>'+(own||isAdmin?'<button type="button" class="text-action" data-forum-delete="'+post.id+'">Usuń temat</button>':"")+(!own&&!isAdmin?'<button type="button" class="text-action" data-forum-report="'+post.id+'" data-author="'+post.author_id+'">Zgłoś temat</button>':"")+'<div class="forum-comments"><strong>Komentarze ('+postComments.length+')</strong>'+(postComments.map(c=>'<div class="forum-comment">'+communityAuthorHTML(c.author_id,names.get(c.author_id)||"Uczeń")+'<p>'+escapeHTML(c.body)+'</p>'+(c.author_id===currentUser.id||isAdmin?'<button type="button" class="text-action" data-forum-comment-delete="'+c.id+'">Usuń</button>':"")+'</div>').join("")||'<small>Jeszcze nikt nie skomentował.</small>')+(post.is_locked?'<p class="muted">Dyskusja zamknięta.</p>':'<form class="forum-comment-form" data-forum-comment-form="'+post.id+'"><input maxlength="2000" required placeholder="Dodaj komentarz"><button type="submit" aria-label="Wyślij komentarz">➤</button></form>')+'</div></div></article>';
 }).join("");
 host.innerHTML='<section class="forum-page-intro"><div class="forum-page-intro-copy"><span class="community-dialog-eyebrow">ZSPM COMMUNITY · FORUM</span><h2>Forum ZSPM</h2><p>Wymieniaj się pomysłami, pytaj o szkołę i pomagaj innym. Nie publikuj prywatnych danych.</p></div><button type="button" class="community-create-button" id="open-forum-modal">＋ Dodaj temat</button></section><div class="feature-list">'+(cards||'<div class="community-empty-state"><span>✧</span><strong>Forum jest jeszcze puste</strong><small>Dodaj pierwszy temat i rozpocznij rozmowę.</small></div>')+'</div><div class="community-create-backdrop" id="forum-modal" hidden><section class="community-create-dialog" role="dialog" aria-modal="true" aria-labelledby="forum-modal-title"><header class="community-dialog-header"><div><span class="community-dialog-eyebrow">ZSPM COMMUNITY · FORUM</span><h3 id="forum-modal-title">Dodaj temat</h3><p>Wybierz kategorię, napisz treść i dopasuj styl karty.</p></div><button type="button" class="community-dialog-close" id="close-forum-modal" aria-label="Zamknij">×</button></header><form class="community-create-form" id="forum-post-form"><label>Kategoria<select id="forum-category">'+Object.entries(FORUM_CATEGORIES).map(([k,v])=>'<option value="'+k+'">'+escapeHTML(v)+'</option>').join("")+'</select></label><label>Tytuł<input id="forum-title" maxlength="100" minlength="4" required placeholder="O czym chcesz porozmawiać?"></label><label>Treść<textarea id="forum-body" maxlength="5000" minlength="10" rows="5" required placeholder="Napisz coś od siebie..."></textarea></label>'+communityCardStylePicker("classic","forum-card-style")+'<button type="submit" class="community-dialog-submit">Opublikuj temat</button><p id="forum-feedback" class="feature-feedback" aria-live="polite"></p></form></section></div>';
 const modal=host.querySelector("#forum-modal"),form=host.querySelector("#forum-post-form");
 const close=()=>{modal.hidden=true;form.reset();host.querySelector("#forum-card-style").value="classic";host.querySelectorAll("[data-card-style-option]").forEach(b=>{const active=b.dataset.cardStyleOption==="classic";b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));});document.removeEventListener("keydown",onKey);};
 const onKey=e=>{if(e.key==="Escape"&&!modal.hidden)close();};
 host.querySelector("#open-forum-modal").addEventListener("click",()=>{modal.hidden=false;document.addEventListener("keydown",onKey);});
 host.querySelector("#close-forum-modal").addEventListener("click",close);modal.addEventListener("click",e=>{if(e.target===modal)close();});bindCommunityCardStylePicker(host,"forum-card-style");
 form.addEventListener("submit",async e=>{e.preventDefault();const button=form.querySelector('button[type="submit"]');button.disabled=true;const {error}=await supabaseClient.from("community_forum_posts").insert({author_id:currentUser.id,category:host.querySelector("#forum-category").value,title:host.querySelector("#forum-title").value.trim(),body:host.querySelector("#forum-body").value.trim(),card_style:host.querySelector("#forum-card-style").value});if(error){host.querySelector("#forum-feedback").textContent="Nie udało się opublikować tematu.";button.disabled=false;return;}close();await renderCommunityForumPage();});
 host.querySelectorAll("[data-forum-comment-form]").forEach(form=>form.addEventListener("submit",async e=>{e.preventDefault();const input=form.querySelector("input"),body=input.value.trim();if(!body)return;const {error}=await supabaseClient.from("community_forum_comments").insert({post_id:form.dataset.forumCommentForm,author_id:currentUser.id,body});if(error){alert("Nie udało się dodać комментария.");return;}await renderCommunityForumPage();}));
 host.querySelectorAll("[data-forum-report]").forEach(b=>b.addEventListener("click",async()=>{const reason=prompt("Opisz krótko, dlaczego zgłaszasz ten temat:");if(!reason||!reason.trim())return;const {error}=await supabaseClient.from("content_reports").insert({reporter_id:currentUser.id,reported_user_id:b.dataset.author,target_type:"forum_post",target_id:b.dataset.forumReport,reason:reason.trim().slice(0,500)});if(error){alert("Nie udało się wysłać zgłoszenia.");return;}alert("Zgłoszenie zostało wysłane do administracji.");}));
 host.querySelectorAll("[data-forum-delete]").forEach(b=>b.addEventListener("click",async()=>{if(!confirm("Usunąć ten temat i komentarze?"))return;const {error}=await supabaseClient.from("community_forum_posts").delete().eq("id",b.dataset.forumDelete);if(error)alert("Nie udało się usunąć tematu.");else await renderCommunityForumPage();}));
 host.querySelectorAll("[data-forum-comment-delete]").forEach(b=>b.addEventListener("click",async()=>{const {error}=await supabaseClient.from("community_forum_comments").delete().eq("id",b.dataset.forumCommentDelete);if(error)alert("Nie udało się usunąć komentarza.");else await renderCommunityForumPage();}));
}

const SCHOOL_TIMETABLE_1DR = {
  1: [
    ["Fizyka", "1.03"],
    ["Język polski", "1.07"],
    ["Geografia", "1.05"],
    ["Biznes i zarządzanie", "0.07"],
    ["Edukacja dla bezpieczeństwa", "1.14"]
  ],
  2: [
    ["Kreacja w reklamie – grafika", "2.16"],
    ["Podstawy reklamy", "2.07"],
    ["Matematyka", "2.07"],
    ["Historia", "0.04"],
    ["BHP", "0.04"],
    ["Podstawy marketingu", "2.06"],
    ["Informatyka", "2.02"],
    ["Geografia", "1.05"],
    ["Wychowanie fizyczne", "G1"]
  ],
  3: [
    ["Fizyka", "1.03"],
    ["Podstawy reklamy", "1.04"],
    ["Przekaz i komunikat w reklamie", "1.14"],
    ["Język polski", "1.07"],
    ["Język niemiecki", "0.08"],
    ["Strategia w reklamie", "2.16"],
    ["Wychowanie fizyczne", "G1"],
    ["Wychowanie fizyczne", "G1"]
  ],
  4: [
    ["Strategia w reklamie", "1.13"],
    ["Godzina wychowawcza", "1.14"],
    ["Przekaz i komunikat w reklamie", "1.07"],
    ["Kreacja w reklamie – grafika", "2.05"],
    ["Przekaz i komunikat w reklamie", "0.08"],
    ["Informatyka", "2.02"]
  ],
  5: [
    ["Język polski", "1.07"],
    ["Język polski", "1.07"],
    ["Edukacja zdrowotna", "0.11"],
    ["Matematyka", "2.07"],
    ["Język niemiecki", "0.08"],
    ["Język angielski", "0.09"],
    ["Język angielski", "0.09"]
  ]
};

const SCHOOL_TIMETABLE_DAYS = [
  { value: 1, label: "Pon", full: "Poniedziałek" },
  { value: 2, label: "Wt", full: "Wtorek" },
  { value: 3, label: "Śr", full: "Środa" },
  { value: 4, label: "Czw", full: "Czwartek" },
  { value: 5, label: "Pt", full: "Piątek" },
  { value: 6, label: "Sob", full: "Sobota" },
  { value: 0, label: "Ndz", full: "Niedziela" }
];

const SCHOOL_LESSON_TIMES = [
  null,
  "08:20–09:05",
  "09:10–09:55",
  "10:05–10:50",
  "11:05–11:50",
  "12:00–12:45",
  "12:55–13:40",
  "13:50–14:35",
  "14:40–15:25",
  "15:30–16:15"
];

const SCHOOL_BREAKS = { 1: 5, 2: 5, 3: 10, 4: 15, 5: 10, 6: 10, 7: 10, 8: 5 };

function renderSchoolTimetablePage() {
  const host = $("page-content");
  const today = new Date().getDay();
  const initialDay = SCHOOL_TIMETABLE_DAYS.some(day => day.value === today) ? today : 1;

  host.innerHTML = `
    <section class="feature-intro school-timetable-intro">
      <div class="school-timetable-heading">
        <div><strong>Plan lekcji</strong><p>Wybierz klasę i dzień tygodnia, aby sprawdzić zajęcia.</p></div>
        <span class="school-class-badge">1DR</span>
      </div>
      <label class="school-class-label" for="school-timetable-class">Klasa</label>
      <select id="school-timetable-class" class="school-class-select">
        <option value="1DR">1DR</option>
        <option value="unavailable" disabled>Inne klasy — wkrótce</option>
      </select>
      <div class="school-day-tabs" role="group" aria-label="Wybierz dzień tygodnia">
        ${SCHOOL_TIMETABLE_DAYS.map(day => `<button type="button" class="school-day-tab" data-timetable-day="${day.value}" aria-pressed="${day.value === initialDay}">${day.label}</button>`).join("")}
      </div>
    </section>
    <section id="school-timetable-results" aria-live="polite"></section>
    <p class="school-timetable-note">Godziny i sale na podstawie planu przekazanego dla klasy 1DR. W razie zmian planu dane trzeba zaktualizować.</p>
  `;

  const renderDay = dayValue => {
    const day = SCHOOL_TIMETABLE_DAYS.find(item => item.value === dayValue);
    const lessons = SCHOOL_TIMETABLE_1DR[dayValue];
    host.querySelectorAll("[data-timetable-day]").forEach(button => {
      const active = Number(button.dataset.timetableDay) === dayValue;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    const result = host.querySelector("#school-timetable-results");
    if (!lessons) {
      result.innerHTML = `<div class="feature-card school-timetable-empty"><div class="school-empty-icon">☀</div><h3>${day.full} — weekend</h3><p>Nie masz zaplanowanych lekcji. Miłego odpoczynku!</p></div>`;
      return;
    }

    result.innerHTML = `
      <div class="school-timetable-day-head"><div><span>KLASA 1DR</span><h3>${day.full}</h3></div><span class="school-lesson-count">${lessons.length} ${lessons.length === 1 ? "lekcja" : lessons.length < 5 ? "lekcje" : "lekcji"}</span></div>
      <div class="school-lesson-list">
        ${lessons.map(([subject, room], index) => {
          const lessonNumber = index + 1;
          const breakMinutes = SCHOOL_BREAKS[lessonNumber];
          return `
            <article class="school-lesson-card">
              <div class="school-lesson-number">${lessonNumber}</div>
              <div class="school-lesson-main"><strong>${escapeHTML(subject)}</strong><span>${SCHOOL_LESSON_TIMES[lessonNumber]}</span></div>
              <div class="school-lesson-room"><small>SALA</small><b>${escapeHTML(room)}</b></div>
            </article>
            ${index < lessons.length - 1 && breakMinutes ? `<div class="school-break-row"><span></span><small>Przerwa · ${breakMinutes} min</small></div>` : ""}
          `;
        }).join("")}
      </div>
    `;
  };

  host.querySelectorAll("[data-timetable-day]").forEach(button => {
    button.addEventListener("click", () => renderDay(Number(button.dataset.timetableDay)));
  });
  renderDay(initialDay);
}

async function renderCommunityPlannerPage() {
  const host=$("page-content");
  const {data:tasks,error}=await supabaseClient.from("community_planner_tasks").select("id,title,details,due_at,completed,created_at").eq("user_id",currentUser.id).order("completed").order("due_at",{ascending:true,nullsFirst:false}).limit(100);
  if(error){host.innerHTML='<div class="page-content"><p>Nie udało się załadować planera.</p></div>';return;}
  host.innerHTML='<div class="feature-intro"><strong>Twój szkolny planer</strong><p>Terminy i zadania widzisz tylko Ty. Nie dodawaj wrażliwych danych.</p></div>'+
  '<form class="feature-form" id="planner-form"><h3>Dodaj zadanie</h3><label>Nazwa<input id="planner-title" maxlength="120" required placeholder="Np. Powtórzyć fizykę"></label><label>Szczegóły<textarea id="planner-details" maxlength="1500" rows="3" placeholder="Temat, zakres lub notatka"></textarea></label><label>Termin<input id="planner-due" type="datetime-local"></label><button class="main-btn" type="submit">Dodaj do planu</button></form>'+
  '<div class="feature-list">'+((tasks||[]).map(task=>'<article class="feature-card planner-task '+(task.completed?'is-complete':'')+'"><label class="planner-check"><input type="checkbox" data-planner-toggle="'+task.id+'" '+(task.completed?'checked':'')+'><span></span></label><div class="planner-task-content"><strong>'+escapeHTML(task.title)+'</strong>'+(task.details?'<p>'+escapeHTML(task.details)+'</p>':"")+(task.due_at?'<small>Termin: '+escapeHTML(new Date(task.due_at).toLocaleString("pl-PL"))+'</small>':'<small>Bez terminu</small>')+'</div><button type="button" class="text-action" data-planner-delete="'+task.id+'">Usuń</button></article>').join("")||'<div class="page-content"><p>Nie masz jeszcze zadań. Dodaj pierwsze!</p></div>')+'</div>';
  host.querySelector("#planner-form").addEventListener("submit",async e=>{e.preventDefault();const b=e.currentTarget.querySelector("button[type=submit]");b.disabled=true;const raw=host.querySelector("#planner-due").value;const {error}=await supabaseClient.from("community_planner_tasks").insert({user_id:currentUser.id,title:host.querySelector("#planner-title").value.trim(),details:host.querySelector("#planner-details").value.trim(),due_at:raw?new Date(raw).toISOString():null});if(error){alert("Nie udało się dodać zadania.");b.disabled=false;return;}await renderCommunityPlannerPage();});
  host.querySelectorAll("[data-planner-toggle]").forEach(box=>box.addEventListener("change",async()=>{const {error}=await supabaseClient.from("community_planner_tasks").update({completed:box.checked,updated_at:new Date().toISOString()}).eq("id",box.dataset.plannerToggle).eq("user_id",currentUser.id);if(error)alert("Nie udało się zmienić zadania.");else await renderCommunityPlannerPage();}));
  host.querySelectorAll("[data-planner-delete]").forEach(b=>b.addEventListener("click",async()=>{const {error}=await supabaseClient.from("community_planner_tasks").delete().eq("id",b.dataset.plannerDelete).eq("user_id",currentUser.id);if(error)alert("Nie udało się usunąć zadania.");else await renderCommunityPlannerPage();}));
}

async function renderCommunityCosmeticsPage() {
  const host=$("page-content");host.innerHTML='<div class="page-content"><p>Ładowanie sklepu...</p></div>';
  const [{data:progress},{data:profile},{data:items,error}]=await Promise.all([
    supabaseClient.from("community_progress").select("level,xp").eq("user_id",currentUser.id).maybeSingle(),
    supabaseClient.from("community_profiles").select("avatar_decoration,banner_theme").eq("user_id",currentUser.id).maybeSingle(),
    supabaseClient.from("community_cosmetics").select("id,name,description,cosmetic_type,cosmetic_value,unlock_level").eq("is_active",true).order("sort_order")
  ]);
  if(error){host.innerHTML='<div class="page-content"><p>Nie udało się załadować sklepu.</p></div>';return;}
  const level=progress?.level||1;
  host.innerHTML='<div class="feature-intro"><strong>Sklep wyglądu</strong><p>Ozdoby odblokowują się za aktywność i zdobywanie poziomów. Nie ma płatności ani wydawania XP.</p><div class="cosmetic-level">Twój poziom: <b>'+level+'</b> · '+(progress?.xp||0)+' XP</div></div>'+
  '<div class="feature-list cosmetics-grid">'+(items||[]).map(item=>{const unlocked=level>=item.unlock_level;const equipped=item.cosmetic_type==="avatar_decoration"?profile?.avatar_decoration===item.cosmetic_value:profile?.banner_theme===item.cosmetic_value;return '<article class="feature-card cosmetic-card '+(unlocked?'':'is-locked')+'"><div class="cosmetic-preview '+(item.cosmetic_type==="banner_theme"?'theme-'+item.cosmetic_value:'decor-'+item.cosmetic_value)+'">'+(item.cosmetic_type==="banner_theme"?'▰':'✦')+'</div><div><strong>'+escapeHTML(item.name)+'</strong><p>'+escapeHTML(item.description)+'</p><small>'+(unlocked?(equipped?'Używasz':'Odblokowano'):'Odblokuje się na poziomie '+item.unlock_level)+'</small></div><button type="button" class="secondary-btn" data-cosmetic-equip="'+item.id+'" '+(!unlocked||equipped?'disabled':'')+'> '+(equipped?'Wybrano':unlocked?'Zastosuj':'Zablokowane')+'</button></article>';}).join("")+'</div>';
  host.querySelectorAll("[data-cosmetic-equip]").forEach(b=>b.addEventListener("click",async()=>{const item=items.find(x=>x.id===b.dataset.cosmeticEquip);if(!item||level<item.unlock_level)return;const field=item.cosmetic_type==="avatar_decoration"?"avatar_decoration":"banner_theme";const {error}=await supabaseClient.from("community_profiles").update({[field]:item.cosmetic_value,updated_at:new Date().toISOString()}).eq("user_id",currentUser.id);if(error){alert("Nie udało się zastosować wyglądu.");return;}await renderCommunityCosmeticsPage();}));
}


document.addEventListener("click",async event=>{
 const button=event.target.closest("[data-favorite-type][data-favorite-id]");
 if(!button)return;
 event.preventDefault();event.stopPropagation();
 button.disabled=true;
 await toggleCommunityFavorite(button.dataset.favoriteType,button.dataset.favoriteId,button);
 button.disabled=false;
});


document.addEventListener("click",async event=>{
 const button=event.target.closest("[data-group-message-report]");
 if(!button)return;
 const reason=prompt("Dlaczego zgłaszasz tę wiadomość?");
 if(reason===null)return;
 const reportedUser=button.dataset.author;
 const {error}=await supabaseClient.from("content_reports").insert({reporter_id:currentUser.id,reported_user_id:reportedUser,target_type:"group_message",target_id:button.dataset.groupMessageReport,reason:reason.trim().slice(0,500)});
 if(error){alert("Nie udało się wysłać zgłoszenia.");return;}
 alert("Zgłoszenie zostało wysłane do moderatorów.");
});

// OBSŁUGA PRZYCISKÓW

// Copy the support account number when the approved account is configured.
document.addEventListener("click", async event => {
  const button = event.target.closest("#copy-support-account");
  if (!button) return;
  const status = document.getElementById("support-copy-status");
  if (!SUPPORT_ACCOUNT_NUMBER) {
    if (status) status.textContent = "Numer rachunku nie został jeszcze skonfigurowany.";
    return;
  }
  try {
    let copied = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(SUPPORT_ACCOUNT_NUMBER);
        copied = true;
      } catch (clipboardError) {
        // Continue with the legacy fallback used by some mobile browsers.
      }
    }
    if (!copied) {
      const field = document.createElement("textarea");
      field.value = SUPPORT_ACCOUNT_NUMBER;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-9999px";
      field.style.top = "0";
      document.body.appendChild(field);
      field.focus();
      field.select();
      field.setSelectionRange(0, field.value.length);
      copied = document.execCommand("copy");
      field.remove();
      if (!copied) throw new Error("Clipboard unavailable");
    }
    if (status) status.textContent = "Numer konta skopiowany.";
    const label = button.querySelector("span");
    if (label) label.textContent = "Skopiowano!";
    window.setTimeout(() => { if (label) label.textContent = "Kopiuj numer konta"; }, 1800);
  } catch (error) {
    if (status) status.textContent = "Nie udało się skopiować. Spróbuj ponownie.";
  }
});


const appBackButton = $("app-back-button");
appBackButton.addEventListener("click", async () => {
  if (!appPageHistory.length) return;
  const previousPage = appPageHistory.pop();
  await openPage(previousPage, { fromBack: true });
});

document.querySelectorAll("[data-page]").forEach(button => {
  button.addEventListener("click", () => {
    openPage(button.dataset.page);
  });
});
const moreNavToggle = $("more-nav-toggle");
const moreNavMenu = $("more-nav-menu");
if (moreNavToggle && moreNavMenu) {
  moreNavToggle.addEventListener("click", event => {
    event.stopPropagation();
    const opening = moreNavMenu.classList.contains("hidden");
    moreNavMenu.classList.toggle("hidden", !opening);
    moreNavToggle.setAttribute("aria-expanded", String(opening));
  });
  moreNavMenu.addEventListener("click", event => {
    if (event.target.closest("[data-page]")) {
      moreNavMenu.classList.add("hidden");
      moreNavToggle.setAttribute("aria-expanded","false");
    }
  });
  document.addEventListener("click", event => {
    if (!event.target.closest("#more-nav-menu") && !event.target.closest("#more-nav-toggle")) {
      moreNavMenu.classList.add("hidden");
      moreNavToggle.setAttribute("aria-expanded","false");
    }
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      moreNavMenu.classList.add("hidden");
      moreNavToggle.setAttribute("aria-expanded","false");
    }
  });
}

$("notif-bell").addEventListener("click", () => openPage("notifications"));

const accountSwitchButton = $("account-switch");
const accountMenu = $("account-menu");

function closeAccountMenu() {
  accountMenu.classList.add("hidden");
  accountSwitchButton.setAttribute("aria-expanded", "false");
}

accountSwitchButton.addEventListener("click", event => {
  event.stopPropagation();
  const isOpen = !accountMenu.classList.contains("hidden");
  accountMenu.classList.toggle("hidden", isOpen);
  accountSwitchButton.setAttribute("aria-expanded", String(!isOpen));
});

accountMenu.addEventListener("click", event => event.stopPropagation());

document.addEventListener("click", event => {
  if (!event.target.closest(".account-menu-wrap")) closeAccountMenu();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeAccountMenu();
});

$("account-logout").addEventListener("click", async () => {
  closeAccountMenu();
  await logout();
});


// WYLOGOWANIE

async function logout() {
  closeAccountMenu();
  if (activeCommunityProfileClose) activeCommunityProfileClose();

  if (supabaseClient) {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.error("Supabase sign-out error:", error);
      alert("Nie udało się wylogować. Spróbuj ponownie.");
      return;
    }
  }

  await cleanupAllRealtimeChannels();
  currentUser = null;
  isAdmin = false;
  isBanned = false;
  currentUserBadge = null;
  currentMute = null;
  myProfileCache = null;
  communityProfileCache = null;
  publicProfilesCache = [];
  profileSocialCache = {};
  friendsDataCache = { incoming: [], outgoing: [], friends: [] };
  blockedUsersCache = [];
  notificationsCache = [];
  reportsCache = [];
  reportedMessageIdsCache = [];
  conversationsCache = [];
  appPageHistory = [];
  currentAppPage = "home";
  updateNotifBadge();
  $("app").classList.add("hidden");
  $("auth").classList.remove("hidden");
  $("register").reset();
  $("login").reset();
  showLogin();
}

// PRZYWRACANIE SESJI SUPABASE

async function restoreSupabaseSession() {
  if (!supabaseClient) {
    showLogin();
    showMessage("login-message", authUnavailableMessage());
    return;
  }

  try {
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) throw error;

    if (data.session?.user) {
      currentUser = getAppUser(data.session.user);
      await enterApp();
    }
  } catch (error) {
    console.error("Supabase session restore error:", error);
    await cleanupAllRealtimeChannels();
    currentUser = null;
    isAdmin = false;
    isBanned = false;
    currentUserBadge = null;
    currentMute = null;
    $("app").classList.add("hidden");
    $("auth").classList.remove("hidden");
    showLogin();
    showMessage("login-message", "Nie udało się przywrócić sesji. Odśwież stronę i spróbuj ponownie.");
  }
}

restoreSupabaseSession();
