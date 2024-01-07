function top_back() {
    window.scrollTo(0,0)
};

const API = "https://my.api.mockaroo.com/airports.json?key=b5ac6640";
let private = 0;
let public = 0;
let mixed = 0;

/*tablica + nabor peremennych*/
$(document).ready(function () {
    $.getJSON(API, function(data){
        var airport_data = '';
        var i = 0;
        $.each(data, function(key, value){
            if (i<10) {
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
            }
            i++;
            console.log(value.ownership)

            if (value.ownership === "private") {
                private += 1;
            } else if (value.ownership === "public") {
                public += 1;
            } else {
                mixed += 1;
            };
            console.log(1,value.ownership==='private',private)
        });
        $('#airports_table').append(airport_data);
    }).then(() => {
        Chart.defaults.interaction.mode = 'nearest';

        let itemData = [public, private, mixed];
        console.log(itemData);
        const data = {
            labels: ['Public', 'Private', 'Mixed'],
            datasets: [{
                label: 'Airport Ownership',
                data: itemData,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                ],
            }]
        };

        const config = {
            type: 'pie',
            data: data
        };

        const chart = new Chart(
            document.getElementById('pie_chart'),
            config
        );
    });
});
