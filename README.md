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

La page admin affiche les statistiques agrégées du serveur : parties lancées, victoires, défaites, distribution des essais, réponse du jour et tentatives les plus fréquentes.

Note : ces statistiques sont gardées en mémoire par le serveur. Elles peuvent être remises à zéro si l'hébergeur redémarre l'application. Pour des statistiques permanentes, il faudra ajouter une base de données.
