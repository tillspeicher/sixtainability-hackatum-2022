let booms = [];

function onObjectChanged(e) {
    let model = e.detail.object; //here's the object already modified
    let c = model.coordinates;
    let point = map.project(c);
    let features = map.queryRenderedFeatures(point, {layers: ["3d-buildings"]});

    // Check for crash
    if (features.length > 0) {
        if (Math.floor(Math.random() * 10) === 2) {
            addBang(model.coordinates)
            setTimeout(function () {
                try {
                    tb.remove(booms.shift())
                } catch (error) {
                }
            }, 800)
        }
    }
}
