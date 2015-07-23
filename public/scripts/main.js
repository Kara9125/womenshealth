$(function() {

    $.get("/api/me", function(data){
        console.log(data)
        if (data == null){
            console.log("user not logged in")
            } else {
            console.log("user logged in")
        }
    });

    $('#signup-form').submit(function(e) {
        e.preventDefault();
        console.log("you just clicked me");
        
        var user = {
            email: $('#signup-email').val(),
            password: $('#singup-password').val() 
        };

        $.post("/api/users", user, function(data){
            console.log(data)
            $('#signup-modal').modal('hide');

        }).fail(function(data){
            //ERROR
        });

    });

    $('#login-form').submit(function(e) {
        e.preventDefault();
        console.log("you just clicked me");
        
        var user = {
            email: $('#login-email').val(),
            password: $('#login-password').val() 
        };

        $.post("/api/users", user, function(data){
            console.log(data)
            $('#login-modal').modal('hide');
        }).fail(function(data){
            // ERROR
        });
    });

});



  // // `mainController` holds shared site functionality
  // var mainController = {

  //   // compile underscore template for nav links
  //   navTemplate: _.template($('#nav-template').html()),

  //   // get current (logged-in) user
  //   showCurrentUser: function() {
  //     // AJAX call to server to GET /api/users/current
  //     $.get('/api/users/current', function(user) {
  //       console.log(user);

  //       // pass current user through template for nav links
  //       $navHtml = $(mainController.navTemplate({currentUser: user}));

  //       // append nav links HTML to page
  //       $('#nav-links').append($navHtml);
  //     });
  //   }
      // $('#signup').on('submit', function(event) {
      //   event.preventDefault();

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

  // mainController.showCurrentUser();



