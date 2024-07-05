# 📦 FindAllData

**FindAllData** is an awesome JavaScript library for easily managing, searching, and manipulating datasets. Do you often work with arrays of objects? Then this library is for you! It offers handy methods for filtering, sorting, paginating, and much more.

![npm version](https://img.shields.io/npm/v/find_all_data) ![npm downloads](https://img.shields.io/npm/dm/find_all_data) ![license](https://img.shields.io/npm/l/find_all_data)

## 🎉 Installation

Install the module via npm:

```bash
npm install findalldata
```

## 🚀 Basic Usage

When creating a new instance of `FindAllData`, each object in the array is automatically assigned a unique ID **if** the object does not already have an ID. This makes it easy to identify each item and perform specific operations like searching by ID. If the objects already have IDs, they will be preserved.

```javascript
import FindAllData from "findalldata";

const data = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
];

// Creating a new instance of FindAllData
const dataQuery = new FindAllData(data);

// Display all items with automatically added IDs
console.log(dataQuery.findAll());
// Output: [
//   { id: 1, name: "John", age: 30 },
//   { id: 2, name: "Jane", age: 25 }
// ]
```

### TypeScript for More Fun 🎨

When creating a new instance of `FindAllData`, you can specify the type of objects contained in your array using TypeScript generics. This allows for better integration with your code editor and static type checking.

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
  // Other data...
];

// Creating a new typed instance of FindAllData
const instance = new FindAllData<MenuData>(menuData);
```

In this example, `MenuData` is a TypeScript interface defining the expected structure of the objects in `menuData`. This allows the `FindAllData` instance to provide strongly typed methods and perform type checks at compile time.

## 📖 API

### `new FindAllData(data)`

Creates a new instance of FindAllData.

- **data**: An array of objects to manipulate.

#### Example

```javascript
const instance = new FindAllData(data);
```

### `findAll(options)`

The `findAll` method returns all items in the array, with optional filtering, sorting, and pagination options. This method is super powerful and allows you to manipulate your data like a pro! 🎩

- **options** (optional):
  - `where`: A list of filter functions. You can add as many as you want! Each function should return `true` for items to include and `false` for those to exclude.
  - `order`: An array with the key name and order (`ASC` for ascending or `DESC` for descending).
  - `limit`: An array with the number of results to limit and the offset.

#### Example

Imagine we have an array of objects representing users, and we want to find all users over 20 years old, named "John", and sort the results by name in ascending order, but limit the result to the first 5 users.

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

In this example, we use two functions in the `where` option:

1. `(item) => item.age > 20`: This function checks that the user's age is over 20.
2. `(item) => item.name === 'John'`: This function checks that the user's name is "John".

### `findById(id)`

Returns the item with the specified ID.

- **id**: The ID of the item to return.

#### Example

```javascript
const item = dataQuery.findById(2);
console.log(item); // { id: 2, name: "Jane", age: 25 }
```

### `count`

Returns the total number of items.

#### Example

```javascript
const totalItems = dataQuery.count;
console.log(totalItems); // 2
```

### `keys`

Returns an array of the keys of the objects in the array.

#### Example

```javascript
const keys = dataQuery.keys;
console.log(keys); // ["id", "name", "age"]
```

### `type(key)`

Returns the type of values for the specified key.

- **key**: The key for which to get the type.

#### Example

```javascript
const typeAge = dataQuery.type("age"); // "number"
const typeName = dataQuery.type("name"); // "string"
console.log(typeAge, typeName);
```

### `distinct(key)`

Returns an array of distinct values for the specified key.

- **key**: The key for which to get distinct values.

#### Example

```javascript
const distinctNames = dataQuery.distinct("name");
console.log(distinctNames); // ["John", "Jane"]
```

### `search(key, value)`

Returns an array of items where the value of the specified key contains the searched value, ignoring case and accents.

- **key**: The key to search.
- **value**: The value to search for.

#### Example

```javascript
const results = instance.search("name", "sushi");
console.log(results); // [{ name: "Sushi", price: 15.5, vegetarian: false, countryOfOrigin: "Japan" }]
```

### `page(pageNumber, pageSize)`

Returns the items for the specified page and size.

- **pageNumber**: The page number (must be greater than 0).
- **pageSize**: The number of items per page.

#### Example

```javascript
const instance = new FindAllData() < MenuData > menuData;

// Using the indices to paginate results in findAll
const result = instance.findAll({ limit: instance.page(2, 2) });
console.log(result);
// Output: [{ id: 3, name: "Dish 3", price: 12.99, vegetarian: true, countryOfOrigin: "Italy" }, ...]
```

### `min(key)`

Returns the minimum value for the specified key (must be numeric).

- **key**: The key for which to get the minimum value.

#### Example

```javascript
const minAge = dataQuery.min("age");
console.log(minAge); // 25
```

### `max(key)`

Returns the maximum value for the specified key (must be numeric).

- **key**: The key for which to get the maximum value.

#### Example

```javascript
const maxAge = dataQuery.max("age");
console.log(maxAge); // 30
```

### `sum(key)`

Returns the sum of values for the specified key (must be numeric).

- **key**: The key for which to get the sum of values.

#### Example

```javascript
const totalAge = dataQuery.sum("age");
console.log(totalAge); // 55 (30 + 25)
```

### `reset()`

Resets the data to its original state.

#### Example

```javascript
dataQuery.findAll({
  where: [(item) => item.age > 20],
});

console.log(dataQuery.findAll()); // Filtered data

dataQuery.reset();
console.log(dataQuery.findAll()); // Original data
```

## 🎉 Key Features

- **Easy Filtering**: Filter your data with custom functions.
- **Powerful Sorting**: Sort your data by any key in ascending or descending order.
- **Pagination**: Easily manage data pagination.
- **Aggregation**: Calculate minimum, maximum values, and sums for numeric keys.
- **Search**: Search through your data with ease.

## 🤝 Contribute

Contributions are welcome! If you have ideas or improvements, feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License.