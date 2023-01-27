import { useState, useEffect } from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls'

import Stats from 'three/examples/jsm/libs/stats.module'
import Typing from "@/components/typing"
import {CSS2DRenderer} from 'three/examples/jsm/renderers/CSS2DRenderer'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';


export default function Screen() {
  useEffect(() => {


			var camera, scene, renderer;
			var controls;

			var Element = function ( id, x, y, z, ry ) {

				var div = document.createElement( 'div' );
				div.style.width = '480px';
				div.style.height = '360px';
				div.style.backgroundColor = '#000';

				var iframe = document.createElement( 'iframe' );
				iframe.style.width = '480px';
				iframe.style.height = '360px';
				iframe.style.border = '0px';
				iframe.src = [ 'https://www.youtube.com/embed/', id, '?rel=0' ].join( '' );
				div.appendChild( iframe );

				var object = new CSS3DObject( div );
				object.position.set( x, y, z );
				object.rotation.y = ry;

				return object;

			};

			init();
			animate();

			function init() {

				var container = document.getElementById( 'container' );

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
				camera.position.set( 500, 350, 750 );

				scene = new THREE.Scene();

				renderer = new CSS3DRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				var group = new THREE.Group();
				group.add( new Element( 'b0pSIP2eJvs', 0, 0, 0, 0 ) );

				scene.add( group );

				controls = new TrackballControls( camera, renderer.domElement );
				controls.rotateSpeed = 4;

				window.addEventListener( 'resize', onWindowResize, false );

				// Block iframe events when dragging camera

				var blocker = document.getElementById( 'blocker' );
				blocker.style.display = 'none';

				controls.addEventListener( 'start', function () {

					blocker.style.display = '';

				} );
				controls.addEventListener( 'end', function () {

					blocker.style.display = 'none';

				} );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );
				controls.update();
				renderer.render( scene, camera );

			}
  }, [])
  return (
    <>
      {/* <div id='canvasContainer'>
        <canvas id='container'/>

     </div> */}
     <div id="container"></div>
		<div id="blocker"></div>
    </>
  )
}
