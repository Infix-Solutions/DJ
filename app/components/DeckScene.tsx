"use client";

import { Environment, Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function Knob({ x, z, active }: { x: number; z: number; active: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current && active) ref.current.rotation.y += delta * .55;
  });
  return (
    <mesh ref={ref} position={[x, .58, z]} castShadow>
      <cylinderGeometry args={[.055, .055, .11, 16]} />
      <meshStandardMaterial color="#24221f" metalness={.82} roughness={.2} />
    </mesh>
  );
}

function Turntable({ x, active }: { x: number; active: boolean }) {
  const platter = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (platter.current) platter.current.rotation.y += delta * (active ? .9 : .08);
  });
  return (
    <group position={[x, 0, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.45, .34, 2.05]} />
        <meshStandardMaterial color="#211f1b" metalness={.72} roughness={.2} />
      </mesh>
      <group ref={platter} position={[0, .22, 0]}>
        <mesh position={[0, -.035, 0]} castShadow>
          <cylinderGeometry args={[.9, .9, .08, 64]} />
          <meshStandardMaterial color="#777169" metalness={.95} roughness={.12} />
        </mesh>
        <mesh castShadow>
          <cylinderGeometry args={[.82, .82, .12, 64]} />
          <meshStandardMaterial color="#11110f" metalness={.7} roughness={.14} />
        </mesh>
        {[.25, .42, .58, .72].map((r) => (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, .065, 0]} key={r}>
            <ringGeometry args={[r, r + .008, 64]} />
            <meshBasicMaterial color={active ? "#c89353" : "#777066"} transparent opacity={active ? .8 : .48} />
          </mesh>
        ))}
        {Array.from({ length: 20 }, (_, index) => {
          const angle = (index / 20) * Math.PI * 2;
          return (
            <mesh key={`jog-mark-${index}`} position={[Math.cos(angle) * .86, .012, Math.sin(angle) * .86]} rotation={[0,-angle,0]}>
              <boxGeometry args={[.035,.025,.1]} />
              <meshStandardMaterial color="#c7c1b6" metalness={.96} roughness={.1} emissive={active ? "#6f4a26" : "#000"} emissiveIntensity={active ? .6 : 0} />
            </mesh>
          );
        })}
        <mesh position={[0, .08, 0]}>
          <cylinderGeometry args={[.16, .16, .03, 32]} />
          <meshStandardMaterial color={active ? "#d39a58" : "#53473a"} emissive={active ? "#7d481c" : "#000000"} emissiveIntensity={2} />
        </mesh>
        <mesh position={[0,.105,0]}><cylinderGeometry args={[.018,.018,.055,16]} /><meshStandardMaterial color="#d8d4cc" metalness={1} roughness={.08} /></mesh>
      </group>
      <mesh position={[-.86,.22,-.72]}>
        <boxGeometry args={[.48,.055,.22]} />
        <meshStandardMaterial color="#080c0d" metalness={.4} roughness={.15} emissive={active ? "#284f55" : "#111"} emissiveIntensity={active ? 1.7 : .2} />
      </mesh>
      {Array.from({ length: 7 }, (_, index) => (
        <mesh key={`deck-wave-${index}`} position={[-1.04 + index * .06,.255,-.72]}>
          <boxGeometry args={[.026,.015,.08 + (index % 3) * .025]} />
          <meshBasicMaterial color={active ? "#77b6ad" : "#38423f"} />
        </mesh>
      ))}
      <mesh position={[.88, .29, -.66]} rotation={[0, -.28, 0]}>
        <boxGeometry args={[.07, .08, 1.05]} />
        <meshStandardMaterial color="#a7a49c" metalness={1} roughness={.1} />
      </mesh>
      <mesh position={[.96,.225,.22]}>
        <boxGeometry args={[.055,.035,.88]} />
        <meshStandardMaterial color="#3d3933" metalness={.78} roughness={.18} />
      </mesh>
      <mesh position={[.96,.285,active ? .04 : .28]}>
        <boxGeometry args={[.18,.085,.17]} />
        <meshStandardMaterial color="#bdb6a9" metalness={.88} roughness={.16} />
      </mesh>
      {[[-1.08,-.84],[1.08,-.84],[-1.08,.84],[1.08,.84]].map(([sx,sz],index) => (
        <mesh key={`deck-screw-${index}`} position={[sx,.205,sz]} rotation={[-Math.PI / 2,0,0]}>
          <cylinderGeometry args={[.035,.035,.022,12]} />
          <meshStandardMaterial color="#bbb5aa" metalness={1} roughness={.12} />
        </mesh>
      ))}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={i} position={[-.86 + i * .22, .25, .77]}>
          <boxGeometry args={[.15, .045, .15]} />
          <meshStandardMaterial color={active ? ["#d6a05e", "#ad6886", "#698ab7", "#69a58e"][i] : "#4b463e"} emissive={active ? ["#9c581e", "#76344f", "#31517d", "#2f7159"][i] : "#000"} emissiveIntensity={active ? 2.6 : 0} />
        </mesh>
      ))}
    </group>
  );
}

