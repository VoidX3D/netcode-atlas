// Authentication system using localStorage and SHA-256 hashing
class AuthSystem {
  constructor() {
    this.currentUser = null;
    this.usersKey = 'netcodeAtlasUsers';
    this.currentUserKey = 'netcodeAtlasCurrentUser';
    this.init();
  }
  
  init() {
    // Check if user is logged in
    const storedUser = localStorage.getItem(this.currentUserKey);
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.updateUI();
    }
  }
  
  async hashPassword(password) {
    // Encode the password as UTF-8
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    
    // Hash the password with SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convert the hash to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  }
  
  async register(email, password, name) {
    // Validate input
    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }
    
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    
    // Check if user already exists
    const users = this.getUsers();
    if (users.find(user => user.email === email)) {
      throw new Error('User with this email already exists');
    }
    
    // Hash the password
    const hashedPassword = await this.hashPassword(password);
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      passwordHash: hashedPassword,
      name,
      joined: new Date().toISOString()
    };
    
    // Save user
    users.push(newUser);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    
    // Auto login
    this.login(email, password);
    
    return newUser;
  }
  
  async login(email, password) {
    // Validate input
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    // Find user
    const users = this.getUsers();
    const user = users.find(user => user.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Verify password
    const hashedPassword = await this.hashPassword(password);
    if (user.passwordHash !== hashedPassword) {
      throw new Error('Invalid password');
    }
    
    // Set current user (without password hash)
    const { passwordHash, ...userWithoutPassword } = user;
    this.currentUser = userWithoutPassword;
    localStorage.setItem(this.currentUserKey, JSON.stringify(userWithoutPassword));
    
    this.updateUI();
    
    return userWithoutPassword;
  }
  
  logout() {
    this.currentUser = null;
    localStorage.removeItem(this.currentUserKey);
    this.updateUI();
  }
  
  getUsers() {
    const usersJSON = localStorage.getItem(this.usersKey);
    return usersJSON ? JSON.parse(usersJSON) : [];
  }
  
  updateUI() {
    const authButtons = document.querySelector('.auth-buttons');
    const userMenu = document.querySelector('.user-menu');
    
    if (!authButtons || !userMenu) return;
    
    if (this.currentUser) {
      // User is logged in
      authButtons.style.display = 'none';
      userMenu.style.display = 'block';
      
      // Update user avatar with initials
      const avatar = userMenu.querySelector('.user-avatar');
      if (avatar) {
        const initials = this.currentUser.name
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase();
        avatar.textContent = initials;
      }
      
      // Update user name in dropdown
      const userName = userMenu.querySelector('.user-name');
      if (userName) {
        userName.textContent = this.currentUser.name;
      }
    } else {
      // User is not logged in
      authButtons.style.display = 'flex';
      userMenu.style.display = 'none';
    }
  }
}

// Initialize auth system
const auth = new AuthSystem();

// Auth form handling
document.addEventListener('DOMContentLoaded', function() {
  // Login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = this.querySelector('#email').value;
      const password = this.querySelector('#password').value;
      
      try {
        await auth.login(email, password);
        showToast('Login successful!', 'success');
        
        // Redirect to home page after a short delay
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      } catch (error) {
        showToast(error.message, 'error');
      }
    });
  }
  
  // Register form
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const name = this.querySelector('#name').value;
      const email = this.querySelector('#email').value;
      const password = this.querySelector('#password').value;
      const confirmPassword = this.querySelector('#confirm-password').value;
      
      if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
      }
      
      try {
        await auth.register(email, password, name);
        showToast('Registration successful!', 'success');
        
        // Redirect to home page after a short delay
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      } catch (error) {
        showToast(error.message, 'error');
      }
    });
  }
  
  // Logout button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      auth.logout();
      showToast('Logged out successfully', 'info');
      
      // Redirect to home page
      window.location.href = 'index.html';
    });
  }
});