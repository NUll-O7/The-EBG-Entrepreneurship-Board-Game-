// Select elements
const startBtn = document.getElementById('start-btn');
const emailModal = document.getElementById('email-modal');
const closeModal = document.getElementById('close-modal');
const submitEmailBtn = document.getElementById('submit-email-btn');
const emailInput = document.getElementById('email-input');

// Show the modal when "Start Game" is clicked
startBtn.addEventListener('click', () => {
    emailModal.style.display = 'flex';
});

// Close the modal when the 'x' button is clicked
closeModal.addEventListener('click', () => {
    emailModal.style.display = 'none';
});

// Close the modal when clicked outside of the modal content
window.addEventListener('click', (e) => {
    if (e.target == emailModal) {
        emailModal.style.display = 'none';
    }
});

// Handle email submission and redirect
submitEmailBtn.addEventListener('click', submitEmail);

// Allow submission on pressing 'Enter'
emailInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        submitEmail(); // Call the same submit function when Enter is pressed
    }
});

// Function to handle email submission with validation
function submitEmail() {
    const email = emailInput.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Simple email regex pattern
    localStorage.setItem('userEmail', email);
    // Check if email is valid
    if (emailPattern.test(email)) {
        alert(`Email submitted: ${email}`);
        // Redirect to the new game page
        window.location.href = 'game.html';
    } else {
        alert('Please enter a valid email!');
    }
}
