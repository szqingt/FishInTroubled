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

let IconListen: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M822.345143 512.365714a310.857143 310.857143 0 0 0-620.690286 0c15.140571-11.702857 33.938286-18.651429 54.345143-18.651428 50.724571 0 91.428571 42.971429 91.428571 95.451428v174.811429c0 52.48-40.704 95.451429-91.428571 95.451428s-91.428571-42.971429-91.428571-95.451428V530.285714a347.428571 347.428571 0 0 1 694.857142 0v233.691429c0 52.48-40.704 95.451429-91.428571 95.451428s-91.428571-42.971429-91.428571-95.451428v-174.811429c0-52.48 40.704-95.451429 91.428571-95.451428 20.406857 0 39.204571 6.948571 54.345143 18.651428zM310.857143 589.165714c0-32.731429-24.795429-58.88-54.857143-58.88s-54.857143 26.148571-54.857143 58.88v174.811429c0 32.731429 24.795429 58.88 54.857143 58.88s54.857143-26.148571 54.857143-58.88v-174.811429z m512 0c0-32.731429-24.795429-58.88-54.857143-58.88s-54.857143 26.148571-54.857143 58.88v174.811429c0 32.731429 24.795429 58.88 54.857143 58.88s54.857143-26.148571 54.857143-58.88v-174.811429z"
        fill={getIconColor(color, 0, '#FFB531')}
      />
    </Svg>
  );
};

IconListen.defaultProps = {
  size: 18,
};

IconListen = React.memo ? React.memo(IconListen) : IconListen;

export default IconListen;
