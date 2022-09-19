const datas = [
    { language: "A", value: 47 },
    { language: "B", value: 81 },
    { language: "C", value: 33 },
    { language: "D", value: 54.21 },
    { language: "E", value: 41.78 },
    { language: "F", value: 41.78 },
    { language: "G", value: 41.78 },
    { language: "H", value: 41.78 },
    { language: "I", value: 41.78 },
]
const area = document.querySelector("#bar")
const area_scatter = document.querySelector("#scatter")
const body = document.querySelector('body')
body.onresize = function () {
    const barSVG = document.querySelector("#svg-bar")
    if (barSVG != null) {
        barSVG.remove()
        drawBarChart()
    }
    const scatterSVG = document.querySelector('#svg-scatter')
    if (scatterSVG != null) {
        scatterSVG.remove()
        drawScatterChart()
    }
    const pieSVG = document.querySelector('#svg-pie')
    if (pieSVG != null) {
        pieSVG.remove()
        drawPieChart()
    }
}
drawBarChart()
function drawBarChart() {

    //d3.csv("data/votes_per_candidate.csv", function (tdata) {
    d3.csv("data/votes_per_candidate.csv").then(function (tdata) {
        console.log(tdata);
        /*if (error) {
            throw error;
        }*/

        //xScale.domain(data.map(function (d) { return d.candidate; }));
        //yScale.domain([d3.min(data, function (d) { return d.votes; }), d3.max(data, function (d) { return d.votes; })]);

        const margin = { y: 40, x: 100 },
            width = area.offsetWidth - (2 * margin.x),
            height = area.offsetHeight - (2 * margin.y);
        const svg = d3.select(area).append("svg")
        svg.attr("width", width + (2 * margin.x))
            .attr("height", height + (2 * margin.y))
            .attr('id', 'svg-bar')
        const chart = svg.append('g')
            .attr('transform', `translate(${margin.x},${margin.y})`)

        const yScale = d3.scaleLinear()
            .range([height, 0])
            //.domain([0, 100])
            .domain([0, d3.max(tdata, (d) => (d.percent_votes))])

        chart.append('g')
            .attr('class', 'axis')
            .call(d3.axisLeft(yScale))

        const xScale = d3.scaleBand()
            .range([0, width])
            .domain(tdata.map((d) => d.candidate))
            //.domain(d3.map(tdata,function (d) { return d.candidate; }))
            .padding(0.2)

        chart.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale))



        //Draw grid
        chart.append('g')
            .attr('class', 'grid-hline')
            .call(d3.axisLeft().scale(yScale).tickSize(-width, 0, 0).tickFormat(''))
        //End Draw grid


        //Top Title
        svg.append('text')
            .attr('x', (width / 2) + margin.x)
            .attr('y', margin.y / 2)
            .attr('class', 'title')
            .attr('text-anchor', 'middle')
            .text('% Votes Per Candidate')
        //End Top Title

        //x Axis Title
        svg.append('text')
            .attr('x', (width / 2) + margin.x)
            .attr('y', (margin.y * 2))
            .attr('transform', `translate(0,${height - (margin.y / 4)})`)
            .attr('class', 'title')
            .text('Candidate')
        //End x axis title

        //y Axis Title
        svg.append('text')
            .attr('class', 'title')
            .attr('x', -(height / 2) - margin.y)
            .attr('y', margin.x / 2.4)
            .attr('transform', 'rotate(-90)')
            .text('% Votes')
        //End y Axis Title


        chart.selectAll()
            .data(tdata)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', (d) => xScale(d.candidate))
            .attr('y', (d) => yScale(d.percent_votes))
            .attr('height', (d) => height - yScale(d.percent_votes))
            .attr('width', xScale.bandwidth())
            .style('fill', (d) => d.party_color)
            .on('mouseenter', function () {
                d3.select(this).attr('class', 'hover-bar')

            })
            .on('mouseleave', function () {
                d3.select(this).attr('class', 'bar')
            })




    });
}


drawScatterChart()
function drawScatterChart() {


    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = area_scatter.offsetWidth - margin.left - margin.right,
        height = area_scatter.offsetHeight - margin.top - margin.bottom;
    

    // append the svg object to the body of the page
    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    

    //d3.csv("data/overall_stats_2.csv", function (tdata){
    d3.csv("data/overall_stats_2.csv").then(function (data) {
        
        console.log(data);
        data.forEach(function(d) {
            d.per_turnup = d.per_turnup;
            d.invalid_votes = parseInt(d.invalid_votes);
        });

        var max_invalid_votes = d3.max(data, function(d) { return d.invalid_votes; });
        var min_invalid_votes = d3.min(data, function(d) { return d.invalid_votes; });

        var max_turnup = d3.max(data, function(d) { return d.per_turnup; });
        var min_turnup = d3.min(data, function(d) { return d.per_turnup; });

        // Add X axis
        var x = d3.scaleLinear()
            .domain([min_invalid_votes, max_invalid_votes])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr('class', 'axis')
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([min_turnup, max_turnup])
            .range([height, 0]);
        svg.append("g")
            .attr('class', 'axis')
            .call(d3.axisLeft(y));

        //Draw grid
        svg.append('g')
            .attr('class', 'grid-hline')
            .call(d3.axisLeft().scale(y).tickSize(-width, 0, 0).tickFormat(''))
        //End Draw grid

        //Top Title
        svg.append('text')
            .attr('x', (width / 2) + margin.left + margin.right)
            .attr('y', margin.top / 2)
            .attr('class', 'title')
            .attr('text-anchor', 'middle')
            .text('% Voter turnout Vs Invalid votes')
        //End Top Title

        //x Axis Title
        svg.append('text')
            .attr('x', (width / 2) + margin.left + margin.right)
            .attr('y', (margin.top * 2.5))
            .attr('transform', `translate(0,${height - (margin.top / 4)})`)
            .attr('class', 'title')
            .text('Invalid votes')
        //End x axis title

        //y Axis Title
        svg.append('text')
            .attr('class', 'title')
            .attr('x', -(height / 2) - margin.top)
            .attr('y', (margin.right))
            .attr('transform', 'rotate(-90)')
            .text('% Voter turnout')
        //End y Axis Title

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cy", function (d) { return y(d.per_turnup); })
            .attr("cx", function (d) { return x(d.invalid_votes); })
            .attr("r", 1.5)
            .style("fill", "#69b3a2")


    });

}




