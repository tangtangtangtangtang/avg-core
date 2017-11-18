/**
 * @file        General text component
 * @author      Icemic Jia <bingfeng.web@gmail.com>
 * @copyright   2015-2016 Icemic Jia
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
import TextSprite from 'class/text';

const propTypes = {
  text: PropTypes.string
};

const Text = tools.componentify('Text', {
  createNode() {
    this.node = new TextSprite();
  },
  mountNode(props) {
    const style = {
      fill: 0xffffff,
      breakWords: true,
      fontFamily: 'sans-serif',
      fontSize: 24,
      fontStyle: 'normal',
      wordWrap: false,
      wordWrapWidth: 100,
      letterSpacing: 0,
      lineHeight: 27,
      under: false,
      shadow: 'black',
      shadowThickness: 0,
      stroke: 'black',
      strokeThickness: 0,
      ...props.style,
    };

    const node = this.node;

    tools.mountNode(node, props);
    tools.setValue.call(node, 'style', style);
    tools.setValue.call(node, 'text', props.text);

    return node;
  },
  updateNode(prevProps, props) {
    const style = {
      fill: '#ffffff',
      breakWords: true,
      fontFamily: 'sans-serif',
      fontSize: 24,
      fontStyle: 'normal',
      wordWrap: false,
      wordWrapWidth: 100,
      letterSpacing: 0,
      lineHeight: 27,
      under: false,
      dropShadow: false,
      dropShadowColor: '#000000',
      stroke: 'black',
      strokeThickness: 0,
      ...props.style,
    };

    const node = this.node;

    tools.updateNode(node, prevProps, props);
    tools.updateValue.call(node, 'style', prevProps.style, style);
    tools.updateValue.call(node, 'text', prevProps.text, props.text);
  },

}, propTypes);

export default Text;
