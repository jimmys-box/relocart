jQuery(document).ready(function($) {
        $('.wpm-title a.wpm-overlay, .wpm-img a.wpm-overlay').magnificPopup({
                type:'iframe',
				iframe: {
					markup: 
					'<div class="mfp-iframe-scaler">'+
						'<div class="mfp-close"></div>'+
						'<iframe class="mfp-iframe" frameborder="0" allowfullscreen allow="vr"></iframe>'+
					'</div>'
				}, // HTML markup of popup, `mfp-close` will be replaced by the close button
                disableOn: function() {
                        if($(window).width() < 600) {
                                return false;
                        }
                        return true;
                }
        });

        $('.wpm-embedded').click(function(e) {
                e.preventDefault();
                $(this).parent().html('<div class="wpm-embed" style="max-width: ' + $(this).width() + 'px; max-height: ' + $(this).height() + 'px"><iframe src="' + $(this).data('src') + '" frameborder="0" allowfullscreen allow="vr"></iframe></div>')
        });
});