function MeterSegment({ x, z, index, active }: { x: number; z: number; index: number; active: boolean }) {
  const material = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (!material.current) return;
    const pulse = Math.sin(clock.elapsedTime * 6.5 + index * .8 + x * 3);
    material.current.emissiveIntensity = active && pulse > index * .08 - .65 ? 3.4 : .18;
  });
  const color = index > 5 ? "#d35f51" : index > 3 ? "#d5aa4c" : "#66a77e";
  return (
    <mesh position={[x, .285, z]}>
      <boxGeometry args={[.055, .028, .075]} />
      <meshStandardMaterial ref={material} color={active ? color : "#393630"} emissive={active ? color : "#000"} emissiveIntensity={.2} />
    </mesh>
  );
}

function MixerDisplay({ active }: { active: boolean }) {
  const bars = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!bars.current || !active) return;
    bars.current.children.forEach((child, index) => {
      child.scale.z = .35 + Math.abs(Math.sin(clock.elapsedTime * 4.5 + index * .65)) * .9;
    });
  });
  return (
    <group position={[0, .29, -.52]}>
      <mesh>
        <boxGeometry args={[.38, .025, .3]} />
        <meshStandardMaterial color="#090b0b" metalness={.45} roughness={.2} />
      </mesh>
      <group ref={bars} position={[0, .018, 0]}>
        {Array.from({ length: 9 }, (_, index) => (
          <mesh key={index} position={[-.16 + index * .04, 0, 0]}>
            <boxGeometry args={[.018, .018, .17]} />
            <meshStandardMaterial color={active ? "#d2a05f" : "#30302d"} emissive={active ? "#8c5525" : "#000"} emissiveIntensity={2.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Crossfader({ active }: { active: boolean }) {
  const control = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (control.current) control.current.position.x = active ? Math.sin(clock.elapsedTime * .72) * .32 : 0;
  });
  return (
    <group position={[0,.3,.83]}>
      <mesh><boxGeometry args={[1.08,.03,.055]} /><meshStandardMaterial color="#36322d" metalness={.72} roughness={.22} /></mesh>
      <mesh ref={control} position={[0,.055,0]}><boxGeometry args={[.18,.09,.16]} /><meshStandardMaterial color="#d0c9bd" metalness={.9} roughness={.14} /></mesh>
    </group>
  );
}

function Mixer({ active }: { active: boolean }) {
  return (
    <group position={[0, .03, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.7, .42, 2.12]} />
        <meshStandardMaterial color="#1d1c19" metalness={.8} roughness={.2} />
      </mesh>
      <MixerDisplay active={active} />
      <Crossfader active={active} />
      {[-.72, .72].flatMap((x) => Array.from({ length: 7 }, (_, index) => (
        <MeterSegment key={`${x}-${index}`} x={x} z={-.62 + index * .1} index={index} active={active} />
      )))}
      {[-.52, -.18, .18, .52].flatMap((x) => [-.55, -.25, .05].map((z) => <Knob key={`${x}-${z}`} x={x} z={z} active={active} />))}
      {[-.5, -.17, .17, .5].map((x) => (
        <group key={x}>
          <mesh position={[x, .27, .55]}>
            <boxGeometry args={[.04, .035, .7]} />
            <meshStandardMaterial color="#33302b" />
          </mesh>
          <mesh position={[x, .33, active ? .42 + x * .25 : .58]}>
            <boxGeometry args={[.14, .08, .16]} />
            <meshStandardMaterial color="#c7c0b2" metalness={.75} roughness={.18} />
          </mesh>
        </group>
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} position={[-.62 + i * .18, .27, -.82]}>
          <boxGeometry args={[.1, .03, .1]} />
          <meshStandardMaterial color={active && i % 3 === 0 ? "#d4934f" : "#322d28"} emissive={active && i % 3 === 0 ? "#a8531c" : "#000"} emissiveIntensity={3} />
        </mesh>
      ))}
      {[-.63,-.21,.21,.63].map((x,index) => (
        <group key={`channel-detail-${x}`}>
          <mesh position={[x,.275,.24]}><boxGeometry args={[.18,.028,.055]} /><meshStandardMaterial color="#625c52" metalness={.8} roughness={.2} /></mesh>
          <mesh position={[x,.31,.18]}><cylinderGeometry args={[.035,.035,.025,14]} /><meshStandardMaterial color={active ? ["#65a47f","#d6a855","#be6c69","#728eb8"][index] : "#45413b"} emissive={active ? ["#315f46","#815d20","#743331","#334f75"][index] : "#000"} emissiveIntensity={2.4} /></mesh>
        </group>
      ))}
      {[[-.76,-.92],[.76,-.92],[-.76,.92],[.76,.92]].map(([sx,sz],index) => (
        <mesh key={`mixer-screw-${index}`} position={[sx,.255,sz]} rotation={[-Math.PI / 2,0,0]}>
          <cylinderGeometry args={[.028,.028,.018,12]} />
          <meshStandardMaterial color="#b8b1a6" metalness={1} roughness={.12} />
        </mesh>
      ))}
      {[-.83,.83].map((x) => (
        <mesh key={`mixer-rail-${x}`} position={[x,.08,0]}><boxGeometry args={[.045,.28,2.05]} /><meshStandardMaterial color="#8a8378" metalness={.95} roughness={.16} /></mesh>
      ))}
    </group>
  );
}

// Retained off-scene for potential future reactivation.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Headphones() {
  return (
    <group position={[2.8, .7, -.25]} rotation={[0, -.25, .42]}>
      <mesh>
        <torusGeometry args={[.48, .065, 12, 40, Math.PI * 1.45]} />
        <meshStandardMaterial color="#151412" metalness={.85} roughness={.2} />
      </mesh>
      <mesh position={[-.38, -.25, 0]}><cylinderGeometry args={[.17, .17, .12, 24]} /><meshStandardMaterial color="#080808" /></mesh>
      <mesh position={[.38, -.25, 0]}><cylinderGeometry args={[.17, .17, .12, 24]} /><meshStandardMaterial color="#080808" /></mesh>
    </group>
  );
}

// Retained off-scene for potential future reactivation.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Character() {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.y = -1.4 + Math.sin(clock.elapsedTime * .7) * .018;
      group.current.rotation.y = -.22 + Math.sin(clock.elapsedTime * .25) * .025;
    }
    if (head.current) {
      head.current.rotation.y = Math.sin(clock.elapsedTime * .34) * .045;
      head.current.rotation.x = Math.sin(clock.elapsedTime * .27) * .012;
    }
  });
  return (
    <group ref={group} position={[4.15, -1.4, -.72]} rotation={[0, -.2, 0]} scale={.96}>
      <mesh position={[0, 2.48, -.03]} castShadow><cylinderGeometry args={[.16,.2,.34,18]} /><meshStandardMaterial color="#795743" roughness={.7} /></mesh>
      <group ref={head} position={[0, 2.92, 0]}>
        <mesh scale={[.88,1.08,.86]} castShadow><sphereGeometry args={[.42,32,32]} /><meshStandardMaterial color="#835f49" roughness={.63} /></mesh>
        {[-.38, .38].map((x) => (
          <mesh key={`ear-${x}`} position={[x,0,.015]} scale={[.55,.82,.36]}><sphereGeometry args={[.13,16,16]} /><meshStandardMaterial color="#795440" roughness={.72} /></mesh>
        ))}
        <mesh position={[0,.035,.38]} rotation={[Math.PI / 2,0,0]} scale={[.85,1,.8]}><capsuleGeometry args={[.075,.12,6,12]} /><meshStandardMaterial color="#77513e" roughness={.68} /></mesh>
        <mesh position={[0,-.23,.38]} rotation={[0,0,Math.PI / 2]}><capsuleGeometry args={[.025,.16,4,10]} /><meshStandardMaterial color="#654234" roughness={.8} /></mesh>
        <mesh position={[0,-.16,.28]} scale={[1,.62,.55]}><sphereGeometry args={[.34,24,20]} /><meshStandardMaterial color="#24201d" roughness={.9} /></mesh>
        <mesh position={[0,-.29,.4]} rotation={[0,0,Math.PI / 2]}><capsuleGeometry args={[.018,.12,4,10]} /><meshStandardMaterial color="#9a6954" roughness={.65} /></mesh>
        <mesh position={[0,.29,-.02]} scale={[1.03,.46,1.02]} castShadow><sphereGeometry args={[.4,24,20]} /><meshStandardMaterial color="#171411" roughness={.92} /></mesh>
        {[-.25,-.08,.1,.27].map((x,index) => (
          <mesh key={`hair-${x}`} position={[x,.45,-.02 + Math.abs(x) * .12]} rotation={[0,0,(index - 1.5) * -.16]} scale={[.62,1,.64]}>
            <coneGeometry args={[.13,.32,10]} />
            <meshStandardMaterial color="#171411" roughness={.92} />
          </mesh>
        ))}
        {[-.17, .17].map((x) => (
          <group key={`glasses-${x}`}>
            <mesh position={[x,.08,.365]}><boxGeometry args={[.29,.115,.035]} /><meshPhysicalMaterial color="#090909" metalness={.72} roughness={.08} transmission={.08} /></mesh>
            <mesh position={[x,.08,.388]}><boxGeometry args={[.32,.018,.018]} /><meshStandardMaterial color="#a58b69" metalness={1} roughness={.12} /></mesh>
          </group>
        ))}
        <mesh position={[0,.08,.38]}><boxGeometry args={[.09,.022,.025]} /><meshStandardMaterial color="#b69468" metalness={1} /></mesh>
      </group>
      <mesh position={[0, 1.82, 0]} scale={[1,.98,.7]} castShadow><capsuleGeometry args={[.51,1.28,8,18]} /><meshStandardMaterial color="#aaa8a5" metalness={.88} roughness={.26} /></mesh>
      <mesh position={[0, 1.86, .39]} scale={[.82,1,.28]}><capsuleGeometry args={[.35,1.1,7,16]} /><meshStandardMaterial color="#111111" roughness={.62} /></mesh>
      <mesh position={[0, 2.21, -.01]} scale={[1.36,.55,.76]} castShadow><sphereGeometry args={[.5,24,20]} /><meshStandardMaterial color="#b8b5b1" metalness={.86} roughness={.24} /></mesh>
      {[-.24,.24].map((x) => (
        <mesh key={`lapel-${x}`} position={[x,2.02,.47]} rotation={[0,x < 0 ? -.18 : .18,x < 0 ? -.22 : .22]}>
          <boxGeometry args={[.18,.86,.055]} />
          <meshStandardMaterial color="#d0cdc7" metalness={.92} roughness={.2} />
        </mesh>
      ))}
      <mesh position={[0,1.77,.48]}><boxGeometry args={[.025,1.35,.025]} /><meshStandardMaterial color="#4c4b48" metalness={.9} /></mesh>
      {[-.58,.58].map((x) => (
        <mesh key={`upper-arm-${x}`} position={[x,1.88,.02]} rotation={[0,0,x < 0 ? -.16 : .16]}>
          <capsuleGeometry args={[.15,.72,7,14]} />
          <meshStandardMaterial color="#aaa8a5" metalness={.86} roughness={.28} />
        </mesh>
      ))}
      <mesh position={[-.38,1.48,.28]} rotation={[0,0,-1.08]}><capsuleGeometry args={[.13,.62,7,14]} /><meshStandardMaterial color="#969491" metalness={.82} roughness={.3} /></mesh>
      <mesh position={[.38,1.48,.28]} rotation={[0,0,1.08]}><capsuleGeometry args={[.13,.62,7,14]} /><meshStandardMaterial color="#969491" metalness={.82} roughness={.3} /></mesh>
      <mesh position={[-.11,1.42,.52]} scale={[1.12,.82,.88]}><sphereGeometry args={[.16,20,20]} /><meshStandardMaterial color="#835f49" roughness={.66} /></mesh>
      <mesh position={[.11,1.4,.55]} scale={[1.12,.82,.88]}><sphereGeometry args={[.16,20,20]} /><meshStandardMaterial color="#835f49" roughness={.66} /></mesh>
      {[-.075,-.025,.025,.075].map((x) => (
        <mesh key={`clasped-finger-${x}`} position={[x,1.43,.68]} rotation={[0,0,.12]}><capsuleGeometry args={[.021,.17,4,8]} /><meshStandardMaterial color="#8c6650" roughness={.66} /></mesh>
      ))}
      <group position={[-.26,1.46,.34]} rotation={[Math.PI / 2,0,0]}>
        <mesh><torusGeometry args={[.145,.035,10,24]} /><meshStandardMaterial color="#1a1918" metalness={.8} roughness={.22} /></mesh>
        <mesh position={[0,0,.04]}><boxGeometry args={[.17,.2,.055]} /><meshStandardMaterial color="#252526" metalness={.72} roughness={.18} /></mesh>
      </group>
      <mesh position={[-.22,.78,0]} scale={[1,.9,.82]}><capsuleGeometry args={[.2,.65,6,12]} /><meshStandardMaterial color="#191919" roughness={.58} /></mesh>
      <mesh position={[.22,.78,0]} scale={[1,.9,.82]}><capsuleGeometry args={[.2,.65,6,12]} /><meshStandardMaterial color="#191919" roughness={.58} /></mesh>
      <mesh position={[-.22,.12,0]}><cylinderGeometry args={[.13,.16,.72,16]} /><meshStandardMaterial color="#7d5743" roughness={.7} /></mesh>
      <mesh position={[.22,.12,0]}><cylinderGeometry args={[.13,.16,.72,16]} /><meshStandardMaterial color="#7d5743" roughness={.7} /></mesh>
      <mesh position={[-.22,-.34,.15]} scale={[1.18,.48,1.75]}><sphereGeometry args={[.2,18,16]} /><meshStandardMaterial color="#171717" roughness={.48} /></mesh>
      <mesh position={[.22,-.34,.15]} scale={[1.18,.48,1.75]}><sphereGeometry args={[.2,18,16]} /><meshStandardMaterial color="#171717" roughness={.48} /></mesh>
      <mesh position={[-.22,-.43,.34]} scale={[.9,.2,1.15]}><boxGeometry args={[.42,.18,.68]} /><meshStandardMaterial color="#d1d0ca" roughness={.55} /></mesh>
      <mesh position={[.22,-.43,.34]} scale={[.9,.2,1.15]}><boxGeometry args={[.42,.18,.68]} /><meshStandardMaterial color="#d1d0ca" roughness={.55} /></mesh>
    </group>
  );
}

