
document.getElementById('upload-notice-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const noticeText = document.getElementById('notice-text').value.trim();
    const messageDiv = document.getElementById('message');
    const noticeBoard = document.getElementById('notice-board');
    
    if (!noticeText) {
        messageDiv.textContent = "Notice text cannot be empty.";
        messageDiv.style.color = "red";
        return;
    }
    fetch('/upload-notice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notice: noticeText })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            messageDiv.textContent = "Notice uploaded successfully!";
            messageDiv.style.color = "green";
            noticeBoard.textContent = noticeText;
            document.getElementById('notice-text').value = '';
        } else {
            messageDiv.textContent = "Error: " + data.message;
            messageDiv.style.color = "red";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        messageDiv.textContent = "An unexpected error occurred.";
        messageDiv.style.color = "red";
    });
});