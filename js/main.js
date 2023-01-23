import './../libs/v6.4.3-dist/ol.css';
import './../css/style.css';
import * as Controls from './controls.js';
import * as Layers from './layers'

window.onload = init

function init() {
  const map = new ol.Map({
    view: new ol.View({
      center: ol.proj.fromLonLat([-35.7356, -9.66512]),
      zoom: 10
    }),
    layers: Layers.baseGroup,
    target: 'map'
  })

  // Add controls

  map.addControl(Controls.mousePosition)
  map.addControl(Controls.scaleControl);

}