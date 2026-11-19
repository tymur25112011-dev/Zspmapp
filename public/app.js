"use strict";

const $ = id => document.getElementById(id);

const THEME_KEY = "zspm_community_theme";
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
let notificationsChannel = null;
let friendsChannel = null;
let socialChannel = null;
let reportsCache = [];
let reportedMessageIdsCache = [];
let chatMessageLikesCache = new Map();
let replyToMessageId = null;

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
      currentUser = getAppUser(data.user);
      enterApp();
    } else {
      showMessage(
        "register-message",
        "Konto zostało utworzone. Sprawdź pocztę i potwierdź adres e-mail, a następnie zaloguj się.",
        "success"
      );
    }
  } catch (error) {
    console.error("Supabase registration error:", error);
    const message = /already registered|already exists|user already/i.test(error.message || "")
      ? "Ten adres e-mail jest już zarejestrowany. Zaloguj się."
      : (error.message || "Nie udało się utworzyć konta. Spróbuj ponownie.");
    showMessage("register-message", message);
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
    enterApp();
  } catch (error) {
    console.error("Supabase login error:", error);
    const message = /email not confirmed/i.test(error.message || "")
      ? "Najpierw potwierdź adres e-mail, korzystając z wiadomości od Supabase."
      : "Nieprawidłowy e-mail lub hasło. Sprawdź dane i spróbuj ponownie.";
    showMessage("login-message", message);
  } finally {
    button.disabled = false;
    button.textContent = "Zaloguj się →";
  }
});


// OTWARCIE APLIKACJI

async function enterApp() {
  if (!currentUser) return;

  const { data: adminResult, error: adminError } = await supabaseClient.rpc("is_app_admin");
  isAdmin = !adminError && adminResult === true;
  if (adminError) console.warn("Admin role check failed:", adminError);

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


// NAWIGACJA

const pages = {
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

async function renderAdminPage() {
  const host = $("page-content");
  host.innerHTML = '<div class="page-content"><p>Ładowanie panelu administracji...</p></div>';
  const [profilesResult, reportsResult, moderationResult, badgesResult, donationResult] = await Promise.all([
    supabaseClient.from("profiles").select("id,nickname,class_name,is_visible").order("nickname"),
    supabaseClient.from("content_reports").select("id,reporter_id,reported_user_id,target_type,target_id,reason,created_at").order("created_at", {ascending:false}).limit(100),
    supabaseClient.from("user_moderation").select("id,user_id,action,reason,expires_at,created_at").is("revoked_at", null).order("created_at", {ascending:false}),
    supabaseClient.from("user_badges").select("user_id,badge"),
    supabaseClient.from("donation_ranking").select("user_id,amount,updated_at").order("amount",{ascending:false})
  ]);
  const errors = [profilesResult.error,reportsResult.error,moderationResult.error,badgesResult.error].filter(Boolean);
  if (errors.length) console.warn("Admin data load warnings:", errors);
  const profiles = profilesResult.data || [];
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
  const [privateReported, globalReported] = await Promise.all([
    messageReportIds.length ? supabaseClient.from("messages").select("id,content").in("id",messageReportIds) : Promise.resolve({data:[]}),
    messageReportIds.length ? supabaseClient.from("global_chat_messages").select("id,content").in("id",messageReportIds) : Promise.resolve({data:[]})
  ]);
  const reportedText = new Map([...(privateReported.data || []), ...(globalReported.data || [])].map(m => [m.id,m.content]));
  const reportsHtml = (reportsResult.data || []).map(report =>
    '<div class="admin-report"><strong>' + escapeHTML(nameById.get(report.reported_user_id) || "Nieznany użytkownik") +
    '</strong><small>' + escapeHTML(report.target_type === "message" ? "Zgłoszona wiadomość" : "Zgłoszony profil") +
    ' · ' + escapeHTML(new Date(report.created_at).toLocaleString("pl-PL")) + '</small>' +
    (report.target_type === "message" ? '<blockquote class="admin-reported-content">' + escapeHTML(reportedText.get(report.target_id) || "Wiadomość została usunięta.") + '</blockquote>' : '') +
    '<p>' + escapeHTML(report.reason || "Brak dodatkowego opisu.") + '</p></div>'
  ).join("");

  host.innerHTML = '<div class="admin-overview"><div class="admin-stat"><strong>' + profiles.length +
    '</strong><span>Widoczne profile</span></div><div class="admin-stat"><strong>' +
    (reportsResult.data || []).length + '</strong><span>Zgłoszenia</span></div><div class="admin-stat"><strong>' +
    (moderationResult.data || []).length + '</strong><span>Kary</span></div></div>' +
    '<div class="page-content admin-intro"><h3>Panel administracji</h3><p>Zarządzaj społecznością, wiadomościami i zgłoszeniami.</p></div>' +
    '<div class="admin-tabs" role="tablist">' +
      '<button type="button" class="admin-tab active" data-admin-tab="users">Użytkownicy</button>' +
      '<button type="button" class="admin-tab" data-admin-tab="reports">Zgłoszenia (' + (reportsResult.data || []).length + ')</button>' +
      '<button type="button" class="admin-tab" data-admin-tab="donations">Donaty</button>' +
    '</div>' +
    '<section class="admin-panel active" data-admin-panel="users"><h3 class="admin-section-title">Użytkownicy i moderacja</h3>' +
    '<div class="admin-user-list">' + (usersHtml || '<div class="page-content"><p>Brak widocznych profili.</p></div>') + '</div></section>' +
    '<section class="admin-panel" data-admin-panel="donations"><h3 class="admin-section-title">Ranking wpłat</h3>' +
    '<section class="donation-admin-card"><p>Wybierz użytkownika i wpisz łączną kwotę potwierdzonych wpłat. Miejsca w rankingu ustawią się automatycznie.</p>' +
    '<div class="donation-admin-form"><label>Użytkownik<select id="donation-user-select">' +
    profiles.map(profile => '<option value="' + profile.id + '">' + escapeHTML(profile.nickname) + '</option>').join("") +
    '</select></label><label>Kwota (zł)<input id="donation-amount-input" type="number" min="0" max="1000000" step="0.01" placeholder="100.00"></label>' +
    '<button type="button" class="admin-action-btn" id="donation-save">Zapisz kwotę</button></div>' +
    '<div class="donation-admin-list">' + (donationRowsHtml || '<p class="muted">Nie dodano jeszcze żadnych osób do rankingu.</p>') + '</div></section></section>' +
    '<section class="admin-panel" data-admin-panel="reports"><h3 class="admin-section-title">Zgłoszenia użytkowników i wiadomości</h3>' +
    '<div class="admin-report-list">' + (reportsHtml || '<div class="page-content"><p>Nie ma nowych zgłoszeń.</p></div>') + '</div></section>' +
    '<p class="admin-feedback" id="admin-feedback" aria-live="polite"></p>';

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
  if (!options.fromBack && page !== currentAppPage) appPageHistory.push(currentAppPage);
  currentAppPage = page;
  const backButton = $("app-back-button");
  if (backButton) backButton.hidden = page === "home" || appPageHistory.length === 0;
  const home = $("home-page");
  const other = $("other-page");

  if (page === "home") {
    home.classList.remove("hidden");
    other.classList.add("hidden");
  } else {
    const selected = pages[page];

    if (!selected) return;

    home.classList.add("hidden");
    other.classList.remove("hidden");

    $("page-title").textContent = selected.title;
    $("page-subtitle").textContent = selected.subtitle;

    if (page === "admin") {
      if (!isAdmin) {
        $("page-content").innerHTML = '<div class="page-content"><h3>Brak dostępu</h3><p>Ta sekcja jest dostępna wyłącznie dla administratora.</p></div>';
      } else {
        await renderAdminPage();
      }
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
    } else if (page === "ranking") {
      await renderRankingPage();
    } else if (page === "information") {
      renderInformationPage();
    } else {
      $("page-content").innerHTML = selected.content;
    }
  }

  document.querySelectorAll(".nav-item").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === page
    );
  });
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



