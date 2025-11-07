document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------------
  // 1. MOBILE MENU TOGGLE LOGIC
  // -----------------------------------
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  
    // Close menu when a link is clicked
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }


  // -----------------------------------
  // 2. THEME TOGGLING LOGIC
  // -----------------------------------

  // Self-executing function to apply theme immediately on load
  (() => {
    try {
      const ls = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      
      const html = document.documentElement;

      if (ls === "dark" || (!ls && prefersDark)) {
        html.classList.add("dark");
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    } catch (e) {
        console.error("Error applying theme from storage:", e);
    }
  })();
  
  const btn = document.getElementById("toggleTheme");
  const html = document.documentElement;

  if (btn) {
      btn.addEventListener("click", () => {
          const isDark = html.classList.toggle("dark");
          // Add/remove a .light class on body/html for the CSS gradient override
          html.classList.toggle("light", !isDark); 

          try {
              localStorage.setItem("theme", isDark ? "dark" : "light");
          } catch (e) {
              console.error("Error setting theme preference:", e);
          }
      });
  }

  // -----------------------------------
  // 3. TYPING ANIMATION LOGIC
  // -----------------------------------
  const titles = ["WEB DEVELOPER", "UX/UI DESIGNER", "PROBLEM SOLVER"];
  const typingTextElement = document.getElementById("typing-text");
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeText() {
    if (!typingTextElement) return;

    const currentTitle = titles[titleIndex];
    // Define typing speed (faster deletion, slower typing)
    const delay = isDeleting ? 45 : 170;

    if (isDeleting) {
      // Deleting character
      typingTextElement.textContent = currentTitle.substring(
        0,
        charIndex - 1
      );
      charIndex--;
    } else {
      // Typing character
      typingTextElement.textContent = currentTitle.substring(
        0,
        charIndex + 1
      );
      charIndex++;
    }

    if (!isDeleting && charIndex === currentTitle.length + 1) {
      // Done typing a word, start deletion after a pause
      isDeleting = true;
      setTimeout(typeText, 1500); // Pause for 1.5 seconds
      return;
    }

    if (isDeleting && charIndex === 0) {
      // Done deleting a word, move to the next title
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length; // Cycle through titles
      setTimeout(typeText, 500); // Pause for 0.5 seconds before starting next word
      return;
    }

    // Continue the current action (typing or deleting)
    setTimeout(typeText, delay);
  }

  // Start the animation
  if (typingTextElement) {
    typeText();
  }


  // -----------------------------------
  // 4. NAV SCROLL ACTIVE STATE
  // -----------------------------------
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll(".nav-link");
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100; // Offset for sticky header
      const sectionHeight = section.clientHeight;
      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
});