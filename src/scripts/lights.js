import SceneInit from './scene';
import * as THREE from 'three';

export default class LightsInit {
	createLights(Scene) {
		this.sphere = new THREE.SphereBufferGeometry(5, 8, 8);
		this.material = new THREE.MeshBasicMaterial({ color: 0xff0040 });

		this.redLight = new THREE.PointLight( 0xff0040, 50, 400, 2.0 );
		this.redLight.add(new THREE.Mesh(this.sphere, this.material));
		this.redLight.position.set(1000, 300, 500);
		this.redLight.castShadow = true;
		Scene.scene.add(this.redLight);
	}
	renderLights(Scene) {
		const clock = new THREE.Clock();
		const time = Date.now() * 0.0025;
		const dt = 100;

		this.redLight.position.x = Math.sin(time * 0.7) * dt;
		this.redLight.position.z = Math.cos(time * 0.3) * dt;

		Scene.controls.update(clock.getDelta());
	}
}