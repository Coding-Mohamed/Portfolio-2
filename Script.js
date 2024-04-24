document.addEventListener("DOMContentLoaded", function () {
  const scrollTextItems = document.querySelectorAll(".scroll-text span");
  let currentIndex = 0;
  let currentLetterIndex = 0;
  let isDeleting = false;

  // Initially hide all words
  scrollTextItems.forEach((item) => (item.style.display = "none"));

  function toggleText() {
    const currentWord = scrollTextItems[currentIndex].getAttribute("data-word");

    if (isDeleting) {
      // Removing a character
      scrollTextItems[currentIndex].textContent = currentWord.slice(0, currentLetterIndex);
      currentLetterIndex--;

      if (currentLetterIndex === 0) {
        // Move to the next word after deleting
        currentIndex = (currentIndex + 1) % scrollTextItems.length;
        isDeleting = false;

        // Hide all words except the current one
        scrollTextItems.forEach((item, index) => {
          if (index !== currentIndex) {
            item.style.display = "none";
          }
        });
      }
    } else {
      // Adding a character
      scrollTextItems[currentIndex].textContent = currentWord.slice(0, currentLetterIndex + 1);
      currentLetterIndex++;

      if (currentLetterIndex === currentWord.length) {
        // Start deleting the word after typing
        isDeleting = true;
        setTimeout(toggleText, 1000); // Pause before deleting
        return;
      }
    }

    // Show the current word
    scrollTextItems[currentIndex].style.display = "inline";

    // Continue toggling
    setTimeout(toggleText, 200); // Typing and deleting speed
  }

  toggleText(); // Start the animation immediately
});

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("hidden");

  // Close modal when clicking outside of it
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal(modalId);
    }
  });

  // Stop propagation of click event on the close button
  const closeButton = modal.querySelector(".close");
  closeButton.addEventListener("click", function (event) {
    event.stopPropagation();
    closeModal(modalId);
  });
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add("hidden");
}

// Scroll to sections
document.getElementById("about").addEventListener("click", function () {
  document.getElementById("about-section").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("projects").addEventListener("click", function () {
  document.getElementById("projects-section").scrollIntoView({ behavior: "smooth" });
});
