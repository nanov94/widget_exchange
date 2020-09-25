import React, { Component } from 'react';
import { NavigationButtons } from '../../constants';
import { BottomNavigationAction, BottomNavigation } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import RedoOutlinedIcon from '@material-ui/icons/RedoOutlined';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';

const navigationIcons = {
  [NavigationButtons.account]: <AccountBalanceWalletOutlinedIcon />,
  [NavigationButtons.card]: <CreditCardIcon />,
  [NavigationButtons.send]: <RedoOutlinedIcon />,
  [NavigationButtons.support]: <SmsOutlinedIcon />,
  [NavigationButtons.profile]: <PersonIcon />,
}

interface BottomNavigationProps {
  navigationItems: NavigationButtons[],
  active: NavigationButtons,
  navigateAction: (item: string) => void,
}

export default class BottomNavigationComponent extends Component<BottomNavigationProps> {
  handleNavigationChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    this.props.navigateAction(newValue);
  }
  
  render() {
    return (<>
      <BottomNavigation value={this.props.active} onChange={this.handleNavigationChange}>
        {
          this.props.navigationItems.map((item: NavigationButtons) =>
            <BottomNavigationAction label={ item } value={ item.toLocaleLowerCase() } icon={ navigationIcons[item] } />
          )
        }
      </BottomNavigation>
    </>);
  }
}