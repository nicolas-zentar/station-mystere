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
