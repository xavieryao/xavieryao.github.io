/*
 *  载入网页时自动执行的代码
 */
var sectionHeight = function() {
  var total    = $(window).height(),
      $section = $('section').css('height','auto');

  if ($section.outerHeight(true) < total) {
    var margin = $section.outerHeight(true) - $section.height();
    $section.height(total - margin - 20);
  } else {
    $section.css('height','auto');
  }
}

$(window).resize(sectionHeight);

$(document).ready(function(){
  $('#home').hide();
  document.cache = {};
  document.easterEggCount = 0;
  $('#logo').click(function(){
    if(document.easterEggCount == 9)
      document.easterEggCount = -1;
    document.easterEggCount ++;
    if(document.easterEggCount == Math.floor(Math.random()*10))
      switchPage('the_one');
  });
  $.get('gen/content_table.json',function(result){
    document.articles = eval(result);
    switchPage(location.hash);
  });
});


fixScale = function(doc) {

  var addEvent = 'addEventListener',
      type = 'gesturestart',
      qsa = 'querySelectorAll',
      scales = [1, 1],
      meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

  function fix() {
    meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
    doc.removeEventListener(type, fix, true);
  }

  if ((meta = meta[meta.length - 1]) && addEvent in doc) {
    fix();
    scales = [.25, 1.6];
    doc[addEvent](type, fix, true);
  }
};