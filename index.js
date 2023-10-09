module.exports = (data) => {

  // Create a new array with an added 'id' property.
  const newData = data.map((obj,index) => {
    return {
      id:index+1,
      ...obj,
    };
  });

  // Get the keys of the first object to establish the structure.
  const keys = Object.keys(newData[0]);

  // Check if all objects have the same keys.
  newData.forEach((element) => {
    keys.forEach((key) => {
      if (!element.hasOwnProperty(key)) {
        throw new Error("Key " + key + " is unavailable");
      }
    });
  });

  // Create a table of unique values for each key.
  let table = {};
  keys.forEach((key) => {
    const values = data.map((e) => {
      return e[key];
    });

    const uniqueValues = values.reduce((acc, currentValue) => {
      if (!acc.includes(currentValue)) {
        acc.push(currentValue);
      }
      return acc;
    }, []);

    table[key] = uniqueValues;
  });

  // Create an array with the data types of each key.
  const types = keys.map((e) => {
    return {
      name: e,
      type: typeof newData[0][e],
    };
  });

  // Filter data based on a condition.
  const where = (payload) => {
    return app.temp.filter(payload);
  };

  // Check if a key exists in the data.
  const isKey = (key) => {
    return app.keys.includes(key);
  };

  // Calculate the sum of an array of numbers.
  const sum = (arr) => {
    // Check if the array is empty.
    if (arr.length === 0) {
      return 0;
    }

    // Use the reduce() method to add up all the values in the array.
    const total = arr.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });

    return total;
  };

  const app = {
    data: newData,
    temp: newData,
    reset: () => {
      app.temp = app.data;
    },
    count: () => {
      return app.temp.length;
    },
    keys,
    table,
    types,
    page:(NumeroOfPage, ElementForPage) => {
      return [NumeroOfPage * ElementForPage, ElementForPage];
    },
    sherch:(key,text) => {

      const  accents = (str) => {
        // Utilisez la méthode `normalize` pour décomposer les caractères accentués
        const normalizedStr = str.normalize("NFD");
        
        // Utilisez une expression régulière pour supprimer tous les caractères non alphabétiques
        return normalizedStr.replace(/[\u0300-\u036f]/g, "");
      }


      return (u) => {
        const a = accents(u[key].toLowerCase());
        const b = accents(text.toLowerCase());
    
        return a.includes(b);
      };
    },

    // Find an object by its 'id' property.
    findById: (id) => {
      return newData.find((obj) => {
        return obj.id === id;
      });
    },

    // Find objects based on filtering parameters.
    findAll: (params) => {
      if (typeof params === "object" && params !== null) {
        if (params.where) {
          app.temp = app.data;

          params.where.forEach((key) => {
            app.temp = where(key);
          });
        }

        if (params.order) {
          const asc = params.order[1];
          if (asc != "ASC" && asc != "DESC") {
            throw new Error("Sorting order must be 'ASC' or 'DESC'");
          }
          const name = params.order[0];

          const type = app.types.find((e) => {
            return e.name == name;
          }).type;

          if (type == "number") {
            app.temp = app.temp.sort((a, b) => {
              if (asc === "ASC") {
                return a[name] - b[name];
              }
              if (asc === "DESC") {
                return b[name] - a[name];
              }
            });
          }

          if (type == "string") {
            if (asc === "ASC") {
              app.temp = app.temp.sort(function (a, b) {
                return a[name].localeCompare(b[name]);
              });
            }
            if (asc === "DESC") {
              app.temp = app.temp.sort(function (a, b) {
                return b[name].localeCompare(a[name]);
              });
            }
          }

          if (type == "boolean") {
            app.temp = app.temp.sort((a, b) => {
              if (asc === "ASC") {
                return a[name] - b[name];
              }
              if (asc === "DESC") {
                return b[name] - a[name];
              }
            });
          }
        }

        if (params.limit) {
          [offset, limit] = params.limit;
          app.temp = app.temp.slice(offset, app.temp.length);
          app.temp = app.temp.slice(0, limit);
        }

        return app.temp;
      } else {
        return app.data;
      }
    },

    // Find the maximum value of a numeric key.
    max: (key) => {
      if (isKey(key)) {
        const type = app.types.find((e) => {
          return e.name == key;
        }).type;

        if (type == "number") {
          const values = app.temp.map((e) => {
            return e[key];
          });
          return Math.max(...values);
        } else {
          throw new Error("Key " + key + " is not of type 'number'");
        }
      } else {
        throw new Error("Key " + key + " does not exist");
      }
    },

    // Find the minimum value of a numeric key.
    min: (key) => {
      if (isKey(key)) {
        const type = app.types.find((e) => {
          return e.name == key;
        }).type;

        if (type == "number") {
          const values = app.temp.map((e) => {
            return e[key];
          });
          return Math.min(...values);
        } else {
          throw new Error("Key " + key + " is not of type 'number'");
        }
      } else {
        throw new Error("Key " + key + " does not exist");
      }
    },

    // Calculate the sum of values for a numeric key.
    sum: (key) => {
      if (isKey(key)) {
        const type = app.types.find((e) => {
          return e.name == key;
        }).type;

        if (type == "number") {
          const values = app.temp.map((e) => {
            return e[key];
          });
          return sum(values);
        } else {
          throw new Error("Key " + key + " is not of type 'number'");
        }
      } else {
        throw new Error("Key " + key + " does not exist");
      }
    },
  };

  return app;
};
