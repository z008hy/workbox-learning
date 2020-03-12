module.exports = (Mock) => ({
  url: '/network-first-random',
  method: 'get',
  data: (ctx) => {
    return Mock.mock({
      random: '@id',
      type: 'network-first-random'
    })
  }
})
