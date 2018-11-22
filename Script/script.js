d3.json("https://raw.githubusercontent.com/remcopasma/frontend-data/master/Script/log.json").then(function(data){
    // console.log(data)
    const svg = d3.select("body").append("svg").attr("width","860px").attr("height","100%").attr("class","barchart")
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
   
    
    // let dataTaal = d3.nest()
    //                     .key(function (d){return d.taal})
    //                     .entries(data)
    //                     // console.log(dataTaal)
                    
    // let genres = d3.nest()
    //                     .key(function(d){return d.genre})
    //                     .entries(data)

    let dataYear = d3.nest()
                        .key(function (d){return d.jaartal})
                        .entries(data)   
                        // console.log(dataYear)    
   
    let reversedata=dataYear.reverse()   

    let y= d3.scaleLinear()
            .domain([0, d3.max(reversedata,function(d){return d.values.length})])
            .range([height, 0])

    let x = d3.scaleBand()
            .domain(reversedata.map(function(d){return d.key})) 
            .range([0, 800]).paddingInner(0.05)

    let yAxis = d3.axisLeft(y)
    let xAsis = d3.axisBottom(x)
    chartGroup.append("g").attr("class","axis y").call(yAxis)


    // Titel Barchart
    svg.append('text')
    .attr('x',180)
    .attr('y', 50)
    .attr('font-size', '20px')
    .attr('font-weight','bold')
    .text('Aantal boeken met de zoekopdracht Michael Jackson')

   // text label voor de X as
    svg.append("text")      
    .attr("transform", "translate(" + (width / 3) + " ," + (height + margin.bottom+110) + ")")
    .text("Aantal Jaren")
    .attr('font-weight','bold')
    
    // text voor de Y as
    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 50 - margin.left)
    .attr("x", - (height / 1.3))
    .attr("dy", "1em")
    .text("Aantal Boeken")
    .attr('font-weight','bold')

    chartGroup.selectAll("rect")
        .data(reversedata)
        .enter().append("rect")
                    .attr("width", x.bandwidth()) // breedte van de rect
                    .attr("height", function(d,i){return height- y(d.values.length);}) // hoogte van de rect. Credits loc
                    .attr("x", function(d){ return x(d.key)}) // x coordinaten van de rect
                    .attr("fill", function(d,i){return colors(d.values.length)}) // De rect wordt gevuld met kleuren volgens een kleurenschema
                    .attr("y", function(d,i){return y(d.values.length);}) // y coordinaten van de rect.
                    .on("mouseover", mouseOver)
	                .on("mousemove", mouseMove)
                    .on("mouseout", mouseOut)
                    .on("click", mouseClick);

    function mouseMove(){
        return tooltip.style("top", 
        (event.pageY-10)+"px").style("left",
        (event.pageX+10)+"px");
    }

    function mouseOver(d){
        return tooltip
        .style("visibility", "visible")
        .text(d.key + " = " + d.values.length + ' Boeken'), // credits loc
        d3.select(this).attr('opacity', '0.5')
        // console.log(d);
    }

    function mouseOut(){
        return tooltip.style("visibility", "hidden"),
        d3.select(this).attr('opacity', '1')
    } 

    chartGroup.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${height})`)
        .call(xAsis)                


    function mouseClick(d){ 
        // console.log(this)
        // let x = this
        // console.log(d)
        let talen = d.values.map(function(d){return d.taal})
        let language = d3.nest()
                        .key(function(d){return d})
                        .entries(talen)

        //console.log(language) 
        let currentRect = d3.select(this)
        currentRect.data()
        newData = []
        language.forEach(function(lang){
            newData.push({language: lang.key, value: lang.values.length}) // credits joost

        })
        console.log(newData)


        const svg = d3.select("svg"),  // piechart 
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = Math.min(width, height) / 2
        const margin = {top: 50, bottom: 50, left: 250, right: 50}
        g = svg.append("g").attr("transform",`translate(${margin.left},350)`)
        

            svg.append('text') // Titel van de piechart
                .attr('x',80)
                .attr('y', 50)
                .attr('font-size', '20px')
                .attr('font-weight','bold')
                .text('Percentage per taal in het gekozen jaar')
            
            // Kleuren van de piechart
            const color = d3.scaleOrdinal(d3.schemeSet1)
        
            // Generate the pie
            var pie = d3.pie().value(function(d){
                return d.percent
            })
        
        
            var svgPie = d3.select('.piechart'),
            widthPie = svgPie.attr('width'),
            heightPie = svgPie.attr('height'),
            radiusPie = Math.min(widthPie - 150, heightPie - 150) / 2
        
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
            
            d3.json("log.json").then(function(){
                var pie_data = []
                //procenten in de pie chart
                for (var a = 0; a < newData.length; a++) {
                // Bereken het percentage credits naar joost
                pie_data[a] = {
                language: newData[a].language,
                percent: (newData[a].value / countTotal(newData)) * 100
                    
            }      
        }
            console.log(pie_data)
        
            var tooltip = d3
                .select('body')
                .append('div')
                .style('position', 'absolute')
                .style('z-index', '10')
                .style('visibility', 'hidden')
            
            // Zorgt ervoor dat de tooltip bij het bewegen van de muis blijft
            function mouseMove() {
                return tooltip
                .style('top', event.pageY - 20 + 'px')
                .style('left', event.pageX + 20 + 'px')

            }
            
            // Mousover
            function onMouseOverPie(d) {
            d3.select(this).attr('class', 'highlightPie')
            .attr('fill', '#ffffff')
            //label
            return tooltip
                .style('visibility', 'visible')
                .text(d.data.language + ' = ' + Math.round(d.value) + '%')
                
            }
                
        
            // zorgt ervoor dat de tooltip wegblijft als je er niet meer overheen gaat
            function onMouseOutPie(d) {
                d3.select(this)
                return tooltip.style('visibility', 'hidden'),
                d3.select(this).attr('opacity', '1')
                
            }
            
            // Generate the arcs
            var arc = d3.arc()
                        .innerRadius(0)
                        .outerRadius(radius);
           
            //Generate groups
            var arcs = g
                .selectAll("arc")
                .data(pie(pie_data))
                .enter()
                .append("g")    
        
            //Draw arcs paths
            arcs
                .on('mouseout', onMouseOutPie)
                .on('mousemove', mouseMove)
                .on('mouseover', onMouseOverPie)
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
    }
})