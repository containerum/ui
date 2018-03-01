const countriesConstants = [
  {
    name: 'Afghanistan',
    ISONumericalCode: '4',
    value: 'AF'
  },
  {
    name: 'Aland Islands',
    ISONumericalCode: '248',
    value: 'AX'
  },
  {
    name: 'Albania',
    ISONumericalCode: '8',
    value: 'AL'
  },
  {
    name: 'Algeria',
    ISONumericalCode: '12',
    value: 'DZ'
  },
  {
    name: 'American Samoa',
    ISONumericalCode: '16',
    value: 'AS'
  },
  {
    name: 'Andorra',
    ISONumericalCode: '20',
    value: 'AD'
  },
  {
    name: 'Angola',
    ISONumericalCode: '24',
    value: 'AO'
  },
  {
    name: 'Anguilla',
    ISONumericalCode: '660',
    value: 'AI'
  },
  {
    name: 'Antarctica',
    ISONumericalCode: '10',
    value: 'AQ'
  },
  {
    name: 'Antigua and Barbuda',
    ISONumericalCode: '28',
    value: 'AG'
  },
  {
    name: 'Argentina',
    ISONumericalCode: '32',
    value: 'AR'
  },
  {
    name: 'Armenia',
    ISONumericalCode: '51',
    value: 'AM'
  },
  {
    name: 'Aruba',
    ISONumericalCode: '533',
    value: 'AW'
  },
  {
    name: 'Australia',
    ISONumericalCode: '36',
    value: 'AU'
  },
  {
    name: 'Austria',
    ISONumericalCode: '40',
    value: 'AT'
  },
  {
    name: 'Azerbaijan',
    ISONumericalCode: '31',
    value: 'AZ'
  },
  {
    name: 'Bahamas',
    ISONumericalCode: '44',
    value: 'BS'
  },
  {
    name: 'Bahrain',
    ISONumericalCode: '48',
    value: 'BH'
  },
  {
    name: 'Bangladesh',
    ISONumericalCode: '50',
    value: 'BD'
  },
  {
    name: 'Barbados',
    ISONumericalCode: '52',
    value: 'BB'
  },
  {
    name: 'Belarus',
    ISONumericalCode: '112',
    value: 'BY'
  },
  {
    name: 'Belgium',
    ISONumericalCode: '56',
    value: 'BE'
  },
  {
    name: 'Belize',
    ISONumericalCode: '84',
    value: 'BZ'
  },
  {
    name: 'Benin',
    ISONumericalCode: '204',
    value: 'BJ'
  },
  {
    name: 'Bermuda',
    ISONumericalCode: '60',
    value: 'BM'
  },
  {
    name: 'Bhutan',
    ISONumericalCode: '64',
    value: 'BT'
  },
  {
    name: 'Bolivia',
    ISONumericalCode: '68',
    value: 'BO'
  },
  {
    name: 'Bosnia and Herzegovina',
    ISONumericalCode: '70',
    value: 'BA'
  },
  {
    name: 'Botswana',
    ISONumericalCode: '72',
    value: 'BW'
  },
  {
    name: 'Bouvet Island',
    ISONumericalCode: '74',
    value: 'BV'
  },
  {
    name: 'Brazil',
    ISONumericalCode: '76',
    value: 'BR'
  },
  {
    name: 'British Virgin Islands',
    ISONumericalCode: '92',
    value: 'VG'
  },
  {
    name: 'British Indian Ocean Territory',
    ISONumericalCode: '86',
    value: 'IO'
  },
  {
    name: 'Brunei Darussalam',
    ISONumericalCode: '96',
    value: 'BN'
  },
  {
    name: 'Bulgaria',
    ISONumericalCode: '100',
    value: 'BG'
  },
  {
    name: 'Burkina Faso',
    ISONumericalCode: '854',
    value: 'BF'
  },
  {
    name: 'Burundi',
    ISONumericalCode: '108',
    value: 'BI'
  },
  {
    name: 'Cambodia',
    ISONumericalCode: '116',
    value: 'KH'
  },
  {
    name: 'Cameroon',
    ISONumericalCode: '120',
    value: 'CM'
  },
  {
    name: 'Canada',
    ISONumericalCode: '124',
    value: 'CA'
  },
  {
    name: 'Cape Verde',
    ISONumericalCode: '132',
    value: 'CV'
  },
  {
    name: 'Cayman Islands',
    ISONumericalCode: '136',
    value: 'KY'
  },
  {
    name: 'Central African Republic',
    ISONumericalCode: '140',
    value: 'CF'
  },
  {
    name: 'Chad',
    ISONumericalCode: '148',
    value: 'TD'
  },
  {
    name: 'Chile',
    ISONumericalCode: '152',
    value: 'CL'
  },
  {
    name: 'China',
    ISONumericalCode: '156',
    value: 'CN'
  },
  {
    name: 'Hong Kong, SAR China',
    ISONumericalCode: '344',
    value: 'HK'
  },
  {
    name: 'Macao, SAR China',
    ISONumericalCode: '446',
    value: 'MO'
  },
  {
    name: 'Christmas Island',
    ISONumericalCode: '162',
    value: 'CX'
  },
  {
    name: 'Cocos (Keeling) Islands',
    ISONumericalCode: '166',
    value: 'CC'
  },
  {
    name: 'Colombia',
    ISONumericalCode: '170',
    value: 'CO'
  },
  {
    name: 'Comoros',
    ISONumericalCode: '174',
    value: 'KM'
  },
  {
    name: 'Congo (Brazzaville)',
    ISONumericalCode: '178',
    value: 'CG'
  },
  {
    name: 'Congo, (Kinshasa)',
    ISONumericalCode: '180',
    value: 'CD'
  },
  {
    name: 'Cook Islands',
    ISONumericalCode: '184',
    value: 'CK'
  },
  {
    name: 'Costa Rica',
    ISONumericalCode: '188',
    value: 'CR'
  },
  {
    name: "Cote d'Ivoire",
    ISONumericalCode: '384',
    value: 'CI'
  },
  {
    name: 'Croatia',
    ISONumericalCode: '191',
    value: 'HR'
  },
  {
    name: 'Cuba',
    ISONumericalCode: '192',
    value: 'CU'
  },
  {
    name: 'Cyprus',
    ISONumericalCode: '196',
    value: 'CY'
  },
  {
    name: 'Czech Republic',
    ISONumericalCode: '203',
    value: 'CZ'
  },
  {
    name: 'Denmark',
    ISONumericalCode: '208',
    value: 'DK'
  },
  {
    name: 'Djibouti',
    ISONumericalCode: '262',
    value: 'DJ'
  },
  {
    name: 'Dominica',
    ISONumericalCode: '212',
    value: 'DM'
  },
  {
    name: 'Dominican Republic',
    ISONumericalCode: '214',
    value: 'DO'
  },
  {
    name: 'Ecuador',
    ISONumericalCode: '218',
    value: 'EC'
  },
  {
    name: 'Egypt',
    ISONumericalCode: '818',
    value: 'EG'
  },
  {
    name: 'El Salvador',
    ISONumericalCode: '222',
    value: 'SV'
  },
  {
    name: 'Equatorial Guinea',
    ISONumericalCode: '226',
    value: 'GQ'
  },
  {
    name: 'Eritrea',
    ISONumericalCode: '232',
    value: 'ER'
  },
  {
    name: 'Estonia',
    ISONumericalCode: '233',
    value: 'EE'
  },
  {
    name: 'Ethiopia',
    ISONumericalCode: '231',
    value: 'ET'
  },
  {
    name: 'Falkland Islands (Malvinas)',
    ISONumericalCode: '238',
    value: 'FK'
  },
  {
    name: 'Faroe Islands',
    ISONumericalCode: '234',
    value: 'FO'
  },
  {
    name: 'Fiji',
    ISONumericalCode: '242',
    value: 'FJ'
  },
  {
    name: 'Finland',
    ISONumericalCode: '246',
    value: 'FI'
  },
  {
    name: 'France',
    ISONumericalCode: '250',
    value: 'FR'
  },
  {
    name: 'French Guiana',
    ISONumericalCode: '254',
    value: 'GF'
  },
  {
    name: 'French Polynesia',
    ISONumericalCode: '258',
    value: 'PF'
  },
  {
    name: 'French Southern Territories',
    ISONumericalCode: '260',
    value: 'TF'
  },
  {
    name: 'Gabon',
    ISONumericalCode: '266',
    value: 'GA'
  },
  {
    name: 'Gambia',
    ISONumericalCode: '270',
    value: 'GM'
  },
  {
    name: 'Georgia',
    ISONumericalCode: '268',
    value: 'GE'
  },
  {
    name: 'Germany',
    ISONumericalCode: '276',
    value: 'DE'
  },
  {
    name: 'Ghana',
    ISONumericalCode: '288',
    value: 'GH'
  },
  {
    name: 'Gibraltar',
    ISONumericalCode: '292',
    value: 'GI'
  },
  {
    name: 'Greece',
    ISONumericalCode: '300',
    value: 'GR'
  },
  {
    name: 'Greenland',
    ISONumericalCode: '304',
    value: 'GL'
  },
  {
    name: 'Grenada',
    ISONumericalCode: '308',
    value: 'GD'
  },
  {
    name: 'Guadeloupe',
    ISONumericalCode: '312',
    value: 'GP'
  },
  {
    name: 'Guam',
    ISONumericalCode: '316',
    value: 'GU'
  },
  {
    name: 'Guatemala',
    ISONumericalCode: '320',
    value: 'GT'
  },
  {
    name: 'Guernsey',
    ISONumericalCode: '831',
    value: 'GG'
  },
  {
    name: 'Guinea',
    ISONumericalCode: '324',
    value: 'GN'
  },
  {
    name: 'Guinea-Bissau',
    ISONumericalCode: '624',
    value: 'GW'
  },
  {
    name: 'Guyana',
    ISONumericalCode: '328',
    value: 'GY'
  },
  {
    name: 'Haiti',
    ISONumericalCode: '332',
    value: 'HT'
  },
  {
    name: 'Heard and Mcdonald Islands',
    ISONumericalCode: '334',
    value: 'HM'
  },
  {
    name: 'Holy See (Vatican City State)',
    ISONumericalCode: '336',
    value: 'VA'
  },
  {
    name: 'Honduras',
    ISONumericalCode: '340',
    value: 'HN'
  },
  {
    name: 'Hungary',
    ISONumericalCode: '348',
    value: 'HU'
  },
  {
    name: 'Iceland',
    ISONumericalCode: '352',
    value: 'IS'
  },
  {
    name: 'India',
    ISONumericalCode: '356',
    value: 'IN'
  },
  {
    name: 'Indonesia',
    ISONumericalCode: '360',
    value: 'ID'
  },
  {
    name: 'Iran, Islamic Republic of',
    ISONumericalCode: '364',
    value: 'IR'
  },
  {
    name: 'Iraq',
    ISONumericalCode: '368',
    value: 'IQ'
  },
  {
    name: 'Ireland',
    ISONumericalCode: '372',
    value: 'IE'
  },
  {
    name: 'Isle of Man',
    ISONumericalCode: '833',
    value: 'IM'
  },
  {
    name: 'Israel',
    ISONumericalCode: '376',
    value: 'IL'
  },
  {
    name: 'Italy',
    ISONumericalCode: '380',
    value: 'IT'
  },
  {
    name: 'Jamaica',
    ISONumericalCode: '388',
    value: 'JM'
  },
  {
    name: 'Japan',
    ISONumericalCode: '392',
    value: 'JP'
  },
  {
    name: 'Jersey',
    ISONumericalCode: '832',
    value: 'JE'
  },
  {
    name: 'Jordan',
    ISONumericalCode: '400',
    value: 'JO'
  },
  {
    name: 'Kazakhstan',
    ISONumericalCode: '398',
    value: 'KZ'
  },
  {
    name: 'Kenya',
    ISONumericalCode: '404',
    value: 'KE'
  },
  {
    name: 'Kiribati',
    ISONumericalCode: '296',
    value: 'KI'
  },
  {
    name: 'Korea (North)',
    ISONumericalCode: '408',
    value: 'KP'
  },
  {
    name: 'Korea (South)',
    ISONumericalCode: '410',
    value: 'KR'
  },
  {
    name: 'Kuwait',
    ISONumericalCode: '414',
    value: 'KW'
  },
  {
    name: 'Kyrgyzstan',
    ISONumericalCode: '417',
    value: 'KG'
  },
  {
    name: 'Lao PDR',
    ISONumericalCode: '418',
    value: 'LA'
  },
  {
    name: 'Latvia',
    ISONumericalCode: '428',
    value: 'LV'
  },
  {
    name: 'Lebanon',
    ISONumericalCode: '422',
    value: 'LB'
  },
  {
    name: 'Lesotho',
    ISONumericalCode: '426',
    value: 'LS'
  },
  {
    name: 'Liberia',
    ISONumericalCode: '430',
    value: 'LR'
  },
  {
    name: 'Libya',
    ISONumericalCode: '434',
    value: 'LY'
  },
  {
    name: 'Liechtenstein',
    ISONumericalCode: '438',
    value: 'LI'
  },
  {
    name: 'Lithuania',
    ISONumericalCode: '440',
    value: 'LT'
  },
  {
    name: 'Luxembourg',
    ISONumericalCode: '442',
    value: 'LU'
  },
  {
    name: 'Macedonia, Republic of',
    ISONumericalCode: '807',
    value: 'MK'
  },
  {
    name: 'Madagascar',
    ISONumericalCode: '450',
    value: 'MG'
  },
  {
    name: 'Malawi',
    ISONumericalCode: '454',
    value: 'MW'
  },
  {
    name: 'Malaysia',
    ISONumericalCode: '458',
    value: 'MY'
  },
  {
    name: 'Maldives',
    ISONumericalCode: '462',
    value: 'MV'
  },
  {
    name: 'Mali',
    ISONumericalCode: '466',
    value: 'ML'
  },
  {
    name: 'Malta',
    ISONumericalCode: '470',
    value: 'MT'
  },
  {
    name: 'Marshall Islands',
    ISONumericalCode: '584',
    value: 'MH'
  },
  {
    name: 'Martinique',
    ISONumericalCode: '474',
    value: 'MQ'
  },
  {
    name: 'Mauritania',
    ISONumericalCode: '478',
    value: 'MR'
  },
  {
    name: 'Mauritius',
    ISONumericalCode: '480',
    value: 'MU'
  },
  {
    name: 'Mayotte',
    ISONumericalCode: '175',
    value: 'YT'
  },
  {
    name: 'Mexico',
    ISONumericalCode: '484',
    value: 'MX'
  },
  {
    name: 'Micronesia, Federated States of',
    ISONumericalCode: '583',
    value: 'FM'
  },
  {
    name: 'Moldova',
    ISONumericalCode: '498',
    value: 'MD'
  },
  {
    name: 'Monaco',
    ISONumericalCode: '492',
    value: 'MC'
  },
  {
    name: 'Mongolia',
    ISONumericalCode: '496',
    value: 'MN'
  },
  {
    name: 'Montenegro',
    ISONumericalCode: '499',
    value: 'ME'
  },
  {
    name: 'Montserrat',
    ISONumericalCode: '500',
    value: 'MS'
  },
  {
    name: 'Morocco',
    ISONumericalCode: '504',
    value: 'MA'
  },
  {
    name: 'Mozambique',
    ISONumericalCode: '508',
    value: 'MZ'
  },
  {
    name: 'Myanmar',
    ISONumericalCode: '104',
    value: 'MM'
  },
  {
    name: 'Namibia',
    ISONumericalCode: '516',
    value: 'NA'
  },
  {
    name: 'Nauru',
    ISONumericalCode: '520',
    value: 'NR'
  },
  {
    name: 'Nepal',
    ISONumericalCode: '524',
    value: 'NP'
  },
  {
    name: 'Netherlands',
    ISONumericalCode: '528',
    value: 'NL'
  },
  {
    name: 'Netherlands Antilles',
    ISONumericalCode: '530',
    value: 'AN'
  },
  {
    name: 'New Caledonia',
    ISONumericalCode: '540',
    value: 'NC'
  },
  {
    name: 'New Zealand',
    ISONumericalCode: '554',
    value: 'NZ'
  },
  {
    name: 'Nicaragua',
    ISONumericalCode: '558',
    value: 'NI'
  },
  {
    name: 'Niger',
    ISONumericalCode: '562',
    value: 'NE'
  },
  {
    name: 'Nigeria',
    ISONumericalCode: '566',
    value: 'NG'
  },
  {
    name: 'Niue',
    ISONumericalCode: '570',
    value: 'NU'
  },
  {
    name: 'Norfolk Island',
    ISONumericalCode: '574',
    value: 'NF'
  },
  {
    name: 'Northern Mariana Islands',
    ISONumericalCode: '580',
    value: 'MP'
  },
  {
    name: 'Norway',
    ISONumericalCode: '578',
    value: 'NO'
  },
  {
    name: 'Oman',
    ISONumericalCode: '512',
    value: 'OM'
  },
  {
    name: 'Pakistan',
    ISONumericalCode: '586',
    value: 'PK'
  },
  {
    name: 'Palau',
    ISONumericalCode: '585',
    value: 'PW'
  },
  {
    name: 'Palestinian Territory',
    ISONumericalCode: '275',
    value: 'PS'
  },
  {
    name: 'Panama',
    ISONumericalCode: '591',
    value: 'PA'
  },
  {
    name: 'Papua New Guinea',
    ISONumericalCode: '598',
    value: 'PG'
  },
  {
    name: 'Paraguay',
    ISONumericalCode: '600',
    value: 'PY'
  },
  {
    name: 'Peru',
    ISONumericalCode: '604',
    value: 'PE'
  },
  {
    name: 'Philippines',
    ISONumericalCode: '608',
    value: 'PH'
  },
  {
    name: 'Pitcairn',
    ISONumericalCode: '612',
    value: 'PN'
  },
  {
    name: 'Poland',
    ISONumericalCode: '616',
    value: 'PL'
  },
  {
    name: 'Portugal',
    ISONumericalCode: '620',
    value: 'PT'
  },
  {
    name: 'Puerto Rico',
    ISONumericalCode: '630',
    value: 'PR'
  },
  {
    name: 'Qatar',
    ISONumericalCode: '634',
    value: 'QA'
  },
  {
    name: 'Réunion',
    ISONumericalCode: '638',
    value: 'RE'
  },
  {
    name: 'Romania',
    ISONumericalCode: '642',
    value: 'RO'
  },
  {
    name: 'Russian Federation',
    ISONumericalCode: '643',
    value: 'RU'
  },
  {
    name: 'Rwanda',
    ISONumericalCode: '646',
    value: 'RW'
  },
  {
    name: 'Saint-Barthélemy',
    ISONumericalCode: '652',
    value: 'BL'
  },
  {
    name: 'Saint Helena',
    ISONumericalCode: '654',
    value: 'SH'
  },
  {
    name: 'Saint Kitts and Nevis',
    ISONumericalCode: '659',
    value: 'KN'
  },
  {
    name: 'Saint Lucia',
    ISONumericalCode: '662',
    value: 'LC'
  },
  {
    name: 'Saint-Martin (French part)',
    ISONumericalCode: '663',
    value: 'MF'
  },
  {
    name: 'Saint Pierre and Miquelon',
    ISONumericalCode: '666',
    value: 'PM'
  },
  {
    name: 'Saint Vincent and Grenadines',
    ISONumericalCode: '670',
    value: 'VC'
  },
  {
    name: 'Samoa',
    ISONumericalCode: '882',
    value: 'WS'
  },
  {
    name: 'San Marino',
    ISONumericalCode: '674',
    value: 'SM'
  },
  {
    name: 'Sao Tome and Principe',
    ISONumericalCode: '678',
    value: 'ST'
  },
  {
    name: 'Saudi Arabia',
    ISONumericalCode: '682',
    value: 'SA'
  },
  {
    name: 'Senegal',
    ISONumericalCode: '686',
    value: 'SN'
  },
  {
    name: 'Serbia',
    ISONumericalCode: '688',
    value: 'RS'
  },
  {
    name: 'Seychelles',
    ISONumericalCode: '690',
    value: 'SC'
  },
  {
    name: 'Sierra Leone',
    ISONumericalCode: '694',
    value: 'SL'
  },
  {
    name: 'Singapore',
    ISONumericalCode: '702',
    value: 'SG'
  },
  {
    name: 'Slovakia',
    ISONumericalCode: '703',
    value: 'SK'
  },
  {
    name: 'Slovenia',
    ISONumericalCode: '705',
    value: 'SI'
  },
  {
    name: 'Solomon Islands',
    ISONumericalCode: '90',
    value: 'SB'
  },
  {
    name: 'Somalia',
    ISONumericalCode: '706',
    value: 'SO'
  },
  {
    name: 'South Africa',
    ISONumericalCode: '710',
    value: 'ZA'
  },
  {
    name: 'South Georgia and the South Sandwich Islands',
    ISONumericalCode: '239',
    value: 'GS'
  },
  {
    name: 'South Sudan',
    ISONumericalCode: '728',
    value: 'SS'
  },
  {
    name: 'Spain',
    ISONumericalCode: '724',
    value: 'ES'
  },
  {
    name: 'Sri Lanka',
    ISONumericalCode: '144',
    value: 'LK'
  },
  {
    name: 'Sudan',
    ISONumericalCode: '736',
    value: 'SD'
  },
  {
    name: 'Suriname',
    ISONumericalCode: '740',
    value: 'SR'
  },
  {
    name: 'Svalbard and Jan Mayen Islands',
    ISONumericalCode: '744',
    value: 'SJ'
  },
  {
    name: 'Swaziland',
    ISONumericalCode: '748',
    value: 'SZ'
  },
  {
    name: 'Sweden',
    ISONumericalCode: '752',
    value: 'SE'
  },
  {
    name: 'Switzerland',
    ISONumericalCode: '756',
    value: 'CH'
  },
  {
    name: 'Syrian Arab Republic (Syria)',
    ISONumericalCode: '760',
    value: 'SY'
  },
  {
    name: 'Taiwan, Republic of China',
    ISONumericalCode: '158',
    value: 'TW'
  },
  {
    name: 'Tajikistan',
    ISONumericalCode: '762',
    value: 'TJ'
  },
  {
    name: 'Tanzania, United Republic of',
    ISONumericalCode: '834',
    value: 'TZ'
  },
  {
    name: 'Thailand',
    ISONumericalCode: '764',
    value: 'TH'
  },
  {
    name: 'Timor-Leste',
    ISONumericalCode: '626',
    value: 'TL'
  },
  {
    name: 'Togo',
    ISONumericalCode: '768',
    value: 'TG'
  },
  {
    name: 'Tokelau',
    ISONumericalCode: '772',
    value: 'TK'
  },
  {
    name: 'Tonga',
    ISONumericalCode: '776',
    value: 'TO'
  },
  {
    name: 'Trinidad and Tobago',
    ISONumericalCode: '780',
    value: 'TT'
  },
  {
    name: 'Tunisia',
    ISONumericalCode: '788',
    value: 'TN'
  },
  {
    name: 'Turkey',
    ISONumericalCode: '792',
    value: 'TR'
  },
  {
    name: 'Turkmenistan',
    ISONumericalCode: '795',
    value: 'TM'
  },
  {
    name: 'Turks and Caicos Islands',
    ISONumericalCode: '796',
    value: 'TC'
  },
  {
    name: 'Tuvalu',
    ISONumericalCode: '798',
    value: 'TV'
  },
  {
    name: 'Uganda',
    ISONumericalCode: '800',
    value: 'UG'
  },
  {
    name: 'Ukraine',
    ISONumericalCode: '804',
    value: 'UA'
  },
  {
    name: 'United Arab Emirates',
    ISONumericalCode: '784',
    value: 'AE'
  },
  {
    name: 'United Kingdom',
    ISONumericalCode: '826',
    value: 'GB'
  },
  {
    name: 'United States of America',
    ISONumericalCode: '840',
    value: 'US'
  },
  {
    name: 'US Minor Outlying Islands',
    ISONumericalCode: '581',
    value: 'UM'
  },
  {
    name: 'Uruguay',
    ISONumericalCode: '858',
    value: 'UY'
  },
  {
    name: 'Uzbekistan',
    ISONumericalCode: '860',
    value: 'UZ'
  },
  {
    name: 'Vanuatu',
    ISONumericalCode: '548',
    value: 'VU'
  },
  {
    name: 'Venezuela (Bolivarian Republic)',
    ISONumericalCode: '862',
    value: 'VE'
  },
  {
    name: 'Viet Nam',
    ISONumericalCode: '704',
    value: 'VN'
  },
  {
    name: 'Virgin Islands, US',
    ISONumericalCode: '850',
    value: 'VI'
  },
  {
    name: 'Wallis and Futuna Islands',
    ISONumericalCode: '876',
    value: 'WF'
  },
  {
    name: 'Western Sahara',
    ISONumericalCode: '732',
    value: 'EH'
  },
  {
    name: 'Yemen',
    ISONumericalCode: '887',
    value: 'YE'
  },
  {
    name: 'Zambia',
    ISONumericalCode: '894',
    value: 'ZM'
  },
  {
    name: 'Zimbabwe',
    ISONumericalCode: '716',
    value: 'ZW'
  }
];

export default countriesConstants;
