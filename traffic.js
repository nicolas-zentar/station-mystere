// Données générées depuis Open Data RATP : trafic annuel entrant par station du réseau ferré 2021.
// Le score ajoute un bonus de correspondance, car le trafic officiel ne compte que les entrants directs.
const trafficMeta = {
  "source": "Open Data RATP - Trafic annuel entrant par station du réseau ferré 2021",
  "sourceUrl": "https://data.ratp.fr/explore/dataset/trafic-annuel-entrant-par-station-du-reseau-ferre-2021/table/",
  "trafficYear": 2021,
  "connectionBonus": 1500000,
  "missingStations": 17
};
const stationTraffic = {
  "Abbesses": {
    "entrants": 1513884,
    "rank": 233,
    "connections": 1,
    "score": 1513884
  },
  "Alésia": {
    "entrants": 3098136,
    "rank": 100,
    "connections": 1,
    "score": 3098136
  },
  "Alexandre Dumas": {
    "entrants": 2476608,
    "rank": 137,
    "connections": 1,
    "score": 2476608
  },
  "Alma - Marceau": {
    "entrants": 2564842,
    "rank": 132,
    "connections": 1,
    "score": 2564842
  },
  "Anatole France": {
    "entrants": 2311825,
    "rank": 147,
    "connections": 1,
    "score": 2311825
  },
  "Anvers": {
    "entrants": 3420749,
    "rank": 85,
    "connections": 1,
    "score": 3420749
  },
  "Argentine": {
    "entrants": 2079212,
    "rank": 172,
    "connections": 1,
    "score": 2079212
  },
  "Arts et Métiers": {
    "entrants": 2403042,
    "rank": 140,
    "connections": 2,
    "score": 3903042
  },
  "Asnières - Gennevilliers Les Courtilles": {
    "entrants": 2802689,
    "rank": 122,
    "connections": 1,
    "score": 2802689
  },
  "Assemblée Nationale": {
    "entrants": 611512,
    "rank": 296,
    "connections": 1,
    "score": 611512
  },
  "Aubervilliers-Pantin Quatre Chemins": {
    "entrants": 5616435,
    "rank": 23,
    "connections": 1,
    "score": 5616435
  },
  "Avenue Émile Zola": {
    "entrants": 1041233,
    "rank": 281,
    "connections": 1,
    "score": 1041233
  },
  "Avron": {
    "entrants": 1345521,
    "rank": 249,
    "connections": 1,
    "score": 1345521
  },
  "Balard": {
    "entrants": 3236801,
    "rank": 95,
    "connections": 1,
    "score": 3236801
  },
  "Barbès - Rochechouart": {
    "entrants": 5390939,
    "rank": 26,
    "connections": 2,
    "score": 6890939
  },
  "Basilique de Saint-Denis": {
    "entrants": 3991395,
    "rank": 54,
    "connections": 1,
    "score": 3991395
  },
  "Bastille": {
    "entrants": 8069243,
    "rank": 11,
    "connections": 3,
    "score": 11069243
  },
  "Bel-Air": {
    "entrants": 1605573,
    "rank": 220,
    "connections": 1,
    "score": 1605573
  },
  "Belleville": {
    "entrants": 7314438,
    "rank": 12,
    "connections": 2,
    "score": 8814438
  },
  "Bérault": {
    "entrants": 2106827,
    "rank": 169,
    "connections": 1,
    "score": 2106827
  },
  "Bercy": {
    "entrants": 3884212,
    "rank": 61,
    "connections": 2,
    "score": 5384212
  },
  "Bibliothèque François Mitterrand": {
    "entrants": 11104474,
    "rank": 6,
    "connections": 1,
    "score": 11104474
  },
  "Billancourt": {
    "entrants": 1967532,
    "rank": 180,
    "connections": 1,
    "score": 1967532
  },
  "Bir-Hakeim": {
    "entrants": 3362908,
    "rank": 90,
    "connections": 1,
    "score": 3362908
  },
  "Blanche": {
    "entrants": 2167570,
    "rank": 163,
    "connections": 1,
    "score": 2167570
  },
  "Bobigny Pablo Picasso": {
    "entrants": 6561327,
    "rank": 15,
    "connections": 1,
    "score": 6561327
  },
  "Bobigny-Pantin - Raymond Queneau": {
    "entrants": 2335465,
    "rank": 144,
    "connections": 1,
    "score": 2335465
  },
  "Boissière": {
    "entrants": 1224181,
    "rank": 260,
    "connections": 1,
    "score": 1224181
  },
  "Bolivar": {
    "entrants": 367598,
    "rank": 301,
    "connections": 1,
    "score": 367598
  },
  "Bonne Nouvelle": {
    "entrants": 2806227,
    "rank": 120,
    "connections": 2,
    "score": 4306227
  },
  "Botzaris": {
    "entrants": 669323,
    "rank": 294,
    "connections": 1,
    "score": 669323
  },
  "Boucicaut": {
    "entrants": 2288055,
    "rank": 152,
    "connections": 1,
    "score": 2288055
  },
  "Boulogne Jean Jaurès": {
    "entrants": 2700354,
    "rank": 128,
    "connections": 1,
    "score": 2700354
  },
  "Boulogne Pont de Saint-Cloud": {
    "entrants": 2182738,
    "rank": 161,
    "connections": 1,
    "score": 2182738
  },
  "Bourse": {
    "entrants": 1725043,
    "rank": 205,
    "connections": 1,
    "score": 1725043
  },
  "Bréguet-Sabin": {
    "entrants": 1490160,
    "rank": 237,
    "connections": 1,
    "score": 1490160
  },
  "Brochant": {
    "entrants": 1543298,
    "rank": 229,
    "connections": 1,
    "score": 1543298
  },
  "Buttes Chaumont": {
    "entrants": 358301,
    "rank": 302,
    "connections": 1,
    "score": 358301
  },
  "Buzenval": {
    "entrants": 1448855,
    "rank": 240,
    "connections": 1,
    "score": 1448855
  },
  "Cadet": {
    "entrants": 1843984,
    "rank": 195,
    "connections": 1,
    "score": 1843984
  },
  "Cambronne": {
    "entrants": 1636566,
    "rank": 218,
    "connections": 1,
    "score": 1636566
  },
  "Campo-Formio": {
    "entrants": 1016150,
    "rank": 283,
    "connections": 1,
    "score": 1016150
  },
  "Cardinal Lemoine": {
    "entrants": 1121854,
    "rank": 273,
    "connections": 1,
    "score": 1121854
  },
  "Carrefour Pleyel": {
    "entrants": 1535528,
    "rank": 230,
    "connections": 1,
    "score": 1535528
  },
  "Censier - Daubenton": {
    "entrants": 2291843,
    "rank": 150,
    "connections": 1,
    "score": 2291843
  },
  "Champs-Élysées - Clemenceau": {
    "entrants": 1909005,
    "rank": 187,
    "connections": 2,
    "score": 3409005
  },
  "Chardon Lagache": {
    "entrants": 482053,
    "rank": 297,
    "connections": 1,
    "score": 482053
  },
  "Charenton - Écoles": {
    "entrants": 2164023,
    "rank": 164,
    "connections": 1,
    "score": 2164023
  },
  "Charles de Gaulle - Étoile": {
    "entrants": 4291663,
    "rank": 47,
    "connections": 3,
    "score": 7291663
  },
  "Charles Michels": {
    "entrants": 3079569,
    "rank": 102,
    "connections": 1,
    "score": 3079569
  },
  "Charonne": {
    "entrants": 2705320,
    "rank": 127,
    "connections": 1,
    "score": 2705320
  },
  "Château d’Eau": {
    "entrants": 2687103,
    "rank": 129,
    "connections": 1,
    "score": 2687103
  },
  "Château de Vincennes": {
    "entrants": 3617738,
    "rank": 71,
    "connections": 1,
    "score": 3617738
  },
  "Château Landon": {
    "entrants": 1140353,
    "rank": 270,
    "connections": 1,
    "score": 1140353
  },
  "Château Rouge": {
    "entrants": 5841122,
    "rank": 22,
    "connections": 1,
    "score": 5841122
  },
  "Châtelet": {
    "entrants": 8350794,
    "rank": 10,
    "connections": 5,
    "score": 14350794
  },
  "Châtillon-Montrouge": {
    "entrants": 5034012,
    "rank": 35,
    "connections": 1,
    "score": 5034012
  },
  "Chaussée d’Antin - La Fayette": {
    "entrants": 4251916,
    "rank": 48,
    "connections": 2,
    "score": 5751916
  },
  "Chemin Vert": {
    "entrants": 1018958,
    "rank": 282,
    "connections": 1,
    "score": 1018958
  },
  "Chevaleret": {
    "entrants": 2748696,
    "rank": 124,
    "connections": 1,
    "score": 2748696
  },
  "Cité": {
    "entrants": 1004657,
    "rank": 284,
    "connections": 1,
    "score": 1004657
  },
  "Cluny - La Sorbonne": {
    "entrants": 1261818,
    "rank": 257,
    "connections": 1,
    "score": 1261818
  },
  "Colonel Fabien": {
    "entrants": 3043606,
    "rank": 104,
    "connections": 1,
    "score": 3043606
  },
  "Commerce": {
    "entrants": 2212666,
    "rank": 157,
    "connections": 1,
    "score": 2212666
  },
  "Concorde": {
    "entrants": 3401219,
    "rank": 86,
    "connections": 3,
    "score": 6401219
  },
  "Convention": {
    "entrants": 3734750,
    "rank": 67,
    "connections": 1,
    "score": 3734750
  },
  "Corentin Cariou": {
    "entrants": 1697076,
    "rank": 209,
    "connections": 1,
    "score": 1697076
  },
  "Corentin Celton": {
    "entrants": 2504682,
    "rank": 134,
    "connections": 1,
    "score": 2504682
  },
  "Corvisart": {
    "entrants": 1570331,
    "rank": 226,
    "connections": 1,
    "score": 1570331
  },
  "Cour Saint-Émilion": {
    "entrants": 2985122,
    "rank": 110,
    "connections": 1,
    "score": 2985122
  },
  "Courcelles": {
    "entrants": 1583429,
    "rank": 224,
    "connections": 1,
    "score": 1583429
  },
  "Couronnes": {
    "entrants": 2151515,
    "rank": 166,
    "connections": 1,
    "score": 2151515
  },
  "Créteil - L’Échat": {
    "entrants": 1660120,
    "rank": 214,
    "connections": 1,
    "score": 1660120
  },
  "Créteil - Préfecture": {
    "entrants": 3330602,
    "rank": 92,
    "connections": 1,
    "score": 3330602
  },
  "Créteil - Université": {
    "entrants": 2496595,
    "rank": 135,
    "connections": 1,
    "score": 2496595
  },
  "Crimée": {
    "entrants": 3543952,
    "rank": 75,
    "connections": 1,
    "score": 3543952
  },
  "Croix de Chavaux": {
    "entrants": 3729545,
    "rank": 68,
    "connections": 1,
    "score": 3729545
  },
  "Danube": {
    "entrants": 400157,
    "rank": 299,
    "connections": 1,
    "score": 400157
  },
  "Daumesnil": {
    "entrants": 3634023,
    "rank": 70,
    "connections": 2,
    "score": 5134023
  },
  "Denfert-Rochereau": {
    "entrants": 2543959,
    "rank": 133,
    "connections": 2,
    "score": 4043959
  },
  "Dugommier": {
    "entrants": 1725412,
    "rank": 204,
    "connections": 1,
    "score": 1725412
  },
  "Dupleix": {
    "entrants": 2028963,
    "rank": 176,
    "connections": 1,
    "score": 2028963
  },
  "Duroc": {
    "entrants": 2645064,
    "rank": 130,
    "connections": 2,
    "score": 4145064
  },
  "École Militaire": {
    "entrants": 2805976,
    "rank": 121,
    "connections": 1,
    "score": 2805976
  },
  "École Vétérinaire de Maisons-Alfort": {
    "entrants": 2269487,
    "rank": 154,
    "connections": 1,
    "score": 2269487
  },
  "Edgar Quinet": {
    "entrants": 1349178,
    "rank": 248,
    "connections": 1,
    "score": 1349178
  },
  "Église d’Auteuil": {
    "entrants": 124941,
    "rank": 305,
    "connections": 1,
    "score": 124941
  },
  "Église de Pantin": {
    "entrants": 2832467,
    "rank": 119,
    "connections": 1,
    "score": 2832467
  },
  "Esplanade de la Défense": {
    "entrants": 4708183,
    "rank": 43,
    "connections": 1,
    "score": 4708183
  },
  "Étienne Marcel": {
    "entrants": 1705639,
    "rank": 206,
    "connections": 1,
    "score": 1705639
  },
  "Europe": {
    "entrants": 1106459,
    "rank": 275,
    "connections": 1,
    "score": 1106459
  },
  "Exelmans": {
    "entrants": 1607223,
    "rank": 219,
    "connections": 1,
    "score": 1607223
  },
  "Faidherbe - Chaligny": {
    "entrants": 2190416,
    "rank": 160,
    "connections": 1,
    "score": 2190416
  },
  "Falguière": {
    "entrants": 650291,
    "rank": 295,
    "connections": 1,
    "score": 650291
  },
  "Félix Faure": {
    "entrants": 1161978,
    "rank": 266,
    "connections": 1,
    "score": 1161978
  },
  "Filles du Calvaire": {
    "entrants": 1093673,
    "rank": 279,
    "connections": 1,
    "score": 1093673
  },
  "Fort d'Aubervilliers": {
    "entrants": 3103518,
    "rank": 99,
    "connections": 1,
    "score": 3103518
  },
  "Franklin D. Roosevelt": {
    "entrants": 6173830,
    "rank": 18,
    "connections": 2,
    "score": 7673830
  },
  "Front Populaire": {
    "entrants": 1948542,
    "rank": 183,
    "connections": 1,
    "score": 1948542
  },
  "Gabriel Péri": {
    "entrants": 3790573,
    "rank": 64,
    "connections": 1,
    "score": 3790573
  },
  "Gaîté": {
    "entrants": 1644148,
    "rank": 216,
    "connections": 1,
    "score": 1644148
  },
  "Gallieni": {
    "entrants": 3899195,
    "rank": 60,
    "connections": 1,
    "score": 3899195
  },
  "Gambetta": {
    "entrants": 4796724,
    "rank": 42,
    "connections": 2,
    "score": 6296724
  },
  "Gare d’Austerlitz": {
    "entrants": 6318543,
    "rank": 17,
    "connections": 2,
    "score": 7818543
  },
  "Gare de l’Est": {
    "entrants": 15538471,
    "rank": 5,
    "connections": 3,
    "score": 18538471
  },
  "Gare de Lyon": {
    "entrants": 28640475,
    "rank": 3,
    "connections": 3,
    "score": 31640475
  },
  "Gare du Nord": {
    "entrants": 34503097,
    "rank": 1,
    "connections": 2,
    "score": 36003097
  },
  "Garibaldi": {
    "entrants": 1965002,
    "rank": 181,
    "connections": 1,
    "score": 1965002
  },
  "George V": {
    "entrants": 3842260,
    "rank": 63,
    "connections": 1,
    "score": 3842260
  },
  "Glacière": {
    "entrants": 3005750,
    "rank": 107,
    "connections": 1,
    "score": 3005750
  },
  "Goncourt": {
    "entrants": 2199170,
    "rank": 159,
    "connections": 1,
    "score": 2199170
  },
  "Grands Boulevards": {
    "entrants": 3737316,
    "rank": 66,
    "connections": 2,
    "score": 5237316
  },
  "Guy Môquet": {
    "entrants": 2205313,
    "rank": 158,
    "connections": 1,
    "score": 2205313
  },
  "Havre-Caumartin": {
    "entrants": 5894982,
    "rank": 21,
    "connections": 2,
    "score": 7394982
  },
  "Hoche": {
    "entrants": 3928404,
    "rank": 59,
    "connections": 1,
    "score": 3928404
  },
  "Hôtel de Ville": {
    "entrants": 7251729,
    "rank": 13,
    "connections": 2,
    "score": 8751729
  },
  "Iéna": {
    "entrants": 1646925,
    "rank": 215,
    "connections": 1,
    "score": 1646925
  },
  "Invalides": {
    "entrants": 3482080,
    "rank": 79,
    "connections": 2,
    "score": 4982080
  },
  "Jacques Bonsergent": {
    "entrants": 1743989,
    "rank": 201,
    "connections": 1,
    "score": 1743989
  },
  "Jasmin": {
    "entrants": 1418238,
    "rank": 244,
    "connections": 1,
    "score": 1418238
  },
  "Jaurès": {
    "entrants": 4055461,
    "rank": 52,
    "connections": 3,
    "score": 7055461
  },
  "Javel - André Citroën": {
    "entrants": 1589561,
    "rank": 222,
    "connections": 1,
    "score": 1589561
  },
  "Jourdain": {
    "entrants": 1881321,
    "rank": 190,
    "connections": 1,
    "score": 1881321
  },
  "Jules Joffrin": {
    "entrants": 2854819,
    "rank": 117,
    "connections": 1,
    "score": 2854819
  },
  "Jussieu": {
    "entrants": 2889642,
    "rank": 114,
    "connections": 2,
    "score": 4389642
  },
  "Kléber": {
    "entrants": 724215,
    "rank": 293,
    "connections": 1,
    "score": 724215
  },
  "La Chapelle": {
    "entrants": 4855531,
    "rank": 38,
    "connections": 1,
    "score": 4855531
  },
  "La Courneuve - 8 Mai 1945": {
    "entrants": 4924444,
    "rank": 37,
    "connections": 1,
    "score": 4924444
  },
  "La Défense (Grande Arche)": {
    "entrants": 9256802,
    "rank": 9,
    "connections": 1,
    "score": 9256802
  },
  "La Fourche": {
    "entrants": 1829271,
    "rank": 198,
    "connections": 1,
    "score": 1829271
  },
  "La Motte-Picquet - Grenelle": {
    "entrants": 5117708,
    "rank": 34,
    "connections": 3,
    "score": 8117708
  },
  "La Muette": {
    "entrants": 3010370,
    "rank": 106,
    "connections": 1,
    "score": 3010370
  },
  "La Tour-Maubourg": {
    "entrants": 1361723,
    "rank": 247,
    "connections": 1,
    "score": 1361723
  },
  "Lamarck - Caulaincourt": {
    "entrants": 1875717,
    "rank": 191,
    "connections": 1,
    "score": 1875717
  },
  "Laumière": {
    "entrants": 3258568,
    "rank": 94,
    "connections": 1,
    "score": 3258568
  },
  "Le Kremlin-Bicêtre": {
    "entrants": 2925325,
    "rank": 112,
    "connections": 1,
    "score": 2925325
  },
  "Le Peletier": {
    "entrants": 1677832,
    "rank": 212,
    "connections": 1,
    "score": 1677832
  },
  "Ledru-Rollin": {
    "entrants": 2570283,
    "rank": 131,
    "connections": 1,
    "score": 2570283
  },
  "Les Agnettes": {
    "entrants": 1890356,
    "rank": 189,
    "connections": 1,
    "score": 1890356
  },
  "Les Gobelins": {
    "entrants": 2365942,
    "rank": 143,
    "connections": 1,
    "score": 2365942
  },
  "Les Halles": {
    "entrants": 10623876,
    "rank": 8,
    "connections": 1,
    "score": 10623876
  },
  "Les Sablons": {
    "entrants": 3954920,
    "rank": 57,
    "connections": 1,
    "score": 3954920
  },
  "Liberté": {
    "entrants": 1704609,
    "rank": 207,
    "connections": 1,
    "score": 1704609
  },
  "Liège": {
    "entrants": 1143956,
    "rank": 269,
    "connections": 1,
    "score": 1143956
  },
  "Louis Blanc": {
    "entrants": 1548029,
    "rank": 227,
    "connections": 2,
    "score": 3048029
  },
  "Louise Michel": {
    "entrants": 2319185,
    "rank": 145,
    "connections": 1,
    "score": 2319185
  },
  "Lourmel": {
    "entrants": 1696432,
    "rank": 210,
    "connections": 1,
    "score": 1696432
  },
  "Louvre - Rivoli": {
    "entrants": 1869612,
    "rank": 192,
    "connections": 1,
    "score": 1869612
  },
  "Mabillon": {
    "entrants": 1195051,
    "rank": 263,
    "connections": 1,
    "score": 1195051
  },
  "Madeleine": {
    "entrants": 5330928,
    "rank": 27,
    "connections": 3,
    "score": 8330928
  },
  "Mairie d’Issy": {
    "entrants": 2874138,
    "rank": 115,
    "connections": 1,
    "score": 2874138
  },
  "Mairie d’Ivry": {
    "entrants": 2042071,
    "rank": 174,
    "connections": 1,
    "score": 2042071
  },
  "Mairie de Clichy": {
    "entrants": 4043071,
    "rank": 53,
    "connections": 1,
    "score": 4043071
  },
  "Mairie de Montreuil": {
    "entrants": 6158487,
    "rank": 19,
    "connections": 1,
    "score": 6158487
  },
  "Mairie de Montrouge": {
    "entrants": 4316647,
    "rank": 45,
    "connections": 1,
    "score": 4316647
  },
  "Mairie de Saint-Ouen": {
    "entrants": 4830810,
    "rank": 39,
    "connections": 2,
    "score": 6330810
  },
  "Mairie des Lilas": {
    "entrants": 2894622,
    "rank": 113,
    "connections": 1,
    "score": 2894622
  },
  "Maison Blanche": {
    "entrants": 1203631,
    "rank": 262,
    "connections": 2,
    "score": 2703631
  },
  "Maisons-Alfort - Les Juilliottes": {
    "entrants": 1297495,
    "rank": 252,
    "connections": 1,
    "score": 1297495
  },
  "Maisons-Alfort - Stade": {
    "entrants": 1702479,
    "rank": 208,
    "connections": 1,
    "score": 1702479
  },
  "Malakoff - Plateau de Vanves": {
    "entrants": 2242320,
    "rank": 155,
    "connections": 1,
    "score": 2242320
  },
  "Malakoff - Rue Étienne Dolet": {
    "entrants": 1450451,
    "rank": 239,
    "connections": 1,
    "score": 1450451
  },
  "Malesherbes": {
    "entrants": 1427143,
    "rank": 241,
    "connections": 1,
    "score": 1427143
  },
  "Maraîchers": {
    "entrants": 1994064,
    "rank": 179,
    "connections": 1,
    "score": 1994064
  },
  "Marcadet - Poissonniers": {
    "entrants": 3982005,
    "rank": 55,
    "connections": 2,
    "score": 5482005
  },
  "Marcel Sembat": {
    "entrants": 3874792,
    "rank": 62,
    "connections": 1,
    "score": 3874792
  },
  "Marx Dormoy": {
    "entrants": 2425928,
    "rank": 139,
    "connections": 1,
    "score": 2425928
  },
  "Maubert - Mutualité": {
    "entrants": 1280387,
    "rank": 254,
    "connections": 1,
    "score": 1280387
  },
  "Ménilmontant": {
    "entrants": 2847264,
    "rank": 118,
    "connections": 1,
    "score": 2847264
  },
  "Michel Bizot": {
    "entrants": 1403416,
    "rank": 246,
    "connections": 1,
    "score": 1403416
  },
  "Michel-Ange - Auteuil": {
    "entrants": 1512050,
    "rank": 234,
    "connections": 2,
    "score": 3012050
  },
  "Michel-Ange - Molitor": {
    "entrants": 1420552,
    "rank": 243,
    "connections": 2,
    "score": 2920552
  },
  "Mirabeau": {
    "entrants": 1001302,
    "rank": 285,
    "connections": 1,
    "score": 1001302
  },
  "Miromesnil": {
    "entrants": 3647255,
    "rank": 69,
    "connections": 2,
    "score": 5147255
  },
  "Monceau": {
    "entrants": 1148677,
    "rank": 268,
    "connections": 1,
    "score": 1148677
  },
  "Montgallet": {
    "entrants": 1108395,
    "rank": 274,
    "connections": 1,
    "score": 1108395
  },
  "Montparnasse-Bienvenüe": {
    "entrants": 20407224,
    "rank": 4,
    "connections": 4,
    "score": 24907224
  },
  "Mouton-Duvernet": {
    "entrants": 1131403,
    "rank": 271,
    "connections": 1,
    "score": 1131403
  },
  "Nation": {
    "entrants": 6050797,
    "rank": 20,
    "connections": 4,
    "score": 10550797
  },
  "Nationale": {
    "entrants": 1320290,
    "rank": 251,
    "connections": 1,
    "score": 1320290
  },
  "Notre-Dame des Champs": {
    "entrants": 1487256,
    "rank": 238,
    "connections": 1,
    "score": 1487256
  },
  "Notre-Dame-de-Lorette": {
    "entrants": 1893828,
    "rank": 188,
    "connections": 1,
    "score": 1893828
  },
  "Oberkampf": {
    "entrants": 3205110,
    "rank": 96,
    "connections": 2,
    "score": 4705110
  },
  "Odéon": {
    "entrants": 3478491,
    "rank": 80,
    "connections": 2,
    "score": 4978491
  },
  "Olympiades": {
    "entrants": 5214595,
    "rank": 31,
    "connections": 1,
    "score": 5214595
  },
  "Opéra": {
    "entrants": 5193831,
    "rank": 32,
    "connections": 3,
    "score": 8193831
  },
  "Ourcq": {
    "entrants": 2862337,
    "rank": 116,
    "connections": 1,
    "score": 2862337
  },
  "Palais Royal - Musée du Louvre": {
    "entrants": 4822599,
    "rank": 40,
    "connections": 2,
    "score": 6322599
  },
  "Parmentier": {
    "entrants": 2037234,
    "rank": 175,
    "connections": 1,
    "score": 2037234
  },
  "Passy": {
    "entrants": 2080548,
    "rank": 171,
    "connections": 1,
    "score": 2080548
  },
  "Pasteur": {
    "entrants": 3026286,
    "rank": 105,
    "connections": 2,
    "score": 4526286
  },
  "Pelleport": {
    "entrants": 229524,
    "rank": 304,
    "connections": 1,
    "score": 229524
  },
  "Père Lachaise": {
    "entrants": 3465307,
    "rank": 81,
    "connections": 2,
    "score": 4965307
  },
  "Pereire": {
    "entrants": 3130190,
    "rank": 97,
    "connections": 1,
    "score": 3130190
  },
  "Pernety": {
    "entrants": 2173567,
    "rank": 162,
    "connections": 1,
    "score": 2173567
  },
  "Philippe Auguste": {
    "entrants": 1262653,
    "rank": 256,
    "connections": 1,
    "score": 1262653
  },
  "Picpus": {
    "entrants": 931602,
    "rank": 286,
    "connections": 1,
    "score": 931602
  },
  "Pierre et Marie Curie": {
    "entrants": 1100552,
    "rank": 277,
    "connections": 1,
    "score": 1100552
  },
  "Pigalle": {
    "entrants": 3501831,
    "rank": 77,
    "connections": 2,
    "score": 5001831
  },
  "Place d'Italie": {
    "entrants": 7119097,
    "rank": 14,
    "connections": 3,
    "score": 10119097
  },
  "Place de Clichy": {
    "entrants": 5161932,
    "rank": 33,
    "connections": 2,
    "score": 6661932
  },
  "Place des Fêtes": {
    "entrants": 2318764,
    "rank": 146,
    "connections": 2,
    "score": 3818764
  },
  "Place Monge": {
    "entrants": 1837996,
    "rank": 196,
    "connections": 1,
    "score": 1837996
  },
  "Plaisance": {
    "entrants": 3521753,
    "rank": 76,
    "connections": 1,
    "score": 3521753
  },
  "Pointe du Lac": {
    "entrants": 2114438,
    "rank": 168,
    "connections": 1,
    "score": 2114438
  },
  "Poissonnière": {
    "entrants": 2306725,
    "rank": 148,
    "connections": 1,
    "score": 2306725
  },
  "Pont Cardinet": {
    "entrants": 4168538,
    "rank": 50,
    "connections": 1,
    "score": 4168538
  },
  "Pont de Levallois - Bécon": {
    "entrants": 2984777,
    "rank": 111,
    "connections": 1,
    "score": 2984777
  },
  "Pont de Neuilly": {
    "entrants": 4809503,
    "rank": 41,
    "connections": 1,
    "score": 4809503
  },
  "Pont de Sèvres": {
    "entrants": 3430203,
    "rank": 83,
    "connections": 1,
    "score": 3430203
  },
  "Pont Marie (Cité des Arts)": {
    "entrants": 1101482,
    "rank": 276,
    "connections": 1,
    "score": 1101482
  },
  "Pont Neuf": {
    "entrants": 1188930,
    "rank": 264,
    "connections": 1,
    "score": 1188930
  },
  "Porte d’Auteuil": {
    "entrants": 375748,
    "rank": 300,
    "connections": 1,
    "score": 375748
  },
  "Porte d’Italie": {
    "entrants": 1507152,
    "rank": 236,
    "connections": 1,
    "score": 1507152
  },
  "Porte d’Ivry": {
    "entrants": 1282199,
    "rank": 253,
    "connections": 1,
    "score": 1282199
  },
  "Porte d’Orléans": {
    "entrants": 4175817,
    "rank": 49,
    "connections": 1,
    "score": 4175817
  },
  "Porte Dauphine": {
    "entrants": 2021656,
    "rank": 177,
    "connections": 1,
    "score": 2021656
  },
  "Porte de Bagnolet": {
    "entrants": 3085790,
    "rank": 101,
    "connections": 1,
    "score": 3085790
  },
  "Porte de Champerret": {
    "entrants": 2101673,
    "rank": 170,
    "connections": 1,
    "score": 2101673
  },
  "Porte de Charenton": {
    "entrants": 1529778,
    "rank": 231,
    "connections": 1,
    "score": 1529778
  },
  "Porte de Choisy": {
    "entrants": 1592144,
    "rank": 221,
    "connections": 1,
    "score": 1592144
  },
  "Porte de Clichy": {
    "entrants": 5278497,
    "rank": 29,
    "connections": 2,
    "score": 6778497
  },
  "Porte de Clignancourt": {
    "entrants": 5611814,
    "rank": 24,
    "connections": 1,
    "score": 5611814
  },
  "Porte de la Chapelle": {
    "entrants": 1866281,
    "rank": 193,
    "connections": 1,
    "score": 1866281
  },
  "Porte de la Villette": {
    "entrants": 2706288,
    "rank": 126,
    "connections": 1,
    "score": 2706288
  },
  "Porte de Montreuil": {
    "entrants": 3067413,
    "rank": 103,
    "connections": 1,
    "score": 3067413
  },
  "Porte de Pantin": {
    "entrants": 3374733,
    "rank": 89,
    "connections": 1,
    "score": 3374733
  },
  "Porte de Saint-Cloud": {
    "entrants": 3485946,
    "rank": 78,
    "connections": 1,
    "score": 3485946
  },
  "Porte de Saint-Ouen": {
    "entrants": 2710638,
    "rank": 125,
    "connections": 1,
    "score": 2710638
  },
  "Porte de Vanves": {
    "entrants": 3395358,
    "rank": 87,
    "connections": 1,
    "score": 3395358
  },
  "Porte de Versailles": {
    "entrants": 3268157,
    "rank": 93,
    "connections": 1,
    "score": 3268157
  },
  "Porte de Vincennes": {
    "entrants": 5446602,
    "rank": 25,
    "connections": 1,
    "score": 5446602
  },
  "Porte des Lilas": {
    "entrants": 3105016,
    "rank": 98,
    "connections": 2,
    "score": 4605016
  },
  "Porte Dorée": {
    "entrants": 1918182,
    "rank": 186,
    "connections": 1,
    "score": 1918182
  },
  "Porte Maillot": {
    "entrants": 4138301,
    "rank": 51,
    "connections": 1,
    "score": 4138301
  },
  "Pré-Saint-Gervais": {
    "entrants": 282626,
    "rank": 303,
    "connections": 1,
    "score": 282626
  },
  "Pyramides": {
    "entrants": 3962698,
    "rank": 56,
    "connections": 2,
    "score": 5462698
  },
  "Pyrénées": {
    "entrants": 2288587,
    "rank": 151,
    "connections": 1,
    "score": 2288587
  },
  "Quai de la Gare": {
    "entrants": 1735465,
    "rank": 202,
    "connections": 1,
    "score": 1735465
  },
  "Quai de la Rapée": {
    "entrants": 798728,
    "rank": 289,
    "connections": 1,
    "score": 798728
  },
  "Quatre Septembre": {
    "entrants": 1165004,
    "rank": 265,
    "connections": 1,
    "score": 1165004
  },
  "Rambuteau": {
    "entrants": 2127291,
    "rank": 167,
    "connections": 1,
    "score": 2127291
  },
  "Ranelagh": {
    "entrants": 1779206,
    "rank": 199,
    "connections": 1,
    "score": 1779206
  },
  "Raspail": {
    "entrants": 1238357,
    "rank": 259,
    "connections": 2,
    "score": 2738357
  },
  "Réaumur - Sébastopol": {
    "entrants": 3579544,
    "rank": 73,
    "connections": 2,
    "score": 5079544
  },
  "Rennes": {
    "entrants": 861334,
    "rank": 288,
    "connections": 1,
    "score": 861334
  },
  "République": {
    "entrants": 11079708,
    "rank": 7,
    "connections": 5,
    "score": 17079708
  },
  "Reuilly - Diderot": {
    "entrants": 4580091,
    "rank": 44,
    "connections": 2,
    "score": 6080091
  },
  "Richard-Lenoir": {
    "entrants": 1544636,
    "rank": 228,
    "connections": 1,
    "score": 1544636
  },
  "Richelieu - Drouot": {
    "entrants": 2994510,
    "rank": 108,
    "connections": 2,
    "score": 4494510
  },
  "Riquet": {
    "entrants": 1588438,
    "rank": 223,
    "connections": 1,
    "score": 1588438
  },
  "Robespierre": {
    "entrants": 2986308,
    "rank": 109,
    "connections": 1,
    "score": 2986308
  },
  "Rome": {
    "entrants": 1696331,
    "rank": 211,
    "connections": 1,
    "score": 1696331
  },
  "Rue de la Pompe": {
    "entrants": 2449458,
    "rank": 138,
    "connections": 1,
    "score": 2449458
  },
  "Rue des Boulets": {
    "entrants": 1832442,
    "rank": 197,
    "connections": 1,
    "score": 1832442
  },
  "Rue du Bac": {
    "entrants": 1423364,
    "rank": 242,
    "connections": 1,
    "score": 1423364
  },
  "Rue Saint-Maur": {
    "entrants": 2004445,
    "rank": 178,
    "connections": 1,
    "score": 2004445
  },
  "Saint-Ambroise": {
    "entrants": 2158466,
    "rank": 165,
    "connections": 1,
    "score": 2158466
  },
  "Saint-Augustin": {
    "entrants": 1934106,
    "rank": 185,
    "connections": 1,
    "score": 1934106
  },
  "Saint-Denis - Porte de Paris": {
    "entrants": 3355836,
    "rank": 91,
    "connections": 1,
    "score": 3355836
  },
  "Saint-Denis - Université": {
    "entrants": 3569990,
    "rank": 74,
    "connections": 1,
    "score": 3569990
  },
  "Saint-Fargeau": {
    "entrants": 472258,
    "rank": 298,
    "connections": 1,
    "score": 472258
  },
  "Saint-François-Xavier": {
    "entrants": 1213378,
    "rank": 261,
    "connections": 1,
    "score": 1213378
  },
  "Saint-Georges": {
    "entrants": 751555,
    "rank": 291,
    "connections": 1,
    "score": 751555
  },
  "Saint-Germain-des-Prés": {
    "entrants": 2378860,
    "rank": 142,
    "connections": 1,
    "score": 2378860
  },
  "Saint-Jacques": {
    "entrants": 1407837,
    "rank": 245,
    "connections": 1,
    "score": 1407837
  },
  "Saint-Lazare": {
    "entrants": 33128384,
    "rank": 2,
    "connections": 5,
    "score": 39128384
  },
  "Saint-Mandé": {
    "entrants": 3944640,
    "rank": 58,
    "connections": 1,
    "score": 3944640
  },
  "Saint-Marcel": {
    "entrants": 1666744,
    "rank": 213,
    "connections": 1,
    "score": 1666744
  },
  "Saint-Michel": {
    "entrants": 3747385,
    "rank": 65,
    "connections": 1,
    "score": 3747385
  },
  "Saint-Ouen": {
    "entrants": 3420852,
    "rank": 84,
    "connections": 1,
    "score": 3420852
  },
  "Saint-Paul (Le Marais)": {
    "entrants": 4295823,
    "rank": 46,
    "connections": 1,
    "score": 4295823
  },
  "Saint-Philippe du Roule": {
    "entrants": 1935004,
    "rank": 184,
    "connections": 1,
    "score": 1935004
  },
  "Saint-Placide": {
    "entrants": 2391205,
    "rank": 141,
    "connections": 1,
    "score": 2391205
  },
  "Saint-Sébastien - Froissart": {
    "entrants": 1151192,
    "rank": 267,
    "connections": 1,
    "score": 1151192
  },
  "Saint-Sulpice": {
    "entrants": 1571987,
    "rank": 225,
    "connections": 1,
    "score": 1571987
  },
  "Ségur": {
    "entrants": 1100151,
    "rank": 278,
    "connections": 1,
    "score": 1100151
  },
  "Sentier": {
    "entrants": 2222744,
    "rank": 156,
    "connections": 1,
    "score": 2222744
  },
  "Sèvres - Babylone": {
    "entrants": 3392504,
    "rank": 88,
    "connections": 2,
    "score": 4892504
  },
  "Sèvres-Lecourbe": {
    "entrants": 1257040,
    "rank": 258,
    "connections": 1,
    "score": 1257040
  },
  "Simplon": {
    "entrants": 2056501,
    "rank": 173,
    "connections": 1,
    "score": 2056501
  },
  "Solférino": {
    "entrants": 1269143,
    "rank": 255,
    "connections": 1,
    "score": 1269143
  },
  "Stalingrad": {
    "entrants": 4924583,
    "rank": 36,
    "connections": 3,
    "score": 7924583
  },
  "Strasbourg - Saint-Denis": {
    "entrants": 6345770,
    "rank": 16,
    "connections": 3,
    "score": 9345770
  },
  "Sully - Morland": {
    "entrants": 1124169,
    "rank": 272,
    "connections": 1,
    "score": 1124169
  },
  "Télégraphe": {
    "entrants": 1636898,
    "rank": 217,
    "connections": 1,
    "score": 1636898
  },
  "Temple": {
    "entrants": 891858,
    "rank": 287,
    "connections": 1,
    "score": 891858
  },
  "Ternes": {
    "entrants": 2292256,
    "rank": 149,
    "connections": 1,
    "score": 2292256
  },
  "Tolbiac": {
    "entrants": 2287918,
    "rank": 153,
    "connections": 1,
    "score": 2287918
  },
  "Trinité - d’Estienne d’Orves": {
    "entrants": 1051982,
    "rank": 280,
    "connections": 1,
    "score": 1051982
  },
  "Trocadéro": {
    "entrants": 5284134,
    "rank": 28,
    "connections": 2,
    "score": 6784134
  },
  "Tuileries": {
    "entrants": 1859552,
    "rank": 194,
    "connections": 1,
    "score": 1859552
  },
  "Vaneau": {
    "entrants": 725826,
    "rank": 292,
    "connections": 1,
    "score": 725826
  },
  "Varenne": {
    "entrants": 782697,
    "rank": 290,
    "connections": 1,
    "score": 782697
  },
  "Vaugirard": {
    "entrants": 2482886,
    "rank": 136,
    "connections": 1,
    "score": 2482886
  },
  "Vavin": {
    "entrants": 1322588,
    "rank": 250,
    "connections": 1,
    "score": 1322588
  },
  "Victor Hugo": {
    "entrants": 2801041,
    "rank": 123,
    "connections": 1,
    "score": 2801041
  },
  "Villejuif - Louis Aragon": {
    "entrants": 5218070,
    "rank": 30,
    "connections": 1,
    "score": 5218070
  },
  "Villejuif Léo Lagrange": {
    "entrants": 1952627,
    "rank": 182,
    "connections": 1,
    "score": 1952627
  },
  "Villejuif Paul Vaillant-Couturier": {
    "entrants": 1764879,
    "rank": 200,
    "connections": 1,
    "score": 1764879
  },
  "Villiers": {
    "entrants": 3586376,
    "rank": 72,
    "connections": 2,
    "score": 5086376
  },
  "Volontaires": {
    "entrants": 1734848,
    "rank": 203,
    "connections": 1,
    "score": 1734848
  },
  "Voltaire": {
    "entrants": 3454006,
    "rank": 82,
    "connections": 1,
    "score": 3454006
  },
  "Wagram": {
    "entrants": 1508617,
    "rank": 235,
    "connections": 1,
    "score": 1508617
  }
};
