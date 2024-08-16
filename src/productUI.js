import {
  baskets,
  addToCart,
  cartContent,
  calculateTotalPrice,
} from "./sepetUI.js";

import "../scss/_product.scss";

const productDivs = document.getElementById("products");
const btnDivs = document.getElementById("btns");
const modalBody = document.querySelector(".modal-body");

const btnColors = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "danger",
  "light",
  "dark",
];

export let products = [];

// API'den ürünleri getirme ve ekranda gösterme işlemi
export const getProducts = async () => {
  try {
    const res = await fetch(
      "https://anthonyfs.pythonanywhere.com/api/products/"
    );
    const data = await res.json();
    products = data;
    displayProducts(products);
    category();
  } catch (error) {
    erorrPodurct();
  }
};

// Ürün kategorilerini oluşturma ve butonları ekleme
export const category = () => {
  let categoryArr = ["All"];
  products.forEach((i) => {
    if (!categoryArr.includes(i.category)) {
      categoryArr.push(i.category); // Yeni kategorileri array'e ekleme
    }
  });
  categoryArr.forEach((category, i) => {
    const btn = document.createElement("button");
    btn.innerText = category.toUpperCase();
    btn.classList.add("btn", `btn-${btnColors[i]}`);
    btnDivs.append(btn); // Kategori butonlarını ekrana ekleme
  });
};

// Ürünleri ekranda görüntüleme
export function displayProducts(arr) {
  productDivs.innerHTML = "";
  arr.forEach((i) => {
    const { description, id, image, price, title } = i;
    const productDiv = document.createElement("div");
    productDiv.classList.add("col");
    productDiv.setAttribute("id", id);
    productDiv.innerHTML = `
      <div class="card">
          <img src="${image}" class="p-2" height="250px" alt="...">
          <div class="card-body">
              <h5 class="card-title text-center d-flex align-items-center justify-content-center" style="height: 50px;">${title}</h5>
              <p class="card-text line-clamp-2">${description}</p>
          </div>
          <div class="card-footer w-100 fw-bold d-flex justify-content-between gap-3">
              <span>Price:</span><span>${price} ₺</span>
          </div>
          <div class="card-footer w-100 d-flex justify-content-center gap-3">
              <button class="btn btn-danger">Sepete Ekle</button>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">See Details</button>
          </div>
      </div>
    `;
    // Ürün kartına tıklama olayını dinleme
    productDiv.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-danger")) {
        addToCart(i);
        cartContent(baskets);
        calculateTotalPrice(baskets);
      } else if (e.target.classList.contains("btn-primary")) {
        showModal(i);
      }
    });
    productDivs.append(productDiv);
  });
}

// Hata durumunda ürün bulunamadığını gösterme
const erorrPodurct = () => {
  document.querySelector(".div").style.display = "none";
  document.querySelector("h4").style.display = "none";
  productDivs.innerHTML = `<div style="display: flex; justify-content: center; align-items: center;">
            <img src="../src/assets/404.png" alt="Error 404"/>
        </div>`;
};

// Ürün detaylarını modal içinde gösterme
export function showModal(product) {
  fetch(`https://anthonyfs.pythonanywhere.com/api/products/${product.id}`)
    .then((res) => res.json())
    .then((res) => {
      document.querySelector(".modal-title").textContent = `${res.title}`;
      modalBody.innerHTML = `
        <div class="text-center">
            <img src="${res.image}" class="p-2" height="250px" alt="...">
            <h5 class="card-title">${res.title}</h5>
            <p class="card-text">${res.description}</p>
            <p class="card-text">Fiyat: ${res.price} ₺</p>
        </div>
      `;
    });
}
