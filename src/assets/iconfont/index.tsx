/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconNext from './IconNext';
import IconPrev from './IconPrev';
import IconPlay from './IconPlay';
import IconPause from './IconPause';
import IconCoin from './IconCoin';
import IconLoading from './IconLoading';
import IconComment from './IconComment';
import IconListen from './IconListen';
import IconHome from './IconHome';
import IconProfile from './IconProfile';

export type IconNames = 'icon-Next' | 'icon-Prev' | 'icon-Play' | 'icon-Pause' | 'icon-Coin' | 'icon-Loading' | 'icon-Comment' | 'icon-Listen' | 'icon-Home' | 'icon-Profile';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-Next':
      return <IconNext key="1" {...rest} />;
    case 'icon-Prev':
      return <IconPrev key="2" {...rest} />;
    case 'icon-Play':
      return <IconPlay key="3" {...rest} />;
    case 'icon-Pause':
      return <IconPause key="4" {...rest} />;
    case 'icon-Coin':
      return <IconCoin key="5" {...rest} />;
    case 'icon-Loading':
      return <IconLoading key="6" {...rest} />;
    case 'icon-Comment':
      return <IconComment key="7" {...rest} />;
    case 'icon-Listen':
      return <IconListen key="8" {...rest} />;
    case 'icon-Home':
      return <IconHome key="9" {...rest} />;
    case 'icon-Profile':
      return <IconProfile key="10" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
