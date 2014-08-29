$(function() {
    // your code here
    var config;
    var baseUrl = 'http://api.themoviedb.org/3/';
    var api_key = '88cd46e481deedf9c64e2442159b9047';


    function initialize(callback){
        console.log('initializing..');
        
        // setting required parameters of get request for configuration
        var configUrl = baseUrl+'configuration';
        var configParams = {
            api_key : api_key
        }
        var configResponse = function(response){
            config = response;
            callback(config);    
        }

        // get request for configuration (JSON object)
        $.get(configUrl , configParams, configResponse);
    }
    function setEventHandlers(config){
        //id = $('#search-query').val();
        console.log('setting event handlers..')
        
        function clearActive(){
            $(".navbar-nav > .active").removeClass('active');
        }

        // fetching DOM of search form for handling event query when submitted.
        $('#form-search').submit(function(){
            searchMovie($('#search-query').val());    // passing query to searchMovie function.
            return false;                             // return false after searchMovie, to search movies without loading the webpage.     
        });

        $('#now_showing').click(function(){
            clearActive();
            $(this).parent().addClass("active");
            loadNowShowing();
            return false;
        });

        $('#latest').click(function(){
            clearActive();
            $(this).parent().addClass("active");
            loadLatest();
            return false;
        });

        $('#upcoming').click(function(){
            clearActive();
            $(this).parent().addClass("active");
            loadUpcoming();
            return false;
        });

        $('#popular').click(function(){
            clearActive();
            $(this).parent().addClass("active");
            loadPopular();
            return false;
        });

        $('#top_rated').click(function(){
            clearActive();
            $(this).parent().addClass("active");
            loadTopRated();
            return false;
        });
		
		 $('.sypnosis').click(function(){
            clearActive();
            $(this).parent().addClass("active");
            sypnosis();
            return false;
        });
    }

    function searchMovie(query){
        
        console.log('searching..');

        // setting required parameters of get request for search
        var searchUrl = baseUrl+'search/movie';
        var searchParams = {
            api_key: api_key,
            query: query
        };
        var searchResponse = function(response){ 
            displayMovies(response);
			// for displayDetails function
			
        }; // pass data response to displayMovie function to display Movies in the page.

        // get request for searching movies (JSON object)
        $.get(searchUrl, searchParams, searchResponse);
    }

	function sypnosis(getMovId){
		$.get(
			baseUrl+'movie/'+getMovId,
			{
				api_key:api_key
			},
			function(response){
				displaySypnosis(response);
			}
		);
	}
				
    function displayMovies(data){
        $('.movie-list').html('');
        console.log('displaying movies..');
        console.log('\n\n\n')
        if(data.results.length > 0){
            data.results.forEach(function(movie){
               var poster = config.images.base_url + config.images.poster_sizes[2] + movie.poster_path;
			   var movId = movie.id;
                console.log(poster);
               /*var htmlStr = [
                               '<div class="col-md-4 col-sm-6 portfolio-item">',
                                    '<a href="#">',
                                        '<img class="img-responsive" src="' + poster + '" alt="" style="padding-left:90px;">',
                                    '</a>',
                                    '<h5 class="text-center">',
                                        '<a href="#" style="color:orange;">' + movie.title +'</a>',
                                    '</h5>',
									
                                '</div>'
                            ];*/
				//sypnosis
				$.get(
					baseUrl+'movie/'+movId,
					{
						api_key:api_key
					},
					function(response){
						displayInfo(response,poster,movie.title,movId);
					}
				);
				//similar
				$.get(
					baseUrl+'movie/'+movId+'/similar',
					{
						api_key:api_key
					},
					function(response){
						displayInfo2(response,movId);
					}
				);
				//casts
				$.get(
					baseUrl+'movie/'+movId+'/credits',
					{
						api_key:api_key
					},
					function(response){
						displayInfo3(response);
					}
				);
				//trailer
				$.get(
					baseUrl+'movie/'+movId+'/videos',
					{
						api_key:api_key
					},
					function(response){
						displayInfo4(response);
					}
				);
               
           });
        }
        else{
            var htmlStr = [
                    '<h3>',
                        'No Results Found.',
                    '</h3>'
            ];
           // $('.movie-list').append($(htmlStr.join('')));
        }
    }
	
	function displayInfo(data,poster,title,movId){
        console.log('displaying sypnosis..');
        console.log('\n\n\n')
		//data.results.forEach(function(movie) {
			   var sypnosis = data.overview;
               var htmlStr = [
                               '<br/><br/><br/><div class="col-md-4 col-sm-6 portfolio-item">',
                                    '<a id="'+movId+'" class="idClick" href="#">',
                                        '<img class="img-responsive" src="' + poster + '" alt="" style="padding-left:90px;">',
                                    '</a>',
                                    '<h5 class="text-center">',
                                        '<a  href="#" style="color:orange;">' + title +'</a>',
                                    '</h5>',
									'<h5 class="text-center">',
                                        '<p id="'+movId+'s" style="color:orange;" class="hidden-item">' + sypnosis +'</p>',
                                    '</h5>',
                                '</div>'
                            ];
                $('.movie-list').append($(htmlStr.join('')));
		//});
		$('.idClick').click(function(){
		$('#'+movId+'s').addClass( "show-item", -1000);
		$('#'+movId+'s').removeClass( "hidden-item");
		
		$('#'+movId+'r').addClass( "show-item-inline", -1000);
		$('#'+movId+'r').removeClass( "hidden-item");
		return false;
		});
    }

	function displayInfo2(data,movId){
		console.log('displaying similar movies..');
        console.log('\n\n\n')
        if(data.results.length > 0){
            data.results.forEach(function(movie){
        //$('.movie-list').html('');
		//data.results.forEach(function(movie) {
			   var title = movie.title;
               var htmlStr = [
                               '<div id="'+movId+'r" class="idClick2 show-item-inline" style="float:left;">'+ title +'&nbsp | &nbsp</div>'
                            ];
			
                $('.movie-list').append($(htmlStr.join('')));
		});
		
		} $('.movie-list').append("<br/><br/><br/><br/>");
    }
	
	function displayInfo3(data){
		console.log('displaying cast..');
        console.log('\n\n\n')
        var casts = data.cast;
		if(casts.length > 0){
		casts.forEach(function(movie) {
				var res = movie.name;
               var htmlStr = [
                               '<div style="float:left;display:inline-block;">'+ res +'&nbsp | &nbsp</div>'
                            ];
			
                $('.movie-list').append($(htmlStr.join('')));
		});
		} 
		$('.movie-list').append("<br/>");

    }
	
	function displayInfo4(data){
		console.log('displaying trailer..');
        console.log('\n\n\n')
        var trailer = data.results;
		if(trailer.length > 0){
		trailer.forEach(function(movie) {
				var res = movie.name;
				var vidLink = movie.key;
				var site = movie.site;
               var htmlStr = [
                              '<a target="_blank" href="/www.'+site+'.com/watch?v='+vidLink+'">'+ res +'</a>',
							  '<iframe width="640" height="390" src="//www.youtube.com/embed/'+vidLink+'" frameborder="0" allowfullscreen></iframe>',
                            ];
			
                $('.movie-list').append($(htmlStr.join('')));
		});
		} 
		$('.movie-list').append("<br/>");

    }

    function loadNowShowing(){
        $.get(
            baseUrl+'movie/now_playing',
            {
                api_key:api_key
            },
            function(response){
                displayMovies(response);
            }
        );
    }

    function loadUpcoming(){
        $.get(
            baseUrl+'movie/upcoming',
            {
                api_key:api_key
            },
            function(response){
                displayMovies(response);
            }
        );   
    }

    function loadPopular(){
        $.get(
            baseUrl+'movie/popular',
            {
                api_key:api_key
            },
            function(response){
                displayMovies(response);
            }
        );
    }

    function loadTopRated(){
        $.get(
            baseUrl+'movie/top_rated',
            {
                api_key:api_key
            },
            function(response){
                displayMovies(response);
            }
        );
    }

    initialize(setEventHandlers);

});