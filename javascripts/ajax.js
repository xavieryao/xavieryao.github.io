$.get('articles/hello_world.markdown',function(result){
	$('#content').html(markdown.encode(result));
});