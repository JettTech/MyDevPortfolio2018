//START OF DOCUMENT:

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
    $('.parallax').parallax();
    $('#download-button').click(function() {
    });

    $('.carousel').carousel({ dist: -75, shift: 20 }); //{ dist: "-75", duration: "100", fullWidth: true  }
    autoplay();
    function autoplay() {
        $('.carousel').carousel('next');
        setTimeout(autoplay, 3500);
    }
//end of Materialize js animations

//////////////////////////////////////////////////////////////////////////
  // START of nav scroll animation
//////////////////////////////////////////////////////////////////////////
    var scrollTop = 0;
    $(window).scroll(function(){
      scrollTop = $(window).scrollTop();
       $('.counter').html(scrollTop);
      
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
  // Start Video Control Logic
//////////////////////////////////////////////////////////////////////////
  const video = $("#video-player").get(0);
  var playMode = true; // switch

  function videoMode() {
      if (playMode === true) {
      playMode = false; // turn switch off
      video.pause();
    }
    else {
      playMode = true; // turn swtich on
      video.play();
    }
  };
// End Vidoe Control Logic

//HTML5 Video Scroll Logic
////////////////////////////////
// const currentWindow = $( window ); // The CURRNT window Object.
// const featuredMedia = $( "#video-player" ); // The Video Container.
// const featuredVideo = $( "#featured-video" ); // The Video Source.
 
// const topPosition = featuredMedia.offset().top; // Define the video position from the top of the document;
// const offset = Math.floor( topPosition + ( featuredMedia.outerHeight() / 2 ) ); // Create offset.


// currentWindow
// .on( "resize", function() {
//   top = featuredMedia.offset().top;
//   offset = Math.floor( top + ( featuredMedia.outerHeight() / 2 ) );
// })
// .on( "scroll", function() {
//   featuredVideo.toggleClass( "is-sticky",
//      currentWindow.scrollTop() > offset && featuredVideo.hasClass( "is-playing" )
//   );
//   onPlayerStateChange();
// });


//  // * Video state (play, pause, etc.) change-handlers
// function onPlayerStateChange( event ) {
 
//   const isPlay  = 1 === event.data;
//   const isPause = 2 === event.data;
//   const isEnd   = 0 === event.data;
 
//   if ( isPlay ) {
//       featuredVideo.removeClass( "is-paused" );
//       featuredVideo.toggleClass( "is-playing" );
//   }
 
//   if ( isPause ) {
//       featuredVideo.removeClass( "is-playing" );
//       featuredVideo.toggleClass( "is-paused" );
//   }
 
//   if ( isEnd ) {
//       featuredVideo.removeClass( "is-playing", "is-paused" );
//   }
// }

  // initialize jwplayer
  var playerInstance = jwplayer("player");

  // configure jwplayer instance
  playerInstance.setup({
    autostart: true,
    file: "./assets/img/movieIntro_V1.mp4",
    primary: 'html5',
    setFullscreen: true,
    width: '100%'
  });


  // player dom elements
  var playerContainerEl = document.querySelector('.player-container');

  // returns video player position from top of document
  function getElementOffsetTop(element) {
    var boundingClientRect = element.getBoundingClientRect();
    var bodyEl = document.body;
    var docEl = document.documentElement;
    var scrollTop = window.pageYOffset || docEl.scrollTop || bodyEl.scrollTop;
    var clientTop = docEl.clientTop || bodyEl.clientTop || 0;
    return Math.round(boundingClientRect.top + scrollTop - clientTop);
  }

  // returns the current y scroll position
  function getScrollTop() {
    var docEl = document.documentElement;
    return (window.pageYOffset || docEl.scrollTop) - (docEl.clientTop || 0);
  }

  // when jwplayer instance is ready
  playerInstance.on("ready", function() {
        var config = playerInstance.getConfig();
        var utils = playerInstance.utils;

        // get height of player element
        var playerHeight = config.containerHeight;

        // get player element position from top of document
        var playerOffsetTop = getElementOffsetTop(playerContainerEl);

        // set player container to match height of actual video element
        // this prevents container from disappearing and changing element positions
        // on page when player becomes minimized. this also leaves a nice visual
        // placeholder space for minimized player to return to when appropriate
        playerContainerEl.style.height = playerHeight + "px";
        play();

      ////////////////////////////////////////////////////////
        // HANDLE SCROLL EVENT (without killing performance)
        // this is a minimal approach. please consider implementing something more extensive:
        // i.e. http://joji.me/en-us/blog/how-to-develop-high-performance-onscroll-event

        // determine player display when scroll event is called
        // if inline player is no longer visible in viewport, add class
        // .player-minimize to minimize and float. otherwise, remove the class to put
        // player back to inline inline position
        function onScrollViewHandler() {
            var minimize = getScrollTop() >= playerOffsetTop;

            utils.toggleClass(playerContainerEl, "player-minimize", minimize);
            // update the player's size so the controls are adjusted
            playerInstance.resize();
        }

        // namespace for whether or not we are waiting for setTimeout() to finish
        var isScrollTimeout = false;

        // window onscroll event handler
        window.onscroll = function() {
            // skip if we're waiting on a scroll update timeout to finish
            if (isScrollTimeout) return;
            // flag that a new timeout will begin
            isScrollTimeout = true;
            // otherwise, call scroll event view handler
            onScrollViewHandler();
            // set new timeout
            setTimeout(function() {
                // reset timeout flag to false (no longer waiting)
                isScrollTimeout = false;
            }, 80);

        };

    });     
// End Video Control Logic

//////////////////////////////////////////////////////////////////////////
  // Start Card Materialize Icon
//////////////////////////////////////////////////////////////////////////
  function viewCard() {
    console.log("clicked the viewcard");
    $("#viewCard").hide();
    $("#closeCard").show();
  };

  function closeCard() {
    $("#viewCard").show();
    $("#closeCard").hide();
  };

// $("#info").on("click", function() {
//   $('#modal').modal({
//       dismissible: true, // Modal can be dismissed by clicking outside of the modal
//       opacity: .5, // Opacity of modal background
//       inDuration: 300, // Transition in duration
//       outDuration: 200, // Transition out duration
//       startingTop: '4%', // Starting top style attribute
//       endingTop: '10%', // Ending top style attribute
//       ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
//         alert("Ready");
//         console.log(modal, trigger);
//       },
//       complete: function() { alert('Closed'); } // Callback for Modal close
//   });
// })

// End Card Materialize Icon

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

});
// end of document ready

