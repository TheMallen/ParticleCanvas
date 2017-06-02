const TAU = Math.PI * 2;

import {
  DEFAULT_PARTICLE_SETTINGS,
  ParticleState,
  ParticleSettings,
} from './config';

export default class Particle {
  state: ParticleState;
  settings: ParticleSettings;

  constructor(settings: Partial<ParticleSettings>) {
    this.settings = {
      ...DEFAULT_PARTICLE_SETTINGS,
      ...settings
    };
    this.init();
  }

  init() {
    const {
      random,
      bounds,
      maxSpeed,
      maxRadius,
      timeToLive,
      position,
      drift,
      interval,
    } = this.settings;

    const radius = (maxRadius - 1) * Math.random() + 1;
    const halfLife = (timeToLive / interval) * (radius / maxRadius);

    this.setState({
      position: {
        x: random ? bounds.x * Math.random() : position.x,
        y: random ? bounds.y * Math.random() : position.y,
      },
      velocity: {
        x: generateSpeed(maxSpeed.x),
        y: generateSpeed(maxSpeed.y),
      },
      drift: {
        x: generateDrift(),
        y: generateDrift(),
      },
      stop: Math.random() * .2 + .4,
      maxSpeedOpacityRatio: Math.random() * halfLife,
      radius,
      halfLife,
    });
  }

  reset() {
    this.init();
  }

  render(context: CanvasRenderingContext2D) {
    const {
      blink,
      maxSpeedOpacityRatio: initialRatio,
    } = this.settings;

    const {
      position,
      maxSpeedOpacityRatio,
      halfLife,
      radius,
      stop,
    } = this.state;

    if(blink && (maxSpeedOpacityRatio <= 0 || maxSpeedOpacityRatio >= halfLife)) {
      this.setState({maxSpeedOpacityRatio: initialRatio *- 1});
    } else if(maxSpeedOpacityRatio >= halfLife) {
      this.reset();
    }

    const newOpacity = 1 - (maxSpeedOpacityRatio / halfLife);
    context.beginPath();
    context.arc(position.x, position.y, radius, 0, TAU, true);
    context.closePath();

    const colorRadius = radius * newOpacity;
    const gradient = context.createRadialGradient(
      position.x,
      position.y,
      0,
      position.x,
      position.y,
      (colorRadius <= 0 ? 1 : colorRadius)
    );

    gradient.addColorStop(0.0, `rgba(255,255,255,${newOpacity.toFixed(2)})`);
    gradient.addColorStop(stop, `rgba(77,101,181,${(newOpacity * .6).toFixed(2)})`);
    gradient.addColorStop(1.0, 'rgba(77,101,181,0)');

    context.fillStyle = gradient;
    context.fill();
  }

  private move() {
    const {
      velocity,
      position,
      maxSpeedOpacityRatio,
      halfLife,
    } = this.state;
    const {bounds} = this.settings;

    const newX = position.x + maxSpeedOpacityRatio / halfLife * velocity.x;
    const newY = position.y + maxSpeedOpacityRatio / halfLife * velocity.y

    const newVelocityX = (position.x > bounds.x || position.x < 0)
       ? velocity.x * -1
       : velocity.x;

    const newVelocityY = (position.y > bounds.y || position.y < 0)
       ? velocity.y * -1
       : velocity.y;

    this.setState({
      position: {
        x: newX,
        y: newY,
      },
      velocity: {
        x: newVelocityX,
        y: newVelocityY,
      },
    });
  }

  private fade() {
    this.state.maxSpeedOpacityRatio += this.settings.maxSpeedOpacityRatio;
  }

  private setState(newState: Partial<ParticleState>) {
    this.state = {...this.state, ...newState};
  }
}

function generateDrift() {
  return Math.random() * (Math.random() < .5 ? -1 : 1);
}

function generateSpeed(max: number) {
  return (Math.random() * max) * (Math.random() < .5 ? -1 : 1)
}
