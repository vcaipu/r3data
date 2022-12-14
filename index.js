var ttest = require("ttest");
var fs = require("fs");
var ss = require("simple-statistics");

var average = function (arr) {
  var sum = 0;
  arr.forEach((a) => (sum += a));
  sum /= arr.length;
  return sum;
};

//all should have 45 values (except approval ratings)
var heights = [
  188, 170, 189, 163, 183, 171, 185, 168, 173, 183, 173, 173, 175, 178, 183,
  193, 178, 173, 174, 183, 188, 180, 168, 170, 178, 182, 180, 183, 178, 182,
  188, 175, 179, 185, 192, 182, 183, 177, 185, 188, 188, 182, 185, 191, 182,
];
var percentHeights = [
  8.67, -1.73, 9.57, -5.78, 5.78, -1.16, 6.32, -2.61, 0.58, 6.4, 1.17, 1.76,
  2.94, 4.71, 7.96, 13.86, 4.71, 1.17, 2.35, 8.28, 11.24, 6.51, -0.59, -0.63,
  3.68, 5.62, 4.2, 5.28, 2.07, 4.02, 7.11, -1.05, 1.05, 4.35, 8.28, 2.61, 3.12,
  -0.29, 4.21, 5.99, 6.07, 3.41, 5.11, 8.52,
];
var rankings = [
  2.25, 16.75, 7.0, 17.75, 13.5, 19.0, 16.5, 32.25, 38.5, 36.25, 14.0, 31.0,
  36.75, 40.5, 42.5, 1.0, 41.5, 24.5, 30.5, 28.25, 32.25, 21.5, 30.75, 15.25,
  4.0, 23.75, 9.75, 38.25, 25.75, 35.0, 2.75, 5.5, 6.75, 7.5, 10.5, 28.0, 24.5,
  25.0, 9.75, 19.75, 17.25, 32.67, 11.0, 41.0,
];

console.log("Heights Length:" + heights.length);
console.log("% Heights Length:" + percentHeights.length);
console.log("Rankings Length: " + rankings.length);

var partition = 1; //first index of second half

var res = [];

for (partition = 1; partition < 44; partition++) {
  var arr = percentHeights; //change
  var left1 = arr.slice(0, partition);

  var right1 = arr.slice(partition);

  var arr2 = rankings;
  var left2 = arr2.slice(0, partition);
  var right2 = arr2.slice(partition);

  var samples1 = [];
  for (var i = 0; i < partition; i++) samples1[i] = [left1[i], left2[i]];
  var samples2 = [right1, right2];
  for (var i = 0; i < 44 - partition; i++) samples2[i] = [right1[i], right2[i]];

  var regLine1 = ss.linearRegression(samples1);
  var regLine2 = ss.linearRegression(samples2);

  var p;

  p = regLine2.m - regLine1.m; //difference in slope;

  /*To get data on differences in height averages and P-values of such comparisons */
  /* p = average(right) - average(left); */

  //   var t = ttest(left, right, { mu: 0 });
  //   var p = t.pValue();
  //   console.log("P-Value: " + p + "\n\n\n");

  res.push(p);
}

var fileContents = "";
res.forEach((a) => {
  fileContents += a.toFixed(2) + "\n";
});

fs.writeFile("./out.txt", fileContents, (e) => {
  if (e) console.error(e);
});
