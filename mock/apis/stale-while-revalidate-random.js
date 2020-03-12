module.exports = (Mock) => ({
  url: '/stale-while-revalidate-random',
  method: 'get',
  data: (ctx) => {
    return Mock.mock({
      random: '@id',
      type: 'stale-while-revalidate'
    })
  }
})
