fetch('/fetch-random-poem')
    .then(response => response.json())
    .then(data => {
        console.log('fetched');
        const display = document.getElementById('poem-display');
        data.poem.split('\n').forEach((element) => {
            const substring = document.createElement('p');
            console.log(element);
            substring.textContent = element;
            display.appendChild(substring);
        });
    })