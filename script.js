document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling para la navegación
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Funcionalidad para el botón "¡Pide la tuya ya!" (el de la sección hero)
    const orderButton = document.getElementById('orderButton');
    if (orderButton) {
        orderButton.addEventListener('click', () => {
            alert('¡Gracias por tu interés! Por favor, revisa nuestra sección de contacto para hacer tu pedido o llama al 3692-2955.');
            window.location.href = '#contacto';
        });
    }

    // Funcionalidad para la sección "Crea tu Granizada Perfecta"
    const baseSelect1 = document.getElementById('baseSelect1'); // Primera base
    const baseSelect2 = document.getElementById('baseSelect2'); // Segunda base
    const sizeSelect = document.getElementById('sizeSelect');
    const toppingsCheckboxes = document.querySelectorAll('.customize-options input[type="checkbox"]');
    const customSummary = document.getElementById('customSummary');
    const granizadaPriceElement = document.getElementById('granizadaPrice');
    const buildGranizadaButton = document.getElementById('buildGranizada');
    // Ya no necesitamos 'placeOrderButton' aquí, ya que se eliminó del HTML.

    // Precios
    const BASE_PRICES = {
        '12oz': 10,
        '16oz': 12
    };
    const TOPPING_PRICE = 2; // Q2 por cada topping adicional

    function updateCustomSummaryAndPrice() {
        const selectedBase1 = baseSelect1.value;
        const selectedBase2 = baseSelect2.value; // Obtener la segunda base

        const selectedSize = sizeSelect.value;
        let selectedToppings = [];
        let numSelectedToppings = 0;
        
        toppingsCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedToppings.push(checkbox.value);
                numSelectedToppings++;
            }
        });

        // Calcular el costo de los toppings (todos son extras ahora)
        let currentToppingsCost = numSelectedToppings * TOPPING_PRICE;
        
        let totalPrice = BASE_PRICES[selectedSize] + currentToppingsCost;

        let summaryText = `Tu granizada de **${selectedBase1.charAt(0).toUpperCase() + selectedBase1.slice(1)}`;
        // Añadir la segunda base si está seleccionada y no es "ninguna"
        if (selectedBase2 !== 'ninguna') {
            summaryText += ` y ${selectedBase2.charAt(0).toUpperCase() + selectedBase2.slice(1)}`;
        }
        summaryText += `** (${selectedSize})`;

        if (selectedToppings.length > 0) {
            summaryText += ` con ${selectedToppings.join(', ')}`;
        } else {
            summaryText += ` (sin toppings)`;
        }
        summaryText += `. ¡Disfrútala!`;

        customSummary.innerHTML = summaryText;
        granizadaPriceElement.textContent = `Q${totalPrice.toFixed(2)}`;
    }

    // Función para enviar a WhatsApp (ahora solo llamada por buildGranizadaButton)
    function sendOrderToWhatsApp() {
        const selectedBase1 = baseSelect1.value;
        const selectedBase2 = baseSelect2.value; // Obtener la segunda base

        const selectedSize = sizeSelect.value;
        let selectedToppings = [];
        let numSelectedToppings = 0;

        toppingsCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedToppings.push(checkbox.value);
                numSelectedToppings++;
            }
        });

        // Calcular el costo de los toppings (todos son extras ahora)
        let currentToppingsCost = numSelectedToppings * TOPPING_PRICE;
        
        let totalPrice = BASE_PRICES[selectedSize] + currentToppingsCost;

        // Construir el mensaje para WhatsApp
        let orderMessage = `¡Hola! Me gustaría hacer un pedido de Granizada:\n`;
        orderMessage += `Base 1: ${selectedBase1.charAt(0).toUpperCase() + selectedBase1.slice(1)}\n`;
        // Añadir la segunda base al mensaje si está seleccionada y no es "ninguna"
        if (selectedBase2 !== 'ninguna') {
            orderMessage += `Base 2: ${selectedBase2.charAt(0).toUpperCase() + selectedBase2.slice(1)}\n`;
        }
        orderMessage += `Tamaño: ${selectedSize}\n`;

        if (selectedToppings.length > 0) {
            orderMessage += `Toppings elegidos: ${selectedToppings.join(', ')}\n`;
            orderMessage += `(${numSelectedToppings} toppings extras a Q${TOPPING_PRICE} c/u)\n`; // Mensaje para todos los toppings extra
        } else {
            orderMessage += `Sin toppings extras.\n`;
        }
        orderMessage += `Precio Total Estimado: Q${totalPrice.toFixed(2)}\n\n`;
        orderMessage += `Por favor, confirma mi pedido. ¡Gracias!`;

        const whatsappLink = `https://wa.me/50236922955?text=${encodeURIComponent(orderMessage)}`;
        window.open(whatsappLink, '_blank');
    }


    // Actualizar el resumen y precio cuando cambian las selecciones
    if (baseSelect1) {
        baseSelect1.addEventListener('change', updateCustomSummaryAndPrice);
    }
    if (baseSelect2) { // Listener para la segunda base
        baseSelect2.addEventListener('change', updateCustomSummaryAndPrice);
    }
    if (sizeSelect) {
        sizeSelect.addEventListener('change', updateCustomSummaryAndPrice);
    }
    toppingsCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateCustomSummaryAndPrice);
    });

    // Actualizar el resumen y precio al cargar la página
    updateCustomSummaryAndPrice();

    // Asignar la función al único botón de personalización
    if (buildGranizadaButton) {
        buildGranizadaButton.addEventListener('click', sendOrderToWhatsApp);
    }
});