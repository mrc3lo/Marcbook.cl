import { Cpu, BatteryCharging, HardDrive, Sparkles, Database, Monitor } from 'lucide-react';

export const services = [
  {
    icon: Cpu,
    name: "Diagnóstico y reparación",
    text: "¿No enciende, falla o tuvo un accidente? Revisemos qué sucede y cuáles son las opciones.",
    tag: "VOLVER A CONECTAR",
    systems: ['Mac', 'Windows'],
  },
  {
    icon: BatteryCharging,
    name: "Cambio de batería",
    text: "Recupera autonomía. Evaluación de la batería y reemplazo compatible con tu equipo.",
    tag: "NUEVA ENERGÍA",
    systems: ['Mac', 'Windows'],
  },
  {
    icon: HardDrive,
    name: "Upgrade SSD",
    text: "Más velocidad para tus ideas. Revisamos la compatibilidad antes de actualizar tu almacenamiento.",
    tag: "OTRA VELOCIDAD",
    systems: ['Mac', 'Windows'],
  },
  {
    icon: Sparkles,
    name: "Mantención profunda",
    text: "Limpieza interna, cambio de pasta térmica y revisión del sistema de refrigeración.",
    tag: "RESPIRAR MEJOR",
    systems: ['Mac', 'Windows'],
  },
  {
    icon: Database,
    name: "Recuperación de datos",
    text: "Tus archivos importan. Evaluamos el disco y las posibilidades de recuperar tu información.",
    tag: "LO QUE IMPORTA",
    systems: ['Mac', 'Windows'],
  },
  {
    icon: Monitor,
    name: "Sistema y optimización",
    text: "Instalación de macOS o Windows, revisión de lentitud y limpieza de software malicioso.",
    tag: "UN NUEVO COMIENZO",
    systems: ['Mac', 'Windows'],
  },
];
