import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, RotateCw, ZoomIn, ZoomOut, Eye, ShieldAlert } from 'lucide-react';

export function DisasterMesh3D({ activeIncident, onSelectNode }) {
  const mountRef = useRef(null);
  const [selectedNodeData, setSelectedNodeData] = useState(null);
  const [cameraMode, setCameraMode] = useState('perspective');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 420;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060911);
    scene.fog = new THREE.FogExp2(0x060911, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(16, 14, 20);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xf59e0b, 1.2);
    dirLight.position.set(15, 25, 10);
    scene.add(dirLight);

    const cyanPointLight = new THREE.PointLight(0x06b6d4, 2, 30);
    cyanPointLight.position.set(-8, 5, -5);
    scene.add(cyanPointLight);

    // 3. Terrain Grid (Digital Elevation Model)
    const gridSize = 24;
    const gridDivisions = 24;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x334155, 0x1e293b);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    // 4. Water / Flood Plane
    const waterGeo = new THREE.PlaneGeometry(24, 24, 16, 16);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.8,
      wireframe: false
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = 0.2;
    scene.add(waterMesh);

    // 5. Central Telecommunication Tower
    const towerGroup = new THREE.Group();
    towerGroup.position.set(0, 0, 0);

    // Tower Mast Lattice
    const mastGeo = new THREE.CylinderGeometry(0.15, 0.6, 6, 4);
    const mastMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, wireframe: true });
    const mastMesh = new THREE.Mesh(mastGeo, mastMat);
    mastMesh.position.y = 3;
    towerGroup.add(mastMesh);

    // Tower Red Beacon Light
    const beaconGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = 6.2;
    towerGroup.add(beaconMesh);

    // Radio Wave Rings expanding outward
    const waveRings = [];
    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.RingGeometry(1, 1.15, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = 5.8;
      towerGroup.add(ringMesh);
      waveRings.push({ mesh: ringMesh, scale: 1 + i * 1.5, baseSpeed: 0.04 });
    }
    scene.add(towerGroup);

    // 6. Citizen Endpoint Nodes & LoRa Repeaters
    const nodeItems = [
      { id: 'CIT-104', type: 'citizen', status: 'safe', pos: [-5, 0.5, 4], label: 'Household #104 (Safe)' },
      { id: 'CIT-219', type: 'citizen', status: 'trapped', pos: [6, 0.4, 5], label: 'Household #219 (Water in Home)' },
      { id: 'CAS-312', type: 'citizen', status: 'medical', pos: [-4, 0.8, -6], label: 'Elderly #312 (Oxygen Needed)' },
      { id: 'LORA-REP', type: 'repeater', status: 'mesh', pos: [8, 3.5, -7], label: 'LoRa 868MHz Hilltop Repeater' },
      { id: 'CIT-405', type: 'citizen', status: 'trapped', pos: [3, 0.4, -4], label: 'Roof Shelter #405' },
      { id: 'SDRF-BOAT', type: 'rescue', status: 'rescue', pos: [1, 0.3, 2], label: 'NDRF Inflatable Rescue Raft' }
    ];

    const nodeMeshes = [];
    const interactiveObjects = [];

    nodeItems.forEach((item) => {
      const group = new THREE.Group();
      group.position.set(item.pos[0], item.pos[1], item.pos[2]);

      let color = 0x10b981;
      let radius = 0.4;

      if (item.status === 'medical') {
        color = 0xef4444;
        radius = 0.55;
      } else if (item.status === 'trapped') {
        color = 0xf59e0b;
        radius = 0.45;
      } else if (item.status === 'mesh') {
        color = 0xa855f7;
        radius = 0.6;
      } else if (item.status === 'rescue') {
        color = 0x06b6d4;
        radius = 0.5;
      }

      const sphereGeo = new THREE.SphereGeometry(radius, 24, 24);
      const sphereMat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.6,
        roughness: 0.2
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.userData = item;
      group.add(sphere);
      interactiveObjects.push(sphere);

      // Node base anchor pin line down to ground
      const lineMat = new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.5 });
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -item.pos[1], 0)];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, lineMat);
      group.add(line);

      // Pulsing halo for medical and trapped
      if (item.status === 'medical' || item.status === 'trapped') {
        const haloGeo = new THREE.RingGeometry(radius * 1.3, radius * 1.5, 24);
        const haloMat = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        halo.rotation.x = -Math.PI / 2;
        group.add(halo);
        nodeMeshes.push({ group, halo, item });
      } else {
        nodeMeshes.push({ group, item });
      }

      // Connecting beam from tower to nodes
      const beamMat = new THREE.LineDashedMaterial({
        color: color,
        dashSize: 0.5,
        gapSize: 0.3,
        transparent: true,
        opacity: 0.35
      });
      const beamPoints = [new THREE.Vector3(0, 5.8, 0), new THREE.Vector3(item.pos[0], item.pos[1], item.pos[2])];
      const beamGeo = new THREE.BufferGeometry().setFromPoints(beamPoints);
      const beamLine = new THREE.Line(beamGeo, beamMat);
      beamLine.computeLineDistances();
      scene.add(beamLine);

      scene.add(group);
    });

    // 7. Mouse Orbit Controls (Smooth Custom Pointer Drag)
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotationSpeed = 0.005;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouse.x;
      const deltaY = e.clientY - prevMouse.y;
      prevMouse = { x: e.clientX, y: e.clientY };

      // Orbit camera around center
      const angle = deltaX * rotationSpeed;
      const x = camera.position.x;
      const z = camera.position.z;
      camera.position.x = x * Math.cos(angle) + z * Math.sin(angle);
      camera.position.z = -x * Math.sin(angle) + z * Math.cos(angle);
      camera.position.y = Math.max(3, Math.min(28, camera.position.y - deltaY * 0.05));
      camera.lookAt(0, 1.5, 0);
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Raycaster for clicking 3D nodes
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    const onClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseCoord.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseCoord, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects);

      if (intersects.length > 0) {
        const hit = intersects[0].object.userData;
        setSelectedNodeData(hit);
        if (onSelectNode) onSelectNode(hit);
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('click', onClick);

    // 8. Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow idle orbit if user is not actively dragging
      if (!isDragging) {
        const idleAngle = 0.0015;
        const x = camera.position.x;
        const z = camera.position.z;
        camera.position.x = x * Math.cos(idleAngle) + z * Math.sin(idleAngle);
        camera.position.z = -x * Math.sin(idleAngle) + z * Math.cos(idleAngle);
        camera.lookAt(0, 1.5, 0);
      }

      // Tower beacon flash
      beaconMat.opacity = Math.sin(elapsed * 6) > 0 ? 1 : 0.3;

      // Expand radio wave rings
      waveRings.forEach((r) => {
        r.scale += r.baseSpeed;
        if (r.scale > 8) r.scale = 1;
        r.mesh.scale.set(r.scale, r.scale, 1);
        r.mesh.material.opacity = Math.max(0, 0.7 - r.scale * 0.08);
      });

      // Water gentle wave swell
      waterMesh.position.y = 0.2 + Math.sin(elapsed * 1.5) * 0.08;

      // Pulse halos for trapped & medical
      nodeMeshes.forEach((nm) => {
        if (nm.halo) {
          const s = 1 + Math.sin(elapsed * 4) * 0.3;
          nm.halo.scale.set(s, s, 1);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[440px] rounded-2xl overflow-hidden border border-white/10 bg-[#060911] shadow-2xl">
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Overlay Controls */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span className="text-white font-bold">3D DISASTER TOPOLOGY & RADIO MESH</span>
          <span className="text-slate-400 hidden sm:inline">• Click nodes to inspect</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/80 backdrop-blur-md p-1 rounded-xl border border-white/10 text-xs font-mono">
          <span className="text-[10px] text-slate-400 px-2">Drag to Orbit 360°</span>
        </div>
      </div>

      {/* Legend Ribbon at Bottom */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex flex-wrap items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono pointer-events-auto">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-slate-300">GSM Central Tower</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-slate-300">Safe Node</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-slate-300">Trapped Node</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-slate-300">Medical Casualty</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
            <span className="text-slate-300">LoRa Repeater</span>
          </div>
        </div>

        {/* Selected Node Telemetry Pill */}
        {selectedNodeData && (
          <div className="bg-amber-500/15 border border-amber-500/50 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-mono text-amber-300 pointer-events-auto flex items-center gap-2 animate-fadeIn">
            <span className="font-bold">INSPECTED:</span>
            <span>{selectedNodeData.label}</span>
            <button
              onClick={() => setSelectedNodeData(null)}
              className="ml-1 text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
