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

let IconCoin: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 912c-220.914 0-400-179.086-400-400S291.086 112 512 112s400 179.086 400 400-179.086 400-400 400z m0-90c171.208 0 310-138.792 310-310s-138.792-310-310-310-310 138.792-310 310 138.792 310 310 310z m84.852-465.564l70.712 70.712c46.862 46.862 46.862 122.84 0 169.704l-70.712 70.712c-46.862 46.862-122.84 46.862-169.704 0l-70.712-70.712c-46.862-46.862-46.862-122.84 0-169.704l70.712-70.712c46.862-46.862 122.84-46.862 169.704 0z m-63.64 63.64c-11.714-11.716-30.71-11.716-42.426 0l-70.71 70.71c-11.716 11.716-11.716 30.712 0 42.428l70.71 70.71c11.716 11.716 30.712 11.716 42.428 0l70.71-70.71c11.716-11.716 11.716-30.712 0-42.428l-70.71-70.71z"
        fill={getIconColor(color, 0, '#FFB531')}
      />
    </Svg>
  );
};

IconCoin.defaultProps = {
  size: 18,
};

IconCoin = React.memo ? React.memo(IconCoin) : IconCoin;

export default IconCoin;
