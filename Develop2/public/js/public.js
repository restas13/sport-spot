$(document).ready(function() {
    $('.discussion-button').on('click', function() {
      const gameId = $(this).data('game-id');
      window.location.href = `/discussion/${gameId}`;
    });
  });
  
  <script src="/js/public.js"></script>