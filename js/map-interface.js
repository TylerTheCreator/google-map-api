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

$(document).on('click', '.pan-to-marker', function(e) {
    // event.preventDefault();
    var lat, lng;
    var $index = $(this).data('marker-index');
    var $lat = $(this).data('marker-lat');
    var $lng = $(this).data('marker-lng');
    if ($index !== undefined) {
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

    var content;
    });

    $('#geocoding-form').submit(function(e){
      e.preventDefault();
      googleMaps.geocode({
      address: $('#address').val().trim(),
      callback: function(results, status) {
        if (status == 'OK') {
          var index = map.markers.length;

          var latlng = results[0].geometry.location;
          map.setCenter(latlng.lat(), latlng.lng());
          map.addMarker({
            lat: latlng.lat(),
            lng: latlng.lng(),
            icon: "/images/mapicon.png",
            title: 'Marker #',
            infoWindow: {
              content : "<p>" +
              "<input type='text'> " +"</p>"
              }
            });
          }
        }
      });
    });
    map.addMarker({
      lat: lat,
      lng: lng,
      icon: "/images/mapicon.png",
      title: 'Marker #' + index,
      infoWindow: {
        content: "<p>" + "<input type='text'>" + "</p>"
      }
    });
});

////goooglemapppsss
