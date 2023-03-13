const apiKey = import.meta.env.VITE_HERE_API_KEY;
console.log('api key: ', apiKey)

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

export const baseLayers = [];

for (let i = 0; i < hereLayers.length; ++i) {
  const layerDesc = hereLayers[i];
  baseLayers.push(
    new ol.layer.Tile({
      title: layerDesc.title,
      type: 'base',
      visible: i == 0 ? true : false,
      zIndex: 0,
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

export const baseGroup = new ol.layer.Group({
    title: 'Mapas Base',
    fold: true,
    layers: baseLayers
});

export async function getOverlays(){
  let data = await fetch('http://localhost:3000/Layers')
      .then(response => response.json());
  return data;
}





