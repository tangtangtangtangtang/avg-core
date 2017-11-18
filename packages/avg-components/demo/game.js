import { React, Component, core, components } from 'avg-core';
import Image from '../src/lib/image';
import Container from '../src/lib/container';
import Layer from '../src/lib/layer';
import RichText from '../src/lib/richtext';
import Text from '../src/lib/text';

const { Surface } = components;

class Stage extends Component {
  static propTypes = {
    children: React.PropTypes.any
  }
  render() {
    return (
      <Surface>
        {this.props.children}
      </Surface>
    );
  }
}

export default class Game extends Component {
  render() {
    return (
      <Stage>
        <Image src='100x100.png' />
        <Container position={[120, 0]}>
          <Layer width={100} height={100} fillColor={0xffffff} fillAlpha={0.6} clip={true}>
            <Text text={'Text 测试'} position={[23, 0]} />
          </Layer>
          <RichText text={'Text 测试'} style={{ fillColor: 'white', fontSize: 26 }} layout={{ gridSize: 26 }} position={[0, 30]} />
        </Container>
      </Stage>
    );
  }
}




