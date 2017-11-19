/**
 * @file        Container component
 * @author      Icemic Jia <bingfeng.web@gmail.com>
 * @copyright   2015-2017 Icemic Jia
 * @link        https://www.avgjs.org
 * @license     Apache License 2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { tools, PropTypes } from 'avg-core';
import PixiAnimation from 'class/animation';

const propTypes = {

};

const Animation = tools.componentify('Animation', {
  createNode() {
    this.node = new PixiAnimation();
  },
  mountNode(props) {
    const node = this.node;

    tools.setValue.call(node, 'frames', props.frames);
    tools.setValue.call(node, 'animationSpeed', props.speed);
    tools.setValue.call(node, 'currentFrame', props.currentFrame);
    tools.setValue.call(node, 'loop', props.loop);
    tools.setValue.call(node, 'onComplete', props.onComplete);
    tools.setValue.call(node, 'onFrameChange', props.onFrameChange);
    tools.setValue.call(node, 'onLoop', props.onLoop);
    tools.setValue.call(node, 'isPlaying', props.playing);

    tools.mountNode(node, props);

    return node;
  },
  updateNode(prevProps, props) {
    const node = this.node;

    tools.updateValue.call(node, 'frames', prevProps.frames, props.frames);
    tools.updateValue.call(node, 'animationSpeed', prevProps.speed, props.speed);
    tools.updateValue.call(node, 'currentFrame', prevProps.currentFrame, props.currentFrame);
    tools.updateValue.call(node, 'loop', prevProps.loop, props.loop);
    tools.updateValue.call(node, 'onComplete', prevProps.onComplete, props.onComplete);
    tools.updateValue.call(node, 'onFrameChange', prevProps.onFrameChange, props.onFrameChange);
    tools.updateValue.call(node, 'onLoop', prevProps.onLoop, props.onLoop);
    tools.updateValue.call(node, 'isPlaying', prevProps.playing, props.playing);
    tools.updateNode(node, prevProps, props);
  }
}, propTypes);

export default Animation;
