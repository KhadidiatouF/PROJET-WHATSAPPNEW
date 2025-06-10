import connexionU from "../components/connexionU.js";

export default function loginPage() {
  const container = document.createElement("div");
  container.className = "flex items-center justify-center h-screen ";
  container.innerHTML = connexionU();
  return container;
}
