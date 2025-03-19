document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("video");
  const button = document.getElementById("playPauseButton");

  // Запрещаем контекстное меню (ПКМ) для предотвращения скачивания
  video.addEventListener("contextmenu", (event) => event.preventDefault());

  // Функция для воспроизведения и паузы
  function togglePlayPause() {
    if (video.paused) {
      video.play();
      button.classList.add("hidden"); // Скрываем кнопку при старте
    } else {
      video.pause();
    }
  }

  // Клик по кнопке — запускаем видео
  button.addEventListener("click", togglePlayPause);

  // Клик по видео — пауза или воспроизведение
  video.addEventListener("click", function (event) {
    // Проверяем, если видео уже на паузе, то просто продолжаем, иначе ничего не делаем
    if (!video.paused) {
      video.pause();
    }
  });

  // Когда видео останавливается — показываем кнопку
  video.addEventListener("pause", () => {
    button.classList.remove("hidden");
  });

  // Если видео закончилось — показываем кнопку
  video.addEventListener("ended", () => {
    button.classList.remove("hidden");
  });
});


const swiper = new Swiper('.swiper', {
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.project__btn-next',
    prevEl: '.project__btn-prev',
  }
});

function maskPhone(selector, masked = '+7 (___) ___-__-__') {
  const elems = document.querySelectorAll(selector);

  function mask(event) {
    const keyCode = event.keyCode;
    const template = masked,
      def = template.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
    console.log(template);
    let i = 0,
      newValue = template.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
    i = newValue.indexOf("_");
    if (i !== -1) {
      newValue = newValue.slice(0, i);
    }
    let reg = template.substr(0, this.value.length).replace(/_+/g,
      function (a) {
        return "\\d{1," + a.length + "}";
      }).replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
      this.value = newValue;
    }
    if (event.type === "blur" && this.value.length < 5) {
      this.value = "";
    }

  }

  for (const elem of elems) {
    elem.addEventListener("input", mask);
    elem.addEventListener("focus", mask);
    elem.addEventListener("blur", mask);
  }

}

// use

// maskPhone('селектор элементов', 'маска, если маску не передать то будет работать стандартная +7 (___) ___-__-__');

maskPhone('.phone-input');

const scroll = () => {
  const links = document.querySelectorAll("a[data-scroll]");

  links.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth"
        });
      }
    });
  });

  const scrollElements = document.querySelectorAll("[data-scroll]");

  scrollElements.forEach(element => {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("data-scroll").replace("#", "");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth"
        });
      }
    });
  });
}
scroll();

const burger = document.querySelector('.menu__burger');
const body = document.querySelector('body');
const menuBody = document.querySelector('.menu ul');

burger.addEventListener('click', (event) => {
  menuBody.classList.toggle('active');
  body.classList.toggle('lock');
  event.stopPropagation();
});

document.addEventListener('click', (event) => {
  if (!menuBody.contains(event.target) && !burger.contains(event.target)) {
    menuBody.classList.remove('active');
    body.classList.remove('lock');
  }
});
