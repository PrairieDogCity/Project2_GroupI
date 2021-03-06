// Initialize the LayerGroups we'll be using
var historyPoints = new L.LayerGroup(),
gardenPoints = new L.LayerGroup(),
sciencePoints = new L.LayerGroup(),
preservationPoints = new L.LayerGroup(),
generalPoints = new L.LayerGroup(),
zooPoints = new L.LayerGroup(),
artPoints = new L.LayerGroup(),
childrensPoints = new L.LayerGroup();
//heatMap = new L.heatLayer();
//preservationPointsData = new L.LayerGroup();

historyPoints.toGeoJSON();
gardenPoints.toGeoJSON();
sciencePoints.toGeoJSON();
preservationPoints.toGeoJSON();
generalPoints.toGeoJSON();
zooPoints.toGeoJSON();
artPoints.toGeoJSON();
childrensPoints.toGeoJSON();

  // Create the tile layer that will be the background of our map
  var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: API_KEY
});

var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
});

var interstateMap = L.esri.featureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/USInterstates/FeatureServer/0",
  opacity: 0.8});

// Load population density
var populationDensity = L.esri.tiledMapLayer({
  url: "https://tiles.arcgis.com/tiles/4yjifSiIG17X0gW4/arcgis/rest/services/Population_Density_Global_Dataset/MapServer", 
  opacity: 0.7});

// Create object to hold base layers
var baseMaps = {
  "Dark": darkMap,
  "Satellite": satelliteMap,
  "Outdoors": outdoorsMap,
};

var overlayMaps = {
  "History": historyPoints,
  "Garden": gardenPoints,
  "Science": sciencePoints,
  "Preservation": preservationPoints,
  "General": generalPoints,
  "Zoo": zooPoints,
  "Art": artPoints,
  "Childrens": childrensPoints,
  "Pop Density": populationDensity,
  "Interstates": interstateMap
  //"Museum Heatmap": heatMap
}

// Create the map with our layers
var map = L.map("mapid", {
  attributionControl: false,
  center: L.latLng(38.627222, -90.197778),
  zoom: 12,
  worldCopyJump: true,
  layers: [
      interstateMap,
      populationDensity,
      darkMap,
      preservationPoints
  ]
  });

