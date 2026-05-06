import React, { useEffect, useRef } from 'react';

const TrippyBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');

    if (!gl) return;

    const vertexSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentSource = `
      precision highp float;
      uniform float time;
      uniform vec2 resolution;

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        float ratio = resolution.x / resolution.y;
        uv.x *= ratio;

        vec2 p = uv * 2.0 - 1.0;
        p *= 1.5;
        
        for(int n = 1; n < 6; n++) {
          float i = float(n);
          p += vec2(
            0.6 / i * sin(i * p.y + time + 0.3 * i) + 0.8, 
            0.4 / i * sin(i * p.x + time + 0.3 * i) + 1.6
          );
        }

        // Trippy color palette
        vec3 col = vec3(0.5 + 0.5 * sin(time + p.x), 
                        0.5 + 0.5 * sin(time + p.y + 2.0), 
                        0.5 + 0.5 * sin(time + p.x + p.y + 4.0));
        
        // Add solarization-like effect
        col = abs(sin(col * 3.1415 + p.y * 0.5));
        
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const createShader = (gl, type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const program = gl.createProgram();
    const vShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, 'time');
    const resolutionLocation = gl.getUniformLocation(program, 'resolution');

    const render = (now) => {
      const t = now * 0.001;
      gl.uniform1f(timeLocation, t);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(render);

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        filter: 'blur(20px) contrast(1.2)', // Soften the shader output for a more "lava lamp" feel
        opacity: 0.8
      }}
    />
  );
};

export default TrippyBackground;
