// SHUFFLE BETWEEN BACKGROUNDS UPON LOADING THE PAGE
function selectBackground() {
    const backgrounds = [
        "images/backgrounds/Canada, Manitoba, Wapusk National Park, aurora borealis.jpg",
        "images/backgrounds/Manila Skyline at Night.jpg",
        "images/backgrounds/Tarantula nebula.jpg",
        "images/backgrounds/China, Guangxi, rice fileds and mountains, sunset.jpg",
        "images/backgrounds/Sunset over the swamp, Okavango Delta, Botswana.jpg",
        "images/backgrounds/Flower Near Stream.jpg",
        "images/backgrounds/Kenya, Meru NP, desert date tree (Balanites aegyptiaca) in savannah.jpg",
        "images/backgrounds/light dock with dinner's  table.jpg",
        "images/backgrounds/Red gerbera (Gerbera sp.) flower, close-up.jpg",
        "images/backgrounds/Sunflower and blue sky.jpg",
        "images/backgrounds/TREE AT THE FOUR SEASONS IN SUMMER.jpg",
        "images/backgrounds/USA, Pennsylvania, field near site of Pickett's Charge.jpg"
    ];

    const element = document.getElementsByTagName("body")[0];
    const randomBg =  backgrounds[Math.floor(Math.random() * backgrounds.length)];
    element.style.backgroundImage = `url("${randomBg}")`;
}

// NAVIGATION BAR SHRINK ON SCROLL
function handleNavbarScroll() {
    const nav = document.querySelector('nav');
    const scrollThresholdAddScroll = 100; // Start shrinking after scrolling 100px
    const scrollThresholdRemoveScroll = 50; // Remove shrinking when scrolling back above 50px (hysteresis to prevent flickering)
    let isScrolled = false;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (!isScrolled && scrollY > scrollThresholdAddScroll) {
            nav.classList.add('nav-scrolled');
            isScrolled = true;
        } else if (isScrolled && scrollY < scrollThresholdRemoveScroll) {
            nav.classList.remove('nav-scrolled');
            isScrolled = false;
        }
    });
}

selectBackground();

// SMOOTH SCROLLING FOR NAVBAR LINKS
function handleSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Handle home link (just "#")
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetId = href.substring(1); // Remove the "#" symbol from what is in the "href" attribute
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Get navbar height to offset scroll position
                const nav = document.querySelector('nav');
                const navHeight = nav.offsetHeight;
                
                // Calculate target position with offset
                const targetPosition = targetElement.offsetTop - navHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: Math.max(0, targetPosition), // Ensure we don't scroll to negative position
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize navbar scroll handler when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        handleNavbarScroll();
        handleSmoothScroll();
    });
} else {
    handleNavbarScroll();
    handleSmoothScroll();
}