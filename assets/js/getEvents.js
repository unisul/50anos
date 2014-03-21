$.ajax({
    url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%27http%3A%2F%2Fwww.unisul.br%2Fwps%2Fportal%2Fhome%2Ffique-por-dentro%2Feventos%2Fapi-50anos%27%20and%20xpath%3D%27%2F%2F*%5B%40id%3D%22eventos-50anos%22%5D%27&format=json&diagnostics=true&callback=?",
    dataType: 'jsonp',
    success: function (response) {

        var events = response.query.results.div.div;
        var getEventsHTML = '';

        console.log(events);

        $.each(events, function(i, value) {

            var dia       = events[i].strong;
            var mes       = events[i].em;
            var data      = dia + '/' + mes;

            getEventsHTML += '<div class="event-box"><div class="event-item"><span class="event-date">' + data + '</span></div></div>';

        });

        $("#events-list").html(getEventsHTML);
        
    }
});