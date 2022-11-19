function moveCharacter(id, coordinate, duration, rotation) {
    let object = characters[id];
    object.stop()

    object.set({
        coords: coordinate,
        duration: duration,
        rotation: rotation / Math.PI * 180
    })
}

function moveCar(id, coordinate, duration, labelName, assignedToID) {
    let object = cars[id];
    
    object.stop();

    let config = {
        coords: coordinate,
        duration: duration
    }
    object.followPath({
            animation: 1,
            path: [object.coordinates, coordinate],
            duration: duration
        },
    );

    if (assignedToID === yourCharacterID) {
        function toDeg(rad) {
            return rad / Math.PI * 180;
        }

        let options = {
            center: coordinate,
            bearing: -toDeg(object.rotation.z) + 180,
            easing: easing,
            speed: 0.5,
        };
        map.jumpTo(options);
    }

    if (labelName) {
        let text = document.createElement('h4');
        text.innerHTML = labelName;
        text.style = "color:red; transform: translate(0, -150%);";
        object.addLabel(text, {
            visible: true,
            center: object.anchor,
            height: 1
        })
    } else {
        try {
            object.removeLabel()
        } catch (error) {

        }
    }

    object.playAnimation(config);
}

let routes = [];

function drawRoute(newRoute) {
    if (newRoute.length === 0) return;
    for (let i = 0; i < newRoute.length; i++) {
        let buf = newRoute[i][0];
        newRoute[i][0] = newRoute[i][1];
        newRoute[i][1] = buf;
    }

    let lineOptions = {
        geometry: newRoute,
        color: "blue",
        width: 5
    }

    let route = tb.line(lineOptions);
    routes.push(route);

    tb.add(route)
}

function removeRoutes() {
    for (const route of routes) {
        tb.remove(route);
    }
    routes = []
}
