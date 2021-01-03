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

let IconNext: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M699.392 514.048c2.048 13.312-1.024 26.624-8.192 37.888-4.096 5.12-8.192 10.24-13.312 13.312l-460.8 307.2c-8.192 6.144-18.432 8.192-28.672 8.192-3.072 0-7.168 0-10.24-1.024-13.312-3.072-24.576-10.24-32.768-21.504-3.072-5.12-6.144-10.24-7.168-16.384-24.576-101.376-36.864-208.896-36.864-317.44 0-109.568 12.288-221.184 36.864-330.752 3.072-13.312 11.264-24.576 22.528-31.744 11.264-7.168 25.6-10.24 38.912-7.168 6.144 1.024 12.288 4.096 18.432 8.192L677.888 481.28c11.264 8.192 18.432 19.456 21.504 32.768z m189.44-334.848c-3.072-11.264-14.336-17.408-24.576-14.336-11.264 3.072-17.408 14.336-14.336 24.576 26.624 102.4 39.936 216.064 39.936 337.92 0 95.232-13.312 202.752-39.936 318.464-2.048 11.264 4.096 21.504 15.36 24.576h4.096c9.216 0 17.408-6.144 19.456-16.384 26.624-118.784 40.96-228.352 40.96-327.68 0-124.928-13.312-241.664-40.96-347.136z"
        fill={getIconColor(color, 0, '#FFB531')}
      />
    </Svg>
  );
};

IconNext.defaultProps = {
  size: 18,
};

IconNext = React.memo ? React.memo(IconNext) : IconNext;

export default IconNext;
