markdown = new Markdown.Converter();

sectionHeight = ->
	total      =  $(window).height()
	$section   =  $('section').css 'height','auto'

	if $section.outerHeight true < total
		margin = $section.outerHeight true - $section.height()
		$section.height total - margin - 20
	else
		$section.css 'height','auto'
	fixScale()

window.fixScale = ->
	doc = $('section')

	addEvent = 'addEventListener'
	type = 'gesturestart'
	qsa = 'querySelectorAll'
	scales = [1,1]
	meta = if qsa in doc then doc[qsa]('meta[name=viewport]') else []

	fix = ->
		meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1]
		doc.removeEventListener type,fix,true

	if (meta = meta[meta.length - 1]) and addEvent in doc
		fix()
		scales = [0.25,1.6]
		doc[addEvent] type,fix,true

$(window).resize sectionHeight

$(document).ready ->
	$('#home').hide()
	document.cache = {}
	$.get 'gen/content_table.json', (result) ->
		document.articles = eval result
		switchPage location.hash
		
switchPage = (page)->
	$('body').scrollTop 0
	page = page.replace '#',''
	loadIcon = '<div class="loadIcon" ><img src="images/octocat-spinner-64.gif" alt="Loading"></img><p>Loading...<br /></p></div>'
	$('content').html loadIcon

	if page is '' then page = 'home'
	if page is 'home'
		$('#home').fadeOut 'slow'
	else
		$('#home').fadeIn 'slow'
	switch page
		when 'home'
			ajax 'articles/home.md','home',(data)->
				$('#content').html data
				fixScale()
				$('body').scrollTop 0
				location.hash = '#home'
		when 'index'
			loadContentTable()
		else
			reload page

window.switchPage = switchPage

ajax = (url,tag,onSuccess) ->
	try
		cache = document.cache[tag]
		if cache == undefined
			request = $.get url,(data) ->
				cache = markdown.makeHtml data
				onSuccess cache
				document.cache[tag] = cache
			request.fail (jqXHR, textStatus, errThrown ) ->
				onError errThrown.toString()
		else onSuccess cache
	catch e
		onError e.toString()

onError = (def) ->
	console.error 'ERR - The zombile ate your brain!'
	console.error def
	window.location.href = '404.html'

reload = (id) ->
	id = new Number id
	page = document.articles[id]
	if page == undefined
		onError 'Page Not Found. '
		return undefined
	ajax "articles/#{page.URL}", id, (data) ->
		$('#content').html data
		$('body').scrollTop 0
		location.hash = '#' + id

loadContentTable = ->
	if not document.cache.content_table
		ct = document.articles
		md = "###Table Of Content   \n         \n"
		md = md.concat "<a href=\"javascript:switchPage('#{i}')\" >#{ct[i].title}</a>   \n" for i in [ct.length - 1 ... 0]
		document.cache.content_table = markdown.makeHtml md
	$('#content').html document.cache.content_table
	$('body').scrollTop 0
	location.hash = '#index';