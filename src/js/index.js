$(document).ready(function () {

    $("#sidebar").mCustomScrollbar({
      theme: "minimal"
    });

    $('#sidebarCollapse').on('click', function () {
      // open or close navbar
      $('#sidebar').toggleClass('closed');
      $('#content').toggleClass('closed');
      // close dropdowns
      $('.collapse.in').toggleClass('in');
      // and also adjust aria-expanded attributes we use for the open/closed arrows
      // in our CSS
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    $('.codeCollapse').on('click', function () {
      // open or close navbar
      $('#content .text').toggleClass('closed');
      $('#content code').toggleClass('closed');
    });


    // $(window).resize(function(){
    //   var size = $('.wrapper').width();
    //   console.log(size);
    //   if ( size <= 768 ) {
        // is mobile device
        // $('#sidebar').addClass('closed');
        // $('#content').addClass('closed');

        // $('.collapse.in').addClass('in');
        // $('a[aria-expanded=true]').attr('aria-expanded', 'false');

        // $('#content .text').addClass('closed');
        // $('#content code').addClass('closed');
        // $('#content .codeCollapse').addClass('closed');
        
      // }
      // if ( size >= 769) {
        // $('#sidebar').removeClass('closed');
        // $('#content').removeClass('closed');

        // $('#content .text').removeClass('closed');
        // $('#content code').removeClass('closed');
        // $('#content .codeCollapse').removeClass('closed');
    //   }
    // });
});




