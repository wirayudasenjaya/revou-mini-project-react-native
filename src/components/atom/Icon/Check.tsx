import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

const Check = ({fill = '#d5d5d5', ...props}: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={fill}
        d="m8.793 19.167-6.5-6.503a1 1 0 0 1 0-1.414l1.414-1.415a1 1 0 0 1 1.414 0l4.379 4.38 9.379-9.382a1 1 0 0 1 1.414 0l1.414 1.415a1 1 0 0 1 0 1.415l-11.5 11.504a1 1 0 0 1-1.414 0Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M2 4.54h20v14.92H2z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Check;
