window.onload = () => {

    let testEntityAdded = false;

    const headset = document.querySelector("#vrheadset_loaded");
    const el = document.querySelector("[gps-new-camera]");

    headset.addEventListener("click", (e) => {
        console.log("Clicked");
        alert("VR Clicked");
    })

    el.addEventListener("gps-camera-update-position", async(e) => {
        if(!testEntityAdded) {
            alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
            headset.setAttribute("gps-new-entity-place", `latitude: ${e.detail.position.latitude + 0.001}; longitude: ${e.detail.position.longitude}`);
            // Add a box to the north of the initial GPS position
            const entity = document.createElement("a-box");
            entity.setAttribute("scale", {
                x: 20,
                y: 20,
                z: 20
            });
            entity.setAttribute('material', { color: 'red' } );
            entity.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude + 0.001,
                longitude: e.detail.position.longitude
            });
            document.querySelector("a-scene").appendChild(entity);
        }
        testEntityAdded = true;
    });
};