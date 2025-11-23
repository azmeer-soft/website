// Global data and functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Services data
const servicesData = [
    {
        id: 1,
        name: "Custom Website Development",
        category: "web",
        price: 499,
        description: "I will develop a responsive, modern website with HTML, CSS, JavaScript and backend functionality.",
        features: ["Fully responsive design", "SEO optimized", "Contact forms", "3 revisions included"],
        rating: 4.9,
        reviews: 127,
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "E-commerce Website",
        category: "web",
        price: 899,
        description: "I will create a fully functional e-commerce website with product catalog, shopping cart, and payment integration.",
        features: ["Product management", "Shopping cart", "Payment gateway integration", "Admin dashboard"],
        rating: 4.8,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "iOS App Development",
        category: "mobile",
        price: 1499,
        description: "I will develop a native iOS application with Swift, following Apple's design guidelines and best practices.",
        features: ["Native iOS development", "App Store submission", "UI/UX design", "Backend integration"],
        rating: 4.9,
        reviews: 64,
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Android App Development",
        category: "mobile",
        price: 1299,
        description: "I will create a native Android application with Kotlin/Java, optimized for performance and user experience.",
        features: ["Native Android development", "Material Design", "Google Play submission", "API integration"],
        rating: 4.7,
        reviews: 72,
        image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "Professional Logo Design",
        category: "design",
        price: 99,
        description: "I will design a unique, professional logo that represents your brand identity and values.",
        features: ["3 initial concepts", "Unlimited revisions", "Vector files", "Brand guidelines"],
        rating: 4.9,
        reviews: 215,
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        name: "Social Media Graphics Kit",
        category: "design",
        price: 149,
        description: "I will create a complete set of social media graphics including posts, stories, covers and ads.",
        features: ["15 social media posts", "10 story templates", "Profile & cover images", "Brand consistency"],
        rating: 4.8,
        reviews: 132,
        image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

// Apps data
const appsData = [
    {
        id: 1,
        name: "TaskMaster Pro",
        description: "Productivity app with advanced task management",
        icon: "fas fa-tasks",
        platform: "iOS & Android",
        price: "Free",
        rating: 4.8
    },
    {
        id: 2,
        name: "FinanceTracker",
        description: "Personal finance management made easy",
        icon: "fas fa-chart-pie",
        platform: "iOS & Android",
        price: "$4.99",
        rating: 4.6
    },
    {
        id: 3,
        name: "HealthMonitor",
        description: "Track your health metrics and workouts",
        icon: "fas fa-heartbeat",
        platform: "iOS & Android",
        price: "Free",
        rating: 4.9
    },
    {
        id: 4,
        name: "TravelCompanion",
        description: "Your ultimate travel planning assistant",
        icon: "fas fa-plane",
        platform: "iOS & Android",
        price: "$2.99",
        rating: 4.7
    }
];

// Blog data
const blogData = [
    {
        id: 1,
        title: "The Future of Web Development in 2023",
        excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
        date: "June 15, 2023",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Web Development"
    },
    {
        id: 2,
        title: "Mobile App Design Best Practices",
        excerpt: "Key principles for creating intuitive and engaging mobile app interfaces.",
        date: "May 28, 2023",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Mobile Apps"
    },
    {
        id: 3,
        title: "SEO Strategies for 2023",
        excerpt: "Updated SEO techniques to improve your website's visibility and ranking.",
        date: "April 12, 2023",
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Digital Marketing"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    initializePage();
    setupEventListeners();
});

// Initialize page-specific functionality
function initializePage() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    
    switch(page) {
        case 'services.html':
            loadServices();
            break;
        case 'ourapps.html':
            loadApps();
            break;
        case 'blog.html':
            loadBlogPosts();
            break;
        case 'cart.html':
            loadCart();
            break;
        case 'login.html':
        case 'signup.html':
            setupAuthForms();
            break;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Service tabs functionality
    const serviceTabs = document.querySelectorAll('.service-tab');
    if (serviceTabs.length > 0) {
        serviceTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                serviceTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                filterServices(category);
            });
        });
    }

    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
            const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            
            addToCart(id, name, price);
            showNotification('Item added to cart successfully!');
        }
    });

    // Remove from cart
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('cart-item-remove') || e.target.closest('.cart-item-remove')) {
            const button = e.target.classList.contains('cart-item-remove') ? e.target : e.target.closest('.cart-item-remove');
            const id = button.getAttribute('data-id');
            removeFromCart(id);
        }
    });
}

// Cart functionality
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateCartStorage();
    updateCartCount();
    
    if (window.location.pathname.includes('cart.html')) {
        loadCart();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartStorage();
    updateCartCount();
    loadCart();
}

function updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

function loadCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        if (cartTotal) cartTotal.textContent = '$0';
        return;
    }
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${servicesData.find(s => s.id == item.id)?.image || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    if (cartTotal) cartTotal.textContent = `$${total}`;
}

// Services functionality
function loadServices() {
    const servicesContainer = document.getElementById('services-container');
    if (!servicesContainer) return;
    
    servicesContainer.innerHTML = '';
    
    servicesData.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card fade-in';
        serviceCard.setAttribute('data-category', service.category);
        
        serviceCard.innerHTML = `
            <div class="service-image">
                <img src="${service.image}" alt="${service.name}">
            </div>
            <div class="service-info">
                <div class="service-header">
                    <h3 class="service-title">${service.name}</h3>
                    <div class="service-price">$${service.price}</div>
                </div>
                <p class="service-description">${service.description}</p>
                <ul class="service-features">
                    ${service.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
                <div class="service-footer">
                    <div class="service-rating">
                        <i class="fas fa-star"></i>
                        <span>${service.rating} (${service.reviews})</span>
                    </div>
                    <button class="btn btn-primary add-to-cart" data-id="${service.id}" data-name="${service.name}" data-price="${service.price}">Add to Cart</button>
                </div>
            </div>
        `;
        
        servicesContainer.appendChild(serviceCard);
    });
}

function filterServices(category) {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Apps functionality
function loadApps() {
    const appsContainer = document.getElementById('apps-container');
    if (!appsContainer) return;
    
    appsContainer.innerHTML = '';
    
    appsData.forEach(app => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card fade-in';
        
        appCard.innerHTML = `
            <div class="app-icon">
                <i class="${app.icon}"></i>
            </div>
            <h3>${app.name}</h3>
            <p>${app.description}</p>
            <div style="margin: 15px 0;">
                <span class="service-rating">
                    <i class="fas fa-star"></i>
                    <span>${app.rating}</span>
                </span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 15px;">
                <span>${app.platform}</span>
                <span style="font-weight: bold; color: var(--primary);">${app.price}</span>
            </div>
            <button class="btn btn-outline" style="margin-top: 15px; width: 100%;">View Details</button>
        `;
        
        appsContainer.appendChild(appCard);
    });
}

// Blog functionality
function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-container');
    if (!blogContainer) return;
    
    blogContainer.innerHTML = '';
    
    blogData.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card fade-in';
        
        blogCard.innerHTML = `
            <div class="blog-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="blog-content">
                <div class="blog-date">${post.date} | ${post.category}</div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="#" class="blog-link">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        
        blogContainer.appendChild(blogCard);
    });
}

// Auth functionality
function setupAuthForms() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (email && password) {
        currentUser = { email, name: email.split('@')[0] };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        window.location.href = 'home.html';
    }
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (name && email && password) {
        currentUser = { email, name };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        window.location.href = 'home.html';
    }
}

// Notification system
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Scroll animations
const fadeElements = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

fadeElements.forEach(element => {
    appearOnScroll.observe(element);
});
