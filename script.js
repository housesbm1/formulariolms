document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('fldt20MWnVfDm3arX');
    const nameInput = document.getElementById('fld27J16TmkM2fYbS');
    const departamentoInput = document.getElementById('fldP8xrlP90Q4Xbfb');
    const municipioInput = document.getElementById('fldHbQFd8aAPzT0UX');
    const direccionInput = document.getElementById('fld4sAPqEz2M6XIO3');
    const errorMessage = document.getElementById('errorMessage');

    // Añadir +503 automáticamente cuando el usuario hace clic en la casilla
    phoneInput.addEventListener('focus', function() {
        let value = phoneInput.value.replace(/\D/g, '');  // Elimina cualquier carácter que no sea un dígito
        
        if (!value.startsWith('503')) {
            phoneInput.value = '+503 ';
        }
    });

    // Limitar la entrada a 8 dígitos después del prefijo
    phoneInput.addEventListener('input', function() {
        let value = phoneInput.value.replace(/\D/g, '');  // Elimina cualquier carácter que no sea un dígito

        // Mantener solo los últimos 8 dígitos
        if (value.startsWith('503')) {
            value = value.slice(3);  // Elimina el prefijo 503 de la verificación
        }

        if (value.length > 8) {
            value = value.slice(0, 8);
        }

        phoneInput.value = '+503 ' + value;  // Actualiza el campo de entrada con el formato correcto
    });

    // Función para validar campos que solo aceptan letras
    function validateTextInput(inputElement, fieldName) {
        const regex = /^[a-zA-Z\s]+$/;  // Solo letras y espacios
        if (!regex.test(inputElement.value)) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = `El campo ${fieldName} solo puede contener letras y espacios.`;
            return false;
        }
        return true;
    }

    // Función para validar dirección (máximo 30 palabras)
    function validateDireccionInput(inputElement) {
        const wordCount = inputElement.value.trim().split(/\s+/).length; // Contar palabras
        if (wordCount > 30) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = `El campo Dirección no puede tener más de 30 palabras.`;
            return false;
        }
        return true;
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            errorMessage.style.display = 'none'; // Ocultar mensaje de error al inicio

            let isValid = true;

            // Validar nombre
            if (!validateTextInput(nameInput, 'Nombre')) {
                isValid = false;
            }

            // Validar departamento
            if (!validateTextInput(departamentoInput, 'Departamento')) {
                isValid = false;
            }

            // Validar municipio
            if (!validateTextInput(municipioInput, 'Municipio')) {
                isValid = false;
            }

            // Validar dirección
            if (!validateDireccionInput(direccionInput)) {
                isValid = false;
            }

            // Validar número de teléfono
            let value = phoneInput.value.replace(/\D/g, '');  // Elimina cualquier carácter que no sea un dígito
            if (!value.startsWith('503')) {
                value = '503' + value;
            }

            if (value.length !== 11 || value.slice(3, 5) < "60" || value.slice(3, 5) > "79") {
                event.preventDefault();
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'El número de teléfono no es válido. Debe comenzar con 60-79 y tener 8 dígitos después del código 503.';
                isValid = false;
            } else {
                errorMessage.style.display = 'none';
                // Formatear el número para mostrarlo con +503
                phoneInput.value = '+503 ' + value.slice(3);

                const iframe = document.getElementById('hidden_iframe');
                iframe.onload = function() {
                    console.log('Iframe cargado');
                    iframeLoaded(); 
                };

                setTimeout(function() {
                    iframeLoaded();
                }, 3000);
            }

            // Prevenir el envío del formulario si alguna validación falla
            if (!isValid) {
                event.preventDefault();
            }
        });

        // Configurar un MutationObserver en lugar de los eventos de mutación deprecados
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    console.log('Un nodo hijo ha sido añadido o removido.');
                } else if (mutation.type === 'attributes') {
                    console.log('El atributo ' + mutation.attributeName + ' ha sido modificado.');
                }
            });
        });

        // Comienza a observar el formulario para cambios en nodos hijos y atributos
        observer.observe(contactForm, {
            childList: true,   // Observar cambios en la lista de hijos
            attributes: true,  // Observar cambios en los atributos
            subtree: true      // Observar todo el subárbol
        });
    }
});

function iframeLoaded() {
    console.log('iframeLoaded se ha ejecutado');
    const form = document.getElementById('contactForm');
    const confirmationMessage = document.getElementById('confirmationMessage');

    if (form && form.style.display !== 'none') {
        console.log('Ocultando formulario y mostrando mensaje de confirmación');
        confirmationMessage.style.display = 'block';
        form.style.display = 'none';
    } else {
        console.log('El formulario ya estaba oculto o no existe');
    }
}