//END OF DOCUMENT:
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////











//SVG animation:
//////////////////////////////////////////////////////////////////////////
//NEED TO IMPORT SVG-SNAP INTO HTML FOR THIS ANIMATION TO FUNCTION :
//////////////////////////////////////////////////////////////////////////
// Start Word Apparence Animation
// window.onload = function () {

//   // var blue = '#2980b9';
//   var myname = Snap("#myname");

//   setTimeout( function() {
//     // modify this one line below, and see the result !
//     var logoTitle = "Hi! My Name is Lisa. Nice to meet you.";
//     var logoRandom = '';
//     var possible = "lkjhgfdsaqwertyuiiomnbvcxz";    
//     var logoTitleContainer = myname.text(0, '98%', '');
       
//     logoTitleContainer.attr({
//       fontSize: 280,
//       fontFamily: 'Satisfy',
//       fontWeight: '600'
//     });

//     function generateRandomTitle(i, logoRandom) {
//       setTimeout( function() {
//         logoTitleContainer.attr({ text: logoRandom });
//       }, i*100 ); //the time lag between each letter change
//     }

//     for( var i=0; i < logoTitle.length+1; i++ ) {
//       logoRandom = logoTitle.substr(0, i);

//       for( var j=i; j < logoTitle.length; j++ ) { 
//         logoRandom += possible.charAt(Math.floor(Math.random() * possible.length)); 
//       }
//       generateRandomTitle(i, logoRandom);
//       logoRandom = '';
//     }

//   }, 500 ); //the timeout setting (lag) prior to starting...

// }
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////