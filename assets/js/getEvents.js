$.ajax({
    url: "//query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%27http%3A%2F%2Fwww.unisul.br%2Fwps%2Fportal%2Fhome%2Ffique-por-dentro%2Feventos%2Fapi-50anos%27%20and%20xpath%3D%27%2F%2F*%5B%40id%3D%22eventos-50anos%22%5D%27&format=json&diagnostics=true&callback=?",
    dataType: 'jsonp',
    success: function (response) {

        var events = response.query.results.div.div;
        var getEventsHTML = '';

        console.log('EVENTOS: ' + events)

        $.each(events, function(i, value) {

            var day          = events[i].strong;
            var month        = events[i].em;
            var year         = events[i].span;
            var date         = day + '/' + month;
            var title        = events[i].h3;
            var completeDate = new Date (month + ' ' + day + ", " + year);
            var url          = year + '/' + month + '/' + events[i].h6;

            if (completeDate.getTime() > (new Date().getTime())) {
                getEventsHTML += '<div class="event-box"><div class="event-item"><span class="event-date">' + date + '</span><h2 class="event-title"><a href="http://www.unisul.br/wps/portal/home/fique-por-dentro/eventos/todos/' + url + '" target="_blank">' + title + '</a></h2></div></div>';
            }

        });

        $("#events-list").html(getEventsHTML);
        
    }
});