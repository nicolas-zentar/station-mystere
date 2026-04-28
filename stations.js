// Données générées depuis le CSV open data "Lignes et stations de métro en France" (data.gouv.fr), complétées avec Saint-Denis Pleyel.
const stations = [
  {
    "name": "Abbesses",
    "lines": [
      "12"
    ],
    "area": "Paris 18e",
    "arr": 18,
    "bank": "Droite",
    "lat": 48.884393,
    "lng": 2.338395
  },
  {
    "name": "Aéroport d’Orly",
    "lines": [
      "14"
    ],
    "area": "Paray-Vieille-Poste",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.7282,
    "lng": 2.3626
  },
  {
    "name": "Aimé Césaire",
    "lines": [
      "12"
    ],
    "area": "Aubervilliers",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.908438,
    "lng": 2.378131
  },
  {
    "name": "Alésia",
    "lines": [
      "4"
    ],
    "area": "Paris 14e",
    "arr": 14,
    "bank": "Gauche",
    "lat": 48.828201,
    "lng": 2.327093
  },
  {
    "name": "Alexandre Dumas",
    "lines": [
      "2"
    ],
    "area": "Paris 20e",
    "arr": 20,
    "bank": "Droite",
    "lat": 48.856245,
    "lng": 2.394713
  },
  {
    "name": "Alma - Marceau",
    "lines": [
      "9"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.864647,
    "lng": 2.301104
  },
  {
    "name": "Anatole France",
    "lines": [
      "3"
    ],
    "area": "Levallois-Perret",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.892207,
    "lng": 2.284982
  },
  {
    "name": "Anvers",
    "lines": [
      "2"
    ],
    "area": "Paris 9e",
    "arr": 9,
    "bank": "Droite",
    "lat": 48.882869,
    "lng": 2.344155
  },
  {
    "name": "Argentine",
    "lines": [
      "1"
    ],
    "area": "Paris 17e",
    "arr": 17,
    "bank": "Droite",
    "lat": 48.875667,
    "lng": 2.289435
  },
  {
    "name": "Arts et Métiers",
    "lines": [
      "3",
      "11"
    ],
    "area": "Paris 3e",
    "arr": 3,
    "bank": "Droite",
    "lat": 48.8653,
    "lng": 2.356508
  },
  {
    "name": "Asnières - Gennevilliers Les Courtilles",
    "lines": [
      "13"
    ],
    "area": "Gennevilliers",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.930604,
    "lng": 2.284372
  },
  {
    "name": "Assemblée Nationale",
    "lines": [
      "12"
    ],
    "area": "Paris 7e",
    "arr": 7,
    "bank": "Gauche",
    "lat": 48.861072,
    "lng": 2.320576
  },
  {
    "name": "Aubervilliers-Pantin Quatre Chemins",
    "lines": [
      "7"
    ],
    "area": "Pantin",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.903757,
    "lng": 2.392221
  },
  {
    "name": "Avenue Émile Zola",
    "lines": [
      "10"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.847038,
    "lng": 2.295019
  },
  {
    "name": "Avron",
    "lines": [
      "2"
    ],
    "area": "Paris 20e",
    "arr": 20,
    "bank": "Droite",
    "lat": 48.851649,
    "lng": 2.398188
  },
  {
    "name": "Bagneux - Lucie Aubrac",
    "lines": [
      "4"
    ],
    "area": "Bagneux",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.803566,
    "lng": 2.31739
  },
  {
    "name": "Balard",
    "lines": [
      "8"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.836668,
    "lng": 2.278363
  },
  {
    "name": "Barbara",
    "lines": [
      "4"
    ],
    "area": "Bagneux",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.809799,
    "lng": 2.317417
  },
  {
    "name": "Barbès - Rochechouart",
    "lines": [
      "2",
      "4"
    ],
    "area": "Paris 10e",
    "arr": 10,
    "bank": "Droite",
    "lat": 48.883776,
    "lng": 2.350607
  },
  {
    "name": "Basilique de Saint-Denis",
    "lines": [
      "13"
    ],
    "area": "Saint-Denis",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.936783,
    "lng": 2.359296
  },
  {
    "name": "Bastille",
    "lines": [
      "1",
      "5",
      "8"
    ],
    "area": "Paris 12e",
    "arr": 12,
    "bank": "Droite",
    "lat": 48.852054,
    "lng": 2.368719
  },
  {
    "name": "Bel-Air",
    "lines": [
      "6"
    ],
    "area": "Paris 12e",
    "arr": 12,
    "bank": "Droite",
    "lat": 48.841427,
    "lng": 2.400867
  },
  {
    "name": "Belleville",
    "lines": [
      "2",
      "11"
    ],
    "area": "Paris 19e",
    "arr": 19,
    "bank": "Droite",
    "lat": 48.872287,
    "lng": 2.376736
  },
  {
    "name": "Bérault",
    "lines": [
      "1"
    ],
    "area": "Vincennes",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.845406,
    "lng": 2.429205
  },
  {
    "name": "Bercy",
    "lines": [
      "6",
      "14"
    ],
    "area": "Paris 12e",
    "arr": 12,
    "bank": "Droite",
    "lat": 48.840176,
    "lng": 2.379463
  },
  {
    "name": "Bibliothèque François Mitterrand",
    "lines": [
      "14"
    ],
    "area": "Paris 13e",
    "arr": 13,
    "bank": "Gauche",
    "lat": 48.829926,
    "lng": 2.376487
  },
  {
    "name": "Billancourt",
    "lines": [
      "9"
    ],
    "area": "Boulogne-Billancourt",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.83192,
    "lng": 2.237891
  },
  {
    "name": "Bir-Hakeim",
    "lines": [
      "6"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.853925,
    "lng": 2.289401
  },
  {
    "name": "Blanche",
    "lines": [
      "2"
    ],
    "area": "Paris 9e",
    "arr": 9,
    "bank": "Droite",
    "lat": 48.883766,
    "lng": 2.332484
  },
  {
    "name": "Bobigny Pablo Picasso",
    "lines": [
      "5"
    ],
    "area": "Bobigny",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.906366,
    "lng": 2.449027
  },
  {
    "name": "Bobigny-Pantin - Raymond Queneau",
    "lines": [
      "5"
    ],
    "area": "Pantin",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.895602,
    "lng": 2.426309
  },
  {
    "name": "Boissière",
    "lines": [
      "6"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.866848,
    "lng": 2.290033
  },
  {
    "name": "Bolivar",
    "lines": [
      "7bis"
    ],
    "area": "Paris 19e",
    "arr": 19,
    "bank": "Droite",
    "lat": 48.88079,
    "lng": 2.374125
  },
  {
    "name": "Bonne Nouvelle",
    "lines": [
      "8",
      "9"
    ],
    "area": "Paris 2e",
    "arr": 2,
    "bank": "Droite",
    "lat": 48.870571,
    "lng": 2.348481
  },
  {
    "name": "Botzaris",
    "lines": [
      "7bis"
    ],
    "area": "Paris 19e",
    "arr": 19,
    "bank": "Droite",
    "lat": 48.879535,
    "lng": 2.388901
  },
  {
    "name": "Boucicaut",
    "lines": [
      "8"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.841024,
    "lng": 2.287918
  },
  {
    "name": "Boulogne Jean Jaurès",
    "lines": [
      "10"
    ],
    "area": "Boulogne-Billancourt",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.842063,
    "lng": 2.239043
  },
  {
    "name": "Boulogne Pont de Saint-Cloud",
    "lines": [
      "10"
    ],
    "area": "Boulogne-Billancourt",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.840672,
    "lng": 2.228313
  },
  {
    "name": "Bourse",
    "lines": [
      "3"
    ],
    "area": "Paris 2e",
    "arr": 2,
    "bank": "Droite",
    "lat": 48.868757,
    "lng": 2.340665
  },
  {
    "name": "Bréguet-Sabin",
    "lines": [
      "5"
    ],
    "area": "Paris 11e",
    "arr": 11,
    "bank": "Droite",
    "lat": 48.856244,
    "lng": 2.370195
  },
  {
    "name": "Brochant",
    "lines": [
      "13"
    ],
    "area": "Paris 17e",
    "arr": 17,
    "bank": "Droite",
    "lat": 48.890652,
    "lng": 2.319905
  },
  {
    "name": "Buttes Chaumont",
    "lines": [
      "7bis"
    ],
    "area": "Paris 19e",
    "arr": 19,
    "bank": "Droite",
    "lat": 48.878499,
    "lng": 2.38157
  },
  {
    "name": "Buzenval",
    "lines": [
      "9"
    ],
    "area": "Paris 20e",
    "arr": 20,
    "bank": "Droite",
    "lat": 48.851762,
    "lng": 2.401171
  },
  {
    "name": "Cadet",
    "lines": [
      "7"
    ],
    "area": "Paris 9e",
    "arr": 9,
    "bank": "Droite",
    "lat": 48.875963,
    "lng": 2.344446
  },
  {
    "name": "Cambronne",
    "lines": [
      "6"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.847543,
    "lng": 2.302942
  },
  {
    "name": "Campo-Formio",
    "lines": [
      "5"
    ],
    "area": "Paris 13e",
    "arr": 13,
    "bank": "Gauche",
    "lat": 48.835543,
    "lng": 2.358742
  },
  {
    "name": "Cardinal Lemoine",
    "lines": [
      "10"
    ],
    "area": "Paris 5e",
    "arr": 5,
    "bank": "Gauche",
    "lat": 48.8467,
    "lng": 2.351328
  },
  {
    "name": "Carrefour Pleyel",
    "lines": [
      "13"
    ],
    "area": "Saint-Denis",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.919809,
    "lng": 2.343444
  },
  {
    "name": "Censier - Daubenton",
    "lines": [
      "7"
    ],
    "area": "Paris 5e",
    "arr": 5,
    "bank": "Gauche",
    "lat": 48.840226,
    "lng": 2.351627
  },
  {
    "name": "Champs-Élysées - Clemenceau",
    "lines": [
      "1",
      "13"
    ],
    "area": "Paris 8e",
    "arr": 8,
    "bank": "Droite",
    "lat": 48.867656,
    "lng": 2.314465
  },
  {
    "name": "Chardon Lagache",
    "lines": [
      "10"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.845088,
    "lng": 2.266905
  },
  {
    "name": "Charenton - Écoles",
    "lines": [
      "8"
    ],
    "area": "Charenton-le-Pont",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.821256,
    "lng": 2.413847
  },
  {
    "name": "Charles de Gaulle - Étoile",
    "lines": [
      "1",
      "2",
      "6"
    ],
    "area": "Paris 17e",
    "arr": 17,
    "bank": "Droite",
    "lat": 48.874995,
    "lng": 2.295812
  },
  {
    "name": "Charles Michels",
    "lines": [
      "10"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.846605,
    "lng": 2.285621
  },
  {
    "name": "Charonne",
    "lines": [
      "9"
    ],
    "area": "Paris 11e",
    "arr": 11,
    "bank": "Droite",
    "lat": 48.854939,
    "lng": 2.384782
  },
  {
    "name": "Château d’Eau",
    "lines": [
      "4"
    ],
    "area": "Paris 10e",
    "arr": 10,
    "bank": "Droite",
    "lat": 48.872447,
    "lng": 2.356052
  },
  {
    "name": "Château de Vincennes",
    "lines": [
      "1"
    ],
    "area": "Paris 12e",
    "arr": 12,
    "bank": "Droite",
    "lat": 48.844318,
    "lng": 2.44054
  },
  {
    "name": "Château Landon",
    "lines": [
      "7"
    ],
    "area": "Paris 10e",
    "arr": 10,
    "bank": "Droite",
    "lat": 48.878441,
    "lng": 2.362018
  },
  {
    "name": "Château Rouge",
    "lines": [
      "4"
    ],
    "area": "Paris 18e",
    "arr": 18,
    "bank": "Droite",
    "lat": 48.887079,
    "lng": 2.349366
  },
  {
    "name": "Châtelet",
    "lines": [
      "1",
      "4",
      "7",
      "11",
      "14"
    ],
    "area": "Paris 4e",
    "arr": 4,
    "bank": "Droite",
    "lat": 48.856953,
    "lng": 2.348161
  },
  {
    "name": "Châtillon-Montrouge",
    "lines": [
      "13"
    ],
    "area": "Châtillon",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.810751,
    "lng": 2.301718
  },
  {
    "name": "Chaussée d’Antin - La Fayette",
    "lines": [
      "7",
      "9"
    ],
    "area": "Paris 9e",
    "arr": 9,
    "bank": "Droite",
    "lat": 48.873134,
    "lng": 2.333739
  },
  {
    "name": "Chemin Vert",
    "lines": [
      "8"
    ],
    "area": "Paris 3e",
    "arr": 3,
    "bank": "Droite",
    "lat": 48.857087,
    "lng": 2.368095
  },
  {
    "name": "Chevaleret",
    "lines": [
      "6"
    ],
    "area": "Paris 13e",
    "arr": 13,
    "bank": "Gauche",
    "lat": 48.834963,
    "lng": 2.368081
  },
  {
    "name": "Chevilly-Larue",
    "lines": [
      "14"
    ],
    "area": "Chevilly-Larue",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.7587,
    "lng": 2.3665
  },
  {
    "name": "Cité",
    "lines": [
      "4"
    ],
    "area": "Paris 4e",
    "arr": 4,
    "bank": "Île",
    "lat": 48.854934,
    "lng": 2.347232
  },
  {
    "name": "Cluny - La Sorbonne",
    "lines": [
      "10"
    ],
    "area": "Paris 5e",
    "arr": 5,
    "bank": "Gauche",
    "lat": 48.851027,
    "lng": 2.344896
  },
  {
    "name": "Colonel Fabien",
    "lines": [
      "2"
    ],
    "area": "Paris 10e",
    "arr": 10,
    "bank": "Droite",
    "lat": 48.87765,
    "lng": 2.370468
  },
  {
    "name": "Commerce",
    "lines": [
      "8"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.844612,
    "lng": 2.293797
  },
  {
    "name": "Concorde",
    "lines": [
      "1",
      "8",
      "12"
    ],
    "area": "Paris 8e",
    "arr": 8,
    "bank": "Droite",
    "lat": 48.866558,
    "lng": 2.322961
  },
  {
    "name": "Convention",
    "lines": [
      "12"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.837135,
    "lng": 2.296391
  },
  {
    "name": "Corentin Cariou",
    "lines": [
      "7"
    ],
    "area": "Paris 19e",
    "arr": 19,
    "bank": "Droite",
    "lat": 48.894673,
    "lng": 2.382292
  },
  {
    "name": "Corentin Celton",
    "lines": [
      "12"
    ],
    "area": "Issy-les-Moulineaux",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.827104,
    "lng": 2.279336
  },
  {
    "name": "Corvisart",
    "lines": [
      "6"
    ],
    "area": "Paris 13e",
    "arr": 13,
    "bank": "Gauche",
    "lat": 48.82986,
    "lng": 2.350611
  },
  {
    "name": "Coteaux Beauclair",
    "lines": [
      "11"
    ],
    "area": "Noisy-le-Sec",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.8818,
    "lng": 2.4674
  },
  {
    "name": "Cour Saint-Émilion",
    "lines": [
      "14"
    ],
    "area": "Paris 12e",
    "arr": 12,
    "bank": "Droite",
    "lat": 48.833319,
    "lng": 2.386618
  },
  {
    "name": "Courcelles",
    "lines": [
      "2"
    ],
    "area": "Paris 17e",
    "arr": 17,
    "bank": "Droite",
    "lat": 48.879265,
    "lng": 2.303294
  },
  {
    "name": "Couronnes",
    "lines": [
      "2"
    ],
    "area": "Paris 11e",
    "arr": 11,
    "bank": "Droite",
    "lat": 48.869193,
    "lng": 2.380289
  },
  {
    "name": "Créteil - L’Échat",
    "lines": [
      "8"
    ],
    "area": "Créteil",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.796611,
    "lng": 2.44937
  },
  {
    "name": "Créteil - Préfecture",
    "lines": [
      "8"
    ],
    "area": "Créteil",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.779757,
    "lng": 2.459305
  },
  {
    "name": "Créteil - Université",
    "lines": [
      "8"
    ],
    "area": "Créteil",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.789943,
    "lng": 2.45057
  },
  {
    "name": "Crimée",
    "lines": [
      "7"
    ],
    "area": "Paris 19e",
    "arr": 19,
    "bank": "Droite",
    "lat": 48.890886,
    "lng": 2.376936
  },
  {
    "name": "Croix de Chavaux",
    "lines": [
      "9"
    ],
    "area": "Montreuil",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.857993,
    "lng": 2.435855
  },
  {
    "name": "Danube",
    "lines": [
      "7bis"
    ],
    "area": "Paris 19e",
    "arr": 19,
    "bank": "Droite",
    "lat": 48.881949,
    "lng": 2.393228
  },
  {
    "name": "Daumesnil",
    "lines": [
      "6",
      "8"
    ],
    "area": "Paris 12e",
    "arr": 12,
    "bank": "Droite",
    "lat": 48.839434,
    "lng": 2.396149
  },
  {
    "name": "Denfert-Rochereau",
    "lines": [
      "4",
      "6"
    ],
    "area": "Paris 14e",
    "arr": 14,
    "bank": "Gauche",
    "lat": 48.833949,
    "lng": 2.332019
  },
  {
    "name": "Dugommier",
    "lines": [
      "6"
    ],
    "area": "Paris 12e",
    "arr": 12,
    "bank": "Droite",
    "lat": 48.839037,
    "lng": 2.3896
  },
  {
    "name": "Dupleix",
    "lines": [
      "6"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.850412,
    "lng": 2.293664
  },
  {
    "name": "Duroc",
    "lines": [
      "10",
      "13"
    ],
    "area": "Paris 7e",
    "arr": 7,
    "bank": "Gauche",
    "lat": 48.84701,
    "lng": 2.316521
  },
  {
    "name": "École Militaire",
    "lines": [
      "8"
    ],
    "area": "Paris 7e",
    "arr": 7,
    "bank": "Gauche",
    "lat": 48.85492,
    "lng": 2.306346
  },
  {
    "name": "École Vétérinaire de Maisons-Alfort",
    "lines": [
      "8"
    ],
    "area": "Maisons-Alfort",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.814836,
    "lng": 2.4224
  },
  {
    "name": "Edgar Quinet",
    "lines": [
      "6"
    ],
    "area": "Paris 14e",
    "arr": 14,
    "bank": "Gauche",
    "lat": 48.840904,
    "lng": 2.325287
  },
  {
    "name": "Église d’Auteuil",
    "lines": [
      "10"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.847143,
    "lng": 2.269111
  },
  {
    "name": "Église de Pantin",
    "lines": [
      "5"
    ],
    "area": "Pantin",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.893164,
    "lng": 2.41312
  },
  {
    "name": "Esplanade de la Défense",
    "lines": [
      "1"
    ],
    "area": "Courbevoie",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.888332,
    "lng": 2.249904
  },
  {
    "name": "Étienne Marcel",
    "lines": [
      "4"
    ],
    "area": "Paris 1er",
    "arr": 1,
    "bank": "Droite",
    "lat": 48.863703,
    "lng": 2.348976
  },
  {
    "name": "Europe",
    "lines": [
      "3"
    ],
    "area": "Paris 8e",
    "arr": 8,
    "bank": "Droite",
    "lat": 48.878753,
    "lng": 2.322186
  },
  {
    "name": "Exelmans",
    "lines": [
      "9"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.84258,
    "lng": 2.259801
  },
  {
    "name": "Faidherbe - Chaligny",
    "lines": [
      "8"
    ],
    "area": "Paris 12e",
    "arr": 12,
    "bank": "Droite",
    "lat": 48.850111,
    "lng": 2.384029
  },
  {
    "name": "Falguière",
    "lines": [
      "12"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.844318,
    "lng": 2.317551
  },
  {
    "name": "Félix Faure",
    "lines": [
      "8"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.842684,
    "lng": 2.291847
  },
  {
    "name": "Filles du Calvaire",
    "lines": [
      "8"
    ],
    "area": "Paris 11e",
    "arr": 11,
    "bank": "Droite",
    "lat": 48.86307,
    "lng": 2.366745
  },
  {
    "name": "Fort d'Aubervilliers",
    "lines": [
      "7"
    ],
    "area": "Aubervilliers",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.914708,
    "lng": 2.404188
  },
  {
    "name": "Franklin D. Roosevelt",
    "lines": [
      "1",
      "9"
    ],
    "area": "Paris 8e",
    "arr": 8,
    "bank": "Droite",
    "lat": 48.868725,
    "lng": 2.309488
  },
  {
    "name": "Front Populaire",
    "lines": [
      "12"
    ],
    "area": "Saint-Denis",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.906664,
    "lng": 2.365792
  },
  {
    "name": "Gabriel Péri",
    "lines": [
      "13"
    ],
    "area": "Asnières-sur-Seine",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.916393,
    "lng": 2.294692
  },
  {
    "name": "Gaîté",
    "lines": [
      "13"
    ],
    "area": "Paris 14e",
    "arr": 14,
    "bank": "Gauche",
    "lat": 48.838526,
    "lng": 2.322354
  },
  {
    "name": "Gallieni",
    "lines": [
      "3"
    ],
    "area": "Bagnolet",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.865397,
    "lng": 2.415921
  },
  {
    "name": "Gambetta",
    "lines": [
      "3",
      "3bis"
    ],
    "area": "Paris 20e",
    "arr": 20,
    "bank": "Droite",
    "lat": 48.865033,
    "lng": 2.398537
  },
  {
    "name": "Gare d’Austerlitz",
    "lines": [
      "5",
      "10"
    ],
    "area": "Paris 5e",
    "arr": 5,
    "bank": "Gauche",
    "lat": 48.843405,
    "lng": 2.364177
  },
  {
    "name": "Gare de l’Est",
    "lines": [
      "4",
      "5",
      "7"
    ],
    "area": "Paris 10e",
    "arr": 10,
    "bank": "Droite",
    "lat": 48.876163,
    "lng": 2.358065
  },
  {
    "name": "Gare de Lyon",
    "lines": [
      "1",
      "14"
    ],
    "area": "Paris 12e",
    "arr": 12,
    "bank": "Droite",
    "lat": 48.845683,
    "lng": 2.373157
  },
  {
    "name": "Gare du Nord",
    "lines": [
      "4",
      "5"
    ],
    "area": "Paris 10e",
    "arr": 10,
    "bank": "Droite",
    "lat": 48.879592,
    "lng": 2.356809
  },
  {
    "name": "Garibaldi",
    "lines": [
      "13"
    ],
    "area": "Saint-Ouen",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.906381,
    "lng": 2.331908
  },
  {
    "name": "George V",
    "lines": [
      "1"
    ],
    "area": "Paris 8e",
    "arr": 8,
    "bank": "Droite",
    "lat": 48.872038,
    "lng": 2.30076
  },
  {
    "name": "Glacière",
    "lines": [
      "6"
    ],
    "area": "Paris 13e",
    "arr": 13,
    "bank": "Gauche",
    "lat": 48.831116,
    "lng": 2.343438
  },
  {
    "name": "Goncourt",
    "lines": [
      "11"
    ],
    "area": "Paris 10e",
    "arr": 10,
    "bank": "Droite",
    "lat": 48.870007,
    "lng": 2.370764
  },
  {
    "name": "Grands Boulevards",
    "lines": [
      "8",
      "9"
    ],
    "area": "Paris 9e",
    "arr": 9,
    "bank": "Droite",
    "lat": 48.871505,
    "lng": 2.343207
  },
  {
    "name": "Guy Môquet",
    "lines": [
      "13"
    ],
    "area": "Paris 18e",
    "arr": 18,
    "bank": "Droite",
    "lat": 48.893001,
    "lng": 2.327483
  },
  {
    "name": "Havre-Caumartin",
    "lines": [
      "3",
      "9"
    ],
    "area": "Paris 9e",
    "arr": 9,
    "bank": "Droite",
    "lat": 48.873667,
    "lng": 2.327651
  },
  {
    "name": "Hoche",
    "lines": [
      "5"
    ],
    "area": "Pantin",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.891496,
    "lng": 2.403114
  },
  {
    "name": "Hôpital Bicêtre",
    "lines": [
      "14"
    ],
    "area": "Le Kremlin-Bicêtre",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.8094,
    "lng": 2.3498
  },
  {
    "name": "Hôtel de Ville",
    "lines": [
      "1",
      "11"
    ],
    "area": "Paris 4e",
    "arr": 4,
    "bank": "Droite",
    "lat": 48.857352,
    "lng": 2.352068
  },
  {
    "name": "Iéna",
    "lines": [
      "9"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.86478,
    "lng": 2.293864
  },
  {
    "name": "Invalides",
    "lines": [
      "8",
      "13"
    ],
    "area": "Paris 7e",
    "arr": 7,
    "bank": "Gauche",
    "lat": 48.861092,
    "lng": 2.314633
  },
  {
    "name": "Jacques Bonsergent",
    "lines": [
      "5"
    ],
    "area": "Paris 10e",
    "arr": 10,
    "bank": "Droite",
    "lat": 48.870621,
    "lng": 2.361024
  },
  {
    "name": "Jasmin",
    "lines": [
      "9"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.852433,
    "lng": 2.267933
  },
  {
    "name": "Jaurès",
    "lines": [
      "2",
      "5",
      "7bis"
    ],
    "area": "Paris 19e",
    "arr": 19,
    "bank": "Droite",
    "lat": 48.883024,
    "lng": 2.371439
  },
  {
    "name": "Javel - André Citroën",
    "lines": [
      "10"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.846181,
    "lng": 2.278009
  },
  {
    "name": "Jourdain",
    "lines": [
      "11"
    ],
    "area": "Paris 19e",
    "arr": 19,
    "bank": "Droite",
    "lat": 48.875247,
    "lng": 2.389325
  },
  {
    "name": "Jules Joffrin",
    "lines": [
      "12"
    ],
    "area": "Paris 18e",
    "arr": 18,
    "bank": "Droite",
    "lat": 48.892492,
    "lng": 2.34432
  },
  {
    "name": "Jussieu",
    "lines": [
      "7",
      "10"
    ],
    "area": "Paris 5e",
    "arr": 5,
    "bank": "Gauche",
    "lat": 48.846198,
    "lng": 2.354932
  },
  {
    "name": "Kléber",
    "lines": [
      "6"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.871489,
    "lng": 2.293146
  },
  {
    "name": "L’Haÿ-les-Roses",
    "lines": [
      "14"
    ],
    "area": "L'Haÿ-les-Roses",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.7748,
    "lng": 2.3541
  },
  {
    "name": "La Chapelle",
    "lines": [
      "2"
    ],
    "area": "Paris 10e",
    "arr": 10,
    "bank": "Droite",
    "lat": 48.884386,
    "lng": 2.360404
  },
  {
    "name": "La Courneuve - 8 Mai 1945",
    "lines": [
      "7"
    ],
    "area": "La Courneuve",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.920246,
    "lng": 2.410221
  },
  {
    "name": "La Défense (Grande Arche)",
    "lines": [
      "1"
    ],
    "area": "Puteaux",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.891818,
    "lng": 2.237988
  },
  {
    "name": "La Dhuys",
    "lines": [
      "11"
    ],
    "area": "Noisy-le-Sec",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.8777,
    "lng": 2.4655
  },
  {
    "name": "La Fourche",
    "lines": [
      "13"
    ],
    "area": "Paris 18e",
    "arr": 18,
    "bank": "Droite",
    "lat": 48.887434,
    "lng": 2.325714
  },
  {
    "name": "La Motte-Picquet - Grenelle",
    "lines": [
      "6",
      "8",
      "10"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.849631,
    "lng": 2.298526
  },
  {
    "name": "La Muette",
    "lines": [
      "9"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.858092,
    "lng": 2.274096
  },
  {
    "name": "La Tour-Maubourg",
    "lines": [
      "8"
    ],
    "area": "Paris 7e",
    "arr": 7,
    "bank": "Gauche",
    "lat": 48.857727,
    "lng": 2.310474
  },
  {
    "name": "Lamarck - Caulaincourt",
    "lines": [
      "12"
    ],
    "area": "Paris 18e",
    "arr": 18,
    "bank": "Droite",
    "lat": 48.889682,
    "lng": 2.338584
  },
  {
    "name": "Laumière",
    "lines": [
      "5"
    ],
    "area": "Paris 19e",
    "arr": 19,
    "bank": "Droite",
    "lat": 48.885134,
    "lng": 2.379391
  },
  {
    "name": "Le Kremlin-Bicêtre",
    "lines": [
      "7"
    ],
    "area": "Le Kremlin-Bicêtre",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.81028,
    "lng": 2.362272
  },
  {
    "name": "Le Peletier",
    "lines": [
      "7"
    ],
    "area": "Paris 9e",
    "arr": 9,
    "bank": "Droite",
    "lat": 48.874959,
    "lng": 2.340151
  },
  {
    "name": "Ledru-Rollin",
    "lines": [
      "8"
    ],
    "area": "Paris 11e",
    "arr": 11,
    "bank": "Droite",
    "lat": 48.851338,
    "lng": 2.376141
  },
  {
    "name": "Les Agnettes",
    "lines": [
      "13"
    ],
    "area": "Asnières-sur-Seine",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.923056,
    "lng": 2.286156
  },
  {
    "name": "Les Gobelins",
    "lines": [
      "7"
    ],
    "area": "Paris 13e",
    "arr": 13,
    "bank": "Gauche",
    "lat": 48.835842,
    "lng": 2.352417
  },
  {
    "name": "Les Halles",
    "lines": [
      "4"
    ],
    "area": "Paris 1er",
    "arr": 1,
    "bank": "Droite",
    "lat": 48.862505,
    "lng": 2.346127
  },
  {
    "name": "Les Sablons",
    "lines": [
      "1"
    ],
    "area": "Neuilly-sur-Seine",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.881291,
    "lng": 2.271905
  },
  {
    "name": "Liberté",
    "lines": [
      "8"
    ],
    "area": "Charenton-le-Pont",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.826148,
    "lng": 2.406491
  },
  {
    "name": "Liège",
    "lines": [
      "13"
    ],
    "area": "Paris 8e",
    "arr": 8,
    "bank": "Droite",
    "lat": 48.879535,
    "lng": 2.326853
  },
  {
    "name": "Louis Blanc",
    "lines": [
      "7",
      "7bis"
    ],
    "area": "Paris 10e",
    "arr": 10,
    "bank": "Droite",
    "lat": 48.881206,
    "lng": 2.364425
  },
  {
    "name": "Louise Michel",
    "lines": [
      "3"
    ],
    "area": "Levallois-Perret",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.888493,
    "lng": 2.288168
  },
  {
    "name": "Lourmel",
    "lines": [
      "8"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.838661,
    "lng": 2.282242
  },
  {
    "name": "Louvre - Rivoli",
    "lines": [
      "1"
    ],
    "area": "Paris 1er",
    "arr": 1,
    "bank": "Droite",
    "lat": 48.860871,
    "lng": 2.34097
  },
  {
    "name": "Mabillon",
    "lines": [
      "10"
    ],
    "area": "Paris 6e",
    "arr": 6,
    "bank": "Gauche",
    "lat": 48.852844,
    "lng": 2.335143
  },
  {
    "name": "Madeleine",
    "lines": [
      "8",
      "12",
      "14"
    ],
    "area": "Paris 8e",
    "arr": 8,
    "bank": "Droite",
    "lat": 48.870545,
    "lng": 2.32581
  },
  {
    "name": "Mairie d’Aubervilliers",
    "lines": [
      "12"
    ],
    "area": "Aubervilliers",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.913731,
    "lng": 2.380851
  },
  {
    "name": "Mairie d’Issy",
    "lines": [
      "12"
    ],
    "area": "Issy-les-Moulineaux",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.824164,
    "lng": 2.273561
  },
  {
    "name": "Mairie d’Ivry",
    "lines": [
      "7"
    ],
    "area": "Ivry-sur-Seine",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.81121,
    "lng": 2.383498
  },
  {
    "name": "Mairie de Clichy",
    "lines": [
      "13"
    ],
    "area": "Clichy",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.903449,
    "lng": 2.305726
  },
  {
    "name": "Mairie de Montreuil",
    "lines": [
      "9"
    ],
    "area": "Montreuil",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.862274,
    "lng": 2.441819
  },
  {
    "name": "Mairie de Montrouge",
    "lines": [
      "4"
    ],
    "area": "Montrouge",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.818472,
    "lng": 2.319524
  },
  {
    "name": "Mairie de Saint-Ouen",
    "lines": [
      "13",
      "14"
    ],
    "area": "Saint-Ouen",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.912021,
    "lng": 2.333787
  },
  {
    "name": "Mairie des Lilas",
    "lines": [
      "11"
    ],
    "area": "Les Lilas",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.879658,
    "lng": 2.41635
  },
  {
    "name": "Maison Blanche",
    "lines": [
      "7",
      "14"
    ],
    "area": "Paris 13e",
    "arr": 13,
    "bank": "Gauche",
    "lat": 48.82215,
    "lng": 2.358413
  },
  {
    "name": "Maisons-Alfort - Les Juilliottes",
    "lines": [
      "8"
    ],
    "area": "Maisons-Alfort",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.803106,
    "lng": 2.445788
  },
  {
    "name": "Maisons-Alfort - Stade",
    "lines": [
      "8"
    ],
    "area": "Maisons-Alfort",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.808918,
    "lng": 2.43482
  },
  {
    "name": "Malakoff - Plateau de Vanves",
    "lines": [
      "13"
    ],
    "area": "Malakoff",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.822145,
    "lng": 2.298411
  },
  {
    "name": "Malakoff - Rue Étienne Dolet",
    "lines": [
      "13"
    ],
    "area": "Malakoff",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.815338,
    "lng": 2.297124
  },
  {
    "name": "Malesherbes",
    "lines": [
      "3"
    ],
    "area": "Paris 17e",
    "arr": 17,
    "bank": "Droite",
    "lat": 48.88284,
    "lng": 2.309488
  },
  {
    "name": "Maraîchers",
    "lines": [
      "9"
    ],
    "area": "Paris 20e",
    "arr": 20,
    "bank": "Droite",
    "lat": 48.852731,
    "lng": 2.406039
  },
  {
    "name": "Marcadet - Poissonniers",
    "lines": [
      "4",
      "12"
    ],
    "area": "Paris 18e",
    "arr": 18,
    "bank": "Droite",
    "lat": 48.89128,
    "lng": 2.349682
  },
  {
    "name": "Marcel Sembat",
    "lines": [
      "9"
    ],
    "area": "Boulogne-Billancourt",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.833593,
    "lng": 2.243583
  },
  {
    "name": "Marx Dormoy",
    "lines": [
      "12"
    ],
    "area": "Paris 18e",
    "arr": 18,
    "bank": "Droite",
    "lat": 48.89058,
    "lng": 2.359808
  },
  {
    "name": "Maubert - Mutualité",
    "lines": [
      "10"
    ],
    "area": "Paris 5e",
    "arr": 5,
    "bank": "Gauche",
    "lat": 48.850195,
    "lng": 2.34828
  },
  {
    "name": "Ménilmontant",
    "lines": [
      "2"
    ],
    "area": "Paris 11e",
    "arr": 11,
    "bank": "Droite",
    "lat": 48.86639,
    "lng": 2.38343
  },
  {
    "name": "Michel Bizot",
    "lines": [
      "8"
    ],
    "area": "Paris 12e",
    "arr": 12,
    "bank": "Droite",
    "lat": 48.837077,
    "lng": 2.402367
  },
  {
    "name": "Michel-Ange - Auteuil",
    "lines": [
      "9",
      "10"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.847975,
    "lng": 2.26399
  },
  {
    "name": "Michel-Ange - Molitor",
    "lines": [
      "9",
      "10"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.844911,
    "lng": 2.261512
  },
  {
    "name": "Mirabeau",
    "lines": [
      "10"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.847078,
    "lng": 2.273064
  },
  {
    "name": "Miromesnil",
    "lines": [
      "9",
      "13"
    ],
    "area": "Paris 8e",
    "arr": 8,
    "bank": "Droite",
    "lat": 48.873448,
    "lng": 2.316011
  },
  {
    "name": "Monceau",
    "lines": [
      "2"
    ],
    "area": "Paris 17e",
    "arr": 17,
    "bank": "Droite",
    "lat": 48.880569,
    "lng": 2.309413
  },
  {
    "name": "Montgallet",
    "lines": [
      "8"
    ],
    "area": "Paris 12e",
    "arr": 12,
    "bank": "Droite",
    "lat": 48.844005,
    "lng": 2.3904
  },
  {
    "name": "Montparnasse-Bienvenüe",
    "lines": [
      "4",
      "6",
      "12",
      "13"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.843824,
    "lng": 2.323989
  },
  {
    "name": "Montreuil - Hôpital",
    "lines": [
      "11"
    ],
    "area": "Noisy-le-Sec",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.8779,
    "lng": 2.4546
  },
  {
    "name": "Mouton-Duvernet",
    "lines": [
      "4"
    ],
    "area": "Paris 14e",
    "arr": 14,
    "bank": "Gauche",
    "lat": 48.831338,
    "lng": 2.329888
  },
  {
    "name": "Nation",
    "lines": [
      "1",
      "2",
      "6",
      "9"
    ],
    "area": "Paris 12e",
    "arr": 12,
    "bank": "Droite",
    "lat": 48.848084,
    "lng": 2.395844
  },
  {
    "name": "Nationale",
    "lines": [
      "6"
    ],
    "area": "Paris 13e",
    "arr": 13,
    "bank": "Gauche",
    "lat": 48.833235,
    "lng": 2.362804
  },
  {
    "name": "Notre-Dame des Champs",
    "lines": [
      "12"
    ],
    "area": "Paris 6e",
    "arr": 6,
    "bank": "Gauche",
    "lat": 48.845078,
    "lng": 2.328696
  },
  {
    "name": "Notre-Dame-de-Lorette",
    "lines": [
      "12"
    ],
    "area": "Paris 9e",
    "arr": 9,
    "bank": "Droite",
    "lat": 48.876035,
    "lng": 2.337874
  },
  {
    "name": "Oberkampf",
    "lines": [
      "5",
      "9"
    ],
    "area": "Paris 11e",
    "arr": 11,
    "bank": "Droite",
    "lat": 48.864777,
    "lng": 2.368156
  },
  {
    "name": "Odéon",
    "lines": [
      "4",
      "10"
    ],
    "area": "Paris 6e",
    "arr": 6,
    "bank": "Gauche",
    "lat": 48.852025,
    "lng": 2.340692
  },
  {
    "name": "Olympiades",
    "lines": [
      "14"
    ],
    "area": "Paris 13e",
    "arr": 13,
    "bank": "Gauche",
    "lat": 48.827123,
    "lng": 2.366923
  },
  {
    "name": "Opéra",
    "lines": [
      "3",
      "7",
      "8"
    ],
    "area": "Paris 9e",
    "arr": 9,
    "bank": "Droite",
    "lat": 48.871437,
    "lng": 2.331047
  },
  {
    "name": "Ourcq",
    "lines": [
      "5"
    ],
    "area": "Paris 19e",
    "arr": 19,
    "bank": "Droite",
    "lat": 48.886916,
    "lng": 2.386652
  },
  {
    "name": "Palais Royal - Musée du Louvre",
    "lines": [
      "1",
      "7"
    ],
    "area": "Paris 1er",
    "arr": 1,
    "bank": "Droite",
    "lat": 48.862222,
    "lng": 2.336454
  },
  {
    "name": "Parmentier",
    "lines": [
      "3"
    ],
    "area": "Paris 11e",
    "arr": 11,
    "bank": "Droite",
    "lat": 48.865252,
    "lng": 2.374748
  },
  {
    "name": "Passy",
    "lines": [
      "6"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.857515,
    "lng": 2.285839
  },
  {
    "name": "Pasteur",
    "lines": [
      "6",
      "12"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.842528,
    "lng": 2.312915
  },
  {
    "name": "Pelleport",
    "lines": [
      "3bis"
    ],
    "area": "Paris 20e",
    "arr": 20,
    "bank": "Droite",
    "lat": 48.868465,
    "lng": 2.401497
  },
  {
    "name": "Père Lachaise",
    "lines": [
      "2",
      "3"
    ],
    "area": "Paris 11e",
    "arr": 11,
    "bank": "Droite",
    "lat": 48.86245,
    "lng": 2.38758
  },
  {
    "name": "Pereire",
    "lines": [
      "3"
    ],
    "area": "Paris 17e",
    "arr": 17,
    "bank": "Droite",
    "lat": 48.884844,
    "lng": 2.297683
  },
  {
    "name": "Pernety",
    "lines": [
      "13"
    ],
    "area": "Paris 14e",
    "arr": 14,
    "bank": "Gauche",
    "lat": 48.834079,
    "lng": 2.318394
  },
  {
    "name": "Philippe Auguste",
    "lines": [
      "2"
    ],
    "area": "Paris 11e",
    "arr": 11,
    "bank": "Droite",
    "lat": 48.858089,
    "lng": 2.390498
  },
  {
    "name": "Picpus",
    "lines": [
      "6"
    ],
    "area": "Paris 12e",
    "arr": 12,
    "bank": "Droite",
    "lat": 48.845103,
    "lng": 2.401275
  },
  {
    "name": "Pierre et Marie Curie",
    "lines": [
      "7"
    ],
    "area": "Ivry-sur-Seine",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.815878,
    "lng": 2.377363
  },
  {
    "name": "Pigalle",
    "lines": [
      "2",
      "12"
    ],
    "area": "Paris 9e",
    "arr": 9,
    "bank": "Droite",
    "lat": 48.882021,
    "lng": 2.337211
  },
  {
    "name": "Place d'Italie",
    "lines": [
      "5",
      "6",
      "7"
    ],
    "area": "Paris 13e",
    "arr": 13,
    "bank": "Gauche",
    "lat": 48.830966,
    "lng": 2.355502
  },
  {
    "name": "Place de Clichy",
    "lines": [
      "2",
      "13"
    ],
    "area": "Paris 18e",
    "arr": 18,
    "bank": "Droite",
    "lat": 48.883669,
    "lng": 2.327958
  },
  {
    "name": "Place des Fêtes",
    "lines": [
      "7bis",
      "11"
    ],
    "area": "Paris 19e",
    "arr": 19,
    "bank": "Droite",
    "lat": 48.876724,
    "lng": 2.393139
  },
  {
    "name": "Place Monge",
    "lines": [
      "7"
    ],
    "area": "Paris 5e",
    "arr": 5,
    "bank": "Gauche",
    "lat": 48.842666,
    "lng": 2.352155
  },
  {
    "name": "Plaisance",
    "lines": [
      "13"
    ],
    "area": "Paris 14e",
    "arr": 14,
    "bank": "Gauche",
    "lat": 48.83175,
    "lng": 2.31386
  },
  {
    "name": "Pointe du Lac",
    "lines": [
      "8"
    ],
    "area": "Créteil",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.768752,
    "lng": 2.46429
  },
  {
    "name": "Poissonnière",
    "lines": [
      "7"
    ],
    "area": "Paris 9e",
    "arr": 9,
    "bank": "Droite",
    "lat": 48.877165,
    "lng": 2.34874
  },
  {
    "name": "Pont Cardinet",
    "lines": [
      "14"
    ],
    "area": "Paris 17e",
    "arr": 17,
    "bank": "Droite",
    "lat": 48.888103,
    "lng": 2.315368
  },
  {
    "name": "Pont de Levallois - Bécon",
    "lines": [
      "3"
    ],
    "area": "Levallois-Perret",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.897187,
    "lng": 2.28018
  },
  {
    "name": "Pont de Neuilly",
    "lines": [
      "1"
    ],
    "area": "Neuilly-sur-Seine",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.885499,
    "lng": 2.258523
  },
  {
    "name": "Pont de Sèvres",
    "lines": [
      "9"
    ],
    "area": "Boulogne-Billancourt",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.829669,
    "lng": 2.230505
  },
  {
    "name": "Pont Marie (Cité des Arts)",
    "lines": [
      "7"
    ],
    "area": "Paris 4e",
    "arr": 4,
    "bank": "Droite",
    "lat": 48.85346,
    "lng": 2.357377
  },
  {
    "name": "Pont Neuf",
    "lines": [
      "7"
    ],
    "area": "Paris 1er",
    "arr": 1,
    "bank": "Droite",
    "lat": 48.858546,
    "lng": 2.341777
  },
  {
    "name": "Porte d’Auteuil",
    "lines": [
      "10"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.847904,
    "lng": 2.258281
  },
  {
    "name": "Porte d’Italie",
    "lines": [
      "7"
    ],
    "area": "Paris 13e",
    "arr": 13,
    "bank": "Gauche",
    "lat": 48.819107,
    "lng": 2.35953
  },
  {
    "name": "Porte d’Ivry",
    "lines": [
      "7"
    ],
    "area": "Paris 13e",
    "arr": 13,
    "bank": "Gauche",
    "lat": 48.821489,
    "lng": 2.369511
  },
  {
    "name": "Porte d’Orléans",
    "lines": [
      "4"
    ],
    "area": "Paris 14e",
    "arr": 14,
    "bank": "Gauche",
    "lat": 48.823416,
    "lng": 2.325493
  },
  {
    "name": "Porte Dauphine",
    "lines": [
      "2"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.871397,
    "lng": 2.277633
  },
  {
    "name": "Porte de Bagnolet",
    "lines": [
      "3"
    ],
    "area": "Paris 20e",
    "arr": 20,
    "bank": "Droite",
    "lat": 48.864539,
    "lng": 2.408754
  },
  {
    "name": "Porte de Champerret",
    "lines": [
      "3"
    ],
    "area": "Paris 17e",
    "arr": 17,
    "bank": "Droite",
    "lat": 48.885652,
    "lng": 2.292112
  },
  {
    "name": "Porte de Charenton",
    "lines": [
      "8"
    ],
    "area": "Paris 12e",
    "arr": 12,
    "bank": "Droite",
    "lat": 48.833449,
    "lng": 2.402512
  },
  {
    "name": "Porte de Choisy",
    "lines": [
      "7"
    ],
    "area": "Paris 13e",
    "arr": 13,
    "bank": "Gauche",
    "lat": 48.820056,
    "lng": 2.364679
  },
  {
    "name": "Porte de Clichy",
    "lines": [
      "13",
      "14"
    ],
    "area": "Paris 17e",
    "arr": 17,
    "bank": "Droite",
    "lat": 48.894431,
    "lng": 2.313208
  },
  {
    "name": "Porte de Clignancourt",
    "lines": [
      "4"
    ],
    "area": "Paris 18e",
    "arr": 18,
    "bank": "Droite",
    "lat": 48.897526,
    "lng": 2.344624
  },
  {
    "name": "Porte de la Chapelle",
    "lines": [
      "12"
    ],
    "area": "Paris 18e",
    "arr": 18,
    "bank": "Droite",
    "lat": 48.897402,
    "lng": 2.359249
  },
  {
    "name": "Porte de la Villette",
    "lines": [
      "7"
    ],
    "area": "Paris 19e",
    "arr": 19,
    "bank": "Droite",
    "lat": 48.897803,
    "lng": 2.385869
  },
  {
    "name": "Porte de Montreuil",
    "lines": [
      "9"
    ],
    "area": "Paris 20e",
    "arr": 20,
    "bank": "Droite",
    "lat": 48.853483,
    "lng": 2.410718
  },
  {
    "name": "Porte de Pantin",
    "lines": [
      "5"
    ],
    "area": "Paris 19e",
    "arr": 19,
    "bank": "Droite",
    "lat": 48.888459,
    "lng": 2.392123
  },
  {
    "name": "Porte de Saint-Cloud",
    "lines": [
      "9"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.837958,
    "lng": 2.257046
  },
  {
    "name": "Porte de Saint-Ouen",
    "lines": [
      "13"
    ],
    "area": "Paris 18e",
    "arr": 18,
    "bank": "Droite",
    "lat": 48.897498,
    "lng": 2.329048
  },
  {
    "name": "Porte de Vanves",
    "lines": [
      "13"
    ],
    "area": "Paris 14e",
    "arr": 14,
    "bank": "Gauche",
    "lat": 48.827613,
    "lng": 2.305332
  },
  {
    "name": "Porte de Versailles",
    "lines": [
      "12"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.83252,
    "lng": 2.287742
  },
  {
    "name": "Porte de Vincennes",
    "lines": [
      "1"
    ],
    "area": "Paris 12e",
    "arr": 12,
    "bank": "Droite",
    "lat": 48.847008,
    "lng": 2.410805
  },
  {
    "name": "Porte des Lilas",
    "lines": [
      "3bis",
      "11"
    ],
    "area": "Paris 20e",
    "arr": 20,
    "bank": "Droite",
    "lat": 48.876569,
    "lng": 2.407062
  },
  {
    "name": "Porte Dorée",
    "lines": [
      "8"
    ],
    "area": "Paris 12e",
    "arr": 12,
    "bank": "Droite",
    "lat": 48.835017,
    "lng": 2.405874
  },
  {
    "name": "Porte Maillot",
    "lines": [
      "1"
    ],
    "area": "Paris 17e",
    "arr": 17,
    "bank": "Droite",
    "lat": 48.878163,
    "lng": 2.282584
  },
  {
    "name": "Pré-Saint-Gervais",
    "lines": [
      "7bis"
    ],
    "area": "Paris 19e",
    "arr": 19,
    "bank": "Droite",
    "lat": 48.88016,
    "lng": 2.398581
  },
  {
    "name": "Pyramides",
    "lines": [
      "7",
      "14"
    ],
    "area": "Paris 1er",
    "arr": 1,
    "bank": "Droite",
    "lat": 48.865756,
    "lng": 2.334624
  },
  {
    "name": "Pyrénées",
    "lines": [
      "11"
    ],
    "area": "Paris 20e",
    "arr": 20,
    "bank": "Droite",
    "lat": 48.873819,
    "lng": 2.385203
  },
  {
    "name": "Quai de la Gare",
    "lines": [
      "6"
    ],
    "area": "Paris 13e",
    "arr": 13,
    "bank": "Gauche",
    "lat": 48.837074,
    "lng": 2.372766
  },
  {
    "name": "Quai de la Rapée",
    "lines": [
      "5"
    ],
    "area": "Paris 12e",
    "arr": 12,
    "bank": "Droite",
    "lat": 48.846427,
    "lng": 2.365885
  },
  {
    "name": "Quatre Septembre",
    "lines": [
      "3"
    ],
    "area": "Paris 2e",
    "arr": 2,
    "bank": "Droite",
    "lat": 48.869659,
    "lng": 2.336319
  },
  {
    "name": "Rambuteau",
    "lines": [
      "11"
    ],
    "area": "Paris 4e",
    "arr": 4,
    "bank": "Droite",
    "lat": 48.86119,
    "lng": 2.353274
  },
  {
    "name": "Ranelagh",
    "lines": [
      "9"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.855504,
    "lng": 2.269948
  },
  {
    "name": "Raspail",
    "lines": [
      "4",
      "6"
    ],
    "area": "Paris 14e",
    "arr": 14,
    "bank": "Gauche",
    "lat": 48.839156,
    "lng": 2.330467
  },
  {
    "name": "Réaumur - Sébastopol",
    "lines": [
      "3",
      "4"
    ],
    "area": "Paris 2e",
    "arr": 2,
    "bank": "Droite",
    "lat": 48.866382,
    "lng": 2.352051
  },
  {
    "name": "Rennes",
    "lines": [
      "12"
    ],
    "area": "Paris 6e",
    "arr": 6,
    "bank": "Gauche",
    "lat": 48.848333,
    "lng": 2.327787
  },
  {
    "name": "République",
    "lines": [
      "3",
      "5",
      "8",
      "9",
      "11"
    ],
    "area": "Paris 3e",
    "arr": 3,
    "bank": "Droite",
    "lat": 48.867512,
    "lng": 2.363302
  },
  {
    "name": "Reuilly - Diderot",
    "lines": [
      "1",
      "8"
    ],
    "area": "Paris 12e",
    "arr": 12,
    "bank": "Droite",
    "lat": 48.847213,
    "lng": 2.387201
  },
  {
    "name": "Richard-Lenoir",
    "lines": [
      "5"
    ],
    "area": "Paris 11e",
    "arr": 11,
    "bank": "Droite",
    "lat": 48.859877,
    "lng": 2.371814
  },
  {
    "name": "Richelieu - Drouot",
    "lines": [
      "8",
      "9"
    ],
    "area": "Paris 9e",
    "arr": 9,
    "bank": "Droite",
    "lat": 48.872136,
    "lng": 2.338591
  },
  {
    "name": "Riquet",
    "lines": [
      "7"
    ],
    "area": "Paris 19e",
    "arr": 19,
    "bank": "Droite",
    "lat": 48.888157,
    "lng": 2.373669
  },
  {
    "name": "Robespierre",
    "lines": [
      "9"
    ],
    "area": "Montreuil",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.855674,
    "lng": 2.422973
  },
  {
    "name": "Romainville-Carnot",
    "lines": [
      "11"
    ],
    "area": "Romainville",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.8827,
    "lng": 2.4405
  },
  {
    "name": "Rome",
    "lines": [
      "2"
    ],
    "area": "Paris 17e",
    "arr": 17,
    "bank": "Droite",
    "lat": 48.882346,
    "lng": 2.321359
  },
  {
    "name": "Rosny-Bois-Perrier",
    "lines": [
      "11"
    ],
    "area": "Rosny-sous-Bois",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.882,
    "lng": 2.4808
  },
  {
    "name": "Rue de la Pompe",
    "lines": [
      "9"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.863952,
    "lng": 2.277886
  },
  {
    "name": "Rue des Boulets",
    "lines": [
      "9"
    ],
    "area": "Paris 11e",
    "arr": 11,
    "bank": "Droite",
    "lat": 48.852214,
    "lng": 2.389105
  },
  {
    "name": "Rue du Bac",
    "lines": [
      "12"
    ],
    "area": "Paris 7e",
    "arr": 7,
    "bank": "Gauche",
    "lat": 48.855885,
    "lng": 2.3257
  },
  {
    "name": "Rue Saint-Maur",
    "lines": [
      "3"
    ],
    "area": "Paris 11e",
    "arr": 11,
    "bank": "Droite",
    "lat": 48.864118,
    "lng": 2.380508
  },
  {
    "name": "Saint-Ambroise",
    "lines": [
      "9"
    ],
    "area": "Paris 11e",
    "arr": 11,
    "bank": "Droite",
    "lat": 48.861417,
    "lng": 2.373881
  },
  {
    "name": "Saint-Augustin",
    "lines": [
      "9"
    ],
    "area": "Paris 8e",
    "arr": 8,
    "bank": "Droite",
    "lat": 48.874547,
    "lng": 2.321014
  },
  {
    "name": "Saint-Denis - Porte de Paris",
    "lines": [
      "13"
    ],
    "area": "Saint-Denis",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.929923,
    "lng": 2.356173
  },
  {
    "name": "Saint-Denis - Université",
    "lines": [
      "13"
    ],
    "area": "Saint-Denis",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.945911,
    "lng": 2.364494
  },
  {
    "name": "Saint-Denis Pleyel",
    "lines": [
      "14"
    ],
    "area": "Saint-Denis",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.9175,
    "lng": 2.346667
  },
  {
    "name": "Saint-Fargeau",
    "lines": [
      "3bis"
    ],
    "area": "Paris 20e",
    "arr": 20,
    "bank": "Droite",
    "lat": 48.871843,
    "lng": 2.404498
  },
  {
    "name": "Saint-François-Xavier",
    "lines": [
      "13"
    ],
    "area": "Paris 7e",
    "arr": 7,
    "bank": "Gauche",
    "lat": 48.851292,
    "lng": 2.314286
  },
  {
    "name": "Saint-Georges",
    "lines": [
      "12"
    ],
    "area": "Paris 9e",
    "arr": 9,
    "bank": "Droite",
    "lat": 48.878417,
    "lng": 2.337571
  },
  {
    "name": "Saint-Germain-des-Prés",
    "lines": [
      "4"
    ],
    "area": "Paris 6e",
    "arr": 6,
    "bank": "Gauche",
    "lat": 48.853575,
    "lng": 2.333948
  },
  {
    "name": "Saint-Jacques",
    "lines": [
      "6"
    ],
    "area": "Paris 14e",
    "arr": 14,
    "bank": "Gauche",
    "lat": 48.832916,
    "lng": 2.337154
  },
  {
    "name": "Saint-Lazare",
    "lines": [
      "3",
      "12",
      "13",
      "14"
    ],
    "area": "Paris 8e",
    "arr": 8,
    "bank": "Droite",
    "lat": 48.875381,
    "lng": 2.325488
  },
  {
    "name": "Saint-Mandé",
    "lines": [
      "1"
    ],
    "area": "Saint-Mandé",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.846229,
    "lng": 2.41899
  },
  {
    "name": "Saint-Marcel",
    "lines": [
      "5"
    ],
    "area": "Paris 13e",
    "arr": 13,
    "bank": "Gauche",
    "lat": 48.838512,
    "lng": 2.360722
  },
  {
    "name": "Saint-Michel",
    "lines": [
      "4"
    ],
    "area": "Paris 6e",
    "arr": 6,
    "bank": "Gauche",
    "lat": 48.853594,
    "lng": 2.343992
  },
  {
    "name": "Saint-Ouen",
    "lines": [
      "14"
    ],
    "area": "Saint-Ouen",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.90517,
    "lng": 2.322756
  },
  {
    "name": "Saint-Paul (Le Marais)",
    "lines": [
      "1"
    ],
    "area": "Paris 4e",
    "arr": 4,
    "bank": "Droite",
    "lat": 48.855187,
    "lng": 2.360885
  },
  {
    "name": "Saint-Philippe du Roule",
    "lines": [
      "9"
    ],
    "area": "Paris 8e",
    "arr": 8,
    "bank": "Droite",
    "lat": 48.872155,
    "lng": 2.310137
  },
  {
    "name": "Saint-Placide",
    "lines": [
      "4"
    ],
    "area": "Paris 6e",
    "arr": 6,
    "bank": "Gauche",
    "lat": 48.847007,
    "lng": 2.327055
  },
  {
    "name": "Saint-Sébastien - Froissart",
    "lines": [
      "8"
    ],
    "area": "Paris 11e",
    "arr": 11,
    "bank": "Droite",
    "lat": 48.860968,
    "lng": 2.367262
  },
  {
    "name": "Saint-Sulpice",
    "lines": [
      "4"
    ],
    "area": "Paris 6e",
    "arr": 6,
    "bank": "Gauche",
    "lat": 48.851209,
    "lng": 2.330612
  },
  {
    "name": "Ségur",
    "lines": [
      "10"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.847167,
    "lng": 2.307138
  },
  {
    "name": "Sentier",
    "lines": [
      "3"
    ],
    "area": "Paris 2e",
    "arr": 2,
    "bank": "Droite",
    "lat": 48.867347,
    "lng": 2.347554
  },
  {
    "name": "Serge Gainsbourg",
    "lines": [
      "11"
    ],
    "area": "Les Lilas",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.8809,
    "lng": 2.4274
  },
  {
    "name": "Sèvres - Babylone",
    "lines": [
      "10",
      "12"
    ],
    "area": "Paris 7e",
    "arr": 7,
    "bank": "Gauche",
    "lat": 48.851565,
    "lng": 2.32686
  },
  {
    "name": "Sèvres-Lecourbe",
    "lines": [
      "6"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.845648,
    "lng": 2.30953
  },
  {
    "name": "Simplon",
    "lines": [
      "4"
    ],
    "area": "Paris 18e",
    "arr": 18,
    "bank": "Droite",
    "lat": 48.894124,
    "lng": 2.347596
  },
  {
    "name": "Solférino",
    "lines": [
      "12"
    ],
    "area": "Paris 7e",
    "arr": 7,
    "bank": "Gauche",
    "lat": 48.858532,
    "lng": 2.323076
  },
  {
    "name": "Stalingrad",
    "lines": [
      "2",
      "5",
      "7"
    ],
    "area": "Paris 19e",
    "arr": 19,
    "bank": "Droite",
    "lat": 48.884321,
    "lng": 2.365774
  },
  {
    "name": "Strasbourg - Saint-Denis",
    "lines": [
      "4",
      "8",
      "9"
    ],
    "area": "Paris 10e",
    "arr": 10,
    "bank": "Droite",
    "lat": 48.869624,
    "lng": 2.354492
  },
  {
    "name": "Sully - Morland",
    "lines": [
      "7"
    ],
    "area": "Paris 4e",
    "arr": 4,
    "bank": "Droite",
    "lat": 48.851271,
    "lng": 2.361853
  },
  {
    "name": "Télégraphe",
    "lines": [
      "11"
    ],
    "area": "Paris 19e",
    "arr": 19,
    "bank": "Droite",
    "lat": 48.87551,
    "lng": 2.398648
  },
  {
    "name": "Temple",
    "lines": [
      "3"
    ],
    "area": "Paris 3e",
    "arr": 3,
    "bank": "Droite",
    "lat": 48.866757,
    "lng": 2.361561
  },
  {
    "name": "Ternes",
    "lines": [
      "2"
    ],
    "area": "Paris 17e",
    "arr": 17,
    "bank": "Droite",
    "lat": 48.878228,
    "lng": 2.298113
  },
  {
    "name": "Thiais - Orly",
    "lines": [
      "14"
    ],
    "area": "Thiais",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.7469,
    "lng": 2.3729
  },
  {
    "name": "Tolbiac",
    "lines": [
      "7"
    ],
    "area": "Paris 13e",
    "arr": 13,
    "bank": "Gauche",
    "lat": 48.826137,
    "lng": 2.357318
  },
  {
    "name": "Trinité - d’Estienne d’Orves",
    "lines": [
      "12"
    ],
    "area": "Paris 9e",
    "arr": 9,
    "bank": "Droite",
    "lat": 48.876337,
    "lng": 2.333049
  },
  {
    "name": "Trocadéro",
    "lines": [
      "6",
      "9"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.863488,
    "lng": 2.287493
  },
  {
    "name": "Tuileries",
    "lines": [
      "1"
    ],
    "area": "Paris 1er",
    "arr": 1,
    "bank": "Droite",
    "lat": 48.864478,
    "lng": 2.329678
  },
  {
    "name": "Vaneau",
    "lines": [
      "10"
    ],
    "area": "Paris 7e",
    "arr": 7,
    "bank": "Gauche",
    "lat": 48.848895,
    "lng": 2.321351
  },
  {
    "name": "Varenne",
    "lines": [
      "13"
    ],
    "area": "Paris 7e",
    "arr": 7,
    "bank": "Gauche",
    "lat": 48.856625,
    "lng": 2.315114
  },
  {
    "name": "Vaugirard",
    "lines": [
      "12"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.839438,
    "lng": 2.301075
  },
  {
    "name": "Vavin",
    "lines": [
      "4"
    ],
    "area": "Paris 14e",
    "arr": 14,
    "bank": "Gauche",
    "lat": 48.842052,
    "lng": 2.328863
  },
  {
    "name": "Victor Hugo",
    "lines": [
      "2"
    ],
    "area": "Paris 16e",
    "arr": 16,
    "bank": "Droite",
    "lat": 48.869926,
    "lng": 2.285829
  },
  {
    "name": "Villejuif - Gustave Roussy",
    "lines": [
      "14"
    ],
    "area": "Villejuif",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.7928,
    "lng": 2.3493
  },
  {
    "name": "Villejuif - Louis Aragon",
    "lines": [
      "7"
    ],
    "area": "Villejuif",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.787537,
    "lng": 2.367839
  },
  {
    "name": "Villejuif Léo Lagrange",
    "lines": [
      "7"
    ],
    "area": "Villejuif",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.804353,
    "lng": 2.363932
  },
  {
    "name": "Villejuif Paul Vaillant-Couturier",
    "lines": [
      "7"
    ],
    "area": "Villejuif",
    "arr": null,
    "bank": "Hors Paris",
    "lat": 48.796308,
    "lng": 2.368196
  },
  {
    "name": "Villiers",
    "lines": [
      "2",
      "3"
    ],
    "area": "Paris 8e",
    "arr": 8,
    "bank": "Droite",
    "lat": 48.881073,
    "lng": 2.315815
  },
  {
    "name": "Volontaires",
    "lines": [
      "12"
    ],
    "area": "Paris 15e",
    "arr": 15,
    "bank": "Gauche",
    "lat": 48.841412,
    "lng": 2.307983
  },
  {
    "name": "Voltaire",
    "lines": [
      "9"
    ],
    "area": "Paris 11e",
    "arr": 11,
    "bank": "Droite",
    "lat": 48.857662,
    "lng": 2.380032
  },
  {
    "name": "Wagram",
    "lines": [
      "3"
    ],
    "area": "Paris 17e",
    "arr": 17,
    "bank": "Droite",
    "lat": 48.883846,
    "lng": 2.304673
  }
];
