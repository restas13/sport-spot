 document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.discussion');

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            const gameId = this.getAttribute('data-game-id');
            window.location.href = `/discussion/${gameId}`;
        });
    });
});
