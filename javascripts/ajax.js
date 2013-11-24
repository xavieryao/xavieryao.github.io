/*
 * 通过AJAX获取Markdown文件并解析
 */

var markdown = new Markdown.Converter();

function reload(filename){
	$.get('articles/' + filename,function(result){
		$('#content').html(markdown.makeHtml(result));
		onDocReady();
	});
}

function reloadFromMd(md){
	console.log(markdown.makeHtml(md));
	$('#content').html(markdown.makeHtml(md));
	onDocReady();
}