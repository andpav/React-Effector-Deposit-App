const BITCOIN = {
  id: 'bitcoin',
  min: '1255594.00',
  max: '144226289.00',
  fee: 10,
  processingCurrencies: ['EUR'],
  label: 'Bitcoin',
}

const ETHEREUM = {
  id: 'ethereum',
  max: '10000.00',
  min: '100.00',
  fee: 8,
  processingCurrencies: ['EUR'],
  label: 'Ethereum',
}

const PERFECT_MONEY = {
  id: 'perfectmoney',
  max: '10000.00',
  min: '100.00',
  fee: 2,
  processingCurrencies: ['EUR'],
  label: 'Perfect Money',
}

const SKRILL = {
  id: 'skrill',
  max: '10000.00',
  min: '100.00',
  label: 'Skrill',
  fee: 0,
  processingCurrencies: ['USD'],
}

const TETHER = {
  id: 'tether',
  max: '3812500.00',
  min: '46257.00',
  label: 'Tether',
  fee: 6,
  processingCurrencies: ['USD'],
}

const WEBMONEY = {
  id: 'webmoney',
  max: '10000.00',
  min: '122.00',
  label: 'Web money',
  fee: 5,
  processingCurrencies: ['EUR'],
}

const NETELLER = {
  id: 'neteller',
  max: '10000.00',
  min: '100.00',
  fee: 4,
  processingCurrencies: ['EUR'],
  label: 'Neteller',
}

export const ps = [BITCOIN, ETHEREUM, SKRILL, PERFECT_MONEY, TETHER, WEBMONEY, NETELLER]
