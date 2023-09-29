import * as THREE from 'three';
import * as THREEx from './node_modules/@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';

function main() {
    const canvas = document.getElementById('canvas1');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
    const renderer = new THREE.WebGLRenderer({canvas: canvas});

    const arjs = new THREEx.LocationBased(scene, camera);
    const cam = new THREEx.WebcamRenderer(renderer);

    const geom = new THREE.BoxGeometry(20, 20, 20);
    const mtl = new THREE.MeshBasicMaterial({color: 0xff0000});
    const box = new THREE.Mesh(geom, mtl);

    const spanXRotation = document.querySelector("#xRotation");

    // Create the device orientation tracker
    const deviceOrientationControls = new THREEx.DeviceOrientationControls(camera);

    // arjs.add(box, 0.001, 0.001);


    // arjs.fakeGps(-0.72, 51.05);

    // Start the GPS
    arjs.startGps();

    // setInterval(() => {
    //     // arjs.lonLatToWorldCoords(-0.72, 51.051);
    //     console.log("Camera: ", camera);
    //     // console.log("Ar.js: ", arjs);
    //     // box.position.x = 0;
    //     // box.position.z = 50;
    // }, 10000)

    arjs.on("gpsupdate", async(pos) => {

        arjs.add(box, pos.x + 0.001, pos.y);

        // if(!fetched) {
        //     const response = await fetch(`https://hikar.org/webapp/map?bbox=${pos.coords.longitude-0.01},${pos.coords.latitude-0.01},${pos.coords.longitude+0.01},${pos.coords.latitude+0.01}&layers=poi&outProj=4326`);
        //
        //     const geojson = await response.json();
        //
        //     geojson.features.forEach ( feature => {
        //         const box = new THREE.Mesh(geom, mtl);
        //         arjs.add(box, feature.geometry.coordinates[0], feature.geometry.coordinates[1]);
        //     });
        //
        //     fetched = true;
        // }
    });

    requestAnimationFrame(render);

    // const rotationStep = THREE.MathUtils.degToRad(2);
    //
    // let mousedown = false, lastX = 0, lastY = 0;
    //
    // window.addEventListener("mousedown", e=> {
    //     mousedown = true;
    // });
    //
    // window.addEventListener("mouseup", e=> {
    //     mousedown = false;
    // });
    //
    // window.addEventListener("mousemove", e=> {
    //     if(!mousedown) return;
    //     if(e.clientX < lastX) {
    //         camera.rotation.y -= rotationStep;
    //         if(camera.rotation.y < 0) {
    //             camera.rotation.y += 2 * Math.PI;
    //         }
    //     } else if (e.clientX > lastX) {
    //         camera.rotation.y += rotationStep;
    //         if(camera.rotation.y > 2 * Math.PI) {
    //             camera.rotation.y -= 2 * Math.PI;
    //         }
    //     }
    //     if(e.clientY < lastY) {
    //         camera.rotation.x -= rotationStep;
    //         if(camera.rotation.x < 0) {
    //             camera.rotation.x += 2 * Math.PI;
    //         }
    //     } else if (e.clientY > lastY) {
    //         camera.rotation.x += rotationStep;
    //         if(camera.rotation.x > 2 * Math.PI) {
    //             camera.rotation.x -= 2 * Math.PI;
    //         }
    //     }
    //     lastX = e.clientX;
    //     lastY = e.clientY;
    // });

    function render() {
        if(canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
            const aspect = canvas.clientWidth/canvas.clientHeight;
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
        }
        // spanXRotation.textContent = camera.rotation.x;
        // box.rotation.y += 0.01;
        // box.rotation.x += 0.02;

        // Update the scene using the latest sensor readings
        deviceOrientationControls.update();

        cam.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
}

main();