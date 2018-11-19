d3.json("log.json").then(function(data){
    // console.log(data)
    const svg = d3.select("body").append("svg").attr("width","100%").attr("height","100%")
    const height = 500;
    const width = 1200;
    const margin = {top: 50, bottom: 50, left: 50, right: 50}
    const colors = d3.scaleOrdinal(d3.schemeSet1)
    let tooltip = d3.select("body")
                        .append("div")
                        .style("position", "absolute") 
                        .style("z-index", "10")
                        .style("visibility", "hidden")
    let chartGroup = svg.append("g").attr("transform",`translate(${margin.left},100)`)
    let dataTaal = d3.nest()
                        .key(function (d){return d.taal})
                        .entries(data)
                        console.log(dataTaal)
                    
    let genres = d3.nest()
                        .key(function(d){return d.genre})
                        .entries(data)

    let dataYear = d3.nest()
                        .key(function (d){return d.jaartal})
                        .entries(data)   
                        console.log(dataYear)    
   
    let reversedata=dataYear.reverse()   

    let y= d3.scaleLinear()
            .domain([0, d3.max(reversedata,function(d){return d.values.length})])
            .range([height, 0])

    let x = d3.scaleBand()
            .domain(reversedata.map(function(d){return d.key})) 
            .range([0, 1150]).paddingInner(0.05)

    let yAxis = d3.axisLeft(y)
    let xAsis = d3.axisBottom(x)
    chartGroup.append("g").attr("class","axis y").call(yAxis)

    chartGroup.selectAll("rect")
        .data(reversedata)
        .enter().append("rect")
                    .attr("width", x.bandwidth()) // width van de rect
                    .attr("height", function(d,i){return height- y(d.values.length);}) // height van de rect. Hier word de d waarde uit een iteratie gepakt en vervolgens vermendigvult met 15
                    .attr("x", function(d){ return x(d.key)}) // x cordinaten van de rect Hier wor dus gezegt de iteratie van de rect word steeds met 60 pixels verschoven over de x as. Er word hier 60 gedaan om dat de width van de bar zelf 50 is anders plakken ze aan elkaar vast
                    .attr("fill", function(d,i){return colors(d.values.length)}) // De rect worden gevult met de kleur rood
                    .attr("y", function(d,i){return y(d.values.length);}) // y coordinaten van de rect. De y coordinaten positioneerd de top van de rect verticaal. Dus we moeten het nu gaan inverten door de y coordinaten op 300 te zetten en vervolgens de hoogte aftrekken
                    .on("mouseover", mouseOver)
	                .on("mousemove", mouseMove)
                    .on("mouseout", mouseOut)
                    .on("click", mouseClick);


function mouseClick(d){ 
    console.log(this.x)
    let x = this
    console.log(x.attr  )
    // console.log(d)
    let nestedTalen = []
    let talen = d.values.map(function(d){return d.taal})
    let lan = d3.nest()
    .key(function(d){return d})
    .entries(talen)
    console.log(lan) 
    d3.select(this).remove()
    
}

function mouseMove()
    {return tooltip.style("top", 
    (event.pageY-10)+"px").style("left",
    (event.pageX+10)+"px");
}

function mouseOver(d){
    return tooltip
    .style("visibility", "visible")
    .text(d.key + " = " + d.values.length)
    // console.log(d);
}

function mouseOut(){
    return tooltip.style("visibility", "hidden");
} 

chartGroup.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0,${height})`)
    .call(xAsis)
})