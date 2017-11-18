/**
 * @file        Layer component
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

import { core, tools, PropTypes } from 'avg-core';
import PixiLayer from 'class/layer';

const propTypes = {
  // TODO: check: rename to alpha
  // opacity: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  fillColor: PropTypes.number,
  fillAlpha: PropTypes.number,
  clip: PropTypes.bool,
};

const Layer = tools.componentify('Layer', {
  createNode() {
    this.node = new PixiLayer();
  },
  mountNode(_props) {
    // color, opacity, width, height, x, y, etc.
    const layer = this.node;
    const renderer = core.getRenderer();
    const props = {
      width: renderer.width,
      height: renderer.height,
      ..._props,
    };

    layer.setProperties(props);
    //  layer.x = props.x || 0;
    //  layer.y = props.y || 0;

    return layer;
  },
  updateNode(prevProps, _props) {
    const layer = this.node;
    const renderer = core.getRenderer();
    const props = {
      width: renderer.width,
      height: renderer.height,
      ..._props,
    };

    layer.setProperties(props);
  },
}, propTypes);

export default Layer;
