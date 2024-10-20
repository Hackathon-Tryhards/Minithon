import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const HouseLoadingScreen = () => {
  const mountRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [delay, setDelay] = useState(1000);
  const navigate = useNavigate();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    const wallColor = 0xE0E0E0;
    const roofColor = 0x8D6E63;
    const doorColor = 0x5D4037;
    const windowColor = 0xBBDEFB;
    const chimneyColor = 0x795548;

    const houseGroup = new THREE.Group();

    // House body
    const houseGeometry = new THREE.BoxGeometry(1.2, 1, 1.2);
    const houseMaterial = new THREE.MeshPhongMaterial({ 
      color: wallColor,
      roughness: 0.8,
      metalness: 0.2
    });
    const house = new THREE.Mesh(houseGeometry, houseMaterial);
    house.castShadow = true;
    house.receiveShadow = true;
    houseGroup.add(house);

    // Roof
    const roofGeometry = new THREE.ConeGeometry(1, 0.7, 4);
    const roofMaterial = new THREE.MeshPhongMaterial({ 
      color: roofColor,
      roughness: 0.7,
      metalness: 0.3
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 0.85;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    houseGroup.add(roof);

    // Door
    const doorGeometry = new THREE.BoxGeometry(0.3, 0.5, 0.02);
    const doorMaterial = new THREE.MeshPhongMaterial({ 
      color: doorColor,
      roughness: 0.9,
      metalness: 0.1
    });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, -0.25, 0.61);
    houseGroup.add(door);

    // Doorknob
    const doorknobGeometry = new THREE.SphereGeometry(0.02);
    const doorknobMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xB7A55D,
      roughness: 0.3,
      metalness: 0.8
    });
    const doorknob = new THREE.Mesh(doorknobGeometry, doorknobMaterial);
    doorknob.position.set(0.08, -0.25, 0.62);
    houseGroup.add(doorknob);

    // Windows
    const createWindow = (x, y, z) => {
      const windowFrame = new THREE.BoxGeometry(0.3, 0.3, 0.02);
      const frameMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFFFFFF,
        roughness: 0.5,
        metalness: 0.5
      });
      const frame = new THREE.Mesh(windowFrame, frameMaterial);
      frame.position.set(x, y, z);
      houseGroup.add(frame);

      const windowPaneGeometry = new THREE.PlaneGeometry(0.25, 0.25);
      const windowPaneMaterial = new THREE.MeshPhongMaterial({ 
        color: windowColor,
        transparent: true,
        opacity: 0.7,
        roughness: 0.1,
        metalness: 0.9
      });
      const windowPane = new THREE.Mesh(windowPaneGeometry, windowPaneMaterial);
      windowPane.position.set(x, y, z + 0.02);
      houseGroup.add(windowPane);
    };

    createWindow(-0.3, 0.1, 0.61);
    createWindow(0.3, 0.1, 0.61);

    // Chimney
    const chimneyGeometry = new THREE.BoxGeometry(0.2, 0.4, 0.2);
    const chimneyMaterial = new THREE.MeshPhongMaterial({ 
      color: chimneyColor,
      roughness: 0.8,
      metalness: 0.2
    });
    const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
    chimney.position.set(-0.4, 0.9, -0.3);
    chimney.castShadow = true;
    houseGroup.add(chimney);

    scene.add(houseGroup);

    // Ground
    const groundGeometry = new THREE.CircleGeometry(2, 32);
    const groundMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x7CFC00,
      roughness: 0.8,
      metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // Lighting
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    pointLight.castShadow = true;
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Camera positioning
    camera.position.set(3, 2, 3);
    camera.lookAt(0, 0, 0);

    // Loading text
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry('Loading...', {
        font: font,
        size: 0.2,
        height: 0.05,
      });
      const textMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(-0.5, -1, 0);
      scene.add(textMesh);
    });

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Simulated loading progress
    const loadingInterval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        if (newProgress >= 100) {
          clearInterval(loadingInterval);
          setTimeout(() => {
            navigate('/dashboard');
          }, delay);
          return 100;
        }
        return newProgress;
      });
    }, 25);

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(loadingInterval);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [navigate, delay]);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: 'linear-gradient(to bottom, #87CEEB, #E0F6FF)', position: 'relative' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      <div style={{ 
        position: 'absolute', 
        bottom: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        width: '200px', 
        height: '4px', 
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#4CAF50',
            transition: 'width 0.2s'
          }}
        />
      </div>
    </div>
  );
};

export default HouseLoadingScreen;