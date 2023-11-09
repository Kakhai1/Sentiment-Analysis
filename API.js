function sendTextToAPI() {
    var userInput1 = document.getElementById("user_input1").value;
    var userInput2 = document.getElementById("user_input2").value;
    var apiUrl = 'http://127.0.0.1:5000/';  
    document.getElementById("loadingContainer").style.display = "flex"
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.style.display = "none";
    document.getElementById("resultContainer").style.display = "none";
    document.getElementById("reviewsContainerHeading").style.display = "none";
    var request = new Request(apiUrl, {
        method: 'POST', 
        body: JSON.stringify({text1: userInput1, text2: userInput2 }), 
        headers: {
            'Content-Type': 'application/json'
        }
    });

   
    fetch(request)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            if (data.dataframe.length === 0) {
                errorMessage.style.display = "block";
                document.getElementById("resultContainer").style.display = "none";
            } else 
            createHighchartsBarChart(data.dataframe, 'barChartContainer');
            createHighchartsGauge(data.dataframe, 'gaugeChartContainer');
            updateReviews(data.dataframe);
            console.log(data.dataframe);
            document.getElementById("loadingContainer").style.display = "none";
            document.getElementById("resultContainer").style.display = "block";
            document.getElementById("reviewsContainerHeading").style.display = "block";
        })
        .catch(function(error) {
            console.error('Error:', error);
            loadingCircle.style.display = "none";
            resultContainer.innerHTML = "An error occurred.";
            resultContainer.style.display = "block";
    });
       
};

function createHighchartsBarChart(data, containerId) {
    const sentimentCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    data.forEach(row => {
        sentimentCounts[row.Output]++;
    });

    const labels = Object.keys(sentimentCounts);
    const values = Object.values(sentimentCounts);

    Highcharts.chart(containerId, {
        chart: {
            type: 'bar',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
        title: {
            text: 'Sentiment rating count',
            style: {
                color: 'black',
            },
        },
        xAxis: {
            categories: labels.map(label => `${label}`),
            title: {
                text: 'Sentiment',
                style: {
                    color: 'black',
                },
            },
            labels: {
                style: {
                    color: 'black', 
                },
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Count',
                style: {
                    color: 'black',
                },
            },
            labels: {
                style: {
                    color: 'black',
                },
            },
        },
        series: [{
            name: 'Count',
            data: values,
        }]
    });
};

function createHighchartsGauge(data, containerId) {
    const totalSentiment = data.reduce((sum, row) => sum + row.Output, 0);
    const averageSentiment = totalSentiment / data.length;
    const minRange = 1;
    const maxRange = 5;

    Highcharts.chart(containerId, {
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: '80%'
        },
        title: {
            text: 'Average Sentiment Rating'
        },
        pane: {
            startAngle: -90,
            endAngle: 90,
            background: [{
                outerRadius: '100%',
                innerRadius: '0%',
                shape: 'arc',
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#DDD']
                    ]
                }
            }]
        },
        yAxis: {
            min: minRange,
            max: maxRange,
            title: {
                text: 'Rating'
            },
        },
        plotOptions: {
            gauge: {
                dataLabels: {
                    enabled: false
                },
                dial: {
                    radius: '100%',
                    backgroundColor: 'black',
                    borderColor: 'silver',
                    borderWidth: 1,
                    baseWidth: 10,
                    topWidth: 1,
                    rearLength: '0'
                }
            }
        },
        series: [{
            name: 'Average Rating',
            data: [averageSentiment],
            tooltip: {
                valueSuffix: ' stars'
            }
        }]
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const readMoreLinks = document.querySelectorAll('.read-more');
    const readLessLinks = document.querySelectorAll('.read-less');
    const reviewTexts = document.querySelectorAll('.review-text');

    
    readMoreLinks.forEach((readMore, index) => {
        readMore.addEventListener('click', function() {
            reviewTexts[index].style.height = 'auto';
            readMore.style.display = 'none';
            readLessLinks[index].style.display = 'inline';
        });
    });

    
    readLessLinks.forEach((readLess, index) => {
        readLess.addEventListener('click', function() {
            reviewTexts[index].style.height = '80px'; 
            readMoreLinks[index].style.display = 'inline';
            readLess.style.display = 'none';
        });
    });
});

function updateReviews(data) {
    const reviewsList = document.getElementById("reviewsList");
    reviewsList.innerHTML = ""; 

    const table = document.createElement("table");

    data.forEach(row => {
        const rowElement = document.createElement("tr");

        const ratingCell = document.createElement("td");
        ratingCell.textContent = row.Output;
        ratingCell.style.color = "white";
        ratingCell.style.fontSize = "16px";
        ratingCell.style.fontFamily = "monospace";
        rowElement.appendChild(ratingCell);

        const reviewCell = document.createElement("td");
        reviewCell.textContent = row.Review;
        reviewCell.style.color = "white"; 
        reviewCell.style.fontFamily = "monospace";
        rowElement.appendChild(reviewCell);

        table.appendChild(rowElement);
    });

    reviewsList.appendChild(table);
}
// function createOutputMappingTable() {
//     const outputMapping = {
//         1: "Terrible",
//         2: "Bad",
//         3: "Neutral",
//         4: "Good",
//         5: "Amazing"
//     };

//     const tableContainer = document.getElementById("outputMappingTable");
//     const table = document.createElement("table");

    
//     const headerRow = table.insertRow(0);
//     const headerCell1 = headerRow.insertCell(0);
//     const headerCell2 = headerRow.insertCell(1);
//     headerCell1.textContent = "Star Rating";
//     headerCell2.textContent = "Defintion of the Rating";

    
//     let rowIndex = 1;
//     for (const key in outputMapping) {
//         const row = table.insertRow(rowIndex);
//         const cell1 = row.insertCell(0);
//         const cell2 = row.insertCell(1);
//         cell1.textContent = key;
//         cell2.textContent = outputMapping[key];
//         rowIndex++;
//     }

//     tableContainer.appendChild(table);
// }


// document.addEventListener("DOMContentLoaded", createOutputMappingTable);