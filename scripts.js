// Menonaktifkan scroll restoration bawaan browser
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

document.addEventListener("DOMContentLoaded", function () {
  const landingSection = document.getElementById("landing");
  if (landingSection) {
    // Gulir ke bagian landing saat halaman dimuat atau di-refresh
    landingSection.scrollIntoView({ behavior: "auto" });
  }

  // ... sisa kode lainnya
});
document.addEventListener("DOMContentLoaded", function () {
  const landingSection = document.getElementById("landing");
  if (landingSection) {
    landingSection.scrollIntoView({ behavior: "auto" });
  }
  const scrollToMaaf = document.getElementById("scrollToMaaf");
  if (!scrollToMaaf) {
    console.error("Elemen dengan ID 'scrollToMaaf' tidak ditemukan!");
  } else {
    console.log("Tombol 'scrollToMaaf' ditemukan.");
  }

  scrollToMaaf.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.getElementById("maaf");
    if (!target) {
      console.error("Section dengan ID 'maaf' tidak ditemukan!");
      return;
    }

    console.log("Section 'maaf' ditemukan. Menghitung posisi...");
    const offsetTop = target.offsetTop; // Offset ditingkatkan menjadi 150px untuk ruang tambahan
    console.log("Posisi section 'maaf':", offsetTop);

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  });

  // Animasi scroll-triggered untuk elemen
  function animateOnScroll() {
    const animatedElements = document.querySelectorAll(
      ".fade-in-up, .slide-in-left, .slide-in-right, .slide-in-up"
    );

    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("animate");
      }
    });
  }

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();

  const modal = document.getElementById("photoModal");
  const modalImg = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  const closeModal = document.querySelector(".close");
  const photoCards = document.querySelectorAll(".photo-card");

  function openModal(imageSrc, caption) {
    modalImg.src = imageSrc;
    modalCaption.textContent = caption;
    modal.style.display = "flex";
    modal.style.opacity = "0";
    setTimeout(() => {
      modal.style.opacity = "1";
    }, 10);
  }

  photoCards.forEach((card) => {
    card.addEventListener("click", function () {
      const onclickAttr = this.getAttribute("onclick"); // Ambil seluruh string onclick
      // Regex untuk mendapatkan imageSrc (parameter pertama)
      const imgSrcMatch = onclickAttr.match(/openModal\('([^']+)'/);
      const imgSrc = imgSrcMatch && imgSrcMatch[1] ? imgSrcMatch[1] : "";

      // Regex untuk mendapatkan caption (parameter kedua)
      const captionMatch = onclickAttr.match(/,\s*'([^']+)'\)/);
      const caption = captionMatch && captionMatch[1] ? captionMatch[1] : "";

      openModal(imgSrc, caption);
    });
  });

  // ... (sisa scripts.js) ...
  closeModal.addEventListener("click", function () {
    modal.style.opacity = "0";
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.opacity = "0";
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "flex") {
      modal.style.opacity = "0";
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    }
  });

  // Efek typing untuk teks utama
  function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = "";
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          if (element.classList.contains("main-title")) {
            const originalText = element.textContent;
            typeWriter(element, originalText, 100);
          }
          element.classList.add("animate");
          observer.unobserve(element);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  const elementsToAnimate = document.querySelectorAll(
    ".main-title, .fade-in, .fade-in-delay-1, .fade-in-delay-2, .fade-in-delay-3, .slide-in-left, .slide-in-right, .slide-in-up, .fade-in-up"
  );
  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });

  // Particle effect untuk landing section
  function createParticles() {
    const particleCount = 20;
    const landing = document.querySelector(".landing");
    if (!landing) {
      console.error("Section dengan class 'landing' tidak ditemukan!");
      return;
    }

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background: linear-gradient(45deg, #FFB6C1, #FFC0CB);
        border-radius: 50%;
        pointer-events: none;
        animation: float 6s ease-in-out infinite;
        animation-delay: ${Math.random() * 6}s;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: 0.6;
      `;
      landing.appendChild(particle);
    }
  }

  createParticles();

  // Hover effect untuk photo cards
  photoCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.05)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Smooth reveal untuk promise items
  const promiseItems = document.querySelectorAll(".promise-item");
  promiseItems.forEach((item, index) => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    };

    const promiseObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
            entry.target.style.transition = "all 0.6s ease-out";
          }, index * 200);
          promiseObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    item.style.opacity = "0";
    item.style.transform = "translateX(-50px)";
    promiseObserver.observe(item);
  });

  // Heart floating animation
  function createFloatingHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "💕";
    heart.style.cssText = `
      position: fixed;
      font-size: 20px;
      color: #FF69B4;
      pointer-events: none;
      z-index: 1000;
      animation: floatUp 3s ease-out forwards;
      left: ${Math.random() * window.innerWidth}px;
      top: ${window.innerHeight}px;
    `;
    document.body.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, 3000);
  }

  const style = document.createElement("style");
  style.textContent = `
    @keyframes floatUp {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
    @keyframes float {
      0%,
      100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    .animate {
      opacity: 1 !important;
      transform: translateY(0) translateX(0) !important;
    }
  `;
  document.head.appendChild(style);

  setInterval(createFloatingHeart, 3000);

  // Loading animation
  function showLoadingComplete() {
    const body = document.body;
    body.style.opacity = "0";
    setTimeout(() => {
      body.style.transition = "opacity 1s ease-in-out";
      body.style.opacity = "1";
    }, 100);
  }

  showLoadingComplete();

  console.log("💕 Website loaded with love! 💕");
  console.log("Semua placeholder bisa diganti dengan konten personal Anda.");
  console.log(
    "Untuk mengganti foto, ubah src di modalImg atau tambahkan foto asli."
  );

  window.updatePhoto = function (index, imageSrc) {
    const photoCards = document.querySelectorAll(".photo-card");
    if (photoCards[index]) {
      const placeholder = photoCards[index].querySelector(".photo-placeholder");
      const img = document.createElement("img");
      img.src = imageSrc;
      img.className = "gallery-photo";
      img.alt = "Kenangan Spesial";
      placeholder.replaceWith(img);
    }
  };

  window.updateText = function (selector, newText) {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = newText;
    }
  };

  console.log("Gunakan updatePhoto(index, imageSrc) untuk mengganti foto");
  console.log("Gunakan updateText(selector, newText) untuk mengganti teks");

  const forgiveButton = document.getElementById("forgiveButton");
  const thankYouSection = document.getElementById("thankYouSection");
  if (!forgiveButton) {
    console.error("Elemen dengan ID 'forgiveButton' tidak ditemukan!");
  }
  if (!thankYouSection) {
    console.error("Elemen dengan ID 'thankYouSection' tidak ditemukan!");
  }

  forgiveButton.addEventListener("click", function () {
    forgiveButton.style.display = "none";
    thankYouSection.style.display = "block";
    const offsetTop = thankYouSection.offsetTop; // Offset ditingkatkan menjadi 150px
    console.log("Posisi section 'thankYouSection':", offsetTop);

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
    document.body.classList.add("no-scroll");
  });
});

window.openModal = function (imageSrc, caption) {
  const modal = document.getElementById("photoModal");
  const modalImg = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  modalImg.src = imageSrc;
  modalCaption.textContent = caption;
  modal.style.display = "flex";
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.style.opacity = "1";
  }, 10);
};
