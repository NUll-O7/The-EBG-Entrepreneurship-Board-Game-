
const startBtn = document.getElementById('start-btn');
const emailModal = document.getElementById('email-modal');
const closeModal = document.getElementById('close-modal');
const submitEmailBtn = document.getElementById('submit-email-btn');
const emailInput = document.getElementById('email-input');

startBtn.addEventListener('click', () => {
    emailModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    emailModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target == emailModal) {
        emailModal.style.display = 'none';
    }
});

submitEmailBtn.addEventListener('click', submitEmail);


emailInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        submitEmail(); 
    }
});

function submitEmail() {
    const email = emailInput.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    localStorage.setItem('userEmail', email);
    
    if (emailPattern.test(email)) {
        alert(`Email submitted: ${email}`);
        
        window.location.href = 'game.html';
    } else {
        alert('Please enter a valid email!');
    }
}
