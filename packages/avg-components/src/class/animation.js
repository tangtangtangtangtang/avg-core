const PIXI = require('pixi.js');
import { core } from 'avg-core';

export default class Animation extends PIXI.extras.AnimatedSprite {
  constructor() {
    super([PIXI.Texture.EMPTY]);
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
  set frames(args) {
    const [value, row = 1, col = 1, direction = 'horizontal'] = args;

    if (typeof row === 'string') {
      this.textures = args.map(item => core.getTexture(item));

      return;
    }

    const tex = new PIXI.Texture(core.getTexture(value));
    const textures = [];
    const loadedCallback = () => {
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

      this.textures = textures;
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
