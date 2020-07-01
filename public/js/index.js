const axios = require('axios')
const ffmpeg = require('fluent-ffmpeg')
const ffmpegPath = 'E:/ffmpeg/bin/ffmpeg.exe'

let outputPath = 'rtmp://push.leeggco.com/live/33?txSecret=77a3c890ab2a25365a274f1e7d74a15a&txTime=5DBC567F'
// const outputPath = 'rtmp://push.leeggco.com/live/123456?txSecret=e546047b493eda6e64538f7bf6b775b7&txTime=5DF9D91D'
const startButton = document.querySelector('#startButton')
const stopButton = document.querySelector('#stopButton')
const loginButton = document.querySelector('#loginButton')
const getPushUrlButton = document.querySelector('#getPushUrlButton')
const status = document.querySelector('#status')
let username, token, command

function loginFn() {
  alert(111)
}

// 获取用户名
loginButton.addEventListener('click', function(e) {
  axios({
    method: 'post',
    url: 'http://localhost:3000/users/login',
    data: {
      username: 'leeggco',
      password: '123123'
    }
  }).then(res => {
    console.log(res)
    token = res.data.token
    username = res.data.data.username
  })
  console.log('axios-login')
})

// 获取推流URL
getPushUrlButton.addEventListener('click', function(e){
  axios({
    method: 'post',
    url: 'http://localhost:3000/flow/getPushUrl',
    headers: {
      token: token
    },
    data: {
      username: username
    }
  }).then(res => {
    console.log(res)
    outputPath = res.data.data.pushUrl
    ffCommand()
  })
  console.log('axios-getPushUrl')
})

// 开始推流
startButton.addEventListener('click', function(e) {
  console.log('开始！')
  status.innerHTML = '直播中'
  ffCommand().run()
})

// 停止推流
stopButton.addEventListener('click', function(e) {
  console.log('停止！')
  status.innerHTML = '已停止'
  command.kill()
})

function ffCommand() {
  return command = ffmpeg()
  .setFfmpegPath(ffmpegPath)
  // .input('desktop')
  // .inputFormat('gdigrab')
  .input('audio=virtual-audio-capturer')
  .inputFormat('dshow')
  .addOptions([
    '-ar 48000',
    '-acodec aac',
    '-bsf:a aac_adtstoasc'
  ])
  .format('flv')
  .output(outputPath, {
    end: true
  })
  .on('start', function (commandLine) {
    console.log('[' + new Date() + '] Vedio is Pushing !')
    console.log('commandLine: ' + commandLine)
  })
  .on('error', function (err, stdout, stderr) {
    console.log('error: ' + err.message)
  })
  .on('end', function () {
    console.log('[' + new Date() + '] Vedio Pushing is Finished !')
  })
}