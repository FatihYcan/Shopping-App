// sepet

const sepet = document.getElementById("sepet");
const cardDivs = document.querySelector(".offcanvas-body");
const footerDiv = document.querySelector(".offcanvas-footer");

import {
  showProductAddedToast,
  showProductUpdatedToast,
  showProductRemovedToast,
} from "./toastify.js";

export let baskets = [];

// Sepete Ürün Ekleme Fonksiyonu
// Eğer ürün zaten sepette varsa, miktarını artırıyoruz. Yoksa ürünü sepete ekliyoruz.
export function addToCart(product) {
  if (baskets.some((i) => i.title === product.title)) {
    baskets = baskets.map((i) => {
      return i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i;
    });
    showProductUpdatedToast(product.title);
  } else {
    baskets.push({ ...product, quantity: 1 });
    showProductAddedToast(product.title);
  }

  saveToLocalStorage();
}

// Sepet İçeriğini Güncelleme Fonksiyonu
// Sepet ikonundaki ürün sayısını güncelliyoruz ve sepet içeriğini görüntülüyoruz.
export function cartContent(product) {
  sepet.innerText = baskets.length;
  cardDivs.innerHTML = "";

  product.forEach((i) => {
    const { id, image, price, title, quantity } = i;

    // Her bir ürün için kart oluşturuyoruz
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "mb-3");
    cardDiv.setAttribute("id", id);
    cardDiv.style.maxWidth = "540px";
    cardDiv.innerHTML = `
      <div class="d-flex g-0">
          <div class="col-4 my-auto">
              <img src="${image}" class="img-fluid rounded-start" alt="${image}"/>
          </div>
          <div class="col-md-8">
              <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <div class="d-flex align-items-center gap-2" role="button">
                      <i class="fa-solid fa-minus border rounded-circle bg-danger text-white p-2"></i>
                      <span class="fw-bold">${quantity}</span>
                      <i class="fa-solid fa-plus border bg-danger text-white rounded-circle p-2"></i>
                  </div>
                  <p class="card-text">Total : ${quantity} x ${price} ₺ </p>
                  <button class="btn btn-danger">Remove</button>
              </div>
          </div>
      </div>
    `;

    // Ürün miktarını artırma/azaltma ve ürünü kaldırma işlemleri için event listener ekliyoruz
    cardDiv.addEventListener("click", (e) => {
      const item = baskets.find((i) => i.id === id);
      if (e.target.classList.contains("fa-plus")) {
        item.quantity++;
        e.target.previousElementSibling.innerText = item.quantity;
        e.target.parentElement.nextElementSibling.innerText = `Total : ${item.quantity} x ${price} ₺`;
        calculateTotalPrice(baskets);
      } else if (e.target.classList.contains("fa-minus")) {
        if (e.target.nextElementSibling.innerText > 1) {
          item.quantity--;
          e.target.nextElementSibling.innerText = item.quantity;
          e.target.parentElement.nextElementSibling.innerText = `Total : ${item.quantity} x ${price} ₺`;
          calculateTotalPrice(baskets);
        }
      } else if (e.target.classList.contains("btn-danger")) {
        baskets = baskets.filter((i) => i.id !== id);
        cardDivs.removeChild(cardDiv);
        sepet.innerText = baskets.length;
        calculateTotalPrice(baskets);
        showProductRemovedToast(title);
      }

      saveToLocalStorage();
    });

    cardDivs.append(cardDiv);
  });
}

// Toplam Fiyatı Hesaplama Fonksiyonu
// Sepetteki ürünlerin toplam fiyatını hesaplayıp, footer kısmında gösteriyoruz.
export const calculateTotalPrice = (baskets) => {
  let totalPrice = 0;
  baskets.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  footerDiv.firstElementChild.lastElementChild.innerText = `${totalPrice.toFixed(
    2
  )} ₺`;
};

// Sepet verilerini JSON formatında LocalStorage'a kaydediyoruz.
function saveToLocalStorage() {
  localStorage.setItem("baskets", JSON.stringify(baskets));
}

// Sepet verilerini LocalStorage'dan yükleyip, sayfada güncelliyoruz.
export function loadFromLocalStorage() {
  const storedBaskets = localStorage.getItem("baskets");
  if (storedBaskets) {
    baskets = JSON.parse(storedBaskets);
    cartContent(baskets);
    calculateTotalPrice(baskets);
  }
}
