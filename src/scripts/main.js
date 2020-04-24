import SceneInit from './scene';
import LightsInit from './lights';
import BuildingsInit from './buildings';
import * as THREE from 'three';

let Scene, Light;

function letsPlay() {
	init();
	animate();
}

function init() {
	Scene = new SceneInit();
	Scene.createScene();
	Scene.addControls();

	Light = new LightsInit();
	Light.createLights(Scene);

	let Building = new BuildingsInit();
	Building.createBuildings(Scene);

	window.addEventListener('resize', onWindowResize, false);
	document.body.appendChild(Scene.renderer.domElement);
}

function onWindowResize() {
	Scene.camera.aspect = window.innerWidth / window.innerHeight;
	Scene.camera.updateProjectionMatrix();
	Scene.renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	Light.renderLights();
	requestAnimationFrame(animate);
	Scene.renderer.render(Scene.scene, Scene.camera);
}

letsPlay();
