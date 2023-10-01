window.onload = () => {
    const headset = document.querySelector("#vrheadset_loaded");
    const el = document.querySelector("[gps-new-camera]");

    headset.addEventListener("click", (e) => {
        console.log("Clicked");
        alert("VR Clicked");
    })


    el.addEventListener("gps-camera-update-position", async(e) => {
        alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
        const compoundEntity = document.createElement("a-entity");
        compoundEntity.setAttribute('gps-new-entity-place', {
            latitude: e.detail.position.latitude,
            longitude: e.detail.position.longitude - 0.0001,
        });
        const box = document.createElement("a-box");
        box.setAttribute("scale", {
            x: 20,
            y: 20,
            z: 20
        });
        box.setAttribute('material', { color: 'red' } );
        box.setAttribute("position", {
            x : 0,
            y : 20,
            z: 0
        } );
        compoundEntity.appendChild(box);
        document.querySelector("a-scene").appendChild(compoundEntity);
    });
};