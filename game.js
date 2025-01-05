// Initialize player name
const playerNameSpan = document.getElementById('player-name');
const storedEmail = localStorage.getItem('userEmail');
let inputText = "";

if (storedEmail) {
    const name = storedEmail.split('@')[0]; 
    playerNameSpan.textContent = name;
} else {
    playerNameSpan.textContent = 'Unknown'; 
}

// Initialize values on window load
window.onload = function () {
    document.getElementById("cash-in-hand").textContent = "Rs. 0";
    document.getElementById("equity").textContent = "100%"; // Start equity at 100%
};

const diceBtn = document.getElementById('dice-button');
const diceResult = document.getElementById('dice-result');

// Roll dice logic
diceBtn.addEventListener('click', () => {
    const result = Math.floor(Math.random() * 6) + 1;
    diceResult.textContent = `You have rolled a ${result}`;
});

// Modal and investment logic
const addInvestmentButton = document.querySelector('button[style="background-color: rgb(162, 255, 255);"]');
const addModal = document.getElementById('add-modal');
const submitInvestmentButton = document.getElementById('submit-investment');
const cashInHandSpan = document.getElementById('cash-in-hand');
const equitySpan = document.getElementById('equity');
const inflowButton = document.getElementById('inflow');
const outflowButton = document.getElementById('outflow');

let cashInHand = 100000;  // Initial cash
let equity = 100;    // Initial equity
let cashTransactionDirection = ''; // Tracks inflow or outflow

// Open modal
addInvestmentButton.addEventListener('click', () => {
    addModal.style.display = 'block';
});

// Highlight buttons for inflow/outflow
function highlightButton(selectedButton) {
    inflowButton.classList.remove('selected');
    outflowButton.classList.remove('selected');
    selectedButton.classList.add('selected');
}

// Handle inflow
inflowButton.addEventListener('click', () => {
    const cashTransaction = parseFloat(document.getElementById('cash-transaction').value);
    if (!isNaN(cashTransaction)) {
        cashTransactionDirection = 'inflow';
        highlightButton(inflowButton);
    } else {
        alert('Please enter a valid amount.');
    }
});

// Handle outflow
outflowButton.addEventListener('click', () => {
    const cashTransaction = parseFloat(document.getElementById('cash-transaction').value);
    if (!isNaN(cashTransaction)) {
        cashTransactionDirection = 'outflow';
        highlightButton(outflowButton);
    } else {
        alert('Please enter a valid amount.');
    }
});

// Submit investment
submitInvestmentButton.addEventListener('click', () => {
    // const investmentIn = document.getElementById('investment-in').value;
    document.getElementById('investment-in').value = inputText;
    const equityDilution = parseFloat(document.getElementById('equity-dilution').value);
    const cashTransaction = parseFloat(document.getElementById('cash-transaction').value);

    if (!cashTransactionDirection) {
        alert('Please select Inflow or Outflow before submitting.');
        return;
    }

    if (!isNaN(cashTransaction)) {
        if (cashTransactionDirection === 'inflow') {
            cashInHand += cashTransaction;
        } else if (cashTransactionDirection === 'outflow') {
            cashInHand -= cashTransaction;
        }
        cashInHandSpan.textContent = `Rs. ${Math.max(0, cashInHand)}`; // Prevent negative cash
    }

    if (!isNaN(equityDilution)) {
        equity -= equityDilution; // Reduce equity
        if (equity < 0) {
            equity = 0; // Prevent equity below 0
        }
        equitySpan.textContent = `${equity}%`;
    } else {
        alert('Please enter a valid equity dilution value.');
    }

    addModal.style.display = 'none';

    // Clear input fields
    document.getElementById('investment-in').value = '';
    document.getElementById('cash-transaction').value = '';
    document.getElementById('equity-dilution').value = '';

    cashTransactionDirection = '';
    inflowButton.classList.remove('selected');
    outflowButton.classList.remove('selected');
    
    
    iconList.push(inputText);
    addIconToContainer();

});

const iconList = [];

