// Importez les fonctions nécessaires de vitest
import { describe, expect, it, beforeEach } from "vitest";
import FindAllData from "../src/index";
import menuData from "./exampleData.json";

interface MenuData {
  name: string;
  price: number;
  vegetarian: boolean;
  countryOfOrigin: string;
}

interface Data {
  name: string;
  age: number;
}

describe("FindAllData Tests", () => {
  let sampleData: Data[];
  let dataQuery: FindAllData<Data>;

  beforeEach(() => {
    sampleData = [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
    ];
    dataQuery = new FindAllData(sampleData);
  });

  describe("Initialization and Error Handling", () => {
    it("should generate an error if the type is not an array", () => {
      const createInstance = () => new FindAllData<any>({ a: 1 });
      expect(createInstance).toThrowError("Input data must be an array.");
    });

    it("should generate an error if the type is an empty array", () => {
      const createInstance = () => new FindAllData<any[]>([]);
      expect(createInstance).toThrowError(
        "Input data must be a non-empty array."
      );
    });

    it("should generate an error if it is not a non-empty array of objects.", () => {
      const createInstance = () => new FindAllData<any>([1]);
      expect(createInstance).toThrowError(
        "Input data must be a non-empty array of objects."
      );
    });

    it("should generate an error if keys are not identical", () => {
      const data = [
        { name: "John", age: 30 },
        { name: "Jane", city: "Paris" },
      ];
      const createInstance = () => new FindAllData<any>(data);
      expect(createInstance).toThrowError(
        "All objects in the input data must have the same keys."
      );
    });

    it("should add ids correctly", () => {
      expect(dataQuery.findAll()).toEqual([
        { id: 1, name: "John", age: 30 },
        { id: 2, name: "Jane", age: 25 },
      ]);
    });
  });

  describe("Basic Functionality", () => {
    it("should return all data using findAll", () => {
      expect(dataQuery.findAll()).toEqual([
        { id: 1, name: "John", age: 30 },
        { id: 2, name: "Jane", age: 25 },
      ]);
    });

    it("should return correct count", () => {
      expect(dataQuery.count).toEqual(2);
    });

    it("should return all keys", () => {
      expect(dataQuery.keys).toEqual(["id", "name", "age"]);
    });

    it("should find by id", () => {
      expect(dataQuery.findById(2)).toEqual({ id: 2, name: "Jane", age: 25 });
      expect(dataQuery.findById(0)).toBeUndefined();
    });

    it("should return correct type for a key", () => {
      expect(dataQuery.type("id")).toEqual("number");
      expect(dataQuery.type("age")).toEqual("number");
      expect(dataQuery.type("name")).toEqual("string");
    });
  });

  describe("Distinct Function", () => {
    it("should return distinct values correctly", () => {
      const instance = new FindAllData<MenuData>(menuData);
      expect(instance.distinct("countryOfOrigin")).toEqual([
        "Italy",
        "Japan",
        "Thailand",
        "USA",
        "India",
        "Mexico",
      ]);
      expect(instance.distinct("price")).toEqual([
        12.99, 15.5, 10.95, 8.99, 11.75, 9.5, 7.25, 13.99, 14.25, 10.75,
      ]);
    });
  });

  describe("Search Function", () => {
    it("should search correctly", () => {
      const instance = new FindAllData<MenuData>(menuData);
      expect(instance.search("name", "curry")[0].id).toEqual(5);
    });
  });

  describe("FindAll with Parameters", () => {
    it("should filter data correctly", () => {
      const instance = new FindAllData<MenuData>(menuData);
      const filteredData = instance.findAll({
        where: [
          (menu) => menu.vegetarian === true,
          (menu) => menu.countryOfOrigin === "USA",
        ],
      });
      expect(filteredData[0].id).toEqual(4);
    });

    it("should sort data correctly", () => {
      const instance = new FindAllData<MenuData>(menuData);
      const sortedDataAsc = instance.findAll({
        where: [
          (menu) => menu.vegetarian === true,
          (menu) => menu.countryOfOrigin === "Italy",
        ],
        order: ["name", "ASC"],
      });
      expect(sortedDataAsc[0].id).toEqual(10);

      const sortedDataDesc = instance.findAll({
        where: [
          (menu) => menu.vegetarian === true,
          (menu) => menu.countryOfOrigin === "Italy",
        ],
        order: ["name", "DESC"],
      });
      expect(sortedDataDesc[0].id).toEqual(1);
    });

    it("should limit data correctly", () => {
      const instance = new FindAllData<MenuData>(menuData);
      const limitedData = instance.findAll({ limit: [7, 1] });
      expect(limitedData[0].id).toEqual(8);
    });

    it("should handle multiple parameters correctly", () => {
      const instance = new FindAllData<MenuData>(menuData);
      const result = instance.findAll({
        where: [(menu) => menu.vegetarian],
        order: ["price", "ASC"],
        limit: [4, 1],
      });
      expect(result[0].id).toEqual(8);
    });
  });

  describe("Pagination", () => {
    it("should paginate correctly", () => {
      const instance = new FindAllData<MenuData>(menuData);
      expect(() => instance.page(0, 1)).toThrowError(
        "Page number must be greater than 0"
      );
      expect(instance.page(1, 1)).toEqual([0, 1]);
      expect(instance.page(5, 10)).toEqual([40, 10]);
      expect(instance.page(3, 6)).toEqual([12, 6]);
    });

    it("should paginate correctly in findAll", () => {
      const instance = new FindAllData<MenuData>(menuData);
      const result = instance.findAll({ limit: instance.page(2, 2) });
      expect(result[0].countryOfOrigin).toEqual("Thailand");
    });
  });

  describe("Aggregation Functions", () => {
    it("should find minimum value correctly", () => {
      const instance = new FindAllData<MenuData>(menuData);
      expect(() => instance.min("name")).toThrowError(
        "Key name is not of type 'number'"
      );
      expect(instance.min("price")).toEqual(7.25);
    });

    it("should find maximum value correctly", () => {
      const instance = new FindAllData<MenuData>(menuData);
      expect(() => instance.max("name")).toThrowError(
        "Key name is not of type 'number'"
      );
      expect(instance.max("price")).toEqual(15.5);
    });

    it("should calculate sum correctly", () => {
      const instance = new FindAllData<MenuData>(menuData);
      expect(() => instance.sum("name")).toThrowError(
        "Key name is not of type 'number'"
      );
      expect(instance.sum("price")).toEqual(115.92);
    });

    it("should handle aggregation functions after findAll", () => {
      const instance = new FindAllData<MenuData>(menuData);
      instance.findAll({
        where: [(menu) => menu.vegetarian],
        order: ["price", "ASC"],
        limit: [1, 2],
      });
      expect(instance.sum("price")).toEqual(22.5);
      expect(instance.min("price")).toEqual(10.75);
      expect(instance.max("price")).toEqual(11.75);
    });
  });

  describe("Reset Function", () => {
    it("should reset data correctly", () => {
      const instance = new FindAllData<MenuData>(menuData);
      instance.findAll({
        where: [(menu) => menu.vegetarian == false],
      });
      expect(instance.findAll()[0].price).toEqual(15.5);

      instance.reset();
      expect(instance.findAll()[0].price).toEqual(12.99);
    });
  });
});
