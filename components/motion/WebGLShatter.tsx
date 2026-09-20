"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/animation/register";
import { mm } from "@/lib/animation/matchMedia";
import { cn } from "@/lib/utils/cn";

registerGsap();

function subscribeMedia(onStoreChange: () => void) {
  const queries = [
    window.matchMedia(mm.motion),
    window.matchMedia("(min-width: 1024px)"),
    window.matchMedia("(hover: hover)"),
  ];
  queries.forEach((query) => query.addEventListener("change", onStoreChange));
  return () => {
    queries.forEach((query) => query.removeEventListener("change", onStoreChange));
  };
}

function webglAllowed() {
  return (
    window.matchMedia(mm.motion).matches &&
    window.matchMedia("(min-width: 1024px)").matches &&
    window.matchMedia("(hover: hover)").matches
  );
}

type Props = {
  src: string;
  className?: string;
  children: React.ReactNode;
};

export function WebGLShatter({ src, className, children }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const enabled = useSyncExternalStore(subscribeMedia, webglAllowed, () => false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    let disposed = false;
    let renderer: import("three").WebGLRenderer | undefined;
    let frame = 0;
    const frames: number[] = [];
    let last = performance.now();

    async function boot() {
      const THREE = await import("three");
      if (disposed || !canvas || !wrap) return;

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      const width = wrap.clientWidth;
      const height = wrap.clientHeight;
      renderer.setSize(width, height, false);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 20);
      camera.position.z = 2.4;

      const texture = await new THREE.TextureLoader().loadAsync(src);
      texture.colorSpace = THREE.SRGBColorSpace;
      const image = texture.image as HTMLImageElement;
      const aspect = image.width / image.height;

      const cols = 14;
      const rows = 9;
      const geometry = new THREE.PlaneGeometry(aspect * 1.7, 1.7, cols, rows);
      const offsets = new Float32Array((geometry.attributes.position.count) * 3);
      for (let i = 0; i < geometry.attributes.position.count; i += 1) {
        offsets[i * 3] = (Math.random() - 0.5) * 1.4;
        offsets[i * 3 + 1] = (Math.random() - 0.5) * 1.1;
        offsets[i * 3 + 2] = Math.random() * 0.8;
      }
      geometry.setAttribute("aOffset", new THREE.BufferAttribute(offsets, 3));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uMap: { value: texture },
          uProgress: { value: 0 },
        },
        vertexShader: `
          attribute vec3 aOffset;
          uniform float uProgress;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position + aOffset * (1.0 - uProgress);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D uMap;
          varying vec2 vUv;
          void main() {
            gl_FragColor = texture2D(uMap, vUv);
          }
        `,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const proxy = { p: 0 };
      const tween = gsap.fromTo(
        proxy,
        { p: 0 },
        {
          p: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top 85%",
            end: "center 48%",
            scrub: 0.65,
          },
          onUpdate: () => {
            material.uniforms.uProgress.value = proxy.p;
          },
        },
      );

      const onResize = () => {
        if (!renderer || !wrap) return;
        const w = wrap.clientWidth;
        const h = wrap.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      const loop = (now: number) => {
        if (disposed || !renderer) return;
        const dt = now - last;
        last = now;
        const fps = 1000 / Math.max(dt, 1);
        frames.push(fps);
        if (frames.length > 40) frames.shift();
        if (frames.length === 40) {
          const avg = frames.reduce((a, b) => a + b, 0) / frames.length;
          if (avg < 24) {
            disposed = true;
            tween.kill();
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            texture.dispose();
            canvas.style.display = "none";
            setFailed(true);
            return;
          }
        }
        renderer.render(scene, camera);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);

      cleanup = () => {
        disposed = true;
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", onResize);
        tween.kill();
        ScrollTrigger.getAll()
          .filter((st) => st.trigger === wrap)
          .forEach((st) => st.kill());
        renderer?.dispose();
        geometry.dispose();
        material.dispose();
        texture.dispose();
      };
    }

    let cleanup = () => undefined;
    boot().catch(() => {
      canvas.style.display = "none";
      setFailed(true);
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [enabled, src]);

  return (
    <div ref={wrapRef} className={cn("relative overflow-hidden", className)}>
      <div className={enabled && !failed ? "lg:opacity-0" : undefined}>{children}</div>
      {enabled && !failed ? (
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
