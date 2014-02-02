markdown = new Markdown.Converter();

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
	page = document.articles[id]
	if page == undefined
		onError 'Page Not Found. '
		return undefined
	ajax 'articles/' + page.URL, id, fillContent
	fillContent = (data) ->
		$('#content').html data
		location.hash = '#' + formatId id

formatId = (id) ->
	result = id
	if result < Math.pow 10,i for i in [0..6] then result = '0' + result
	return result	