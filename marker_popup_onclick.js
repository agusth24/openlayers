var map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([118.4772666, 1.4286925]),
        zoom: 7.5                             
      })
    });

  function createMarker(lng, lat, description, type)
  {
  var marker = new ol.Feature({
    geometry: new ol.geom.Point(
      ol.proj.fromLonLat([lng,lat])
    ), 
  });
  var colorMarker = '#5867dd';

  if(type==1)
    colorMarker = '#34bfa3';
  else if(type==2)
    colorMarker = '#36a3f7';
  else if(type==3)
    colorMarker = '#ffb822';
  else if(type==4)
    colorMarker = '#fd3995';
  marker.setStyle(new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
    color: colorMarker,
    crossOrigin: 'anonymous',
    src: 'https://openlayers.org/en/v4.6.5/examples/data/dot.png'
    }))
  }));
  marker.setProperties({'name':lng+';'+lat, 'description':description});
  return marker;
  }

  var marker1 = createMarker(118.59966,2.19597,'SMAN 9 Berau',1);
  var marker2 = createMarker(118.63409,1.52464,'SMPN 3 Satu Atap Batu Putih',1);

<?=$vmarker?>
var vectorSource = new ol.source.Vector({
  features: [marker1, marker2]
});
var markerVectorLayer = new ol.layer.Vector({
  source: vectorSource,
});
map.addLayer(markerVectorLayer);

// display popup on click
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

map.on('click', function(evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel,
  function(feature, layer) {
    return feature;
  });
  if (feature) {
    console.log(feature);
    var overlay = new ol.Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
    map.addOverlay(overlay);

    var geometry = feature.getGeometry();
    var coord = geometry.getCoordinates();

    //coordTransform = ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326');
    var contentHTML = 'Location: '+feature.get('name');
    contentHTML += '<br/> Description: '+feature.get('description');
    content.innerHTML = contentHTML;

    overlay.setPosition(coord);
  }
});
