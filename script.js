function top_back() {
    window.scrollTo(0,0)
}

const API = "https://my.api.mockaroo.com/airports.json?key=b5ac6640";

$(document).ready(function(){
    $.getJSON(API, function(data){
        var airport_data = '';
        var i = 0;
        $.each(data, function(key, value){
            airport_data += '<tr>';
            airport_data += '<td>'+value.id+'</td>';
            airport_data += '<td>'+value.airport+'</td>';
            airport_data += '<td>'+value.name+'</td>';
            airport_data += '<td>'+value.municipality+'</td>';
            airport_data += '<td>'+value.country+'</td>';
            airport_data += '<td>'+value.elevation+'</td>';
            airport_data += '<td>'+value.profit+'</td>';
            airport_data += '<td>'+value.busyness+'</td>';
            airport_data += '<td>'+value.ownership+'</td>'
            airport_data += '</tr>';
            i++;
            if (i==10) {
                return false;
            }
        });
        $('#airports_table').append(airport_data);
    });
});

$(document).ready(function(){
    var private = 0;
    var public = 0;
    var mixed = 0;
    $.getJSON('data.json', function(data){
        $.each(data, function(key, value){
            if (value.ownership === 'private') {
                private += 1;
            } else if (value.ownership === 'public') {
                public += 1;
            } else {
                mixed += 1;
            }
        })
    })
    const pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['private', 'public', 'mixed'],
            datasets: [{
                label: 'Ownership types',
                data: [private, public, mixed],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                bdColor: 'rgb(0, 0, 0)',
                hoverOffset: 4
            }]
        }
        }
    )
    $('pie_chart').append(pieChart);
});