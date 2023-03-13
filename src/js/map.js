import '../libs/v6.4.3-dist/ol.css';
import '../css/style.css';
import * as Controls from './controls.js';
import * as Layers from './layers'
import './isochrone.js'
import $ from "jquery";

window.onload = init



function init() {

  const mapView = new ol.View({
    center: ol.proj.fromLonLat([-35.7356, -9.66512]),
    zoom: 10
  })

  const map = new ol.Map({
    view: mapView,
    layers: Layers.baseGroup,
    target: 'map'
  })

    // Define the coordinates for the polygon
    var coordinates = [[[-5, 40], [45, 40], [40, 60], [-5, 60], [-5, 40]]];

    // Create a new polygon feature with the coordinates
    var polygonFeature = new ol.Feature(new ol.geom.Polygon(coordinates));

    // Create a vector layer to hold the polygon
    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [polygonFeature]
      })
    });

    map.addLayer(vectorLayer)

  // Add controls

  map.addControl(Controls.mousePosition)
  map.addControl(Controls.scaleControl);

  // Change Base Layers



  const baseLayersMenu = document.querySelector('#baselayers');
  Layers.baseLayers.forEach(layer => {
    
    const link = document.createElement('a');
    link.style.cursor = 'pointer';
    link.classList.add('list-group-item', 'list-group-item-action', 'bg-light', 'text-dark')
    link.innerHTML = `<span class="menu-collapsed">${layer.values_.title}</span>`
    link.setAttribute("onChange", "toggleLayer(event)");
    baseLayersMenu.appendChild(link)

    link.onclick = (evt) => {
      evt.preventDefault()
      toggleLayer(layer.values_.title)
    }
  });

  function toggleLayer(layerTitle) {
    Layers.baseGroup.getLayers().forEach(function(element){
      let baseLayerName = element.get('title');
      element.setVisible(baseLayerName === layerTitle)
    })
  }

  // Change overlays

  let layersWMS;

  (async () => {
    layersWMS = await Layers.getOverlays();
    layersWMS = Object.values(layersWMS)

    let overlays = [];
    for (let i = 0; i < layersWMS.length; i++) {
      const overlayDesc = layersWMS[i];
      overlays.push(
        new ol.layer.Tile({
          title: overlayDesc.title,
          source: new ol.source.TileWMS({
            url: overlayDesc.url,
            params: {'LAYERS': overlayDesc.layer, 'TILED': true },
            serverType: 'geoserver',
          }),
          visible: false,
          zIndex:10
        })
      )
    }

    const overlaysGroup = new ol.layer.Group({
      title: 'Overlays',
      layers: overlays
    });
    map.addLayer(overlaysGroup);

    const overlaysMenu = document.querySelector('#overlays');
    overlays.forEach(layer => {
      
      const link = document.createElement('div');
      link.style.cursor = 'pointer';
      link.classList.add('list-group-item', 'list-group-item-action', 'bg-light', 'text-dark')
      
      const checkbox = document.createElement('input');
      checkbox.classList.add("menu-collapsed")
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("id", "overlayCheckbox");
      checkbox.setAttribute("name", "overlayCheckbox");
      checkbox.setAttribute("value", layer.values_.title);
      const checkboxLabel = document.createElement('label');
      checkboxLabel.setAttribute("for", "overlayCheckbox");
      checkboxLabel.innerHTML = layer.values_.title;
      link.appendChild(checkbox);
      link.appendChild(checkboxLabel);
      overlaysMenu.appendChild(link)
    });

    const overlayElements = document.querySelectorAll('input[type=checkbox]');
    for(let overlayElement of overlayElements) {
      overlayElement.addEventListener('change', function(){
        let overlayElementValue = this.value;
        let WMSLayer;
        overlaysGroup.getLayers().forEach(function(element, index, array){
          if (overlayElementValue === element.get('title')) {
            WMSLayer = element;
          }
        })
        this.checked ? WMSLayer.setVisible(true) : WMSLayer.setVisible(false);
      })
    }

      //popup

  let container = document.getElementById('popup')
  let content = document.getElementById('popup-content')
  let closer = document.getElementById('popup-closer')

  let popup = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    }
  })

  map.addOverlay(popup)

  closer.onclick = function() {
    popup.setPosition(undefined)
    closer.blur();
    return false
  }

  map.on('singleclick', function (evt) {
    content.innerHTML = '';
    const resolution = mapView.getResolution();
    
    console.log("visible: ", Object.values(overlays[0])[7].visible)
    overlays.forEach(overlay => {
      if (Object.values(overlay)[7].visible) {
        const url = overlay.getSource().getFeatureInfoUrl(evt.coordinate, resolution, 'EPSG:3857', {
          'INFO_FORMAT': 'application/json',
        })
      
        if (url){
          console.log('Url: ', url)
          $.getJSON(url, function(data){
      
            const feature = data.features[0];
            const props = feature.properties;
            var keys = Object.keys(props);
            var values = Object.values(props);

            console.log('keys: ', keys)
            for (var i = 0; i < keys.length; i++) {
              content.innerHTML += '<p>' + keys[i] + ': ' + values[i] + '</p>';
            }
            popup.setPosition(evt.coordinate);
          })
        } else {
          popup.setPosition(undefined);
        }
      }
    })

  })
  
  })();


  //upload KML files
  const inputFile = document.getElementById('file')

  inputFile.addEventListener('change', () => {
    const selectedFile = inputFile.files[0]
    const reader = new FileReader();
    const kmlUrl = URL.createObjectURL(selectedFile);
    localStorage.setItem('kmlUrl', kmlUrl)

    const kmlLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        format: new ol.format.KML(),
        url: kmlUrl
      })
    });

    map.addLayer(kmlLayer);

  })



  //heatmap

  const blur = document.getElementById('blur');
  const radius = document.getElementById('radius');

  const heatMapOnlineFbUsers = new ol.layer.Heatmap({
    source: new ol.source.Vector({
      url: './assets/map.geojson',
      format: new ol.format.GeoJSON(),
    }),
    blur: parseInt(blur.value, 10),
    radius: parseInt(radius.value, 10),
  })

  map.addLayer(heatMapOnlineFbUsers);

  blur.addEventListener('input', function () {
    heatMapOnlineFbUsers.setBlur(parseInt(blur.value, 10));
  });

  radius.addEventListener('input', function () {
    heatMapOnlineFbUsers.setRadius(parseInt(radius.value, 10));
  });

}