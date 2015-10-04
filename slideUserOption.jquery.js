$.fn.animateRotate = function(angle, duration, easing, complete) {
  return this.each(function() {
    var $elem = $(this);
    $({deg: 0}).animate({deg: angle}, {
      duration: duration,
      easing: easing,
      step: function(now) {
        $elem.css({
           transform: 'rotate(' + now + 'deg)'
         });
      },
      complete: complete || $.noop
    });
  });
};

(function($) {
    $.fn.sliderUserOption = function(options) {       	
		var settings = $.extend({
            itemWidth : 200,
			mainWidth : '100%',
			effect    : 'fadeRemove'
        }, options);
		
		return this.each( function() {
			$(this).wrapAll('<div class="animateDiv" />');			
			var externalId = $(this).children();			
			var elementCount = externalId.children().length;	    
			var elementWidth =  settings.itemWidth + 30;
			$(this).css('width', settings.mainWidth);
			$(this).css('overflow', 'hidden');								
			externalId.css("width", elementCount*elementWidth+"px" );		
				externalId.children().each(function(){					
					var parentEle = $(this); 
					var skipObj = parentEle.find('.skip');
					 				
					skipObj.click(function(){
						//If FadeRemove Effect
						if(settings.effect == 'fadeRemove'){
							parentEle.animate({
								marginLeft: '-'+settings.itemWidth,
								opacity: 0
							}, 400, function(){
									parentEle.remove();
							});
						}else if(settings.effect == 'Ghost'){
							var externalObj = parentEle.parent().parent().parent('.animateDiv');	
							parentEle.addClass('OutItem');
							var element = parentEle.detach();
							externalObj.append(element);
							parentEle.animateRotate(-30,400);						
							parentEle.animate({
								marginTop: '-'+settings.itemWidth,
								opacity: 0	
							}, 400, function(){
									parentEle.remove();
							});
						}
						
					});
					
			   });
        });
    }
}(jQuery));


