# 📦 Module de Manipulation de Données

Le module 📦 de manipulation de données est une bibliothèque qui simplifie la manipulation et l'analyse de tableaux de données. Peu importe si vos données sont brutes ou si vous avez besoin de réaliser des opérations complexes comme le tri, la recherche 🕵️‍♂️, ou les calculs 📊, ce module peut vous faciliter la tâche.

## Pourquoi Utiliser Ce Module ? 🤷‍♂️

### Structuration des Données 🏗️

L'un des aspects essentiels de la manipulation de données, c'est d'avoir des données bien structurées. Ce module vous permet de prendre un tableau de données existant et d'y ajouter une propriété unique 'id' à chaque objet. Il s'assure également que tous les objets du tableau ont les mêmes clés, garantissant ainsi une structure cohérente.

### Exploration des Données 🔍

Vous pouvez facilement explorer vos données en extrayant des informations essentielles. Le module propose des méthodes pour rechercher des objets spécifiques par leur 'id' ou pour filtrer les données en fonction de critères spécifiques. Cela vous permet de répondre rapidement à des questions telles que "Quels sont les éléments correspondant à un critère particulier ?"

### Agrégation des Données 📊

Si vous avez besoin d'agréger ou de résumer des données, ce module vous permet de calculer des statistiques telles que la somme, la valeur maximale et minimale pour n'importe quelle clé numérique. Vous pouvez ainsi obtenir rapidement des informations utiles à partir de vos données.

### Pagination des Données 📄

Pour gérer de grandes quantités de données, le module offre une fonction de pagination. Vous pouvez spécifier le numéro de page et le nombre d'éléments par page, et le module renverra la plage de données correspondante. Cela facilite la création de vues paginées dans votre application.

### Recherche de Texte 🔎

Une autre fonctionnalité puissante de ce module est la recherche de texte. Vous pouvez effectuer des recherches insensibles à la casse et sans tenir compte des accents. Cela vous permet de rechercher des objets contenant des termes spécifiques dans une clé donnée, améliorant ainsi la convivialité de votre application.

## Comment Utiliser Ce Module ? 🛠️

### Table des Matières 📜

1. Installation
2. Création de l'Instance du Module
3. Structure des Données
4. Exploration des Données
5. Agrégation des Données
6. Pagination des Données
7. Recherche de Texte
8. Les Fonctions

## 1. Installation 🚀

Pour utiliser le module de manipulation de données, vous devez l'installer dans votre projet Node.js à l'aide de npm. Exécutez la commande suivante dans le répertoire de votre projet :

```bash
npm i find_all_data
```

## 2. Création de l'Instance du Module 🏭

Après avoir installé le module, vous pouvez l'importer dans votre code JavaScript comme suit :

```javascript
const findData = require("find_all_data");
```

Ensuite, créez une instance du module en passant votre tableau de données (data) en tant qu'argument :

```javascript
const user = findData(data);
```

## 3. Structure des Données 🧱

Le module garantit une structure cohérente des données en ajoutant une propriété 'id' unique à chaque objet du tableau. Il vérifie également que tous les objets ont les mêmes clés. Voici comment cela fonctionne :

```javascript
const data = require("./user.json");
const findData = require("findData");

const user = findData(data);

console.log(user.all());
```

Dans l'exemple ci-dessus, `user.all()` retournera votre tableau de données avec les 'id' ajoutés.

## 4. Exploration des Données 🔍

### Recherche par 'id' 🔎

Vous pouvez rechercher un objet par son 'id' à l'aide de la méthode `findById`. Par exemple :

```javascript
const myUser = user.findById(1);
console.log(myUser);
```

### Filtrage des Données 🧹

La méthode `findAll` permet de rechercher des objets dans un ensemble de données en utilisant diverses options de filtrage et de tri. Cette méthode est particulièrement utile pour extraire des données spécifiques à partir d'une collection.

### Signature 🖋️

```javascript
findAll(params);
```

### Paramètres 🎛️

- `params` (objet) : Un objet contenant les options de recherche et de filtrage.

### Options de `params` 📦

- `params.where` (tableau de fonctions) : Un tableau de fonctions pour filtrer les objets en fonction des valeurs de retour.
- `params.order` (tableau de deux chaînes de caractères) : Un tableau contenant le nom de la clé de tri et l'ordre de tri ("ASC" pour ascendant ou "DESC" pour descendant).
- `params.limit` (tableau de deux nombres) : Un tableau contenant la limite d'éléments à retourner, avec une valeur d'offset en premier et une valeur de limite en second.

