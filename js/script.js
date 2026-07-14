document.addEventListener('DOMContentLoaded', () => {
    // Floating WhatsApp Button Element
    const btnWhatsapp = document.getElementById('btnWhatsapp');
    
    // Modal Elements
    const geoModalElement = document.getElementById('geoModal');
    let geoModal = null;
    
    // Initialize bootstrap modal if available
    if (typeof bootstrap !== 'undefined') {
        geoModal = new bootstrap.Modal(geoModalElement, {
            backdrop: 'static',
            keyboard: false
        });
    }

    const geoLoading = document.getElementById('geoLoading');
    const geoError = document.getElementById('geoError');
    const btnProceedWhatsApp = document.getElementById('btnProceedWhatsApp');
    
    // Titán 24/7 WhatsApp Number (Fictional for this project)
    const phoneNumber = '56912345678';

    /**
     * Opens WhatsApp in a new tab with the pre-filled message
     * @param {string} message The text to send
     */
    function openWhatsApp(message) {
        if (geoModal) {
            geoModal.hide();
        }
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url, '_blank');
    }

    // Manual fallback for location rejection
    btnProceedWhatsApp.addEventListener('click', () => {
        openWhatsApp("¡Hola Titán! Necesito una grúa. Estoy en: [ESCRIBE TU DIRECCIÓN AQUÍ]");
    });

    // Geolocation trigger logic
    btnWhatsapp.addEventListener('click', () => {
        // Reset modal UI to loading state
        geoLoading.classList.remove('d-none');
        geoError.classList.add('d-none');
        
        if (geoModal) {
            geoModal.show();
        }

        // Check if browser supports Geolocation API
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                // Success Callback
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    
                    // Create Maps link
                    const mapsLink = `https://www.google.com/maps?q=${lat},${lon}`;
                    const message = `¡Hola Titán! Necesito una grúa urgente. Mi ubicación aproximada es:\n${mapsLink}`;
                    
                    openWhatsApp(message);
                },
                // Error Callback (Denied, Timeout, or Unavailable)
                (error) => {
                    console.warn(`Geolocation Error (${error.code}): ${error.message}`);
                    // Show error state in modal
                    geoLoading.classList.add('d-none');
                    geoError.classList.remove('d-none');
                },
                // Geolocation Options
                {
                    enableHighAccuracy: true,
                    timeout: 8000, // 8 seconds before timing out
                    maximumAge: 0
                }
            );
        } else {
            // Geolocation not supported at all
            console.warn("Geolocation is not supported by this browser.");
            geoLoading.classList.add('d-none');
            geoError.classList.remove('d-none');
        }
    });
});
