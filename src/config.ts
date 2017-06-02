const DEFAULT_INTERVAL = 60;

export interface ParticleCanvasSettings {
  maxParticles?: number,
  interval?: number,
}

export const DEFAULT_CANVAS_SETTINGS: ParticleCanvasSettings = {
  maxParticles: 100,
  interval: DEFAULT_INTERVAL,
};

export interface Point {
  x: number,
  y: number,
}

export interface ParticleSettings {
  interval: number,
  random: boolean,
  blink: boolean,
  timeToLive: number,
  maxRadius: number,
  maxSpeedOpacityRatio: number,
  maxSpeed: Point,
  position: Point,
  bounds: Point,
  drift: Point,
}

export interface ParticleState {
  radius: number,
  halfLife: number,
  stop: number,
  maxSpeedOpacityRatio: number,
  position: Point,
  velocity: Point,
  drift: Point,
}

export const DEFAULT_PARTICLE_SETTINGS: ParticleSettings = {
  interval: DEFAULT_INTERVAL,
  random: true,
  blink: true,
  timeToLive: 8000,
  maxRadius: 10,
  maxSpeedOpacityRatio: 1,
  maxSpeed: {
    x: 5,
    y: 5,
  },
  position: {
    x: 960,
    y: 540,
  },
  bounds: {
    x: 100,
    y: 100,
  },
  drift: {
    x: 3,
    y: 3,
  }
};
