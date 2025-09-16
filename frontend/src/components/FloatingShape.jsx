import React from 'react'
import { motion } from "framer-motion";
const FloatingShape = ({ color, size, top, left, delay, dx = "20vw", dy = "20vh" }) => (
  <motion.div
    className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
    style={{ top, left }}
    animate={{ x: [0, dx, 0], y: [0, dy, 0], rotate: [0, 360] }}
    transition={{ duration: 20, ease: "linear", repeat: Infinity, delay }}
    aria-hidden="true"
  />
);


export default FloatingShape