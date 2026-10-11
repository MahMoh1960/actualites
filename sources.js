// Liste de sources proposée (à corriger par l'utilisateur).
// Thèmes par ordre d'importance : une_breaking, politique, economie, juridique, social, science
const THEMES = [
  { id: "breaking", label: "À la une" },
  { id: "politique", label: "Politique" },
  { id: "economie", label: "Économie" },
  { id: "juridique", label: "Juridique" },
  { id: "social", label: "Social" },
  { id: "science", label: "Science" }
];

const SOURCES = [
  // --- À la une / break news ---
  { theme: "breaking", name: "BBC World", lang: "en", url: "https://feeds.bbci.co.uk/news/world/rss.xml" },
  { theme: "breaking", name: "Al Jazeera", lang: "en", url: "https://www.aljazeera.com/xml/rss/all.xml" },
  { theme: "breaking", name: "France 24", lang: "fr", url: "https://www.france24.com/fr/rss" },
  { theme: "breaking", name: "Le Monde – Une", lang: "fr", url: "https://www.lemonde.fr/rss/une.xml" },
  { theme: "breaking", name: "BBC Arabic", lang: "ar", url: "https://feeds.bbci.co.uk/arabic/rss.xml" },
  { theme: "breaking", name: "Hespress", lang: "ar", url: "https://www.hespress.com/feed" },
  { theme: "breaking", name: "Hespress FR", lang: "fr", url: "https://fr.hespress.com/feed" },

  // --- Politique ---
  { theme: "politique", name: "Le Monde – Politique", lang: "fr", url: "https://www.lemonde.fr/politique/rss_full.xml" },
  { theme: "politique", name: "BBC Politics", lang: "en", url: "https://feeds.bbci.co.uk/news/politics/rss.xml" },
  { theme: "politique", name: "RFI", lang: "fr", url: "https://www.rfi.fr/fr/rss" },
  { theme: "politique", name: "Jeune Afrique", lang: "fr", url: "https://www.jeuneafrique.com/feed/" },

  // --- Économie ---
  { theme: "economie", name: "Le Monde – Économie", lang: "fr", url: "https://www.lemonde.fr/economie/rss_full.xml" },
  { theme: "economie", name: "BBC Business", lang: "en", url: "https://feeds.bbci.co.uk/news/business/rss.xml" },
  { theme: "economie", name: "The Economist – Finance", lang: "en", url: "https://www.economist.com/finance-and-economics/rss.xml" },

  // --- Juridique ---
  { theme: "juridique", name: "Le Monde – Justice", lang: "fr", url: "https://www.lemonde.fr/justice/rss_full.xml" },
  { theme: "juridique", name: "ONU Info – Droit et prévention du crime", lang: "fr", url: "https://news.un.org/feed/subscribe/fr/news/topic/law-and-crime-prevention/feed/rss.xml" },

  // --- Social ---
  { theme: "social", name: "Le Monde – Société", lang: "fr", url: "https://www.lemonde.fr/societe/rss_full.xml" },
  { theme: "social", name: "ONU Info – Droits humains", lang: "fr", url: "https://news.un.org/feed/subscribe/fr/news/topic/human-rights/feed/rss.xml" },

  // --- Science (découvertes) ---
  { theme: "science", name: "Le Monde – Sciences", lang: "fr", url: "https://www.lemonde.fr/sciences/rss_full.xml" },
  { theme: "science", name: "Nature", lang: "en", url: "https://www.nature.com/nature.rss" },
  { theme: "science", name: "ScienceDaily", lang: "en", url: "https://www.sciencedaily.com/rss/all.xml" },
  { theme: "science", name: "BBC Science", lang: "en", url: "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml" }
];
