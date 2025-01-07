fetch('/fetch-notice')
    .then(response => response.json())
    .then(data => {
        console.log('fetched');
        const display = document.getElementById('notice-board');
        display.textContent = data.notice;
    })
