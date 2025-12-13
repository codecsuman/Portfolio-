// import { useEffect, useRef } from "react";

// export default function CustomCursor() {
//   const dotRef = useRef(null);
//   const ringRef = useRef(null);

//   useEffect(() => {
//     // Disable on touch devices
//     if ("ontouchstart" in window) return;

//     const dot = dotRef.current;
//     const ring = ringRef.current;
//     if (!dot || !ring) return;

//     const move = (e) => {
//       const { clientX, clientY } = e;

//       dot.style.transform = `translate(${clientX}px, ${clientY}px)`;
//       ring.style.transform = `translate(${clientX}px, ${clientY}px)`;
//     };

//     const down = () => ring.classList.add("scale-75");
//     const up = () => ring.classList.remove("scale-75");

//     window.addEventListener("mousemove", move);
//     window.addEventListener("mousedown", down);
//     window.addEventListener("mouseup", up);

//     return () => {
//       window.removeEventListener("mousemove", move);
//       window.removeEventListener("mousedown", down);
//       window.removeEventListener("mouseup", up);
//     };
//   }, []);

//   return (
//     <>
//       {/* Small dot */}
//       <div
//         ref={dotRef}
//         className="
//           fixed top-0 left-0 z-[10000] pointer-events-none
//           w-2 h-2 rounded-full bg-white
//           -translate-x-1/2 -translate-y-1/2
//         "
//       />

//       {/* Soft ring */}
//       <div
//         ref={ringRef}
//         className="
//           fixed top-0 left-0 z-[9999] pointer-events-none
//           w-8 h-8 rounded-full
//           border border-white/40
//           -translate-x-1/2 -translate-y-1/2
//           transition-transform duration-200 ease-out
//         "
//       />
//     </>
//   );
//  }
import React from 'react'

const CustomCursor = () => {
  return (
    <div>
      
    </div>
  )
}

export default CustomCursor
