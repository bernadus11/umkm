document.addEventListener("DOMContentLoaded", () => {
    // 1. Navbar shrink effect on scroll
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 2. Mock Add to Cart functionality
    const orderBtns = document.querySelectorAll('.order-btn, .order-btn-sm');

    // Create a toast container dynamically for modern notifications instead of default alert
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(toastContainer);

    let toastIdCounter = 0;

    orderBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const itemName = this.getAttribute('data-item');

            // Create toast element
            toastIdCounter++;
            const toastId = `cart-toast-${toastIdCounter}`;
            const toastHTML = `
                <div id="${toastId}" class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body fw-medium">
                            <i class="bi bi-check-circle-fill me-2"></i>
                            <strong>${itemName}</strong> berhasil ditambahkan ke keranjang!
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            `;

            toastContainer.insertAdjacentHTML('beforeend', toastHTML);

            const toastEl = document.getElementById(toastId);
            const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
            toast.show();

            // Remove from DOM after hide
            toastEl.addEventListener('hidden.bs.toast', () => {
                toastEl.remove();
            });
        });
    });

    // 3. Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                // Adjust for fixed navbar height
                const navHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });
});
