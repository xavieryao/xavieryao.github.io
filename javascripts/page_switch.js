function switchPage(page){
	var loadIcon = '<img src="images/octocat-spinner-128.gif" alt="Loading"></img><p>Loading...<br /></p>'
	$('#content').html(loadIcon);
	if(page === 'home'){
		$('#home').fadeOut('slow');
	}else{
		$('#home').fadeIn('slow');
	}
	switch(page){
		case 'home':
			reload('home.html')
			break;
		case 'content_table':
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
		reloadFromMd(md);
	});
}