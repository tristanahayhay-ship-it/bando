(() => {
  const locations = [
    {
      id: "hanoi",
      name: "Hà Nội, Việt Nam",
      lon: 105.8342,
      lat: 21.0278,
      height: 2000000,
      description: "Thủ đô Việt Nam.",
    },
    {
      id: "paris",
      name: "Paris, Pháp",
      lon: 2.3522,
      lat: 48.8566,
      height: 2000000,
      description: "Thành phố ánh sáng.",
    },
    {
      id: "newyork",
      name: "New York, Mỹ",
      lon: -74.006,
      lat: 40.7128,
      height: 2200000,
      description: "Thành phố không ngủ.",
    },
  ];

  const viewer = new Cesium.Viewer("cesiumContainer", {
    animation: false,
    timeline: false,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: true,
    sceneModePicker: false,
    navigationHelpButton: true,
    fullscreenButton: false,
    infoBox: true,
    terrainProvider: new Cesium.EllipsoidTerrainProvider(),
    imageryProvider: new Cesium.OpenStreetMapImageryProvider({
      url: "https://tile.openstreetmap.org/",
      credit:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    }),
  });

  viewer.scene.globe.enableLighting = true;

  const entitiesById = new Map();

  for (const place of locations) {
    const entity = viewer.entities.add({
      id: place.id,
      name: place.name,
      description: `<p>${place.description}</p>`,
      position: Cesium.Cartesian3.fromDegrees(place.lon, place.lat),
      point: {
        pixelSize: 11,
        color: Cesium.Color.ORANGE,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      },
      label: {
        text: place.name,
        font: "14px sans-serif",
        showBackground: true,
        backgroundColor: Cesium.Color.BLACK.withAlpha(0.65),
        fillColor: Cesium.Color.WHITE,
        pixelOffset: new Cesium.Cartesian2(0, -24),
      },
    });

    entitiesById.set(place.id, entity);
  }

  viewer.flyTo(viewer.entities, {
    duration: 1.8,
  });

  const buttonsContainer = document.getElementById("flyToButtons");

  locations.forEach((place) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = place.name;

    button.addEventListener("click", () => {
      const target = entitiesById.get(place.id);
      if (!target) return;

      viewer.flyTo(target, {
        duration: 1.8,
        offset: new Cesium.HeadingPitchRange(
          0,
          Cesium.Math.toRadians(-35),
          place.height,
        ),
      });
      viewer.selectedEntity = target;
    });

    buttonsContainer.appendChild(button);
  });
})();
