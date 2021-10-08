import { EXTRA_FIELD_TYPE, INPUT_MODE } from '@pay/ard-skellig';

const BITCOIN = {
  id: 'bitcoin',
  min: '1255594.00',
  max: '144226289.00',
  fee: {
    approximatePercent: 5.9,
  },
  processingCurrencies: ['EUR'],
  label: 'Bitcoin',
};

const ETHEREUM = {
  id: 'ethereum',
  max: '10000.00',
  min: '100.00',
  fee: {
    approximatePercent: 4,
  },
  processingCurrencies: ['EUR'],
  label: 'Ethereum',
  extraFields: [
    {
      id: 'house_number',
      placeholder: 'House number',
      is_required: false,
      regexp: '^[\\d]{1,4}$',
      regexp_error: 'Incorrect value',
      type: EXTRA_FIELD_TYPE.TEXT,
    },
  ],
};

const PERFECT_MONEY = {
  id: 'perfectmoney',
  max: '10000.00',
  min: '100.00',
  fee: {
    approximatePercent: 3.9,
  },
  processingCurrencies: ['EUR'],
  label: 'Perfect Money',
  extraFields: [
    {
      id: 'day_of_birth',
      placeholder: 'User birth date',
      regexp: '',
      regexp_error: 'Incorrect date',
      type: 'date',
    },
  ],
};

const SKRILL = {
  id: 'skrill',
  max: '10000.00',
  min: '100.00',
  label: 'Skrill',
  processingCurrencies: ['USD'],
  extraFields: [
    {
      id: 'some-selector',
      options: [
        {
          placeholder: 'F',
          value: '1',
          extraFields: [
            {
              id: 'astropay_card_cvv',
              input_mode: INPUT_MODE.NUMERIC,
              placeholder: 'Card code (CVV)',
              regexp: '^[\\d]{4,4}$',
              regexp_error: 'Code entered incorrectly',
              type: EXTRA_FIELD_TYPE.TEXT,
            },
          ],
        },
        {
          placeholder: 'Second',
          value: '2',
        },
        {
          placeholder: 'JSC Bankfor Foreign Trade of Vietnam (Vietcombank)',
          value: 'vcb',
        },
        {
          placeholder: 'Lol',
          value: 'rwrerew',
        },
        {
          placeholder: 'Kek',
          value: 'vdcvscxvfscb',
        },
        {
          placeholder: 'Pep',
          value: '123',
        },
        {
          placeholder: 'Lul',
          value: 'lolita',
        },
      ],
      placeholder: 'Choose smth',
      type: EXTRA_FIELD_TYPE.SELECT,
    },
    {
      id: 'house_number',
      placeholder: 'House number',
      is_required: false,
      processingCurrencies: ['EUR'],
      regexp: '^[\\d]{1,4}$',
      regexp_error: 'Incorrect value',
      type: EXTRA_FIELD_TYPE.TEXT,
    },
  ],
};

const TETHER = {
  id: 'tether',
  max: '3812500.00',
  min: '46257.00',
  fee: 0,
  label: 'Tether',
  processingCurrencies: ['USD'],
};

const WEBMONEY = {
  id: 'webmoney',
  max: '10000.00',
  min: '122.00',
  label: 'Web money',
  processingCurrencies: ['EUR'],
};

const NETELLER = {
  id: 'neteller',
  max: '10000.00',
  min: '100.00',
  fee: {
    approximatePercent: 4,
  },
  processingCurrencies: ['EUR'],
  label: 'Neteller',
  extraFields: [
    {
      id: 'purse',
      placeholder: 'Purse',
      type: EXTRA_FIELD_TYPE.TEXT,
    },
  ],
};

export const ps = [BITCOIN, ETHEREUM, SKRILL, PERFECT_MONEY, TETHER, WEBMONEY, NETELLER];
