# 📦 FindAllData

**FindAllData** est une bibliothèque JavaScript géniale pour gérer, rechercher et manipuler facilement des ensembles de données. Vous travaillez souvent avec des tableaux d'objets ? Alors cette bibliothèque est faite pour vous ! Elle vous offre des méthodes pratiques pour filtrer, trier, paginer et bien plus encore.

![npm version](https://img.shields.io/npm/v/find_all_data) ![npm downloads](https://img.shields.io/npm/dm/find_all_data) ![license](https://img.shields.io/npm/l/find_all_data)

## 🎉 Installation

Installez le module via npm :

```bash
npm install findalldata
```

## 🚀 Usage de Base

Lors de la création d'une nouvelle instance de `FindAllData`, chaque objet dans le tableau se voit automatiquement attribuer un ID unique **si** l'objet n'a pas déjà un ID. Cela permet d'identifier facilement chaque élément et d'effectuer des opérations spécifiques comme la recherche par ID. Si les objets ont déjà des IDs, ceux-ci seront conservés.

```javascript
import FindAllData from "findalldata";

const data = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
];

// Création d'une nouvelle instance de FindAllData
const dataQuery = new FindAllData(data);

// Affiche tous les éléments avec des IDs ajoutés automatiquement
console.log(dataQuery.findAll());
// Output: [
//   { id: 1, name: "John", age: 30 },
//   { id: 2, name: "Jane", age: 25 }
// ]
```

### TypeScript pour plus de Plaisir 🎨

Lors de la création d'une nouvelle instance de `FindAllData`, vous pouvez spécifier le type d'objets contenus dans votre tableau en utilisant la syntaxe de généricité TypeScript. Cela permet une meilleure intégration avec votre éditeur de code et des vérifications de type statiques.

```typescript
import FindAllData from "findalldata";

interface MenuData {
  name: string;
  price: number;
  vegetarian: boolean;
  countryOfOrigin: string;
}

const menuData = [
  { name: "Curry", price: 12.99, vegetarian: true, countryOfOrigin: "India" },
  { name: "Sushi", price: 15.5, vegetarian: false, countryOfOrigin: "Japan" },
  // Autres données...
];

// Création d'une nouvelle instance de FindAllData typée
const instance = new FindAllData<MenuData>(menuData);
```

Dans cet exemple, `MenuData` est une interface TypeScript définissant la structure attendue des objets dans `menuData`. Cela permet à l'instance de `FindAllData` de fournir des méthodes fortement typées et d'effectuer des vérifications de type au moment de la compilation.

## 📖 API

### `new FindAllData(data)`

Crée une nouvelle instance de FindAllData.

- **data** : Un tableau d'objets à manipuler.

#### Exemple

```javascript
const instance = new FindAllData(data);
```

### `findAll(options)`

La méthode `findAll` retourne tous les éléments du tableau, avec des options facultatives de filtrage, tri et pagination. Cette méthode est super puissante et vous permet de manipuler vos données comme un pro ! 🎩

- **options** (facultatif) :
  - `where` : Une liste de fonctions de filtre. Vous pouvez en mettre autant que vous le souhaitez ! Chaque fonction doit retourner `true` pour les éléments à inclure et `false` pour ceux à exclure.
  - `order` : Un tableau avec le nom de la clé et l'ordre (`ASC` pour ascendant ou `DESC` pour descendant).
  - `limit` : Un tableau avec le nombre de résultats à limiter et le décalage (offset).

#### Exemple

Imaginons que nous ayons un tableau d'objets représentant des utilisateurs, et que nous souhaitons trouver tous les utilisateurs de plus de 20 ans, qui s'appellent "John", et trier les résultats par nom de manière ascendante, mais en limitant le résultat aux 5 premiers utilisateurs.

```javascript
const data = [
  { id: 1, name: "John", age: 30 },
  { id: 2, name: "Jane", age: 25 },
  { id: 3, name: "John", age: 22 },
  { id: 4, name: "Doe", age: 18 },
  { id: 5, name: "John", age: 28 },
];

const dataQuery = new FindAllData(data);

const results = dataQuery.findAll({
  where: [(item) => item.age > 20, (item) => item.name === "John"],
  order: ["name", "ASC"],
  limit: [5, 0],
});

console.log(results);
// Output: [
//   { id: 1, name: "John", age: 30 },
//   { id: 3, name: "John", age: 22 },
//   { id: 5, name: "John", age: 28 }
// ]
```

Dans cet exemple, nous utilisons deux fonctions dans l'option `where` :

1. `(item) => item.age > 20` : Cette fonction vérifie que l'âge de l'utilisateur est supérieur à 20.
2. `(item) => item.name === 'John'` : Cette fonction vérifie que le nom de l'utilisateur est "John".

### `findById(id)`

Retourne l'élément avec l'identifiant spécifié.

- **id** : L'identifiant de l'élément à retourner.

#### Exemple

```javascript
const item = dataQuery.findById(2);
console.log(item); // { id: 2, name: "Jane", age: 25 }
```

### `count`

Retourne le nombre total d'éléments.

#### Exemple

```javascript
const totalItems = dataQuery.count;
console.log(totalItems); // 2
```

### `keys`

Retourne un tableau des clés des objets dans le tableau.

#### Exemple

```javascript
const keys = dataQuery.keys;
console.log(keys); // ["id", "name", "age"]
```

### `type(key)`

Retourne le type des valeurs pour la clé spécifiée.

- **key** : La clé pour laquelle obtenir le type.

#### Exemple

```javascript
const typeAge = dataQuery.type("age"); // "number"
const typeName = dataQuery.type("name"); // "string"
console.log(typeAge, typeName);
```

### `distinct(key)`

Retourne un tableau des valeurs distinctes pour la clé spécifiée.

- **key** : La clé pour laquelle obtenir les valeurs distinctes.

#### Exemple

```javascript
const distinctNames = dataQuery.distinct("name");
console.log(distinctNames); // ["John", "Jane"]
```

### `search(key, value)`

Retourne un tableau des éléments dont la valeur de la clé spécifiée contient la valeur recherchée, en ignorant la casse et les accents.

- **key** : La clé à rechercher.
- **value** : La valeur à rechercher.

#### Exemple

```javascript
const results = instance.search("name", "sushi");
console.log(results); // [{ name: "Sushi", price: 15.5, vegetarian: false, countryOfOrigin: "Japan" }]
```

### `page(pageNumber, pageSize)`

Retourne les éléments pour la page et la taille spécifiées.

- **pageNumber** : Le numéro de la page (doit être supérieur à 0).
- **pageSize** : Le nombre d'éléments par page.

#### Exemple

```javascript
const instance = new FindAllData() < MenuData > menuData;

// Utiliser les indices pour paginer les résultats dans findAll
const result = instance.findAll({ limit: instance.page(2, 2) });
console.log(result);
// Output: [{ id: 3, name: "Dish 3", price: 12.99, vegetarian: true, countryOfOrigin: "Italy" }, ...]
```

### `min(key)`

Retourne la valeur minimale pour la clé spécifiée (doit être numérique).

- **key** : La clé pour laquelle obtenir la valeur minimale.

#### Exemple

```javascript
const minAge = dataQuery.min("age");
console.log(minAge); // 25
```

### `max(key)`

Retourne la valeur maximale pour la clé spécifiée (doit être numérique).

- **key** : La clé pour laquelle obtenir la valeur maximale.

#### Exemple

```javascript
const maxAge = dataQuery.max("age");
console.log(maxAge); // 30
```

### `sum(key)`

Retourne la somme des valeurs pour la clé spécifiée (doit être numérique).

- **key** : La clé pour laquelle obtenir la somme des valeurs.

#### Exemple

```javascript
const totalAge = dataQuery.sum("age");
console.log(totalAge); // 55 (30 + 25)
```

### `reset()`

Réinitialise les données à leur état d'origine.

#### Exemple

```javascript
dataQuery.findAll({
  where: [(item) => item.age > 20],
});

console.log(dataQuery.findAll()); // Données filtrées

dataQuery.reset();
console.log(dataQuery.findAll()); // Données originales
```

## 🎉 Fonctionnalités Clés

- **Filtrage Facile** : Filtrez vos données avec des fonctions personnalisées.
- **Tri Puissant** : Triez vos données par n'importe quelle clé en ordre ascendant ou descendant.
- **Pagination** : Gérez facilement la pagination de vos données.
- **Agrégation** : Calculez les valeurs minimales, maximales et les sommes pour les clés numériques.
- **Recherche** : Recherchez dans vos données en toute simplicité.

## 🤝 Contribuer

Les contributions sont les bienvenues ! Si vous avez des idées ou des améliorations, n'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## 📄 Licence

Ce projet est sous licence MIT.

