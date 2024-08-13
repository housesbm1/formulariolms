function validatePhoneNumber() {
    const input = document.getElementById('fldt20MWnVfDm3arX');
    let value = input.value.replace(/\D/g, ''); 

    if (!value.startsWith('503')) {
        value = '503' + value;
    }

    if (value.length > 11) {
        value = value.slice(0, 11);
    }

    const firstTwoDigits = value.slice(3, 5); 
    if (firstTwoDigits < "60" || firstTwoDigits > "79" || value.length < 11) {
        document.getElementById('errorMessage').style.display = 'block';
    } else {
        document.getElementById('errorMessage').style.display = 'none';
    }

    input.value = '+503 ' + value.slice(3); 
}

document.getElementById('contactForm').addEventListener('submit', function(event) {
    const input = document.getElementById('fldt20MWnVfDm3arX');
    const value = input.value.replace(/\D/g, '');

    if (value.length !== 11 || value.slice(3, 5) < "60" || value.slice(3, 5) > "79") {
        event.preventDefault(); 
        document.getElementById('errorMessage').style.display = 'block';
    } else {
        document.getElementById('errorMessage').style.display = 'none';
        const iframe = document.getElementById('hidden_iframe');
        iframe.onload = function() {
            iframeLoaded(); 
        };
    }
});

function iframeLoaded() {
    const form = document.getElementById('contactForm');
    const confirmationMessage = document.getElementById('confirmationMessage');

    if (form.style.display !== 'none') {
        confirmationMessage.style.display = 'block';
        form.style.display = 'none'; 
    }
}
