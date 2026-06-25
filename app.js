/**
 * Ludo'sphère - Application JavaScript
 * Gestion du calendrier Google et affichage des événements
 */

// Variables globales
var allEvents = [];
var monthOffset = 0;
var currentView = 'list';
var maxResultsValue = 20;

// Constantes
var MONTHS_LONG = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
var MONTHS_SHORT = ["jan", "fév", "mar", "avr", "mai", "jun", "jui", "aoû", "sep", "oct", "nov", "déc"];
var DAYS_LONG = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

/**
 * Initialisation - appelée au chargement du DOM
 */
function init() {
  console.log("📱 Ludo'sphère — Initialisation");
  fetchEvents();
}

/**
 * Récupérer les événements depuis Google Calendar API
 */
function fetchEvents() {
  var now = new Date();
  var oneYearFromNow = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

  var url = "https://www.googleapis.com/calendar/v3/calendars/" + 
    encodeURIComponent(CONFIG.CALENDAR.CALENDAR_ID) + 
    "/events?key=" + CONFIG.CALENDAR.API_KEY + 
    "&timeMin=" + now.toISOString() + 
    "&timeMax=" + oneYearFromNow.toISOString() + 
    // "&maxResults=" + maxResultsValue + 
    "&maxResults=" + 250 +
    "&singleEvents=true&orderBy=startTime";

  document.getElementById("skeleton").style.display = "flex";

  fetch(url)
    .then(function(response) {
      if (!response.ok) throw new Error("Erreur API: " + response.status);
      return response.json();
    })
    .then(function(data) {
      console.log("✅ Événements chargés:", data.items ? data.items.length : 0);
      allEvents = data.items || [];
      document.getElementById("skeleton").style.display = "none";
      renderList(allEvents.filter(function(e) { return !e.summary || !e.summary.includes("[EVENT]"); }));
      renderMonth(allEvents);
      renderNextCard(allEvents.filter(function(e) { return !e.summary || !e.summary.includes("[EVENT]"); }));
      displayPartnerships();
    })
    .catch(function(error) {
      console.error("❌ Erreur API:", error.message);
      document.getElementById("skeleton").style.display = "none";
      showDemoMode();
    });
}

/**
 * Afficher le mode démo en cas d'erreur
 */
function showDemoMode() {
  var container = document.getElementById("events-container");
  container.innerHTML = '<div class="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3"><p class="text-sm font-medium text-yellow-800">⚠️ Mode démo</p><p class="text-xs text-yellow-700 mt-1">La clé API n\'a pas pu charger les événements. Remplacez COLLE_TA_CLE_API_ICI par votre clé Google.</p></div>';
}

/**
 * Afficher la liste des événements
 */
function renderList(events) {
  var filtered = events.filter(function(e) { return !e.summary || !e.summary.includes("[EVENT]"); }).slice(0, maxResultsValue);
  var container = document.getElementById("events-container");
  container.innerHTML = "";
  document.getElementById("event-count").textContent = filtered.length + " événement" + (filtered.length > 1 ? "s" : "");

  if (filtered.length === 0) {
    container.innerHTML = '<div class="text-center py-8 text-zinc-400"><p class="text-sm">Aucun événement prévu pour le moment.</p></div>';
    return;
  }

  filtered.forEach(function(event) {
    var dd = getDate(event);
    var dateStr = DAYS_LONG[dd.getDay()] + " " + dd.getDate() + " " + MONTHS_LONG[dd.getMonth()];
    var timeStr = formatTime(dd);
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var isToday = dd.toDateString() === today.toDateString();
    var card = document.createElement("div");
    card.className = "event-card rounded-lg px-4 py-4 flex gap-3 cursor-default";
    card.innerHTML = '<div class="text-2xl flex-shrink-0">' + getEventIcon(event.summary) + '</div><div class="flex-1 min-w-0"><div class="flex items-center gap-2"><h3 class="font-medium text-sm">' + (event.summary || "Soirée jeux") + (isToday ? '<span class="today-pill">Aujourd\'hui</span>' : "") + '</h3></div><div class="text-xs text-zinc-400 mt-0.5">' + dateStr + ' · ' + timeStr + '</div>' + (event.location ? '<div class="text-xs text-zinc-400 mt-1">📍 ' + event.location + '</div>' : "") + (event.description ? '<div class="text-xs text-zinc-500 mt-2 line-clamp-2">' + event.description.split("\n")[0] + '</div>' : "") + '</div>';
    container.appendChild(card);
  });
}

/**
 * Afficher le calendrier mensuel
 */