// Load data from "/map/" route
d3.json("/map/")
  .then(function(mapData) {
    var radius = [];
    var color = [];
    //var legend = [];
    //var label = [];
    //var features = [];
    //var names = [];
    //var incomes = [];
    //var revenues = [];
    //var heatArray = [];

    for (var i = 0; i < mapData.length; i++) {
      var museumBasicData = Object.assign({}, mapData[i]);

      // Define variable shortcuts from museumBasicData
      var lat = Number(museumBasicData.latitude),
      lon = Number(museumBasicData.Longitude),
      name = museumBasicData.museum_name,
      type = museumBasicData.museum_type,
      income = museumBasicData.Income,
      revenue = museumBasicData.Revenue,
      id = museumBasicData.museum_id;
      
      var LatLng = L.latLng(lat, lon);

        // History Type
        if (type === 'HISTORY MUSEUM') {
          //icon = icons.History;
          color = '#f45c42'
          radius = 5
          legend = 1
          label = "History"
          var historyMarker = L.circleMarker(LatLng, {
            radius: radius,
            color: color,
            weight: 3,
            fillOpacity: 1,
            fill: true,
            fillColor: "#000000"})
            historyMarker.museumID = id
            historyMarker.museumIncome = income
            historyMarker.museumRevenue = revenue
            // Add markers to historyMarker
            historyMarker.addTo(historyPoints); 
            // Add popups to historyMarker
            historyMarker.bindPopup("Name: " + name + "<br>\
            Coords: " + lat + " " + lon + "<br>\
            Type: " + type + "<br>\ Income: $" + income + "<br>\ Revenue: $" + revenue); 
        }
        // Garden Type
        else if (type === 'ARBORETUM, BOTANICAL GARDEN, OR NATURE CENTER') {
          //icon = icons.Garden;
          color = '#f49541'
          radius = 5
          legend = 2
          label = "Garden"
          var gardenMarker = L.circleMarker(LatLng, {
            radius: radius,
            color: color,
            weight: 3,
            fillOpacity: 1,
            fill: true,
            fillColor: "#000000"})
            gardenMarker.museumID = id
            gardenMarker.museumIncome = income
            gardenMarker.museumRevenue = revenue;
            // Add markers to gardenPoints
            gardenMarker.addTo(gardenPoints); 
            // Add popups to gardenPoints
            gardenMarker.bindPopup("Name: " + name + "<br>\
            Coords: " + lat + " " + lon + "<br>\
            Type: " + type + "<br>\ Income: $" + income + "<br>\ Revenue: $" + revenue); 
        }
        // Science Type
        else if (type === 'SCIENCE & TECHNOLOGY MUSEUM OR PLANETARIUM') {
          //icon = icons.Science;
          color = '#f4e841'
          radius = 5
          legend = 3
          label = "Science"
          var scienceMarker = L.circleMarker(LatLng, {
            radius: radius,
            color: color,
            weight: 3,
            fillOpacity: 1,
            fill: true,
            fillColor: "#000000"})
            scienceMarker.museumID = id
            scienceMarker.museumIncome = income
            scienceMarker.museumRevenue = revenue;
            // Add markers to sciencePoints
            scienceMarker.addTo(sciencePoints); 
            // Add popups to sciencePoints
            scienceMarker.bindPopup("Name: " + name + "<br>\
            Coords: " + lat + " " + lon + "<br>\
            Type: " + type + "<br>\ Income: $" + income + "<br>\ Revenue: $" + revenue); 
        }
        // History_Preservation Type
        else if (type === 'HISTORIC PRESERVATION') {
          //icon = icons.History_Preservation;
          color = '#7cf441'
          radius = 5
          legend = 4
          label = "Preservation"
          var preservationMarker = L.circleMarker(LatLng, {
            radius: radius,
            color: color,
            weight: 3,
            fillOpacity: 1,
            fill: true,
            fillColor: "#000000"})
            preservationMarker.museumID = id
            preservationMarker.museum_name = name
            preservationMarker.museumIncome = income
            preservationMarker.museumRevenue = revenue;
            // Add markers to preservationPoints
            preservationMarker.addTo(preservationPoints); 
            //TODO: refresh point grab when window moves, to feed points below to charts
            // via marker class additions
/*               if(map.getBounds().contains(preservationMarker.getLatLng())) {
                names.push(preservationMarker.museum_name),
                incomes.push(preservationMarker.museumIncome),
                revenues.push(preservationMarker.museumRevenue)}; */
            // Add popups to preservationPoints
            preservationMarker.bindPopup("Name: " + name + "<br>\
            Coords: " + lat + " " + lon + "<br>\
            Type: " + type + "<br>\ Income: $" + income + "<br>\ Revenue: $" + revenue); 
        }
        // General Type
        else if (type === 'GENERAL MUSEUM') {
          //icon = icons.General;
          color = '#41f4ca'
          radius = 5
          legend = 5
          label = "General"
          var generalMarker = L.circleMarker(LatLng, {
            radius: radius,
            color: color,
            weight: 3,
            fillOpacity: 1,
            fill: true,
            fillColor: "#000000"})
            generalMarker.museumID = id
            generalMarker.museumIncome = income
            generalMarker.museumRevenue = revenue;
            // Add markers to generalPoints
            generalMarker.addTo(generalPoints); 
            // Add popups to generalPoints
            generalMarker.bindPopup("Name: " + name + "<br>\
            Coords: " + lat + " " + lon + "<br>\
            Type: " + type + "<br>\ Income: $" + income + "<br>\ Revenue: $" + revenue); 
        }
        // Zoo Type
        else if (type === 'ZOO, AQUARIUM, OR WILDLIFE CONSERVATION') {
          //icon = icons.Zoo;
          color = '#419af4'
          radius = 5
          legend = 6
          label = "Zoo"
          var zooMarker = L.circleMarker(LatLng, {
            radius: radius,
            color: color,
            weight: 3,
            fillOpacity: 1,
            fill: true,
            fillColor: "#000000"})
            zooMarker.museumID = id
            zooMarker.museumIncome = income
            zooMarker.museumRevenue = revenue;
            // Add markers to zooPoints
            zooMarker.addTo(zooPoints); 
            // Add popups to zooPoints
            zooMarker.bindPopup("Name: " + name + "<br>\
            Coords: " + lat + " " + lon + "<br>\
            Type: " + type + "<br>\ Income: $" + income + "<br>\ Revenue: $" + revenue); 
        }
        // Art Type
        else if (type === 'ART MUSEUM') {
          //icon = icons.Art;
          color = '#7641f4'
          radius = 5
          legend = 7
          label = "Art"
          var artMarker = L.circleMarker(LatLng, {
            radius: radius,
            color: color,
            weight: 3,
            fillOpacity: 1,
            fill: true,
            fillColor: "#000000"})
            artMarker.museumID = id
            artMarker.museumIncome = income
            artMarker.museumRevenue = revenue;
            // Add markers to artMarker
            artMarker.addTo(artPoints); 
            // Add popups to artMarker
            artMarker.bindPopup("Name: " + name + "<br>\
            Coords: " + lat + " " + lon + "<br>\
            Type: " + type + "<br>\ Income: $" + income + "<br>\ Revenue: $" + revenue); 
        }
        // Childrens Type
        else {
          //icon = icons.Childrens;
          color = '#df41f4'
          radius = 5
          legend = 8
          label = "Childrens"
          var childrensMarker = L.circleMarker(LatLng, {
            radius: radius,
            color: color,
            weight: 3,
            fillOpacity: 1,
            fill: true,
            fillColor: "#000000"})
            childrensMarker.museumID = id
            childrensMarker.museumIncome = income
            childrensMarker.museumRevenue = revenue;
            // Add markers to childrensMarker
            childrensMarker.addTo(childrensPoints);
            // Add popups to childrensMarker
            childrensMarker.bindPopup("Name: " + name + "<br>\
            Coords: " + lat + " " + lon + "<br>\
            Type: " + type + "<br>\ Income: $" + income + "<br>\ Revenue: $" + revenue); 
        }
        }
      }
    );

      /* function buildIncomePlot() {
        var trace = {
          x: incomes.sort(function compareFunction(firstNum, secondNum){
            return firstNum - secondNum;
          }),
          y: names,
          mode: "markers",
          type: "scatter",
          name: "Museum Income",
          transforms: [{
            type: 'filter',
            target: 'x',
            operation: '>=',
            value: 0
          }],
          line: {
            color: "#17BECF"
          }
        };
    
        var data = [trace];

        var layout = {
          title: "Museum Income from Map Extent",
          xaxis: {
            type: "log",
            title: "Museum Income",
            autorange: true
          },
          yaxis: {   
            type: "category",
            autorange: true
          }
        };
    
        Plotly.newPlot("income_plot", data, layout);
      };
    buildIncomePlot();

    function buildRevenuePlot() {
      var trace = {
        x: revenues.sort(function compareFunction(firstNum, secondNum){
          return firstNum - secondNum;
        }),
        y: names,
        mode: "markers",
        type: "scatter",
        name: "Museum Revenue",
        transforms: [{
          type: 'filter',
          target: 'x',
          operation: '>=',
          value: 0
        }],
        line: {
          color: "#17BECF"
        }
      };
  
      var data = [trace];

      var layout = {
        title: "Museum Revenue from Map Extent",
        xaxis: {
          type: "log",
          title: "Museum Revenue",
          autorange: true
        },
        yaxis: {   
          type: "category",
          autorange: true
        }
      };

      Plotly.newPlot("revenue_plot", data, layout);
    };
    buildRevenuePlot(); */
