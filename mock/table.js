const Mock = require('mockjs')

const data = Mock.mock({
  'total': 2,
  'nodes': [
    {
      'conid': '172.17.0.6',
      'ip': '172.17.0.6',
      'conname': 'Switch-1',
      'tcpPort': 9876,
      'status': 'READY',
      'switch_num': 21,
      'lastUpdate': '1595248837138',
      'humanReadableLastUpdate': '3m57s ago'
    },
    {
      'conid': '172.17.0.7',
      'ip': '172.17.0.7',
      'conname': 'Switch-2',
      'tcpPort': 9876,
      'status': 'READY',
      'switch_num': 30,
      'lastUpdate': '1595248835568',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'conid': '172.17.0.5',
      'ip': '172.17.0.5',
      'conname': 'Switch-3',
      'tcpPort': 9876,
      'switch_num': 23,
      'status': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'conid': '172.17.0.4',
      'ip': '172.17.0.4',
      'conname': 'Switch-3',
      'tcpPort': 9876,
      'switch_num': 23,
      'status': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'conid': '172.17.0.5',
      'ip': '172.17.0.5',
      'conname': 'Switch-3',
      'tcpPort': 9876,
      'switch_num': 23,
      'status': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    }, {
      'conid': '172.17.0.3',
      'ip': '172.17.0.3',
      'conname': 'Switch-3',
      'tcpPort': 9876,
      'switch_num': 23,
      'status': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    }, {
      'conid': '172.17.0.2',
      'ip': '172.17.0.2',
      'conname': 'Switch-3',
      'tcpPort': 9876,
      'switch_num': 23,
      'status': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    }, {
      'conid': '172.17.0.1',
      'ip': '172.17.0.1',
      'conname': 'Switch-3',
      'tcpPort': 9876,
      'switch_num': 23,
      'status': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'conid': '172.17.0.9',
      'ip': '172.17.0.9',
      'conname': 'Switch-3',
      'tcpPort': 9876,
      'switch_num': 23,
      'status': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'conid': '172.17.0.0',
      'ip': '172.17.0.0',
      'conname': 'Switch-3',
      'tcpPort': 9876,
      'switch_num': 23,
      'status': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'conid': '172.17.0.2',
      'ip': '172.17.0.2',
      'conname': 'Switch-3',
      'tcpPort': 9876,
      'switch_num': 23,
      'status': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    }
  ]
})

module.exports = [
  {
    url: '/controller/info',
    type: 'get',
    response: config => {
      const items = data.nodes
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
