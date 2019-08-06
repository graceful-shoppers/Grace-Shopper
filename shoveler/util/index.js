/* eslint-disable handle-callback-err */
const fs = require('fs')

const fileReader = async () => {
  await fs.readdir(
    __dirname + '/../apify_storage/datasets/default',
    async (err, files) => {
      // console.log(files)
      await Promise.all(
        files.map(async file => {
          await fs.readFile(
            __dirname + `/../apify_storage/datasets/default/${file}`,
            'utf8',
            (err, data) => {
              console.log(JSON.parse(data))
            }
          )
        })
      )
    }
  )
}

fileReader()
