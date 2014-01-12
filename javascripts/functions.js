/*
 * 通过AJAX获取Markdown文件并解析
 */

var markdown = new Markdown.Converter();

function reload(id){
	if (document.articles[id].content == undefined){
		$.get('articles/' + document.articles[id].URL,function(result){
			document.articles[id].content = markdown.makeHtml(result);
			fillContent();
		});
	}else{
		fillContent();
	}
	function fillContent(){
		$('#content').html(document.articles[id].content);
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
			if (document.home == undefined){
				$.get('articles/home.md' ,function(result){
					document.home = markdown.makeHtml(result);
					$('#content').html(document.home);
					location.hash = '#home';	
				});			
			}else{
				$('#content').html(document.home);
				location.hash = '#home';	
			}
			break;
		case 'index':
			loadContentTable();
			break;
		default:
			reload(page);
	}
}

function loadContentTable(){
	if (document.content_table == undefined) {
		var ct = document.articles;
		var md = "###Table Of Content   \n         \n";
		for(var i = 0; i < ct.length; i++){
			md = md.concat("<a href=\"javascript:switchPage('"+ i +"')\" >"+ct[i].title+'</a>   \n');
		}
		document.content_table = markdown.makeHtml(md);
	}
	$('#content').html(document.content_table);
	location.hash = '#index';
}