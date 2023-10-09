module.exports = (data) => {
  // Create a new array with an added 'id' property.
  const newData = data.map((obj, index) => {
    return {
      id: index + 1,
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

  // Filter data based on a condition.
  const where = (payload) => {
    return app.temp.filter(payload);
  };

  // Check if a key exists in the data.
  const isNotKey = (key) => {
    if (!keys.includes(key)) {
      throw new Error("Key " + key + " does not exist");
    }
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
    all:() =>{
      return newData
    },
    reset: () => {
      app.temp = app.data;
    },
    count: () => {
      return app.temp.length;
    },
    keys: () => {
      return keys;
    },
    distinct: (key) => {
      isNotKey(key);
      const values = app.data.map((e) => {
        return e[key];
      });

      const uniqueValues = values.reduce((acc, currentValue) => {
        if (!acc.includes(currentValue)) {
          acc.push(currentValue);
        }
        return acc;
      }, []);

      return uniqueValues;
    },
    type: (key) => {
      isNotKey(key);
      return typeof newData[0][key];
    },
    page: (NumeroOfPage, ElementForPage) => {
      return [NumeroOfPage * ElementForPage, ElementForPage];
    },
    search: (key, text) => {
      isNotKey(key);
      const accents = (str) => {
        const normalizedStr = str.normalize("NFD");

        return normalizedStr.replace(/[\u0300-\u036f]/g, "");
      };

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
      app.temp = app.data;
      if (typeof params === "object" && params !== null) {
        if (params.where) {
          params.where.forEach((key) => {
            app.temp = where(key);
          });
        }

        if (params.order) {
          const asc = params.order[1];
          const key = params.order[0];

          isNotKey(key);

          if (asc != "ASC" && asc != "DESC") {
            throw new Error("Sorting order must be 'ASC' or 'DESC'");
          }

          const type = app.type(key);

          if (type == "number") {
            app.temp = app.temp.sort((a, b) => {
              if (asc === "ASC") {
                return a[key] - b[key];
              }
              if (asc === "DESC") {
                return b[key] - a[key];
              }
            });
          }

          if (type == "string") {
            if (asc === "ASC") {
              app.temp = app.temp.sort(function (a, b) {
                return a[key].localeCompare(b[key]);
              });
            }
            if (asc === "DESC") {
              app.temp = app.temp.sort(function (a, b) {
                return b[key].localeCompare(a[key]);
              });
            }
          }

          if (type == "boolean") {
            app.temp = app.temp.sort((a, b) => {
              if (asc === "ASC") {
                return a[key] - b[key];
              }
              if (asc === "DESC") {
                return b[key] - a[key];
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
      isNotKey(key);
      const type = app.type(key);

      if (type == "number") {
        const values = app.temp.map((e) => {
          return e[key];
        });
        return Math.max(...values);
      } else {
        throw new Error("Key " + key + " is not of type 'number'");
      }
    },

    // Find the minimum value of a numeric key.
    min: (key) => {
      isNotKey(key);
      const type = app.type(key);

      if (type == "number") {
        const values = app.temp.map((e) => {
          return e[key];
        });
        return Math.min(...values);
      } else {
        throw new Error("Key " + key + " is not of type 'number'");
      }
    },

    // Calculate the sum of values for a numeric key.
    sum: (key) => {
      isNotKey(key);
      const type = app.type(key);

      if (type == "number") {
        const values = app.temp.map((e) => {
          return e[key];
        });
        return sum(values);
      } else {
        throw new Error("Key " + key + " is not of type 'number'");
      }
    },
  };

  return app;
};