function addIconToContainer() {
    const iconsContainer = document.getElementById('icon-container');
    iconsContainer.innerHTML = ''; // Clear existing icon
        // Otherwise, display the icons
        iconList.forEach(iconName => {
            const img = document.createElement('img');
            img.src = `icons/${iconName}.png`; // Path to the icon
            img.alt = iconName; // Alt text for the image
            img.title = iconName; // Set title for hover tooltip
            img.style.width = '50px'; // Adjust size as needed
            img.style.height = '50px'; // Adjust size as needed
            iconsContainer.appendChild(img); // Append the image to the container 
        });
    
}

// Pawn dragging logic
document.querySelectorAll('.pawn').forEach((pawn) => {
    pawn.addEventListener('mousedown', (e) => {
        let shiftX = e.clientX - pawn.getBoundingClientRect().left;
        let shiftY = e.clientY - pawn.getBoundingClientRect().top;

        const moveAt = (pageX, pageY) => {
            pawn.style.left = `${pageX - shiftX}px`;
            pawn.style.top = `${pageY - shiftY}px`;
        };

        const onMouseMove = (e) => {
            moveAt(e.pageX, e.pageY);
        };

        document.addEventListener('mousemove', onMouseMove);

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            pawn.style.cursor = "grab";
        };

        document.addEventListener('mouseup', onMouseUp);

        pawn.ondragstart = () => false; // Disable default drag-and-drop behavior
    });
});

// DOM Elements
// const personaInput = document.getElementById('persona');
// const submitPersonaButton = document.getElementById('submit-persona');
// const playerPersonaSpan = document.getElementById('player-persona');
// const personaInputSection = document.getElementById('persona-input-section');

// // Clear persona input field on page load
// window.onload = function () {
//     const personaInputField = document.getElementById('persona'); // Get the persona input field
//     const storedPersona = localStorage.getItem('userPersona');
    
//     // Clear the input field immediately
//     personaInputField.value = ''; // Clear any pre-filled value in the input field

//     if (storedPersona) {
//         playerPersonaSpan.textContent = storedPersona; // Display stored persona
//     } else {
//         playerPersonaSpan.textContent = ''; // Leave span empty if no persona exists
//     }
// };



// // Save and Display Persona
// submitPersonaButton.addEventListener('click', () => {
//     const persona = personaInput.value.trim();
//     if (persona) {
//         // Save persona to local storage
//         localStorage.setItem('userPersona', persona);

//         // Update the displayed persona
//         playerPersonaSpan.textContent = persona;

//         // Clear the input field
//         personaInputSection.style.display = 'none';
//         // Feedback to the user
//         alert('Persona saved successfully!');
//     } else {
//         alert('Please enter a valid persona!');
//     }
// });


window.onload = function () {
    const email = localStorage.getItem('userEmail'); // Get the email from localStorage
    const personaInputField = document.getElementById('persona'); // Get the persona input field
    const storedPersona = localStorage.getItem(`userPersona-${email}`); // Get the persona associated with the email
    const playerPersonaSpan = document.getElementById('player-persona');
    
    // Clear the persona input field
    personaInputField.value = ''; // Ensure it's empty on page load
    if (email) {
        if (storedPersona) {
            playerPersonaSpan.textContent = storedPersona; // Display stored persona associated with the email
        } else {
            playerPersonaSpan.textContent = ''; // Display empty if no persona is set for this email
        }
    } else {
        // If no email is found, display a message or handle accordingly
        alert('No email found! Please login first.');
    }
};

// Save and Display Persona
const submitPersonaButton = document.getElementById('submit-persona');
const personaInputSection = document.getElementById('persona-input-section');

submitPersonaButton.addEventListener('click', () => {
    const personaInputField = document.getElementById('persona'); // Get the input field for persona
    const persona = personaInputField.value.trim();
    const email = localStorage.getItem('userEmail'); // Get the email from localStorage
    personaInputField.value = inputText;
    if (email && persona) {
        // Save persona to localStorage using email as key
        localStorage.setItem(`userPersona-${email}`, persona);

        // Update the displayed persona
        const playerPersonaSpan = document.getElementById('player-persona');
        playerPersonaSpan.textContent = persona;

        // Clear the input field
        personaInputField.value = '';

        // Hide the input section
        personaInputSection.style.display = 'none';

        // Feedback to the user
        alert('Persona saved successfully!');
        iconList.push(inputText);
        addIconToContainer();

    }
    
});


