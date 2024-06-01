// <!-- Initialize the carousel component -->
function toggleButton(buttonNumber) {
    const btn1 = document.querySelector('.btn1');
    const btn2 = document.querySelector('.btn2');

    if (buttonNumber === 1) {
      btn1.classList.add('active');
      btn2.classList.remove('active');
    } else if (buttonNumber === 2) {
      btn2.classList.add('active');
      btn1.classList.remove('active');
    }
  }
  var myCarousel = document.querySelector('#myCarousel')
  var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 3000, // Set the interval (in milliseconds) for automatic slide transitions
    wrap: true // Enable continuous looping of slides
  });
  
  window.addEventListener('DOMContentLoaded', () => {
    function handleScreenResize() {
      const wishlistBadge = document.querySelector('.notification-badge-wishlist');
      const cartBadge = document.querySelector('.notification-badge-cart');
  
      if (window.innerWidth < 500) {
        alert("hello")
        wishlistBadge.parentElement.style.display = 'none';
        cartBadge.parentElement.style.display = 'none';
      } else {
        wishlistBadge.parentElement.style.display = 'inline-block';
        cartBadge.parentElement.style.display = 'inline-block';
      }
    }
  
    // Initial check on page load
    handleScreenResize();
  
    // Listen for window resize events
    window.addEventListener('resize', handleScreenResize);
  });
  

  