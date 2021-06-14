function onPageLoaded() {
    var httpRequest;
    document.getElementById("load-data").onclick = getDegreeData;
}

window.addEventListener('load', onPageLoaded);

var getDegreeData= function() {
    httpRequest = new XMLHttpRequest();

    if(!httpRequest) { 
        alert("Failed to initialize request"); 
        return;
    }

    httpRequest.onreadystatechange = handleHttpRequestResponse;
    httpRequest.open('GET', "https://tylerlemieux.github.io/csc601-week5/degrees.json");
    httpRequest.send();
}

var handleHttpRequestResponse = function(){
    if(httpRequest.readyState == XMLHttpRequest.DONE) {
        if (httpRequest.status == 200) {
            // Deserialize the json
            var degrees = JSON.parse(httpRequest.responseText);
            drawTable(degrees);
        } else {
            alert("An error occurred.")
        }
    }
}

function drawTable(degrees) {
    var tableHtml = "<table><thead><tr><th>School</th><th>Major</th><th>Program Type</th><th>Graduation Year</th></tr></thead><tbody>";

    degrees.forEach(degree => {
        tableHtml += "<tr><td>" + degree.School + "</td><td>" + degree.Major + "</td><td>" + degree.Type + "</td><td>" + degree.YearConferred + "</td></tr>";
    });

    tableHtml += "</tbody></table>"

    document.getElementById("tableArea").innerHTML = tableHtml;
}