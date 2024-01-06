function top_back() {
    window.scrollTo(0,0)
}

$(document).ready(function(){
    $.getJSON("data.json", function(data){
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