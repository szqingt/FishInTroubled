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

let IconPrev: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M940.032 524.288c0 109.568-12.288 217.088-37.888 318.464-1.024 5.12-4.096 11.264-7.168 15.36-10.24 15.36-26.624 23.552-43.008 23.552-9.216 0-19.456-3.072-27.648-8.192l-472.064-307.2c-6.144-4.096-10.24-8.192-14.336-14.336-15.36-23.552-9.216-55.296 13.312-70.656l472.064-320.512c5.12-3.072 11.264-6.144 17.408-7.168 27.648-6.144 55.296 11.264 61.44 38.912 24.576 109.568 37.888 221.184 37.888 331.776z m-806.912 3.072c0-121.856 13.312-235.52 40.96-337.92 3.072-11.264-4.096-22.528-14.336-24.576-11.264-3.072-22.528 4.096-24.576 14.336C106.496 284.672 92.16 401.408 92.16 527.36c0 98.304 14.336 208.896 41.984 327.68 2.048 9.216 10.24 15.36 19.456 15.36 2.048 0 3.072 0 5.12-1.024 11.264-3.072 17.408-13.312 15.36-24.576-27.648-114.688-40.96-222.208-40.96-317.44z"
        fill={getIconColor(color, 0, '#FFB531')}
      />
    </Svg>
  );
};

IconPrev.defaultProps = {
  size: 18,
};

IconPrev = React.memo ? React.memo(IconPrev) : IconPrev;

export default IconPrev;
