document.addEventListener('DOMContentLoaded', function() {
    // Venue data
    const venues = [
        {
            name: "The Grand Ballroom",
            image: "images/venue-1.jpg",
            location: "Downtown",
            capacity: "300",
            price: "$3,500",
            type: "ballroom",
            badge: "Popular"
        },
        {
            name: "Garden Terrace",
            image: "images/venue-2.jpg",
            location: "Hillside",
            capacity: "150",
            price: "$2,800",
            type: "garden",
            badge: "New"
        },
        {
            name: "Lakeside Resort",
            image: "images/venue-3.jpg",
            location: "Waterfront",
            capacity: "200",
            price: "$4,200",
            type: "hotel",
            badge: "Luxury"
        },
        {
            name: "Urban Loft",
            image: "images/venue-4.jpg",
            location: "Downtown",
            capacity: "120",
            price: "$2,500",
            type: "loft"
        },
        {
            name: "Vineyard Estate",
            image: "images/venue-5.jpg",
            location: "Countryside",
            capacity: "250",
            price: "$3,800",
            type: "estate"
        },
        {
            name: "Rooftop Pavilion",
            image: "images/venue-6.jpg",
            location: "Downtown",
            capacity: "100",
            price: "$3,000",
            type: "rooftop"
        }
    ];

    // Vendor data
    const vendors = {
        catering: [
            {
                name: "Gourmet Delights",
                logo: "images/vendor-1.jpg",
                specialty: "Fine Dining",
                rating: 5,
                price: "$75 per person"
            },
            {
                name: "Taste of Home",
                logo: "images/vendor-2.jpg",
                specialty: "Comfort Food",
                rating: 4,
                price: "$55 per person"
            },
            {
                name: "Global Cuisine",
                logo: "images/vendor-3.jpg",
                specialty: "International",
                rating: 5,
                price: "$65 per person"
            }
        ],
        photography: [
            {
                name: "Timeless Moments",
                logo: "images/vendor-4.jpg",
                specialty: "Weddings",
                rating: 5,
                price: "$2,500 package"
            },
            {
                name: "Urban Lens",
                logo: "images/vendor-5.jpg",
                specialty: "Corporate",
                rating: 4,
                price: "$1,800 package"
            }
        ],
        florists: [
            {
                name: "Blooms & Buds",
                logo: "images/vendor-6.jpg",
                specialty: "Wedding Florals",
                rating: 5,
                price: "From $1,200"
            },
            {
                name: "Green Thumb",
                logo: "images/vendor-7.jpg",
                specialty: "Event Decor",
                rating: 4,
                price: "From $800"
            }
        ],
        entertainment: [
            {
                name: "Silver Sounds",
                logo: "images/vendor-8.jpg",
                specialty: "Jazz Band",
                rating: 5,
                price: "$2,000"
            },
            {
                name: "DJ MixMaster",
                logo: "images/vendor-9.jpg",
                specialty: "Wedding DJ",
                rating: 4,
                price: "$1,200"
            }
        ],
        rentals: [
            {
                name: "Event Essentials",
                logo: "images/vendor-10.jpg",
                specialty: "Furniture",
                rating: 4,
                price: "Custom Quote"
            },
            {
                name: "Luxury Linens",
                logo: "images/vendor-11.jpg",
                specialty: "Tableware",
                rating: 5,
                price: "From $500"
            }
        ]
    };

    // Populate venues
    const venuesGrid = document.querySelector('.venues-grid');
    if (venuesGrid) {
        venues.forEach(venue => {
            const venueCard = document.createElement('div');
            venueCard.className = 'venue-card';
            venueCard.innerHTML = `
                <div class="venue-image">
                    <img src="${venue.image}" alt="${venue.name}">
                    ${venue.badge ? `<div class="venue-badge">${venue.badge}</div>` : ''}
                </div>
                <div class="venue-info">
                    <h3>${venue.name}</h3>
                    <div class="venue-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${venue.location}</span>
                        <span><i class="fas fa-users"></i> ${venue.capacity} guests</span>
                    </div>
                    <div class="venue-price">Starting at ${venue.price}</div>
                    <a href="booking.html" class="btn btn-outline">View Details</a>
                </div>
            `;
            venuesGrid.appendChild(venueCard);
        });
    }

    // Vendor tabs functionality
    const vendorTabBtns = document.querySelectorAll('.vendor-tab-btn');
    const vendorTabContents = document.querySelectorAll('.vendor-tab-content');
    
    vendorTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            vendorTabBtns.forEach(b => b.classList.remove('active'));
            vendorTabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding content
            const vendorType = btn.getAttribute('data-vendor');
            document.getElementById(vendorType).classList.add('active');
            
            // Populate vendors if not already populated
            const vendorsGrid = document.querySelector(`#${vendorType} .vendors-grid`);
            if (vendorsGrid && vendorsGrid.children.length === 0) {
                vendors[vendorType].forEach(vendor => {
                    const vendorCard = document.createElement('div');
                    vendorCard.className = 'vendor-card';
                    vendorCard.innerHTML = `
                        <div class="vendor-logo">
                            <img src="${vendor.logo}" alt="${vendor.name}">
                        </div>
                        <div class="vendor-info">
                            <h3>${vendor.name}</h3>
                            <p class="vendor-meta"><i class="fas fa-star"></i> ${vendor.specialty}</p>
                            <div class="vendor-rating">
                                ${'<i class="fas fa-star"></i>'.repeat(vendor.rating)}
                            </div>
                            <p>${vendor.price}</p>
                            <a href="contact.html" class="btn-text">Contact Vendor <i class="fas fa-arrow-right"></i></a>
                        </div>
                    `;
                    vendorsGrid.appendChild(vendorCard);
                });
            }
        });
    });

    // Initialize first tab
    if (vendorTabBtns.length > 0) {
        vendorTabBtns[0].click();
    }

    // Search form functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const location = document.getElementById('location').value;
            const type = document.getElementById('type').value;
            const capacity = document.getElementById('capacity').value;
            
            // Filter venues based on search criteria
            const filteredVenues = venues.filter(venue => {
                return (!location || venue.location.toLowerCase() === location) &&
                       (!type || venue.type === type) &&
                       (!capacity || 
                           (capacity === "50" && parseInt(venue.capacity) <= 50) ||
                           (capacity === "100" && parseInt(venue.capacity) > 50 && parseInt(venue.capacity) <= 100) ||
                           (capacity === "200" && parseInt(venue.capacity) > 100 && parseInt(venue.capacity) <= 200) ||
                           (capacity === "200+" && parseInt(venue.capacity) > 200)
                       );
            });
            
            // Display filtered venues
            displayFilteredVenues(filteredVenues);
        });
    }

    // Smooth anchors (standardized)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Standardized mobile nav
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    const authButtons = document.querySelector('.auth-buttons');
    if (hamburger && mainNav) {
        const toggle = () => {
            hamburger.classList.toggle('active');
            mainNav.classList.toggle('active');
            if (authButtons) authButtons.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        };
        hamburger.addEventListener('click', toggle);
        document.addEventListener('click', (e) => {
            if (!e.target.closest('header') && mainNav.classList.contains('active')) toggle();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('active')) toggle();
        });
    }

    function displayFilteredVenues(filteredVenues) {
        const venuesGrid = document.querySelector('.venues-grid');
        if (venuesGrid) {
            venuesGrid.innerHTML = '';
            
            if (filteredVenues.length === 0) {
                venuesGrid.innerHTML = '<p class="no-results">No venues match your search criteria. Please try different filters.</p>';
            } else {
                filteredVenues.forEach(venue => {
                    const venueCard = document.createElement('div');
                    venueCard.className = 'venue-card';
                    venueCard.innerHTML = `
                        <div class="venue-image">
                            <img src="${venue.image}" alt="${venue.name}">
                            ${venue.badge ? `<div class="venue-badge">${venue.badge}</div>` : ''}
                        </div>
                        <div class="venue-info">
                            <h3>${venue.name}</h3>
                            <div class="venue-meta">
                                <span><i class="fas fa-map-marker-alt"></i> ${venue.location}</span>
                                <span><i class="fas fa-users"></i> ${venue.capacity} guests</span>
                            </div>
                            <div class="venue-price">Starting at ${venue.price}</div>
                            <a href="booking.html" class="btn btn-outline">View Details</a>
                        </div>
                    `;
                    venuesGrid.appendChild(venueCard);
                });
            }
        }
    }
});