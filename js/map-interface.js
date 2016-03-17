var googleMaps = require('gmaps');

var apiKey = "AIzaSyCrTvI2jhLoJQ0Vr6rTWMYmRRQJw5zKTA0";

var map;

$(document).ready(function() {
    map = new googleMaps({
        div: '#map',
        lat: 45.523062,
        lng: -122.676482
    });
  });
$(document).on('submit', '.edit_marker', function(e) {
  e.preventDefault();
  var $index = $(this).data('marker-index');
  $lat = $('#marker_' + index + '_lat').val();
  $lng = $('#marker_' + index + '_lng').val();
  var template = $('#edit_marker_template').text();

  var content = template.replace(/{{index}}/g, $index).replace(
    /{{lat}}/g, $lat).replace(/{{lng}}/g, $lng);
    map.markers[$index].infoWindow.setContent(content);
    $marker = $('#markers-with-coordinates').find('li').eq(0).find('a');
    $marker.data('marker-lat', $lat);
    $marker.data('marker-lng', $lng);
});

$(document).on('click', '.pan-to-marker', function(e) {
    // event.preventDefault();
    var lat, lng;
    var $index = $(this).data('marker-index');
    var $lat = $(this).data('marker-lat');
    var $lng = $(this).data('marker-lng');
    if ($index != undefined) {
        // using indices
        var position = map.markers[$index].getPosition();
        lat = position.lat();
        lng = position.lng();
    } else {
        // coordinates are shown here
        lat = $lat;
        lng = $lng;
    }
    map.setCenter(lat, lng);
});


$(document).ready(function(){
  map = new googleMaps({
    div: '#map',
    lat: 45.523062,
    lng: -122.676482
  });

  googleMaps.on('marker_added', map, function(marker) {
    $('#markers-with-index').append('<li><a href="#" class="pan-to-marker" data-marker-index="' + map.markers.indexOf(marker) + '">' + marker.title + '</a></li>');

    $('#markers-with-coordinates').append('<li><a href="#" class="pan-to-marker" data-marker-lat="' + marker.getPosition().lat() + '" data-marker-lng="' + marker.getPosition().lng() + '">' + marker.title + '</a></li>');
  });

  googleMaps.on('click', map.map, function(event) {
    var index = map.markers.length;
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();

    var template = $('#edit_marker_template').text();

    var content = template.replace(/{{index}}/g, index).replace(/{{lat}}/g, lat).replace(/{{lng}}/g, lng);

    map.addMarker({
      lat: lat,
      lng: lng,
      title: 'Marker #' + index,
      infoWindow: {
        content : content
      }
    });
  });
});
