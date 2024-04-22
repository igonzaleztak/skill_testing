import React, { useState } from 'react';
import { Row, Col, Typography } from 'antd';
import Web3 from 'web3';
import { useTranslation } from 'react-i18next';


const { Paragraph } = Typography;

const Web3Wallet = () => {
  const [t, i18n] = useTranslation();
  const [accounts, setAccounts] = useState([]);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        web3.eth.getAccounts((error, accounts) => {
          if (!error) {
            setAccounts(accounts);
          } else {
            console.error('Error fetching accounts', error);
            throw error;
          }
        });
      } catch (error) {
        console.error('Failed to connect to metamask', error);
      }
    } else {
      console.log('Metamask not installed!');
    }
  }

  return (
    <Col span={22} offset={0} className="mt-8 myColor1 text-sm">
      <p className="mt-8 text-2xl font-bold">{t("Connect Wallet")}</p>
      <Row className="mt-4 myColor1 text-lg">
        <Col span={8}>
          <button className="myButton  myBule text-white text-sm w-full" onClick={connectWallet} disabled={accounts.length > 0}>{t("Connect Wallet")}</button>
        </Col>
      </Row>
      <Row className="mt-4 myColor1 text-lg">
        {accounts.length > 0 ? (
          <Paragraph copyable className="myColor1 font-bold ">{accounts[0]}</Paragraph>
        ) : (
          <Paragraph>{t("Not Connected")}</Paragraph>
        )}
      </Row>
    </Col>
  );
}

export default Web3Wallet;