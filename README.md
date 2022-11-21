# SGBD-Project

Pour installer le projet : 
<code>npm install</code>

Pour lancer le projet :
<code>npm run dev</code>

pour lancer le server : 
<code>npx nodemon server </code>


pour lancer le script : 
    $  mysql
mysql> CREATE DATABASE BOARDGAME;
mysql> USE BOARDGAME;
mysql> source database.sql;
mysql> source dataset.sql;


[todo] ne pas faire FOREIGN_KEY_CHECKS=0 pour les delete mais faire pointer les commentaires par exemple sur un player anonyme

[todo] on ne doit pas mettre au moins 1 index par table ?

[todo] adresse email a vérifier quand ?

[todo] player à des themes et des catégories à mettre en fav

[todo] connaitre les jeux auxquels un player a joué

[todo] jeux a des autheurs et des illustrateurs (ajout d'un table)

[todo] date doit etre formaté sur le front et pas dans la requete d'affichage


[todo?] ajouter une date à pertinent

[todo] Pas finit la dernier fonction de controllerConsultation (a besoin de la liste des catégpries aimées par player)

[todo] faire en sorte que les notes ne soient que sur 5 !

[todo] comment on fait pour les jeux en open world qui n'ont pas de duration ? 0?

[done] Ajouter la table auteurs&illustrateurs par jeux
[todo] liste des authors et illustrateurs dans l'affichage des jeux
[todo?] liste des jeux créés et jeux illustrés dans l'affichage des gens/joueurs
[todo] ajout lors de la création d'un jeux de tous les authors et illustrators

[done] Ajouter la table cat&theme preference par player
[todo] liste des cat&theme pref dans l'affichage des player
[todo] ajout lors de la création d'un player de tous leurs cat&theme pref

[done] Ajouter la table jeux joués par player
[todo] liste des jeux joués dans l'affichage des player
[todo] ajout lors de la création d'un player de tous leurs jeux joués
[todo] ajout de la possibilité d'ajout de jeux joués sur l'interface d'un player

[todo?] RANK INT not null for theme and category preference

[todo?] ajouter une recherche pas pseudo de player

[todo?] faire en sorte que la note soit aussi pondérée par le fait que le joueur est joué au jeu
[todo?] rajouter le nombre d'heure au jeu, et pondéré la note avec ce chiffre 

[todo] les ctrl+maj+f(todo)

[done] delete aussi les authors et illustrators quand leur jeux est supprimé de la base, mais pas les people associés
[done] delete aussi les cat&theme pref quand leur cat/theme est supprimé de la base, mais pas les player associé



