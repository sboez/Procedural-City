import SceneInit from './scene';
import * as THREE from 'three';

export default class BuildingsInit {
	createBuildings(Scene) {
		this.geometry = new THREE.BoxGeometry(10, 10, 10);
		this.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0.5, 0));

		/* remove bottom, it's never seen */
		this.geometry.faces.splice(6, 2);
	    this.geometry.faceVertexUvs[0].splice(6, 2);

	    /* no texture at the top  */
	    this.geometry.faceVertexUvs[0][5][2].set(0, 0);
	    this.geometry.faceVertexUvs[0][4][2].set(0, 0);

		this.buildingMesh = new THREE.Mesh(this.geometry);

		this.light = new THREE.Color(0xffffff);
		this.shadow = new THREE.Color(0x303050);

	    this.cityGeometry = new THREE.Geometry();

	     /* set position and scale */
	    for(let i = 0; i < 100; ++i) {
		    this.buildingMesh.position.x = Math.floor(Math.random() * 200 - 100) * 10;
			this.buildingMesh.position.z = Math.floor(Math.random() * 200 - 100) * 10;
			this.buildingMesh.rotation.y = Math.random() * Math.PI * 2;
			this.buildingMesh.scale.x = Math.random() * Math.random() * Math.random() * Math.random() * 50 + 10;
			this.buildingMesh.scale.y = (Math.random() * Math.random() * Math.random() * this.buildingMesh.scale.x) * 8 + 8;
			this.buildingMesh.scale.z = this.buildingMesh.scale.x;
			this.buildingMesh.updateMatrix();
	        this.cityGeometry.merge(this.buildingMesh.geometry, this.buildingMesh.matrix);
	        this.addLights(Scene);
		}
		this.addTexture(Scene);
	}
	addTexture(Scene) {
		this.texture = new THREE.Texture(this.createTexture());

		 /* a higher value gives a less blurry result than a basic mipmap */
	    this.texture.anisotropy = Scene.renderer.capabilities.getMaxAnisotropy();
	    this.texture.needsUpdate = true;

	    this.material = new THREE.MeshLambertMaterial({
	    	map: this.texture,
	        vertexColors: THREE.VertexColors
	    });
	    this.cityMesh = new THREE.Mesh(this.cityGeometry, this.material);
	    Scene.scene.add(this.cityMesh);	
	}
	createTexture() {
		let step = 2;

		this.canvas = document.createElement('canvas');
		this.canvas.width = 32;
		this.canvas.height = 64;
		this.context = this.canvas.getContext('2d');

		this.context.fillStyle = '#000000';
		this.context.fillRect(0, 0, 32, 64);

		/* windows size/color */
		for(var y = 4; y < this.canvas.height; y += step) {
			for(var x = 2; x < this.canvas.width; x += step) {
				this.context.fillStyle = '#fcff72';
				this.context.fillRect(x, y, 1, 1);
			}
		}

		this.bigCanvas = document.createElement('canvas');
		this.bigCanvas.width = 512;
		this.bigCanvas.height = 1024;
		this.context = this.bigCanvas.getContext('2d');
		this.context.imageSmoothingEnabled = false;
		this.context.webkitImageSmoothingEnabled = false;
		this.context.drawImage(this.canvas, 0, 0, this.bigCanvas.width, this.bigCanvas.height);

		return this.bigCanvas;
	}
	addLights(Scene) {
		this.buildingLight = new THREE.PointLight(0xffffff, 0.05);
        this.buildingLight.position.x = this.buildingMesh.position.x;
        this.buildingLight.position.y = this.buildingMesh.position.y;
        this.buildingLight.position.z = this.buildingMesh.position.z;
        Scene.scene.add(this.buildingLight);
	}
}   
