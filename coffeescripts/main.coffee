# 载入网页时自动执行的代码

sectionHeight = () ->
	total      =  $(window).height()
	$section   =  $('section').css 'height','auto'

	if $section.outerHeight true < total
		margin = $section.outerHeight true - $section.height()
		$section.height total - margin - 20
	else
		$section.css 'height','auto'
	#fixScale()

$(window).resize sectionHeight

$(document).ready () ->
	$('#home').hide()
	document.cache = {}
	document.easterEggCount = 0 
	$('#logo').click ()->
		if document.easterEggCount is 9 then document.easterEggCount = -1
		document.easterEggCount += 1
		if document.easterEggCount is Math.floor Math.random()*10
			switchPage 'the_one'
	$.get 'gen/content_table.json', (result) ->
		document.articles = eval result
		switchPage location.hash