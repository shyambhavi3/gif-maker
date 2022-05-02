



let shape = 'ELLIPSE';
let mydice1 = 0;
let mydice2 = 0;
let mydice3 = 0;
let coinVal = 'heads';



var padding = { top: 20, right: 40, bottom: 0, left: 0 },
  w = 500 - padding.left - padding.right,
  h = 500 - padding.top - padding.bottom,
  r = Math.min(w, h) / 2,
  rotation = 0,
  oldrotation = 0,
  picked = 100000,
  oldpick = [],
  color = d3.scale.category20();
var data = [
  { "label": "RECTANGLE", "value": 1 },
  { "label": "ELLIPSE", "value": 2 },
  { "label": "SQUARE", "value": 3 },
  { "label": "SEMI CIRCLE", "value": 4 },

];
var svg = d3.select('#chart')
  .append("svg")
  .data([data])
  .attr("width", w + padding.left + padding.right)
  .attr("height", h + padding.top + padding.bottom);
var container = svg.append("g")
  .attr("class", "chartholder")
  .attr("transform", "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")");
var vis = container
  .append("g");

var pie = d3.layout.pie().sort(null).value(function (d) { return 1; });
// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);
// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice")
  .data(pie)
  .enter()
  .append("g")
  .attr("class", "slice");

arcs.append("path")
  .attr("fill", function (d, i) { return color(i); })
  .attr("d", function (d) { return arc(d); });
// add the text
arcs.append("text").attr("transform", function (d) {
  d.innerRadius = 0;
  d.outerRadius = r;
  d.angle = (d.startAngle + d.endAngle) / 2;
  return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 10) + ")";
})
  .attr("text-anchor", "end")
  .text(function (d, i) {
    return data[i].label;
  });
container.on("click", spin);
function spin(d) {

  container.on("click", null);
  //all slices have been seen, all done
  console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
  if (oldpick.length == data.length) {
    console.log("done");
    container.on("click", null);
    return;
  }
  var ps = 360 / data.length,
    pieslice = Math.round(1440 / data.length),
    rng = Math.floor((Math.random() * 1440) + 360);

  rotation = (Math.round(rng / ps) * ps);

  picked = Math.round(data.length - (rotation % 360) / ps);
  picked = picked >= data.length ? (picked % data.length) : picked;
  if (oldpick.indexOf(picked) !== -1) {
    d3.select(this).call(spin);
    return;
  } else {
    oldpick.push(picked);
  }
  rotation += 90 - Math.round(ps / 2);
  vis.transition()
    .duration(3000)
    .attrTween("transform", rotTween)
    .each("end", function () {
      //mark question as seen
      d3.select(".slice:nth-child(" + (picked + 1) + ") path")
        .attr("fill", "#111");
      //populate question
      d3.select("#question h1")
        .text(data[picked].label);
      oldrotation = rotation;
      shape = data[picked].label

      /* Get the result value from object "data" */
      console.log(shape)

      /* Comment the below line for restrict spin to sngle time */
      container.on("click", spin);
    });
}
//make arrow
svg.append("g")
  .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h / 2) + padding.top) + ")")
  .append("path")
  .attr("d", "M-" + (r * .15) + ",0L0," + (r * .05) + "L0,-" + (r * .05) + "Z")
  .style({ "fill": "black" });
//draw spin circle
container.append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 60)
  .style({ "fill": "white", "cursor": "pointer" });
//spin text
container.append("text")
  .attr("x", 0)
  .attr("y", 15)
  .attr("text-anchor", "middle")
  .text("SPIN")
  .style({ "font-weight": "bold", "font-size": "2rem" });


function rotTween(to) {
  var i = d3.interpolate(oldrotation % 360, rotation);
  return function (t) {
    return "rotate(" + i(t) + ")";
  };
}


function throwdice2(name) {

  var randomdice = Math.round(Math.random() * 5)
  mydice2 = randomdice;
  console.log(mydice2)
  document.images[name].src = eval("face" + randomdice + ".src")
}

function throwdice1(name) {

  var randomdice = Math.round(Math.random() * 5)
  mydice1 = randomdice;
  console.log(mydice1)
  document.images[name].src = eval("face" + randomdice + ".src")
}

function throwdice3(name) {

  var randomdice = Math.round(Math.random() * 5)
  mydice3 = randomdice;
  console.log(mydice3)
  document.images[name].src = eval("face" + randomdice + ".src")
}

jQuery(document).ready(function ($) {

  $('#coin').on('click', function () {
    var flipResult = Math.random();
    $('#coin').removeClass();
    setTimeout(function () {
      if (flipResult <= 0.5) {
        coinVal = 'heads';
        $('#coin').addClass('heads');
        $('#coinResult').text('A rotating shape');
        console.log('it is head');
      }
      else {
        coinVal = 'tails';
        $('#coin').addClass('tails');
        $('#coinResult').text('A shape entering and leaving the screen');
        console.log('it is tails');
      }
    }, 100);
  });
});

const totalFrames = 120;
let counter = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  let percent = 0;
  percent = float(counter % totalFrames) / totalFrames;

  if (coinVal == 'heads') {
    render(percent)

  } else {
    ellipsedraw(percent);
  }



  counter++;
}

function render(percent) {
  let angle = map(percent, 0, 1, 0, TWO_PI);
  let r = (mydice1 * 50);
  let g = (mydice2 * 50);
  let b = (mydice3 * 50);
  background(r, g, b);

  translate(width / 2, height / 2);
  rotate(angle);
  rectMode(CENTER);
  if (shape === 'ELLIPSE') {
    ellipse(0, 0, 50, 40)

  } else if (shape === 'SQUARE') {
    square(0, 0, 100);

  } else if (shape === 'RECTANGLE') {
    rect(0, 0, 80, 50);
  } else {
    arc(0, 0, 50, 50, PI, TWO_PI);
  }

}

function ellipsedraw(percent) {
  let r = (mydice1 * 50);
  let g = (mydice2 * 50);
  let b = (mydice3 * 50);
  background(r, g, b);
  if (shape === 'ELLIPSE') {
    ellipse(percent * width, height / 2, 50, 40)

  } else if (shape === 'SQUARE') {
    square(percent * width, height / 2, 50);

  } else if (shape === 'RECTANGLE') {
    rect(percent * width, height / 2, 80, 50);
  } else {
    arc(percent * width, height / 2, 50, 50, PI, TWO_PI);
  }





}
