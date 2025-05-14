document.addEventListener("DOMContentLoaded", () => {
  // Counter Animation
  const statNumbers = document.querySelectorAll(".stat-number")

  function animateCounter(element) {
    const target = Number.parseInt(element.getAttribute("data-count"))
    const duration = 2000 // 2 seconds
    const step = (target / duration) * 10 // Update every 10ms
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        element.textContent = target.toLocaleString()
        clearInterval(timer)
      } else {
        element.textContent = Math.floor(current).toLocaleString()
      }
    }, 10)
  }

  // Intersection Observer for counter animation
  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    statNumbers.forEach((number) => {
      counterObserver.observe(number)
    })

    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll(".cause-card, .stat-item, .donation-card, .testimonial-card")

    const elementObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add delay based on index for staggered animation
            setTimeout(() => {
              entry.target.style.opacity = "1"
              entry.target.style.transform = "translateY(0)"
            }, index * 100)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    animatedElements.forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(20px)"
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
      elementObserver.observe(element)
    })
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    statNumbers.forEach(animateCounter)

    const animatedElements = document.querySelectorAll(".cause-card, .stat-item, .donation-card, .testimonial-card")

    animatedElements.forEach((element) => {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    })
  }

  // Button hover animation
  const donateBtn = document.querySelector(".donate-btn")
  if (donateBtn) {
    donateBtn.addEventListener("mouseenter", function () {
      this.classList.add("pulse")
    })

    donateBtn.addEventListener("mouseleave", function () {
      this.classList.remove("pulse")
    })
  }

  // Add pulse animation
  const style = document.createElement("style")
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .pulse {
      animation: pulse 0.6s ease-in-out infinite;
    }
  `
  document.head.appendChild(style)
})
