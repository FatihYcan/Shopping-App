import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const showToast = (text, backgroundColor) => {
  Toastify({
    text,
    duration: 3000,
    position: "center",
    gravity: "top",
    style: {
      background: backgroundColor,
    },
  }).showToast();
};

export const showProductAddedToast = (productTitle) => {
  showToast(
    `${productTitle} sepete eklenmiştir`,
    "linear-gradient(to right, #4caf50, #8bc34a)"
  );
};

export const showProductUpdatedToast = (productTitle) => {
  showToast(
    `Sepetteki ${productTitle} miktarı artmıştır`,
    "linear-gradient(to right, #ffa000, #ff5722)"
  );
};

export const showProductRemovedToast = (title) => {
  showToast(
    `${title} sepetten çıkarılmıştır.`,
    "linear-gradient(to right, #f44336, #e57373)"
  );
};
