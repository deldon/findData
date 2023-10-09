# Module de Manipulation de Données

Le module de manipulation de données est une bibliothèque pour Node.js qui facilite la manipulation et l'analyse de tableaux de données. Que vous travailliez avec des données brutes ou que vous souhaitiez effectuer des opérations complexes telles que le tri, la recherche ou le calcul de statistiques, ce module peut vous simplifier la tâche.

## Pourquoi Utiliser ce Module ?

### Structuration des Données

L'un des aspects clés de la manipulation de données est d'avoir des données bien structurées. Ce module vous permet de prendre un tableau de données existant et d'y ajouter une propriété 'id' unique à chaque objet. Il garantit également que tous les objets du tableau ont les mêmes clés, vous assurant ainsi une structure cohérente.

### Exploration des Données

Vous pouvez facilement explorer vos données en extrayant des informations essentielles. Le module fournit des méthodes pour rechercher des objets spécifiques par leur 'id' ou pour filtrer les données en fonction de critères spécifiques. Cela vous permet de répondre rapidement à des questions telles que "Quels sont les éléments correspondant à un critère particulier ?"

### Agrégation de Données

Si vous devez agréger ou résumer des données, ce module vous permet de calculer des statistiques telles que la somme, la valeur maximale et la valeur minimale pour n'importe quelle clé numérique. Vous pouvez ainsi obtenir rapidement des informations utiles à partir de vos données.

### Pagination des Données

Pour gérer de grandes quantités de données, le module offre une fonction de pagination. Vous pouvez spécifier le numéro de page et le nombre d'éléments par page, et le module renverra la plage de données correspondante. Cela facilite la création de vues paginées dans votre application.

### Recherche de Texte

Une autre fonctionnalité puissante de ce module est la recherche de texte. Vous pouvez effectuer des recherches insensibles à la casse et sans tenir compte des accents. Cela vous permet de rechercher des objets contenant des termes spécifiques dans une clé donnée, améliorant ainsi la convivialité de votre application.

## Comment Utiliser ce Module

### Table des matières

1. Installation
2. Création de l'Instance du Module
3. Structure des Données
4. Exploration des Données
5. Agrégation des Données
6. Pagination des Données
7. Recherche de Texte

## 1. Installation

Pour utiliser le module de manipulation de données, vous devez l'installer dans votre projet Node.js à l'aide de npm. Exécutez la commande suivante dans le répertoire de votre projet :


```bash
npm install findData
```

## 2. Création de l'Instance du Module

Après avoir installé le module, vous pouvez l'importer dans votre code JavaScript comme suit :

```javascript
const findData = require("findData");
```

Ensuite, créez une instance du module en passant votre tableau de données (data) en tant qu'argument :

```javascript
const user = findData(data);
```

## 3. Structure des Données

Le module garantit une structure cohérente des données en ajoutant une propriété 'id' unique à chaque objet du tableau. Il vérifie également que tous les objets ont les mêmes clés. Voici comment cela fonctionne :

```javascript
const data = require("./user.json");
const findData = require("findData");

const user = findData(data);

console.log(newData);
```

Dans l'exemple ci-dessus, `newData` contiendra votre tableau de données avec les 'id' ajoutés.

## 4. Exploration des Données

### Recherche par 'id'

Vous pouvez rechercher un objet par son 'id' à l'aide de la méthode `findById`. Par exemple :

```javascript
const objetTrouvé = user.findById(1);
console.log(objetTrouvé);
```

### Filtrage des Données

La méthode `findAll` permet de rechercher des objets dans un ensemble de données en utilisant diverses options de filtrage et de tri. Cette méthode est particulièrement utile pour extraire des données spécifiques à partir d'une collection.

### Signature

```javascript
findAll(params);
```

### Paramètres

- `params` (objet) : Un objet contenant les options de recherche et de filtrage.

### Options de `params`

- `params.where` (tableau de function) : Un tableau de function pour filtrer les objets en fonction des valeurs de retour.
- `params.order` (tableau de deux chaînes de caractères) : Un tableau contenant le nom de la clé de tri et l'ordre de tri ("ASC" pour ascendant ou "DESC" pour descendant).
- `params.limit` (tableau de deux nombres) : Un tableau contenant la limite d'éléments à retourner, avec une valeur d'offset en premier et une valeur de limite en second.

### Retour

- Un tableau d'objets correspondant aux critères de recherche spécifiés.


### Exemples d'utilisation

1. **Filtrer par une seule clé**

```javascript
const newData = user.findAll({
  where: [
    user => user.age <= 10
    ]
});
console.log(newData)
```

2. **Trier par ordre croissant**

```javascript
const newData = user.findAll({
  order:['age','ASC']
});
console.log(newData);
```

3. **Trier par ordre décroissant**

```javascript
const newData = user.findAll({
  order:['age','DESC']
});
console.log(newData);
```

4. **Limite de résultats avec un offset**

```javascript
const newData = user.findAll({
  limit: [5, 10], // Renvoyer 10 résultats à partir du 6ème résultat
});
console.log(newData);
```
5. **Combiner plusieurs options**

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

## 5. Agrégation des Données

Vous pouvez effectuer plusieurs opérations d'agrégation sur vos données, telles que le calcul de la somme, la recherche de la valeur maximale et minimale d'une clé numérique. Voici quelques exemples :

#### Somme des Valeurs

```javascript
const somme = user.sum("age");
console.log(somme);
```

#### Valeur Maximale

```javascript
const valeurMaximale = user.max("age");
console.log(valeurMaximale);
```

#### Valeur Minimale

```javascript
const valeurMinimale = user.min("age");
console.log(valeurMinimale);
```

## 6. Pagination des Données

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

## 7. Recherche de Texte

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

Cette documentation couvre les principales fonctionnalités du module de manipulation de données. Vous pouvez maintenant utiliser ces outils pour explorer, filtrer, agréger et paginer vos données avec facilité dans vos projets JavaScript. N'hésitez pas à expérimenter davantage avec ces fonctions pour mieux les maîtriser.

