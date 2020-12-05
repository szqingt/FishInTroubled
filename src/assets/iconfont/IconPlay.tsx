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

let IconPlay: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M256 832c-11.712 0-23.36-3.2-33.664-9.536A64.170667 64.170667 0 0 1 192 768V256c0-22.208 11.52-42.816 30.336-54.464a64.298667 64.298667 0 0 1 62.272-2.816l512 256a64.064 64.064 0 0 1 0 114.56l-512 256c-8.96 4.48-18.88 6.72-28.608 6.72z"
        fill={getIconColor(color, 0, '#FFB531')}
      />
    </Svg>
  );
};

IconPlay.defaultProps = {
  size: 18,
};

IconPlay = React.memo ? React.memo(IconPlay) : IconPlay;

export default IconPlay;
