const destroySessionOrder = async reqSid => {
  await Order.destroy({
    where: {
      sid: reqSid
    }
  })
}

module.exports = destroySessionOrder
