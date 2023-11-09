function displayDataframe(data) {
    const dataframeList = document.getElementById("dataframe_list");

    
    const sentimentCounts = {
        Terrible: 0,
        Bad: 0,
        Neutral:0,
        Good: 0,
        Amazing: 0
    };

    
    data.forEach(row => {
        sentimentCounts[row.Output]++;
    });

    
    const labels = Object.keys(sentimentCounts);
    const values = labels.map(label => sentimentCounts[label]);

    
    const chartData = [{
        x: labels,
        y: values,
        type: 'bar'
    }];

    
    const chartLayout = {
        title: 'Sentiment Analysis',
        xaxis: { title: 'Sentiment' },
        yaxis: { title: 'Count' }
    };

    
    Plotly.newPlot(dataframeList, chartData, chartLayout);
}

document.addEventListener("DOMContentLoaded", function() {
});
