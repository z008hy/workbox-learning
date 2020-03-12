module.exports = (Mock) => ({
  url: '/network-only-random',
  method: 'get',
  data: (ctx) => {
    return Mock.mock({
      random: '@id',
      type: 'network-only'
    })
  }
})
