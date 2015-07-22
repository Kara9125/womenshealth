$(function() {

	var template = _.template($("#post-template").html());
		console.log(template);

	$.get("/api/posts", function(posts){
		console.log(posts)
		_.each(posts, function(post, index){
			console.log(post);
			var posthtml = $(template(post));
			console.log(posthtml);
			$("#post-list").append(posthtml);
		})
	});
});

