document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const menu = document.querySelector(".menu")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      menu.classList.toggle("active")

      // Toggle hamburger to X
      const spans = this.querySelectorAll("span")
      spans.forEach((span) => span.classList.toggle("active"))

      if (menu.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  }

  // Testimonial Slider
  const slides = document.querySelectorAll(".testimonial-slide")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")

  if (slides.length > 0 && dots.length > 0) {
    let currentSlide = 0

    function showSlide(n) {
      slides.forEach((slide) => slide.classList.remove("active"))
      dots.forEach((dot) => dot.classList.remove("active"))

      slides[n].classList.add("active")
      dots[n].classList.add("active")
      currentSlide = n
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length
      showSlide(currentSlide)
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length
      showSlide(currentSlide)
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index)
      })
    })

    // Event listeners for prev/next buttons
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", prevSlide)
      nextBtn.addEventListener("click", nextSlide)
    }

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000)
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: "smooth",
        })
      }
    })
  })

  // Form submissions
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      alert("Merci pour votre soumission ! Dans un environnement réel, ce formulaire serait traité par un serveur.")
      form.reset()
    })
  })
})
