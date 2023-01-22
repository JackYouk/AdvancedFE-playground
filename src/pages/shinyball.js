import { useState, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import Typing from "@/components/typing"
import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'



export default function ShinyBall() {
  useEffect(() => {
    // SCENE -----------------------------------------------------------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#292929')

    // CAMERA -----------------------------------------------------------
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 500;

    const canvas = document.getElementById('canvas');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.querySelector('#computerContainer').appendChild(renderer.domElement);
    document.querySelector('#canvasContainer').appendChild(renderer.domElement);

    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // LIGHTS -----------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    // const spotLight = new THREE.SpotLight(0xffffff, 1);
    // spotLight.castShadow = true;
    // scene.add(spotLight);
    const pointlight = new THREE.PointLight(0xffffff, 1);
    pointlight.position.set(200, 200, 200)
    scene.add(pointlight);

    // Helpers
    // const lightHelper = new THREE.PointLightHelper(pointlight)
    // const gridHelper = new THREE.GridHelper(200, 50);
    // scene.add(lightHelper, gridHelper)

    // CONTROLS -----------------------------------------------------------
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableDamping = true;
    // STATS -----------------------------------------------------------
    const stats = Stats();
    document.body.appendChild(stats.dom)

    // SHINYBALL -----------------------------------------------------------
    const envmapLoader = new THREE.PMREMGenerator(renderer);

    new RGBELoader().setPath('./assets/').load('sandsloot_4k.pic', function (hdrmap) {
      const envmap = envmapLoader.fromCubemap(hdrmap);

      const texture = new THREE.CanvasTexture(new FlakesTexture());
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.x = 10;
      texture.repeat.y = 6;
      const ballGeo = new THREE.SphereGeometry(100, 64, 64);
      const ballMat = new THREE.MeshPhysicalMaterial({
        clearcoat: 1.0,
        clearcoatRoughness: 0.07,
        metalness: 1,
        roughness: 0.5,
        color: 0x000000,
        normalMap: texture,
        normalScale: new THREE.Vector2(0.15, 0.15),
        envMap: envmap.texture,
      });
      const ballMesh = new THREE.Mesh(ballGeo, ballMat);
      scene.add(ballMesh);
    })



    // ANIMATIONS -----------------------------------------------------------
    const animate = () => {
      // updates
      stats.update();
      controls.update();



      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    }
    animate();
  }, [])
  return (
    <>
      <div id='canvasContainer'>
    <canvas id='canvas'/>

    </div>
    </>
  )
}
