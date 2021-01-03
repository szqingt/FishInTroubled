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

let IconComment: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M291.636 385.404c-30.49 0-55.207 25.633-55.207 57.266 0 31.637 24.717 57.272 55.207 57.272 30.486 0 55.203-25.635 55.203-57.272C346.839 411.038 322.122 385.404 291.636 385.404L291.636 385.404z"
        fill={getIconColor(color, 0, '#FFB531')}
      />
      <Path
        d="M512.461 385.404c-30.49 0-55.208 25.633-55.208 57.266 0 31.637 24.722 57.272 55.208 57.272 30.486 0 55.204-25.635 55.204-57.272C567.665 411.038 542.947 385.404 512.461 385.404L512.461 385.404z"
        fill={getIconColor(color, 1, '#FFB531')}
      />
      <Path
        d="M733.287 385.404c-30.492 0-55.208 25.633-55.208 57.266 0 31.637 24.716 57.272 55.208 57.272 30.486 0 55.202-25.635 55.202-57.272C788.489 411.038 763.773 385.404 733.287 385.404L733.287 385.404z"
        fill={getIconColor(color, 2, '#FFB531')}
      />
      <Path
        d="M843.697 99.077 181.221 99.077c-60.972 0-110.41 51.287-110.41 114.539l0 429.487c0 63.256 50.543 121.56 112.92 121.56l168.257 0c29.33 31.245 150.716 156.912 150.716 156.912 5.389 5.606 14.124 5.606 19.514 0 0 0 88.87-100.764 146.775-156.912l172.193 0c62.376 0 112.92-58.308 112.92-121.56L954.106 213.615C954.107 150.363 904.673 99.077 843.697 99.077zM899.451 643.298c0 31.669-26.565 64.899-57.799 64.899L672.075 708.197c-20.543 0-39.009 21.123-39.009 21.123L514 852.815 394.955 729.32c0 0-22.676-21.123-42.112-21.123L183.267 708.197c-31.235 0-57.794-33.23-57.794-64.899L125.473 213.205c0-31.677 24.751-57.353 55.28-57.353l663.411 0c30.53 0 55.287 25.676 55.287 57.353L899.451 643.298z"
        fill={getIconColor(color, 3, '#FFB531')}
      />
      <Path
        d="M898.905 643.103"
        fill={getIconColor(color, 4, '#FFB531')}
      />
    </Svg>
  );
};

IconComment.defaultProps = {
  size: 18,
};

IconComment = React.memo ? React.memo(IconComment) : IconComment;

export default IconComment;
