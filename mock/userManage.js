const Mock = require('mockjs')

const addData = Mock.mock({
  'msg': 'add success'
})

const data = Mock.mock({
  'total': 2,
  'nodes': [
    {
      'userid': '172.17.0.6',
      'ip': '172.17.0.6',
      'username': 'C0123',
      'type': 9876,
      'latitude': 'READY',
      'longitude': 21,
      'lastUpdate': '1595248837138',
      'humanReadableLastUpdate': '3m57s ago'
    },
    {
      'userid': '172.17.0.7',
      'ip': '172.17.0.7',
      'username': 'C0124',
      'type': 9876,
      'latitude': 'READY',
      'longitude': 30,
      'lastUpdate': '1595248835568',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'userid': '172.17.0.5',
      'ip': '172.17.0.5',
      'username': 'C0134',
      'type': 9876,
      'longitude': 23,
      'latitude': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'userid': '172.17.0.4',
      'ip': '172.17.0.4',
      'username': 'C1134',
      'type': 9876,
      'longitude': 23,
      'latitude': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'userid': '172.17.0.5',
      'ip': '172.17.0.5',
      'username': 'C1234',
      'type': 9876,
      'longitude': 23,
      'latitude': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    }, {
      'userid': '172.17.0.3',
      'ip': '172.17.0.3',
      'username': 'C1224',
      'type': 9876,
      'longitude': 23,
      'latitude': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    }, {
      'userid': '172.17.0.2',
      'ip': '172.17.0.2',
      'username': 'C1324',
      'type': 9876,
      'longitude': 23,
      'latitude': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    }, {
      'userid': '172.17.0.1',
      'ip': '172.17.0.1',
      'username': 'C1124',
      'type': 9876,
      'longitude': 23,
      'latitude': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'userid': '172.17.0.9',
      'ip': '172.17.0.2',
      'username': 'C1125',
      'type': 9876,
      'longitude': 23,
      'latitude': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'userid': '172.17.0.0',
      'ip': '172.17.0.0',
      'username': 'C1822',
      'type': 9876,
      'longitude': 23,
      'latitude': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'userid': '172.17.0.2',
      'ip': '172.17.0.2',
      'username': 'C1175',
      'type': 9876,
      'longitude': 23,
      'latitude': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    }
  ]
})

module.exports = [
  {
    url: '/horus/user/add',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        msg: addData.msg
      }
    }
  },
  {
    url: '/horus/user/list',
    type: 'get',
    response: config => {
      const items = data.nodes
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
