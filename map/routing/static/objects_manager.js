let cars = {};
let characters = {};

// Create Threebox
map.on('style.load', function () {
    map.addLayer({
        id: 'custom_layer',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function (map, mbxContext) {
            window.tb = new Threebox(
                map,
                mbxContext,
                {
                    defaultLights: true
                }
            );
        },
        render: function (gl, matrix) {
            tb.update();
        }
    });

    // map.setPitch(45);

    // Add your character
    create_character();
})

function create_character() {
    let location = generateRandomLocation();

    yourName = chance.animal();
    $.ajax({
        url: logicServer + "/character",
        data: JSON.stringify({
            "name": yourName,
            "position": {
                "latitude": location[1],
                "longitude": location[0]
            }
        }),
        type: "POST",
        contentType: "application/json",
        success: function (response) {
            yourCharacterID = response;
            addCharacter(location, yourCharacterID, yourName, true);
            window.top.postMessage("characterID:" + yourCharacterID, '*')

            // Init main loop
            initCharacterControl();
            update_objects();
        }
    })
}

function addCar(coordinates, id) {
    let options = {
        obj: 'static/assets/sixt.glb',
        type: 'gltf',
        scale: 3,
        units: 'meters',
        adjustment: {x: 0, y: 0, z: 0},
        anchor: 'center',
        rotation: {x: 90, y: 90, z: 0} //default rotation
    }

    tb.loadObj(options, function (model) {
        model = model.setCoords(coordinates);
        tb.add(model);
        cars[id] = model;
    })
}

function addBang(coordinates) {
    let options = {
        obj: 'static/assets/explosion/scene.gltf',
        type: 'gltf',
        scale: 0.5,
        units: 'meters',
        anchor: 'center',
        adjustment: {x: 0, y: 0, z: 0},
        rotation: {x: 90, y: -45, z: 0} //default rotation
    }

    tb.loadObj(options, function (model) {
        model = model.setCoords(coordinates);
        tb.add(model);
        booms.push(model)
    })
}

function addCharacter(coordinates, id, name, your = false) {
    let options = {
        obj: 'static/assets/person/scene.gltf',
        type: 'gltf',
        scale: 1,
        units: 'meters',
        anchor: 'center',
        adjustment: {x: 0, y: 0, z: 0},
        rotation: {x: 90, y: -45, z: 0} //default rotation
    }

    tb.loadObj(options, function (model) {
        model = model.setCoords(coordinates);
        tb.add(model);
        let text = document.createElement('h4');
        text.innerHTML = name;
        text.style = "color:red; transform: translate(0, -150%);";
        model.addLabel(text, {
            visible: true,
            center: model.anchor,
            height: 1
        })
        characters[id] = model;

        // if (your) {
        //     model.addEventListener('ObjectChanged', onObjectChanged, false);
        //     yourCharacterModel = model;
        //     map.jumpTo({
        //         center: coordinates
        //     });
        //     map.setPitch(45);
        //     map.setZoom(16);
        // }
    })
}

function deleteCar(id) {
    tb.remove(cars[id]);
    delete cars[id];
}

function deleteCharacter(id) {
    tb.remove(characters[id]);
    delete characters[id];
}
