import { useState, useEffect } from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function ComputerInception3D() {
  useEffect(() => {
    const scene = new THREE.Scene();
    
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
    document.body.appendChild(renderer.domElement);

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
    // const torusGeometry = new THREE.TorusGeometry(20, 10, 16, 100);
    // const torusMaterial = new THREE.MeshNormalMaterial({ wireframe: true,});
    // const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    // scene.add(torusMesh);

    // SNAKE GAME
    const loader = new GLTFLoader();
    loader.load('./assets/crt_monitor/scene.gltf', (gltf) => {
      gltf.scene.scale.set(0.2, 0.2, 0.2);
      gltf.scene.rotation.y = -Math.PI / 2;
      gltf.scene.position.y = 5;
      gltf.scene.position.z = -8;
      scene.add(gltf.scene);
    });

    const planeGeometry = new THREE.PlaneGeometry(32, 32, 32, 32);
    const planeMaterial = new THREE.PlaneGeometry
    // scene.add()
    
    // if window resizes
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
      
      // torus
      // torusMesh.rotation.x += 0.01;
      // torusMesh.rotation.y += 0.01;

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    }
    animate();
  }, [])
  return (
    <>
      <canvas id='canvas'/>
    </>
  )
}
