// Responsive JavaScript adjustments for Entrepreneurial Board Game

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Responsive pawn positioning
    const positionPawnResponsively = () => {
        const boardContainer = document.querySelector('.board-container');
        const pawn = document.getElementById('pawn1');
        
        if (boardContainer && pawn) {
            const boardRect = boardContainer.getBoundingClientRect();
            
            // Calculate position based on viewport width
            if (window.innerWidth < 768) {
                // For small screens
                pawn.style.left = '34%';
                pawn.style.top = '46%';
            } else if (window.innerWidth < 992) {
                // For medium screens
                pawn.style.left = '34%';
                pawn.style.top = '46%';
            } else {
                // For large screens
                pawn.style.left = '34%';
                pawn.style.top = '46%';
            }
        }
    };

    // Position the pawn responsively on load
    positionPawnResponsively();

    // Update pawn position when window is resized
    window.addEventListener('resize', positionPawnResponsively);

    // Fix for the floating image position
    const adjustFloatingImage = () => {
        const floatingImageHolder = document.getElementById('floatingImageHolder');
        
        if (floatingImageHolder && floatingImageHolder.style.display !== 'none') {
            if (window.innerWidth < 992) {
                // For small/medium screens, center in viewport
                floatingImageHolder.style.top = '50%';
                floatingImageHolder.style.left = '50%';
                floatingImageHolder.style.transform = 'translate(-50%, -50%)';
                floatingImageHolder.style.bottom = 'auto';
                floatingImageHolder.style.right = 'auto';
            } else {
                // For large screens, use original positioning
                floatingImageHolder.style.bottom = '180px';
                floatingImageHolder.style.right = '55%';
                floatingImageHolder.style.top = 'auto';
                floatingImageHolder.style.left = 'auto';
                floatingImageHolder.style.transform = 'none';
            }
        }
    };

    // Adjust floating image position on window resize
    window.addEventListener('resize', adjustFloatingImage);

    // Fix for draggable pawns to stay within the board
    document.querySelectorAll('.pawn').forEach((pawn) => {
        pawn.addEventListener('mousedown', (e) => {
            let shiftX = e.clientX - pawn.getBoundingClientRect().left;
            let shiftY = e.clientY - pawn.getBoundingClientRect().top;
            const boardContainer = document.querySelector('.board-container');
            const boardRect = boardContainer.getBoundingClientRect();

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

            // Handle touch events for mobile
            const onTouchMove = (e) => {
                const touch = e.touches[0];
                moveAt(touch.pageX, touch.pageY);
                e.preventDefault(); // Prevent scrolling while dragging
            };

            const onTouchEnd = () => {
                document.removeEventListener('touchmove', onTouchMove);
                document.removeEventListener('touchend', onTouchEnd);
                pawn.style.cursor = "grab";
            };

            document.addEventListener('touchmove', onTouchMove, { passive: false });
            document.addEventListener('touchend', onTouchEnd);

            pawn.ondragstart = () => false;
        });

        // Add touch start event for mobile
        pawn.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            let shiftX = touch.clientX - pawn.getBoundingClientRect().left;
            let shiftY = touch.clientY - pawn.getBoundingClientRect().top;
            pawn.style.cursor = "grabbing";
            e.preventDefault(); // Prevent default touch behavior
        }, { passive: false });
    });

    // Fix modal positioning for different screen sizes
    const fixModalPosition = () => {
        const addModal = document.getElementById('add-modal');
        if (addModal && addModal.style.display !== 'none') {
            addModal.style.top = '50%';
            addModal.style.left = '50%';
            addModal.style.transform = 'translate(-50%, -50%)';
        }
    };

    // Call fixModalPosition on window resize
    window.addEventListener('resize', fixModalPosition);

    // Make sure the dice button is fully responsive
    const diceBtn = document.getElementById('dice-button');
    if (diceBtn) {
        diceBtn.addEventListener('touchstart', (e) => {
            // Prevent default touch behavior to avoid double triggers
            e.preventDefault();
            // Manually trigger the click event
            diceBtn.click();
        }, { passive: false });
    }

    // Make grid cells responsive
    const updateGridCells = () => {
        const gridOverlay = document.querySelector('.grid-overlay');
        const boardGame = document.querySelector('.board-game');
        
        if (gridOverlay && boardGame) {
            // Update grid to match board game dimensions
            gridOverlay.style.width = `${boardGame.offsetWidth}px`;
            gridOverlay.style.height = `${boardGame.offsetHeight}px`;
        }
    };

    // Call updateGridCells when window is resized
    window.addEventListener('resize', updateGridCells);
    // Initial call to set the grid
    updateGridCells();

    // Fix for mobile - close floating image on tap outside
    document.addEventListener('touchstart', (e) => {
        const floatingImageHolder = document.getElementById('floatingImageHolder');
        if (floatingImageHolder && 
            floatingImageHolder.style.display !== 'none' && 
            !floatingImageHolder.contains(e.target)) {
            hideFloatingImageHolder();
        }
    });

    // Adjust rule sheet button position based on screen size
    const adjustRuleSheetPosition = () => {
        const ruleSheet = document.getElementById('ruleSheet');
        if (ruleSheet) {
            if (window.innerWidth < 992) {
                ruleSheet.style.position = 'fixed';
                ruleSheet.style.bottom = '20px';
                ruleSheet.style.left = '20px';
                ruleSheet.style.right = 'auto';
            } else {
                // Restore original positioning for desktop
                ruleSheet.style.position = 'relative';
                ruleSheet.style.right = '775px';
                ruleSheet.style.bottom = '0';
                ruleSheet.style.left = 'auto';
            }
        }
    };

    // Call adjustRuleSheetPosition on load and resize
    adjustRuleSheetPosition();
    window.addEventListener('resize', adjustRuleSheetPosition);

    // Ensure the board is always displayed correctly
    const adjustBoardPosition = () => {
        const boardContainer = document.querySelector('.board-container');
        if (boardContainer) {
            if (window.innerWidth < 992) {
                boardContainer.style.margin = '20px auto';
                boardContainer.style.marginLeft = 'auto';
            } else {
                boardContainer.style.marginLeft = '5%';
            }
        }
    };

    // Call adjustBoardPosition on load and resize
    adjustBoardPosition();
    window.addEventListener('resize', adjustBoardPosition);
});

// Fix for iOS vh issue (100vh is not reliable on iOS)
function setVhProperty() {
    // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set the --vh value initially and on resize
setVhProperty();
window.addEventListener('resize', setVhProperty);