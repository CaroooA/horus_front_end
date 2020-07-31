const Mock = require('mockjs')

const addData = Mock.mock({
  'msg': 'add success'
})

const data = Mock.mock({
  'nodes': [
    {
      'cameraid': '172.17.0.6',
      'ip': '172.17.0.6',
      'cameraname': 'C0123',
      'type': '半球机',
      'latitude': 'READY',
      'longitude': 21,
      'humanReadableLastUpdate': '3m57s ago'
    },
    {
      'cameraid': '172.17.0.7',
      'ip': '172.17.0.7',
      'cameraname': 'C0124',
      'type': 9876,
      'latitude': 'READY',
      'longitude': 30,
      'lastUpdate': '1595248835568',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'cameraid': '172.17.0.5',
      'ip': '172.17.0.5',
      'cameraname': 'C0134',
      'type': 9876,
      'longitude': 23,
      'latitude': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'cameraid': '172.17.0.4',
      'ip': '172.17.0.4',
      'cameraname': 'C1134',
      'type': 9876,
      'longitude': 23,
      'latitude': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'cameraid': '172.17.0.5',
      'ip': '172.17.0.5',
      'cameraname': 'C1234',
      'type': 9876,
      'longitude': 23,
      'latitude': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    }, {
      'cameraid': '172.17.0.3',
      'ip': '172.17.0.3',
      'cameraname': 'C1224',
      'type': 9876,
      'longitude': 23,
      'latitude': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    }, {
      'cameraid': '172.17.0.2',
      'ip': '172.17.0.2',
      'cameraname': 'C1324',
      'type': 9876,
      'longitude': 23,
      'latitude': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    }, {
      'cameraid': '172.17.0.1',
      'ip': '172.17.0.1',
      'cameraname': 'C1124',
      'type': 9876,
      'longitude': 23,
      'latitude': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'cameraid': '172.17.0.9',
      'ip': '172.17.0.2',
      'cameraname': 'C1125',
      'type': 9876,
      'longitude': 23,
      'latitude': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'cameraid': '172.17.0.0',
      'ip': '172.17.0.0',
      'cameraname': 'C1822',
      'type': 9876,
      'longitude': 23,
      'latitude': 'READY',
      'lastUpdate': '1595248834885',
      'humanReadableLastUpdate': '3m59s ago'
    },
    {
      'cameraid': '172.17.0.2',
      'ip': '172.17.0.2',
      'cameraname': 'C1175',
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
    url: '/horus/camera/add',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        msg: addData.msg
      }
    }
  },
  {
    url: '/horus/camera/list',
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
