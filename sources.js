// Liste de sources (à corriger par l'utilisateur).
// Thèmes par ordre d'importance : breaking, politique, economie, juridique, social, science
// Mention « vérifié » = flux dont l'existence a été contrôlée ; les autres sont à confirmer
// au premier test (l'application indique les sources injoignables).
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
  { theme: "breaking", name: "Al Jazeera (en)", lang: "en", url: "https://www.aljazeera.com/xml/rss/all.xml" },
  { theme: "breaking", name: "الجزيرة نت", lang: "ar", url: "https://www.aljazeera.net/aljazeerarss/a7c186be-1baa-4bd4-9d80-a84db769f779/73d0e1b4-532f-45ef-b135-bfdb1be1a90f" }, // vérifié
  { theme: "breaking", name: "New York Times – Monde", lang: "en", url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml" },
  { theme: "breaking", name: "Financial Times", lang: "en", url: "https://www.ft.com/rss/home" },
  { theme: "breaking", name: "France 24", lang: "fr", url: "https://www.france24.com/fr/rss" },
  { theme: "breaking", name: "Le Monde – Une", lang: "fr", url: "https://www.lemonde.fr/rss/une.xml" },
  { theme: "breaking", name: "BBC Arabic", lang: "ar", url: "https://feeds.bbci.co.uk/arabic/rss.xml" },
  { theme: "breaking", name: "RFI (ar)", lang: "ar", url: "https://www.rfi.fr/ar/rss" },
  { theme: "breaking", name: "Hespress", lang: "ar", url: "https://www.hespress.com/feed" },
  { theme: "breaking", name: "Hespress FR", lang: "fr", url: "https://fr.hespress.com/feed" },

  // --- Politique ---
  { theme: "politique", name: "Le Monde – Politique", lang: "fr", url: "https://www.lemonde.fr/politique/rss_full.xml" },
  { theme: "politique", name: "Mediapart", lang: "fr", url: "https://www.mediapart.fr/articles/feed" },
  { theme: "politique", name: "Le Monde diplomatique", lang: "fr", url: "https://www.monde-diplomatique.fr/rss" },
  { theme: "politique", name: "Courrier international", lang: "fr", url: "https://www.courrierinternational.com/feed/all/rss.xml" },
  { theme: "politique", name: "BBC Politics", lang: "en", url: "https://feeds.bbci.co.uk/news/politics/rss.xml" },
  { theme: "politique", name: "Foreign Policy", lang: "en", url: "https://foreignpolicy.com/feed/" },
  { theme: "politique", name: "RFI", lang: "fr", url: "https://www.rfi.fr/fr/rss" },
  { theme: "politique", name: "Jeune Afrique", lang: "fr", url: "https://www.jeuneafrique.com/feed/" },
  { theme: "politique", name: "The Africa Report", lang: "en", url: "https://www.theafricareport.com/feed/" },

  // --- Économie ---
  { theme: "economie", name: "Le Monde – Économie", lang: "fr", url: "https://www.lemonde.fr/economie/rss_full.xml" },
  { theme: "economie", name: "BBC Business", lang: "en", url: "https://feeds.bbci.co.uk/news/business/rss.xml" },
  { theme: "economie", name: "Bloomberg – Marchés", lang: "en", url: "https://feeds.bloomberg.com/markets/news.rss" },
  { theme: "economie", name: "New York Times – Économie", lang: "en", url: "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml" },
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
  { theme: "science", name: "Scientific American", lang: "en", url: "https://www.scientificamerican.com/platform/syndication/rss/" },
  { theme: "science", name: "New Scientist", lang: "en", url: "https://www.newscientist.com/feed/home/" },
  { theme: "science", name: "New York Times – Science", lang: "en", url: "https://rss.nytimes.com/services/xml/rss/nyt/Science.xml" },
  { theme: "science", name: "ScienceDaily", lang: "en", url: "https://www.sciencedaily.com/rss/all.xml" },
  { theme: "science", name: "BBC Science", lang: "en", url: "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml" }
];
