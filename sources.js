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
  { theme: "science", name: "BBC Science", lang: "en", url: "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml" },

  // ===== Chaînes de télévision et radios d'information (sites web) — flux à confirmer au test =====
  // etat: true = média d'État ou financé par un État : une étiquette s'affiche dans l'application.

  // Anglais
  { theme: "breaking", name: "CNN", lang: "en", url: "http://rss.cnn.com/rss/edition_world.rss" },
  { theme: "breaking", name: "Sky News", lang: "en", url: "https://feeds.skynews.com/feeds/rss/world.xml" },
  { theme: "politique", name: "Sky News – Politique", lang: "en", url: "https://feeds.skynews.com/feeds/rss/politics.xml" },
  { theme: "economie", name: "Sky News – Économie", lang: "en", url: "https://feeds.skynews.com/feeds/rss/business.xml" },
  { theme: "breaking", name: "Euronews (en)", lang: "en", url: "https://www.euronews.com/rss?level=theme&name=news" },
  { theme: "breaking", name: "DW (en)", lang: "en", url: "https://rss.dw.com/rdf/rss-en-all", etat: true },
  { theme: "breaking", name: "NBC News", lang: "en", url: "https://feeds.nbcnews.com/nbcnews/public/news" },
  { theme: "breaking", name: "CBS News", lang: "en", url: "https://www.cbsnews.com/latest/rss/world" },
  { theme: "breaking", name: "PBS NewsHour", lang: "en", url: "https://www.pbs.org/newshour/feeds/rss/headlines" },
  { theme: "breaking", name: "Fox News", lang: "en", url: "https://moxie.foxnews.com/google-publisher/world.xml" },
  { theme: "breaking", name: "ABC News (Australie)", lang: "en", url: "https://www.abc.net.au/news/feed/51120/rss.xml", etat: true },
  { theme: "breaking", name: "CBC (Canada)", lang: "en", url: "https://www.cbc.ca/webfeed/rss/rss-world", etat: true },
  { theme: "economie", name: "CNBC – Économie", lang: "en", url: "https://www.cnbc.com/id/100003114/device/rss/rss.html" },
  { theme: "breaking", name: "Al Arabiya (en)", lang: "en", url: "https://english.alarabiya.net/tools/rss" },
  { theme: "breaking", name: "Anadolu Agency (en)", lang: "en", url: "https://www.aa.com.tr/en/rss/default?cat=world", etat: true },
  { theme: "breaking", name: "TRT World", lang: "en", url: "https://www.trtworld.com/rss", etat: true },
  { theme: "breaking", name: "CGTN", lang: "en", url: "https://www.cgtn.com/subscribe/rss/section/world.xml", etat: true },
  { theme: "breaking", name: "RT", lang: "en", url: "https://www.rt.com/rss/news/", etat: true },

  // Français
  { theme: "breaking", name: "franceinfo", lang: "fr", url: "https://www.francetvinfo.fr/titres.rss", etat: true },
  { theme: "breaking", name: "BFMTV", lang: "fr", url: "https://www.bfmtv.com/rss/news-24-7/" },
  { theme: "breaking", name: "Euronews (fr)", lang: "fr", url: "https://fr.euronews.com/rss?level=theme&name=news" },
  { theme: "breaking", name: "DW (fr)", lang: "fr", url: "https://rss.dw.com/rdf/rss-fr-all", etat: true },
  { theme: "breaking", name: "TV5Monde Info", lang: "fr", url: "https://information.tv5monde.com/rss" },

  // Arabe
  { theme: "breaking", name: "العربية (Al Arabiya)", lang: "ar", url: "https://www.alarabiya.net/feed/rss2/ar.xml" },
  { theme: "breaking", name: "سكاي نيوز عربية", lang: "ar", url: "https://www.skynewsarabia.com/web/rss" },
  { theme: "breaking", name: "DW عربية", lang: "ar", url: "https://rss.dw.com/rdf/rss-ar-all", etat: true },
  { theme: "breaking", name: "يورونيوز", lang: "ar", url: "https://arabic.euronews.com/rss?level=theme&name=news" },
  { theme: "breaking", name: "فرانس 24", lang: "ar", url: "https://www.france24.com/ar/rss", etat: true },
  { theme: "breaking", name: "RT عربي", lang: "ar", url: "https://arabic.rt.com/rss/", etat: true },

  // Maroc
  { theme: "breaking", name: "MAP Express (agence)", lang: "fr", url: "https://www.mapexpress.ma/feed/", etat: true },
  { theme: "breaking", name: "Le360", lang: "fr", url: "https://fr.le360.ma/rss" },
  { theme: "breaking", name: "Médias24", lang: "fr", url: "https://medias24.com/feed/" },
  { theme: "breaking", name: "TelQuel", lang: "fr", url: "https://telquel.ma/feed" },
  { theme: "breaking", name: "2M", lang: "fr", url: "https://2m.ma/fr/rss", etat: true },
  { theme: "breaking", name: "Medi1 TV", lang: "fr", url: "https://www.medi1tv.com/feed" }
];
