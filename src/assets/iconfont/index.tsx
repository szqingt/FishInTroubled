/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconCoin from './IconCoin';
import IconLoading from './IconLoading';
import IconComment from './IconComment';
import IconListen from './IconListen';
import IconHome from './IconHome';
import IconProfile from './IconProfile';

export type IconNames = 'icon-Coin' | 'icon-Loading' | 'icon-Comment' | 'icon-Listen' | 'icon-Home' | 'icon-Profile';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-Coin':
      return <IconCoin key="1" {...rest} />;
    case 'icon-Loading':
      return <IconLoading key="2" {...rest} />;
    case 'icon-Comment':
      return <IconComment key="3" {...rest} />;
    case 'icon-Listen':
      return <IconListen key="4" {...rest} />;
    case 'icon-Home':
      return <IconHome key="5" {...rest} />;
    case 'icon-Profile':
      return <IconProfile key="6" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
