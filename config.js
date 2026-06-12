/**
 * Configuration Ludo'sphère
 * Variables centralisées pour faciliter la maintenance
 */

const CONFIG = {
  // Google Calendar API
  CALENDAR: {
    API_KEY: "AIzaSyBzBN6dFIR7XGsA-7o9vRB6gJHjk0udB3g",
    CALENDAR_ID:
      "35d4ce4aba23cb63b35de523f9c911bd73b4d92653e6f3e608b80f9e11e446c6@group.calendar.google.com",
    MAX_RESULTS: 20,
  },

  // Organisation
  ORGANIZATION: {
    NAME: "Ludo'sphère",
    LOCATION: "Vallet, France",
    EMAIL: "ludosphere.asso@gmail.com",
    PHONE: null,
    WEBSITE: "https://ludosphere-vallet.org",
  },

  // Contacts
  CONTACTS: {
    PRESIDENT: { NAME: "Jean-François", ROLE: "Président", INITIALS: "JFP" },
    SECRETARY: { NAME: "Jeremie", ROLE: "Secrétaire", INITIALS: "JA" },
    TREASURER: { NAME: "Régis", ROLE: "Trésorier", INITIALS: "RG" },
  },

  // Lieu
  VENUE: {
    NAME: "Salle Simone de Beauvoir",
    ADDRESS: "Rue Emile Gabory — 44330 Vallet",
    LATITUDE: 47.1611,
    LONGITUDE: -1.3433,
  },

  // Horaires
  HOURS: {
    WELCOME: "20h30",
    GAMES_UNTIL: "23h",
    FREQUENCY: "Mensuelle",
  },

  // Adhésion
  MEMBERSHIP: {
    PRICE: "20 €",
    ANNUAL: true,
  },

  // Réseaux sociaux
  SOCIAL: {
    FACEBOOK: "https://www.facebook.com/ludosphere.asso",
    CALENDAR_LINK:
      "https://calendar.google.com/calendar/u/2?cid=MzVkNGNlNGFiYTIzY2I2M2IzNWRlNTIzZjljOTExYmQ3M2I0ZDkyNjUzZTZmM2U2MDhiODBmOWUxMWU0NDZjNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
    HELLOASSO: "https://www.helloasso.com/associations/ludo-sphere",
  },

  // Pages
  PAGES: {
    ABOUT: "./apropos.html",
    LIBRARY: "./ludotheque.html",
  },

  // Images
  IMAGES: {
    LOGO: "./images/logo_ludosphere.png",
    PHOTOS: [
      "./images/photo 1.jpg",
      "./images/photo 2.jpg",
      "./images/photo 3.jpg",
      "./images/photo 4.jpg",
      "./images/photo 5.jpg",
    ],
    FALLBACKS: [
      "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800&q=80",
      "https://images.unsplash.com/photo-1606503153255-59d5e417c8d0?w=400&q=80",
      "https://images.unsplash.com/photo-1553481187-be93c21490a9?w=400&q=80",
      "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=400&q=80",
      "https://images.unsplash.com/photo-1585504198199-20277593b94f?w=400&q=80",
    ],
  },
};

// Exporter la configuration
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
}
