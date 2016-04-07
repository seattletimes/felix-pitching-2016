require("./lib/social");
require("./lib/ads");
var track = require("./lib/tracking");

require("component-image-slider");

var $ = require("./lib/qsa");
var chartist = require("chartist");

var series = "CH CU FC FF SI SL".split(" ");

var years = [];
var countData = {};
var speedData = {};
window.pitchCounts.sort((a, b) => a.year - b.year).forEach(function(row) {
  var index = years.indexOf(row.year);
  if (index == -1) {
    index = years.push(row.year) - 1;
  }
  if (!countData[row.type]) {
    countData[row.type] = [];
  }
  if (!speedData[row.type]) {
    speedData[row.type] = [];
  }
  countData[row.type][index] = row.count;
  speedData[row.type][index] = row.speed;
});

// var data = series.map(s => ({ value: unzippedCounts[s], meta: s, className: s }));

var countChart = new chartist.Line(".count-chart", {
  labels: years,
  series: Object.keys(countData).map(d => ({ value: countData[d], meta: d, className: d }))
}, {
  lineSmooth: false
}, [
  ["screen and (max-width: 480px)", {
    axisY: {
      labelInterpolationFnc: v => v ? v / 1000 + "k" : v
    },
    axisX: {
      labelInterpolationFnc: y => "'" + (y + "").substr(2)
    }
  }]
]);

var speedChart = new chartist.Line(".speed-chart", {
  labels: years,
  series: Object.keys(speedData).map(d => ({ value: speedData[d], meta: d, className: d }))
}, null, [
  ["screen and (max-width: 480px)", {
    axisX: {
      labelInterpolationFnc: y => "'" + (y + "").substr(2)
    }
  }]
]);

// pubSub.on("pitch-type", function(type) {
//   //update the line graph
//   console.log("pitch-graph", type);
// });
