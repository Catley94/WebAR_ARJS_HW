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
            alert(`Headset lat: ${headset.getAttribute("gps-new-entity-place").latitude} lon: ${headset.getAttribute("gps-new-entity-place").longitude}`);
            headset.setAttribute("gps-new-entity-place", {
                latitude: e.detail.position.latitude + 0.0001,
                longitude: e.detail.position.longitude
            });
            alert(`Headset new lat: ${headset.getAttribute("gps-new-entity-place").latitude} new lon: ${headset.getAttribute("gps-new-entity-place").longitude}`);
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
                longitude: e.detail.position.longitude + 0.001
            });
            entity.addEventListener("click", (e) => {
                alert("Box Clicked");
            });
            document.querySelector("a-scene").appendChild(entity);
        }
        testEntityAdded = true;
    });
};