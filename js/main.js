import './../libs/v6.4.3-dist/ol.css'
import './../css/style.css'

const apiKey = import.meta.env.HERE_API_KEY;

const hereLayers = [
  {
    title: 'Mapa Base',
    base: 'base',
    type: 'maptile',
    scheme: 'normal.day',
    apiKey: apiKey,
  },
  {
    title: 'Satelite',
    base: 'aerial',
    type: 'maptile',
    scheme: 'satellite.day',
    apiKey: apiKey,
  },
  {
    title: 'Hibrido',
    base: 'aerial',
    type: 'maptile',
    scheme: 'hybrid.day',
    apiKey: apiKey,
  },
];

const urlTpl =
'https://{1-4}.{base}.maps.ls.hereapi.com' +
'/{type}/2.1/maptile/newest/{scheme}/{z}/{x}/{y}/256/png' +
'?apiKey={apiKey}';

function createUrl(tpl, layerDesc) {
  return tpl
    .replace('{base}', layerDesc.base)
    .replace('{type}', layerDesc.type)
    .replace('{scheme}', layerDesc.scheme)
    .replace('{apiKey}', layerDesc.apiKey);
}

const layers = [];

for (let i = 0; i < hereLayers.length; ++i) {
  const layerDesc = hereLayers[i];
  layers.push(
    new ol.layer.Tile({
      title: layerDesc.title,
      type: 'base',
      visible: i == 0 ? true : false,
      source: new ol.source.XYZ({
        url: createUrl(urlTpl, layerDesc),
        attributions:
          'Map Tiles &copy; ' +
          new Date().getFullYear() +
          ' ' +
          '<a href="https://developer.here.com/" target="_blank">HERE</a>',
      }),
    })
  );
}

window.onload = init

function init() {
  const map = new ol.Map({
      view: new ol.View({
          center: ol.proj.fromLonLat([-35.7356, -9.66512]),
          zoom: 10
      }),
      layers: layers,
      target: 'map'
    })
}