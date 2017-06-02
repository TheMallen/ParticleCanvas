import Particle from './Particle';
import {
  DEFAULT_CANVAS_SETTINGS,
  ParticleCanvasSettings,
  ParticleSettings,
  Point,
} from './config';

export default class ParticleCanvas {
  private settings: ParticleCanvasSettings;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private dimensions: Point = { x: 0, y: 0};
  private particles = [];

  constructor(
    canvas: HTMLCanvasElement,
    settings?: Partial<ParticleCanvasSettings>,
  ) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.settings = {...DEFAULT_CANVAS_SETTINGS, ...settings};

    this.calculateDimensions();
  }

  populateParticles(number: number, settings?: Partial<ParticleSettings>) {
    const {
      particles,
      dimensions,
      settings: {maxParticles}
    } = this;

    const particleSettings = {
      bounds: dimensions,
      ...settings,
    };

    for (let i = 0; i < number; i++) {
      if (particles.length === maxParticles) {
        console.warn('Max particles reached!');
        break;
      }
      particles.push(new Particle(particleSettings));
    }
    return this;
  }

  calculateDimensions() {
    this.dimensions.x = this.canvas.offsetHeight;
    this.dimensions.y = this.canvas.offsetWidth;
    this.canvas.width  = this.canvas.offsetHeight;
    this.canvas.height = this.canvas.offsetHeight;
    return this;
  }

  render() {
    const {
      particles,
      context,
      dimensions: {x: width, y: height},
    } = this;

    context.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.render(context);
    });
  }

  tick() {
    this.particles.forEach((particle) => {
      particle.fade();
      particle.move();
    });
  }

  go() {
    const onFrame = () => {
      this.tick();
      this.render();
      requestAnimationFrame(onFrame);
    };

    requestAnimationFrame(onFrame);
  }
}
