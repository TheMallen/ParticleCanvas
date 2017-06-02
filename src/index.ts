import './style.css';
import ParticleCanvas from './ParticleCanvas';

document.addEventListener('DOMContentLoaded', () => {
  const canvasElement = document.querySelector('.particleCanvas') as HTMLCanvasElement;

  if (!canvasElement) { throw new Error('no canvas found'); }

  const particleCanvas = new ParticleCanvas(canvasElement);

  particleCanvas
    .calculateDimensions()
    .populateParticles(50)
    .go();
});
