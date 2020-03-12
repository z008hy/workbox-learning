module.exports = (Mock) => ({
  url: '/cache-first-random',
  method: 'get',
  data: (ctx) => {
    return Mock.mock({
      random: '@id',
      type: 'cache-first'
    })
  }
})
