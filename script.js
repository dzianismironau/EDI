function top_back() {
    window.scrollTo(0,0)
};


const API = "https://my.api.mockaroo.com/airports.json?key=b5ac6640";
let private = 0;
let public = 0;
let mixed = 0;

let smallProfit = 0;
let mediumProfit = 0;
let largeProfit = 0;

let smallBusyness = 0;
let mediumBusyness = 0;
let largeBusyness = 0;
let hugeBusyness = 0;

let averageArray = [];
let namesArray = [];

$(document).ready(function () {
    $.getJSON(API, function(data){
        var airport_data = '';
        var i = 0;
        $.each(data, function(key, value){
            const firstElement =  `<tr data-aos="slide-${i % 2 === 0 ? "left" : "right"}" data-aos-offset="120">`;
            if (i<10) {
                airport_data += firstElement;
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

            if (value.ownership === "private") {
                private += 1;
            } else if (value.ownership === "public") {
                public += 1;
            } else {
                mixed += 1;
            };
            
            if (value.profit < 30000000.) {
                smallProfit++;
            } else if (value.profit < 60000000.) {
                mediumProfit++;
            } else {
                largeProfit++;
            }

            if (value.busyness < 10000000) {
                smallBusyness++;
            } else if (value.busyness < 40000000) {
                mediumBusyness++;
            } else if (value.busyness < 70000000) {
                largeBusyness++;
            } else {
                hugeBusyness++;
            }

            namesArray.push(value.airport);
            averageArray.push(value.profit/value.busyness);
        });
        $('#airports_table').append(airport_data);
    }).then(() => {
        Chart.defaults.interaction.mode = 'nearest';

        let itemData = [public, private, mixed];
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
            data: data,
            options: {
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: 'white'
                        }
                    }
                }
            }
        };

        const chart = new Chart(
            document.getElementById('ownership_chart'),
            config
        );
    }).then(() => {
        let itemData = [smallProfit, mediumProfit, largeProfit];
        const data = {
            labels: ['Small', 'Medium', 'Large'],
            datasets: [{
                label: 'Airport Profits',
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
            data: data,
            options: {
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: 'white'
                        }
                    }
                }
            }
        };

        const chart = new Chart(
            document.getElementById('profit_chart'),
            config
        );
        
    }).then(() => {
        let itemData = [smallBusyness, mediumBusyness, largeBusyness, hugeBusyness];
        const data = {
            labels: ['Small', 'Medium',  'Large', 'Huge'],
            datasets: [{
                label: 'Airport Busyness',
                data: itemData,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'cyan'
                ],
            }]
        };

        const config = {
            type: 'pie',
            data: data,
            options: {
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: 'white'
                        }
                    },
                    ChartjsPluginSorting
                }
            }
        };

        const chart = new Chart(
            document.getElementById('busyness_chart'),
            config
        );
        
    }).then(() => {
        let itemData = averageArray;
        const data = {
            labels: namesArray,
            datasets: [{
                label: 'Average profit per person visiting the airport',
                data: itemData,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'cyan'
                ],
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: 'white'
                        }
                    }
                }
            }
        };

        const chart = new Chart(
            document.getElementById('big_chart'),
            config
        );
        
    });
});