function Scene({ active }: { active: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const cablePoints = useMemo(() => [
    new THREE.Vector3(-.8, .3, .8), new THREE.Vector3(-.2, .1, 1.6), new THREE.Vector3(.9, -.6, 2.3), new THREE.Vector3(2.8, -.9, 1.8),
  ], []);
  const cable = useMemo(() => new THREE.CatmullRomCurve3(cablePoints), [cablePoints]);

  useFrame(({ pointer, camera, clock }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * .55, .025);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 4.15 + pointer.y * .22, .025);
    camera.lookAt(0, -.1, 0);
    if (rig.current) {
      const scrollDistance = Math.min(window.scrollY, window.innerHeight * 1.5);
      const scrollAngle = scrollDistance * .00165;
      rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, scrollAngle, .065);
      rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, Math.sin(scrollAngle) * .055, .055);
      rig.current.rotation.z = Math.sin(clock.elapsedTime * .35) * .008;
      rig.current.position.y = Math.sin(clock.elapsedTime * .42) * .045;
    }
  });

  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 11, 24]} />
      <ambientLight intensity={.42} />
      <spotLight position={[-4, 8, 5]} angle={.46} penumbra={.82} intensity={78} color="#f2eee6" castShadow />
      <spotLight position={[0, 5.5, 3.2]} angle={.38} penumbra={.95} intensity={24} color="#c69a52" />
      <spotLight position={[5, 5, -2]} angle={.5} penumbra={1} intensity={active ? 75 : 28} color="#7f4b86" />
      <pointLight position={[0, 2.5, 5]} intensity={active ? 28 : 15} color="#fff4df" />
      <pointLight position={[0, 1, 2]} intensity={active ? 26 : 9} color="#d18b43" />
      <mesh position={[0, -.7, -2.8]} scale={[15, 9, 1]} renderOrder={-1}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            void main() {
              float distanceFromCenter = length((vUv - 0.5) * vec2(1.0, 1.15));
              float glow = 1.0 - smoothstep(0.04, 0.48, distanceFromCenter);
              glow *= glow;
              gl_FragColor = vec4(0.48, 0.34, 0.15, glow * 0.045);
            }
          `}
        />
      </mesh>
      <Float speed={.65} rotationIntensity={.08} floatIntensity={.14}>
        <group ref={rig} position={[0, -.55, 0]} rotation={[0, 0, 0]}>
          <Turntable x={-2.25} active={active} />
          <Mixer active={active} />
          <Turntable x={2.25} active={active} />
          <mesh position={[0, -.26, 0]} castShadow>
            <boxGeometry args={[7.2,.18,2.55]} />
            <meshStandardMaterial color="#161511" metalness={.65} roughness={.24} />
          </mesh>
          <mesh>
            <tubeGeometry args={[cable, 36, .025, 8, false]} />
            <meshStandardMaterial color="#171411" roughness={.5} />
          </mesh>
        </group>
      </Float>
      <Sparkles count={82} scale={[14, 7, 8]} size={1.3} speed={.12} opacity={.42} color="#ffffff" />
      <Environment preset="warehouse" environmentIntensity={.32} />
      <EffectComposer multisampling={0}>
        <Bloom intensity={active ? .48 : .2} luminanceThreshold={.72} mipmapBlur />
        <Vignette eskil={false} offset={.2} darkness={.56} />
      </EffectComposer>
    </>
  );
}

export default function DeckScene({ active }: { active: boolean }) {
  return (
    <div className="deck-canvas" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 4.15, 8.15], fov: 42 }} gl={{ antialias: false, powerPreference: "high-performance" }} shadows>
        <Suspense fallback={null}><Scene active={active} /></Suspense>
      </Canvas>
    </div>
  );
}
