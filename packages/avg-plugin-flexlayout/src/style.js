import yoga from 'yoga-layout';

/* eslint-disable */

const FLEXDIRECTION = {
  'column': yoga.FLEX_DIRECTION_COLUMN,
  'column-reverse': yoga.FLEX_DIRECTION_COLUMN_REVERSE,
  'row': yoga.FLEX_DIRECTION_ROW,
  'row-reverse': yoga.FLEX_DIRECTION_ROW_REVERSE
};
const JUSTIFYCONTENT = {
  'flex-start': yoga.JUSTIFY_FLEX_START,
  'flex-end': yoga.JUSTIFY_FLEX_END,
  'center': yoga.JUSTIFY_CENTER,
  'space-between': yoga.JUSTIFY_SPACE_BETWEEN,
  'space-around': yoga.JUSTIFY_SPACE_AROUND
};
const FLEXWRAP = {
  'no-wrap': yoga.WRAP_NO_WRAP,
  'wrap': yoga.WRAP_WRAP,
  'wrap-reverse': yoga.WRAP_WRAP_REVERSE,
  // 'wrap-count': yoga.WRAP_COUNT
};
const ALIGNMENT = {
  'flex-start': yoga.ALIGN_FLEX_START,
  'flex-end': yoga.ALIGN_FLEX_END,
  'center': yoga.ALIGN_CENTER,
  'space-between': yoga.ALIGN_SPACE_BETWEEN,
  'space-around': yoga.ALIGN_SPACE_AROUND,
  'stretch': yoga.ALIGN_STRETCH,
  'auto': yoga.ALIGN_AUTO,
  'baseline': yoga.ALIGN_BASELINE,
  // 'count': yoga.ALIGN_COUNT
};
const POSITION = {
  'relative': yoga.POSITION_TYPE_RELATIVE,
  'absolute': yoga.POSITION_TYPE_ABSOLUTE
}

/* eslint-enable */

export function setStyle(node, style) {
  const {
    width, height,
    flexDirection,
    justifyContent,
    flexWrap,
    alignItems,
    alignSelf,
    alignContent,
    flex,
    flexGrow,
    flexShrink,
    flexBasis,
    position,
    left, top, right, bottom,
    // start, end,
    minWidth, maxWidth,
    minHeight, maxHeight,
    margin, marginLeft, marginTop, marginRight, marginBottom,
    padding, paddingLeft, paddingTop, paddingRight, paddingBottom,
    border, borderLeft, borderTop, borderRight, borderBottom,
    aspectRatio
  } = style;

  !isUndefined(width) && node.setWidth(width);
  !isUndefined(height) && node.setHeight(height);

  !isUndefined(flexDirection) && node.setFlexDirection(FLEXDIRECTION[flexDirection]);
  !isUndefined(justifyContent) && node.setJustifyContent(JUSTIFYCONTENT[justifyContent]);
  !isUndefined(flexWrap) && node.setFlexWrap(FLEXWRAP[flexWrap]);
  !isUndefined(alignItems) && node.setAlignItems(ALIGNMENT[alignItems]);
  !isUndefined(alignSelf) && node.setAlignSelf(ALIGNMENT[alignSelf]);
  !isUndefined(alignContent) && node.setAlignContent(ALIGNMENT[alignContent]);
  !isUndefined(flex) && node.setFlex(flex);
  !isUndefined(flexGrow) && node.setFlexGrow(flexGrow);
  !isUndefined(flexShrink) && node.setFlexShrink(flexShrink);
  !isUndefined(flexBasis) && node.setFlexBasis(flexBasis);
  !isUndefined(position) && node.setPositionType(POSITION[position]);
  !isUndefined(left) && node.setPosition(yoga.EDGE_LEFT, left);
  !isUndefined(top) && node.setPosition(yoga.EDGE_TOP, top);
  !isUndefined(right) && node.setPosition(yoga.EDGE_RIGHT, right);
  !isUndefined(bottom) && node.setPosition(yoga.EDGE_BOTTOM, bottom);
  !isUndefined(minWidth) && node.setMinWidth(minWidth);
  !isUndefined(maxWidth) && node.setMaxWidth(maxWidth);
  !isUndefined(minHeight) && node.setMinHeight(minHeight);
  !isUndefined(maxHeight) && node.setMaxHeight(maxHeight);

  !isUndefined(padding) && node.setPadding(yoga.EDGE_ALL, padding);
  !isUndefined(paddingLeft) && node.setPadding(yoga.EDGE_LEFT, paddingLeft);
  !isUndefined(paddingTop) && node.setPadding(yoga.EDGE_TOP, paddingTop);
  !isUndefined(paddingRight) && node.setPadding(yoga.EDGE_RIGHT, paddingRight);
  !isUndefined(paddingBottom) && node.setPadding(yoga.EDGE_BOTTOM, paddingBottom);

  !isUndefined(margin) && node.setMargin(yoga.EDGE_ALL, margin);
  !isUndefined(marginLeft) && node.setMargin(yoga.EDGE_LEFT, marginLeft);
  !isUndefined(marginTop) && node.setMargin(yoga.EDGE_TOP, marginTop);
  !isUndefined(marginRight) && node.setMargin(yoga.EDGE_RIGHT, marginRight);
  !isUndefined(marginBottom) && node.setMargin(yoga.EDGE_BOTTOM, marginBottom);

  !isUndefined(border) && node.setBorder(yoga.EDGE_ALL, border);
  !isUndefined(borderLeft) && node.setBorder(yoga.EDGE_LEFT, borderLeft);
  !isUndefined(borderTop) && node.setBorder(yoga.EDGE_TOP, borderTop);
  !isUndefined(borderRight) && node.setBorder(yoga.EDGE_RIGHT, borderRight);
  !isUndefined(borderBottom) && node.setBorder(yoga.EDGE_BOTTOM, borderBottom);

  !isUndefined(aspectRatio) && node.setAspectRatio(aspectRatio);

}

function isUndefined(value) {
  return value === undefined;
}
