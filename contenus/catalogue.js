/* Catalogue V2 : fonctionne directement sous file://. */
window.PORTAIL_CATALOGUE = {
  "version": "2.0.0",
  "name": "Espace pédagogique — M. GIRARD",
  "subjects": [
    {
      "id": "francais",
      "label": "Français",
      "subtitle": "Lecture, étude de la langue, écriture",
      "classes": [
        "502"
      ],
      "image": "francais.svg",
      "domains": [
        {
          "id": "lecture",
          "label": "Lecture et compréhension",
          "image": "francais.svg",
          "subdomains": [
            {
              "id": "s1",
              "label": "Lecture suivie",
              "sequenceIds": []
            },
            {
              "id": "s2",
              "label": "Comprendre et interpréter",
              "sequenceIds": []
            },
            {
              "id": "s3",
              "label": "Fluence",
              "sequenceIds": []
            }
          ]
        },
        {
          "id": "orthographe",
          "label": "Orthographe",
          "image": "francais.svg",
          "subdomains": [
            {
              "id": "s1",
              "label": "Homophones grammaticaux",
              "sequenceIds": [
                "demo-seq-francais"
              ]
            },
            {
              "id": "s2",
              "label": "Dictées",
              "sequenceIds": []
            },
            {
              "id": "s3",
              "label": "Accords",
              "sequenceIds": []
            }
          ]
        },
        {
          "id": "grammaire",
          "label": "Grammaire",
          "image": "francais.svg",
          "subdomains": [
            {
              "id": "s1",
              "label": "Les classes de mots",
              "sequenceIds": []
            },
            {
              "id": "s2",
              "label": "Les fonctions grammaticales",
              "sequenceIds": []
            }
          ]
        },
        {
          "id": "conjugaison",
          "label": "Conjugaison",
          "image": "francais.svg",
          "subdomains": [
            {
              "id": "s1",
              "label": "Les temps verbaux",
              "sequenceIds": []
            }
          ]
        },
        {
          "id": "ecriture",
          "label": "Expression écrite",
          "image": "francais.svg",
          "subdomains": [
            {
              "id": "s1",
              "label": "Jogging d’écriture",
              "sequenceIds": []
            },
            {
              "id": "s2",
              "label": "Rédiger et améliorer",
              "sequenceIds": []
            }
          ]
        }
      ]
    },
    {
      "id": "mathematiques",
      "label": "Mathématiques",
      "subtitle": "Nombres, calculs, problèmes, grandeurs",
      "classes": [
        "501"
      ],
      "image": "mathematiques.svg",
      "domains": [
        {
          "id": "nombres",
          "label": "Nombres et numération",
          "image": "mathematiques.svg",
          "subdomains": [
            {
              "id": "s1",
              "label": "Lire et écrire les nombres",
              "sequenceIds": []
            },
            {
              "id": "s2",
              "label": "Comparer et ranger",
              "sequenceIds": []
            },
            {
              "id": "s3",
              "label": "Fractions",
              "sequenceIds": []
            }
          ]
        },
        {
          "id": "calcul",
          "label": "Calcul",
          "image": "mathematiques.svg",
          "subdomains": [
            {
              "id": "s1",
              "label": "Calcul mental",
              "sequenceIds": [
                "demo-seq-maths"
              ]
            },
            {
              "id": "s2",
              "label": "Calcul posé",
              "sequenceIds": []
            }
          ]
        },
        {
          "id": "problemes",
          "label": "Résolution de problèmes",
          "image": "mathematiques.svg",
          "subdomains": [
            {
              "id": "s1",
              "label": "Problèmes à une ou deux étapes",
              "sequenceIds": []
            },
            {
              "id": "s2",
              "label": "Choisir une opération",
              "sequenceIds": []
            }
          ]
        },
        {
          "id": "grandeurs",
          "label": "Grandeurs et mesures",
          "image": "mathematiques.svg",
          "subdomains": [
            {
              "id": "s1",
              "label": "Lire l’heure",
              "sequenceIds": []
            },
            {
              "id": "s2",
              "label": "Longueurs et masses",
              "sequenceIds": []
            }
          ]
        },
        {
          "id": "geometrie",
          "label": "Espace et géométrie",
          "image": "mathematiques.svg",
          "subdomains": [
            {
              "id": "s1",
              "label": "Figures géométriques",
              "sequenceIds": []
            },
            {
              "id": "s2",
              "label": "Se repérer",
              "sequenceIds": []
            }
          ]
        }
      ]
    },
    {
      "id": "sciences",
      "label": "Sciences et technologie",
      "subtitle": "Observer, comprendre, expérimenter",
      "classes": [
        "601"
      ],
      "image": "sciences-matiere.png",
      "domains": [
        {
          "id": "vivant",
          "label": "Alimentation et unité du vivant",
          "image": "sciences-vivant.png",
          "subdomains": [
            {
              "id": "s1",
              "label": "Alimentation humaine",
              "sequenceIds": []
            },
            {
              "id": "s2",
              "label": "Unité du vivant et classification",
              "sequenceIds": []
            }
          ]
        },
        {
          "id": "matiere",
          "label": "Matière et énergie",
          "image": "sciences-matiere.png",
          "subdomains": [
            {
              "id": "s1",
              "label": "De quoi sont faits les objets ?",
              "sequenceIds": []
            },
            {
              "id": "s2",
              "label": "Mesurer et reconnaître la matière",
              "sequenceIds": []
            },
            {
              "id": "s3",
              "label": "Mélanges et transformations",
              "sequenceIds": []
            },
            {
              "id": "s4",
              "label": "Sources et transformations d’énergie",
              "sequenceIds": [
                "demo-seq-sciences"
              ]
            }
          ]
        },
        {
          "id": "terre",
          "label": "Terre, mouvement et climat",
          "image": "sciences-terre.png",
          "subdomains": [
            {
              "id": "s1",
              "label": "Jour, nuit et saisons",
              "sequenceIds": []
            },
            {
              "id": "s2",
              "label": "Décrire et mesurer un mouvement",
              "sequenceIds": []
            },
            {
              "id": "s3",
              "label": "Climat et risques naturels",
              "sequenceIds": []
            }
          ]
        },
        {
          "id": "ecosystemes",
          "label": "Vivant et écosystèmes",
          "image": "sciences-ecosystemes.png",
          "subdomains": [
            {
              "id": "s1",
              "label": "Micro-organismes et aliments",
              "sequenceIds": []
            },
            {
              "id": "s2",
              "label": "Reproduction et développement",
              "sequenceIds": []
            },
            {
              "id": "s3",
              "label": "Biodiversité et écosystèmes",
              "sequenceIds": []
            }
          ]
        },
        {
          "id": "technologie",
          "label": "Objets, électricité et Scratch",
          "image": "sciences-techno.png",
          "subdomains": [
            {
              "id": "s1",
              "label": "Concevoir un objet technique",
              "sequenceIds": []
            },
            {
              "id": "s2",
              "label": "Circuits électriques et signaux",
              "sequenceIds": []
            },
            {
              "id": "s3",
              "label": "Programmer un objet avec Scratch",
              "sequenceIds": []
            }
          ]
        }
      ]
    },
    {
      "id": "histoire-geo",
      "label": "Histoire – Géographie",
      "subtitle": "Temps, sociétés, territoires, cartes",
      "classes": [
        "601"
      ],
      "image": "histoire-geo.svg",
      "domains": [
        {
          "id": "histoire",
          "label": "Histoire",
          "image": "histoire-geo.svg",
          "subdomains": [
            {
              "id": "s1",
              "label": "Se repérer dans le temps",
              "sequenceIds": []
            },
            {
              "id": "s2",
              "label": "Les sociétés du passé",
              "sequenceIds": []
            }
          ]
        },
        {
          "id": "geographie",
          "label": "Géographie",
          "image": "histoire-geo.svg",
          "subdomains": [
            {
              "id": "s1",
              "label": "Habiter une métropole",
              "sequenceIds": []
            },
            {
              "id": "s2",
              "label": "Habiter les littoraux",
              "sequenceIds": []
            },
            {
              "id": "s3",
              "label": "Habiter un espace de montagne",
              "sequenceIds": []
            },
            {
              "id": "s4",
              "label": "La ville de demain",
              "sequenceIds": []
            }
          ]
        }
      ]
    },
    {
      "id": "emc",
      "label": "Enseignement moral et civique",
      "subtitle": "Respect, citoyenneté, esprit critique",
      "classes": [
        "601"
      ],
      "image": "emc.svg",
      "domains": [
        {
          "id": "citoyennete",
          "label": "Citoyenneté",
          "image": "emc.svg",
          "subdomains": [
            {
              "id": "s1",
              "label": "Vivre ensemble",
              "sequenceIds": []
            },
            {
              "id": "s2",
              "label": "Droits et responsabilités",
              "sequenceIds": []
            }
          ]
        },
        {
          "id": "information",
          "label": "Information et esprit critique",
          "image": "emc.svg",
          "subdomains": [
            {
              "id": "s1",
              "label": "Décrypter l’information",
              "sequenceIds": []
            }
          ]
        }
      ]
    },
    {
      "id": "arts",
      "label": "Arts plastiques",
      "subtitle": "Créer, observer, exprimer",
      "classes": [
        "601"
      ],
      "image": "arts.svg",
      "domains": [
        {
          "id": "creer",
          "label": "Pratiques artistiques",
          "image": "arts.svg",
          "subdomains": [
            {
              "id": "s1",
              "label": "Dessiner et représenter",
              "sequenceIds": []
            },
            {
              "id": "s2",
              "label": "Composition et couleurs",
              "sequenceIds": []
            }
          ]
        },
        {
          "id": "culture",
          "label": "Œuvres et références",
          "image": "arts.svg",
          "subdomains": [
            {
              "id": "s1",
              "label": "Observer une œuvre",
              "sequenceIds": []
            },
            {
              "id": "s2",
              "label": "Arts du monde",
              "sequenceIds": []
            }
          ]
        }
      ]
    },
    {
      "id": "musique",
      "label": "Éducation musicale",
      "subtitle": "Écouter, pratiquer, découvrir",
      "classes": [
        "601"
      ],
      "image": "musique.svg",
      "domains": [
        {
          "id": "ecoute",
          "label": "Écoute et perception",
          "image": "musique.svg",
          "subdomains": [
            {
              "id": "s1",
              "label": "Reconnaître les instruments",
              "sequenceIds": []
            },
            {
              "id": "s2",
              "label": "Écouter une œuvre",
              "sequenceIds": []
            }
          ]
        },
        {
          "id": "pratique",
          "label": "Pratique musicale",
          "image": "musique.svg",
          "subdomains": [
            {
              "id": "s1",
              "label": "Voix et rythme",
              "sequenceIds": []
            },
            {
              "id": "s2",
              "label": "Créer et interpréter",
              "sequenceIds": []
            }
          ]
        }
      ]
    }
  ],
  "sequences": [
    {
      "id": "demo-seq-sciences",
      "title": "Démonstration — Sources d’énergie",
      "sessions": [
        "demo-sci-energie"
      ],
      "demo": true
    },
    {
      "id": "demo-seq-maths",
      "title": "Démonstration — Calcul mental",
      "sessions": [
        "demo-maths-calcul"
      ],
      "demo": true
    },
    {
      "id": "demo-seq-francais",
      "title": "Démonstration — Homophones",
      "sessions": [
        "demo-fr-homophones"
      ],
      "demo": true
    }
  ],
  "sessions": [
    {
      "id": "demo-sci-energie",
      "subject": "sciences",
      "domain": "matiere",
      "subdomain": "s4",
      "sequence": "demo-seq-sciences",
      "number": "Démo",
      "title": "Découvrir les sources d’énergie",
      "classe": "601",
      "description": "Support fictif permettant de tester la consultation de PDF. Ne remplace pas une séance validée.",
      "resources": [
        {
          "id": "pdf-energie",
          "type": "pdf",
          "label": "Sources d’énergie — PDF de démonstration",
          "url": "documents/demo/SCI601_sources_energie_DEMONSTRATION.pdf"
        },
        {
          "id": "image-energie",
          "type": "image",
          "label": "Illustration « Matière et énergie »",
          "url": "assets/illustrations/sciences-matiere.png"
        }
      ],
      "demo": true
    },
    {
      "id": "demo-maths-calcul",
      "subject": "mathematiques",
      "domain": "calcul",
      "subdomain": "s1",
      "sequence": "demo-seq-maths",
      "number": "Démo",
      "title": "Calcul mental : additions",
      "classe": "501",
      "description": "Séance illustrative pour vérifier la navigation et les documents.",
      "resources": [
        {
          "id": "pdf-calcul",
          "type": "pdf",
          "label": "Calcul mental — PDF de démonstration",
          "url": "documents/demo/MAT501_calcul_mental_DEMONSTRATION.pdf"
        },
        {
          "id": "jeu-memo",
          "type": "html",
          "label": "Memory des nombres — jeu de démonstration",
          "url": "applications/memory_nombres.html"
        }
      ],
      "demo": true
    },
    {
      "id": "demo-fr-homophones",
      "subject": "francais",
      "domain": "orthographe",
      "subdomain": "s1",
      "sequence": "demo-seq-francais",
      "number": "Démo",
      "title": "Homophones a/à, on/ont",
      "classe": "502",
      "description": "Séance illustrative pour tester les documents et les applications intégrées.",
      "resources": [
        {
          "id": "pdf-homophones",
          "type": "pdf",
          "label": "Homophones — PDF de démonstration",
          "url": "documents/demo/FRA502_homophones_DEMONSTRATION.pdf"
        },
        {
          "id": "jeu-lettres",
          "type": "html",
          "label": "Memory des mots — jeu de démonstration",
          "url": "applications/memory_mots.html"
        }
      ],
      "demo": true
    }
  ],
  "classes": {
    "601": "Sciences, histoire-géographie, EMC, arts et musique",
    "501": "Mathématiques",
    "502": "Français"
  }
};
