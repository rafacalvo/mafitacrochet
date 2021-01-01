// Go Top button
//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
   scrollFunction()
};

function scrollFunction() {
   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
   } else {
      mybutton.style.display = "none";
   }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


// Auto slideshow
var slideIndex = 1;

var myTimer;

var slideshowContainer;

window.addEventListener("load",function() {
      showSlides(slideIndex);
      myTimer = setInterval(function(){
         plusSlides(1)
      }, 4000);

      //COMMENT OUT THE LINE BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
      // slideshowContainer = document.getElementsByClassName('slideshow-inner')[0];

      //UNCOMMENT OUT THE LINE BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
      slideshowContainer = document.getElementsByClassName('slideshow-container')[0];

      slideshowContainer.addEventListener('mouseenter', pause)
      slideshowContainer.addEventListener('mouseleave', resume)
})

// NEXT AND PREVIOUS CONTROL
function plusSlides(n){
   clearInterval(myTimer);
   if (n < 0){
      showSlides(slideIndex -= 1);
   } else {
   showSlides(slideIndex += 1);
   }

   //COMMENT OUT THE LINES BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME

   if (n === -1){
      myTimer = setInterval(function(){plusSlides(n + 2)}, 4000);
   } else {
      myTimer = setInterval(function(){plusSlides(n + 1)}, 4000);
   }
}

//Controls the current slide and resets interval if needed
function currentSlide(n){
   clearInterval(myTimer);
   myTimer = setInterval(function(){plusSlides(n + 1)}, 4000);
   showSlides(slideIndex = n);
}

function showSlides(n){
   var i;
   var slides = document.getElementsByClassName("slide");
   var dots = document.getElementsByClassName("dot");
   if (n > slides.length) {slideIndex = 1}
   if (n < 1) {slideIndex = slides.length}
   for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
   }
   for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
   }
   slides[slideIndex-1].style.display = "block";
   dots[slideIndex-1].className += " active";
}

pause = () => {
   clearInterval(myTimer);
}

resume = () =>{
   clearInterval(myTimer);
   myTimer = setInterval(function(){plusSlides(slideIndex)}, 4000);
}


// Gallery
var gallery = document.querySelector('#gallery');

var getVal = function (elem, style) {
   return parseInt(window.getComputedStyle(elem).getPropertyValue(style));
};

var getHeight = function (item) {
   return item.querySelector('.content').getBoundingClientRect().height;
};

var resizeAll = function () {
   var altura = getVal(gallery, 'grid-auto-rows');
   var gap = getVal(gallery, 'grid-row-gap');
   gallery.querySelectorAll('.gallery-item').forEach(function (item) {
      var el = item;
      el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
   });
};

gallery.querySelectorAll('img').forEach(function (item) {
   item.classList.add('byebye');
   if (item.complete) {
      console.log(item.src);
   }
   else {
      item.addEventListener('load', function () {
         var altura = getVal(gallery, 'grid-auto-rows');
         var gap = getVal(gallery, 'grid-row-gap');
         var gitem = item.parentElement.parentElement;
         gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
         item.classList.remove('byebye');
      });
   }
});

window.addEventListener('resize', resizeAll);

gallery.querySelectorAll('.gallery-item').forEach(function (item) {
   item.addEventListener('click', function () {
      item.classList.toggle('full');
   });
});

