// utils

import { products } from "./productUI.js";

// Seçilen kategoriye ve arama değerine göre ürünleri filtreleyip, yeni bir array olarak döndürüyoruz.
export function filtered(selectedCategory, value) {
  const newArr = products.filter(
    (i) =>
      (selectedCategory === "all" ||
        i.category.toLowerCase() === selectedCategory) &&
      i.title.toLowerCase().includes(value.toLowerCase())
  );
  return newArr;
}
