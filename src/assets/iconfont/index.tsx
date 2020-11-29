/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconComment from './IconComment';
import IconListen from './IconListen';
import IconHome from './IconHome';
import IconProfile from './IconProfile';

export type IconNames = 'icon-Comment' | 'icon-Listen' | 'icon-Home' | 'icon-Profile';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-Comment':
      return <IconComment key="1" {...rest} />;
    case 'icon-Listen':
      return <IconListen key="2" {...rest} />;
    case 'icon-Home':
      return <IconHome key="3" {...rest} />;
    case 'icon-Profile':
      return <IconProfile key="4" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
