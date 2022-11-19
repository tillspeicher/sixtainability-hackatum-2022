function update_objects() {
    getObjectUpdates();
    pushCharacterUpdate();

    // Run this function recursively
    setTimeout(update_objects, updateDelay - 100)
}

function pushCharacterUpdate() {
    if (yourCharacterModel === undefined) return;
    // Send character update to server
    $.ajax({
        url: logicServer + "/character/location",
        data: JSON.stringify({
            "characterId": yourCharacterID,
            "position": {
                "latitude": yourCharacterModel.coordinates[1],
                "longitude": yourCharacterModel.coordinates[0]
            },
            "bearing": yourCharacterModel.rotation.z
        }),
        type: "PUT",
        contentType: "application/json",
        success: function () {
        }
    })
}

function getObjectUpdates() {
    if (yourCharacterModel === undefined) return;

    // Update cars
    $.ajax({
        url: logicServer + "/car",
        type: "GET",
        success: function (newCars) {
            removeRoutes();
            for (const car of newCars) {
                let coordinates = [car['position']['longitude'], car['position']['latitude']];
                if (car['id'] in cars) {
                    if (car['state'] === 1 || car['state'] === 5) {
                        drawRoute(car['shortRoute'])
                    }
                    moveCar(car['id'],
                        coordinates,
                        updateDelay,
                        car['assignedTo'],
                        car['assignedToId'])
                } else {
                    addCar(coordinates, car['id'])
                }
            }
        }
    })

    // Update characters
    $.ajax({
        url: logicServer + "/character",
        type: "GET",
        success: function (newCharacters) {
            let updated = {};
            for (const character of newCharacters) {
                updated[character['id']] = null;
                if ((character['state'] === 3 || character['state'] === 4) && character['id'] in characters) {
                    deleteCharacter(character['id'])
                }
                let coordinates = [character['position']['longitude'], character['position']['latitude']];
                if (character['id'] === yourCharacterID) {
                    if (character['state'] === 0 && !(yourCharacterID in characters)) {
                        addCharacter(coordinates, yourCharacterID, character['name'], true)
                    }
                    continue;
                }
                if (character['id'] in characters) {
                    moveCharacter(character['id'],
                        coordinates,
                        updateDelay,
                        character['bearing'])
                } else {
                    if (character['state'] === 3 || character['state'] === 4) continue;
                    addCharacter(coordinates, character['id'], character['name'])
                }
            }

            let toRemove = [];
            for (const key in characters) {
                if (!(key in updated)) {
                    toRemove.push(key)
                }
            }

            for (const key of toRemove) {
                try {
                    deleteCharacter(key)
                } catch (error) {

                }
            }
        }
    })
}