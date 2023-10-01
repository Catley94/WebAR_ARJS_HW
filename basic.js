window.onload = () => {
    const headset = document.querySelector("#vrheadset_loaded");
    const el = document.querySelector("[gps-new-camera]");

    headset.addEventListener("click", (e) => {
        console.log("Clicked");
        alert("VR Clicked");
    })


    el.addEventListener("gps-camera-update-position", async(e) => {

    });
};