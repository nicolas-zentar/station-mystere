# Station Mystère

Mini-jeu de devinette autour des stations du métro parisien.

## Lancer le jeu

Dans ce dossier, lance :

```bash
node server.js
```

Puis ouvre :

```text
http://127.0.0.1:3000
```

## Ce que fait le back-end

- Il crée une partie du jour ou une partie aléatoire.
- Il garde la station mystère côté serveur.
- Il vérifie chaque tentative.
- Il renvoie les indices au navigateur.
- Il ne révèle la station mystère qu'à la fin de la partie.

Le fichier `stations.js` contient les 321 stations utilisées par le jeu.

Le fichier `traffic.js` contient les chiffres de fréquentation Open Data RATP 2021 utilisés pour le mode aléatoire. Le jeu classe les stations par score :

```text
entrants directs officiels + 1 500 000 par correspondance supplémentaire
```

Ce bonus existe parce que le jeu de données RATP compte les entrants directs, mais pas les voyageurs en correspondance.

## Mettre le jeu en ligne

Le projet est prêt pour un hébergement Node.js classique.

Paramètres importants :

- commande de démarrage : `npm start`
- port : utiliser la variable `PORT` fournie par l'hébergeur
- fichier principal : `server.js`

Le serveur écoute `0.0.0.0` par défaut, ce qui permet aux plateformes d'hébergement de le rendre accessible sur Internet.

Un fichier `render.yaml` est inclus pour Render.

## Page admin privée

Une page privée existe à l'adresse :

```text
/admin?key=TON_MOT_DE_PASSE
```

Pour l'activer sur Render, ajoute une variable d'environnement :

```text
ADMIN_KEY=un-mot-de-passe-long
```

La page admin affiche les statistiques agrégées du serveur par mode : parties terminées, victoires, défaites, distribution des essais, réponse du jour et tentatives les plus fréquentes.

Les statistiques sont écrites dans `data/stats.json` par défaut. Sur un hébergeur avec disque éphémère, configure `STATS_FILE` vers un stockage persistant ou ajoute une vraie base de données.

Pour le mode aléatoire, l'admin affiche aussi les stations par difficulté avec le nombre de parties terminées où chaque station était la réponse.

Le jeu propose aussi un lien de défi en mode aléatoire : il crée une station commune à partager avec un autre joueur. Ce défi reste léger et en mémoire serveur.
