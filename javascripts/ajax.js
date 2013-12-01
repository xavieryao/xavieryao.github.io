/*
 * 通过AJAX获取Markdown文件并解析
 */

var markdown = new Markdown.Converter();

function reload(method,content){
	switch(method){
		case 'md':
			reloadFromMdFile(content);
			break;
		case 'md_text':
			reloadFromMdText(content);
			break;
		case 'html_text':
			reloadFromHtmlText(content);
			break;
		case 'html':
			reloadFromHtmlFile(content);
			break;
	}
}

function reloadFromMdFile(filename){
	$.get('articles/' + filename,function(result){
		$('#content').html(markdown.makeHtml(result));
		createSectionIndex();
	});
}

function reloadFromMdText(md){
	$('#content').html(markdown.makeHtml(md));
	createSectionIndex();
}

function reloadFromHtmlFile(filename){
	$.get('articles/' + filename,function(result){
		$('#content').html(result);
		createSectionIndex();
	});
}

function reloadFromHtmlText(html){
	$('#content').html(markdown.makeHtml(md));
	createSectionIndex();
}