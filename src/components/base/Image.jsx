/**
 * @file        General image component
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

import componentify from '../pixi/componentify';
import { mountNode, updateNode, setValue, updateValue } from '../pixi/properties';
import Sprite from 'classes/Sprite';
import PropTypes from 'prop-types';

const propTypes = {
  rectangle: PropTypes.arrayOf(PropTypes.number)
};

export const Image = componentify('Image', {
  createNode() {
    this.node = new Sprite();
  },
  mountNode(props) {
    const node = this.node;

    setValue.call(node, 'rectangle', props.rectangle);
    mountNode(node, props);

    return node;
  },
  updateNode(prevProps, props) {
    const node = this.node;

    updateValue.call(node, 'rectangle', prevProps.rectangle, props.rectangle);
    updateNode(node, prevProps, props);
  }
}, propTypes);