//});

//     // Define map update behavior
// map.on('overlayadd', onOverlayAdd);

// function onOverlayAdd(e){
//   makeData()
// };

// map.on('overlayremove', onOverlayRemove);

// function onOverlayRemove(e){
//   makeData()
// };

// map.on('moveend', onMoveEnd);

// function onMoveEnd(e){
//   makeData()
// };

// map.on('zoneend', onZoomEnd);

// function onZoomEnd(e){
//   makeData()
// };

// map.on('resize', onResize);

// function onResize(e){
//   makeData()
// };

// Create Heatmap

/* d3.json("/map/")
  .then(function(heatData) {
    var heatArray = [];

    for (var i = 0; i < heatData.length; i++) {
      var heatBasicData = Object.assign({}, heatData[i]);
      //console.log(heatBasicData);

      // Define variable shortcuts from museumBasicData
       var lat = Number(heatData.latitude),
      lon = Number(heatData.Longitude),
      LatLng = L.latLng(lat, lon);
      console.log(LatLng);

              // Generate Heatmap Points
              if (LatLng) {
                heatArray.push(LatLng);
                console.log(heatArray);
              }
            }
          
            var heatMap = L.heatLayer(heatArray, {
              radius: 20,
              blur: 35
            });
          }); */

map.addControl( new L.Control.Search({
  url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
  jsonpParam: 'json_callback',
  propertyName: 'display_name',
  propertyLoc: ['lat','lon'],
  marker: L.circleMarker([0,0],{radius:0.1}, {color:"black"}, {fillColor: "black"}, {fillOpacity:0.1}),
  autoCollapse: true,
  autoType: false,
  minLength: 2
}));

