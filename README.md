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


todo : ne pas faire FOREIGN_KEY_CHECKS=0 pour les delete mais faire pointer les commentaires par exemple sur un player anonyme

on ne doit pas mettre au moins 1 index par table ?

adresse email a vérifier quand ?

player à des themes et des catégories à mettre en fav

connaitre les jeux auxquels un player a joué

jeux a des autheurs et des illustrateurs (ajout d'un table)

date doit etre formaté sur le front et pas dans la requete d'affichage

faut qu'on voit la liste des auteurs&illustrateurs par jeux (pas oublié les requetes de controller)

ajouter une date à pertinent ?
