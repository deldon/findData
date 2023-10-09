# 📦 Data Manipulation Module

**[Documentation en francais](README_FR.md)**

The 📦 data manipulation module is a library that simplifies the manipulation and analysis of data arrays. Whether your data is raw or you need to perform complex operations like sorting, searching 🕵️‍♂️, or calculations 📊, this module can make your task easier.

## Why Use This Module? 🤷‍♂️

### Data Structuring 🏗️

One of the essential aspects of data manipulation is having well-structured data. This module allows you to take an existing data array and add a unique 'id' property to each object. It also ensures that all objects in the array have the same keys, ensuring a consistent structure.

### Data Exploration 🔍

You can easily explore your data by extracting essential information. The module provides methods for searching for specific objects by their 'id' or filtering data based on specific criteria. This allows you to quickly answer questions like "What items match a particular criterion?"

### Data Aggregation 📊

If you need to aggregate or summarize data, this module allows you to calculate statistics such as sum, maximum, and minimum values for any numeric key. This enables you to obtain valuable insights from your data quickly.

### Data Pagination 📄

To handle large amounts of data, the module offers a pagination function. You can specify the page number and the number of items per page, and the module will return the corresponding data range. This makes it easy to create paginated views in your application.

### Text Search 🔎

Another powerful feature of this module is text search. You can perform case-insensitive and accent-insensitive text searches on a specific key. For example, to search for objects containing the term "apple" in the 'description' key:

```javascript
const newData = user.findAll({
  where: [
    user.search('description', 'apple')
  ]
});
console.log(newData);
```

## How to Use This Module? 🛠️

### Table of Contents 📜

1. Installation
2. Creating the Module Instance
3. Data Structure
4. Data Exploration
5. Data Aggregation
6. Data Pagination
7. Text Search
8. Functions

## 1. Installation 🚀

To use the data manipulation module, you need to install it in your Node.js project using npm. Run the following command in your project directory:

```bash
npm i find_all_data
```

## 2. Creating the Module Instance 🏭

After installing the module, you can import it into your JavaScript code as follows:

```javascript
const findData = require("find_all_data");
```

Then, create an instance of the module by passing your data array (data) as an argument:

```javascript
const user = findData(data);
```

## 3. Data Structure 🧱

The module ensures a consistent data structure by adding a unique 'id' property to each object in the array. It also verifies that all objects have the same keys. Here's how it works:

```javascript
const data = require("./user.json");
const findData = require("findData");

const user = findData(data);

console.log(user.all());
```

In the above example, `user.all()` will return your data array with the 'id' added.

## 4. Data Exploration 🔍

### Searching by 'id' 🔎

You can search for an object by its 'id' using the `findById` method. For example:

```javascript
const myUser = user.findById(1);
console.log(myUser);
```

### Data Filtering 🧹

The `findAll` method allows you to search for objects in a data set using various filtering and sorting options. This method is particularly useful for extracting specific data from a collection.

### Signature 🖋️

```javascript
findAll(params);
```

### Parameters 🎛️

- `params` (object): An object containing search and filtering options.

### `params` Options 📦

- `params.where` (array of functions): An array of functions to filter objects based on return values.
- `params.order` (array of two strings): An array containing the name of the sorting key and the sorting order ("ASC" for ascending or "DESC" for descending).
- `params.limit` (array of two numbers): An array containing the limit of items to return, with an offset value first and a limit value second.

### Return 🚀

- An array of objects that match the specified search criteria.

### Usage Examples 🛠️

1. **Filtering by a Single Key** 🎯

```javascript
const newData = user.findAll({
  where: [
    user => user.age <= 10
  ]
});
console.log(newData);
```

2. **Sorting in Ascending Order** 🔄

```javascript
const newData = user.findAll({
  order: ['age', 'ASC']
});
console.log(newData);
```

3. **Sorting in Descending Order** 🔄

```javascript
const newData = user.findAll({
  order: ['age', 'DESC']
});
console.log(newData);
```

4. **Limiting Results with an Offset** 📃

```javascript
const newData = user.findAll({
  limit: [5, 10], // Return 10 results starting from the 6th result
});
console.log(newData);
```

5. **Combining Multiple Options** 🌟

```javascript
const newData = user.findAll({
  where: [
    user => user.age <= 10,
    user => user.isAdmin === true,
  ],
  order: ['age', 'DESC'],
  limit: [5, 10],
});
console.log(newData);
```

## 5. Data Aggregation 📊

You can perform several aggregation operations on your data, such as calculating the sum, finding the maximum and minimum values for a numeric key. Here are some examples:

#### Sum of Values 📈

```javascript
const sum = user.sum("age");
console.log(sum);
```

#### Maximum Value 🚀

```javascript
const maxValue = user.max("age");
console.log(maxValue);
```

#### Minimum Value 📉

```javascript
const minValue = user.min("age");
console.log(minValue);
```

## 6. Data Pagination 📄

Pagination allows you to manage large amounts of data by retrieving only a portion of the results at a time. Here's how to paginate your data:

```javascript
const [offset, limit] = user.page(2, 10); // Page 2, 10 items per page
```

```javascript
const newData = user.findAll(
  {
    limit: user.page(2, 10)
  });

console.log(newData);
```

## 7. Text Search 🔍

You can perform case-insensitive and accent-insensitive text searches on a specific key. For example, to search for objects containing the term "apple" in the 'description' key:

```javascript
const newData = user.findAll(
  {
    where: [
      user.search('description', 'apple')
    ]
  });

console.log(newData);
```

## 8. Functions 🛠️

It provides several useful functions for working with data sets. Here's a description of the key functions of the module.

## `keys` Function 🗝️



The `keys` function returns an array of keys (property names) of the objects in the data array. This allows you to understand the structure of objects and the properties you can access.

```javascript
const keys = user.keys();
console.log(keys); // Displays an array of keys
```

## `distinct` Function 🌟

The `distinct` function takes a key as input and returns an array of unique values for that key in the data array. It's useful for obtaining unique values from a specific column.

```javascript
const uniqueValues = user.distinct('age');
console.log(uniqueValues); // Displays an array of unique values
```

## `type` Function 📝

The `type` function takes a key as input and returns the data type (string, number, boolean, etc.) of the associated property in the objects of the data array.

```javascript
const propertyType = user.type('age');
console.log(propertyType); // Displays the data type
```

## `reset` Function 🔄

The `reset` function resets the temporary data array to the original data. This cancels all previous filtering, sorting, or pagination operations applied.

```javascript
user.reset(); // Resets the temporary data
```

These functions allow you to better understand the structure of your data, extract unique values, and determine the data types associated with your objects' properties. You can also reset temporarily modified data at any time using the `reset` function.

This documentation covers the main features of the data manipulation module. You can now use these tools to explore, filter, aggregate, and paginate your data with ease in your JavaScript projects. Feel free to experiment further with these functions to master them better. 🚀