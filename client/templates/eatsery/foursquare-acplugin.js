(function ($) {

    $.foursquareAutocomplete = function (element, options) {
        this.options = {};

        element.data('foursquareAutocomplete', this);

        this.init = function (element, options) {
            this.options = $.extend({}, $.foursquareAutocomplete.defaultOptions, options);
            this.options = $.metadata ? $.extend({}, this.options, element.metadata()) : this.options;
            updateElement(element, this.options);
        };
        this.init(element, options);
        this.select = function (event, ui) {
        };

    };
    $.fn.foursquareAutocomplete = function (options) {
        return this.each(function () {
            (new $.foursquareAutocomplete($(this), options));
        });
    };

    function updateElement(element, options) {
        element.autocomplete({
            source: function (request, response) {
                var url = options.useVenueSearch
                    ? "https://api.foursquare.com/v2/venues/search"
                    : 'https://api.foursquare.com/v2/venues/suggestcompletion';
                var data = {
                    ll: options.latitude + "," + options.longitude,
                    v: "20131205",
                    oauth_token: options.oauth_token,
                    client_id: options.client_id,
                    client_secret: options.client_secret,
                    query: request.term,
                    radius: options.radius
                };
                if (options.useVenueSearch) {
                    data['intent'] = 'browse';
                }

                $.ajax({
                    url: url,
                    dataType: "jsonp",
                    data: data,
                    success: function (data) {
                        // Check to see if there was success
                        if (data.meta.code != 200)
                        {
                            element.removeClass("ui-autocomplete-loading")
                            options.onError(data.meta.code, data.meta.errorType, data.meta.errorDetail);
                            return false;
                        }

                        if (data.meta.errorDetail) {
                            Etsy.Logger.error('Error from foursquare venue search API: ' + data.meta.errorDetail, data.meta);
                        }

                        var venues = options.useVenueSearch ? data.response.venues : data.response.minivenues;
                        if (!venues) {
                            venues = [];
                        }
                        response($.map(venues, function (item) {
                            return {
                                name: _.escape(item.name),
                                id: _.escape(item.id),
                                lat: (item.location.lat == undefined ? "" : _.escape(item.location.lat)),
                                lon: (item.location.lng == undefined ? "" : _.escape(item.location.lng)),
                                address: (item.location.address == undefined ? "" : _.escape(item.location.address)),
                                cityLine: (item.location.city == undefined ? "" : _.escape(item.location.city) + ", ") + (item.location.state == undefined ? "" : _.escape(item.location.state) + " ") + (item.location.postalCode == undefined ? "" : _.escape(item.location.postalCode)),
                                photo: (item.categories[0] == undefined ? "https://ss1.4sqi.net/img/categories_v2/none_bg_32.png" : _.escape(item.categories[0].icon.prefix) + "bg_32" + _.escape(item.categories[0].icon.suffix)),
                                city: (item.location.city == undefined ? "" : _.escape(item.location.city)),
                                state: (item.location.state == undefined ? "" : _.escape(item.location.state)),
                                country: (item.location.country == undefined ? "" : _.escape(item.location.country)),
                                zipcode: (item.location.postalCode == undefined ? "" : _.escape(item.location.postalCode)),
                                country_code:(item.location.cc == undefined ? "" : _.escape(item.location.cc)),
                                //Renaming variable that may return unescaped user provided strings. 
                                full_NOT_ESCAPED: item
                            };
                        }));
                    },
                    error: function (header, status, errorThrown) {
                          options.onAjaxError(header, status, errorThrown);
                    }
                });
            },
            minLength: options.minLength,
            select: function (event, ui) {
                element.val(_.unescape(ui.item.name));
                options.search(event, ui);
                return false;
            },
            open: function () {
                $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
            },
            close: function () {
                $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
            }
        })
        .data("autocomplete")._renderItem = function (ul, item) {
                return $("<li></li>")
                    .data("item.autocomplete", item)
                    .append("<a>" + getAutocompleteText(item) + "</a>")
                    .appendTo(ul);
            };

    };

    $.foursquareAutocomplete.defaultOptions = {
        'latitude': 47.22,
        'longitude': -122.2,
        'oauth_token': "",
        'client_id': "",
        'client_secret': "",
        'minLength': 3,
        'select': function (event, ui) {},
        'onError': function (errorCode, errorType, errorDetail) {},
        'onAjaxError' : function (header, status, errorThrown) {},
        'radius': 75000 // 75km = ~46.6miles
    };


    /// Builds out the <select> portion of autocomplete control
    function getAutocompleteText(item) {
        var text = "<div>";
        text += "<div class='categoryIconContainer'><img src='" + (item.photo == "" ? "" : item.photo) + "' /></div>";
        text += "<div class='autocomplete-name'>" + item.name + "</div>";
        if (item.address == "" && item.cityLine == "")
            text += "<div class='autocomplete-detail'>&nbsp;</div>";
        if (item.address != "")
            text += "<div class='autocomplete-detail'>" + item.address + "</div>";
        if (item.cityLine != "")
            text += "<div class='autocomplete-detail'>" + item.cityLine + "</div>";
        text += "</div>";
        return text;
    }
})(jQuery);
