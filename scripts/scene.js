import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three';

export default class SceneInit {
	createScene() {
		this.scene = new THREE.Scene();
		this.scene.fog = new THREE.FogExp2(0x3d3d40, 0.0005);
		this.scene.background = new THREE.Color(0x8BB4F3);

		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
		this.camera.position.set(0, 800, 1000);

		this.plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(3000, 3000), new THREE.MeshPhongMaterial({ color: 0x9FA0A3 }));
		this.plane.rotation.x = -Math.PI / 2;
		this.plane.position.y = -50;
		this.plane.receiveShadow = true;
		this.scene.add(this.plane);

		this.createRenderer();
	}
	createRenderer() {
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
	addControls() {
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.update();
	}
}
