fetch('https://api.color.pizza/v1/003333')
    .then(response => response.json())
    .then(data => {
        console.log('fetched');
        const display = document.getElementById('color');
        display.textContent = data.paletteTitle;
    })
    