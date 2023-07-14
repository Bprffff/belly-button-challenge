const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
function init() {
    let dropdownMenu = d3.select("#selDataset");
    d3.json(url).then((data) => {
    let namesList = data.names;
    namesList.forEach(name => {
        dropdownMenu
        .append("option")
        .attr("value", name)
        .text(name);
    })
 const firstPlotId = namesList[0];
 chartCreation(firstPlotId);
 demographics(firstPlotId);

})}

function chartCreation(sample) {
    d3.json(url).then((data) => {
        let samplesArray = data.samples;
        let selectedSample = samplesArray.filter(sampleJSON => sampleJSON.id == sample);
        let result = selectedSample[0];
        let sampleValues = result.sample_values;
        let otuIds = result.otu_ids;
        let otuLabels = result.otu_labels;

        let traceBar = [
            {
                type: 'bar',
                x: sampleValues.slice(0,10).reverse(),
                y: otuIds.slice(0,10).map(id => `OTU ${id}`).reverse(),
                text: otuLabels.slice(0,10).reverse(),
                orientation: 'h'
            }];

        let layoutBar = {
            xaxis: {
            },
            yaxis: {
            },
            height: 500,
            width: 400
        };

         Plotly.newPlot("bar", traceBar, layoutBar);

        let traceBubble = [
            {
                x: otuIds,
                y: sampleValues,
                mode: 'markers',
                marker: {
                    size: sampleValues,
                    colorscale: 'Earth',
                    color: otuIds
                },
                text: otuLabels
            }];

        let layoutBubble = {
                xaxis: {
                    title: 'OTU ID'
                },
                yaxis: {
                    title: 'Sample Values'
                }
        }

        Plotly.newPlot("bubble", traceBubble, layoutBubble);
        let metadataArray = data.metadata;
        let selectedSampleWash = metadataArray.filter(sampleJSON => sampleJSON.id == sample);
        let resultWash = selectedSampleWash[0];
        let washFreq = resultWash.wfreq;
       
    })
}

function demographics(sample) {
    d3.json(url).then((data) => {
        let metadataArray = data.metadata;
        let selectedSample = metadataArray.filter(sampleJSON => sampleJSON.id == sample);
        let result = selectedSample[0];
        let demoBox = d3.select('#sample-metadata');
        demoBox.html("");

        let slicedResult = Object.entries(result);

        slicedResult.forEach(keyValue => {
            demoBox.append("h6")
            .style("font-weight", "bold")
            .text(`${keyValue[0]}: ${keyValue[1]}`);
        })
    })
}

function optionChanged(updatedSample) {
    chartCreation(updatedSample);
    demographics(updatedSample);
}
init();