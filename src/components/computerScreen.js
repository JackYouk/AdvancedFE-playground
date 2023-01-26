import { useState, useEffect } from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import Typing from "@/components/typing"
import {CSS2DRenderer} from 'three/examples/jsm/renderers/CSS2DRenderer'


export default function ComputerScreen() {
  useEffect(() => {
    // SCENE -----------------------------------------------------------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );
    
    // CAMERA -----------------------------------------------------------
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 96;
    
    const canvas = document.getElementById('canvas');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.querySelector('#computerContainer').appendChild(renderer.domElement);
    document.querySelector('#canvasContainer').appendChild(renderer.domElement);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    document.querySelector('#canvasContainer').appendChild(renderer.domElement);

    // LIGHTS -----------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // ambientLight.castShadow = true;
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // spotLight.castShadow = true;
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    // Helpers
    // const lightHelper = new THREE.PointLightHelper(spotLight)
    // const gridHelper = new THREE.GridHelper(200, 50);
    // scene.add(lightHelper, gridHelper)

    // CONTROLS -----------------------------------------------------------
    const controls = new OrbitControls(camera, renderer.domElement);
    // STATS -----------------------------------------------------------
    const stats = Stats();
    document.body.appendChild(stats.dom)

    // // TORUS -----------------------------------------------------------
    // const torusGeometry = new THREE.TorusGeometry(20, 10, 16, 100);
    // const torusMaterial = new THREE.MeshNormalMaterial({ wireframe: true,});
    // const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    // scene.add(torusMesh);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.setSize(this.window.innerWidth, this.window.innerHeight);
    }
    window.addEventListener('resize', () => onWindowResize(), false);


    // ANIMATIONS -----------------------------------------------------------
    const animate = () => {
      // updates
      stats.update();
      controls.update();
      
    // //   torus
    //   torusMesh.rotation.x += 0.01;
    //   torusMesh.rotation.y += 0.01;


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
