/*************************************/
/* GOLF TAILOR TRACKING FORWARDING   */
/*         Variation 0               */
/*         VERSION 1.5               */
/*                                   */
/* Forwards tracking variables from  */
/* initial sales pages to cart page. */
/*   Author: Elliott Ewing           */
/*************************************/

var tracking = function() {
    var config = {
        /**
         * Selector for which elements to add tracking elements to href of.
         */
        targetSelector: "#order-form a"
    };

    var params = {};

    var adsource = "";

    function init() {
        addParameter("utm_campaign", "gt_campaign", "direct");
        addParameter("utm_expid", "gt_expid");
        addParameter("gt_cid");
        addParameter("gtcc");
        $(document).ready(function() {
            // Save loaded URL params into the params array.
            for(var param in params) {
                if(params.hasOwnProperty(param)) {
                    if(typeof params[param].rename !== "undefined") {
                        params[param].value = getUrlParameter(params[param].rename);
                    } else {
                        // Establish a rename value for every parameter
                        params[param].rename = param;
                    }

                    if(typeof params[param].value === "undefined" || params[param].value === "") {
                        params[param].value = getUrlParameter(param);
                    }
                    // If no value was found, set the default value as the value to pass through
                    if((typeof params[param].value === "undefined" || params[param].value === "" || params[param].value === null) && typeof params[param].default !== "undefined") {
                        params[param].value = params[param].default;
                    }
                }
            }

            // Special handling for adsource, since it will be used in the link route, not the query
            adsource = getUrlParameter("gt_source");
            if(adsource === "" || typeof adsource === "undefined") {
                adsource = getUrlParameter("utm_source");
            }

            // Set button href attributes
            $(config.targetSelector).each(function() {
                var currentHref = $(this).attr('href');
                $(this).attr('href', currentHref + getParameterString());
            });

            $('.club-selector-submit').click(function(e) {
                e.preventDefault();
                selection = $(this).data('target');
                $selector = $(selection);

                linkBase = $selector[0].value;

                window.location.href=linkBase + getParameterString();
            });
        });
    }

    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search.replace(/>/g, "&gt").replace(/%3E/g, "&gt"));
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    function getParameterString() {
        var reduced = [];
        for(var param in params) {
            if(params.hasOwnProperty(param)) {
                // Only store values for parameters which are set.
                if(typeof params[param].value !== "undefined" && params[param].value !== "") {
                    reduced.push(params[param].rename+"="+encodeURIComponent(params[param].value));
                }
            }
        }
        return "/" + adsource + "?" + reduced.join("&");
    }

    function addParameter (param, rename, defValue) {
        var obj = {};
        if(rename)
            obj.rename = rename;
        if(defValue)
            obj.default = defValue;
        params[param] = obj;
    }

    return {
        init: init,
        config: config
    };
}();

tracking.init();
