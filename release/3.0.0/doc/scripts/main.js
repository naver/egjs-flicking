$(function () {
    var $wrap = $("#wrap"),
        $langToggle = $("#toggle");

    // initial language
    setLanguage(getUserLanguage());

    $langToggle.on("click",function(){
        $wrap.hasClass("toggle") ? setLanguage("ko") : setLanguage("en"); 
    });

    function setLanguage(langCode) {
        if (langCode.indexOf("ko") === 0) {
            //Set Korean
            $wrap.removeClass("toggle");
            $langToggle.text("English");
        } else {
            //Set English
            $wrap.addClass("toggle");
            $langToggle.text("한국어");
        }
        localStorage.setItem("egjs-api-language", langCode);
    }

    function getUserLanguage() {
        return localStorage.getItem("egjs-api-language") || navigator.language || "";
    }
    
    $('#search').on('keyup', function (e) {
        var value = $(this).val();
        var $el = $('.navigation');

        if (value) {
            var regexp = new RegExp(value, 'i');
            $el.find('li, .itemMembers').hide();

            $el.find('li').each(function (i, v) {
                var $item = $(v);

                if ($item.data('name') && regexp.test($item.data('name'))) {
                    $item.show();
                    $item.closest('.itemMembers').show();
                    $item.closest('.item').show();
                }
            });
        } else {
            $el.find('.item, .itemMembers').show();
        }

        $el.find('.list').scrollTop(0);
    });

    // Toggle when click an item element
    // $('.navigation').on('click', '.title', function (e) {
    //     $(this).parent().find('.itemMembers').toggle();
    // });

    // Show an item related a current documentation automatically
    var filename = $('.page-title').data('filename').replace(/\.[a-z]+$/, '');
    var $currentItem = $('.navigation .item[data-name="' + filename + '"]:eq(0)');
    // if ($currentItem.length) {
    //     $currentItem
    //         .remove()
    //         .prependTo('.navigation .list')
    //         .show()
    //         .find('.itemMembers')
    //             .show();
    // }
    // Retain a menu order 2015.04.29. jongmoon.
    if ($currentItem.length) {
        $currentItem
            .show()
            .find('.itemMembers')
                .slideDown();
    }

    // Auto resizing on navigation
    var _onResize = function () {
        var height = $(window).height();
        var $el = $('.navigation');

        $el.height(height).find('.list').height(height - 133);
    };

    $(window).on('resize', _onResize);
    _onResize();

    // disqus code
    if (config.disqus) {
        $(window).on('load', function () {
            var disqus_shortname = config.disqus; // required: replace example with your forum shortname
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
            var s = document.createElement('script'); s.async = true;
            s.type = 'text/javascript';
            s.src = '//' + disqus_shortname + '.disqus.com/count.js';
            document.getElementsByTagName('BODY')[0].appendChild(s);
        });
    }
});
