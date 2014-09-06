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
        $('#search').click(function() {
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

        NowShowing();
    }
    function searchMovie(query) {
        var searchUrl = baseUrl + 'search/movie';
        $('.now-showing,.popular,.top,.upcoming').html('');
		$('.search').html('<h2 style="color:white;margin-left:30px;">SEARCHED MOVIES</h2>');
        $.get(searchUrl, {
            query: query,
            api_key: apiKey
        }, function(response) {
            displayMovies5(response);
        });
    }
	function displayMovies5(data) {
		var loop = 1;
        data.results.forEach(function(movie){
			if(loop <= 12){
				var imageSrc = config.images.base_url + config.images.poster_sizes[3] + movie.poster_path;
				var backSrc = config.images.base_url + config.images.poster_sizes[3] + movie.backdrop_path;
				var object = {
					"movie-id" : movie.id,
					"img" : imageSrc,
					"title": movie.original_title,
					"backdrop": backSrc,
					"vote": movie.vote_average,
					"release": movie.release_date
				};

				var raw = $("#Handlebars-Template").html();
				var template = Handlebars.compile(raw);
				var html = template(object);
				$('.search').append(html);
				loop++;
			}
        });
    }
	function NowShowing() {
        var nowShowingUrl = baseUrl + 'movie/now_playing';
        $('.upcoming,.popular,.top').html('');
		$('.now-showing').html('<h2 style="color:white;margin-left:30px;">NOW SHOWING</h2>');
        $.get(nowShowingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies1(response);
        });
    }
	function displayMovies1(data) {
		var loop = 1;
        data.results.forEach(function(movie){
			if(loop <= 12){
				var imageSrc = config.images.base_url + config.images.poster_sizes[3] + movie.poster_path;
				var backSrc = config.images.base_url + config.images.poster_sizes[3] + movie.backdrop_path;
				var object = {
					"movie-id" : movie.id,
					"img" : imageSrc,
					"title": movie.original_title,
					"backdrop": backSrc,
					"vote": movie.vote_average,
					"release": movie.release_date
				};

				var raw = $("#Handlebars-Template").html();
				var template = Handlebars.compile(raw);
				var html = template(object);
				$('.now-showing').append(html);
				loop++;
			}
        });
    }
	function Upcoming() {
        var upcomingUrl = baseUrl + 'movie/upcoming';
        $('.now-showing,.popular,.top').html('');
        $('.upcoming').html('<h2 style="color:white;margin-left:30px;">UPCOMING MOVIES</h2>');
        $.get(upcomingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies2(response);
        });
    }
	function displayMovies2(data) {
	var loop = 1;
	data.results.forEach(function(movie){
		if(loop <= 12){
			var imageSrc = config.images.base_url + config.images.poster_sizes[3] + movie.poster_path;
				var backSrc = config.images.base_url + config.images.poster_sizes[3] + movie.backdrop_path;
				var object = {
					"movie-id" : movie.id,
					"img" : imageSrc,
					"title": movie.original_title,
					"backdrop": backSrc,
					"vote": movie.vote_average,
					"release": movie.release_date
				};

				var raw = $("#Handlebars-Template").html();
				var template = Handlebars.compile(raw);
				var html = template(object);
				$('.now-showing').append(html);
				loop++;
		}
	});
    }
	function Popular() {
        var popularUrl = baseUrl + 'movie/popular';
        $('.now-showing,.upcoming,.top').html('');
       $('.popular').html('<h2 style="color:white;margin-left:30px;">POPULAR MOVIES</h2>');
        $.get(popularUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies3(response);
        });
    }
	function displayMovies3(data) {
		var loop = 1;
        data.results.forEach(function(movie){
			if(loop <= 12){
				var imageSrc = config.images.base_url + config.images.poster_sizes[3] + movie.poster_path;
				var backSrc = config.images.base_url + config.images.poster_sizes[3] + movie.backdrop_path;
				var object = {
					"movie-id" : movie.id,
					"img" : imageSrc,
					"title": movie.original_title,
					"backdrop": backSrc,
					"vote": movie.vote_average,
					"release": movie.release_date
				};

				var raw = $("#Handlebars-Template").html();
				var template = Handlebars.compile(raw);
				var html = template(object);
				$('.now-showing').append(html);
				loop++;
			}
        });
    }
    function TopRated() {
        var topRatedUrl = baseUrl + 'movie/top_rated';
        $('.now-showing,.upcoming,.popular').html('');
		$('.top').html('<h2 style="color:white;margin-left:30px;">TOP RATED MOVIES</h2>');
        $.get(topRatedUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies4(response);
        });
    }
	function displayMovies4(data) {
		var loop = 1;
        data.results.forEach(function(movie){
			if(loop <= 12){
				var imageSrc = config.images.base_url + config.images.poster_sizes[3] + movie.poster_path;
				var backSrc = config.images.base_url + config.images.poster_sizes[3] + movie.backdrop_path;
				var object = {
					"movie-id" : movie.id,
					"img" : imageSrc,
					"title": movie.original_title,
					"backdrop": backSrc,
					"vote": movie.vote_average,
					"release": movie.release_date
				};

				var raw = $("#Handlebars-Template").html();
				var template = Handlebars.compile(raw);
				var html = template(object);
				$('.now-showing').append(html);
				loop++;
			}
        });
    }
    function displayMovies(data) {
		var loop = 1;
        data.results.forEach(function(movie){
			if(loop <= 12){
				var imageSrc = config.images.base_url + config.images.poster_sizes[3] + movie.poster_path;
				var backSrc = config.images.base_url + config.images.poster_sizes[3] + movie.backdrop_path;
				var object = {
					"movie-id" : movie.id,
					"img" : imageSrc,
					"title": movie.original_title,
					"backdrop": backSrc,
					"vote": movie.vote_average,
					"release": movie.release_date
				};

				var raw = $("#Handlebars-Template").html();
				var template = Handlebars.compile(raw);
				var html = template(object);
				$('.now-showing').append(html);
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
                                '<a href="/view/'+movies[i].id+'">'+
                                    '<img class="img-responsive portfolio-item" src="'+poster+movies[i].poster_path+'" alt="">'+
                                '</a>'+
                                '<h5>'+
                                    '<a href="/view/'+movies[i].id+'">'+movies[i].title+'</a>'+
                                '</h5>'+
                              '</div>';
            }
            $("#similar").html(allMovies);
        });

    });
}
    initialize(setEventHandlers);

});