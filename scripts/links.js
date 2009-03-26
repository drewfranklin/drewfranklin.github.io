/* global variables */
var descList = new Array();
var itemList = "";
var feed = "http://pipes.yahoo.com/pipes/pipe.run?_id=48574491c6ed476136cb3fff8be0a34d&_render=json&_callback=?"
$(document).ready(function() {
  var content = "";
  $.getJSON(feed,
   function(json){
     if(json.count > 0) {
       content = output_feed_items(json);
     } else {
       content = "The request did not return results.";
     }
     $("#links").html(content);
   }
  );
});

function output_feed_items(json) {
  var heading = '<a href="' + json.value.description + '"><h2>' + json.value.title + '</h2></a>';
  for (i=0;i<json.count;i++) {
    itemList += make_feed_item(json.value.items[i]);
  }
  return heading + itemList;
}

function make_feed_item(item) {
	return '<div class="post link"><span class="date">' + item.pubDate  + '</span>' +
		'<h3><a href="' + item.link + '">' + item.title + '</a></h3>' +
		'<div class="post-text">' + item.description + '</div></div>';
}
