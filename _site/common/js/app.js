jQuery(document).ready(function($) {
    const height = $("#promo").height() + $("#header").height();

    /* ======= Scrollspy ======= */
    $('body').scrollspy({ target: '#header', offset: 400});
    
    /* ======= Fixed header when scrolled ======= */
    $(window).bind('scroll', function() {
         if ($(window).scrollTop() > height) {
             $('#header').addClass('navbar-fixed-top');
         }
         else {
             $('#header').removeClass('navbar-fixed-top');
         }
    });
   
    /* ======= ScrollTo ======= */
    $('a.scrollto').on('click', function(e){
        //store hash
        var target = this.hash;
                
        e.preventDefault();
        
		$('body').scrollTo(target, 800, {offset: -70, 'axis':'y', easing:'easeOutQuad'});
        //Collapse mobile menu after clicking
		if ($('.navbar-collapse').hasClass('in')){
			$('.navbar-collapse').removeClass('in').addClass('collapse');
		}
	});

    /* ======= codepen ======= */
    function getDomainUrl() {
        return window.HOMELINK;
    }

    $("#demos .highlight").each(function() {
        var $el = $(this);
        var $htmlEl = $el.parent().prev();
        if ($htmlEl.length && $htmlEl.attr("codepen")) {
            var codepen = $htmlEl.attr("codepen");
            var cssPath = "assets/css/" + codepen + ".css";
            var jsPath = "assets/js/" + codepen + ".js";
            var htmlPath = "assets/html/" + codepen + ".html";

            var $title = $htmlEl.prev();
            if (/^H/.test($title.get(0).tagName)) {
                $title.wrap(function() {
                    return "<a class='page-scroll' href='#" + this.id + "'></div>";
                });
            }
            $.when(
                $.ajax({
                    url: htmlPath,
                    dataType: "text"
                }),
                $.ajax({
                    url: cssPath,
                    dataType: "text"
                }),
                $.ajax({
                    url: jsPath,
                    dataType: "text"
                })
            ).done(function(html, css, js) {
                var $html = $(html[0]);
                $html.attr("codepen", null)
                    .find("img").attr("src", function(i, val) {
                        var url = val;
                        if (/^\.\//.test(val)) {
                            url = val.replace("./", "");
                        } else if(/^\.\.\//.test(val)) {
                            url = val.replace("../", "assets/");
                        }
                        return getDomainUrl() + url;
                    });

                var data = {
                    title              : $htmlEl.prev().text(),
                    private            : false,
                    header             : "<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi'>",
                    html               : $html.get(0).outerHTML,
                    html_pre_processor : "none",
                    css                : css[0].replace(/\.\.\//g, getDomainUrl() + "assets/").replace(/\.\//g, getDomainUrl()),
                    css_pre_processor  : "none",
                    css_starter        : "neither",
                    css_prefix_free    : false,
                    js                 : js[0].replace("window.HOMELINK", '"' + getDomainUrl() + '"'),
                    js_pre_processor   : "babel",
                    html_classes       : "loading",
                    css_external       : "",
                    js_external        : "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js;" + window.LIBLINK.join(";")
                };
                $el.prepend('<form class="codepenform" action="https://codepen.io/pen/define" method="POST" target="_blank">' + 
                    '<input type="hidden" name="data" value=\'' + JSON.stringify(data).replace(/"/g, "&quot;").replace(/'/g, "&apos;") + '\'>' + 
                    '<input type="image" src="./common/image/cp-arrow-right.svg" width="40" height="40" value="Create New Pen with Prefilled Data" class="codepen-mover-button">' +
                '</form>');
            }).fail(function(e) {
                console.error( "error");
            });
        }
    });
});
