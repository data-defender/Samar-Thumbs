/* --- 1. DATA SOURCE --- */
const thumbnails = [
    { id: 1, title: "Minecraft Hardcore", cat: "gaming", img: "https://samarthumbs.odoo.com/web/image/510-8dbafc80/10%20Habits%20of%20Billioniare%202.0.webp" },
    { id: 2, title: "Millionaire Habits", cat: "vlog", img: "https://samarthumbs.odoo.com/web/image/512-22229006/Billioners%20Habits%2001.webp" },
    { id: 3, title: "Crypto Crash", cat: "finance", img: "https://samarthumbs.odoo.com/web/image/513-193f148f/01.webp" },
    { id: 4, title: "Valorant Ranked", cat: "gaming", img: "https://samarthumbs.odoo.com/web/image/527-a33131a0/44.webp" },
    { id: 5, title: "Roman History", cat: "documentary", img: "https://samarthumbs.odoo.com/web/image/525-16339f93/1.webp" },
    { id: 6, title: "Passive Income", cat: "finance", img: "https://samarthumbs.odoo.com/web/image/523-0cd86bbc/2.webp" },
    { id: 7, title: "Japan Vlog", cat: "vlog", img: "https://samarthumbs.odoo.com/web/image/526-08bfcdf0/3.webp" },
    { id: 8, title: "Tech Review", cat: "gaming", img: "https://via.placeholder.com/640x360/0f172a/fff?text=Tech+Review" },
    { id: 9, title: "GTA 6 Leaks", cat: "gaming", img: "https://via.placeholder.com/640x360/020617/fff?text=GTA6" }
];

/* --- 2. LOGIC --- */
const grid = document.getElementById('grid');
const loadBtn = document.getElementById('loadMore');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

let itemsToShow = 6;
let activeFilter = 'all';

// RENDER GRID
function render() {
    grid.innerHTML = '';
    let count = 0;

    thumbnails.forEach(item => {
        if(activeFilter !== 'all' && item.cat !== activeFilter) return;

        const isHidden = count >= itemsToShow ? 'display:none;' : '';
        
        const card = document.createElement('div');
        card.className = 'work-card hover-target';
        if(isHidden) card.style.display = 'none';
        else card.style.display = 'block';

        card.onclick = () => openLightbox(item.img);

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-image">
                    <img src="${item.img}" alt="${item.title}">
                    <div class="view-overlay">
                        <span class="view-text">Expand</span>
                    </div>
                </div>
                <div class="card-info">
                    <h3 class="card-title">${item.title}</h3>
                    <div class="card-meta">
                        <span class="tag">${item.cat}</span>
                        <span><i class="fas fa-eye"></i> ${(Math.random()*5+1).toFixed(1)}M</span>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
        count++;
    });

    // Handle Load More Visibility
    const hiddenItems = Array.from(grid.children).filter(c => c.style.display === 'none');
    loadBtn.style.display = hiddenItems.length === 0 ? 'none' : 'inline-flex';
}

// FILTER
window.filterSelection = (cat) => {
    activeFilter = cat;
    itemsToShow = 6;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    render();
}

// LOAD MORE
loadBtn.addEventListener('click', () => {
    itemsToShow += 3;
    render();
});

// LIGHTBOX LOGIC & CURSOR HANDLING
function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    // Add class to body to restore normal cursor
    document.body.classList.add('modal-open');
}

function closeLightbox() {
    lightbox.classList.remove('active');
    // Remove class to bring back custom cursor
    document.body.classList.remove('modal-open');
}

lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) closeLightbox();
});

// MOBILE MENU
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Toggle Icon
    const icon = mobileMenuBtn.querySelector('i');
    if(navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// CLOSE MOBILE MENU ON LINK CLICK
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    });
});

/* --- 3. CURSOR ANIMATION --- */
const cursor = document.getElementById('cursor');
const cursorBlur = document.getElementById('cursor-blur');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorBlur.style.left = e.clientX + 'px';
        cursorBlur.style.top = e.clientY + 'px';
    }, 80);
});

document.addEventListener('mouseover', (e) => {
    if(e.target.classList.contains('hover-target') || e.target.closest('.hover-target')) {
        document.body.classList.add('hovering');
    } else {
        document.body.classList.remove('hovering');
    }
});

// INIT
render();