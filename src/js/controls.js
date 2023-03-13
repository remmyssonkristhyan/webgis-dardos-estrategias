
import '../css/controls.css'


// mousePosition

export const mousePosition = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: 'EPSG:4326',
    className: 'mousePosition'
});
  
  
// scaleControl  
  
export const scaleControl = new ol.control.ScaleLine({
    bar: true,
    text: true
});
