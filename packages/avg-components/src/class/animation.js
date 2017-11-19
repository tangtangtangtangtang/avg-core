const PIXI = require('pixi.js');
import { core } from 'avg-core';

export default class Animation extends PIXI.extras.AnimatedSprite {
  constructor() {
    super([PIXI.Texture.EMPTY]);

    // bounce animate
    this._bounce = false;
    this.originTextures = [PIXI.Texture.EMPTY];
  }
  set isPlaying(value) {
    if (value) {
      this.play();
    } else {
      this.stop();
    }
  }
  get isPlaying() {
    return this.playing;
  }
  set bounce(value) {
    this._bounce = value;
    if (value) {
      const originTextures = this.originTextures;

      this.textures = [...originTextures, ...originTextures.slice(0, originTextures.length - 1).reverse()];
    } else {
      this.textures = this.originTextures;
    }
  }
  get bounce() {
    return this._bounce;
  }
  set frames(args) {
    const [value, row = 1, col = 1, direction = 'horizontal'] = args;

    if (typeof row === 'string') {
      this.originTextures = args.map(item => core.getTexture(item));

      return;
    }

    const tex = new PIXI.Texture(core.getTexture(value));
    const textures = [];
    const loadedCallback = () => {
      const bounce = this.bounce;
      const isPlaying = this.isPlaying;
      const deltaX = tex.width / row;
      const deltaY = tex.height / col;

      if (direction === 'horizontal') {
        for (let j = 0; j < col; j++) {
          for (let i = 0; i < row; i++) {
            textures.push(new PIXI.Texture(tex, new PIXI.Rectangle(deltaX * i, deltaY * j, deltaX, deltaY)));
          }
        }
      } else {
        for (let i = 0; i < row; i++) {
          for (let j = 0; j < col; j++) {
            textures.push(new PIXI.Texture(tex, new PIXI.Rectangle(deltaX * i, deltaY * j, deltaX, deltaY)));
          }
        }
      }

      this.originTextures = textures;
      this.bounce = bounce;
      // emit play or stop
      this.isPlaying = isPlaying;
    };

    if (tex.baseTexture.hasLoaded) {
      loadedCallback();
    } else {
      tex.baseTexture.once('loaded', loadedCallback);
    }

  }
}
