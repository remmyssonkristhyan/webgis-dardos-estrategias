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

  // Change Base Layers

  const baseLayersMenu = document.querySelector('#baselayers');
  Layers.baseLayers.forEach(layer => {
    
    const link = document.createElement('a');
    link.style.cursor = 'pointer';
    link.onclick = () => {
      Layers.baseGroup.getLayers().forEach(function(element, index, array){
        let baseLayerName = element.get('title');
        element.setVisible(baseLayerName === layer.values_.title)
      })
    }
    link.classList.add('list-group-item', 'list-group-item-action', 'bg-light', 'text-dark')
    link.innerHTML = `<span class="menu-collapsed">${layer.values_.title}</span>`
    baseLayersMenu.appendChild(link)
  });

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
  
  })();
}