/**
 * Web Audio API Gothic Sound Synthesizer for "The Thirteenth Night"
 * Synthesizes eerie music box waltz, wind, owl hoots, wood knocks, door creaks, and magic chimes.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isAmbienceRunning: boolean = false;
  private bgTimer: number | null = null;
  private owlTimer: number | null = null;
  private windNode: AudioNode | null = null;
  private musicGainNode: GainNode | null = null;
  private masterGain: GainNode | null = null;

  constructor() {
    // Initialized on demand on user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.65, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.65, this.ctx.currentTime);
    }
    if (!this.isMuted && !this.isAmbienceRunning) {
      this.startAtmosphere();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Realistic wooden knock sound
   * intensity: 1 (soft), 2 (firm with resonance), 3 (loud resonant knock)
   */
  public playKnock(intensity: 1 | 2 | 3 = 1) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const noiseBuffer = this.createNoiseBuffer(0.12);
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const baseFreq = intensity === 1 ? 160 : intensity === 2 ? 185 : 220;
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Resonant wooden bandpass
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(baseFreq * 1.8, now);
    filter.Q.setValueAtTime(3.5, now);

    // Pitch sweep for wooden impact
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq * 2.2, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, now + 0.14);

    const volume = intensity === 1 ? 0.35 : intensity === 2 ? 0.55 : 0.85;
    gainNode.gain.setValueAtTime(volume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + (intensity === 3 ? 0.22 : 0.16));

    osc.connect(filter);
    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start(now);
    noiseSource.start(now);
    osc.stop(now + 0.25);
    noiseSource.stop(now + 0.25);
  }

  /**
   * Heavy gothic iron-hinged door creak
   */
  public playDoorCreak() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const duration = 1.6;

    // Sawtooth oscillator modulated by erratic LFO for realistic rusty hinge friction
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';

    const lfo = this.ctx.createOscillator();
    lfo.type = 'triangle';
    lfo.frequency.setValueAtTime(14, now);
    lfo.frequency.linearRampToValueAtTime(8, now + duration);

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(45, now);

    lfo.connect(osc.frequency);

    // Base pitch slide of creak
    osc.frequency.setValueAtTime(95, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + duration * 0.4);
    osc.frequency.exponentialRampToValueAtTime(110, now + duration * 0.85);
    osc.frequency.exponentialRampToValueAtTime(65, now + duration);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(380, now);
    filter.Q.setValueAtTime(5.0, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.2);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.9);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    lfo.start(now);
    osc.stop(now + duration + 0.1);
    lfo.stop(now + duration + 0.1);
  }

  /**
   * Magical ethereal glow sound when door opens
   */
  public playMagicReveal() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const notes = [293.66, 369.99, 440.0, 587.33, 739.99, 880.0]; // D minor mysterious chord

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      const startTime = now + idx * 0.08;
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 1.4);
    });
  }

  /**
   * Sparkling candy collection chime
   */
  public playCandyCollect() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const chimeFrequencies = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C major bright arpeggio

    chimeFrequencies.forEach((freq, index) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.06);

      const start = now + index * 0.06;
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.22, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.65);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(start);
      osc.stop(start + 0.7);
    });
  }

  /**
   * Night owl hoot sound
   */
  public playOwl() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // First hoot: "hoo"
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.linearRampToValueAtTime(490, now + 0.25);

    // Second longer hoot: "hoooo"
    osc.frequency.setValueAtTime(580, now + 0.4);
    osc.frequency.linearRampToValueAtTime(460, now + 0.85);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.08);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.28);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.46);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.1);
  }

  /**
   * Starts atmospheric background eerie waltz + wind loop
   */
  public startAtmosphere() {
    if (this.isAmbienceRunning) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isAmbienceRunning = true;
    this.musicGainNode = this.ctx.createGain();
    this.musicGainNode.gain.setValueAtTime(0.2, this.ctx.currentTime);
    this.musicGainNode.connect(this.masterGain);

    // Start background celesta / music box eerie waltz sequence
    this.scheduleMusicBoxWaltz();

    // Random owl calls every 25-45 seconds
    this.owlTimer = window.setInterval(() => {
      if (Math.random() > 0.4) {
        this.playOwl();
      }
    }, 28000);
  }

  public stopAtmosphere() {
    this.isAmbienceRunning = false;
    if (this.bgTimer) {
      window.clearTimeout(this.bgTimer);
      this.bgTimer = null;
    }
    if (this.owlTimer) {
      window.clearInterval(this.owlTimer);
      this.owlTimer = null;
    }
  }

  /**
   * Tim Burton-esque eerie gothic celesta waltz pattern
   * 3/4 time signature in D minor / A harmonic minor
   */
  private scheduleMusicBoxWaltz() {
    if (!this.isAmbienceRunning || !this.ctx || !this.musicGainNode) return;

    // Haunting 3/4 waltz notes (Burton celesta style)
    const melodyPattern = [
      // Measure 1 (D min)
      { note: 293.66, dur: 0.5, delay: 0 },
      { note: 440.0, dur: 0.35, delay: 0.5 },
      { note: 523.25, dur: 0.35, delay: 1.0 },
      // Measure 2
      { note: 587.33, dur: 0.6, delay: 1.5 },
      { note: 493.88, dur: 0.35, delay: 2.0 },
      { note: 440.0, dur: 0.35, delay: 2.5 },
      // Measure 3 (Bb / G min)
      { note: 349.23, dur: 0.5, delay: 3.0 },
      { note: 440.0, dur: 0.35, delay: 3.5 },
      { note: 466.16, dur: 0.35, delay: 4.0 },
      // Measure 4 (A7 sinister resolution)
      { note: 440.0, dur: 0.8, delay: 4.5 },
      { note: 415.3, dur: 0.35, delay: 5.2 },
      { note: 440.0, dur: 0.6, delay: 5.6 },
    ];

    const measureLength = 6.2;
    const now = this.ctx.currentTime;

    melodyPattern.forEach((item) => {
      if (!this.ctx || !this.musicGainNode) return;
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Sine wave with soft harmonic overtone for celesta bell character
      osc.type = 'sine';
      osc.frequency.setValueAtTime(item.note, now + item.delay);

      const noteTime = now + item.delay;
      noteGain.gain.setValueAtTime(0.001, noteTime);
      noteGain.gain.linearRampToValueAtTime(0.12, noteTime + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.001, noteTime + item.dur + 0.4);

      osc.connect(noteGain);
      noteGain.connect(this.musicGainNode);

      osc.start(noteTime);
      osc.stop(noteTime + item.dur + 0.5);
    });

    this.bgTimer = window.setTimeout(() => {
      this.scheduleMusicBoxWaltz();
    }, measureLength * 1000);
  }

  private createNoiseBuffer(duration: number): AudioBuffer {
    if (!this.ctx) throw new Error('Context not initialized');
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }
}

export const soundManager = new SoundManager();