function renderMonth(events) {
  var d = new Date(new Date().getFullYear(), new Date().getMonth() + monthOffset, 1);
  var year = d.getFullYear();
  var month = d.getMonth();
  document.getElementById("month-title").textContent = MONTHS_LONG[month] + " " + year;
  var grid = document.getElementById("calendar-grid");
  grid.innerHTML = "";
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  
  var hdr = document.createElement("div");
  hdr.className = "grid grid-cols-7 mb-1";
  ["L", "M", "M", "J", "V", "S", "D"].forEach(function(l) {
    var c = document.createElement("div");
    c.className = "text-center text-xs text-zinc-400 font-medium py-1";
    c.textContent = l;
    hdr.appendChild(c);
  });
  grid.appendChild(hdr);
  
  var dg = document.createElement("div");
  dg.className = "grid grid-cols-7 gap-0.5";
  for (var i = 0; i < firstDay; i++) dg.appendChild(document.createElement("div"));
  
  for (var day = 1; day <= daysInMonth; day++) {
    var ev = null;
    for (var j = 0; j < events.length; j++) {
      var dd = getDate(events[j]);
      if (dd.getDate() === day && dd.getMonth() === month && dd.getFullYear() === year && (!events[j].summary || !events[j].summary.includes("[EVENT]"))) {
        ev = events[j];
        break;
      }
    }
    var isToday = new Date(year, month, day).toDateString() === new Date().toDateString();
    var cell = document.createElement("div");
    cell.className = ["h-10 flex flex-col items-center justify-center rounded-lg text-sm relative", isToday ? "bg-ink text-paper font-bold" : "hover:bg-mist", ev && !isToday ? "font-semibold cursor-pointer" : "cursor-default"].join(" ");
    cell.title = ev ? getEventIcon(ev.summary) + " " + (ev.summary || "Soiree jeux") : "";
    cell.innerHTML = "<span>" + day + "</span>" + (ev ? '<span class="absolute bottom-1 w-1 h-1 rounded-full ' + (isToday ? "bg-soft" : "bg-accent") + '"></span>' : "");
    dg.appendChild(cell);
  }
  grid.appendChild(dg);
  
  var monthEvs = events.filter(function(e) { var dd = getDate(e); return dd.getMonth() === month && dd.getFullYear() === year && (!e.summary || !e.summary.includes("[EVENT]")); });
  var ml = document.getElementById("month-events");
  ml.innerHTML = "";
  if (monthEvs.length) {
    var sep = document.createElement("p");
    sep.className = "text-xs font-medium tracking-widest uppercase text-zinc-400 mt-5 mb-2";
    sep.textContent = monthEvs.length + " soiree" + (monthEvs.length > 1 ? "s" : "") + " ce mois";
    ml.appendChild(sep);
    monthEvs.forEach(function(ev) {
      var dd = getDate(ev);
      var el = document.createElement("div");
      el.className = "event-card rounded-lg px-4 py-3 flex gap-3 cursor-default";
      el.innerHTML = '<div class="text-xl">' + getEventIcon(ev.summary) + '</div><div class="flex-1"><div class="font-medium text-sm">' + (ev.summary || "Soiree jeux") + '</div><div class="text-xs text-zinc-400">' + DAYS_LONG[dd.getDay()] + " " + dd.getDate() + " " + MONTHS_LONG[dd.getMonth()] + " · " + formatTime(dd) + "</div></div>";
      ml.appendChild(el);
    });
  } else {
    ml.innerHTML = '<p class="text-xs text-zinc-400 text-center py-4">Aucune soiree ce mois.</p>';
  }
}

/**
 * Afficher la prochaine soirée (carte hero)
 */
function renderNextCard(events) {
  if (events.length === 0) {
    document.getElementById("next-card").style.display = "none";
    return;
  }
  var next = events[0];
  var dd = getDate(next);
  document.getElementById("next-card").style.display = "block";
  document.getElementById("next-icon").textContent = getEventIcon(next.summary);
  document.getElementById("next-date").textContent = dd.getDate();
  document.getElementById("next-month").textContent = MONTHS_LONG[dd.getMonth()] + " " + dd.getFullYear();
  document.getElementById("next-title").textContent = (next.summary || "Soirée jeux");
  document.getElementById("next-where").textContent = (next.location ? "📍 " + next.location : "");
  document.getElementById("next-desc").textContent = (next.description || "");
}

/**
 * BANDEAU PARTENARIATS - Afficher les événements marqués [EVENT]
 */
