myApp.component('studyView',{
    templateUrl:  '/js/templates/studyview.html',
    controller: studyViewController,
    bindings:{
        dataset:'<'
    }
});

function studyViewController($scope,$rootScope,$state,$stateParams){
    this.testid=$stateParams.ID; 
    // Now we want to have the loaded data (MongoDB DB) in our scope
    study_data=$rootScope.datasets.find(x =>x.ID===this.testid)
    this.studyData=study_data; 
    this.StudyType=this.studyData.Study_type
    $scope.getTypeOf = function(item){
            return typeof item;
        }
// the bar plot to visualize numerical data
  $scope.drawBar=function(dataset_study){
      // Area to define the barplot
    var margin_left=40;
    var margin_right=40;
    var margin_top=20;
    var margin_bottom=20;
    var height=500-margin_top-margin_bottom;
    var width=500-margin_left-margin_right;
    var svg = d3.select("#plotarea").append("svg")
    .attr("width", width + margin_left + margin_right)
    .attr("height", height + margin_top + margin_bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_left + "," + margin_top + ")");
    dataset={};
    // combine the labels
    var labels_control=dataset_study.Control_sample_code.split(",");
    var labels_implant=dataset_study.Implant_sample_code.split(",");
    var control_group=Array(labels_control.length).fill("Control");
    var implant_group=Array(labels_implant.length).fill("Implant");
    var groups=control_group.concat(implant_group);
    combined_labels=labels_control.concat(labels_implant);
    // Combine the experimental values
    combined_data=dataset_study.Control_sample_values.concat(dataset_study.Implant_sample_values)
    
    // convert strings to numeric values
    arrOfNumbers=[]
    combined_data.forEach(str => {
  arrOfNumbers.push(Number(str));
    })
    
    arr = [];
    combined_data.forEach(function(v,i){
    var obj = {};
    obj.value = v;
    obj.label =  combined_labels[i];
    obj.group = groups[i]
    arr.push(obj);
  });
  console.log(arr)
    // create an x-axis 
    var x_axis = d3.scaleBand().range([ 0, width ])
  .domain(combined_labels)
    
  svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x_axis))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");
  
  var y_axis = d3.scaleLinear()
  .domain([0,10])
  .range([ height, 0]);
  
  svg.append("g").call(d3.axisLeft(y_axis));

  // create the color group
  var color = d3.scaleOrdinal()
    .domain(groups)
    .range(['#e41a1c','#377eb8'])

  // Now we can add the barplots
  svg.selectAll(".bar")
         .data(arr)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return  x_axis(d.label); })
         .attr("y", function(d) { return y_axis(d.value); })
         .attr("width", x_axis.bandwidth()-0.3)
         .attr("height", function(d) { return height-y_axis(d.value); })
         .attr("fill", function(d) { return color(d.group); });

  }


}

