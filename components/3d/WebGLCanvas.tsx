"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Component, type ReactNode, useEffect, useState } from "react";

type Props = CanvasProps & {
  fallback?: ReactNode;
};

class CanvasErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    console.warn("WebGL canvas failed:", error.message);
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

const defaultFallback = (
  <div className="absolute inset-0 flex items-center justify-center depth-gradient">
    <p className="text-xs tracking-[0.25em] uppercase text-secondary/70">
      3D preview unavailable
    </p>
  </div>
);

export function WebGLCanvas({ fallback = defaultFallback, children, ...props }: Props) {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    setOk(supportsWebGL());
  }, []);

  if (ok === null) return fallback;
  if (!ok) return <>{fallback}</>;

  return (
    <CanvasErrorBoundary fallback={fallback}>
      <Canvas {...props}>{children}</Canvas>
    </CanvasErrorBoundary>
  );
}
