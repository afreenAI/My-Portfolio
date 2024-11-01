const form = document.querySelector('.contact-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Thank you for your message!');
                form.reset();
            } else {
                alert('There was a problem sending your message. Please try again.');
            }
        });
    });