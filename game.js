
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
            // img.src = `icons/${iconName}.png`; 
            img.src = icons_map[iconName];
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
                // Calculate new position
                let newLeft = pageX - shiftX;
                let newTop = pageY - shiftY;
                
                // Make sure pawn stays within the board boundaries
                if (newLeft < boardRect.left) newLeft = boardRect.left;
                if (newTop < boardRect.top) newTop = boardRect.top;
                if (newLeft > boardRect.right - pawn.offsetWidth) newLeft = boardRect.right - pawn.offsetWidth;
                if (newTop > boardRect.bottom - pawn.offsetHeight) newTop = boardRect.bottom - pawn.offsetHeight;
                
                pawn.style.left = `${newLeft}px`;
                pawn.style.top = `${newTop}px`;
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
    const imageUrl = image_map[inputText]; 
   
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

const image_map = {
    "Academia": "https://i.ibb.co/ypP9RXh/academia.png",
    "Accelerator": "https://i.ibb.co/br5TwQd/Accelerator.png",
    "Acquisition": "https://i.ibb.co/T4vmGrq/acquisition.png",
    "Ananya": "https://i.ibb.co/9WdQG4t/ananya.png",
    "Angel funding": "https://i.ibb.co/XYsj1Mv/Angel-funding.png",
    "App development": "https://i.ibb.co/W5qKg2Y/App-development.png",
    "Bank": "https://i.ibb.co/SVZXRXn/Bank.png",
    "Bg": "https://i.ibb.co/HpJ8K2B/bg.jpg",
    "Big Corp": "https://i.ibb.co/vVsFh6v/Big-Corp.png",
    "Buy out": "https://i.ibb.co/XV0ZnTS/Buy-out.png",
    "Comp Reg": "https://i.ibb.co/2vkDfmn/comp-reg.png",
    "Company Registration": "https://i.ibb.co/WkhQ8mH/Company-Registration.png",
    "CRM": "https://i.ibb.co/jTzcH5c/crm.png",
    "Crowd funding": "https://i.ibb.co/jM9Bm2k/Crowd-funding.png",
    "Customer Persona": "https://i.ibb.co/nBnR0Bw/customer-persona.jpg",
    "Customers": "https://i.ibb.co/XSCT5F1/customers.png",
    "EBG Board": "https://i.ibb.co/Cz4MvRq/EBG-board.jpg",
    "EBG Box": "https://i.ibb.co/nLq4Qdf/EBG-box.jpg",
    "Ebg Logo": "https://i.ibb.co/z6DmDHT/ebg-logo.png",
    "EBG V7": "https://i.ibb.co/DWyHbW7/EBG-v7.jpg",
    "EBG V8": "https://i.ibb.co/QYR3GgS/EBG-v8.jpg",
    "Enabler": "https://i.ibb.co/HNVMK7D/Enabler.png",
    "Equipment": "https://i.ibb.co/SB3bKnv/equipment.png",
    "FFF funding": "https://i.ibb.co/C6Zrv5P/fff-funding.png",
    "Goal": "https://i.ibb.co/h12DrL1/goal.png",
    "Grant": "https://i.ibb.co/PrJbPYd/Grant.png",
    "Hackathon": "https://i.ibb.co/16Yk5Ny/hackathon.png",
    "Harry": "https://i.ibb.co/GFcnYgr/harry.png",
    "Idea": "https://i.ibb.co/tXG8b31/Idea.png",
    "Ideathon": "https://i.ibb.co/xFDBn5d/Ideathon.png",
    "Incubator": "https://i.ibb.co/s9StkCD/incubator.png",
    "Indresh": "https://i.ibb.co/qjxqXzH/indresh.png",
    "Insurance": "https://i.ibb.co/B6H1YRw/insurance.png",
    "Internal Partnership": "https://i.ibb.co/MZZWPTk/Internal-Partnership.png",
    "International reach": "https://i.ibb.co/B4krQP1/International-reach.png",
    "IP rights": "https://i.ibb.co/5WY4N8y/IP-rights.png",
    "IT Setup": "https://i.ibb.co/vJbDFgb/IT-setup.png",
    "Laksh": "https://i.ibb.co/GJtVv2v/laksh.png",
    "Market Survey": "https://i.ibb.co/WBrQ1fc/Market-Survey.png",
    "Marketing": "https://i.ibb.co/C8htD3h/Marketing.png",
    "Mentor": "https://i.ibb.co/DKSz3Nh/Mentor.png",
    "MVP": "https://i.ibb.co/310288r/MVP.png",
    "Office": "https://i.ibb.co/P5frbbT/office.png",
    "Pivot": "https://i.ibb.co/DRPXRfH/Pivot.png",
    "Prototype": "https://i.ibb.co/166sswg/prototype.png",
    "Revenue": "https://i.ibb.co/yRdnWZC/revenue.png",
    "Seed funding": "https://i.ibb.co/5vkGN1J/Seed-funding.png",
    "Skill Dev": "https://i.ibb.co/ZdKW3bT/skill-dev.png",
    "Skill Development": "https://i.ibb.co/8dwtKjX/skill-development.png",
    "Sunny": "https://i.ibb.co/kc1C780/sunny.png",
    "Tax": "https://i.ibb.co/6XqLNjt/Tax.png",
    "Team": "https://i.ibb.co/ByyLMCD/team.png",
    "VC funding": "https://i.ibb.co/Sny1hDK/VC-Funding.png",
    "Vinny": "https://i.ibb.co/MfZkZfj/vinny.png"
}

