import { useState, useEffect } from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import Typing from "@/components/typing"
import Link from 'next/link'



export default function Morph() {
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
    camera.position.x = 70;
    camera.position.y = 30;
    camera.position.z = 70;
    
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
    spotLight.position.setY(30)
    spotLight.position.setX(-20)
    scene.add(spotLight);

    // Helpers
    // const lightHelper = new THREE.PointLightHelper(spotLight)
    // const gridHelper = new THREE.GridHelper(200, 50);
    // scene.add(lightHelper, gridHelper)

    // CONTROLS -----------------------------------------------------------
    const controls = new OrbitControls(camera, renderer.domElement);
    // STATS -----------------------------------------------------------
    const stats = Stats();
    document.body.appendChild(stats.dom)

    // // PLANE -----------------------------------------------------------
    const planeGeo = new THREE.PlaneGeometry(30, 30, 200, 200);
    const planeMat = new THREE.MeshPhongMaterial({color: 0xffffff});
    const planeMesh = new THREE.Mesh(planeGeo, planeMat);
    planeMesh.receiveShadow = true;
    planeMesh.castShadow = true;
    planeMesh.rotation.x = - Math.PI /2;
    scene.add(planeMesh);


    const count = planeGeo.attributes.position.count;
    
    // ANIMATIONS -----------------------------------------------------------
    const animate = () => {
      // updates
      stats.update();
      controls.update();
      
      const now = Date.now() / 100;
      for(let i = 0; i < count; i++) {
        const x = planeGeo.attributes.position.getX(i);
        // const y = planeGeo.attributes.position.getY(i);
        const xsin = Math.sin(x + now);
        // const ycos = Math.cos(y + now);
        // planeGeo.attributes.position.setZ(i, xsin + ycos);
        planeGeo.attributes.position.setZ(i, xsin);
      }
      planeGeo.computeVertexNormals();
      planeGeo.attributes.position.needsUpdate = true;



      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    }
    animate();

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', () => onWindowResize(), false);
    
  }, [])
  return (
    <>
      <div id='canvasContainer'>
    <canvas id='canvas'/>

    </div>
    </>
  )
}
