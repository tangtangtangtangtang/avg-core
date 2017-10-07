import { Node } from 'yoga-layout';
import { setStyle } from './style';

export default function wrapper(instance) {
  // class YogaWrap extends ClassFunc {

  instance._yogaID = -1;
  instance.yogaNode = Node.create();
  instance.yogaStyle = {};

  instance._isFlexLayout = true;

  const addChildWrapper = instance.addChild;

  instance.addChild = function (child) {
    addChildWrapper.call(this, child);

    if (arguments.length === 1) {
      this.addYogaChildAt(child);
    }
  };

  const addChildAtWrapper = instance.addChildAt;

  instance.addChildAt = function (child, index) {
    addChildAtWrapper.call(this, child, index);
    this.addYogaChildAt(child, index);
  };
  instance.addYogaChildAt = function (child, index = this.yogaNode.getChildCount()) {
    const yogaChildNode = child.yogaNode;

    if (yogaChildNode) {
      const yogaParentNode = yogaChildNode.getParent();

      if (yogaParentNode) {
        yogaParentNode.removeChild(yogaChildNode);
      }
      this.yogaNode.insertChild(yogaChildNode, index);
    }
  };

  const updateTransformWrapper = instance.updateTransform;

  instance.updateTransform = function (...args) {
    this.updateLayout();

    return updateTransformWrapper.call(this, ...args);
  };
  instance.updateLayout = function () {
    // if (this._transformID === this.transform._worldID &&
    //   (!this._texture || (this._texture.baseTexture.hasLoaded && this._textureID === this._texture._updateID)) &&
    //   this._yogaID === this.yogaStyle._yogaID) {
    //   return;
    // }
    // this._transformID = this.transform._worldID;
    // this._texture && (this._textureID = this._texture._updateID);
    // this._yogaID = this.yogaStyle._yogaID;
    // const now = performance.now();
    const yogaNode = this.yogaNode;
    let style;

    // auto set width and height for images
    if (this._texture) {
      const textureWidth = Math.abs(this.scale.x) * this._texture.orig.width;
      const textureHeight = Math.abs(this.scale.y) * this._texture.orig.height;

      style = {
        width: textureWidth,
        height: textureHeight,
        ...this.yogaStyle,
      };
    } else {
      style = this.yogaStyle;
    }

    setStyle(yogaNode, style);

    const yogaParentNode = yogaNode.getParent();

    yogaNode.calculateLayout();

    // const time = (performance.now() - now) << 0;
    // time && alert(time)

    // console.log(yogaNode.getComputedLayout())

    const layoutResult = yogaNode.getComputedLayout();

    let { left: x, top: y } = layoutResult;
    const { width, height } = layoutResult;

    // console.log(yogaNode.getComputedLayout().toString());
    if (yogaParentNode) {
      x -= yogaParentNode.getComputedLeft();
      y -= yogaParentNode.getComputedTop();

      this.transform.position.x = x;
      this.transform.position.y = y;
    } else {
      this.transform.position.x = x + this.position.x;
      this.transform.position.y = y + this.position.y;
    }

    if (this._texture && this._texture.baseTexture.hasLoaded) {
      this.width = width;
    }
    if (this._texture && this._texture.baseTexture.hasLoaded) {
      this.height = height;
    }
  };

  return instance;
}
