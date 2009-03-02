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
  var heading = '<h3>' + json.value.title + '</h3>';
  for (i=0;i<json.count;i++) {
    itemList += make_feed_item(json.value.items[i], i);
  }
  return heading + itemList;
}

function make_feed_item(item, item_id) {
	return '<span>' + item.pubDate  + '</span>' +
		'<h4><a href="' + item.link + '">' + item.title + '</a></h4>' + 
		'<div class="item-info">' + item.description + '</div>';
}
