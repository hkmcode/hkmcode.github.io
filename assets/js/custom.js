$(document).on('ready',function() {
	"use strict";

	/*----------------------------------------------
	 -----------Sticky Header  --------------------
	 -------------------------------------------------*/
	function navBaar() {
		var headerHeight = $('.header');
		var stricky_header_top = $('.nav-wrap');
		if (stricky_header_top.length) {
			var stricky_header_top_Offset = headerHeight.height();
			$(window).on('scroll', function() {
				var top_scroll = $(window).scrollTop();
				if (top_scroll > stricky_header_top_Offset) {
					stricky_header_top.addClass('stricky');
				} else {
					stricky_header_top.removeClass('stricky');
				}
			});
		}
	}

	navBaar();
	$(window).on('resize', function() {
		navBaar();
	});
		
	//===============Mobile nav Function============
	var menu = $('#menu');
	var navigation = $('.navigation');
	menu.on('click', function() {
		if ($(window).width() <= 767) {
			navigation.slideToggle('normal');
		}
		return false;
	});

	/* ---------------------------------------------
	 Smooth scroll
	 --------------------------------------------- */
	var navbar_collapsejs = $('.navbar-collapse');
	$(document).on("scroll", onScroll);
	var navLinks = $('.navigation li a[href^="#"]');
	navLinks.on("click", function(e) {
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop : $(anchor.attr('href')).offset().top - 50
		}, 1000);
		e.preventDefault();
		if ($(window).width() <= 767) {
			navigation.slideUp('normal');

		}
	});

	function onScroll(event) {
		var homeClass = $('#home');
		var navLink = $('.navigation li a');
		if (homeClass.length) {
			var scrollPos = $(document).scrollTop();
			navLink.each(function() {
				var currLink = $(this);
				var refElement = $(currLink.attr("href"));
				if (refElement.position().top - 50 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
					navLink.removeClass("active");
					currLink.addClass("active");
				} else {
					// currLink.removeClass("active");
				}
			});
		}

	}

	/*----------------------------------------------
	 -----------Masonry Grid view Function  --------------------
	 -------------------------------------------------*/
	var container_grid = $(".container-grid");
	container_grid.imagesLoaded(function() {
		container_grid.isotope({
			itemSelector : ".nf-item",
			layoutMode : "fitRows"
		});
	});

	/*----------------------------------------------
	 -----------Masonry Grid Filter Function  --------------------
	 -------------------------------------------------*/
	var container_filter = $(".container-filter");
	container_filter.on("click", ".categories", function() {
		var e = $(this).attr("data-filter");
		container_grid.isotope({
			filter : e
		});
	});

	/*----------------------------------------------
	 -----------Masonry filter Active Function  --------------------
	 -------------------------------------------------*/
	container_filter.each(function(e, a) {
		var i = $(a);
		i.on("click", ".categories", function() {
			i.find(".active").removeClass("active"), $(this).addClass("active");
		});
	});



	/*----------------------------------------------
	 -----------Light Function  --------------------
	 -------------------------------------------------*/
	var fLight = $(".fancylight");
	if (fLight.length) {
		fLight.fancybox({
			openEffect : 'elastic',
			closeEffect : 'elastic',
			helpers : {
				media : {}
			}
		});
	}

/*----------------------------------------------
	 -----------Counter Function  --------------------
	 -------------------------------------------------*/
	var counter = $('.counter');
	if (counter.length) {
		counter.appear(function() {
			counter.each(function() {
				var e = $(this),
				    a = e.attr("data-count");
				$({
					countNum : e.text()
				}).animate({
					countNum : a
				}, {
					duration : 8e3,
					easing : "linear",
					step : function() {
						e.text(Math.floor(this.countNum));
					},
					complete : function() {
						e.text(this.countNum);
					}
				});
			});
		});
	}
	
//index_TESTIMONIAL
	var testimonial_silder = $(".testimonial_silder");
	testimonial_silder.owlCarousel({
		loop : true,
		margin :30,
		nav : true,
		dots : false,
		center : false,
		autoplay : true,
		autoplayTimeout : 2000,
		autoplayHoverPause : true,
		responsive : {
			0 : {
				items : 1
			},
			767 : {
				items : 1
			},
			992 : {
				items : 3
			},
			1200 : {
				items : 3
			}
		},
		navText : ["<i class='ion-ios-arrow-back'></i>", "<i class='ion-ios-arrow-forward'></i>"]

	});
	

	// back-to-top
	$(window).on('scroll',function() {
		if ($(this).scrollTop() > 50) {
			$('#back-to-top').fadeIn();
		} else {
			$('#back-to-top').fadeOut();
		}
	});
	// scroll body to 0px on click
	$('#back-to-top').on('click',function() {

		$('body,html').animate({
			scrollTop : 0
		}, 800);
		return false;
	});

	/*----------------------------------------------
	----------- Loader Function  --------------------
	-------------------------------------------------*/
	$(window).on('load',function() {
	var preloader = $("#preloader");
	preloader.delay(500).fadeOut();

	});
	
	/*----------------------------------------------
	 ----------- Map Function  --------------------
	 -------------------------------------------------*/
	var mapWrap = $('#map');
	if (mapWrap.length) {
		google.maps.event.addDomListener(window, 'load', initialize);

	}
	/*-----------------------------------------------
	 -----------  style-switcher  --------------------
	 -------------------------------------------------*/
	$("body").append('<div id="style-switcher"></div>');
	$("#style-switcher").load("theme-option/swicher.html");
	// End
});


/*-----------------------------------------------
 -----------  Map Color Theme Function  ----------
 -------------------------------------------------*/
var mapWrap = $('#map');
if (mapWrap.length) {
	var myCenter = new google.maps.LatLng(51.538308, -0.3817765);
	function initialize() {
		var mapProp = {
			center : myCenter,
			zoom : 15,
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			scrollwheel : false
		};
		var map = new google.maps.Map(document.getElementById("map"), mapProp);

		var marker = new google.maps.Marker({
			position : myCenter,
			icon : {
				url : 'assets/images/map-pin.png',
				size : new google.maps.Size(90, 111), //marker image size
				origin : new google.maps.Point(0, 0), // marker origin
				anchor : new google.maps.Point(35, 86) // X-axis value (35, half of marker width) and 86 is Y-axis value (height of the marker).
			}
		});

		marker.setMap(map);

	}

	function reloadStylesheets() {
		var queryString = 'reload=' + new Date().getTime();
		$('link[rel="stylesheet"]').each(function() {
			if (this.href.indexOf('?') === -1) {
				this.href = this.href + '&' + queryString;
			} else {
				this.href = this.href + '?' + queryString;
			}
		});
	}

}