### Retour 🚀

- Un tableau d'objets correspondant aux critères de recherche spécifiés.

### Exemples d'Utilisation 🛠️

1. **Filtrer par une seule clé** 🎯

```javascript
const newData = user.findAll({
  where: [
    user => user.age <= 10
  ]
});
console.log(newData);
```

2. **Trier par ordre croissant** 🔄

```javascript
const newData = user.findAll({
  order:['age','ASC']
});
console.log(newData);
```

3. **Trier par ordre décroissant** 🔄

```javascript
const newData = user.findAll({
  order:['age','DESC']
});
console.log(newData);
```

4. **Limite de résultats avec un offset** 📃

```javascript
const newData = user.findAll({
  limit: [5, 10], // Renvoyer 10 résultats à partir du 6ème résultat
});
console.log(newData);
```

5. **Combiner plusieurs options** 🌟

```javascript
const newData = user.findAll({
  where: [
    user => user.age <= 10,
    user => user.isAdmin === true,
  ],
  order:['age','DESC'],
  limit: [5, 10],
});
console.log(newData);
```

## 5. Agrégation des Données 📊

Vous pouvez effectuer plusieurs opérations d'

agrégation sur vos données, telles que le calcul de la somme, la recherche de la valeur maximale et minimale d'une clé numérique. Voici quelques exemples :

#### Somme des Valeurs 📈

```javascript
const somme = user.sum("age");
console.log(somme);
```

#### Valeur Maximale 🚀

```javascript
const valeurMaximale = user.max("age");
console.log(valeurMaximale);
```

#### Valeur Minimale 📉

```javascript
const valeurMinimale = user.min("age");
console.log(valeurMinimale);
```

## 6. Pagination des Données 📄

La pagination vous permet de gérer de grandes quantités de données en récupérant uniquement une partie des résultats à la fois. Voici comment paginer vos données :

```javascript
const [offset, limit] = user.page(2, 10); // Page 2, 10 éléments par page
```

```javascript
const newData = user.findAll(
  {
    limit:user.page(2, 10)
  });

console.log(newData);
```

## 7. Recherche de Texte 🔍

Vous pouvez effectuer des recherches de texte insensibles à la casse et sans tenir compte des accents sur une clé spécifique. Par exemple, pour rechercher des objets contenant le terme "pomme" dans la clé 'description' :

```javascript

const newData = user.findAll(
  {
    where: [
      user.sherch('description', 'pomme')
    ]
  });

console.log(newData);

```

## 8. Les Fonctions 🛠️

Il offre plusieurs fonctions utiles pour travailler avec des ensembles de données. Voici une description des fonctions clés du module. 

## Fonction `keys` 🗝️

La fonction `keys` retourne un tableau des clés (noms de propriétés) des objets dans le tableau de données. Cela permet de connaître la structure des objets et les propriétés auxquelles vous pouvez accéder. 

```javascript 
const keys = user.keys(); 
console.log(keys); // Affiche un tableau des clés
```

## Fonction `distinct` 🌟

La fonction `distinct` prend en entrée une clé et retourne un tableau des valeurs uniques de cette clé dans le tableau de données. Elle est utile pour obtenir des valeurs uniques d'une colonne particulière.

```javascript 
const uniqueValues = user.distinct('age'); 
console.log(uniqueValues); // Affiche un tableau de valeurs uniques
```

## Fonction `type` 📝

La fonction `type` prend en entrée une clé et retourne le type de données (string, number, boolean, etc.) de la propriété associée dans les objets du tableau de données.

```javascript 
const propertyType = user.type('age'); 
console.log(propertyType); // Affiche le type de données
```

## Fonction `reset` 🔄

La fonction `reset` réinitialise le tableau de données temporaire aux données d'origine. Cela annule toutes les opérations de filtrage, de tri ou de pagination appliquées précédemment.

```javascript 
user.reset(); // Réinitialise les données temporaires
```

Ces fonctions vous permettent de mieux comprendre la structure de vos données, d'extraire des valeurs uniques et de connaître les types de données associés aux propriétés de vos objets. Vous pouvez également réinitialiser les données temporairement modifiées à tout moment en utilisant la fonction `reset`.

Cette documentation couvre les principales fonctionnalités du module de manipulation de données. Vous pouvez maintenant utiliser ces outils pour explorer, filtrer, agréger et paginer vos données avec facilité dans vos projets JavaScript. N'hésitez pas à expérimenter davantage avec ces fonctions pour mieux les maîtriser. 🚀