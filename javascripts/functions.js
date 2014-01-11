/*
 * 通过AJAX获取Markdown文件并解析
 */

var markdown = new Markdown.Converter();

var reload = function (filename){
	splited = filename.split('.');
	if(splited.length == 1)
		filename = filename.concat('.md');
	console.log(filename);
	$.get('articles/' + filename,function(result){
		fillContent(result,splited[0])
	});
}

var fillContent = function (md,title){
	$('#content').html(markdown.makeHtml(md));
	createSectionIndex();
	location.hash = '#' + title;
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
			reload('home.md')
			break;
		case 'index':
			loadContentTable();
			break;
		default:
			reload(page);
	}
}

function loadContentTable(){
	var ct;
	$.get('gen/content_table.json',function(result){
		ct = eval(result);
		var md = "###Table Of Content   \n         \n";
		for(var i = 0; i < ct.length; i++){
			md = md.concat("<a href=\"javascript:switchPage('"+ct[i].URL+"')\" >"+ct[i].title+'</a>   \n');
		}
		fillContent(md,'index');
	});
}