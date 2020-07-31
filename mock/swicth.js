const Mock = require('mockjs')

const data = Mock.mock({
  'total': 2,
  'nodes': [
    {
      'swi_id': 'of:0000000000000003',
      'available': '172.17.0.6',
      'swi_name': 'Swicth-1',
      'classisId': 3,
      'role': 'STANDBY',
      'hw': 'Open vSwitch',
      'camera_num': 27,
      'status': 'READY',
      'sw': '2.13.0',
      'lastUpdate': '1595248837138',
      'humanReadableLastUpdate': '3m57s ago'
    },
    {
      'id': 'of:0000000000000004',
      'available': '172.17.0.7',
      'name': 'Swicth-2',
      'hw': 'Open vSwitch',
      'classisId': 3,
      'number': 31,
      'role': 'STANDBY',
      'status': 'READY',
      'sw': '2.13.0',
      'lastUpdate': '1595248835568',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'id': 'of:0000000000000005',
      'available': '172.17.0.5',
      'name': 'Swicth-3',
      'hw': 'Open vSwitch',
      'sw': '2.13.0',
      'classisId': 3,
      'role': 'STANDBY',
      'status': 'READY',
      'number': 13,
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'id': 'of:0000000000000006',
      'available': '172.17.0.4',
      'name': 'Swicth-3',
      'role': 'STANDBY',
      'number': 11,
      'sw': '2.13.0',
      'classisId': 3,
      'hw': 'Open vSwitch',
      'status': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'id': 'of:0000000000000007',
      'available': '172.17.0.5',
      'name': 'Swicth-3',
      'number': 32,
      'role': 'STANDBY',
      'hw': 'Open vSwitch',
      'classisId': 3,
      'sw': '2.13.0',
      'status': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    }, {
      'id': 'of:0000000000000008',
      'available': '172.17.0.3',
      'name': 'Swicth-3',
      'number': 21,
      'role': 'STANDBY',
      'hw': 'Open vSwitch',
      'classisId': 3,
      'sw': '2.13.0',
      'status': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    }, {
      'id': 'of:0000000000000009',
      'number': 28,
      'available': '172.17.0.2',
      'name': 'Swicth-3',
      'role': 'STANDBY',
      'sw': '2.13.0',
      'classisId': 3,
      'hw': 'Open vSwitch',
      'status': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    }, {
      'id': 'of:0000000000000002',
      'available': '172.17.0.1',
      'hw': 'Open vSwitch',
      'name': 'Swicth-3',
      'role': 'STANDBY',
      'number': 25,
      'classisId': 3,
      'sw': '2.13.0',
      'status': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'id': 'of:0000000000000001',
      'available': '172.17.0.9',
      'name': 'Swicth-3',
      'classisId': 3,
      'hw': 'Open vSwitch',
      'sw': '2.13.0',
      'number': 24,
      'role': 'STANDBY',
      'status': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'id': 'of:0000000000000011',
      'available': '172.17.0.0',
      'name': 'Swicth-3',
      'number': 24,
      'classisId': 3,
      'hw': 'Open vSwitch',
      'role': 'STANDBY',
      'sw': '2.13.0',
      'status': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'id': 'of:000000000000012',
      'available': '172.17.0.2',
      'name': 'Swicth-3',
      'number': 21,
      'hw': 'Open vSwitch',
      'role': 'STANDBY',
      'sw': '2.13.0',
      'classisId': 3,
      'status': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    }
  ]
})

module.exports = [
  {
    url: '/horus/switch/list',
    type: 'get',
    response: config => {
      const items = data.nodes
      return {
        code: 20000,
        total: data.total,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
