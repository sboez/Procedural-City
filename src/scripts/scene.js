import * as THREE from 'three';

export default class SceneInit {
	createScene() {
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xa0a0a0);

		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
		this.camera.position.set(0, 800, 1000);

		this.light = new THREE.HemisphereLight(0xffffff, 0x404040, 1); 
		this.scene.add(this.light);

		this.plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(10000, 10000), new THREE.MeshPhongMaterial({ color: 0x353536, side: THREE.DoubleSide }));
		this.plane.rotation.x = -Math.PI / 2;
		this.plane.receiveShadow = true;
		this.scene.add(this.plane);

		this.createRenderer();
	}
	createRenderer() {
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
}
