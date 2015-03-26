;(function ( $, window, document, undefined ) {

	'use strict';

	var pluginName = 'slideList',
	defaults = {
		showButton: '#filter',
		sliderContent: '.slider-content',
		forwardButtonClass: '.list-group-item',
		backButtonClass: '.go-back',
		slideClass: '.slide'
	};

	function Plugin ( element, options ) {
		this.element = element;
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	$.extend(Plugin.prototype, {
		currentSlide: 0,
		totalSlides: null,

		/**
		 * Initiates plugin
		 */
		init: function () {
			this.totalSlides = $(sliderContent+' '+slideClass).length;
			this.setSliderHeight();
			$(sliderContent+' '+forwardButtonClass).on('click', function () {
			    if ($(this).is(backButtonClass)) {
			        slideProgression(-1);
			    } else if (currentSlide !== totalSlides) {
			        slideProgression(1);
			    }
			});
			$(showButton).on('click', function () {
			    $(sliderContent).toggleClass('mobile-showing-filters');
			    setSliderHeight();
			    goToSlide(0);
			});
		},

		/**
		 * Go to the specified slide (int)
		 * @param  {integer}
		 */
		goToSlide: function(slideNum) {
			// stay within bounds
			if (slideNum < this.totalSlides) {
			    $(sliderContent+' '+slideClass).each(function () {
			        var slide = $(this);
			        var index = slide.index();
			        var leftPos = 0;
			        slide.removeClass('current');
			        if (index < slideNum) {
			            leftPos = '-110%';
			        } else if (index > slideNum) {
			            leftPos = '110%';
			        } else {
			            slide.addClass('current');
			        }
			        slide.css({
			            left: leftPos
			        });
			    });
			    this.currentSlide = slideNum;
			}
		},

		/**
		 * Increments or decrements the current slide by the specified amount
		 * @param  {integer}
		 */
		slideProgression: function (progress) {
			this.goToSlide(currentSlide + progress);
			this.setSliderHeight();
		},

		/**
		 * Sets the height of the slider based on the current slide
		 */
		setSliderHeight: function() {
			$(sliderContent).css({
				minHeight: $(slideClass+'.current').height()
			});
		}
		// TODO: RUN setSliderHeight(); WHEN LEAVING MOBILE BREAKPOINT
	});

	$.fn[ pluginName ] = function ( options ) {
		return this.each(function() {
			if ( !$.data( this, 'plugin_' + pluginName ) ) {
				$.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
			}
		});
	};

})( jQuery, window, document );
