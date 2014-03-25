$.ajax({
    url: 'http://query.yahooapis.com/v1/public/yql?q=select * from html where url=\'http://www.unisul.br/wps/portal/home/fique-por-dentro/eventos/api-50anos\' and xpath=\'//*[@id="eventos-50anos"]\'&format=json&diagnostics=true&callback=?',
    dataType: 'jsonp',
    success: function (response) {

        var events = response.query.results.div.div;
        var getEventsHTML = '';
        var count = 0;

        $.each(events, function(i, value) {

            var day          = events[i].strong;
            var month        = events[i].em;
            var year         = events[i].span;
            var date         = day + '/' + month;
            var title        = events[i].h3;
            var completeDate = new Date(month + ' ' + day + ', ' + year);
            var url          = year + '/' + month + '/' + events[i].h6;

            if (completeDate.getTime() > (new Date().getTime())) {
                count++;
                getEventsHTML += '<div class="event-box"><div class="event-item"><span class="event-date">' + date + '</span><h2 class="event-title"><a href="http://www.unisul.br/wps/portal/home/fique-por-dentro/eventos/todos/' + url + '" target="_blank">' + title + '</a></h2></div></div>';
                return count < 4;
            }

        });

        $('#events-list').html(getEventsHTML);
        
    }
});