
//////////////////////////////////////////////////////////////////////////
// START of Preloader:
//////////////////////////////////////////////////////////////////////////
$(document).ready( function() { // makes sure the whole site is loaded 
  $(".sk-folding-cube").delay(3300).fadeOut(); // will first fade out the loading animation 
  $("#preload-container").delay(3800).fadeOut('slow'); // will fade out the white DIV that covers the website. 
  $("body").delay(3800).css({"overflow":"visible"});
//end of Preloader

//////////////////////////////////////////////////////////////////////////
  // START of Materialize JS 
//////////////////////////////////////////////////////////////////////////
  $(".button-collapse").sideNav();
  $(".parallax").parallax();

//Logic for nav "smooth scrolling":
  $("a").on('click', function(event) {
      // Fail Safe -> ensuring "this.hash" has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // If passes test (has a string value -> will store hash.
        var hash = this.hash;

        // Use jQuery's animate() method to add smooth page scroll
        $('html, body').animate({
          scrollTop: $(hash).offset().top // Number (800) specifies the number of milliseconds it takes to scroll to the specified area
        }, 800, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      }
    });
  //end of logic for smooth scrolling (nav)

  $('#download-button').click(function() {
  });

  $('.carousel').carousel({ dist: -75, shift: 50 }); //{ dist: "-75", duration: "100", fullWidth: true  }
  autoplay();

  function autoplay() {
      $('.carousel').carousel('next');
      setTimeout(autoplay, 3500);
  }

  $("#carousel-container").mouseover(function(){
     // $('.carousel').carousel('pause');
  });

  $("#carousel-container").mouseout(function(){
     // autoplay();
  });

  $(".services").scroll(function(){
    $("h4").fadeIn();
    $("h6").fadeIn();
});
  //end of Materialize js animations
//////////////////////////////////////////////////////////////////////////
  // START of Hobbies Carousel logic
//////////////////////////////////////////////////////////////////////////
$(function(){
        var scroller = $('#scroller div.innerScrollArea');
        var scrollerContent = scroller.children('ul');
        scrollerContent.children().clone().appendTo(scrollerContent);
        var currentX = 0;
        scrollerContent.children().each(function(){
            var $this = $(this);
            $this.css('left', currentX);
            currentX += $this.outerWidth(true);
        });
        var fullW = currentX / 2;
        var viewportW = scroller.width();

        // Scrolling speed management
        var controller = {currentSpeed:0, fullSpeed:1.5};
        var $controller = $(controller);
        var newSpeed = function(newSpeedX, duration)
        {
            if (duration === undefined)
                duration = 600;
            $controller.stop(true).animate({currentSpeed:newSpeedX}, duration);
        };

        // Pause on hover
        scroller.hover(function(){
            newSpeed(0);
        }, function(){
            newSpeed(controller.fullSpeed);
        });

        // Scrolling management; start the automatical scrolling
        var doScroll = function()
        {
            var currentX = scroller.scrollLeft();
            var newX = currentX + controller.currentSpeed;
            if (newX > fullW*2 - viewportW)
                newX -= fullW;
            scroller.scrollLeft(newX);
        };
        setInterval(doScroll, 20);
        newSpeed(controller.fullSpeed);
    });
  //end of Hobbies Carousel logic

//////////////////////////////////////////////////////////////////////////
  // START of nav scroll animation
//////////////////////////////////////////////////////////////////////////
    var scrollTop = 0;
    $(window).scroll(function(){
      scrollTop = $(window).scrollTop();
       $(".counter").html(scrollTop);
      
      if (scrollTop >= 100) {
        $("#global-nav").addClass("scrolled-nav");
      } else if (scrollTop < 100) {
        $("#global-nav").removeClass("scrolled-nav");
      }   
    }); 
//end of nav scroll animation

//////////////////////////////////////////////////////////////////////////
  // START of nav tracker animation
//////////////////////////////////////////////////////////////////////////
    var nav = $("#global-nav");

    function activeSection(current) {
      nav.find("a").removeClass("active");
      nav.find("a[href='#" + $(current).attr("id") + "']").addClass("active");
    }

  //end of nav tracker animation

//////////////////////////////////////////////////////////////////////////
  // Start Word Carousel Animation
//////////////////////////////////////////////////////////////////////////
  window.onload = function() {
    const elements = document.getElementsByClassName('txt-rotate');
    for (let i=0; i<elements.length; i++) {
      let toRotate = elements[i].getAttribute('data-rotate');
      let period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
  };

  const TxtRotate = function(element, toRotate, period) {
    this.toRotate = toRotate;
    this.element = element;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function() {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.element.innerHTML = '<span class="wrap">'+this.txt+'</span>';
    let that = this;
    let delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function() {
      that.tick();
    }, delta);
  };
// End Word Carousel Animation


//////////////////////////////////////////////////////////////////////////
  // Start Video Control Logic >> currently in the index.html script tag section <<
//////////////////////////////////////////////////////////////////////////
  // const video = $("#video-player").get(0);

  // function startVideo() {
  //   setTimeout( function() {
  //     video.play()
  //   }, 2000 );
  // };  
  // var playMode = false; // switch

  // function videoMode() {
  //   if (playMode === true) {
  //     playMode = false; // turn switch off
  //     video.pause();
  //   }
  //   else {
  //     playMode = true; // turn swtich on
  //     video.play();
  //   }
  // };
// End Vidoe Control Logic

//HTML5 Video Scroll Logic
////////////////////////////////
var currentWindow = $( window ); // The CURRENT window Object.
var featuredMedia = $( "#video-player" ); // The Video Container.
var featuredVideo = $( "#featured-video" ); // The Video Source.
 
var topPosition = featuredMedia.offset().top; // Define the video position from the top of the document;
var offset = Math.floor( topPosition + ( featuredMedia.outerHeight() / 2 ) ); // Create offset.


currentWindow
  .on( "resize", function() {
    top = featuredMedia.offset().top;
    offset = Math.floor( top + ( featuredMedia.outerHeight() / 2 ) );
})
// .on( "scroll", function() {
//   featuredVideo.addClass( "is-sticky",
//      currentWindow.scrollTop() > offset && playMode === true
//   );
// });

// End Video Control Logic

//////////////////////////////////////////////////////////////////////////
  // Start Card Materialize Icon
//////////////////////////////////////////////////////////////////////////
  function viewCard() {
    console.log("clicked the viewcard");
    // $(".viewCard").hide();
    $(".cardTitle").hide();
    // $(".closeCard").show();
  };

  function closeCard() {
    // $(".viewCard").show();
    $(".cardTitle").show();
    // $(".closeCard").hide();
  };
  // End Card Materialize Icon

});// end of document ready

//////////////////////////////////////////////////////////////////////////
// Start Timeline Animation
//////////////////////////////////////////////////////////////////////////
  (function timeline () {
    // define variables
    var items = document.querySelectorAll(".timeline li");

    // check if an element is in viewport
    // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function callbackFunc() {
      for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("in-view");
        }
      }
    }

    // listen for events
    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);

  })();

//////////////////////////////////////////////////////////////////////////
// Start ScrollFire Animation
//////////////////////////////////////////////////////////////////////////
    // var options = [
    //   {selector: '#toast-stagger', offset: 50, callback: function(element) { //.toast-stagger >> make it a class instead?
    //     Materialize.toast("It's a pleasure to meet you!", 1500, rounded );
    //   } },
    //   {selector: '#toast-stagger', offset: 205, callback: function(element) {
    //     Materialize.toast("Thanks for listening to my story.", 1500, rounded );
    //   } },
    //   {selector: '#toast-stagger', offset: 350, callback: function(element) {
    //     Materialize.toast("I hope to hear your story over coffee quite soon!", 1500, rounded );
    //   } },
    //   {selector: '.staggered-animation', offset: 400, callback: function(gif) {
    //     Materialize.showStaggeredList($(gif));
    //   } },
    //   {selector: '#image-animation', offset: 500, callback: function(picture) {
    //     Materialize.fadeInImage($(picture));
    //   } }
    // ];
    // Materialize.scrollFire(options);
  // End ScrollFire Animation

//END OF DOCUMENT:
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////