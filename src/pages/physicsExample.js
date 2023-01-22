import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OimoPhysics } from 'three/addons/physics/OimoPhysics';
import Stats from 'three/addons/libs/stats.module.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import { useState, useEffect } from 'react'



export default function Template() {
  useEffect(() => {
    let camera, scene, renderer, stats;
    let physics, position;

    let boxes, spheres, names;

    init();

    async function init() {

      physics = await OimoPhysics();
      position = new THREE.Vector3();

      //

      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(- 1, 1.5, 2);
      camera.lookAt(0, 0.5, 0);

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x666666);

      const hemiLight = new THREE.HemisphereLight();
      hemiLight.intensity = 0.35;
      scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight();
      dirLight.position.set(5, 5, 5);
      dirLight.castShadow = true;
      dirLight.shadow.camera.zoom = 2;
      scene.add(dirLight);

      const floor = new THREE.Mesh(
        new THREE.BoxGeometry(10, 5, 10),
        new THREE.ShadowMaterial({ color: 0x111111 })
      );
      floor.position.y = - 2.5;
      floor.receiveShadow = true;
      scene.add(floor);
      physics.addMesh(floor);

      //

      const material = new THREE.MeshLambertMaterial();

      const matrix = new THREE.Matrix4();
      const color = new THREE.Color();

      // Names
      const fontLoader = new FontLoader();
      const ttfLoader = new TTFLoader();
      let font;
      ttfLoader.load('/assets/Roboto-Bold.ttf', (json) => {
        font = fontLoader.parse(json);      
        // name
        const nameGeometry = new TextGeometry('Jack', {
          height: 0.05,
          size: 0.1,
          font: font,
        });
        names = new THREE.InstancedMesh(nameGeometry, material, 100);
        names.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
        names.castShadow = true;
        names.receiveShadow = true;
        scene.add(names);

        for (let i = 0; i < names.count; i++) {
          matrix.setPosition(Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5);
          names.setMatrixAt(i, matrix);
          names.setColorAt(i, color.setHex(0xffffff * Math.random()));
        }
        physics.addMesh(names, 1);
      })




      // Boxes

      const geometryBox = new THREE.BoxGeometry(0.1, 0.1, 0.1);
      boxes = new THREE.InstancedMesh(geometryBox, material, 100);
      boxes.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
      boxes.castShadow = true;
      boxes.receiveShadow = true;
      scene.add(boxes);

      for (let i = 0; i < boxes.count; i++) {

        matrix.setPosition(Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5);
        boxes.setMatrixAt(i, matrix);
        boxes.setColorAt(i, color.setHex(0xffffff * Math.random()));

      }

      physics.addMesh(boxes, 1);

      // Spheres

      const geometrySphere = new THREE.IcosahedronGeometry(0.075, 3);
      spheres = new THREE.InstancedMesh(geometrySphere, material, 100);
      spheres.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
      spheres.castShadow = true;
      spheres.receiveShadow = true;
      scene.add(spheres);

      for (let i = 0; i < spheres.count; i++) {

        matrix.setPosition(Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5);
        spheres.setMatrixAt(i, matrix);
        spheres.setColorAt(i, color.setHex(0xffffff * Math.random()));

      }

      physics.addMesh(spheres, 1);

      const canvas = document.getElementById('canvas');

      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      renderer.outputEncoding = THREE.sRGBEncoding;
      document.body.appendChild(renderer.domElement);

      stats = new Stats();
      document.body.appendChild(stats.dom);

      //

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.y = 0.5;
      controls.update();

      animate();

    }

    function animate() {

      requestAnimationFrame(animate);

      //

      let index = Math.floor(Math.random() * boxes.count);

      position.set(0, Math.random() + 1, 0);
      physics.setMeshPosition(boxes, position, index);

      //

      index = Math.floor(Math.random() * spheres.count);

      position.set(0, Math.random() + 1, 0);
      physics.setMeshPosition(spheres, position, index);

      renderer.render(scene, camera);
      // //

      // index = Math.floor(Math.random() * names.count);

      // position.set(0, Math.random() + 1, 0);
      // physics.setMeshPosition(names, position, index);

      renderer.render(scene, camera);

      stats.update();

    }
  }, [])
  return (
    <>

      <canvas id='canvas' />
    </>
  )
}
