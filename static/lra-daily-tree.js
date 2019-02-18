/* 
 Interfaces with lra-daily-tree.html and calls generateTree.js
 */

function showCompareHelp() {
    document.getElementById("help-compare").style.display = "block";
}
function hideCompareHelp() {
    document.getElementById("help-compare").style.display = "none";
}

function makeCodeArray(codefile) {
    var codeArray = [];
    code = [];
    d3.text(codefile, function (data) {
        codeArray = data.split('\n');
        cv = d3.select("#code-view");
        cv.selectAll("pre")
                .data(codeArray)
                .enter().append("pre")
                .attr("class", function (d, i) {
                    if (d.includes("define(lra,")) { //file sensitive
                        offset = i;
                    }
                    return "line " + i;
                })
                .text(function (d, i) {
                    if (!d) {
                        return i + "| \n";
                    }
                    if (i < 10)
                        i = " " + i;
                    return i + "| " + d;
                })
                .style("font-family", "monospace")
                .style("margin", "2px 0px 0px 0px");

    });

}

function getYesterday() {
    var today = new Date();
    var dd = today.getDate() - 1; //get yesterday
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd === 0) {
        if ([9, 4, 6, 11].includes(mm)) {
            dd = 30;
        } else if (mm === 3) {
            dd = 28;
        } else if (mm === 1) {
            dd = 31;
            yyyy = yyyy - 1;
        } else {
            dd = 31;
        }
        mm = mm - 1;
    }
// Hardcoded dates for testing purposes
    dd = 30;
    mm = 1;
    yyyy = 2019;

    if (dd < 10)
        dd = '0' + dd;
    if (mm < 10)
        mm = '0' + mm;

    var datestring = yyyy + "-" + mm + "-" + dd + "-lra";
   
    return datestring;
}

function retrieveData() {
    console.log("retrieveData");
    var yesterday = getYesterday();

    codefile = "data/lra.physl";
    codeData = makeCodeArray(codefile);

//    codeArray = document.getElementById('main').innerHTML.split("\n");
//    document.getElementById('main').innerHTML = "";


    // Determine if datadate1 is yesterday or a selected date
    datadate1 = document.querySelector("#selectedDate1").value + "-lra";
    if ((datadate1 === "-lra") || (datadate1 === "")) {
        datadate1 = yesterday;
    }
    textfile1 = "data/" + datadate1 + "-tree.txt";
    csvfile1 = "data/" + datadate1 + "-performance.csv";
    
    // Determine if datadate2 is used (comparing)
    datadate2 = document.querySelector("#selectedDate2").value + "-lra";
    if ((datadate2 === "-lra") || (datadate2 === "")){
        textfile2 = "";
        csvfile2 = "";
    } else {
        textfile2 = "data/" + datadate2 + "-tree.txt";
        csvfile2 = "data/" + datadate2 + "-performance.csv";
    }
    var legend = document.getElementById("legend");
    legend.empty();

    console.log("Files1:", textfile1, csvfile1);
    console.log("Files2:", textfile2, csvfile2);
    callEverything(textfile1, csvfile1, textfile2, csvfile2);
}






