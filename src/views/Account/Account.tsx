import './scss/index.scss';

import * as React from 'react';
import Media from 'react-responsive';
import { RouteComponentProps, withRouter } from 'react-router';

import { AccountMenu, AccountMenuMobile } from '@components/molecules';
import { AccountTab, OrdersHistory } from '@components/views';
import { useUserDetails } from '@sdk/react';
import { smallScreen } from '@styles/constants';

import AddressBook from '../../account/AddressBook/AddressBook';
import { WalletList } from '../../account/Wallet';
import { Breadcrumbs, Loader } from '../../components';
import {
    accountUrl, addressBookUrl, baseUrl, orderHistoryUrl, paymentOptionsUrl, walletHistoryUrl,
} from '../../routes';

const returnTab: any = (path: string, userDetails, history) => {
  let tabContent = <></>;
  switch (path) {
    case accountUrl: {
      tabContent = <AccountTab />;
      break;
    }
    case addressBookUrl: {
      tabContent = <AddressBook user={userDetails} />;
      break;
    }
    case orderHistoryUrl: {
      tabContent = <OrdersHistory {...{ history }} />;
      break;
    }
    case walletHistoryUrl: {
      tabContent = <WalletList user={userDetails} history={history} />
    }
  }
  return tabContent;
};

const Account: React.FC<RouteComponentProps> = ({ history, match }) => {
  const { data: user, loading } = useUserDetails();

  const links = [
    accountUrl,
    orderHistoryUrl,
    walletHistoryUrl,
    addressBookUrl,
    paymentOptionsUrl,
  ];

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    history.push(baseUrl);
  }

  return (
    <div className="container">
      <Breadcrumbs breadcrumbs={[{ link: match.path, value: "My Account" }]} />
      <div className="account">
        <Media minWidth={smallScreen}>
          <div className="account__menu">
            <AccountMenu links={links} active={match.path} />
          </div>
        </Media>
        <Media maxWidth={smallScreen - 1}>
          <div className="account__menu_mobile">
            <AccountMenuMobile links={links} active={match.path} />
          </div>
        </Media>
        <div className="account__content">
          {returnTab(match.path, user, history)}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Account);