// COMMUNITY IDEAS, RANKING AND INFORMATION

async function renderIdeasPage() {
  const host = $("page-content");
  host.innerHTML = '<div class="page-content"><p>Ładowanie pomysłów...</p></div>';
  const [ideasResult, votesResult, profilesResult] = await Promise.all([
    supabaseClient.from("community_ideas").select("id,author_id,title,description,created_at").order("created_at",{ascending:false}).limit(100),
    supabaseClient.from("community_idea_votes").select("idea_id,user_id,vote"),
    supabaseClient.from("public_profiles").select("id,nickname")
  ]);
  const error = ideasResult.error || votesResult.error || profilesResult.error;
  if (error) {
    host.innerHTML = '<div class="page-content"><p>Nie udało się załadować pomysłów. Spróbuj ponownie później.</p></div>';
    console.error("Ideas load error:", error);
    return;
  }
  const names = new Map((profilesResult.data || []).map(p => [p.id,p.nickname]));
  const votes = votesResult.data || [];
  const voteByUser = new Map(votes.filter(v => v.user_id === currentUser.id).map(v => [v.idea_id,v.vote]));
  const totals = new Map();
  votes.forEach(v => {
    const item = totals.get(v.idea_id) || {up:0,down:0};
    if (v.vote === 1) item.up++; else item.down++;
    totals.set(v.idea_id,item);
  });
  const cards = (ideasResult.data || []).map(idea => {
    const total = totals.get(idea.id) || {up:0,down:0};
    const myVote = voteByUser.get(idea.id);
    const own = idea.author_id === currentUser.id;
    return '<article class="idea-card"><div class="idea-card-head"><div><h3>' +
      escapeHTML(idea.title) + '</h3><small>' + escapeHTML(names.get(idea.author_id) || "Uczeń") +
      ' · ' + escapeHTML(new Date(idea.created_at).toLocaleDateString("pl-PL")) +
      '</small></div>' + (own || isAdmin ? '<button type="button" class="idea-delete" data-idea-delete="' + idea.id + '" aria-label="Usuń pomysł"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M5 7l1 14h12l1-14M9 7V4h6v3"/></svg></button>' : '') +
      '</div><p>' + escapeHTML(idea.description).replace(/\n/g,"<br>") + '</p>' +
      '<div class="idea-votes"><button type="button" class="idea-vote up ' + (myVote === 1 ? 'selected' : '') + '" data-idea-vote="1" data-idea-id="' + idea.id + '" aria-label="Popieram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg> <span>' + total.up + '</span></button>' +
      '<button type="button" class="idea-vote down ' + (myVote === -1 ? 'selected' : '') + '" data-idea-vote="-1" data-idea-id="' + idea.id + '" aria-label="Nie popieram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg> <span>' + total.down + '</span></button></div></article>';
  }).join("");
  host.innerHTML = '<div class="ideas-intro"><div class="ideas-intro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 22h4M8.5 14.5a6 6 0 1 1 7 0c-.8.6-1.2 1.3-1.3 2.5h-4.4c-.1-1.2-.5-1.9-1.3-2.5Z"/><path d="M12 2v2M4.9 4.9l1.4 1.4M19.1 4.9l-1.4 1.4"/></svg></div><div><strong>Masz pomysł na rozwój aplikacji?</strong><p>Opublikuj propozycję. Społeczność może ją poprzeć lub odrzucić.</p></div></div>' +
    '<form class="idea-form" id="idea-form"><h3>Dodaj nowy pomysł</h3><label>Tytuł<input id="idea-title" maxlength="90" minlength="4" required placeholder="Np. Nowa funkcja czatu"></label>' +
    '<label>Opis<textarea id="idea-description" maxlength="1200" minlength="10" required rows="4" placeholder="Opisz, jak miałaby działać ta funkcja..."></textarea></label>' +
    '<button type="submit" class="main-btn">Opublikuj pomysł</button><p class="idea-feedback" id="idea-feedback" aria-live="polite"></p></form>' +
    '<div class="ideas-list">' + (cards || '<div class="page-content"><p>Jeszcze nie ma pomysłów. Dodaj pierwszy!</p></div>') + '</div>';
  host.querySelector("#idea-form").addEventListener("submit", async event => {
    event.preventDefault();
    const button = event.currentTarget.querySelector('button[type="submit"]');
    const feedback = host.querySelector("#idea-feedback");
    button.disabled = true;
    const { error } = await supabaseClient.from("community_ideas").insert({
      author_id:currentUser.id,
      title:host.querySelector("#idea-title").value.trim(),
      description:host.querySelector("#idea-description").value.trim()
    });
    if (error) {
      feedback.textContent = error.message || "Nie udało się opublikować pomysłu.";
      button.disabled = false;
      return;
    }
    await renderIdeasPage();
  });
  host.querySelectorAll("[data-idea-vote]").forEach(button => button.addEventListener("click", async () => {
    button.disabled = true;
    const ideaId = button.dataset.ideaId;
    const value = Number(button.dataset.ideaVote);
    const existing = voteByUser.get(ideaId);
    let result;
    if (existing === value) {
      result = await supabaseClient.from("community_idea_votes").delete().eq("idea_id",ideaId).eq("user_id",currentUser.id);
    } else {
      result = await supabaseClient.from("community_idea_votes").upsert({
        idea_id:ideaId,user_id:currentUser.id,vote:value,updated_at:new Date().toISOString()
      },{onConflict:"idea_id,user_id"});
    }
    if (result.error) {
      const feedback = host.querySelector("#idea-feedback");
      if (feedback) feedback.textContent = result.error.message || "Nie udało się zapisać głosu.";
      button.disabled = false;
      return;
    }
    await renderIdeasPage();
  }));
  host.querySelectorAll("[data-idea-delete]").forEach(button => button.addEventListener("click", async () => {
    if (!confirm("Czy na pewno chcesz usunąć ten pomysł?")) return;
    button.disabled = true;
    const { error } = await supabaseClient.from("community_ideas").delete().eq("id",button.dataset.ideaDelete);
    if (error) {
      const feedback = host.querySelector("#idea-feedback");
      if (feedback) feedback.textContent = error.message || "Nie udało się usunąć pomysłu.";
      button.disabled = false;
      return;
    }
    await renderIdeasPage();
  }));
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
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
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
    '<strong>' + escapeHTML(comment.author || "Uczeń") +
    '</strong><span>' + escapeHTML(comment.text || "") + '</span></div>'
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
        <h3>Odkryj uczniów</h3>
        <p>Przeglądaj ankiety, poznawaj osoby o podobnych zainteresowaniach i nawiązuj znajomości.</p>
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


// USTAWIENIA

function renderSettingsPage() {
  const myProfile = getMyProfile();
  const privacy = myProfile?.privacy || { ...DEFAULT_PRIVACY };
  const selectedTheme = document.documentElement.dataset.theme || "system";
  const christmasEnabled = !document.getElementById("christmas-decorations")?.classList.contains("hidden");

  $("page-content").innerHTML = `
    <div class="page-content">
      <h3>Wygląd aplikacji</h3>
      <p>Wybierz motyw interfejsu. Ustawienie zostanie zapamiętane na tym urządzeniu.</p>
      <div class="field theme-select-field">
        <label for="theme-select">Motyw</label>
        <select id="theme-select" class="settings-select">
          <option value="system" ${selectedTheme === "system" ? "selected" : ""}>System · Standard</option>
          <option value="dark" ${selectedTheme === "dark" ? "selected" : ""}>DarkOS</option>
          <option value="liquid-glass" ${selectedTheme === "liquid-glass" ? "selected" : ""}>Liquid Glass</option>
        </select>
      </div>
      <div class="switch-row">
        <div>
          <div class="switch-label">Christmas Update</div>
          <div class="switch-hint">Tymczasowe dekoracje świąteczne: girlanda, śnieg, choinka i bałwan.</div>
        </div>
        <label class="toggle">
          <input type="checkbox" id="christmas-toggle" ${christmasEnabled ? "checked" : ""}>
          <span class="slider"></span>
        </label>
      </div>
    </div>

    <div class="page-content">
      <h3>Prywatność</h3>
      <p>Ustawienia prywatności profilu są zapisywane na Twoim koncie.</p>
      <div class="switch-row">
        <div>
          <div class="switch-label">Ankieta widoczna na liście</div>
          <div class="switch-hint">Gdy wyłączysz, Twój profil nie będzie wyświetlany w sekcji „Ankiety uczniów".</div>
        </div>
        <label class="toggle">
          <input type="checkbox" id="privacy-visible" ${privacy.visible !== false ? "checked" : ""}>
          <span class="slider"></span>
        </label>
      </div>
      <div class="switch-row">
        <div>
          <div class="switch-label">Pokazuj klasę w ankiecie</div>
          <div class="switch-hint">Ukrywa numer klasy na Twoim profilu publicznym.</div>
        </div>
        <label class="toggle">
          <input type="checkbox" id="privacy-class" ${privacy.showClass !== false ? "checked" : ""}>
          <span class="slider"></span>
        </label>
      </div>
      <div class="switch-row">
        <div>
          <div class="switch-label">Pokazuj zainteresowania w ankiecie</div>
          <div class="switch-hint">Ukrywa Twoje zainteresowania na profilu publicznym.</div>
        </div>
        <label class="toggle">
          <input type="checkbox" id="privacy-interests" ${privacy.showInterests !== false ? "checked" : ""}>
          <span class="slider"></span>
        </label>
      </div>
    </div>

    <button class="logout" id="logout-button">Wyloguj się</button>
  `;

  $("theme-select").addEventListener("change", event => applyTheme(event.target.value));
  $("christmas-toggle").addEventListener("change", event => applyChristmasDecorations(event.target.checked));

  const privacyInputs = {
    visible: $("privacy-visible"),
    showClass: $("privacy-class"),
    showInterests: $("privacy-interests")
  };

  Object.keys(privacyInputs).forEach(key => {
    privacyInputs[key].addEventListener("change", () => {
      const existing = getMyProfile();
      saveMyProfile({
        nickname: existing?.nickname || currentUser.name,
        klasa: existing?.klasa || "",
        bio: existing?.bio || "",
        interests: existing?.interests || [],
        photo: existing?.photo || "",
        photoPath: existing?.photoPath || null,
        privacy: {
          visible: privacyInputs.visible.checked,
          showClass: privacyInputs.showClass.checked,
          showInterests: privacyInputs.showInterests.checked
        }
      }).catch(error => {
        console.error("Privacy settings save error:", error);
        alert("Nie udało się zapisać ustawień prywatności. Spróbuj ponownie.");
      });
    });
  });

  $("logout-button").addEventListener("click", logout);
}



// PUBLIC COMMUNITY PROFILES — independent from student discovery questionnaires.
const COMMUNITY_ASSET_BUCKET = "community-profile-assets";
const COMMUNITY_BANNERS = ["aurora","ocean","midnight","nebula","waves"];
const AVATAR_DECORATIONS = ["none","orbit","glow","crown","ice"];

async function loadCommunityProfile(userId) {
  if (!userId || !supabaseClient) return null;
  const { data, error } = await supabaseClient.from("community_profiles")
    .select("user_id,nickname,status_text,bio,interests,class_name,first_name,last_name,avatar_path,banner_path,avatar_decoration,banner_theme,created_at,updated_at")
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
  const accountRole = roleBadge === "admin" ? "admin" : roleBadge === "premium" ? "premium" : "zwykły";
  const joined = profile?.created_at ? new Date(profile.created_at).toLocaleDateString("pl-PL",{month:"long",year:"numeric"}) : "Niedawno";
  return '<article class="community-profile-card">' +
    communityBannerMarkup(profile) +
    '<div class="community-profile-main">' +
      '<div class="community-profile-identity">' + communityAvatarMarkup(profile) +
        '<div class="community-profile-heading"><h2>' + escapeHTML(profile?.nickname || "Uczeń") + '</h2>' +
          (name ? '<p class="community-profile-realname">' + escapeHTML(name) + '</p>' : '') +
          '<p class="community-profile-status community-role-badge role-' + accountRole + '">' + accountRole.toUpperCase() + '</p>' +
        '</div>' +
        (own ? '<button type="button" class="community-edit-btn" id="community-edit-profile">✎ Edytuj profil</button>' : '') +
      '</div>' +
      '<div class="community-profile-columns">' +
        '<section class="community-profile-section"><h3>O mnie</h3><p>' + escapeHTML(profile?.bio || "Ten użytkownik nie dodał jeszcze opisu.") + '</p>' +
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
      user_id:currentUser.id,nickname:currentUser.name,status_text:"",bio:"",interests:[],
      class_name:"",first_name:"",last_name:"",avatar_path:null,banner_path:null,
      avatar_decoration:"none",banner_theme:"aurora",created_at:new Date().toISOString()
    };
    const {data:badgeRow} = await supabaseClient.from("user_badges").select("badge").eq("user_id",currentUser.id).maybeSingle();
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

function renderCommunityProfileEditor(profile, roleBadge) {
  const host = $("page-content");
  const accountRole = roleBadge === "admin" ? "admin" : roleBadge === "premium" ? "premium" : "zwykły";
  const current = profile || {nickname:currentUser.name,interests:[],avatar_decoration:"none",banner_theme:"aurora"};
  const bannerChoices = COMMUNITY_BANNERS.map(theme =>
    '<label class="community-theme-choice"><input type="radio" name="community-banner-theme" value="'+theme+'" '+((current.banner_theme||"aurora")===theme?"checked":"")+'><span class="theme-preview theme-'+theme+'"></span><small>'+({aurora:"Aurora",ocean:"Ocean",midnight:"Midnight",nebula:"Nebula",waves:"Waves"}[theme])+'</small></label>'
  ).join("");
  const decorationChoices = AVATAR_DECORATIONS.map(theme =>
    '<label class="community-decoration-choice"><input type="radio" name="community-avatar-decoration" value="'+theme+'" '+((current.avatar_decoration||"none")===theme?"checked":"")+'><span class="decor-preview decor-'+theme+'">'+(theme==="none"?"○":theme==="orbit"?"◉":theme==="glow"?"✧":theme==="crown"?"♛":"❄")+'</span><small>'+({none:"Brak",orbit:"Orbit",glow:"Glow",crown:"Crown",ice:"Ice"}[theme])+'</small></label>'
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
        bio:$("community-bio").value.trim(),
        interests:$("community-interests").value.split(",").map(x=>x.trim()).filter(Boolean).slice(0,10),
        class_name:$("community-class").value.trim(),first_name:$("community-first-name").value.trim(),
        last_name:$("community-last-name").value.trim(),avatar_path:avatarPath,banner_path:bannerPath,
        avatar_decoration:communityForm.querySelector('input[name="community-avatar-decoration"]:checked')?.value||"none",
        banner_theme:communityForm.querySelector('input[name="community-banner-theme"]:checked')?.value||"aurora",
        updated_at:new Date().toISOString()
      };
      const {data,error}=await supabaseClient.from("community_profiles").upsert(row,{onConflict:"user_id"})
        .select("user_id,nickname,status_text,bio,interests,class_name,first_name,last_name,avatar_path,banner_path,avatar_decoration,banner_theme,created_at,updated_at").single();
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
  let profile;
  try {
    profile = await loadCommunityProfile(userId);
  } catch (error) {
    alert("Nie udało się otworzyć profilu.");
    return;
  }
  if (!profile) profile = {user_id:userId,nickname:"Uczeń",status_text:"",bio:"",interests:[],avatar_decoration:"none",banner_theme:"aurora"};
  const [{data:badgeRow},{data:adminRows}] = await Promise.all([
    supabaseClient.from("user_badges").select("badge").eq("user_id",userId).maybeSingle(),
    loadAdminFlagsByIds([userId]).then(ids=>({data:[{is_admin:ids.has(userId)}]}))
  ]);
  const roleBadge = adminRows?.[0]?.is_admin ? "admin" : (badgeRow?.badge || null);
  const own = userId === currentUser?.id;
  const overlay=document.createElement("div");
  overlay.className="community-profile-overlay";
  overlay.innerHTML='<div class="community-profile-dialog" role="dialog" aria-modal="true" aria-label="Profil użytkownika">' +
    '<button type="button" class="community-profile-close" aria-label="Zamknij">×</button>' +
    communityProfileHTML(profile,roleBadge,own) + '</div>';
  document.body.appendChild(overlay);
  const close=()=>overlay.remove();
  overlay.querySelector(".community-profile-close").addEventListener("click",close);
  overlay.addEventListener("click",e=>{if(e.target===overlay)close();});
  overlay.querySelector("#community-edit-profile")?.addEventListener("click",()=>{close();openPage("my-profile");});
  const esc=e=>{if(e.key==="Escape"){close();document.removeEventListener("keydown",esc);}};
  document.addEventListener("keydown",esc);
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
  return '<button class="accept-btn" data-action="add-friend" data-person-id="' + escapeHTML(profile.id) + '">Poproś o kontakt</button>' + blockButton;
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

  const friendsHTML = friendsDataCache.friends.map(profile => personCardHTML(profile, `
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

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function myDisplayInfo() {
  const myProfile = getMyProfile();
  return { nickname: myProfile?.nickname || currentUser.name };
}

async function renderChatList() {
  if (globalChatChannel) { await supabaseClient.removeChannel(globalChatChannel); globalChatChannel = null; }
  if (activeChatChannel) {
    await supabaseClient.removeChannel(activeChatChannel);
    activeChatChannel = null;
  }
  if (chatListChannel) {
    await supabaseClient.removeChannel(chatListChannel);
    chatListChannel = null;
  }
  activeConversationId = null;
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

  let latestByConversation = new Map();
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
    return `
      <button type="button" class="conv-item" data-conv="${escapeHTML(conv.id)}">
        ${profileAvatarHTML(profile, "conv-avatar")}
        <div class="conv-info">
          <div class="conv-nick">${escapeHTML(profile.nickname)}${profile.isAdmin ? '<span class="user-role-badge admin-role">ADMIN</span>' : profile.badge === "premium" ? '<span class="user-role-badge premium-role">PREMIUM</span>' : ""}</div>
          <div class="conv-last">${escapeHTML(preview)}</div>
        </div>
      </button>
    `;
  }).join("");

  $("page-content").innerHTML = `
    <button type="button" class="global-chat-entry" id="open-global-chat">
      <span class="global-chat-entry-icon">🌐</span>
      <span class="global-chat-entry-copy"><strong>Czat ogólny</strong><small>Rozmowa wszystkich użytkowników</small></span>
      <span class="global-chat-entry-arrow">›</span>
    </button>
    <div class="page-content">
      <h3>Rozmowy prywatne</h3>
      <p>Możesz pisać do zaakceptowanych znajomych. Czat obsługuje wyłącznie wiadomości tekstowe.</p>
    </div>
    <div class="conv-list">${items || '<div class="page-content"><p>Nie masz jeszcze rozmów. Dodaj znajomego, aby rozpocząć czat.</p></div>'}</div>
  `;
  $("open-global-chat").addEventListener("click", openGlobalChat);
  $("page-content").querySelectorAll("[data-conv]").forEach(button => {
    button.addEventListener("click", () => openChat(button.dataset.conv));
  });
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


async function openGlobalChat() {
  if (activeChatChannel) { await supabaseClient.removeChannel(activeChatChannel); activeChatChannel = null; }
  if (chatListChannel) { await supabaseClient.removeChannel(chatListChannel); chatListChannel = null; }
  if (globalChatChannel) { await supabaseClient.removeChannel(globalChatChannel); globalChatChannel = null; }
  activeConversationId = null;
  const { data, error } = await supabaseClient.from("global_chat_messages")
    .select("id,sender_id,content,created_at,edited_at,reply_to_id").order("created_at", {ascending:false}).limit(100);
  if (error) {
    console.error("Global chat load error:", error);
    $("page-content").innerHTML = '<div class="page-content"><p>Nie udało się załadować czatu ogólnego. Odśwież stronę.</p></div>';
    return;
  }
  const messages = (data || []).reverse();
  await loadProfilesByIds(messages.map(item => item.sender_id));
  const ids = messages.map(item => item.id);
  const {data: likeRows} = ids.length
    ? await supabaseClient.from("global_chat_message_likes").select("message_id,user_id").in("message_id",ids)
    : {data:[]};
  const likeMap = new Map();
  (likeRows || []).forEach(row => {
    const item = likeMap.get(row.message_id) || {count:0,liked:false};
    item.count++; if (row.user_id === currentUser.id) item.liked = true;
    likeMap.set(row.message_id,item);
  });
  const byId = new Map(messages.map(item => [item.id,item]));
  const rows = messages.map(item => {
    const mine = item.sender_id === currentUser.id;
    const profile = mine ? getMyProfile() : getProfileById(item.sender_id);
    const nickname = profile?.nickname || "Użytkownik";
    const role = (mine ? isAdmin : profile?.isAdmin) ? '<span class="user-role-badge admin-role">ADMIN</span>' :
      profile?.badge === "premium" ? '<span class="user-role-badge premium-role">PREMIUM</span>' : "";
    const likes = likeMap.get(item.id) || {count:0,liked:false};
    const parent = byId.get(item.reply_to_id);
    return '<article class="global-message' + (mine ? ' own' : '') + '" data-global-message="' + item.id + '">' +
      '<div class="global-message-meta"><strong>' + escapeHTML(nickname) + '</strong>' + role +
      '<time>' + escapeHTML(formatTime(item.created_at)) + (item.edited_at ? ' · edytowano' : '') + '</time></div>' +
      (parent ? '<div class="bubble-reply-context">↳ ' + escapeHTML(parent.content.slice(0,100)) + '</div>' : '') +
      '<p>' + escapeHTML(item.content) + '</p><div class="bubble-actions">' +
      (mine ? '<button type="button" class="msg-action" data-global-action="edit" data-id="' + item.id + '">Edytuj</button><button type="button" class="msg-action danger" data-global-action="delete" data-id="' + item.id + '">Usuń</button>' :
        '<button type="button" class="msg-action" data-global-action="report" data-id="' + item.id + '" data-user="' + item.sender_id + '">Zgłoś</button>') +
      '<button type="button" class="msg-action" data-global-action="reply" data-id="' + item.id + '">Odpowiedz</button>' +
      '<button type="button" class="msg-action' + (likes.liked ? ' liked' : '') + '" data-global-action="like" data-id="' + item.id + '">♥ ' + likes.count + '</button></div></article>';
  }).join("");
  $("page-content").innerHTML =
    '<div class="global-chat-head"><button type="button" class="chat-back" id="global-chat-back">‹</button><div><strong>Czat ogólny</strong><small>Wszyscy użytkownicy aplikacji</small></div></div>' +
    '<div class="global-chat-notice">Rozmawiaj z szacunkiem. Nie publikuj danych osobowych.</div>' +
    '<div class="global-chat-messages" id="global-chat-messages">' + (rows || '<p class="global-chat-empty">Nie ma jeszcze wiadomości. Napisz pierwszą!</p>') + '</div>' +
    (currentMute ? '<div class="global-chat-muted">Wysyłanie wiadomości jest tymczasowo wyłączone.<br>Powód: ' + escapeHTML(currentMute.reason) +
      '<br>Do: ' + escapeHTML(formatModerationExpiry(currentMute.expires_at)) + '</div>' :
      '<form class="global-chat-composer" id="global-chat-form"><div id="global-reply-hint" class="chat-reply-hint hidden"></div><input id="global-chat-input" maxlength="500" autocomplete="off" placeholder="Napisz na czacie ogólnym…"><button type="submit" aria-label="Wyślij">➤</button></form>');
  $("global-chat-back").addEventListener("click", renderChatList);
  $("page-content").querySelectorAll("[data-global-action]").forEach(button => button.addEventListener("click", async () => {
    const id = button.dataset.id, action = button.dataset.globalAction, message = byId.get(id);
    if (action === "report") {
      const reason = "";
      const ok = await submitContentReport("message",id,button.dataset.user,reason);
      if (ok) {button.textContent="Zgłoszono";button.disabled=true;}
    } else if (action === "reply") {
      replyToMessageId = id;
      const input = $("global-chat-input"); if (input) {input.placeholder="Odpowiedź na wiadomość…";input.focus();}
      const hint = $("global-reply-hint"); if (hint) {hint.textContent="Odpowiadasz: "+(message?.content || "").slice(0,90);hint.classList.remove("hidden");}
    } else if (action === "edit") {
      const value = prompt("Edytuj wiadomość:",message?.content || "");
      if (value === null) return;
      const content=value.trim().slice(0,500); if(!content)return alert("Wiadomość nie może być pusta.");
      const {error}=await supabaseClient.from("global_chat_messages").update({content,edited_at:new Date().toISOString()}).eq("id",id).eq("sender_id",currentUser.id);
      if(error)return alert("Nie udało się edytować wiadomości.");
      await openGlobalChat();
    } else if (action === "delete") {
      if(!confirm("Usunąć tę wiadomość?"))return;
      const {error}=await supabaseClient.from("global_chat_messages").delete().eq("id",id).eq("sender_id",currentUser.id);
      if(error)return alert("Nie udało się usunąć wiadomości.");
      await openGlobalChat();
    } else if (action === "like") {
      const liked=likeMap.get(id)?.liked;
      const result=liked
        ? await supabaseClient.from("global_chat_message_likes").delete().eq("message_id",id).eq("user_id",currentUser.id)
        : await supabaseClient.from("global_chat_message_likes").insert({message_id:id,user_id:currentUser.id});
      if(result.error)return alert("Nie udało się zmienić polubienia.");
      await openGlobalChat();
    }
  }));
  if (!currentMute) {
    $("global-chat-form").addEventListener("submit", async event => {
      event.preventDefault();
      const input = $("global-chat-input"), content = input.value.trim();
      if (!content) return;
      const button = event.currentTarget.querySelector("button"); button.disabled = true;
      const { error: sendError } = await supabaseClient.from("global_chat_messages").insert({sender_id:currentUser.id,content,reply_to_id:replyToMessageId});
      button.disabled = false;
      if (sendError) { console.error("Global chat send error:",sendError); alert("Nie udało się wysłać wiadomości. Możliwe, że obowiązuje wyciszenie."); return; }
      replyToMessageId=null; input.value = ""; await openGlobalChat();
    });
  }
  const box = $("global-chat-messages"); if (box) box.scrollTop = box.scrollHeight;
  globalChatChannel = supabaseClient.channel("global-chat-live")
     .on("postgres_changes",{event:"*",schema:"public",table:"global_chat_messages"},async payload=>{
      const fresh=payload.new;
      if ($("global-chat-messages")) await openGlobalChat();
    }).subscribe();
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
  if (ids.length) {
    const {data: likeRows, error: likeError} = await supabaseClient.from("message_likes").select("message_id,user_id").in("message_id",ids);
    if (likeError) console.warn("Message likes load error:",likeError);
    (likeRows || []).forEach(row => {
      const item = chatMessageLikesCache.get(row.message_id) || {count:0,liked:false};
      item.count++;
      if (row.user_id === currentUser.id) item.liked = true;
      chatMessageLikesCache.set(row.message_id,item);
    });
  }
  return rows;
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
  const parent = allMessages.find(item => item.id === message.reply_to_id);
  const actions = '<div class="bubble-actions">' +
    (mine
      ? '<button type="button" class="msg-action" data-action="edit-msg" data-msg-id="' + escapeHTML(message.id) + '">Edytuj</button><button type="button" class="msg-action danger" data-action="delete-msg" data-msg-id="' + escapeHTML(message.id) + '">Usuń</button>'
      : (alreadyReported ? '<span class="chat-reported">Zgłoszono</span>' : '<button type="button" class="msg-action" data-action="report-msg" data-msg-id="' + escapeHTML(message.id) + '" data-sender-id="' + escapeHTML(message.sender_id) + '">Zgłoś</button>') +
        '<button type="button" class="msg-action" data-action="block-person" data-person-id="' + escapeHTML(message.sender_id) + '">Blokuj</button>') +
    '<button type="button" class="msg-action" data-action="reply-msg" data-msg-id="' + escapeHTML(message.id) + '">Odpowiedz</button>' +
    '<button type="button" class="msg-action' + (likes.liked ? ' liked' : '') + '" data-action="like-msg" data-msg-id="' + escapeHTML(message.id) + '">♥ ' + likes.count + '</button></div>';
  return '<div class="chat-row' + (mine ? ' mine' : '') + '"><div class="bubble">' +
    (mine ? '' : '<div class="bubble-author">' + escapeHTML(sender.nickname) + senderBadge + '</div>') +
    (parent ? '<div class="bubble-reply-context">↳ ' + escapeHTML(parent.content.slice(0,100)) + '</div>' : '') +
    '<div class="bubble-text" data-msg-id="' + escapeHTML(message.id) + '"></div>' +
    '<div class="bubble-time">' + formatTime(new Date(message.created_at).getTime()) + (message.edited_at ? ' · edytowano' : '') + '</div>' +
    actions + '</div></div>';
}

function renderMessages(messages) {
  const container = $("chat-msgs");
  if (!container) return;
  container.innerHTML = messages.length
    ? messages.map(message => messageBubbleHTML(message, messages)).join("")
    : '<div class="page-content"><p>Brak wiadomości. Napisz pierwszą!</p></div>';
  messages.forEach(message => {
    const element = container.querySelector('.bubble-text[data-msg-id="' + CSS.escape(message.id) + '"]');
    if (element) element.textContent = message.content;
  });
  container.querySelectorAll("[data-action]").forEach(button => button.addEventListener("click", async () => {
    const action = button.dataset.action, id = button.dataset.msgId;
    if (action === "report-msg") {
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
    <div class="chat-head">
      <button type="button" class="chat-back" id="chat-back" aria-label="Powrót do rozmów">‹</button>
      ${profileAvatarHTML(activeChatProfile, "conv-avatar small")}
      <div class="chat-head-info">
        <div class="chat-head-nick">${escapeHTML(activeChatProfile.nickname)}${activeChatProfile.isAdmin ? '<span class="user-role-badge admin-role">ADMIN</span>' : activeChatProfile.badge === "premium" ? '<span class="user-role-badge premium-role">PREMIUM</span>' : ""}</div>
        <div class="chat-head-status">Prywatna rozmowa · tylko tekst</div>
      </div>
      <button type="button" class="chat-block-btn" id="chat-block">${blocked ? "Odblokuj" : "Blokuj"}</button>
    </div>
    <div class="chat-msgs" id="chat-msgs"></div>
    ${blocked
      ? '<div class="page-content"><p>Ten użytkownik jest zablokowany. Odblokuj go, aby ponownie wysyłać wiadomości.</p></div>'
      : !canSend
        ? '<div class="page-content"><p>Wiadomości w tej rozmowie są obecnie niedostępne.</p></div>'
        : `
      <div class="composer-wrap">
        <form class="chat-composer" id="chat-form">
          <input id="chat-input" class="chat-input" type="text" maxlength="${MAX_MESSAGE_LENGTH}"
            placeholder="Napisz wiadomość..." autocomplete="off">
          <button class="chat-send" type="submit" aria-label="Wyślij">➤</button>
        </form>
        <div class="char-hint" id="char-hint">0 / ${MAX_MESSAGE_LENGTH}</div>
      </div>`}
  `;

  $("chat-back").addEventListener("click", () => renderChatList());
  $("chat-block").addEventListener("click", async () => {
    if (isBlocked(otherId)) await unblockUser(otherId);
    else await blockUser(otherId);
    await openChat(conversationId);
  });

  const messages = await loadConversationMessages(conversationId);
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
    .subscribe();
}

function bindComposer(conversationId) {
  const form = $("chat-form");
  const input = $("chat-input");
  const hint = $("char-hint");
  input.addEventListener("input", () => {
    hint.textContent = input.value.length + " / " + MAX_MESSAGE_LENGTH;
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
    replyToMessageId = null;
    input.placeholder = "Napisz wiadomość...";
    hint.textContent = "0 / " + MAX_MESSAGE_LENGTH;
    const fresh = await loadConversationMessages(conversationId);
    renderMessages(fresh);
    await loadNotifications();
    input.focus();
  });
}

async function loadNotifications() {
  if (!currentUser?.id) return [];
  const { data, error } = await supabaseClient.from("notifications")
    .select("id,type,title,body,related_user_id,related_id,read_at,created_at")
    .eq("user_id", currentUser.id)
    .order("created_at", { ascending: false })
    .limit(60);
  if (error) {
    console.error("Notifications load error:", error);
    return notificationsCache;
  }
  notificationsCache = data || [];
  updateNotifBadge();
  return notificationsCache;
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
    <div class="page-content">
      <h3>Powiadomienia</h3>
      <p>Zaproszenia, wiadomości i aktywność przy Twojej ankiecie.</p>
    </div>
    <div class="conv-list">${items || '<div class="page-content"><p>Nie masz jeszcze powiadomień.</p></div>'}</div>
  `;
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
      } else if (notification.type === "friend_request" || notification.type === "friend_accepted") {
        await openPage("friends");
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
}

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
  if (activeChatChannel) {
    await supabaseClient.removeChannel(activeChatChannel);
    activeChatChannel = null;
  }
  if (chatListChannel) {
    await supabaseClient.removeChannel(chatListChannel);
    chatListChannel = null;
  }
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
  if (supabaseClient) {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.error("Supabase sign-out error:", error);
      alert("Nie udało się wylogować. Spróbuj ponownie.");
      return;
    }
  }

  currentUser = null;
  isAdmin = false;
  isBanned = false;
  currentUserBadge = null;
  currentMute = null;
  myProfileCache = null;
  publicProfilesCache = [];
  profileSocialCache = {};
  friendsDataCache = { incoming: [], outgoing: [], friends: [] };
  blockedUsersCache = [];
  notificationsCache = [];
  reportsCache = [];
  reportedMessageIdsCache = [];
  conversationsCache = [];
  activeConversationId = null;
  activeChatProfile = null;
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
    showMessage("register-message", authUnavailableMessage());
    return;
  }

  try {
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) throw error;

    if (data.session?.user) {
      currentUser = getAppUser(data.session.user);
      enterApp();
    }
  } catch (error) {
    console.error("Supabase session restore error:", error);
    showMessage(
      "register-message",
      "Nie udało się przywrócić sesji. Odśwież stronę i spróbuj ponownie."
    );
  }
}

restoreSupabaseSession();