/*
drawLineChart()
function drawLineChart() {
    const area = document.querySelector('#line')
    const margin = { y: 40, x: 60 },
        width = area.offsetWidth - (2 * margin.x),
        height = area.offsetHeight - (2 * margin.y);
    const svg = d3.select(area).append("svg")
    svg.attr("width", width + (2 * margin.x))
        .attr("height", height + (2 * margin.y))
        .attr('id', 'svg-line')
    const chart = svg.append('g')
        .attr('transform', `translate(${margin.x},${margin.y})`)

    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 100])

    chart.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(yScale))

    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(datas.map((d) => d.language))
        .padding(0.2)

    chart.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale))

    //Draw grid
    chart.append('g')
        .attr('class', 'grid-hline')
        .call(d3.axisLeft().scale(yScale).tickSize(-width, 0, 0).tickFormat(''))
    //End Draw grid

    //Top Title
    svg.append('text')
        .attr('x', (width / 2) + margin.x)
        .attr('y', margin.y / 2)
        .attr('class', 'title')
        .attr('text-anchor', 'middle')
        .text('Line chart')
    //End Top Title

    //x Axis Title
    svg.append('text')
        .attr('x', (width / 2) + margin.x)
        .attr('y', (margin.y * 2))
        .attr('transform', `translate(0,${height - (margin.y / 4)})`)
        .attr('class', 'title')
        .text('x axis title')
    //End x axis title

    //y Axis Title
    svg.append('text')
        .attr('class', 'title')
        .attr('x', -(height / 2) - margin.y)
        .attr('y', margin.x / 2.4)
        .attr('transform', 'rotate(-90)')
        .text('y axis title')
    //End y Axis Title

    const line = d3.line()
        .x(function (d, i) { return xScale(d.language) })
        .y(function (d, i) { return yScale(d.value) })
        .curve(d3.curveMonotoneX)

    chart.append('path')
        .datum(datas)
        .attr('class', 'line')
        .attr('d', line)

}
drawPieChart()
function drawPieChart() {
    const good_datas = []
    let total = 0
    for (let i = 0; i < datas.length; i++) {
        total = +datas[i].value + +total
    }
    for (let i = 0; i < datas.length; i++) {
        good_datas.push(
            {
                value: datas[i].value / total,
                color: "#AA" + Math.ceil(Math.random() * 10000),
                title: datas[i].language
            })
    }

    const area = document.querySelector('#pie')
    const margin = { y: 40, x: 60 },
        width = area.offsetWidth - (2 * margin.x),
        height = area.offsetHeight - (2 * margin.y);
    const svg = d3.select(area).append("svg")
    svg.attr("width", width + (2 * margin.x))
        .attr("height", height + (2 * margin.y))
        .attr('id', 'svg-pie')
    const chart = svg.append('g')
        .attr('transform', `translate(${(width + (2 * margin.x)) / 4},${(height + (2 * margin.y)) / 2})`)
    const legend = svg.append('g')
        .attr('transform', `translate(${(width + (2 * margin.x)) / 2},${margin.y})`)

    //Top Title
    svg.append('text')
        .attr('x', (width / 2) + margin.x)
        .attr('y', margin.y / 2)
        .attr('class', 'title')
        .attr('text-anchor', 'middle')
        .text('Pie chart')
    //End Top Title

    const radius = (width < height) ? width / 2 : height / 2;

    const arc = d3.arc()
        .innerRadius(radius)
        .outerRadius(0)

    const pie = d3.pie().value(function (d, i) { return d.value })

    chart.selectAll('arc')
        .data(pie(good_datas))
        .enter()
        .append('path')
        .attr('d', arc)
        .style('fill', function (d, i) { return good_datas[i].color })
    legend.selectAll('circle')
        .data(good_datas)
        .enter()
        .append('circle')
        .attr('r', 5)
        .attr('cx', 20)
        .attr('cy', function (d, i) { return i * 20 })
        .attr('fill', function (d, i) { return d.color })
    legend.selectAll('text')
        .data(good_datas)
        .enter()
        .append('text')
        .attr('class', 'title')
        .attr('x', 50)
        .attr('y', function (d, i) { return 5 + (i * 20) })
        .text(function (d, i) { return d.title })
}
*/