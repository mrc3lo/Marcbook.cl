import { site } from "../config/site.js";
export function wa(text = `Hola ${site.owner}, vengo desde ${site.domain} y necesito ayuda con mi computador.`) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
export function buildInquiryMessage({ device, problem, details }) {
  return `Hola ${site.owner}, vengo desde ${site.domain}. Tengo un ${device} y necesito ayuda: ${problem.toLowerCase()}.${details.trim() ? ` Detalle: ${details.trim()}` : ""} ¿Podemos revisar mi caso?`;
}
export function buildServiceMessage(name, system) {
  return `Hola ${site.owner}, me interesa ${name.toLowerCase()} para mi equipo ${system}. ¿Podemos revisar mi caso?`;
}
