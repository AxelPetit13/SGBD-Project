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

[todo] date doit etre formaté sur le front et pas dans la requete d'affichage

[?todo?] ajouter une date à pertinent

[TODO] Pas finit la dernier fonction de controllerConsultation (a besoin de la liste des catégories aimées par player)

[TODO] faire en sorte que les notes ne soient que sur 5 !

[todo] comment on fait pour les jeux en open world qui n'ont pas de duration ? 0?

[done] Ajouter la table auteurs&illustrateurs par jeux
[TODO] liste des authors et illustrateurs dans l'affichage des jeux
[?todo?] liste des jeux créés et jeux illustrés dans l'affichage des gens/joueurs
[TODO] ajout lors de la création d'un jeux de tous les authors et illustrators

[done] Ajouter la table cat&theme preference par player
[TODO] liste des cat&theme pref dans l'affichage des player
[TODO] ajout lors de la création d'un player de tous leurs cat&theme pref

[done] Ajouter la table jeux joués par player
[TODO] liste des jeux joués dans l'affichage des player
[TODO] ajout lors de la création d'un player de tous leurs jeux joués
[TODO] ajout de la possibilité d'ajout de jeux joués sur l'interface d'un player

[?todo?] RANK INT not null for theme and category preference

[?todo?] ajouter une recherche pas pseudo de player

[?todo?] faire en sorte que la note soit aussi pondérée par le fait que le joueur est joué au jeu
[?todo?] rajouter le nombre d'heure au jeu, et pondéré la note avec ce chiffre 

[TODO] regarder les fonctions qu'on aurait fait en double avec Facen

[TODO] les ctrl+maj+f(todo)

[done] delete aussi les authors et illustrators quand leur jeux est supprimé de la base, mais pas les people associés
[done] delete aussi les cat&theme pref quand leur cat/theme est supprimé de la base, mais pas les player associé



[Todo][Vincent]
- faire en sorte que tous les attributs respectent le meme pattern
(aka MAIL -> PEOPLE_MAIL)

- pas de clefs primaires sur des varchar -> que des int 
(donc rejoutez des id aux tables qui n'en ont pas)
(unique pour les attributs concernés)

- index ?

- modifier les contraintes en conséquence obviously

<<<<<<< HEAD
- adapter le dataset

- modifier les controller pour que ça marche toujours obviously
    -> pour l'instant tout marche
=======
- modifier les controller pour que ça marche toujours

>>>>>>> refs/remotes/origin/old-state
