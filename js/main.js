/**
 *
 * Bootstrap one-page template with Parallax effect | Script Tutorials
 * http://www.script-tutorials.com/bootstrap-one-page-template-with-parallax-effect/
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Script Tutorials
 * http://www.script-tutorials.com/
 */

imagesLoaded( '#backstretch_img', { background: true }, function() {
  document.getElementById('page_loader').style.display = 'none';
});

$(document).ready(function (){

  $.backstretch("./assets/images/sketch_bg.png");

  $("#owl-demo").owlCarousel({
      autoPlay : 2000,
      navigation : false, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true,
      stopOnHover : true,
      rewindSpeed : 1000

      // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false

  });

  // create a LatLng object containing the coordinate for the center of the map
  var latlng = new google.maps.LatLng(14.5495929, 121.0458753);

  // prepare the map properties
  var options = {
    zoom: 17,
    radius: '500',
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    navigationControl: true,
    mapTypeControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    styles: [
        {

        featureType: "poi.business",

        elementType: "labels",

        stylers: [

        { visibility: "off" }

        ]

        }
      ]
  };

  // initialize the map object
  var map = new google.maps.Map(document.getElementById('google_map'), options);

  // add Marker
  var marker1 = new google.maps.Marker({
    position: latlng, map: map
  });



  // add listener for a click on the pin
  google.maps.event.addListener(marker1, 'click', function() {
    infowindow.open(map, marker1);
  });

  // add information window
  var infowindow = new google.maps.InfoWindow({
    content:  '<div class="info"><img src="http://www.ignition.biz/ignition/assets/images/FINAL_LOGO1.png" style="height:30px;" /><br><br>Marajo Tower, 312 26th St. <br />Fort Bonifacio, Taguig, Metro Manila</div>'
  });  
  
  //show on load
  infowindow.open(map, marker1);

});