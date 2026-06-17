// Print UTM Parameter Switcher
// Switches UTM parameters from 'website' to 'resume' when printing

(function() {
  const originalUrls = new Map();
  
  function updateUtmParameters(isPrint) {
    const links = document.querySelectorAll('a[href*="truf.us"]');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      
      if (isPrint) {
        // Store original URL if not already stored
        if (!originalUrls.has(link)) {
          originalUrls.set(link, href);
        }
        
        // Update UTM parameters for print
        const newHref = href
          .replace(/utm_source=website/g, 'utm_source=resume')
          .replace(/utm_medium=michaelr-xyz/g, 'utm_medium=pdf');
        
        link.setAttribute('href', newHref);
      } else {
        // Restore original URL
        if (originalUrls.has(link)) {
          link.setAttribute('href', originalUrls.get(link));
        }
      }
    });
  }
  
  // Listen for print events
  const mediaQuery = window.matchMedia('print');
  
  mediaQuery.addListener((e) => {
    updateUtmParameters(e.matches);
  });
  
  // Also listen for beforeprint/afterprint events (Chrome/Firefox)
  window.addEventListener('beforeprint', () => {
    updateUtmParameters(true);
  });
  
  window.addEventListener('afterprint', () => {
    updateUtmParameters(false);
  });
  
  // Initialize on page load
  updateUtmParameters(mediaQuery.matches);
})();
