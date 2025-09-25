/**
 * Keyboard vs Mouse detection for enhanced accessibility
 * Adds appropriate classes to document body for context-aware focus styling
 */

let isUsingKeyboard = false;
let isInitialized = false;

/**
 * Initialize keyboard detection
 * Call this once when the app starts
 */
export function initializeKeyboardDetection() {
  if (isInitialized || typeof document === 'undefined') return;

  // Set initial state
  document.body.classList.add('mouse-user');

  // Detect keyboard usage
  document.addEventListener('keydown', (event) => {
    // Only consider navigation keys as keyboard usage
    const navigationKeys = [
      'Tab',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Enter',
      ' ',
      'Home',
      'End',
      'PageUp',
      'PageDown'
    ];

    if (navigationKeys.includes(event.key)) {
      setKeyboardUser(true);
    }
  });

  // Detect mouse usage
  document.addEventListener('mousedown', () => {
    setKeyboardUser(false);
  });

  // Also detect mouse movement after keyboard usage
  document.addEventListener('mousemove', (event) => {
    // Only switch to mouse if there's actual movement
    if (isUsingKeyboard && (event.movementX !== 0 || event.movementY !== 0)) {
      setKeyboardUser(false);
    }
  });

  isInitialized = true;
}

/**
 * Set the user interaction mode
 */
function setKeyboardUser(usingKeyboard: boolean) {
  if (isUsingKeyboard === usingKeyboard) return;

  isUsingKeyboard = usingKeyboard;

  if (usingKeyboard) {
    document.body.classList.add('keyboard-user');
    document.body.classList.remove('mouse-user');
  } else {
    document.body.classList.add('mouse-user');
    document.body.classList.remove('keyboard-user');
  }
}

/**
 * Get current interaction mode
 */
export function isKeyboardUser(): boolean {
  return isUsingKeyboard;
}

/**
 * Force keyboard mode (useful for testing)
 */
export function forceKeyboardMode() {
  setKeyboardUser(true);
}

/**
 * Force mouse mode (useful for testing)
 */
export function forceMouseMode() {
  setKeyboardUser(false);
}