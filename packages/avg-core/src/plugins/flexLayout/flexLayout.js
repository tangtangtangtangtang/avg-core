/**
 * @file        Flex Layout Plugin
 * @author      Icemic Jia <bingfeng.web@gmail.com>
 * @copyright   2017 Icemic Jia
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

// import yoga, { Node } from 'yoga-layout';
import wrapper from './wrapper';
import deepEqual from 'deep-equal';

export default class FlexLayout {
  constructor(core) {
    this.logger = core.getLogger('FlexLayout');
    core.on('mountNode', this.onMountNode);
    core.on('updateNode', this.onUpdateNode);
    // core.on('moveChild', this.onMoveChild);
    // core.on('createChild', this.onMoveChild);
    // core.on('mountChild', this.onMoveChild);
    // core.on('removeChild', this.onRemoveChild);
  }
  onMountNode(node, props) {
    if (props.flex) {
      wrapper(node);
      node.yogaStyle = mergeStyle(props.style || {});
    }
  }
  onUpdateNode(node, prevProps, props) {
    if (props.flex && node._isFlexLayout) {
      if (!deepEqual(props, prevProps)) {
        node.yogaStyle = mergeStyle(props.style || {});
      }
    } else if (props.flex) {
      wrapper(node);
      node.yogaStyle = mergeStyle(props.style || {});
    } else if (prevProps.flex) {
      this.logger.warn('[FlexLayout] Flex layout cannot be cancel dynamically.');
    }
  }
}

function mergeStyle(styleObj) {
  if (styleObj instanceof Array) {
    return Object.assign({}, ...styleObj);
  }

  return styleObj;
}
