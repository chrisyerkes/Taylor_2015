// About Page Video
if($('body').hasClass('about') || $('body').hasClass('home') || $('body').hasClass('intPortfolio')) {
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	var aboutPlayer;
	var workPlayer;
	function onYouTubeIframeAPIReady() {
		aboutPlayer = new YT.Player('player', {
			height: '390',
			width: '640',
			videoId: 'OqT8KuVM_PA',
			playerVars: {
				'controls': 0,
				'rel': 0,
				'showinfo': 0,
			}
		});
		workPlayer = new YT.Player('workPlayer', {
			height: '390',
			width: '640',
			videoId: '3XEYHtJHTyM',
			playerVars: {
				'controls': 0,
				'rel': 0,
				'showinfo': 0,
			}
		});
	}
}

// Contact Page Map
// if($('body').hasClass('contact')) {
// 	function initMap() {
// 		var taylorHQ = {lat: 41.0529343, lng: -73.5411775};
// 		var map = new google.maps.Map(document.getElementById('map'), {
// 			zoomControl: false,
// 			mapTypeControl: false,
// 			streetViewControl: false,
// 			rotateControl: false,
// 			zoom: 18,
// 			center: taylorHQ,
// 			mapTypeId: google.maps.MapTypeId.SATELLITE,
// 			scrollwheel: false
// 		});

// 		var contentString = '<div id="content">'+
// 			'<div id="siteNotice">'+
// 			'</div>'+
// 			'<h1>Taylor Design</h1>'+
// 			'<div id="bodyContent">'+
// 			'<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
// 			'sandstone rock formation in the southern part of the '+
// 			'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
// 			'south west of the nearest large town, Alice Springs; 450&#160;km '+
// 			'(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
// 			'features of the Uluru - Kata Tjuta National Park. Uluru is '+
// 			'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
// 			'Aboriginal people of the area. It has many springs, waterholes, '+
// 			'rock caves and ancient paintings. Uluru is listed as a World '+
// 			'Heritage Site.</p>'+
// 			'<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
// 			'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
// 			'(last visited June 22, 2009).</p>'+
// 			'</div>'+
// 			'</div>';

// 		var infowindow = new google.maps.InfoWindow({
// 			content: contentString,
// 			maxWidth: 500
// 		});

// 		var custImg = {
// 			url: 'images/icon_marker_google-maps.png',
// 			size: new google.maps.Size(42,55),
// 			scaledSize: new google.maps.Size(42,55)
// 		};
// 		var marker = new google.maps.Marker({
// 			position: taylorHQ,
// 			map: map,
// 			icon: custImg,
// 			optimized: false,
// 			title: 'Taylor Design'
// 		});
// 		marker.addListener('click', function() {
// 			infowindow.open(map, marker);
// 		});
// 	}
// }

