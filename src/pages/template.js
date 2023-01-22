import { useState, useEffect } from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import Typing from "@/components/typing"



export default function Template() {
  useEffect(() => {
    // SCENE -----------------------------------------------------------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    
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

    // LIGHTS -----------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // Helpers
    const lightHelper = new THREE.PointLightHelper(spotLight)
    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(lightHelper, gridHelper)

    // CONTROLS -----------------------------------------------------------
    const controls = new OrbitControls(camera, renderer.domElement);
    // STATS -----------------------------------------------------------
    const stats = Stats();
    document.body.appendChild(stats.dom)

    // TORUS -----------------------------------------------------------
    const torusGeometry = new THREE.TorusGeometry(20, 10, 16, 100);
    const torusMaterial = new THREE.MeshNormalMaterial({ wireframe: true,});
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torusMesh);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', () => onWindowResize(), false);


    // ANIMATIONS -----------------------------------------------------------
    const animate = () => {
      // updates
      stats.update();
      controls.update();
      
    //   torus
      torusMesh.rotation.x += 0.01;
      torusMesh.rotation.y += 0.01;


      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    }
    animate();
  }, [])
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center'}} onScroll={(e) => e.target.style({display: 'none'})}>
      <Typing text={["Go ahead, Neo, scroll your little mouse.", "Enter the matrix."]} cssName={'computerText'} />
      </div>

      <div id='canvasContainer'>
    <canvas id='canvas'/>

    </div>
    </>
  )
}
