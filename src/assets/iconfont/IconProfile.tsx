/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconProfile: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M240.42633703 601.70078081m90.95001987 0l361.2472862 0q90.95001986 0 90.95001987 90.95001987l0 0q0 90.95001986-90.95001987 90.95001923l-361.2472862 1e-8q-90.95001986 0-90.95001987-90.95001924l0 0q0-90.95001986 90.95001987-90.95001987Z"
        fill='#FFB531'
      />
      <Path
        d="M618.45687559 306.0928487c-29.4657422-35.38604846-66.26397393-65.72082618-106.48403316-65.72082619h-3.69340141v0.29873082c-38.50914518 1.71091408-74.19392445 31.14949932-102.51905789 65.42209537a135.21652648 135.21652648 0 0 0-31.14949933 79.57108359 137.74216155 137.74216155 0 1 0 275.26706499 7.35964585 135.73251666 135.73251666 0 0 0-31.4210732-86.93072944z"
        fill='#FFB531'
      />
      <Path
        d="M493.17994517 242.76187095a14.3390894 14.3390894 0 0 1 17.65228788 11.08020544c5.78451902 31.74696097 17.84238964 111.42667362-2.55279203 131.8218559-18.65711063 18.65711063-91.24875068 7.84847906-120.90459464 2.47131991a13.8502568 13.8502568 0 0 1-11.48756595-15.37106909 135.51525792 135.51525792 0 0 1 29.8731027-66.67133441 174.43176359 174.43176359 0 0 1 87.41956204-63.33097775z"
        fill={getIconColor(color, 2, '#030835')}
      />
    </Svg>
  );
};

IconProfile.defaultProps = {
  size: 18,
};

IconProfile = React.memo ? React.memo(IconProfile) : IconProfile;

export default IconProfile;
