import React, { Component } from 'react'

class Map extends Component {

function initMap() {

  render() {
    var map
    /* custom styles for map  */
    const styles = [
   {
     featureType: 'water',
     stylers: [
       { color: '#19a0d8' }
     ]
   },{
     featureType: 'administrative',
     elementType: 'labels.text.stroke',
     stylers: [
       { color: '#ffffff' },
       { weight: 6 }
     ]
   },{
     featureType: 'administrative',
     elementType: 'labels.text.fill',
     stylers: [
       { color: '#e85113' }
     ]
   },{
     featureType: 'road.highway',
     elementType: 'geometry.stroke',
     stylers: [
       { color: '#efe9e4' },
       { lightness: -40 }
     ]
   },{
     featureType: 'transit.station',
     stylers: [
       { weight: 9 },
       { hue: '#e85113' }
     ]
   },{
     featureType: 'water',
     elementType: 'labels.text.stroke',
     stylers: [
       { lightness: 100 }
     ]
   },{
     featureType: 'water',
     elementType: 'labels.text.fill',
     stylers: [
       { lightness: -100 }
     ]
   },{
     featureType: 'poi.park',
     elementType: 'geometry.fill',
     stylers: [
       { visibility: 'on' },
       { color: '#000000' }
     ]
   }
  ];

  map = new google.maps.Map(document.getElementByID('map'), {
    center: {lat: 37.7864, lng: 122.4508},
    styles: styles,
    mapTypeControl: false,
    zoom: 14
  });

  let SanFrancisco = {lat: 37.7864, lng: 122.4508};
}

    return (
      <div id="map">
      </div>
    )
  }
}

export default Map
