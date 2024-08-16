// main

import "./scss/style.scss";
import { getProducts, displayProducts } from "./src/productUI.js";
import { loadFromLocalStorage } from "./src/sepetUI.js";
import { filtered } from "./src/utils.js";

const btnDivs = document.getElementById("btns");
const searchInput = document.getElementById("searchInput");
const categoryTitle = document.getElementById("category");

window.addEventListener("load", loadFromLocalStorage);

getProducts();

// Kategori düğmesine tıklandığında, seçilen kategoriye göre ürünleri filtreleyip görüntülüyoruz
btnDivs.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    const selectedCategory = e.target.innerText.toLowerCase();
    categoryTitle.innerText = selectedCategory.toUpperCase();
    const value = searchInput.value;
    const filteredProducts = filtered(selectedCategory, value);
    displayProducts(filteredProducts);
  }
});

// Arama kutusuna yazı yazıldığında, mevcut kategoriye ve arama değerine göre ürünleri filtreleyip görüntülüyoruz
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const selectedCategory = categoryTitle.innerText.toLowerCase();
  const filteredProducts = filtered(selectedCategory, value);
  displayProducts(filteredProducts);
});
