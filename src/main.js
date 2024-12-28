      import * as THREE from 'three';

	  import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
	  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	  import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
	  import Stats from 'three/examples/jsm/libs/stats.module.js';
	
	  let camera, scene, renderer, stats;

	  init();

	  function init() {

		  const container = document.createElement( 'div' );
		  document.body.appendChild( container );

		  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
		  camera.position.set( 2, 18, 28 );

		  scene = new THREE.Scene();

		  // stats
		  stats = new Stats();
		  container.appendChild( stats.dom );

		  // model
		  const loader = new FBXLoader();
		  loader.load( '../public/gudong.fbx', function ( object ) {
			  object.scale.set(0.5,0.5,0.5);
			  object.position.set(-8,0,-5);

			  scene.add( object );

		  } );

		  const ambientLight = new THREE.AmbientLight(0xffffff, 8); 
		  scene.add(ambientLight)
		  const directionalLight = new THREE.DirectionalLight(0xffffff, 6); 
		  directionalLight.position.set(-10, 10, -10);
		  // 让光线方向指向场景中心（0, 0, 0）
		  directionalLight.lookAt(0, 0, 0);
		  scene.add(directionalLight);
		  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 10); 
		  directionalLight2.position.set(10, 10, 10);
		  // 让光线方向指向场景中心（0, 0, 0）
		  directionalLight2.lookAt(0, 0, 0);
		  scene.add(directionalLight2);
		  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 10); 
		  directionalLight3.position.set(0, 6, 0);
		  // 让光线方向指向场景中心（0, 0, 0）
		  directionalLight3.lookAt(0, 0, 0);
		  scene.add(directionalLight3);

		  renderer = new THREE.WebGLRenderer();
		  renderer.setPixelRatio( window.devicePixelRatio );
		  renderer.setSize( window.innerWidth, window.innerHeight );
		  renderer.setAnimationLoop( animate );
		  container.appendChild( renderer.domElement );

		  const controls = new OrbitControls( camera, renderer.domElement );
		  controls.target.set( 0, 10, 0);
		  controls.update();

		  window.addEventListener( 'resize', onWindowResize );


	  }

	  function onWindowResize() {

		  camera.aspect = window.innerWidth / window.innerHeight;
		  camera.updateProjectionMatrix();

		  renderer.setSize( window.innerWidth, window.innerHeight );

	  }

	  //

	  function animate() {

		  renderer.render( scene, camera );

		  stats.update();

	  }
