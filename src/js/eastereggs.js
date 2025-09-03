// Easter eggs and fun features
class EasterEggs {
  constructor() {
    this.konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];
    this.konamiIndex = 0;
    this.initialized = false;
  }
  
  init() {
    if (this.initialized) return;
    
    this.setupKonamiCode();
    this.consoleArt();
    this.initialized = true;
  }
  
  setupKonamiCode() {
    document.addEventListener('keydown', (e) => {
      // Check if the next key in the sequence was pressed
      if (e.code === this.konamiCode[this.konamiIndex]) {
        this.konamiIndex++;
        
        // If complete, trigger the effect
        if (this.konamiIndex === this.konamiCode.length) {
          this.triggerKonamiEffect();
          this.konamiIndex = 0;
        }
      } else {
        this.konamiIndex = 0;
      }
    });
  }
  
  triggerKonamiEffect() {
    // Create confetti effect
    this.createConfetti();
    
    // Show hidden badge
    this.showHiddenBadge();
    
    // Play sound (if enabled)
    this.playSuccessSound();
    
    // Show notification
    showToast('Konami code activated! You found an easter egg!', 'success');
  }
  
  createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);
    
    // Create confetti particles
    const colors = ['#00d4ff', '#ff4df4', '#87f542', '#ffb800', '#7a52ff'];
    
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%';
      confetti.style.top = '0';
      confetti.style.left = Math.random() * 100 + 'vw';
      
      confettiContainer.appendChild(confetti);
      
      // Animate the confetti
      const animation = confetti.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
      });
      
      animation.onfinish = () => confetti.remove();
    }
    
    // Remove container after animation
    setTimeout(() => {
      confettiContainer.remove();
    }, 5000);
  }
  
  showHiddenBadge() {
    // Check if badge already exists
    if (document.getElementById('konami-badge')) return;
    
    const badge = document.createElement('div');
    badge.id = 'konami-badge';
    badge.style.position = 'fixed';
    badge.style.bottom = '20px';
    badge.style.right = '20px';
    badge.style.background = 'linear-gradient(135deg, var(--primary), var(--accent))';
    badge.style.color = 'white';
    badge.style.padding = '10px 15px';
    badge.style.borderRadius = 'var(--radius)';
    badge.style.zIndex = '1000';
    badge.style.boxShadow = 'var(--shadow)';
    badge.style.fontWeight = 'bold';
    badge.textContent = 'Konami Code Master';
    
    document.body.appendChild(badge);
    
    // Auto remove after 10 seconds
    setTimeout(() => {
      badge.style.opacity = '0';
      badge.style.transition = 'opacity 1s ease';
      setTimeout(() => badge.remove(), 1000);
    }, 10000);
  }
  
  playSuccessSound() {
    // Create a simple success sound using the Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 523.25; // C5
      gainNode.gain.value = 0.1;
      
      oscillator.start();
      
      // Change frequency for a cheerful sound
      oscillator.frequency.exponentialRampToValueAtTime(1046.5, audioContext.currentTime + 0.1); // C6
      oscillator.frequency.exponentialRampToValueAtTime(1318.51, audioContext.currentTime + 0.2); // E6
      
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      console.log('Audio context not supported');
    }
  }
  
  consoleArt() {
    const art = `
    %c
    ╔══════════════════════════════════════════════════════════╗
    ║                                                          ║
    ║    _   _      _   _          ___      _       _          ║
    ║   | \\ | | ___| |_| |_ ___   / _ \\ ___| |_ __ | |_   _    ║
    ║   |  \\| |/ _ \\ __| __/ _ \\ | | | / __| | '_ \\| | | | |   ║
    ║   | |\\  |  __/ |_| ||  __/ | |_| \\__ \\ | |_) | | |_| |   ║
    ║   |_| \\_|\\___|\\__|\\__\\___|  \\___/|___/_| .__/|_|\\__, |   ║
    ║                                        |_|       |___/    ║
    ║                                                          ║
    ║                 https://netcode-atlas.dev                ║
    ║                                                          ║
    ╚══════════════════════════════════════════════════════════╝
    
    Welcome to NetCode Atlas! Explore the building blocks of the web.
    Try the Konami Code (↑↑↓↓←→←→BA) for a surprise!
    `;
    
    const styles = [
      'color: #00d4ff; font-family: "Fira Code", monospace; font-size: 10px; line-height: 1.2;'
    ];
    
    console.log(art, ...styles);
  }
}

// Initialize easter eggs
const easterEggs = new EasterEggs();
document.addEventListener('DOMContentLoaded', () => easterEggs.init());