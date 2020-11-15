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

let IconHome: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M820.99047875 511.87640357v154.80422974a154.55703759 154.55703759 0 0 1-154.49523973 154.49523973H357.50476098a154.55703759 154.55703759 0 0 1-154.49523973-154.49523973v-154.80422974a155.05142188 155.05142188 0 0 1 49.4384768-113.39950514l175.50659203-162.52899194a123.13270593 123.13270593 0 0 1 168.09081984 0l175.50659203 162.52899194a155.05142188 155.05142188 0 0 1 49.4384768 113.39950514z"
        fill='#FFB531'
      />
      <Path
        d="M619.21969581 604.91343713a23.32878089 23.32878089 0 0 1-23.17428589 23.17428589H427.95459008a23.17428589 23.17428589 0 1 1 0-46.34857178h168.09081984a23.1433866 23.1433866 0 0 1 23.17428589 23.17428589z"
        fill={getIconColor(color, 1, '#030835')}
      />
    </Svg>
  );
};

IconHome.defaultProps = {
  size: 18,
};

IconHome = React.memo ? React.memo(IconHome) : IconHome;

export default IconHome;