// Create layer control
L.control.layers(baseMaps, overlayMaps).addTo(map);

/////////////////////////////////////////////////////////////////////////////////
// Create a legend to display information about our map
var legend = L.control({
  position: "bottomleft"
});

// When the layer control is added, insert a div with the class of "legend"
function getColorMarkers(d) {
  return d <= 1 ? '#CCCCCC' :
  d <= 1 ? '#f45c42' :
  d <= 2 ? '#f49541' :
  d <= 3 ? '#f4e841' :
  d <= 4 ? '#7cf441' :
  d <= 5 ? '#41f4ca' :
  d <= 6 ? '#419af4' :
  d <= 7 ? '#7641f4' :
           '#df41f4' ;
};

legend.onAdd = function() {
  var div = L.DomUtil.create("div", "legend"),
    //values = [legend]
    values = [1, 2, 3, 4, 5, 6, 7, 8]
    labels = ["Museum Types", "History", "Garden", "Science", "Preservation", "General", "Zoo", "Art", "Childrens"];

    for (var i = 0; i < values.length; i++) {
      div.innerHTML +=
        '<i style="background:' + getColorMarkers(values[i]) + '"></i> ' + labels[i] + "<br>"
    };
  return div;

};
// Add the info legend to the map
legend.addTo(map);

// Add pop density legend
var popLegend = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
function getColorPopDensity(d) {
  return d <= 1 ? '#CCCCCC' :
  d <= 1 ? '#fff100' :
  d <= 2 ? '#ff9642' :
  d <= 3 ? '#df0707' :
  d <= 4 ? '#a51927' :
  d <= 5 ? '#802737' :
           '#604245' ;
};

popLegend.onAdd = function() {
  var div = L.DomUtil.create("div", "legend"),
    //values = [legend]
    values = [1, 2, 3, 4, 5, 6]
    labels = ["Population Density", "Highest", "Very High", "High", "Low", "Very Low", "Lowest"];

    for (var i = 0; i < values.length; i++) {
      div.innerHTML +=
        '<i style="background:' + getColorPopDensity(values[i]) + '"></i> ' + labels[i] + "<br>"
    };
  return div;

};
// Add the info legend to the map
popLegend.addTo(map);

// Add image legend to map for pop density
/* var MyControl = L.Control.extend({
  options: {
    position: 'bottomright'
  },

  onAdd: function (map) {
    var container = L.DomUtil.create('img_div', 'my-custom-control');

    // ... initialize other DOM elements, add listeners, etc.
    return container;
  }
});

map.addControl(new MyControl()); */

/*  var popLegend = L.control({position: 'bottomright'});
 popLegend.onAdd = function(map){
     var div = L.DomUtil.create('div', 'popLegend');
     div.innerHTML= "<img src='../static/images/Pop_density_legend.PNG'/>";
     return div;
 }
 popLegend.addTo(map);
 */
