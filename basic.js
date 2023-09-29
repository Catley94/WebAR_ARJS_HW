window.onload = () => {
    let testEntityAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", e => {
        if(!testEntityAdded) {
            alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
            // Add a sphere to the north of the initial GPS position
            const sphere = document.createElement("a-entity");
            sphere.setAttribute("scale", {
                x: 20,
                y: 20,
                z: 20
            });
            sphere.setAttribute('geometry', 'primitive: sphere');
            sphere.setAttribute('material', { color: 'red' } );
            sphere.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude + 0.001,
                longitude: e.detail.position.longitude
            });

            const box = document.createElement("a-entity");
            box.setAttribute("scale", {
                x: 20,
                y: 20,
                z: 20
            });
            box.setAttribute('geometry', 'primitive: box');
            box.setAttribute('material', { color: 'red' } );
            box.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude + 0.002,
                longitude: e.detail.position.longitude
            });

            const cylinder = document.createElement("a-entity");
            cylinder.setAttribute("scale", {
                x: 20,
                y: 20,
                z: 20
            });
            cylinder.setAttribute('geometry', 'primitive: box');
            cylinder.setAttribute('material', { color: 'red' } );
            cylinder.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude - 0.002,
                longitude: e.detail.position.longitude
            });


            document.querySelector("a-scene").appendChild(sphere);
            document.querySelector("a-scene").appendChild(box);
            document.querySelector("a-scene").appendChild(cylinder);
        }
        testEntityAdded = true;
    });
};