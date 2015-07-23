$(function() {

  // `mainController` holds shared site functionality
  var mainController = {

    // compile underscore template for nav links
    navTemplate: _.template($('#nav-template').html()),

    // get current (logged-in) user
    showCurrentUser: function() {
      // AJAX call to server to GET /api/users/current
      $.get('/api/users/current', function(user) {
        console.log(user);

        // pass current user through template for nav links
        $navHtml = $(mainController.navTemplate({currentUser: user}));

        // append nav links HTML to page
        $('#nav-links').append($navHtml);
      });
    }
      $('#signup').on('submit', function(event) {
        event.preventDefault();

        // $.ajax({
        //     type: 'POST',
        //     url: '/api/users',
        //     data: {
        //         user: {
        //             name: $('#name').val(),
        //             email: $('#email').val(),
        //             password: $('#password').val()
        //         }
        //     },
        //     success: function(data) {
        //         window.location = '/gallery';
        //     },
        //     error: function(jqXHR, textStatus, errorThrown) {
        //         alert('Invalid input');
        //     }
        // });
        
        // $('#login').on('submit', function(event) {
        // event.preventDefault();

        // $.ajax({
        //     type: 'POST',
        //     url: '/api/users',
        //     data: {
        //         user: {
        //             name: $('#name').val(),
        //             email: $('#email').val(),
        //             password: $('#password').val()
        //         }
        //     },
        //     success: function(data) {
        //         window.location = '/gallery';
        //     },
        //     error: function(jqXHR, textStatus, errorThrown) {
        //         alert('Invalid input');
        //     }
        // });

  mainController.showCurrentUser();

});

