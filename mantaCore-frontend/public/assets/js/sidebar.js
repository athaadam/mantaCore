  document.querySelectorAll('.sidebar ul li').forEach(function(li) {
    li.addEventListener('click', function(e) {
      const link = li.querySelector('a');
      if (link) {
        // Hindari double navigation jika klik langsung pada <a>
        if (e.target !== link) {
          window.location.href = link.getAttribute('href');
        }
      }
    });
  });
