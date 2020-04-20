import SceneInit from './scene';
import BuildingsInit from './buildings';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three';

let Scene, Building;

function letsPlay() {
	init();
	animate();
}

function init() {
	Scene = new SceneInit();
	Scene.createScene();

	Building = new BuildingsInit();
	Building.createBuildings(Scene);

	let controls = new OrbitControls(Scene.camera, Scene.renderer.domElement);
	controls.update();

	window.addEventListener('resize', onWindowResize, false);
	document.body.appendChild(Scene.renderer.domElement);
}

function onWindowResize() {
	Scene.camera.aspect = window.innerWidth / window.innerHeight;
	Scene.camera.updateProjectionMatrix();
	Scene.renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(animate);
	Scene.renderer.render(Scene.scene, Scene.camera);
}

letsPlay();
