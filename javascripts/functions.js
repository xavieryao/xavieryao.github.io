/*
 * 通过AJAX获取Markdown文件并解析
 */

var markdown = new Markdown.Converter();

function ajax(url,tag,onSuccess){
	try{
		if(document.cache[tag] == undefined){
			request = $.get(url,function(data){
				document.cache[tag] = markdown.makeHtml(data);;
				onSuccess(document.cache[tag]);
			});
			request.fail(function( jqXHR, textStatus, errorThrown ) {
				onError(errorThrown.toString());
			});
		}else{
			onSuccess(document.cache[tag]);
		}
	}catch(err){
		onError(err.toString());
	}
}

function onError(def){
	console.error('ERR - The zombies ate your brain!');
	console.error(def);
	window.location.href = "404.html";
}

function reload(id){
	if(document.articles[id] == undefined){
		onError('Page Not Found.');
		return;
	}
	ajax('articles/' + document.articles[id].URL,id,fillContent);
	function fillContent(data){
		$('#content').html(data);
		location.hash = '#' + formatId(id);
	}
}

function formatId(id){
	var result = id;
	for (var i = 0; i < 6; i++) {
		if(result < Math.pow(10,i))
			result = '0' + result;
	};
	return result;
}

function switchPage(page){
	page = page.replace('#','');
	var loadIcon = '<div class="loadIcon" ><img src="images/octocat-spinner-64.gif" alt="Loading"></img><p>Loading...<br /></p></div>';
	$('#content').html(loadIcon);
	if(page === '')
		page = 'home';
	if(page === 'home'){
		$('#home').fadeOut('slow');
	}else{
		$('#home').fadeIn('slow');
	}
	switch(page){
		case 'home':
			ajax('articles/home.md','home',function(data){
				$('#content').html(data);
				location.hash = '#home';	
			});
			break;
		case 'index':
			loadContentTable();
			break;
		case 'the_one':
			ajax('articles/her.md','the_one',function(data){
				$('#content').html(data);
				location.hash = '#the_one';
			});
			break;
		default:
			reload(page);
	}
}

function loadContentTable(){
	if (document.cache.content_table == undefined) {
		var ct = document.articles;
		var md = "###Table Of Content   \n         \n";
		for(var i = 0; i < ct.length; i++){
			md = md.concat("<a href=\"javascript:switchPage('"+ i +"')\" >"+ct[i].title+'</a>   \n');
		}
		document.cache.content_table = markdown.makeHtml(md);
	}
	$('#content').html(document.cache.content_table);
	location.hash = '#index';
}