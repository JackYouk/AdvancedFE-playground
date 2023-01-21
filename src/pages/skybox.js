import { useState, useEffect } from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { AmmoPhysics } from 'three/addons/physics/AmmoPhysics.js';


export default function TransitionsPage() {
  useEffect(() => {
    // SCENE -----------------------------------------------------------

    const scene = new THREE.Scene();
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      // left
      '/assets/cloudy/graycloud_lf.jpg', 
      // right
      '/assets/cloudy/graycloud_rt.jpg', 
      // up
      '/assets/cloudy/graycloud_up.jpg', 
      // down
      '/assets/cloudy/graycloud_dn.jpg', 
      // back
      '/assets/cloudy/graycloud_bk.jpg', 
      // front
      '/assets/cloudy/graycloud_ft.jpg', 
    ]);
    scene.background = texture;
    
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
    document.body.appendChild(renderer.domElement);

    // LIGHTS -----------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // Helpers
    // const lightHelper = new THREE.PointLightHelper(spotLight)
    // const gridHelper = new THREE.GridHelper(200, 50);
    // scene.add(lightHelper, gridHelper)

    // CONTROLS -----------------------------------------------------------
    const controls = new OrbitControls(camera, renderer.domElement);
    // STATS -----------------------------------------------------------
    // const stats = Stats();
    // document.body.appendChild(stats.dom)

    // // TORUS -----------------------------------------------------------
    // const torusGeometry = new THREE.TorusGeometry(20, 10, 16, 100);
    // const torusMaterial = new THREE.MeshNormalMaterial({ wireframe: true,});
    // const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    // scene.add(torusMesh);

    // SKYBOX -----------------------------------------------------------
    const sky1 = new THREE.TextureLoader().load('/assets/cloudy/bc1.jpg');
    const skyboxMaterial = new THREE.MeshBasicMaterial({map: sky1, side: THREE.DoubleSide});
    const skyboxGeometry = new THREE.BoxGeometry(20,20,20);
    const skyboxMesh = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    scene.add(skyboxMesh);


    // ANIMATIONS -----------------------------------------------------------
    const animate = () => {
      // updates
      // stats.update();
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
<canvas id='canvas'/>
  )
}