// Income Chart
var url = "/map/";

  //function buildIncomePlot() {
    d3.json(url).then(function(response) {

      var historyType = response.filter(function (row){
        if (row.museum_type === 'HISTORY MUSEUM') {
          return row
      }});
      var gardenType = response.filter(function (row){
        if (row.museum_type === 'ARBORETUM, BOTANICAL GARDEN, OR NATURE CENTER') {
          return row
      }});
      var scienceType = response.filter(function (row){
        if (row.museum_type === 'SCIENCE & TECHNOLOGY MUSEUM OR PLANETARIUM') {
          return row
      }});
      var preservationType = response.filter(function (row){
        if (row.museum_type === 'HISTORIC PRESERVATION') {
          return row
      }});
      var generalType = response.filter(function (row){
        if (row.museum_type === 'GENERAL MUSEUM') {
          return row
      }});
      var zooType = response.filter(function (row){
        if (row.museum_type === 'ZOO, AQUARIUM, OR WILDLIFE CONSERVATION') {
          return row
      }});
      var artType = response.filter(function (row){
        if (row.museum_type === 'ART MUSEUM') {
          return row
      }});
      var childrensType = response.filter(function (row){
        if (row.museum_type === "CHILDREN'S MUSEUM") {
          return row
      }});

      var trace1 = {
        y: historyType.map(data => data.Income),
        type: "box",
        name: "History",
        boxpoints: 'Outliers',
        marker: {color: '#f45c42'},
        transforms: [{
          type: 'filter',
          target: 'y',
          operation: '>=',
          value: 0
        },
        {
          type: 'filter',
          target: 'y',
          operation: '<',
          value: 2000000
        },
      ],
      };

      var trace2 = {
        y: gardenType.map(data => data.Income),
        type: "box",
        name: "Garden",
        boxpoints: 'Outliers',
        marker: {color: '#f49541'},
        transforms: [{
          type: 'filter',
          target: 'y',
          operation: '>=',
          value: 0
        },
        {
          type: 'filter',
          target: 'y',
          operation: '<',
          value: 2000000
        }
      ],
      };

      var trace3 = {
        y: scienceType.map(data => data.Income),
        type: "box",
        name: "Science",
        boxpoints: 'Outliers',
        marker: {color: '#f4e841'},
        transforms: [{
          type: 'filter',
          target: 'y',
          operation: '>=',
          value: 0
        },
        {
          type: 'filter',
          target: 'y',
          operation: '<',
          value: 2000000
        }
      ],
      };

      var trace4 = {
        y: preservationType.map(data => data.Income),
        type: "box",
        name: "Preservation",
        boxpoints: 'Outliers',
        marker: {color: '#7cf441'},
        transforms: [{
          type: 'filter',
          target: 'y',
          operation: '>=',
          value: 0
        },
        {
          type: 'filter',
          target: 'y',
          operation: '<',
          value: 2000000
        }
      ],
      };

      var trace5 = {
        y: generalType.map(data => data.Income),
        type: "box",
        name: "General",
        boxpoints: 'Outliers',
        marker: {color: '#41f4ca'},
        transforms: [{
          type: 'filter',
          target: 'y',
          operation: '>=',
          value: 0
        },
        {
          type: 'filter',
          target: 'y',
          operation: '<',
          value: 2000000
        }
      ],
      };

      var trace6 = {
        y: zooType.map(data => data.Income),
        type: "box",
        name: "Zoo",
        boxpoints: 'Outliers',
        marker: {color: '#419af4'},
        transforms: [{
          type: 'filter',
          target: 'y',
          operation: '>=',
          value: 0
        },
        {
          type: 'filter',
          target: 'y',
          operation: '<',
          value: 2000000
        }
      ],
      };
      var trace7 = {
        y: artType.map(data => data.Income),
        type: "box",
        name: "Art",
        boxpoints: 'Outliers',
        marker: {color: '#7641f4'},
        transforms: [{
          type: 'filter',
          target: 'y',
          operation: '>=',
          value: 0
        },
        {
          type: 'filter',
          target: 'y',
          operation: '<',
          value: 2000000
        }
      ],
      };

      var trace8 = {
        y: childrensType.map(data => data.Income),
        type: "box",
        name: "Childrens",
        boxpoints: 'Outliers',
        marker: {color: '#df41f4'},
        transforms: [{
          type: 'filter',
          target: 'y',
          operation: '>=',
          value: 0
        },
        {
          type: 'filter',
          target: 'y',
          operation: '<',
          value: 2000000
        }
      ],
      };
    
      var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8];
    
      var layout = {
        title: {
          text: "Museum Income",
          font: {
            size: 30,
            family: "Arial"
          }},

          paper_bgcolor: '#cccccc',
          plot_bgcolor: '#cccccc',

        yaxis: {   
          title: "Museum Income (Filtered to <$2 mil)",
          zeroline: true,
          titlefont: {
            size: 18,
            family: "Arial"
          }
        },
        //boxmode: 'group'
        showlegend: false
      };
    
      Plotly.newPlot("income_plot", data, layout);
    
// Revenue Chart
var trace1 = {
  y: historyType.map(data => data.Revenue),
  type: "box",
  name: "History",
  boxpoints: 'Outliers',
  marker: {color: '#f45c42'},
  transforms: [{
    type: 'filter',
    target: 'y',
    operation: '>=',
    value: 0
  },
  {
    type: 'filter',
    target: 'y',
    operation: '<',
    value: 2000000
  },
],
};

var trace2 = {
  y: gardenType.map(data => data.Revenue),
  type: "box",
  name: "Garden",
  boxpoints: 'Outliers',
  marker: {color: '#f49541'},
  transforms: [{
    type: 'filter',
    target: 'y',
    operation: '>=',
    value: 0
  },
  {
    type: 'filter',
    target: 'y',
    operation: '<',
    value: 2000000
  }
],
};

var trace3 = {
  y: scienceType.map(data => data.Revenue),
  type: "box",
  name: "Science",
  boxpoints: 'Outliers',
  marker: {color: '#f4e841'},
  transforms: [{
    type: 'filter',
    target: 'y',
    operation: '>=',
    value: 0
  },
  {
    type: 'filter',
    target: 'y',
    operation: '<',
    value: 2000000
  }
],
};

var trace4 = {
  y: preservationType.map(data => data.Revenue),
  type: "box",
  name: "Preservation",
  boxpoints: 'Outliers',
  marker: {color: '#7cf441'},
  transforms: [{
    type: 'filter',
    target: 'y',
    operation: '>=',
    value: 0
  },
  {
    type: 'filter',
    target: 'y',
    operation: '<',
    value: 2000000
  }
],
};

var trace5 = {
  y: generalType.map(data => data.Revenue),
  type: "box",
  name: "General",
  boxpoints: 'Outliers',
  marker: {color: '#41f4ca'},
  transforms: [{
    type: 'filter',
    target: 'y',
    operation: '>=',
    value: 0
  },
  {
    type: 'filter',
    target: 'y',
    operation: '<',
    value: 2000000
  }
],
};

var trace6 = {
  y: zooType.map(data => data.Revenue),
  type: "box",
  name: "Zoo",
  boxpoints: 'Outliers',
  marker: {color: '#419af4'},
  transforms: [{
    type: 'filter',
    target: 'y',
    operation: '>=',
    value: 0
  },
  {
    type: 'filter',
    target: 'y',
    operation: '<',
    value: 2000000
  }
],
};
var trace7 = {
  y: artType.map(data => data.Revenue),
  type: "box",
  name: "Art",
  boxpoints: 'Outliers',
  marker: {color: '#7641f4'},
  transforms: [{
    type: 'filter',
    target: 'y',
    operation: '>=',
    value: 0
  },
  {
    type: 'filter',
    target: 'y',
    operation: '<',
    value: 2000000
  }
],
};

var trace8 = {
  y: childrensType.map(data => data.Revenue),
  type: "box",
  name: "Childrens",
  boxpoints: 'Outliers',
  marker: {color: '#df41f4'},
  transforms: [{
    type: 'filter',
    target: 'y',
    operation: '>=',
    value: 0
  },
  {
    type: 'filter',
    target: 'y',
    operation: '<',
    value: 2000000
  }
],
};

var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8];

var layout = {
  title: {
    text: "Museum Revenue",
    font: {
      size: 30,
      family: "Arial"
    }},

  paper_bgcolor: '#cccccc',
  plot_bgcolor: '#cccccc',

  yaxis: {   
    title: "Museum Revenue (Filtered to <$2 mil)",
    zeroline: true,
    titlefont: {
      size: 18,
      family: "Arial"
    }
  },
  //boxmode: 'group'
  showlegend: false
};

Plotly.newPlot("revenue_plot", data, layout);

});