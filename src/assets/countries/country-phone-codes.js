const COUNTRY_PHONE_CODES = [{
  name: 'Afghanistan', flag: '🇦🇫', code: 'AF', dial_code: '+93',
}, {
  name: 'Albanien', flag: '🇦🇱', code: 'AL', dial_code: '+355',
}, {
  name: 'Algerien', flag: '🇩🇿', code: 'DZ', dial_code: '+213',
}, {
  name: 'Amerikanisch-Samoa', flag: '🇦🇸', code: 'AS', dial_code: '+1684',
}, {
  name: 'Amerikanische Jungferninseln', flag: '🇻🇮', code: 'VI', dial_code: '+1340',
}, {
  name: 'Andorra', flag: '🇦🇩', code: 'AD', dial_code: '+376',
}, {
  name: 'Angola', flag: '🇦🇴', code: 'AO', dial_code: '+244',
}, {
  name: 'Anguilla', flag: '🇦🇮', code: 'AI', dial_code: '+1264',
}, {
  name: 'Antarktis (Sonderstatus durch Antarktisvertrag)', flag: '🇦🇶', code: 'AQ', dial_code: '+672',
}, {
  name: 'Antigua und Barbuda', flag: '🇦🇬', code: 'AG', dial_code: '+1268',
}, {
  name: 'Argentinien', flag: '🇦🇷', code: 'AR', dial_code: '+54',
}, {
  name: 'Armenien', flag: '🇦🇲', code: 'AM', dial_code: '+374',
}, {
  name: 'Aruba', flag: '🇦🇼', code: 'AW', dial_code: '+297',
}, {
  name: 'Aserbaidschan', flag: '🇦🇿', code: 'AZ', dial_code: '+994',
}, {
  name: 'Australien', flag: '🇦🇺', code: 'AU', dial_code: '+61',
}, {
  name: 'Bahamas', flag: '🇧🇸', code: 'BS', dial_code: '+1242',
}, {
  name: 'Bahrain', flag: '🇧🇭', code: 'BH', dial_code: '+973',
}, {
  name: 'Bangladesch', flag: '🇧🇩', code: 'BD', dial_code: '+880',
}, {
  name: 'Barbados', flag: '🇧🇧', code: 'BB', dial_code: '+1246',
}, {
  name: 'Belarus', flag: '🇧🇾', code: 'BY', dial_code: '+375',
}, {
  name: 'Belgien', flag: '🇧🇪', code: 'BE', dial_code: '+32',
}, {
  name: 'Belize', flag: '🇧🇿', code: 'BZ', dial_code: '+501',
}, {
  name: 'Benin', flag: '🇧🇯', code: 'BJ', dial_code: '+229',
}, {
  name: 'Bermuda', flag: '🇧🇲', code: 'BM', dial_code: '+1441',
}, {
  name: 'Bhutan', flag: '🇧🇹', code: 'BT', dial_code: '+975',
}, {
  name: 'Bolivien', flag: '🇧🇴', code: 'BO', dial_code: '+591',
}, {
  name: 'Bosnien und Herzegowina', flag: '🇧🇦', code: 'BA', dial_code: '+387',
}, {
  name: 'Botswana', flag: '🇧🇼', code: 'BW', dial_code: '+267',
}, {
  name: 'Bouvetinsel', flag: '🇧🇻', code: 'BV', dial_code: '+47',
}, {
  name: 'Brasilien', flag: '🇧🇷', code: 'BR', dial_code: '+55',
}, {
  name: 'Britische Jungferninseln', flag: '🇻🇬', code: 'VG', dial_code: '+1284',
}, {
  name: 'Britisches Territorium im Indischen Ozean', flag: '🇮🇴', code: 'IO', dial_code: '+246',
}, {
  name: 'Brunei', flag: '🇧🇳', code: 'BN', dial_code: '+673',
}, {
  name: 'Bulgarien', flag: '🇧🇬', code: 'BG', dial_code: '+359',
}, {
  name: 'Burkina Faso', flag: '🇧🇫', code: 'BF', dial_code: '+226',
}, {
  name: 'Burundi', flag: '🇧🇮', code: 'BI', dial_code: '+257',
}, {
  name: 'Chile', flag: '🇨🇱', code: 'CL', dial_code: '+56',
}, {
  name: 'Cookinseln', flag: '🇨🇰', code: 'CK', dial_code: '+682',
}, {
  name: 'Costa Rica', flag: '🇨🇷', code: 'CR', dial_code: '+506',
}, {
  name: 'Deutschland', flag: '🇩🇪', code: 'DE', dial_code: '+49',
}, {
  name: 'Dominica', flag: '🇩🇲', code: 'DM', dial_code: '+1767',
}, {
  name: 'Dominikanische Republik', flag: '🇩🇴', code: 'DO', dial_code: '+1849',
}, {
  name: 'Dschibuti', flag: '🇩🇯', code: 'DJ', dial_code: '+253',
}, {
  name: 'Dänemark', flag: '🇩🇰', code: 'DK', dial_code: '+45',
}, {
  name: 'Ecuador', flag: '🇪🇨', code: 'EC', dial_code: '+593',
}, {
  name: 'El Salvador', flag: '🇸🇻', code: 'SV', dial_code: '+503',
}, {
  name: 'Elfenbeinküste', flag: '🇨🇮', code: 'CI', dial_code: '+225',
}, {
  name: 'Eritrea', flag: '🇪🇷', code: 'ER', dial_code: '+291',
}, {
  name: 'Estland', flag: '🇪🇪', code: 'EE', dial_code: '+372',
}, {
  name: 'Eswatini', flag: '🇸🇿', code: 'SZ', dial_code: '+268',
}, {
  name: 'Falklandinseln', flag: '🇫🇰', code: 'FK', dial_code: '+500',
}, {
  name: 'Fidschi', flag: '🇫🇯', code: 'FJ', dial_code: '+679',
}, {
  name: 'Finnland', flag: '🇫🇮', code: 'FI', dial_code: '+358',
}, {
  name: 'Frankreich', flag: '🇫🇷', code: 'FR', dial_code: '+33',
}, {
  name: 'Französisch-Guayana', flag: '🇬🇫', code: 'GF', dial_code: '+594',
}, {
  name: 'Französisch-Polynesien', flag: '🇵🇫', code: 'PF', dial_code: '+689',
}, {
  name: 'Französische Süd- und Antarktisgebiete', flag: '🇹🇫', code: 'TF', dial_code: '+262',
}, {
  name: 'Färöer', flag: '🇫🇴', code: 'FO', dial_code: '+298',
}, {
  name: 'Gabun', flag: '🇬🇦', code: 'GA', dial_code: '+241',
}, {
  name: 'Gambia', flag: '🇬🇲', code: 'GM', dial_code: '+220',
}, {
  name: 'Georgien', flag: '🇬🇪', code: 'GE', dial_code: '+995',
}, {
  name: 'Ghana', flag: '🇬🇭', code: 'GH', dial_code: '+233',
}, {
  name: 'Gibraltar', flag: '🇬🇮', code: 'GI', dial_code: '+350',
}, {
  name: 'Grenada', flag: '🇬🇩', code: 'GD', dial_code: '+1473',
}, {
  name: 'Griechenland', flag: '🇬🇷', code: 'GR', dial_code: '+30',
}, {
  name: 'Grönland', flag: '🇬🇱', code: 'GL', dial_code: '+299',
}, {
  name: 'Guadeloupe', flag: '🇬🇵', code: 'GP', dial_code: '+590',
}, {
  name: 'Guam', flag: '🇬🇺', code: 'GU', dial_code: '+1671',
}, {
  name: 'Guatemala', flag: '🇬🇹', code: 'GT', dial_code: '+502',
}, {
  name: 'Guernsey (Kanalinsel)', flag: '🇬🇬', code: 'GG', dial_code: '+44',
}, {
  name: 'Guinea', flag: '🇬🇳', code: 'GN', dial_code: '+224',
}, {
  name: 'Guinea-Bissau', flag: '🇬🇼', code: 'GW', dial_code: '+245',
}, {
  name: 'Guyana', flag: '🇬🇾', code: 'GY', dial_code: '+592',
}, {
  name: 'Haiti', flag: '🇭🇹', code: 'HT', dial_code: '+509',
}, {
  name: 'Heard und McDonaldinseln', flag: '🇭🇲', code: 'HM', dial_code: '+672',
}, {
  name: 'Honduras', flag: '🇭🇳', code: 'HN', dial_code: '+504',
}, {
  name: 'Hongkong', flag: '🇭🇰', code: 'HK', dial_code: '+852',
}, {
  name: 'Indien', flag: '🇮🇳', code: 'IN', dial_code: '+91',
}, {
  name: 'Indonesien', flag: '🇮🇩', code: 'ID', dial_code: '+62',
}, {
  name: 'Insel Man', flag: '🇮🇲', code: 'IM', dial_code: '+44',
}, {
  name: 'Irak', flag: '🇮🇶', code: 'IQ', dial_code: '+964',
}, {
  name: 'Iran', flag: '🇮🇷', code: 'IR', dial_code: '+98',
}, {
  name: 'Irland', flag: '🇮🇪', code: 'IE', dial_code: '+353',
}, {
  name: 'Island', flag: '🇮🇸', code: 'IS', dial_code: '+354',
}, {
  name: 'Israel', flag: '🇮🇱', code: 'IL', dial_code: '+972',
}, {
  name: 'Italien', flag: '🇮🇹', code: 'IT', dial_code: '+39',
}, {
  name: 'Jamaika', flag: '🇯🇲', code: 'JM', dial_code: '+1876',
}, {
  name: 'Japan', flag: '🇯🇵', code: 'JP', dial_code: '+81',
}, {
  name: 'Jemen', flag: '🇾🇪', code: 'YE', dial_code: '+967',
}, {
  name: 'Jersey (Kanalinsel)', flag: '🇯🇪', code: 'JE', dial_code: '+44',
}, {
  name: 'Jordanien', flag: '🇯🇴', code: 'JO', dial_code: '+962',
}, {
  name: 'Kaimaninseln', flag: '🇰🇾', code: 'KY', dial_code: '+345',
}, {
  name: 'Kambodscha', flag: '🇰🇭', code: 'KH', dial_code: '+855',
}, {
  name: 'Kamerun', flag: '🇨🇲', code: 'CM', dial_code: '+237',
}, {
  name: 'Kanada', flag: '🇨🇦', code: 'CA', dial_code: '+1',
}, {
  name: 'Kap Verde', flag: '🇨🇻', code: 'CV', dial_code: '+238',
}, {
  name: 'Kasachstan', flag: '🇰🇿', code: 'KZ', dial_code: '+7',
}, {
  name: 'Katar', flag: '🇶🇦', code: 'QA', dial_code: '+974',
}, {
  name: 'Kenia', flag: '🇰🇪', code: 'KE', dial_code: '+254',
}, {
  name: 'Kirgisistan', flag: '🇰🇬', code: 'KG', dial_code: '+996',
}, {
  name: 'Kiribati', flag: '🇰🇮', code: 'KI', dial_code: '+686',
}, {
  name: 'Kokosinseln', flag: '🇨🇨', code: 'CC', dial_code: '+61',
}, {
  name: 'Kolumbien', flag: '🇨🇴', code: 'CO', dial_code: '+57',
}, {
  name: 'Komoren', flag: '🇰🇲', code: 'KM', dial_code: '+269',
}, {
  name: 'Kongo, Demokratische Republik', flag: '🇨🇩', code: 'CD', dial_code: '+243',
}, {
  name: 'Kongo, Republik', flag: '🇨🇬', code: 'CG', dial_code: '+242',
}, {
  name: 'Korea, Nord', flag: '🇰🇵', code: 'KP', dial_code: '+850',
}, {
  name: 'Korea, Süd', flag: '🇰🇷', code: 'KR', dial_code: '+82',
}, {
  name: 'Kosovo', flag: '🇽🇰', code: 'XK', dial_code: '+383',
}, {
  name: 'Kroatien', flag: '🇭🇷', code: 'HR', dial_code: '+385',
}, {
  name: 'Kuba', flag: '🇨🇺', code: 'CU', dial_code: '+53',
}, {
  name: 'Kuwait', flag: '🇰🇼', code: 'KW', dial_code: '+965',
}, {
  name: 'Laos', flag: '🇱🇦', code: 'LA', dial_code: '+856',
}, {
  name: 'Lesotho', flag: '🇱🇸', code: 'LS', dial_code: '+266',
}, {
  name: 'Lettland', flag: '🇱🇻', code: 'LV', dial_code: '+371',
}, {
  name: 'Libanon', flag: '🇱🇧', code: 'LB', dial_code: '+961',
}, {
  name: 'Liberia', flag: '🇱🇷', code: 'LR', dial_code: '+231',
}, {
  name: 'Libyen', flag: '🇱🇾', code: 'LY', dial_code: '+218',
}, {
  name: 'Liechtenstein', flag: '🇱🇮', code: 'LI', dial_code: '+423',
}, {
  name: 'Litauen', flag: '🇱🇹', code: 'LT', dial_code: '+370',
}, {
  name: 'Luxemburg', flag: '🇱🇺', code: 'LU', dial_code: '+352',
}, {
  name: 'Macau', flag: '🇲🇴', code: 'MO', dial_code: '+853',
}, {
  name: 'Madagaskar', flag: '🇲🇬', code: 'MG', dial_code: '+261',
}, {
  name: 'Malawi', flag: '🇲🇼', code: 'MW', dial_code: '+265',
}, {
  name: 'Malaysia', flag: '🇲🇾', code: 'MY', dial_code: '+60',
}, {
  name: 'Malediven', flag: '🇲🇻', code: 'MV', dial_code: '+960',
}, {
  name: 'Mali', flag: '🇲🇱', code: 'ML', dial_code: '+223',
}, {
  name: 'Malta', flag: '🇲🇹', code: 'MT', dial_code: '+356',
}, {
  name: 'Marokko', flag: '🇲🇦', code: 'MA', dial_code: '+212',
}, {
  name: 'Marshallinseln', flag: '🇲🇭', code: 'MH', dial_code: '+692',
}, {
  name: 'Martinique', flag: '🇲🇶', code: 'MQ', dial_code: '+596',
}, {
  name: 'Mauretanien', flag: '🇲🇷', code: 'MR', dial_code: '+222',
}, {
  name: 'Mauritius', flag: '🇲🇺', code: 'MU', dial_code: '+230',
}, {
  name: 'Mayotte', flag: '🇾🇹', code: 'YT', dial_code: '+262',
}, {
  name: 'Mexiko', flag: '🇲🇽', code: 'MX', dial_code: '+52',
}, {
  name: 'Mikronesien', flag: '🇫🇲', code: 'FM', dial_code: '+691',
}, {
  name: 'Moldau', flag: '🇲🇩', code: 'MD', dial_code: '+373',
}, {
  name: 'Monaco', flag: '🇲🇨', code: 'MC', dial_code: '+377',
}, {
  name: 'Mongolei', flag: '🇲🇳', code: 'MN', dial_code: '+976',
}, {
  name: 'Montenegro', flag: '🇲🇪', code: 'ME', dial_code: '+382',
}, {
  name: 'Montserrat', flag: '🇲🇸', code: 'MS', dial_code: '+1664',
}, {
  name: 'Mosambik', flag: '🇲🇿', code: 'MZ', dial_code: '+258',
}, {
  name: 'Myanmar', flag: '🇲🇲', code: 'MM', dial_code: '+95',
}, {
  name: 'Namibia', flag: '🇳🇦', code: 'NA', dial_code: '+264',
}, {
  name: 'Nauru', flag: '🇳🇷', code: 'NR', dial_code: '+674',
}, {
  name: 'Nepal', flag: '🇳🇵', code: 'NP', dial_code: '+977',
}, {
  name: 'Netherlands Antilles', flag: '', code: 'AN', dial_code: '+599',
}, {
  name: 'Neukaledonien', flag: '🇳🇨', code: 'NC', dial_code: '+687',
}, {
  name: 'Neuseeland', flag: '🇳🇿', code: 'NZ', dial_code: '+64',
}, {
  name: 'Nicaragua', flag: '🇳🇮', code: 'NI', dial_code: '+505',
}, {
  name: 'Niederlande', flag: '🇳🇱', code: 'NL', dial_code: '+31',
}, {
  name: 'Niger', flag: '🇳🇪', code: 'NE', dial_code: '+227',
}, {
  name: 'Nigeria', flag: '🇳🇬', code: 'NG', dial_code: '+234',
}, {
  name: 'Niue', flag: '🇳🇺', code: 'NU', dial_code: '+683',
}, {
  name: 'Nordmazedonien', flag: '🇲🇰', code: 'MK', dial_code: '+389',
}, {
  name: 'Norfolkinsel', flag: '🇳🇫', code: 'NF', dial_code: '+672',
}, {
  name: 'Norwegen', flag: '🇳🇴', code: 'NO', dial_code: '+47',
}, {
  name: 'Nördliche Marianen', flag: '🇲🇵', code: 'MP', dial_code: '+1670',
}, {
  name: 'Oman', flag: '🇴🇲', code: 'OM', dial_code: '+968',
}, {
  name: 'Osttimor', flag: '🇹🇱', code: 'TL', dial_code: '+670',
}, {
  name: 'Pakistan', flag: '🇵🇰', code: 'PK', dial_code: '+92',
}, {
  name: 'Palau', flag: '🇵🇼', code: 'PW', dial_code: '+680',
}, {
  name: 'Palästina', flag: '🇵🇸', code: 'PS', dial_code: '+970',
}, {
  name: 'Panama', flag: '🇵🇦', code: 'PA', dial_code: '+507',
}, {
  name: 'Papua-Neuguinea', flag: '🇵🇬', code: 'PG', dial_code: '+675',
}, {
  name: 'Paraguay', flag: '🇵🇾', code: 'PY', dial_code: '+595',
}, {
  name: 'Peru', flag: '🇵🇪', code: 'PE', dial_code: '+51',
}, {
  name: 'Philippinen', flag: '🇵🇭', code: 'PH', dial_code: '+63',
}, {
  name: 'Pitcairninseln', flag: '🇵🇳', code: 'PN', dial_code: '+64',
}, {
  name: 'Polen', flag: '🇵🇱', code: 'PL', dial_code: '+48',
}, {
  name: 'Portugal', flag: '🇵🇹', code: 'PT', dial_code: '+351',
}, {
  name: 'Puerto Rico', flag: '🇵🇷', code: 'PR', dial_code: '+1939',
}, {
  name: 'Republik China', flag: '🇹🇼', code: 'TW', dial_code: '+886',
}, {
  name: 'Ruanda', flag: '🇷🇼', code: 'RW', dial_code: '+250',
}, {
  name: 'Rumänien', flag: '🇷🇴', code: 'RO', dial_code: '+40',
}, {
  name: 'Russland', flag: '🇷🇺', code: 'RU', dial_code: '+7',
}, {
  name: 'Réunion', flag: '🇷🇪', code: 'RE', dial_code: '+262',
}, {
  name: 'Saint-Barthélemy', flag: '🇧🇱', code: 'BL', dial_code: '+590',
}, {
  name: 'Saint-Martin (französischer Teil)', flag: '🇲🇫', code: 'MF', dial_code: '+590',
}, {
  name: 'Saint-Pierre und Miquelon', flag: '🇵🇲', code: 'PM', dial_code: '+508',
}, {
  name: 'Salomonen', flag: '🇸🇧', code: 'SB', dial_code: '+677',
}, {
  name: 'Sambia', flag: '🇿🇲', code: 'ZM', dial_code: '+260',
}, {
  name: 'Samoa', flag: '🇼🇸', code: 'WS', dial_code: '+685',
}, {
  name: 'San Marino', flag: '🇸🇲', code: 'SM', dial_code: '+378',
}, {
  name: 'Saudi-Arabien', flag: '🇸🇦', code: 'SA', dial_code: '+966',
}, {
  name: 'Schweden', flag: '🇸🇪', code: 'SE', dial_code: '+46',
}, {
  name: 'Schweiz', flag: '🇨🇭', code: 'CH', dial_code: '+41',
}, {
  name: 'Senegal', flag: '🇸🇳', code: 'SN', dial_code: '+221',
}, {
  name: 'Serbien', flag: '🇷🇸', code: 'RS', dial_code: '+381',
}, {
  name: 'Seychellen', flag: '🇸🇨', code: 'SC', dial_code: '+248',
}, {
  name: 'Sierra Leone', flag: '🇸🇱', code: 'SL', dial_code: '+232',
}, {
  name: 'Simbabwe', flag: '🇿🇼', code: 'ZW', dial_code: '+263',
}, {
  name: 'Singapur', flag: '🇸🇬', code: 'SG', dial_code: '+65',
}, {
  name: 'Slowakei', flag: '🇸🇰', code: 'SK', dial_code: '+421',
}, {
  name: 'Slowenien', flag: '🇸🇮', code: 'SI', dial_code: '+386',
}, {
  name: 'Somalia', flag: '🇸🇴', code: 'SO', dial_code: '+252',
}, {
  name: 'Spanien', flag: '🇪🇸', code: 'ES', dial_code: '+34',
}, {
  name: 'Spitzbergen und Jan Mayen', flag: '🇸🇯', code: 'SJ', dial_code: '+47',
}, {
  name: 'Sri Lanka', flag: '🇱🇰', code: 'LK', dial_code: '+94',
}, {
  name: 'St. Helena, Ascension und Tristan da Cunha', flag: '🇸🇭', code: 'SH', dial_code: '+290',
}, {
  name: 'St. Kitts und Nevis', flag: '🇰🇳', code: 'KN', dial_code: '+1869',
}, {
  name: 'St. Lucia', flag: '🇱🇨', code: 'LC', dial_code: '+1758',
}, {
  name: 'St. Vincent und die Grenadinen', flag: '🇻🇨', code: 'VC', dial_code: '+1784',
}, {
  name: 'Sudan', flag: '🇸🇩', code: 'SD', dial_code: '+249',
}, {
  name: 'Suriname', flag: '🇸🇷', code: 'SR', dial_code: '+597',
}, {
  name: 'Syrien', flag: '🇸🇾', code: 'SY', dial_code: '+963',
}, {
  name: 'São Tomé und Príncipe', flag: '🇸🇹', code: 'ST', dial_code: '+239',
}, {
  name: 'Südafrika', flag: '🇿🇦', code: 'ZA', dial_code: '+27',
}, {
  name: 'Südgeorgien und die Südlichen Sandwichinseln', flag: '🇬🇸', code: 'GS', dial_code: '+500',
}, {
  name: 'Südsudan', flag: '🇸🇸', code: 'SS', dial_code: '+211',
}, {
  name: 'Tadschikistan', flag: '🇹🇯', code: 'TJ', dial_code: '+992',
}, {
  name: 'Tansania', flag: '🇹🇿', code: 'TZ', dial_code: '+255',
}, {
  name: 'Thailand', flag: '🇹🇭', code: 'TH', dial_code: '+66',
}, {
  name: 'Togo', flag: '🇹🇬', code: 'TG', dial_code: '+228',
}, {
  name: 'Tokelau', flag: '🇹🇰', code: 'TK', dial_code: '+690',
}, {
  name: 'Tonga', flag: '🇹🇴', code: 'TO', dial_code: '+676',
}, {
  name: 'Trinidad und Tobago', flag: '🇹🇹', code: 'TT', dial_code: '+1868',
}, {
  name: 'Tschad', flag: '🇹🇩', code: 'TD', dial_code: '+235',
}, {
  name: 'Tschechien', flag: '🇨🇿', code: 'CZ', dial_code: '+420',
}, {
  name: 'Tunesien', flag: '🇹🇳', code: 'TN', dial_code: '+216',
}, {
  name: 'Turkmenistan', flag: '🇹🇲', code: 'TM', dial_code: '+993',
}, {
  name: 'Turks- und Caicosinseln', flag: '🇹🇨', code: 'TC', dial_code: '+1649',
}, {
  name: 'Tuvalu', flag: '🇹🇻', code: 'TV', dial_code: '+688',
}, {
  name: 'Türkei', flag: '🇹🇷', code: 'TR', dial_code: '+90',
}, {
  name: 'Uganda', flag: '🇺🇬', code: 'UG', dial_code: '+256',
}, {
  name: 'Ukraine', flag: '🇺🇦', code: 'UA', dial_code: '+380',
}, {
  name: 'Ungarn', flag: '🇭🇺', code: 'HU', dial_code: '+36',
}, {
  name: 'Uruguay', flag: '🇺🇾', code: 'UY', dial_code: '+598',
}, {
  name: 'Usbekistan', flag: '🇺🇿', code: 'UZ', dial_code: '+998',
}, {
  name: 'Vanuatu', flag: '🇻🇺', code: 'VU', dial_code: '+678',
}, {
  name: 'Vatikanstadt', flag: '🇻🇦', code: 'VA', dial_code: '+379',
}, {
  name: 'Venezuela', flag: '🇻🇪', code: 'VE', dial_code: '+58',
}, {
  name: 'Vereinigte Arabische Emirate', flag: '🇦🇪', code: 'AE', dial_code: '+971',
}, {
  name: 'Vereinigte Staaten', flag: '🇺🇸', code: 'US', dial_code: '+1',
}, {
  name: 'Vereinigtes Königreich', flag: '🇬🇧', code: 'GB', dial_code: '+44',
}, {
  name: 'Vietnam', flag: '🇻🇳', code: 'VN', dial_code: '+84',
}, {
  name: 'Volksrepublik China', flag: '🇨🇳', code: 'CN', dial_code: '+86',
}, {
  name: 'Wallis und Futuna', flag: '🇼🇫', code: 'WF', dial_code: '+681',
}, {
  name: 'Weihnachtsinsel', flag: '🇨🇽', code: 'CX', dial_code: '+61',
}, {
  name: 'Zentralafrikanische Republik', flag: '🇨🇫', code: 'CF', dial_code: '+236',
}, {
  name: 'Zypern', flag: '🇨🇾', code: 'CY', dial_code: '+357',
}, {
  name: 'Ägypten', flag: '🇪🇬', code: 'EG', dial_code: '+20',
}, {
  name: 'Äquatorialguinea', flag: '🇬🇶', code: 'GQ', dial_code: '+240',
}, {
  name: 'Äthiopien', flag: '🇪🇹', code: 'ET', dial_code: '+251',
}, {
  name: 'Åland', flag: '🇦🇽', code: 'AX', dial_code: '+358',
}, {
  name: 'Österreich', flag: '🇦🇹', code: 'AT', dial_code: '+43',
}];

export default COUNTRY_PHONE_CODES;
