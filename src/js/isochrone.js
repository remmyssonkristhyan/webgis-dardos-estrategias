// fetch(`https://isoline.router.hereapi.com/v8/isolines?transportMode=car&range[type]=distance&range[values]=3000&origin=-9.66512,-35.7356&apikey=N9GW7XnvM6mbqaUGAZEuCWceUJY2iOv0V_6HmfOzTfc`)
// .then(response => response.json())
// .then(data => {
//     console.log(" Data: ", data)
//     const encodedString = data.isolines[0].polygons[0].outer;
//     console.log("encoded string: ", encodedString)
//     const decodedCoordinates = ol.format.Polyline.decodeDeltas(encodedString, 2);
//     console.log("decoded coordinates: ", decodedCoordinates)

//     const newCoordinates = decodedCoordinates.map((coord, index) => {
//     if(index % 2 === 0) {
//         return [decodedCoordinates[index+1], coord];
//     }
//     }).filter(Boolean);
    
//     console.log("Novas coordenadas: ",newCoordinates);

//     const lonlatCoordinates = newCoordinates.map(point => ol.proj.transform(point, 'EPSG:3857', 'EPSG:4326'))
//     console.log("lon lat coordenadas: ", lonlatCoordinates)

//     const coordinates = [
//         [
//           [
//             -35.6412812278291,
//             -9.191690677274323
//           ],
//           [
//             -35.81755043813271,
//             -9.221518987780414
//           ],
//           [
//             -35.938420753768185,
//             -9.032564105001299
//           ],
//           [
//             -36.411829490010774,
//             -9.28613833539508
//           ],
//           [
//             -36.275850384919664,
//             -9.474957053272945
//           ],
//           [
//             -36.42693827946448,
//             -9.66863674080156
//           ],
//           [
//             -35.943457016919695,
//             -9.802657503798272
//           ],
//           [
//             -35.661426280435336,
//             -9.301048803506575
//           ],
//           [
//             -35.6412812278291,
//             -9.191690677274323
//           ]
//         ]
//       ];


//     const polygon = new ol.geom.Polygon(coordinates)

//     console.log("Poligono: ", polygon)
//     const feature = new ol.Feature(polygon);
//     console.log("Feature: ", feature)

//     const vectorSource = new ol.source.Vector({
//         feature: feature
//     })
//     console.log(vectorSource);

//     const vectorLayer = new ol.layer.Vector({
//         source: vectorSource,
//     });
//     console.log("vector layer: ", vectorLayer)
//     map.addLayer(vectorLayer);
// })





    // const lonlatCoordinates = newCoordinates.map(point => olProj.transform(point, 'EPSG:3857', 'EPSG:4326'))
    // console.log("lon lat coordenadas: ", lonlatCoordinates)

    // const coordinates = [
    // [
    //     [
    //     -35.6412812278291,
    //     -9.191690677274323
    //     ],
    //     [
    //     -35.81755043813271,
    //     -9.221518987780414
    //     ],
    //     [
    //     -35.938420753768185,
    //     -9.032564105001299
    //     ],
    //     [
    //     -36.411829490010774,
    //     -9.28613833539508
    //     ],
    //     [
    //     -36.275850384919664,
    //     -9.474957053272945
    //     ],
    //     [
    //     -36.42693827946448,
    //     -9.66863674080156
    //     ],
    //     [
    //     -35.943457016919695,
    //     -9.802657503798272
    //     ],
    //     [
    //     -35.661426280435336,
    //     -9.301048803506575
    //     ],
    //     [
    //     -35.6412812278291,
    //     -9.191690677274323
    //     ]
    // ]
    // ];

    // const polygon = new Polygon(coordinates)

    // console.log("Poligono: ", polygon)
    // const feature = new Feature(polygon);
    // console.log("Feature: ", feature)

    // const vectorSource = new VectorSource({
    // feature: feature
    // })
    // console.log(vectorSource);

    // const vectorLayer = new VectorLayer({
    // source: vectorSource,
    // zIndex: 999,
    // map: map
    // });
    // console.log("vector layer: ", vectorLayer)
    // map.addLayer(vectorLayer);

    // // create a new style for the polygon
    // const polygonStyle = new Style({
    // fill: new Fill({
    //     color: "rgba(255, 0, 0, 0.5)"
    // }),
    // stroke: new Stroke({
    //     color: "red",
    //     width: 2
    // })
    // });

    // // apply the style to the feature
    // feature.setStyle(polygonStyle);