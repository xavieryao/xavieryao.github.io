function switchPage(page){
	var loadIcon = '<div class="loadIcon" ><img src="images/octocat-spinner-64.gif" alt="Loading"></img><p>Loading...<br /></p></div>';
	$('#content').html(loadIcon);
	if(page === 'home'){
		$('#home').fadeOut('slow');
	}else{
		$('#home').fadeIn('slow');
	}
	switch(page){
		case 'home':
			reload('html','home.html')
			break;
		case 'content_table':
			loadContentTable();
			break;
		default:
			reload('md',page);
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
		reload('md_text',md);
	});
}