// Review form and review container
const form = document.getElementById('reviewForm');
const reviewsContainer = document.getElementById('reviews');

// Load reviews from localStorage on page load
document.addEventListener('DOMContentLoaded', loadReviews);

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const reviewText = document.getElementById('review').value.trim();

  if (name && reviewText) {
    const review = { name, reviewText };
    saveReview(review);
    displayReview(review);
    form.reset();
  }
});

function saveReview(review) {
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));
}

function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.forEach(displayReview);
}

function displayReview({ name, reviewText }) {
  const reviewEl = document.createElement('div');
  reviewEl.classList.add('review');
  reviewEl.innerHTML = `
    <h4>${name}</h4>
    <p>${reviewText}</p>
    <button onclick="deleteReview(this)">Delete</button>
  `;
  reviewsContainer.appendChild(reviewEl);
}

function deleteReview(button) {
  const reviewDiv = button.parentElement;
  const name = reviewDiv.querySelector('h4').innerText;
  const text = reviewDiv.querySelector('p').innerText;

  // Remove from DOM
  reviewDiv.remove();

  // Remove from localStorage
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews = reviews.filter(r => !(r.name === name && r.reviewText === text));
  localStorage.setItem('reviews', JSON.stringify(reviews));
}
