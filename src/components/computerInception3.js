import { useState, useEffect } from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Typing from "@/components/typing"
import {
  planeVertexShader,
  planeFragmentShader,
  customVignetteVertexShader,
  customVignetteFragmentShader,
} from './Shaders';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';


export default function ComputerInception3D() {
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
    document.querySelector('#canvasContainer').appendChild(renderer.domElement);
    // document.body.appendChild(renderer.domElement);

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

    // TORUS -----------------------------------------------------------
    // const torusGeometry = new THREE.TorusGeometry(20, 10, 16, 100);
    // const torusMaterial = new THREE.MeshNormalMaterial({ wireframe: true,});
    // const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    // scene.add(torusMesh);

    const loader = new GLTFLoader();

    loader.load('./assets/crt_monitor/scene.gltf', (gltf) => {
      gltf.scene.scale.set(0.2, 0.2, 0.2);
      gltf.scene.rotation.y = -Math.PI / 2;
      gltf.scene.position.y = 5;
      gltf.scene.position.z = -8;
      scene.add(gltf.scene);
    });    const color = 0xffffff;


    // const rtFov = 75;
    // const rtNear = 0.1;
    // const rtFar = 100;
    // const rtWidth = 1024;
    // const rtHeight = 1024;
    // const rtAspect = rtWidth / rtHeight;
    // const rtScene = new THREE.Scene();
    // const renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight);
    // const rtCamera = new THREE.PerspectiveCamera(rtFov, rtAspect, rtNear, rtFar);
    // rtCamera.position.z = 36;

    // const color = 0xffffff;
    // const intensity = 1;
    // const light = new THREE.DirectionalLight(color, intensity);
    // light.position.set(0, 0, 200);
    // rtScene.add(light);
    // rtScene.background = new THREE.Color(0xfafafa);

    // const planeGeometry = new THREE.PlaneGeometry(32, 32, 32, 32);
    // const planeMaterial = new THREE.ShaderMaterial({
    //   side: THREE.DoubleSide,
    //   uniforms: {
    //     time: { type: 'f', value: 1.0 },
    //     uTexture: { value: renderTarget.texture },
    //     vertexShader: planeVertexShader(),
    //     fragmentShader: planeFragmentShader(),
    //   },
    // });
    // const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    // planeMesh.position.y = 5;
    // planeMesh.position.z = -2.4;
    // planeMesh.rotation.x = -Math.PI / 48;
    // planeMesh.scale.set(1.2, 1.2, 1.2);
    // scene.add(planeMesh);

    // const customVignetteShader = {
    //   uniforms: {
    //     tDiffuse: { value: null },
    //     offset: { value: 1.0 },
    //     darkness: { value: 3.0 },
    //     time: { type: 'f', value: 1.0 },
    //   },
    //   vertexShader: customVignetteVertexShader(),
    //   fragmentShader: customVignetteFragmentShader(),
    // };
    // const composer = new EffectComposer(renderer, renderTarget)
    // const renderPass = new RenderPass(rtScene, rtCamera);
    // const filmPass = new FilmPass(0.35, 0.025, 648, false);
    // const customVignettePass = new ShaderPass(
    //   new THREE.ShaderMaterial(customVignetteShader)
    // );
    // composer.addPass(renderPass);
    // composer.addPass(customVignettePass);
    // composer.addPass(filmPass);
    
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
      // stats.update();
      controls.update();
      
      // torus
      // torusMesh.rotation.x += 0.01;
      // torusMesh.rotation.y += 0.01;

      // composer.render();

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
