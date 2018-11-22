d3.json("log.json").then(function(data){
var svg = d3.select("svg"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    function languagesCounter(data) {
        return d3
          .nest()
          .key(function(d) {
            return d.taal
          })
          .rollup(function(v) {
            return v.length
          })
          .entries(data)
      }
    

      const color = d3.scaleOrdinal(d3.schemeSet1)
// Generate the pie
var pie = d3.pie().value(function(d){
    return d.percent
})

// Generate the arcs
var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

var svgPie = d3.select('.piechart'),
widthPie = svgPie.attr('width'),
heightPie = svgPie.attr('height'),
radiusPie = Math.min(widthPie, heightPie) / 2


var pie = d3.pie().value(function(d) {
return d.percent
})


var label = d3
.arc()
.outerRadius(radiusPie)
.innerRadius(radiusPie - 80)

function countTotal(array) {
    var total = 0
    array.forEach(function(d) {
      total = total + d.value
    })
    return total
  }

var pie_data = []
var languagesCount = languagesCounter(data)
//percentages for pie chart
for (var a = 0; a < languagesCount.length; a++) {
// simple logic to calculate percentage data for the pie
pie_data[a] = {
language: languagesCount[a].key,
percent: (languagesCount[a].value / countTotal(languagesCount)) * 100
}}

// console.log(pie_data)
//Generate groups
var arcs = g
            .selectAll("arc")
            .data(pie(pie_data))
            .enter()
            .append("g")
            .attr("class", "arc")       

//Draw arc paths
    arcs
            .append("path")
            .attr("fill", function(d) {
                return color(d.data.language);
            })
            .attr("d", arc);

            arcs
            .append('text')
            .attr('transform', function(d) {
                return 'translate(' + label.centroid(d) + ')'
              })
            .text(function(d) {
              return d.data.language
            })
})        

// const array = [{key: "eng", values: ["eng", "eng", "eng", "eng", "eng", "eng"]},{key: "dut", values: ["dut", "dut", "dut", "dut", "dut"]},{key: "Ger", values: ["ger", "ger", "ger"]}]
// const colors = d3.scaleOrdinal(d3.schemeSet1)
// const svg = d3.select("body").append("svg").attr("width","100%").attr("height","100%")
// const height = 500;
// const width = 1200;
// const margin = {top: 50, bottom: 50, left: 50, right: 50}
// let y= d3.scaleLinear()
// .domain([0, d3.max(array,function(d){return d.values.length})])
// .range([height, 0])

// let x = d3.scaleBand()
// .domain(array.map(function(d){return d.key})) 
// .range([0, 1150]).paddingInner(0.05)
// let yAxis = d3.axisLeft(y)
// let xAsis = d3.axisBottom(x)
// let chartGroup = svg.append("g").attr("transform",`translate(${margin.left},240)`)
// // chartGroup.append("g").attr("class","axis y").call(yAxis)
// let enterchart=chartGroup.selectAll("rect").data(array)
//                             .enter()
//                             .append("rect")
//                             .attr("width", x.bandwidth()) // width van de rect
//                             .attr("height", function(d,i){return height- y(d.values.length);}) // height van de rect. Hier word de d waarde uit een iteratie gepakt en vervolgens vermendigvult met 15
//                             .attr("x", function(d,i){ return 10}) // x cordinaten van de rect Hier wor dus gezegt de iteratie van de rect word steeds met 60 pixels verschoven over de x as. Er word hier 60 gedaan om dat de width van de bar zelf 50 is anders plakken ze aan elkaar vast
//                             .attr("fill", function(d,i){return colors(i)}) // De rect worden gevult met de kleur rood
//                             .attr("y", function(d,i) { return i*(height- y(d.values.length))})
// enterchart.attr("y", function(d,i){
//             var prevData = enterchart.data()[i-1]
//             // console.log(prevData)
//             if(typeof prevData === "undefined"){
//                 return i*(height- y(d.values.length))
//             }else{
//                 // console.log(prevData)
//                 console.log(i*(height- y(prevData.values.length)))
//                 return i*(height- y(prevData.values.length));
                
//             }
            
            
//             // console.log(prevData)
          
//         })
//          // y coordinaten van de rect. De y coordinaten positioneerd de top van de rect verticaal. Dus we moeten het nu gaan inverten door de y coordinaten op 300 te zetten en vervolgens de hoogte aftrekken
// // console.log(y)
// // i*(height- y(d.values.length))
// // .attr("y", function(d,i){return console.log(height- y(d.values.length));})