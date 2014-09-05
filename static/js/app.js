$(function() {
    // your code here
    var config;
    var baseUrl = 'http://api.themoviedb.org/3/',
        apiKey = '88cd46e481deedf9c64e2442159b9047';
		var api_key = '88cd46e481deedf9c64e2442159b9047';

    function initialize(callback) {
        $.get(baseUrl + 'configuration', {
            api_key: '88cd46e481deedf9c64e2442159b9047'
        },function(res) {
            config = res;
            console.log(config);
            callback(config);
        });
    }

    function setEventHandlers(config) {
        $('#form-search').submit(function() {
            var query = $('.input-query').val();
            searchMovie(query);
            return  false;
        });
        $('#now_playing').click(function() {
            NowShowing();
            return  false;
        });
		$('#upcoming').click(function() {
            Upcoming();
            return  false;
        });
		$('#popular').click(function() {
            Popular();
            return  false;
        });
		$('#top_rated').click(function() {
            TopRated();
            return  false;
        });

        //movieBasic("138103");
    }
    function searchMovie(query) {
        var searchUrl = baseUrl + 'search/movie';
        $('.movies-list').html('');
        $.get(searchUrl, {
            query: query,
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
	function NowShowing() {
        var nowShowingUrl = baseUrl + 'movie/now_playing';
        $('.movies-list').html('');
        $.get(nowShowingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
	function Upcoming() {
        var upcomingUrl = baseUrl + 'movie/upcoming';
        $('.movies-list').html('');
        $.get(upcomingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }function Popular() {
        var popularUrl = baseUrl + 'movie/popular';
        $('.movies-list').html('');
        $.get(popularUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
    function TopRated() {
        var topRatedUrl = baseUrl + 'movie/top_rated';
        $('.movies-list').html('');
        $.get(topRatedUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
    function displayMovies(data) {
		var loop = 1;
        data.results.forEach(function(movie){
			if(loop <= 12){
				var imageSrc = config.images.base_url + config.images.poster_sizes[3] + movie.poster_path;
				var object = {
					"movie-id" : movie.id,
					"img" : imageSrc,
					"title": movie.title
				};

				var raw = $("#Handlebars-Template").html();
				var template = Handlebars.compile(raw);
				var html = template(object);
				$('.movies-list').append(html);
				loop++;
			}
        });
    }
	function movieBasic(id){
    url = baseUrl + "movie/"+id;
    reqParam = {api_key:api_key};
    $.get(url,reqParam,function(response){
        $("#title").html(response.original_title);
        $("#overview").html(response.overview);

        url = baseUrl + "movie/"+id+"/videos";
        $.get(url,reqParam,function(response){
            var html = '<embed width="750" height="500" src="https://www.youtube.com/v/'+response.results[0].key+'" type="application/x-shockwave-flash">'
            $("#trailer").html(html);
        });

        url = baseUrl + "movie/"+id+"/credits";
        $.get(url,reqParam,function(response){
            var casts = "";
            for(var i=0;i<response.cast.length;i++){
                casts+="<li>"+response.cast[i].name+"</li>"
            }
            $("#casts").html(casts);
        });

        url = baseUrl + "movie/"+id+"/similar";
        $.get(url,reqParam,function(response){
            var movies = response.results;
            var allMovies = "";
            var poster = config.images.base_url + config.images.poster_sizes[1];
            for(var i=0;i<movies.length;i++){
                allMovies += '<div class="col-sm-3 col-xs-6">'+
                                '<a href="/movie/'+movies[i].id+'">'+
                                    '<img class="img-responsive portfolio-item" src="'+poster+movies[i].poster_path+'" alt="">'+
                                '</a>'+
                                '<h5>'+
                                    '<a href="/movie/'+movies[i].id+'">'+movies[i].title+'</a>'+
                                '</h5>'+
                              '</div>';
            }
            $("#similar").html(allMovies);
        });

    });
}
    initialize(setEventHandlers);

});