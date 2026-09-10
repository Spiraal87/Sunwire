import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/** One scene, no postprocessing, bounded pixel ratio and 30fps. Owned by ForgeCore. */
export function createForgeScene(host: HTMLElement, onFailure: () => void) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, .1, 50);
  camera.position.set(0, 0, 10.8);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, .06);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  const forge = new THREE.Group();
  forge.rotation.set(.32, -.52, -.18);
  scene.add(forge);
  scene.add(new THREE.HemisphereLight(0xc5d3e2, 0x322010, .75));
  const key = new THREE.DirectionalLight(0xffe8bf, 3);
  key.position.set(-3, 5, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0xadc5df, 3);
  rim.position.set(4, -1, 3); scene.add(rim);
  const amber = new THREE.PointLight(0xff840b, 18, 7, 2);
  amber.position.set(0, 0, 1.4); forge.add(amber);
  const steel = new THREE.MeshStandardMaterial({ color: 0x44484d, metalness: .85, roughness: .38 });
  steel.onBeforeCompile = shader => {
    shader.vertexShader = 'varying vec3 sfPosition;\n' + shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n sfPosition = position;');
    shader.fragmentShader = 'varying vec3 sfPosition;\n' + shader.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\n float phase = length(sfPosition.xy) * 680.; float machining = sin(phase) * (1. - smoothstep(.5, 3., fwidth(phase))); diffuseColor.rgb *= .82 + .12 * machining;');
  };
  const edge = new THREE.MeshStandardMaterial({ color: 0x585951, metalness: .8, roughness: .37 });
  const gold = new THREE.MeshStandardMaterial({ color: 0x9b652c, metalness: .82, roughness: .3, emissive: 0x6b2700, emissiveIntensity: .2 });
  const lit = new THREE.MeshBasicMaterial({ color: 0xf8ae46 });
  const rings: THREE.Group[] = [];
  function torus(radius: number, thickness: number, material: THREE.Material, parent: THREE.Group, z: number) {
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, thickness, 6, 128), material);
    mesh.position.z = z; parent.add(mesh); return mesh;
  }
  [1.18, 1.65, 2.13, 2.62].forEach((radius, index) => {
    const group = new THREE.Group();
    group.position.z = -.12 - index * .19;
    group.rotation.x = index === 2 ? .13 : 0;
    forge.add(group); rings.push(group);
    const width = index === 0 ? .24 : .38;
    for (let segment = 0; segment < 8; segment++) {
      const start = segment * Math.PI / 4 + .016;
      const end = (segment + 1) * Math.PI / 4 - .016;
      const shape = new THREE.Shape();
      shape.absarc(0, 0, radius + width / 2, start, end, false);
      shape.absarc(0, 0, radius - width / 2, end, start, true);
      shape.closePath();
      const geometry = new THREE.ExtrudeGeometry(shape, { depth: .13, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: .018, bevelThickness: .018, curveSegments: 16 });
      group.add(new THREE.Mesh(geometry, steel));
    }
    for (let groove = 0; groove < 3; groove++) torus(radius - width / 2 + .035 + groove * .025, .003, edge, group, .152);
    torus(radius + width / 2, .009, edge, group, .14);
    torus(radius - width / 2, .012, gold, group, .14);
    const ticks = new THREE.InstancedMesh(new THREE.BoxGeometry(.018, .065, .015), index === 0 ? lit : gold, 64);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 64; i++) {
      const angle = i / 64 * Math.PI * 2;
      dummy.position.set(Math.sin(angle) * radius, Math.cos(angle) * radius, .16);
      dummy.rotation.z = -angle; dummy.updateMatrix(); ticks.setMatrixAt(i, dummy.matrix);
    }
    group.add(ticks);
    const bolts = new THREE.InstancedMesh(new THREE.CylinderGeometry(.032, .032, .015, 8), edge, 16);
    for (let i = 0; i < 16; i++) {
      const angle = i / 16 * Math.PI * 2 + .08;
      dummy.position.set(Math.sin(angle) * (radius + .07), Math.cos(angle) * (radius + .07), .16);
      dummy.rotation.set(Math.PI / 2, 0, 0); dummy.updateMatrix(); bolts.setMatrixAt(i, dummy.matrix);
    }
    group.add(bolts);
  });
  // Procedural cellular crust. Coordinates live on the sphere, so the texture has no UV seam.
  const coreMaterial = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 }, energy: { value: 0 } },
    vertexShader: `varying vec3 vP; varying vec3 vN; varying vec3 vView;
      void main(){ vP=position; vN=normalize(normalMatrix*normal); vec4 p=modelViewMatrix*vec4(position,1.); vView=normalize(-p.xyz); gl_Position=projectionMatrix*p; }`,
    fragmentShader: `precision highp float; varying vec3 vP; varying vec3 vN; varying vec3 vView; uniform float time; uniform float energy;
      vec3 hash(vec3 p){return fract(sin(vec3(dot(p,vec3(127.1,311.7,74.7)),dot(p,vec3(269.5,183.3,246.1)),dot(p,vec3(113.5,271.9,124.6))))*43758.5453);}
      void main(){ vec3 p=vP*7.; p+=.16*sin(p.zxy*2.+time*.16); vec3 cell=floor(p); vec3 f=fract(p); float a=9.; float b=9.;
        for(int x=-1;x<=1;x++)for(int y=-1;y<=1;y++)for(int z=-1;z<=1;z++){vec3 o=vec3(float(x),float(y),float(z)); vec3 h=hash(cell+o); float d=length(o+h-f); if(d<a){b=a;a=d;}else if(d<b){b=d;}}
        float crack=1.-smoothstep(.012,.085,b-a); float hot=.5+.5*sin(vP.y*5.+vP.x*3.+time*.2); float fres=pow(1.-max(dot(vN,vView),0.),2.4);
        vec3 crust=mix(vec3(.10,.024,.004),vec3(.48,.115,.008),hot);
        vec3 color=mix(crust,vec3(1.,.59,.12),crack); color+=fres*vec3(1.,.42,.045)*1.5;
        color += energy * vec3(.5,.2,.025); gl_FragColor=vec4(color,1.); }`,
  });
  const core = new THREE.Mesh(new THREE.SphereGeometry(.84, 48, 32), coreMaterial);
  core.position.z = .4; forge.add(core);
  torus(.94, .018, lit, forge, .2);
  // Sparse circuitry is part of the scene, not a full-page glow overlay.
  for (let i = 0; i < 12; i++) {
    const angle = i * Math.PI / 6;
    const points = [new THREE.Vector3(2.83, 0, -.72), new THREE.Vector3(3.05 + (i % 3) * .12, 0, -.72), new THREE.Vector3(3.4, .32, -.72), new THREE.Vector3(4.8, .32, -.72)];
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: 0x735127, transparent: true, opacity: .5 }));
    line.rotation.z = angle; forge.add(line);
  }
  let frame = 0, active = false, disposed = false, elapsed = 0, last = 0;
  let targetX = .32, targetY = -.52, spin = 0, velocity = 0, energy = 0;
  let gesture: { id: number; x: number; y: number; lastX: number; lastTime: number; moved: boolean } | undefined;
  const pulse = () => { if (active) energy = 1; };
  function render(now: number) {
    if (!active || disposed) return;
    frame = requestAnimationFrame(render);
    if (now - last < 1000 / 30) return;
    const dt = Math.min((now - last) / 1000, .05); last = now; elapsed += dt;
    energy = Math.max(energy * Math.exp(-dt * 3), gesture ? 0 : Math.min(Math.abs(velocity) * .5, 1));
    coreMaterial.uniforms.energy.value = energy;
    amber.intensity = 18 + energy * 14;
    if (!gesture) { spin += velocity * dt; velocity *= Math.exp(-dt * 4); }
    coreMaterial.uniforms.time.value = elapsed;
    core.rotation.y = elapsed * .035;
    rings.forEach((ring, i) => { ring.rotation.z = elapsed * (i % 2 ? -.018 : .022) + i * .09 + spin * (i % 2 ? -.7 : 1); });
    forge.rotation.x += (targetX - forge.rotation.x) * (1 - Math.exp(-dt * 8));
    forge.rotation.y += (targetY - forge.rotation.y) * (1 - Math.exp(-dt * 8));
    forge.position.y = Math.sin(elapsed * .35) * .035;
    renderer.render(scene, camera);
  }
  const resize = () => { const { width, height } = host.getBoundingClientRect(); if (!width || !height) return; // Retina detail, capped at two samples per CSS pixel and 3M total pixels.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(3_000_000 / (width * height))));
    renderer.setSize(width, height); camera.aspect = width / height; camera.updateProjectionMatrix(); if (!active) renderer.render(scene, camera); };
  const observer = new ResizeObserver(resize); observer.observe(host); resize();
  const down = (event: PointerEvent) => {
    if (!active || !event.isPrimary || event.button !== 0) return;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX, lastTime: event.timeStamp, moved: false };
    velocity = 0;
    host.setPointerCapture(event.pointerId);
  };
  const move = (event: PointerEvent) => {
    if (!active) return;
    const rect = host.getBoundingClientRect();
    if (gesture?.id === event.pointerId) {
      const dx = event.clientX - gesture.lastX;
      const delta = dx / rect.width * 3;
      spin += delta;
      velocity = THREE.MathUtils.clamp(delta / Math.max((event.timeStamp - gesture.lastTime) / 1000, .016), -3, 3);
      gesture.lastX = event.clientX; gesture.lastTime = event.timeStamp;
      gesture.moved ||= Math.hypot(event.clientX - gesture.x, event.clientY - gesture.y) > 8;
      if (Math.abs(event.clientX - gesture.x) > 8 && Math.abs(dx) > 0) pulse();
      targetY = -.52 + THREE.MathUtils.clamp((event.clientX - gesture.x) / rect.width, -.5, .5);
      targetX = .32 + THREE.MathUtils.clamp((event.clientY - gesture.y) / rect.height, -.2, .2);
    } else if (event.pointerType === 'mouse') {
      targetY = -.52 + ((event.clientX - rect.left) / rect.width - .5) * .28;
      targetX = .32 + ((event.clientY - rect.top) / rect.height - .5) * .18;
    }
  };
  const leave = () => { if (!gesture) { targetX = .32; targetY = -.52; } };
  const end = (event: PointerEvent) => {
    if (gesture?.id !== event.pointerId) return;
    const tapped = event.type === 'pointerup' && !gesture.moved;
    if (event.type !== 'pointerup' || event.timeStamp - gesture.lastTime > 100) velocity = 0;
    if (tapped) { pulse(); velocity = 2.4; }
    gesture = undefined;
    if (host.hasPointerCapture(event.pointerId)) host.releasePointerCapture(event.pointerId);
    leave();
  };
  const lost = (event: Event) => { event.preventDefault(); onFailure(); };
  host.addEventListener('pointerdown', down); host.addEventListener('pointerup', end); host.addEventListener('pointercancel', end); host.addEventListener('lostpointercapture', end); host.addEventListener('pointermove', move); host.addEventListener('pointerleave', leave);
  renderer.domElement.addEventListener('webglcontextlost', lost);
  return {
    setActive(value: boolean) { if (active === value || disposed) return; active = value; if (!active) { if (gesture && host.hasPointerCapture(gesture.id)) host.releasePointerCapture(gesture.id); gesture = undefined; velocity = 0; leave(); } cancelAnimationFrame(frame); if (active) { last = performance.now(); frame = requestAnimationFrame(render); } },
    dispose() {
      disposed = true; active = false; cancelAnimationFrame(frame); observer.disconnect();
      host.removeEventListener('pointerdown', down); host.removeEventListener('pointerup', end); host.removeEventListener('pointercancel', end); host.removeEventListener('lostpointercapture', end); host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave); renderer.domElement.removeEventListener('webglcontextlost', lost);
      const geometries = new Set<THREE.BufferGeometry>(); const materials = new Set<THREE.Material>();
      scene.traverse(object => { const mesh = object as THREE.Mesh; if (mesh.geometry) geometries.add(mesh.geometry); if (mesh.material) (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(m => materials.add(m)); });
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); environment.dispose(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
    },
  };
}