(function($, window, document) {

	// Custom Filtering Function Using Mixitup
	var buttonFilter = {
		$filters: null,
		$reset: null,
		groups: [],
		outputArray: [],
		outputString: '',

		init: function(){
			var self = this;
			self.$filters = $('#filters');
			self.$reset = $('.reset');
			self.$container = $('.portfolio .row');
			self.$filters.find('fieldset').each(function(){
				self.groups.push({
					$buttons: $(this).find('.filter'),
					active: ''
				});
			});
			self.bindHandlers();
		},
		bindHandlers: function(){
			var self = this;
			self.$filters.on('click', '.filter', function(e){
				e.preventDefault();
				var $button = $(this);
				$button.hasClass('active') ?
					$button.removeClass('active') :
					$button.addClass('active').siblings('.filter').removeClass('active');

				self.parseFilters();
			});
			self.$reset.on('click', function(e){
				e.preventDefault();

				self.$filters.find('.filter').removeClass('active');

				self.parseFilters();
			});
		},
		parseFilters: function(){
			var self = this;
			for(var i = 0, group; group = self.groups[i]; i++){
				group.active = group.$buttons.filter('.active').attr('data-filter') || '';
			}
			self.concatenate();
		},
		concatenate: function(){
			var self = this;
			self.outputString = ''; // Reset output string
			for(var i = 0, group; group = self.groups[i]; i++){
				self.outputString += group.active;
			}
			!self.outputString.length && (self.outputString = 'all'); 
			console.log(self.outputString); 
			if(self.$container.mixItUp('isLoaded')){
				self.$container.mixItUp('filter', self.outputString);
			}
		}
	};

	$(document).ready(function(){
		// Global Vars
		var winHeight = $(window).height(),
			winWidth = $(window).width();

		// Nav Toggle
		$('.navigation').css('display','block');
		$('.socialNav').css('visibility','hidden');
		$('.navTog').click(function(){
			if($(this).hasClass('toggled')){
				$(this).children('.navIcon').removeClass('opened');
				$(this).removeClass('toggled');
				$(this).css('position','absolute');
				$(this).parent().removeClass('toggled');
				$('body').removeClass('opened');
				setTimeout(function(){
					$('.socialNav').css('visibility','hidden');
				}, 550);
				$('.socialNav li').removeClass('opened');
			} else {
				$(this).children('.navIcon').addClass('opened');
				$(this).addClass('toggled');
				setTimeout(function(){
					$('.navTog').css('position','fixed');
				}, 550);
				$(this).parent().addClass('toggled');
				$('body').addClass('opened');
				$('.socialNav').css('visibility','visible');
				var els = $('.socialNav li'),
					navTog = $('.navTog'),
					i = 0,
					f = function(){
						if($(navTog).hasClass('toggled')) {
							$(els[i++]).addClass('opened');
							if(i < els.length){
								setTimeout(f, 125);
							}
						} else {
							$('.socialNav li').removeClass('opened');
						}
					};
				setTimeout(function() {
					f();
				}, 550);
			}
			return false;
		});

		// Header Logo Switching
		$('.mainLogo').mouseenter(function() {
			var self = $(this);
			if($(self).hasClass('step01')) {
				$(self).removeClass('step01');
				$(self).addClass('step02');
			} else if($(self).hasClass('step02')) {
				$(self).removeClass('step02');
				$(self).addClass('step03');
			} else if($(self).hasClass('step03')) {
				$(self).removeClass('step03');
				$(self).addClass('step01');
			} else {
				$(self).addClass('step01');
			}
		});

		// Footer Logo Switching
		$('.footerLogo').mouseenter(function(){
			var self = $(this);
			if($(self).hasClass('step01')) {
				$(self).removeClass('step01');
				$(self).addClass('step02');
			} else if($(self).hasClass('step02')) {
				$(self).removeClass('step02');
				$(self).addClass('step03');
			} else if($(self).hasClass('step03')) {
				$(self).removeClass('step03');
				$(self).addClass('step04');
			} else if($(self).hasClass('step04')) {
				$(self).removeClass('step04');
				$(self).addClass('step01');
			} else {
				$(self).addClass('step01');
			}
		});

		// Accordion Function
		$('.accordionToggle').click(function(){
			$(this).toggleClass('opened');
			$(this).next('.accordionContent').slideToggle(250);
			return false;
		});

		// Contact Form Toggles
		var bRow = $('.projBtn').closest('.row'),
			tRow = $('.projBtn').closest('.row').prev('.row'),
			rHeights = $(bRow).height() + $(tRow).height();
		$('.projBtn').click(function(){
			var self = $(this),
				formCont,
				currForm;
			if($(self).hasClass('newProj')) {
				formCont = $('.projForm'),
				currForm = $('.projForm .theForm');
			} else {
				formCont = $('.msgForm'),
				currForm = $('.msgForm .theForm');
			}
			$(bRow).addClass('formOpen');
			$(tRow).addClass('formOpen');
			$(this).addClass('opened');
			setTimeout(function(){
				$(currForm).addClass('formOpen');
				$(currForm).css('margin-top','-'+rHeights+'px');
			}, 350);
			$(formCont).slideDown(350);
			return false;
		});
		$('.closeForm').click(function(){
			$(this).closest('.theForm').css('margin-top','0px');

			setTimeout(function(){
				$(bRow).removeClass('formOpen');
				$(tRow).removeClass('formOpen');
				$('.projBtn').removeClass('opened');
				$('.contactForm .theForm').removeClass('formOpen');
				
				$('.contactForm').slideUp(350);
			}, 350);
			return false;
		});

		// Home Slideshow Option
		$('.homeSlider').flexslider({
			slideshow: false,
			keyboard: false,
			directionNav: false,
			start: function(slider) {
				var slides = $(slider).find('.slides>li');
				$(slider).css('height',winHeight);
				$(slides).css('height',winHeight);
			}
		});
		// Home Hero Option
		if($('body').hasClass('home')) {
			$('.hero').css('height',winHeight);
			$('.hero .contWrap').css('height',winHeight);
		}

		// Home Featured Work
		$('.gridItem.gridLarge:last').addClass('last-child');
		$('.gridItem:last').addClass('last-child');

		// Home Video Bar
		var p01Height = $('.picSlider01').height();
		$('.picSlider01 > ul > li').css('height',p01Height);
		$('.picSlider01').flexslider({
			directionNav: false,
			controlNav: false
		});
		var p02Height = $('.picSlider02').height();
		$('.picSlider02 > ul > li').css('height',p02Height);
		$('.picSlider02').flexslider({
			directionNav: false,
			controlNav: false,
			initDelay: 3000
		});

		// News Item Expand
		var row1 = $('.homeNews .newsRow01'),
			rowItems = $(row1).find('.newsBlock'),
			row1Height = $(row1).height()-186,
			heights = [];
		var homeNewsTog = function homeNewsToggle() {
			
			if(row1Height > 320) {
				$(row1).find('.excerpt').each(function(index){
					var excerpt = $(this),
						exHeight = $(excerpt).height();
					heights[index] = [exHeight];
					$(excerpt).attr('block-num',[index]);
					if(exHeight > 120) {
						$(excerpt).parent().append('<p class="expand"><a href="#" class="expandBtn"><span class="closed">+</span><span class="open">&ndash;</span></a></p>');
						$(excerpt).css('height','110px');
					}
				});
				$(rowItems).matchHeight();
				var rowItemHeight = $(rowItems).height();
				$('.expandBtn').click(function(){
					var currItem = $(this).closest('.newsBlock'),
						curHeight = parseInt($(currItem).height()),
						excerpt = $(this).closest('.newsNorm').children('.excerpt'),
						exNum = $(excerpt).attr('block-num'),
						diff = parseInt(heights[exNum] - 110),
						curExHeight = curHeight + diff;
					if($(currItem).hasClass('opened')) {
						$(currItem).removeClass('opened');
						$(currItem).find('.excerpt').removeClass('opened');
						$(rowItems).css('height',rowItemHeight);
						$(currItem).find('.excerpt').css('height','110px');
					} else {
						if($(rowItems).hasClass('opened')) {
							$(rowItems).removeClass('opened');
							$(rowItems).find('.excerpt').removeClass('opened');
							$(rowItems).css('height',rowItemHeight);
							$(rowItems).find('.excerpt').css('height','110px');
							setTimeout(function(){
								var diff = parseInt(heights[exNum] - 110),
									curHeight = parseInt($(currItem).height()),
									curExHeight = curHeight + diff;
								$(currItem).addClass('opened');
								$(rowItems).css('height',curExHeight);
								$(excerpt).addClass('opened');
								$(excerpt).css('height',heights[exNum]);
							}, 500);
						} else {
							$(currItem).addClass('opened');
							$(rowItems).css('height',curExHeight);
							$(excerpt).addClass('opened');
							$(excerpt).css('height',heights[exNum]);
						}
					}
					
					return false;
				});
				
			}
		}
		// Calling Toggle Function for page load
		homeNewsTog();
		
		var homeNews = function homeNewsResize() {
			$(rowItems).css('height','auto');
			$(rowItems).removeClass('opened');
			$(rowItems).find('.excerpt').css('height','auto');
			$(rowItems).find('.excerpt').removeClass('opened');
			$('.expand').remove();
			$(rowItems).matchHeight();
			setTimeout(function(){
				var row1 = $('.homeNews .newsRow01'),
					rowItems = $(row1).find('.newsBlock'),
					row1Height = $(row1).height()-186,
					heights = [];
				homeNewsTog();
			},100);
		}

		// Portfolio Filtering
		if(!$('body').hasClass('home')) {
			if($('.portfolio').length) {
				buttonFilter.init();
				$('.portfolio .row').mixItUp({
					controls: {
						enable: false // we won't be needing these
					},
					selectors: {
						target: '.gridItem'
					},
					animation: {
						duration: 470,
						effects: 'fade stagger(0ms) translateZ(-360px)',
						easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
					},
					callbacks: {
						onMixFail: function(){
							console.log('No items were found matching the selected filters.');
						}
					}
				});
			}
		}

		// Work Page Slider
		$('.workSlider').flexslider({
			slideshow: false,
			controlNav: false,
			keyboard: false
		});

		// Home Page Office Culture Video Player and Work Reel Video Player
		if($('body').hasClass('home')) {

			var officeVidBtn = $('.officeVideo .playBtn'),
				workReelBtn = $('.featWork .playBtn');

			// Office Video Player
			$(officeVidBtn).click(function(){
				var winWidth = $(window).width(),
					picCol = $('.pictureCol')
					vidHeight = $(picCol).height(),
					vidWidth = vidHeight / 9 * 16,
					vidHeightWin = Math.round((winWidth/16)*9),
					vidPerWidth = ((vidWidth / winWidth) * 100)+'%',
					photoCol = (winWidth - vidWidth) / 2,
					photoColPer = ((photoCol / winWidth) * 100)+'%',
					vidCont = $(this).closest('.videoCont'),
					vidMsg = $(this).closest('.videoCont .videoMsg');
				$(vidCont).addClass('opened');
				$(vidMsg).addClass('opened');
				if(winWidth <= 991) {
					$(vidCont).css('width',winWidth);
					$(vidCont).css('height',vidHeightWin);
				} else {
					$(vidCont).css('width',vidPerWidth);
					$(picCol).css('width',photoColPer);
				}
				setTimeout(function(){
					$('.aboutVid').addClass('playing');
					aboutPlayer.playVideo();
				}, 900);
				return false;
			});
			$('.aboutVid .closeBtn').click(function(){
				$('.aboutVid').removeClass('playing');
				$(this).closest('.videoCont').removeClass('opened');
				$('.videoMsg').removeClass('opened');
				$(this).closest('.videoCont').css('width','');
				$('.pictureCol').css('width','');
				aboutPlayer.pauseVideo();
				aboutPlayer.seekTo(0);
			});
			var homeVid = function homeVidResize() {
				var winWidth = $(window).width(),
					featWorkWidth = $('.featWork .workCont').width(),
					picCol = $('.pictureCol'),
					vidHeight = $(picCol).height(),
					vidWidth = vidHeight / 9 * 16,
					vidHeightWin = Math.round((winWidth/16)*9),
					wrkVidHeight = Math.round((featWorkWidth/16)*9),
					vidPerWidth = ((vidWidth / winWidth) * 100)+'%',
					photoCol = (winWidth - vidWidth) / 2,
					photoColPer = ((photoCol / winWidth) * 100)+'%',
					vidCont = $('.officeVideo .videoCont'),
					wrkVidCont = $('.featWork .videoCont');
				if(winWidth <= 991) {
					$(vidCont).css('width',winWidth);
					$(vidCont).css('height',vidHeightWin);
				} else {
					$(vidCont).css('width',vidPerWidth);
					$(vidCont).css('height','');
					$(picCol).css('width',photoColPer);
				}
			}

			// Work Reel Video Player
			$(workReelBtn).click(function(){
				var featWorkWidth = $('.featWork .workCont').width(),
					vidCont = $(this).closest('.featWork').children('.videoCont'),
					wrkCont = $(this).closest('.featWork').children('.row').children('.workCont'),
					vidHeight = Math.round((featWorkWidth/16)*9);
				$(vidCont).addClass('opened');
				$(vidCont).css('height',vidHeight);
				$(wrkCont).css('height',vidHeight);
				setTimeout(function(){
					$('.workVid').addClass('playing');
					workPlayer.playVideo();
				}, 900);
				return false;
			});
			$('.workVid .closeBtn').click(function(){
				var vidCont = $(this).closest('.videoCont'),
					wrkCont = $(vidCont).next('.row').children('.workCont');
				$('.workVid').removeClass('playing');
				$(vidCont).removeClass('opened');
				$(vidCont).css('height','');
				$(wrkCont).css('height','');
				workPlayer.pauseVideo();
				workPlayer.seekTo(0);
			});

			var homeWorkVid = function homeWorkVidResize() {
				var featWorkWidth = $('.featWork .workCont').width(),
					wrkVidHeight = Math.round((featWorkWidth/16)*9),
					wrkVidCont = $('.featWork .videoCont'),
					wrkCont = $('.featWork .workCont');

				$(wrkVidCont).css('height',wrkVidHeight);
				$(wrkCont).css('height',wrkVidHeight);
			}
		}

		// About Page Video Player
		if($('body').hasClass('about')) {
			$('.playBtn').click(function(){
				var winWidth = $(window).width(),
					vidCont = $(this).closest('.videoCont'),
					vidMsg = $(this).parent(),
					vidHeight = Math.round((winWidth/16)*9);
				$(vidCont).addClass('opened');
				$(vidCont).css('height',vidHeight);
				$(vidMsg).addClass('opened');
				setTimeout(function(){
					$('.aboutVid').addClass('playing');
					aboutPlayer.playVideo();
				}, 900);
				return false;
			});
			$('.aboutVid .closeBtn').click(function(){
				$('.aboutVid').removeClass('playing');
				$('.videoCont, .videoMsg').removeClass('opened');
				$('.videoCont').css('height','');
				aboutPlayer.pauseVideo();
				aboutPlayer.seekTo(0);
			});

			var aboutVid = function aboutVidResize() {
				var winWidth = $(window).width(),
					vidCont = $('.videoCont'),
					vidHeight = Math.round((winWidth/16)*9);
				$(vidCont).css('height',vidHeight);
			}
		}

		// Portfolio Page Work Reel Video Player
		if($('body').hasClass('intPortfolio')) {
			$('.playBtn').click(function(){
				var wrkWidth = $('.portfolio>.row').width(),
					wrkVidHeight = Math.round((wrkWidth/16)*9),
					vidCont = $(this).closest('.videoCont'),
					vidMsg = $(this).closest('.videoCont .videoMsg');
				$(vidCont).removeClass('col-lg-4 col-md-4 col-sm-4');
				$(vidCont).addClass('col-lg-12 col-md-12 col-sm-12');
				$(vidCont).css('height',wrkVidHeight);
				$(vidCont).addClass('opened');
				$(vidMsg).addClass('opened');
				setTimeout(function(){
					$('.workVid').addClass('playing');
					workPlayer.playVideo();
				}, 900);
				return false;
			});
			$('.workVid .closeBtn').click(function(){
				$('.workVid').removeClass('playing');
				$('.videoCont, .videoMsg').removeClass('opened');
				$('.videoCont').removeClass('col-lg-12 col-md-12 col-sm-12');
				$('.videoCont').addClass('col-lg-4 col-md-4 col-sm-4');
				$('.videoCont').css('height','');
				workPlayer.pauseVideo();
				workPlayer.seekTo(0);
			});

			var homeWorkVid = function homeWorkVidResize() {
				var portWorkWidth = $('.portfolio>.row').width(),
					wrkVidHeight = Math.round((portWorkWidth/16)*9),
					wrkVidCont = $('.portfolio .videoCont');

				$(wrkVidCont).css('height',wrkVidHeight);
			}
		}

		// About Page Bios
		$('.staffMember').click(function(){
			var currItem = $(this),
				loadCont = $(currItem).parent().next('.row').children('.staffBioCont'),
				trig = $(currItem).attr('data-trig'), // This grabs the staff members name by the post slug under the data-trig attribute
				selector = $('.staffMember'),
				bioContainer = $('.staffBioCont');
			if($(currItem).hasClass('loaded')) {
				$(currItem).removeClass('loaded');
				$(loadCont).removeClass('opened');
			} else {
				if($(selector).hasClass('loaded')) {
					$(selector).removeClass('loaded');
					$(bioContainer).removeClass('opened');
					setTimeout(function(){
						$(currItem).addClass('loaded');
						$(loadCont).load('test-bio.html #'+trig, function(){
							$(loadCont).addClass('opened');
							setTimeout(function(){
								$(loadCont).children('.bio').addClass('loaded');
							}, 400);
						});
					}, 500);
				} else {
					$(currItem).addClass('loaded');
					$(loadCont).load('test-bio.html #'+trig, function(){
						$(loadCont).addClass('opened');
						setTimeout(function(){
							$(loadCont).children('.bio').addClass('loaded');
						}, 400);
					});
				}
			}
		});
		$('body').on('click','.closeBtn', function(){
			$('.bio').removeClass('loaded');
			$('.staffMember').removeClass('loaded');
			$('.staffBioCont').removeClass('opened');
			return false;
		});

		// Office Sliders
		$('.officeSlider01').flexslider({
			slideshowSpeed: 10000,
			controlNav: false,
			directionNav: false,
			keyboard: false
		});
		$('.officeSlider02').flexslider({
			initDelay: 4500,
			slideshowSpeed: 10000,
			controlNav: false,
			directionNav: false,
			keyboard: false
		});

		if($('body').hasClass('services')) {
			$('.service').matchHeight();
		}

		$(window).load(function(){
			var winWidth = $(window).width();

			// Home Infographic
			if(winWidth >= 992) {
				if($('body').hasClass('home')) {
					var s = skrollr.init({
						edgeStrategy: 'set',
						easing: {
							inverted: function(p) {
								return 1-p;
							}
						}
					});
				}
			}

			// Individual Work Page Phones/Tablets Slider
			if(winWidth <= 767) {
				if($('body').hasClass('intWork') && $('.photoItems').length) {
					var slideClass = '';
					$('.photoItems').wrap('<div class="flexslider photoSlider resized" />');
					$('.photoItems').addClass('slides');
					$('.photoItems li').each(function(){
						var slideClass = $(this).attr('class'),
							slideCont = $(this).html();
						$(this).html('');
						$(this).attr('class','');
						$(this).append('<div class="' + slideClass + '">' + slideCont + '</div>');
					});
					$('.photoSlider').flexslider({
						slideshow: false,
						controlNav: false,
						keyboard: false
					});
				}
			}
			
		});

		var workPhoto = function workPhotoResize() {
			var winHeight = $(window).height(),
				winWidth = $(window).width();
			if(winWidth <= 767) {
				if(!$('.photoSlider').hasClass('resized')) {
					if($('.photoItems').length) {
						var slideClass = '';
						$('.photoItems').wrap('<div class="flexslider photoSlider resized" />');
						$('.photoItems').addClass('slides');
						$('.photoItems li').each(function(){
							var slideClass = $(this).attr('class'),
								slideCont = $(this).html();
							$(this).html('');
							$(this).attr('class','');
							$(this).append('<div class="' + slideClass + '">' + slideCont + '</div>');
						});
						$('.photoSlider').flexslider({
							slideshow: false,
							controlNav: false,
							keyboard: false
						});
					}
				}
			} else {
				if($('.photoSlider').hasClass('resized')) {
					$('.photoSlider > .flex-direction-nav').remove();
					$('.photoSlider').replaceWith('' + $('.photoSlider').html() + '');
					$('.photoItems').removeClass('slides');
					$('.photoItems li div').each(function() {
						var slideClass = $(this).attr('class'),
							slideCont = $(this).html();
						$(this).parent().attr('class',slideClass);
						$(this).replaceWith('' + slideCont + '');
					});
					$('.photoItems li').each(function(item) {
						$(this).attr('style','');
					});
				}
			}
		}

		// Home Slideshow Resize
		var homeResizeID,
			aboutResizeID,
			homeWorkResizeID,
			workPhotoResizeID;
		if($('body').hasClass('home') || $('body').hasClass('intPortfolio') || $('body').hasClass('about') || $('body').hasClass('intWork')) {
			$(window).on('resize', function(e) {
				if($('body').hasClass('home')) {
					clearTimeout(homeResizeID);
					homeResizeID = setTimeout(function() { 
						doneRe(); // Home hero area and Skrollr
						homeNews(); // Home news blocks
						if($('.officeVideo .videoCont').hasClass('opened')) {
							homeVid(); // Home office culture video
						}
					}, 100);
				}
				if($('body').hasClass('home') || $('body').hasClass('intPortfolio')) {
					clearTimeout(homeWorkResizeID);
					homeWorkResizeID = setTimeout(function() {
						if($('.featWork .videoCont').hasClass('opened') || $('.portfolio .videoCont').hasClass('opened')) {
							homeWorkVid();
						}
					}, 100);
				}
				if($('body').hasClass('about')) {	
					clearTimeout(aboutResizeID);
					aboutResizeID = setTimeout(function() {
						if($('.videoCont').hasClass('opened')) {
							aboutVid(); // About page office culture video
						}
					}, 100);
				}
				if($('body').hasClass('intWork')) {
					clearTimeout(workPhotoResizeID);
					workPhotoResizeID = setTimeout(function() {
						workPhoto();
					}, 100);
				}
			});
		}

		var doneRe = function doneResizing() {
			var winHeight = $(window).height(),
				winWidth = $(window).width();
			// For Slideshow Option
			// $('.homeSlider').css('height',winHeight);
			// $('.homeSlider').find('.slides>li').css('height',winHeight);
			if($('body').hasClass('home')) {
				$('.hero, .hero .contWrap').css('height',winHeight);
				if(winWidth >= 992) {
					setTimeout(function(){
						var s = skrollr.init({
							edgeStrategy: 'set',
							easing: {
								inverted: function(p) {
									return 1-p;
								}
							}
						});
					}, 500);
				} else {
					var s = skrollr.init().destroy();
				}
			}
		}

		var egg = new Konami();
		egg.code = function() {
			$('body').prepend('<div class="screamo loaded"><video autoplay loop muted><source src="video/s/367083081.webm" type="video/webm"><source src="video/s/367083081.mp4" type="video/mp4"><source src="video/s/367083081.ogv" type="video/ogg"></video><audio autoplay loop><source src="video/s/scream.mp3" type="audio/mpeg"></audio></div>');
			setTimeout(function(){
				$('.screamo').removeClass('loaded');
			},10);
			setTimeout(function(){
				$('.screamo').addClass('loaded');
				setTimeout(function(){
					$('.screamo').remove();
				},500);
			}, 2500);
		}
		egg.load();
	
	});

}(window.jQuery, window, document));