import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const ArrowCircleLeft = ({fill = '#d5d5d5', ...props}: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill={fill}
        d="M12 22C6.476 22 2 17.524 2 12S6.476 2 12 2s10 4.476 10 10-4.476 10-10 10Zm1.165-5.79-3.044-2.92h7.363a.965.965 0 0 0 .968-.967v-.646a.965.965 0 0 0-.968-.967H10.12l3.044-2.92c.392-.375.4-1 .017-1.383l-.444-.44a.964.964 0 0 0-1.367 0l-5.35 5.348a.964.964 0 0 0 0 1.367l5.35 5.35a.964.964 0 0 0 1.367 0l.444-.44a.969.969 0 0 0-.017-1.382Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M2 2h20v20H2z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default ArrowCircleLeft
