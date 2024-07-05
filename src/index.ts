interface DataWithId {
    id: number;
  }
  
  interface FindAllParams<T> {
    where?: ((item: T & DataWithId) => boolean)[];
    order?: [keyof T & string, "ASC" | "DESC"];
    limit?: [number, number];
  }
  
  /**
   * Class to manage and query a dataset
   */
  export default class DataQuery<T extends object> {
    private data: (T & DataWithId)[];
    private dataCache: (T & DataWithId)[];
    private allKeys: string[];
  
    constructor(newData: T[]) {
      if (!Array.isArray(newData)) {
        throw new Error("Input data must be an array.");
      }
  
      if (newData.length === 0) {
        throw new Error("Input data must be a non-empty array.");
      }
  
      if (!newData.every(item => typeof item === "object" && item !== null)) {
        throw new Error("Input data must be a non-empty array of objects.");
      }
  
      if (!this.hasIdField(newData[0])) {
        this.dataCache = this.initializeDataWithIds(newData);
        this.data = this.initializeDataWithIds(newData);
      } else {
        this.dataCache = newData as (T & DataWithId)[];
        this.data = this.initializeDataWithIds(newData);
      }
  
      this.checkObjectKeys(newData);
  
      const firstObject = this.dataCache[0];
      this.allKeys = firstObject ? Object.keys(firstObject) : [];
    }
  
    /**
     * Find all data matching the specified parameters
     */
    findAll(params?: FindAllParams<T>): (T & DataWithId)[] {
      let temp = [...this.dataCache];
  
      if (params) {
        if (params.where) {
          params.where.forEach(condition => {
            temp = temp.filter(condition);
          });
        }
  
        if (params.order) {
          const [key, order] = params.order;
          this.checkIfKeyExists(key);
  
          temp.sort((a, b) => {
            const aValue = a[key];
            const bValue = b[key];
  
            if (order === "ASC") {
              return this.compareValues(aValue, bValue);
            } else {
              return this.compareValues(bValue, aValue);
            }
          });
        }
  
        if (params.limit) {
          const [offset, limit] = params.limit;
          temp = temp.slice(offset, offset + limit);
        }
      }
      this.dataCache = temp;
      return temp;
    }
  
    /**
     * Find data by ID
     */
    findById(id: number): (T & DataWithId) | undefined {
      return this.dataCache.find(obj => obj.id === id);
    }
  
    /**
     * Get the type of a specific key
     */
    type<K extends keyof (T & DataWithId)>(key: K): string {
      this.checkIfKeyExists(key as string);
      return typeof this.dataCache[0][key];
    }
  
    /**
     * Get the pagination details for the specified page number and items per page
     */
    page(pageNumber: number, itemsPerPage: number): [number, number] {
      if (pageNumber < 1) {
        throw new Error("Page number must be greater than 0");
      }
      const offset = (pageNumber - 1) * itemsPerPage;
      return [offset, itemsPerPage];
    }
  
    /**
     * Get distinct values of a specific key
     */
    distinct(key: keyof T): any[] {
      this.checkIfKeyExists(key as string);
  
      const values = this.dataCache.map(e => e[key]);
      return [...new Set(values)];
    }
  
    /**
     * Search for data containing the specified searchText in a specific key
     */
    search(key: keyof T & string, searchText: string): (T & DataWithId)[] {
      this.checkIfKeyExists(key);
  
      const removeAccents = (str: string): string => {
        const normalizedStr = str.normalize("NFD");
        return normalizedStr.replace(/[\u0300-\u036f]/g, "");
      };
  
      const normalizedSearchText = removeAccents(searchText.toLowerCase());
  
      return this.dataCache.filter(item => {
        const value = item[key];
        if (typeof value === "string") {
          const normalizedValue = removeAccents(value.toLowerCase());
          return normalizedValue.includes(normalizedSearchText);
        }
        return false;
      });
    }
  
    /**
     * Get the count of items in the dataset
     */
    get count(): number {
      return this.dataCache.length;
    }
  
    /**
     * Get all keys of the dataset
     */
    get keys(): string[] {
      return this.allKeys;
    }
  
    /**
     * Reset the dataset to its original state
     */
    reset(): void {
      this.dataCache = [...this.data];
    }
  
    /**
     * Get the minimum value of a numeric key
     */
    min<K extends keyof (T & DataWithId)>(key: K): number {
      this.checkIfKeyExists(key as string);
      const type = this.type(key);
  
      if (type === "number") {
        const values = this.dataCache.map(e => e[key] as unknown as number);
        return Math.min(...values);
      } else {
        throw new Error(`Key ${key as string} is not of type 'number'`);
      }
    }
  
    /**
     * Get the maximum value of a numeric key
     */
    max<K extends keyof (T & DataWithId)>(key: K): number {
      this.checkIfKeyExists(key as string);
      const type = this.type(key);
  
      if (type === "number") {
        const values = this.dataCache.map(e => e[key] as unknown as number);
        return Math.max(...values);
      } else {
        throw new Error(`Key ${key as string} is not of type 'number'`);
      }
    }
  
    /**
     * Calculate the sum of values of a numeric key
     */
    sum<K extends keyof (T & DataWithId)>(key: K): number {
      this.checkIfKeyExists(key as string);
      const type = this.type(key);
  
      if (type === "number") {
        const values = this.dataCache.map(e => e[key] as unknown as number);
        return values.reduce((acc, curr) => acc + curr, 0);
      } else {
        throw new Error(`Key ${key as string} is not of type 'number'`);
      }
    }
  
    /**
     * Check if an object has an 'id' field
     */
    private hasIdField(obj: any): obj is T & DataWithId {
      return typeof obj.id === "number";
    }
  
    /**
     * Initialize objects with an 'id' field if necessary
     */
    private initializeDataWithIds(data: T[]): (T & DataWithId)[] {
      return data.map((obj, index) => ({
        id: index + 1,
        ...obj,
      }));
    }
  
    /**
     * Verify if all objects have the same keys
     */
    private checkObjectKeys(data: T[]): void {
      const keys = Object.keys(data[0]);
      data.forEach(obj => {
        if (!this.arrayEquals(keys, Object.keys(obj))) {
          throw new Error("All objects in the input data must have the same keys.");
        }
      });
    }
  
    /**
     * Check if two arrays of keys are equal
     */
    private arrayEquals(arr1: string[], arr2: string[]): boolean {
      if (arr1.length !== arr2.length) return false;
      return arr1.every((value, index) => value === arr2[index]);
    }
  
    /**
     * Check if a key exists in the dataset
     */
    private checkIfKeyExists(key: string): void {
      if (!this.keys.includes(key)) {
        throw new Error(`Key ${key} does not exist`);
      }
    }
  
    /**
     * Compare two values, supporting both string and number types
     */
    private compareValues(aValue: any, bValue: any): number {
      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue);
      }
      return (aValue as number) - (bValue as number);
    }
  }
  