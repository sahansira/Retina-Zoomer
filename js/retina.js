/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @sahanhaz
 * Further changes, comments:  @sahanhaz
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "retina",
        defaults = {
            zoomValue: 200
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init(element);
    }

    Plugin.prototype = {

        init: function(element) {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).
            var _block = $(element);
            var webpage	= _block.find('.mobile-page'),
            retinaZoomer = _block.find('.retina-zoomer'),
            retinaSize = {width:150, height:150},
            offset	= { left: webpage.offset().left, top: webpage.offset().top },
            mouseX,
            mouseY;
            $(".page-inner").mousemove( function(e) {
                mouseX = e.pageX;
                mouseY = e.pageY;
                var left = mouseX-offset.left,
                    top = mouseY-offset.top;
               retinaZoomer.css({
                   'top':top - retinaSize.height/2,
                   'left':left - retinaSize.width/2,
                   backgroundPosition	: '-'+(1.6*left)+'px -'+(1.4*top)+'px'
               }).fadeIn('slow');
           }).on('mouseleave', function(e) {
               retinaZoomer.css('display','none');
           });
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
