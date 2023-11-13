/*!
 * jQuery simple gallery Plugin 1.1.0
 *
 * http://fernandomoreiraweb.com/
 *
 * Copyright 2013 Fernando Moreira
 * Released under the MIT license:
 *   http://mit.fernandomoreiraweb.com/
 */
;(function($, window, document, undefined) {

    $.fn.simplegallery = function(options) {

        var defaults = {
            'galltime': 300,
            'gallcontent': '.fullsize',
            'gallthumbnail': '.thumbnails',
            'gallthumb': '.thumb'
        };

        var settings = $.extend({}, defaults, options);

        return this.each(function() {

            $(settings.gallthumb).click(function() {

                $(settings.gallcontent).find('img').stop(true,true).fadeOut(settings.galltime).hide();

                var img_attr = $(this).find('img').attr("id"),
                    image_id = img_attr.replace('thumb_', '');

                $('.image_' + image_id + '').stop(true,true).fadeIn(settings.galltime).css('display', 'block');
                return false;

            });

        });

    };

})(jQuery, window, document);