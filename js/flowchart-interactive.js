/**
 * Living Flowchart Logic - Decision Button System
 * User makes explicit choices and sees only the chosen path
 */

document.addEventListener('DOMContentLoaded', () => {
    initLivingFlow();
    attachDecisionButtons();
});

function initLivingFlow() {
    const phases = document.querySelectorAll('.phase-group');
    
    // Initial Setup: Lock all except the first one
    phases.forEach((phase, index) => {
        if (index === 0) {
            phase.classList.add('phase-active');
            phase.classList.remove('phase-locked');
        } else {
            phase.classList.add('phase-locked');
            phase.classList.remove('phase-active');
        }
    });
}

function attachDecisionButtons() {
    const decisionButtons = document.querySelectorAll('.btn-decision');
    
    decisionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            handleDecisionClick(btn);
        });
    });
}

function handleDecisionClick(button) {
    const isYes = button.classList.contains('btn-yes');
    const currentDecisionNode = button.closest('.node-decision');
    const currentPhase = button.closest('.phase-group');
    
    // Toggle Active State (Radio behavior) - DO NOT DISABLE
    const allButtons = currentDecisionNode.querySelectorAll('.btn-decision');
    allButtons.forEach(btn => {
        btn.classList.remove('active-selection');
        btn.style.opacity = '0.5';
        btn.style.transform = 'scale(1)';
        btn.style.boxShadow = 'none';
        btn.disabled = false; // Ensure always clickable
    });
    
    // Highlight the chosen button
    button.classList.add('active-selection');
    button.style.opacity = '1';
    button.style.transform = 'scale(1.05)';
    
    // Check if this is the "loop" decision (Info Correcta?)
    if (button.dataset.loop === 'true') {
        // NO was chosen - turn CARD RED + Scroll UP
        currentDecisionNode.classList.add('visual-rejection');
        showLoopFeedback();
        
        // Physical Movement: Scroll back to start
        setTimeout(() => {
            const chartContainer = document.querySelector('.arcane-flow-container');
            if (chartContainer) {
                chartContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Reset visual state after scroll
            setTimeout(() => {
                currentDecisionNode.classList.remove('visual-rejection');
                // Reset buttons since we looped back? 
                // Actually, let's keep it selected to show history, or reset?
                // For a true "reset" loop, we might want to clear selection, but let's stick to simple feedback first.
            }, 1000);
        }, 800);
        return;
    }
    
    // Handle branch-specific decisions (Verifier/Approver)
    if (button.dataset.branch) {
        handleBranchDecision(button, isYes);
        return;
    }
    
    // Default: advance to next phase (YES path)
    if (button.dataset.next) {
        // If changing mind, we might need to handle re-triggering animation?
        // For linear flow, just valid to call it again.
        setTimeout(() => {
            advanceToNextPhase(currentPhase);
        }, 500);
    }
}

function showLoopFeedback() {
    // 1. Shake the screen/container
    const wrapper = document.querySelector('.flow-viewport-wrapper');
    if(wrapper) {
        wrapper.classList.add('shake-anomaly');
        setTimeout(() => wrapper.classList.remove('shake-anomaly'), 600);
    }

    // 2. Show big visual overlay if needed, or just rely on the physical scroll
    const loopIndicator = document.querySelector('.flow-loop-indicator');
    if (loopIndicator) {
        loopIndicator.style.opacity = '1';
        loopIndicator.style.filter = 'drop-shadow(0 0 10px var(--flow-decision))';
        
        // Reset after showing feedback
        setTimeout(() => {
            const buttons = document.querySelectorAll('.btn-decision');
            buttons.forEach(b => {
                b.disabled = false;
                b.style.opacity = '';
                b.style.transform = '';
            });
            loopIndicator.style.opacity = '';
            loopIndicator.style.filter = '';
        }, 2000);
    }
}

function handleBranchDecision(button, isYes) {
    const branchType = button.dataset.branch;
    const currentDecisionNode = button.closest('.node-decision');
    const branchRow = currentDecisionNode.nextElementSibling;
    
    if (!branchRow || !branchRow.classList.contains('flow-branch-row')) {
        return;
    }
    
    const branches = branchRow.querySelectorAll('.branch-column');
    
    if (isYes) {
        // Show YES branch (first column), hide NO branch (second column)
        if (branches[0]) branches[0].style.display = 'block';
        if (branches[1]) {
            branches[1].style.display = 'none';
        }
        
        // For approver "YES", also mark the completion
        if (branchType === 'approver-yes') {
            setTimeout(() => {
                const finalPhase = document.querySelector('.phase-group:last-child');
                if (finalPhase) {
                    advanceToNextPhase(finalPhase.previousElementSibling);
                }
            }, 800);
        }
    } else {
        // Show NO branch (second column), hide YES branch (first column)
        if (branches[1]) branches[1].style.display = 'block';
        if (branches[0]) {
            branches[0].style.display = 'none';
        }
    }
    
    // Scroll to show the revealed branch
    setTimeout(() => {
        branchRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
}

function advanceToNextPhase(currentPhase) {
    const nextPhase = currentPhase.nextElementSibling;
    
    if (nextPhase && nextPhase.classList.contains('phase-group')) {
        // Mark current as completed
        currentPhase.classList.remove('phase-active');
        currentPhase.classList.add('phase-completed');
        
        // Activate next
        nextPhase.classList.remove('phase-locked');
        nextPhase.classList.add('phase-active');
        
        // Scroll to new phase
        nextPhase.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Mobile-specific: Reset zoom to fit content properly on load
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        const flowContent = document.getElementById('arcane-flow-content');
        if (flowContent && typeof flowReset === 'function') {
            flowReset();
        }
        
        const viewportWrapper = document.querySelector('.flow-viewport-wrapper');
        if (viewportWrapper) {
            viewportWrapper.scrollTop = 0;
        }
    }
}

window.addEventListener('load', optimizeForMobile);
window.addEventListener('resize', optimizeForMobile);


// Helper for manual "Next" buttons in passive phases
window.activateNextPhase = function(btnElement) {
    const currentPhase = btnElement.closest('.phase-group');
    if (currentPhase) {
        // Visual feedback on button
        btnElement.innerHTML = '<span>¡Completado!</span> <ion-icon name="checkmark-circle"></ion-icon>';
        btnElement.style.background = 'var(--flow-start)';
        btnElement.style.color = '#fff';
        btnElement.style.borderColor = 'var(--flow-start)';
        btnElement.classList.add('btn-success-anim'); // Add class for animation if needed
        
        setTimeout(() => {
            advanceToNextPhase(currentPhase);
            // Gracefully fade out instead of abrupt removal
            btnElement.style.transition = 'opacity 0.5s ease, height 0.5s ease, margin 0.5s ease';
            btnElement.style.opacity = '0';
            btnElement.style.height = '0';
            btnElement.style.margin = '0';
            btnElement.style.padding = '0';
            btnElement.style.pointerEvents = 'none';
        }, 600);
    } else {
        console.error("Living Flow: Could not find parent phase for next button");
    }
};
