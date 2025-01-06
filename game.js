
const playerNameSpan = document.getElementById('player-name');
const storedEmail = localStorage.getItem('userEmail');
let inputText = "";

if (storedEmail) {
    const name = storedEmail.split('@')[0]; 
    playerNameSpan.textContent = name;
} else {
    playerNameSpan.textContent = 'Unknown'; 
}

window.onload = function () {
    document.getElementById("cash-in-hand").textContent = "Rs. 0";
    document.getElementById("equity").textContent = "100%"; 
};

const diceBtn = document.getElementById('dice-button');
const diceResult = document.getElementById('dice-result');

diceBtn.addEventListener('click', () => {
    const result = Math.floor(Math.random() * 6) + 1;
    diceResult.textContent = `You have rolled a ${result}`;
});


const addInvestmentButton = document.querySelector('button[style="background-color: rgb(162, 255, 255);"]');
const addModal = document.getElementById('add-modal');
const submitInvestmentButton = document.getElementById('submit-investment');
const cashInHandSpan = document.getElementById('cash-in-hand');
const equitySpan = document.getElementById('equity');
const inflowButton = document.getElementById('inflow');
const outflowButton = document.getElementById('outflow');

let cashInHand = 100000;  
let equity = 100;    
let cashTransactionDirection = ''; 


addInvestmentButton.addEventListener('click', () => {
    addModal.style.display = 'block';
});


function highlightButton(selectedButton) {
    inflowButton.classList.remove('selected');
    outflowButton.classList.remove('selected');
    selectedButton.classList.add('selected');
}


inflowButton.addEventListener('click', () => {
    const cashTransaction = parseFloat(document.getElementById('cash-transaction').value);
    if (!isNaN(cashTransaction)) {
        cashTransactionDirection = 'inflow';
        highlightButton(inflowButton);
    } else {
        alert('Please enter a valid amount.');
    }
});


outflowButton.addEventListener('click', () => {
    const cashTransaction = parseFloat(document.getElementById('cash-transaction').value);
    if (!isNaN(cashTransaction)) {
        cashTransactionDirection = 'outflow';
        highlightButton(outflowButton);
    } else {
        alert('Please enter a valid amount.');
    }
});


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
        cashInHandSpan.textContent = `Rs. ${Math.max(0, cashInHand)}`; 
    }

    if (!isNaN(equityDilution)) {
        equity -= equityDilution; 
        if (equity < 0) {
            equity = 0; 
        }
        equitySpan.textContent = `${equity}%`;
    } else {
        alert('Please enter a valid equity dilution value.');
    }

    addModal.style.display = 'none';


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
    iconsContainer.innerHTML = ''; 
        iconList.forEach(iconName => {
            const img = document.createElement('img');
            img.src = `icons/${iconName}.png`; 
            img.alt = iconName; 
            img.title = iconName; 
            img.style.width = '50px'; 
            img.style.height = '50px'; 
            iconsContainer.appendChild(img); 
        });
    
}


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

        pawn.ondragstart = () => false; 
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
    const email = localStorage.getItem('userEmail'); 
    const personaInputField = document.getElementById('persona'); 
    const storedPersona = localStorage.getItem(`userPersona-${email}`); 
    const playerPersonaSpan = document.getElementById('player-persona');
    
    
    personaInputField.value = ''; 
    if (email) {
        if (storedPersona) {
            playerPersonaSpan.textContent = storedPersona; 
        } else {
            playerPersonaSpan.textContent = ''; 
        }
    } else {
       
        alert('No email found! Please login first.');
    }
};


const submitPersonaButton = document.getElementById('submit-persona');
const personaInputSection = document.getElementById('persona-input-section');

submitPersonaButton.addEventListener('click', () => {
    const personaInputField = document.getElementById('persona'); 
    const persona = personaInputField.value.trim();
    const email = localStorage.getItem('userEmail'); 
    personaInputField.value = inputText;
    if (email && persona) {
        
        localStorage.setItem(`userPersona-${email}`, persona);

        
        const playerPersonaSpan = document.getElementById('player-persona');
        playerPersonaSpan.textContent = persona;

        
        personaInputField.value = '';

        
        personaInputSection.style.display = 'none';

        alert('Persona saved successfully!');
        iconList.push(inputText);
        addIconToContainer();

    }
    
});



const gridOverlay = document.querySelector('.grid-overlay');


for (let i = 1; i <= 70; i++) { 
    const cell = document.createElement('div');
    cell.dataset.index = i; 
    
    gridOverlay.appendChild(cell);
}



gridOverlay.addEventListener('click', (e) => {
    // document.getElementById('persona').value = inputText;
    // if (e.target && e.target.dataset.index) { 
    //     // alert(`You clicked on grid cell ${e.target.dataset.index}`);
    // }
    const gridNumber = e.target.dataset.index;
    const text = gridTextList[gridNumber] || '';
    inputText = text;
    loadFloatingImage(inputText);
});

function loadFloatingImage(inputText) {
    console.log('Loading image for:', inputText);
    const image = document.getElementById('floatingImage');
    const errorMessage = document.getElementById('errorMessage');
    const imageUrl = "imagSes/" + inputText + ".png"; 
   
    errorMessage.style.display = 'none';
    
    image.src = imageUrl;
    image.onerror = function() {
        
        console.log('Image not found:', imageUrl);
        errorMessage.style.display = 'block';
        image.style.display = 'none'; // Hide the image
    };
    image.onload = function() {
        
        console.log('Image loaded:', imageUrl);
        errorMessage.style.display = 'none';
        image.style.display = 'block'; 
    };

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


const modal = document.getElementById('rulemodal');
const openModalButton = document.getElementById('rules');
const closeModalButton = document.querySelector('.close-button');


openModalButton.addEventListener('click', () => {
    modal.style.display = 'block';
});


closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});