icons_map = {
    "Academia": "https://i.ibb.co/rsNWbkX/Academia.png",
    "Accelerator": "https://i.ibb.co/KVQbNGT/Accelerator.png",
    "Acquisition": "https://i.ibb.co/8rmyQkG/Acquisition.png",
    "Ananya": "https://i.ibb.co/fvKvG9W/ananya.png",
    "Angel funding": "https://i.ibb.co/XZDrsjT/Angel-Funding.png",
    "Bank": "https://i.ibb.co/FntMZJ2/Bank.png",
    "Big corp": "https://i.ibb.co/BL4C6TC/Big-Corp.png",
    "Buy out": "https://i.ibb.co/6Wp4nwp/Buy-Out.png",
    "Company registration": "https://i.ibb.co/M7XDDBg/Company-Registration.png",
    "CRM": "https://i.ibb.co/vdQvDBd/CRM.png",
    "Crowd funding": "https://i.ibb.co/3YG2MCW/Crowd-Funding.png",
    "Customer 1k": "https://i.ibb.co/GdzPznm/Customer-1k.png",
    "Customer 10k": "https://i.ibb.co/hVtbd2L/Customer-10k.png",
    "Customer 100 K": "https://i.ibb.co/dbk8Dgr/Customer-100-K.png",
    "Customer multiplier": "https://i.ibb.co/p4MPsNs/Customer-Multiplier.png",
    "Customers": "https://i.ibb.co/MhWWLVH/Customers.png",
    "Dice": "https://i.ibb.co/ZxQms7h/Dice.png",
    "Enabler": "https://i.ibb.co/0sqrHmN/Enabler.png",
    "Equipment": "https://i.ibb.co/ss4WzMS/Equipment.png",
    "Equity": "https://i.ibb.co/K9YdjHf/Equity.png",
    "Factory": "https://i.ibb.co/h72Bnfk/factory.png",
    "FFF funding": "https://i.ibb.co/5rRxYF4/FFF-funding.png",
    "Grant": "https://i.ibb.co/p2cvCj7/Grant.png",
    "Hackathon": "https://i.ibb.co/HCTC6M5/Hackathon.png",
    "Harry": "https://i.ibb.co/jfc3WxQ/harry.png",
    "Idea": "https://i.ibb.co/hYybM8f/Idea.png",
    "Ideathon": "https://i.ibb.co/1vM5N1x/ideathon.png",
    "Incubator": "https://i.ibb.co/xHhMqYf/Incubator.png",
    "Indresh": "https://i.ibb.co/9cpW0Px/indresh.png",
    "Insurance": "https://i.ibb.co/7SHw6W3/insurance.png",
    "Internal partnership": "https://i.ibb.co/G7xtGd4/internal-partnership.png",
    "International reach": "https://i.ibb.co/XFYgmgF/International-reach.png",
    "IP rights": "https://i.ibb.co/C6ZJBxV/IP-rights.png",
    "IT setup": "https://i.ibb.co/qjcjztN/IT-setup.png",
    "Laksh": "https://i.ibb.co/JQ1LySH/Laksh.png",
    "Market survey": "https://i.ibb.co/QQf4RhN/Market-Survey.png",
    "Marketing": "https://i.ibb.co/2YPny1M/Marketing.png",
    "Mentor": "https://i.ibb.co/pfHTpfV/Mentor.png",
    "MVP V1": "https://i.ibb.co/wc8XTgV/MVP-V1.png",
    "MVP V2": "https://i.ibb.co/YLx6bgz/MVP-V2.png",
    "MVP V3": "https://i.ibb.co/8jYtkQw/MVP-V3.png",
    "MVP V4": "https://i.ibb.co/9t9DDrH/MVP-V4.png",
    "MVP": "https://i.ibb.co/ZR9q48Z/MVP.png",
    "Net worth": "https://i.ibb.co/brDkh2m/Net-worth.png",
    "Office": "https://i.ibb.co/p4nKV7J/office.png",
    "Pivot": "https://i.ibb.co/kHCDPGX/Pivot.png",
    "Prototype": "https://i.ibb.co/jW8PfkR/Prototype.png",
    "Revenue multiplier": "https://i.ibb.co/99dQ2DF/Revenue-Multiplier.png",
    "Revenue": "https://i.ibb.co/p1w8tt9/Revenue.png",
    "Seed funding": "https://i.ibb.co/nwhr2Rj/Seed-funding.png",
    "Skill development": "https://i.ibb.co/vj1W0Wg/skill-development.png",
    "Sunny": "https://i.ibb.co/vJYQxCd/sunny.png",
    "Tax": "https://i.ibb.co/cF4vQkT/Tax.png",
    "Team": "https://i.ibb.co/18SyZ8H/Team.png",
    "VC funding": "https://i.ibb.co/p67B3wS/VC-Funding.png",
    "Vinny": "https://i.ibb.co/PrJ9D0f/vinny.png"
}