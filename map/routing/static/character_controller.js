let keys;
let yourCharacterModel;
let yourCharacterID;
let yourName;

function initCharacterControl() {
    keys = {
        a: false,
        s: false,
        d: false,
        w: false,
        arrowup: false,
        arrowdown: false,
        arrowleft: false,
        arrowright: false
    };

    document.body.addEventListener('keydown', function (e) {
        const key = e.code.replace('Key', '').toLowerCase();
        if (keys[key] !== undefined)
            keys[key] = true;
    });
    document.body.addEventListener('keyup', function (e) {
        const key = e.code.replace('Key', '').toLowerCase();
        if (keys[key] !== undefined)
            keys[key] = false;
    });

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    if (yourCharacterModel === undefined || !(yourCharacterID in characters) || !(keys.w || keys.a || keys.s || keys.d || keys.arrowup || keys.arrowdown
        || keys.arrowleft || keys.arrowright)) {
        if (yourCharacterModel !== undefined) yourCharacterModel.stop();
        return;
    }

    let speed = 0.0;
    if (keys.w || keys.arrowup)
        speed = 0.1;
    else if (keys.s || keys.arrowdown)
        speed = -0.1;

    yourCharacterModel.set({worldTranslate: new THREE.Vector3(0, -speed, 0)});

    let options = {
        center: yourCharacterModel.coordinates,
        bearing: map.getBearing(),
        easing: easing
    };

    function toDeg(rad) {
        return rad / Math.PI * 180;
    }

    function toRad(deg) {
        return deg * Math.PI / 180;
    }

    let deg = 2;
    let rad = toRad(deg);
    let zAxis = new THREE.Vector3(0, 0, 1);

    if (keys.a || keys.d || keys.arrowleft || keys.arrowright) {
        if (keys.d || keys.arrowright) {
            rad *= -1
        } else rad *= 1
        yourCharacterModel.set({quaternion: [zAxis, yourCharacterModel.rotation.z + rad]});
        options.bearing = -toDeg(yourCharacterModel.rotation.z);
    }

    yourCharacterModel.playDefault({
        duration: 1000,
        speed: 5
    })
    map.jumpTo(options);
    tb.map.update = true;
}

function easing(t) {
    return t * (2 - t);
}