function displayPartnerships() {
  var list = document.getElementById("partnerships-list");
  var banner = document.getElementById("partnerships-banner");
  if (!list) return;

  var partnerships = allEvents.filter(function(e) {
    return e.summary && e.summary.includes("[EVENT]");
  });

  console.log("🤝 Partenariats trouvés:", partnerships.length);

  if (partnerships.length === 0) {
    banner.style.display = "none";
    return;
  }

  list.innerHTML = "";
  partnerships.slice(0, 3).forEach(function(event) {
    var dateStr = (event.start.dateTime || event.start.date).split("T")[0];
    var daysRemaining = Math.ceil((new Date(dateStr).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    var isUrgent = daysRemaining >= 0 && daysRemaining < 7;
    var badge = daysRemaining < 0 ? "✓ Passé" : "J-" + daysRemaining;
    var date = new Date(dateStr);
    var time = event.start.dateTime ? new Date(event.start.dateTime).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : "";

    // Nettoyer le titre : enlever "[EVENT] "
    var cleanTitle = event.summary.replace("[EVENT] ", "").trim();

    // Extraire URL de la description
    var url = "";
    if (event.description) {
      var match = event.description.match(/https?:\/\/[^\s<>"{}|\\^`\[\]]+/);
      if (match) url = match[0];
    }

    var card = document.createElement("a");
    card.href = url || "#";
    card.target = "_blank";
    card.className = (isUrgent ? "bg-red-50" : "bg-white") + " border-l-4 " + (isUrgent ? "border-l-red-500" : "border-l-blue-500") + " rounded-lg px-4 py-3 flex justify-between items-center hover:shadow-md transition-all duration-200 block";
    card.style.textDecoration = "none";
    card.innerHTML = '<div><h4 class="font-medium text-sm text-gray-800">' + cleanTitle + '</h4><div class="text-xs text-gray-500 mt-1"><span>📅 ' + date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "long" }) + ' · ' + time + '</span></div><div class="text-xs text-gray-500"><span>📍 ' + (event.location || "Localisation à préciser") + '</span></div></div><div class="flex items-center gap-3 ml-4 flex-shrink-0"><span class="' + (isUrgent ? "bg-red-500" : "bg-blue-500") + ' text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">' + badge + '</span></div>';

    list.appendChild(card);
  });
}

/**
 * Changer le mois affiché (navigation)
 */
function changeMonth(offset) {
  monthOffset += offset;
  renderMonth(allEvents);
}

/**
 * Changer la vue (liste/mois)
 */
function setView(view) {
  currentView = view;
  document.getElementById("view-list").style.display = view === "list" ? "block" : "none";
  document.getElementById("view-month").style.display = view === "month" ? "block" : "none";
  document.getElementById("btn-list").className = view === "list" ? "text-xs font-medium px-3 py-1.5 rounded-full border border-ink bg-ink text-paper transition-all" : "text-xs font-medium px-3 py-1.5 rounded-full border border-line text-zinc-500 hover:border-ink hover:text-ink transition-all";
  document.getElementById("btn-month").className = view === "month" ? "text-xs font-medium px-3 py-1.5 rounded-full border border-ink bg-ink text-paper transition-all" : "text-xs font-medium px-3 py-1.5 rounded-full border border-line text-zinc-500 hover:border-ink hover:text-ink transition-all";
}

/**
 * Changer le nombre de résultats affichés
 */
function changeMaxResults(value) {
  maxResultsValue = value === "Tous" ? 250 : parseInt(value);
  fetchEvents();
}

/**
 * Obtenir l'icône correspondant au titre de l'événement
 */
function getEventIcon(summary) {
  if (!summary) return "🎲";
  if (summary.includes("Escape")) return "🔐";
  if (summary.includes("TCG") || summary.includes("Carte")) return "🃏";
  if (summary.includes("Découverte")) return "🌱";
  if (summary.includes("Coopératif") || summary.includes("Coop")) return "🤝";
  if (summary.includes("Stratégie")) return "♟️";
  return "🎲";
}

/**
 * Extraire la date/heure d'un événement Google Calendar
 */
function getDate(event) {
  if (event.start.dateTime) {
    return new Date(event.start.dateTime);
  } else {
    var d = new Date(event.start.date);
    d.setHours(20, 30, 0, 0);
    return d;
  }
}

/**
 * Formater l'heure
 */
function formatTime(date) {
  var hours = String(date.getHours()).padStart(2, "0");
  var minutes = String(date.getMinutes()).padStart(2, "0");
  return hours + "h" + minutes;
}

/**
 * Initialisation au chargement du DOM
 */
document.addEventListener("DOMContentLoaded", init);