// Select the grid overlay
const gridOverlay = document.querySelector('.grid-overlay');

// Generate grid cells
for (let i = 1; i <= 70; i++) { // 10 columns x 7 rows = 70 cells
    const cell = document.createElement('div');
    cell.dataset.index = i; // Assign a unique index for identification
    
    gridOverlay.appendChild(cell);
}

// Add click event listener

gridOverlay.addEventListener('click', (e) => {
    // document.getElementById('persona').value = inputText;
    // if (e.target && e.target.dataset.index) { // Ensure target is a grid cell
    //     // alert(`You clicked on grid cell ${e.target.dataset.index}`);
    // }
    const gridNumber = e.target.dataset.index;
    const text = gridTextList[gridNumber] || '';
    inputText = text;
    loadFloatingImage(inputText);
});


// Function to load the Cards into the floating image holder based on speechText
function loadFloatingImage(inputText) {
    console.log('Loading image for:', inputText);
    const image = document.getElementById('floatingImage');
    const errorMessage = document.getElementById('errorMessage');
    const imageUrl = "images/" + inputText + ".png"; // Assumes images are saved as .png in the same folder
    
    // Hide the error message by default
    errorMessage.style.display = 'none';
    
    // Attempt to load the image
    image.src = imageUrl;
    image.onerror = function() {
        // If image is not found, display an error message
        console.log('Image not found:', imageUrl);
        errorMessage.style.display = 'block';
        image.style.display = 'none'; // Hide the image
    };
    image.onload = function() {
        // If the image is found, display it and hide the error message
        console.log('Image loaded:', imageUrl);
        errorMessage.style.display = 'none';
        image.style.display = 'block'; // Show the image
    };

    // Show the floating image holder
    document.getElementById('floatingImageHolder').style.display = 'block';

}

// Define a Card name for each grid number
const gridTextList = {
    1: 'Enabler',
    2: 'App development',
    3: 'IP rights',
    4: 'Tax',
    5: 'Office',
    6: 'Mentor',
    7: 'Insurance',
    8: 'CRM',
    9: 'Equipment',
    10: 'Accelerator',
    11: 'Angel funding',
    12: 'Vinny',
    13: 'Vinny',
    14: 'International reach',
    15: 'Indresh',
    16: 'Indresh',
    17: 'Big corp',
    18: 'Sunny',
    19: 'Sunny',
    20: 'Bank',
    21: 'Crowd funding',
    22: 'Vinny',
    23: 'Vinny',
    24: 'International reach',
    25: 'Indresh',
    26: 'Indresh',
    27: 'Big Corp',
    28: 'Sunny',
    29: 'Sunny',
    30: 'Marketing',
    31: 'Seed funding',
    32: 'Customers',
    33: 'Customers',
    34: 'Market Survey',
    35: 'Intro',
    36: 'Objective',
    37: 'MVP',
    38: 'Revenue',
    39: 'Revenue',
    40: 'Internal Partnership',
    41: 'VC funding',
    42: 'Harry',
    43: 'Harry',
    44: 'Buy out',
    45: 'Ananya',
    46: 'Ananya',
    47: 'Merger',
    48: 'Laksh',
    49: 'Laksh',
    50: 'Company Registration',
    51: 'Grant',
    52: 'Harry',
    53: 'Harry',
    54: 'Buyout',
    55: 'Ananya',
    56: 'Ananya',
    57: 'Acquisition',
    58: 'Laksh',
    59: 'Laksh',
    60: 'Pivot',
    61: 'Idea',
    62: 'Academia',
    63: 'FFF funding',
    64: 'Hackathon',
    65: 'Prototype',
    66: 'Ideathon',
    67: 'Team',
    68: 'Skill Development',
    69: 'IT Setup',
    70: 'Incubator'

};
function hideFloatingImageHolder() {
    document.getElementById('floatingImageHolder').style.display = 'none';
}
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        hideFloatingImageHolder();
    }
});

// Get elements
const modal = document.getElementById('rulemodal');
const openModalButton = document.getElementById('rules');
const closeModalButton = document.querySelector('.close-button');

// Open the modal
openModalButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Close the modal
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close the modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});



