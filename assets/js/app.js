//////////////////////////////////////////////////////////////////////////
// START of document ready:

$(document).ready( function() {
    $(".button-collapse").sideNav();
    $('.parallax').parallax();
    $('#download-button').click(function() {
    });

    $('.carousel').carousel({ dist: -75, shift: 20 }); //{ dist: "-75", duration: "100", fullWidth: true  }
    autoplay();

    function autoplay() {
        $('.carousel').carousel('next');
        setTimeout(autoplay, 4500);
    }

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
});
// end of document ready
//////////////////////////////////////////////////////////////////////////

// Start Word Carousel Animation
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

     
// End Video Control Logic
//////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////
// Start ScrollFire Animation
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
//////////////////////////////////////////////////////////////////////////

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