import SceneInit from './scene';
import * as THREE from 'three';

export default class LightsInit {
	constructor(pointLights) {
		this.pointLights = [];
		this.pointLights.length = 12;
	}
	createLights(Scene) {
		this.sphere = new THREE.SphereBufferGeometry(5, 8, 8);
		this.material = new THREE.MeshBasicMaterial({ color: 0x000000 });

		let x = [], z = [];
		this.v1 = [], this.v2 = [];
		/* random lights position X and Z between -1000 and 1000 
			and random value for animation */
		for(let i = 0; i < this.pointLights.length * 2; ++i) {
	   		x.push(this.getRandom(-1000, 1000));
	   		z.push(this.getRandom(-1000, 1000));

	   		this.v1.push(this.getRandom(0.5, 1));
			this.v2.push(this.getRandom(0.1, 1));
	   	}

		for (let i = 0; i < this.pointLights.length; ++i) {
			this.pointLights[i] = new THREE.PointLight(this.getRandomColor(), 50, 400, 2.0);
			this.pointLights[i].add(new THREE.Mesh(this.sphere, this.material));
			this.pointLights[i].position.set(x[i], 300, z[i]);
			Scene.scene.add(this.pointLights[i]);
		}
	}
	renderLights() {
		const clock = new THREE.Clock();
		const time = Date.now() * 0.0025;
		const dt = 8;

		for (let i = 0; i < this.pointLights.length; ++i) {
			this.pointLights[i].position.x += Math.sin(time * this.v1[i]) * dt;
			this.pointLights[i].position.z += Math.cos(time * this.v2[i]) * dt;
		}
	}
	getRandom(min, max) {
		return Math.random() * (max - min) + min;
	}
	getRandomColor() {
		return ('#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6));
	}
}