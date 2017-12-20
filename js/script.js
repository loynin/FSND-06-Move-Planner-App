//Here's your API Key for the Article Search API: ec202935015943daa3b5e015e4d9f8e9


function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
	var streetStr = $('#street').val();
	var cityStr = $('#city').val();
	var address = streetStr + ', ' + cityStr;
	
	$greeting.text('So, do you want to live at ' + address + '?');
	var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address +'';
	var strImage = '<img class="bgimg" src="'  + streetviewUrl + '">';
	$body.append(strImage);
    // YOUR CODE GOES HERE!
    
	// Your NY Time AJAX request goes here
	var nytimeUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=ec202935015943daa3b5e015e4d9f8e9'
	
	$.getJSON(nytimeUrl, function(data){
		$nytHeaderElem.text('New York Time Article About ' + cityStr);
		articles = data.response.docs;
		for (var i = 0; i < articles.length; i++){
			var article = articles[i];
			$nytElem.append('<li class="article">' +
			'<a href="' + article.web_url + '">' + 
			article.headline.main + '</a>' + 
			'<p>' + article.snippet + '</p>' +
			'</li>');
		};
	}).error(function(e){
		$nytHeaderElem.text('New York Time Articles Could Not Be Loaded');
	})

	
    return false;
};

$('#form-container').submit(loadData);
