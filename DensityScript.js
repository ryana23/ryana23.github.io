


// https://observablehq.com/@d3/density-contours@145
function _1(md){return(
  md`# Density Contours
  
  This chart shows the relationship between idle and eruption times for [Old Faithful](https://en.wikipedia.org/wiki/Old_Faithful). See also the importable [chart component](/@d3/density-contours/2) version of this example.`
  )}
  
  function _chart(d3,width,height,xAxis,yAxis,contours,data,x,y)
  {
    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height]);
    
    svg.append("g")
        .call(xAxis);
    
    svg.append("g")
        .call(yAxis);
    
    svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
      .selectAll("path")
      .data(contours)
      .join("path")
        .attr("stroke-width", (d, i) => i % 5 ? 0.25 : 1)
        .attr("d", d3.geoPath());
    
    svg.append("g")
        .attr("stroke", "white")
      .selectAll("circle")
      .data(data)
      .join("circle")
        .attr("cx", d => x(d.x))
        .attr("cy", d => y(d.y))
        .attr("r", 2);
    
    return svg.node();
  }
  
  
  function _x(d3,data,margin,width){return(
  d3.scaleLinear()
      .domain(d3.extent(data, d => d.x)).nice()
      .rangeRound([margin.left, width - margin.right])
  )}
  
  function _y(d3,data,height,margin){return(
  d3.scaleLinear()
      .domain(d3.extent(data, d => d.y)).nice()
      .rangeRound([height - margin.bottom, margin.top])
  )}
  
  function _xAxis(height,margin,d3,x,data){return(
  g => g.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
          .attr("y", -3)
          .attr("dy", null)
          .attr("font-weight", "bold")
          .text(data.x))
  )}
  
  function _yAxis(margin,d3,y,data){return(
  g => g.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text(data.y))
  )}
  
  function _height(){return(
  600
  )}
  
  function _margin(){return(
  {top: 20, right: 30, bottom: 30, left: 40}
  )}
  
  function _contours(d3,x,y,width,height,data){return(
  d3.contourDensity()
      .x(d => x(d.x))
      .y(d => y(d.y))
      .size([width, height])
      .bandwidth(30)
      .thresholds(30)
    (data)
  )}
  
  async function _data(d3,FileAttachment){return(
  Object.assign(d3.tsvParse(await FileAttachment("faithful.tsv").text(), ({waiting: x, eruptions: y}) => ({x: +x, y: +y})), {x: "Idle (min.)", y: "Erupting (min.)"})
  )}
  
  export default function define(runtime, observer) {
    const main = runtime.module();
    function toString() { return this.url; }
    const fileAttachments = new Map([
      ["faithful.tsv", {url: new URL("./files/98d78d7f290f9776833e989617d49b592039ea65fee3b451764067cccd582eac122b3a07619cf223e8526910284fc105dfcb24b9af785535ee1dc6914687f9ac", import.meta.url), mimeType: null, toString}]
    ]);
    main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
    main.variable(observer()).define(["md"], _1);
    main.variable(observer("chart")).define("chart", ["d3","width","height","xAxis","yAxis","contours","data","x","y"], _chart);
    main.variable(observer("x")).define("x", ["d3","data","margin","width"], _x);
    main.variable(observer("y")).define("y", ["d3","data","height","margin"], _y);
    main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","data"], _xAxis);
    main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","data"], _yAxis);
    main.variable(observer("height")).define("height", _height);
    main.variable(observer("margin")).define("margin", _margin);
    main.variable(observer("contours")).define("contours", ["d3","x","y","width","height","data"], _contours);
    main.variable(observer("data")).define("data", ["d3","FileAttachment"], _data);
    return main;
  }

  import {howto, altplot} from "@d3/example-components"
  drawDensity()