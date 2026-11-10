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
    const phoneNumber = '569XXXXXXXX';

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

    // Diseño de muestra: este botón ya no pide ni envía la ubicación.
    const geoDemo = document.getElementById('geoDemo');
    btnWhatsapp.addEventListener('click', () => {
        geoLoading.classList.add('d-none');
        geoError.classList.add('d-none');
        if (geoDemo) geoDemo.classList.remove('d-none');
        if (geoModal) {
            geoModal.show();
        }
    });
});
