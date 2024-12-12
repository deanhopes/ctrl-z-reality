// src/components/test/SceneTest.tsx
import { Canvas } from "@react-three/fiber";
import { Box } from "@react-three/drei";

export default function SceneTest() {
  return (
    <Canvas>
      <ambientLight />
      <Box>
        <meshStandardMaterial />
      </Box>
    </Canvas>
  );
}
