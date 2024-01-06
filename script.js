//import 'chart.js';

function top_back() {
    window.scrollTo(0,0)
}

const API = "https://my.api.mockaroo.com/airports.json?key=b5ac6640";

$(document).ready(function(){
    $.getJSON('data.json', function(data){
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
    var priv = 0;
    var pub = 0;
    var mixed = 0;
    $.getJSON('data.json', function(data){
        $.each(data, function(key, value){
            if (value.ownership === 'priv') {
                priv += 1;
            } else if (value.ownership === 'pub') {
                pub += 1;
            } else {
                mixed += 1;
            }
        })
    })

    const ctx = document.getElementById('pie_chart').getContext('2d');

    const pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['priv', 'pub', 'mixed'],
            datasets: [{
                label: 'Ownership types',
                data: [priv, pub, mixed],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
    
                hoverOffset: 4
            }]
        }
        }
    )
    $('#pie_chart').append(pieChart);
});

pieChart.canvas.parentNode.style.height = '800px';
pieChart.canvas.parentNode.style.width = '800px';
pieChart.canvas.parentNode.style.float = 'right';

