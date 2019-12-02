import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'THREE';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas', {static: false}) private canvas: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
      const canvas = this.canvas.nativeElement;
      const renderer: any = new THREE.WebGLRenderer({
        canvas,
        context: canvas.getContext('webgl2'),
        antialias: true,
        alpha: true
      });

      renderer.setSize(canvas.width, canvas.height);
      renderer.setPixelRatio(window.devicePixelRatio || 1);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);

      camera.position.z = 500;

      const shape = new THREE.TorusGeometry(70, 20, 60, 160);
      const material = new THREE.MeshPhongMaterial({
        color: 0xE4ECFA,
        shininess: 20,
        opacity: .96,
        transparent: true
      });
      const donut = new THREE.Mesh(shape, material);

      scene.add(donut);

      const lightTop = new THREE.DirectionalLight(0xFFFFFF, .3);
      lightTop.position.set(0, 200, 0);
      lightTop.castShadow = true;
      scene.add(lightTop);

      const frontTop = new THREE.DirectionalLight(0xFFFFFF, .4);
      frontTop.position.set(0, 0, 300);
      frontTop.castShadow = true;
      scene.add(frontTop);

      scene.add(new THREE.AmbientLight(0xCDD9ED));

      function twist(geometry, amount) {
        const quaternion = new THREE.Quaternion();
        for (let i = 0; i < geometry.vertices.length; i++) {
          quaternion.setFromAxisAngle(
            new THREE.Vector3(1, 0, 0),
            (Math.PI / 180) * (geometry.vertices[i].x / amount)
          );
          geometry.vertices[i].applyQuaternion(quaternion);
        }
        geometry.verticesNeedUpdate = true;
      }

      let mat = Math.PI;
      const speed = Math.PI / 120;
      let forwards = 1;

      const render = () => {
        requestAnimationFrame(render);
        donut.rotation.x -= speed * forwards;
        mat = mat - speed;
        if (mat <= 0) {
          mat = Math.PI;
          forwards = forwards * -1;
        }
        twist(shape, (mat >= Math.PI / 2 ? -120 : 120) * forwards);
        renderer.render(scene, camera);
      };

      render();
  }

}
