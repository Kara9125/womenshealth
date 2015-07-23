$(function() {

  
  var postsController = {
    
    // compile underscore template
    template: _.template($('#post-template').html()),

    // get all posts
    all: function() {
      // AJAX call to server to GET /api/posts
      $.get('/api/posts', function(allPosts) {
        console.log(allPosts);
        
        // iterate through all posts
        _.each(allPosts, function(post, index) {
          console.log(post);
          
          // pass post through underscore template
          var $postHtml = $(postsController.template(post));
          console.log($postHtml);
          
          // append post HTML to page
          $('#post-list').append($postHtml);
        });
      });
    },

    // create new post
    create: function(topicData, contentData) {
      // define object with our post data
      var postData = {topic: topicData, content: contentData};
      
      // AJAX call to server to POST /api/posts
      $.post('/api/posts', postData, function(newPost) {
        console.log(newPost);
        
        // pass post through underscore template
        var $postHtml = $(postsController.template(newPost));
        console.log($postHtml);

        // append post HTML to page
        $('#post-list').append($postHtml);
      });
    },

    setupView: function() {
      // get all existing posts and render to page
      postsController.all();

      // add submit event on new post form
      $('#new-post').on('submit', function(event) {
        event.preventDefault();
        
        // grab post type and posts from form
        var postTopic = $('#topic').val();
        var postContent = $('#content').val();

        // create new post
        postsController.create(postTopic, postContent);

        // reset the form
        $(this)[0].reset();
      });
    }
    // $("#myform").validate({
    //   submitHandler: function(form) {
    //     form.submit();
    //   }
    // }); 
  };

  postsController.setupView();

});