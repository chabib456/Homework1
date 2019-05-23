function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  console.log(sample);
  // Use `d3.json` to fetch the metadata for a sample
  
    var url = `/metadata/${sample}`;
    d3.json(url).then(function(data){
      console.log("metadata :");
      console.log(data);
    // Use d3 to select the panel with id of `#sample-metadata`
  var meta = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
  meta.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(data).forEach(([key, value]) => meta.append("p").text(`${key}: ${value}`));
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WF REQ);
  });
};

function buildCharts(sample) {
  console.log(sample);
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/samples/${sample}`;
  d3.json(url).then(function(data){
    console.log("sample: ");
    console.log(data);
  
    // @TODO: Build a Bubble Chart using the sample data
    var bubble_trace = {
      x: data.otu_ids,
      y: data.sample_values,
      text: data.otu_labels,
      mode: 'markers',
      marker: {
        color: data.otu_ids,
        size: data.sample_values
      }
    };
    
    var data1 = [bubble_trace];
    
    var layout = {
      
      showlegend: false,
      
    };
    
    Plotly.newPlot('bubble', data1, layout);
  
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    console.log(data);
    
    
    // Slice the first 10 objects for plotting
    var myData = Object.keys(data).map(key => {
      return data[key];
  });
    console.log(myData);
    data2 = [myData[0].slice(0,10),myData[1].slice(0,10),myData[2].slice(0,10)];
    console.log("sorted:");
    console.log(data2);
   
    var trace1 = {
      labels: data2[0],
      values: data2[2],
      text: data2[1],
      type: 'pie'
       };
      
      var data3 = [trace1];
      
      var layout = {
      title: "'Pie Chart",
      };
      
     Plotly.newPlot("pie", data3, layout);
    });
  };
  


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Initialize the dashboard
init();
