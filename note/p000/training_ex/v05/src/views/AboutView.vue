<template>
  <div>
    <video id="video" autoplay></video>
    <canvas id="canvas"></canvas>
    <div id="cap_result">{{ captureResult }}</div>
    <div id="result_label"></div>
  </div>
</template>

<script>
import * as posenet from '@tensorflow-models/posenet'

export default {
  data() {
    return {
      captureResult: '',
      lastCaptureTime: 0,
      color: 'blue',
      boundingBoxColor: 'red',
      lineWidth: 2,
      model: null
    }
  },
  methods: {
    toTuple({ y, x }) {
      return [y, x]
    },
    drawPoint(ctx, y, x, r, color) {
      ctx.beginPath()
      ctx.arc(x, y, r, 0, 2 * Math.PI)
      ctx.fillStyle = color
      ctx.fill()
    },
    drawSegment([ay, ax], [by, bx], color, scale, ctx) {
      ctx.beginPath()
      ctx.moveTo(ax * scale, ay * scale)
      ctx.lineTo(bx * scale, by * scale)
      ctx.lineWidth = this.lineWidth
      ctx.strokeStyle = color
      ctx.stroke()
    },
    drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
      const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
        keypoints,
        minConfidence
      )
      adjacentKeyPoints.forEach((keypoints) => {
        this.drawSegment(
          this.toTuple(keypoints[0].position),
          this.toTuple(keypoints[1].position),
          this.color,
          scale,
          ctx
        )
      })
    },
    drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
      for (let i = 0; i < keypoints.length; i++) {
        const keypoint = keypoints[i]
        if (keypoint.score < minConfidence) {
          continue
        }
        const { y, x } = keypoint.position
        this.drawPoint(ctx, y * scale, x * scale, 3, this.color)
      }
    },
    predict() {
      this.model.estimateSinglePose(this.$refs.video).then((pose) => {
        const canvas = this.$refs.canvas
        const context = canvas.getContext('2d')

        canvas.width = this.$refs.video.width
        canvas.height = this.$refs.video.height

        this.drawKeypoints(pose.keypoints, 0.6, context)
        this.drawSkeleton(pose.keypoints, 0.6, context)

        const currentTime = new Date().getTime()
        if (currentTime - this.lastCaptureTime >= 1000) {
          this.lastCaptureTime = currentTime

          const rightHand = pose.keypoints.find(
            (keypoint) => keypoint.part === 'rightWrist'
          )
          const leftHand = pose.keypoints.find(
            (keypoint) => keypoint.part === 'leftWrist'
          )

          this.captureResult = '' // 초기화

          if (leftHand && leftHand.score > 0.5) {
            this.captureResult = '왼손을 들었습니다!'
          }
          if (rightHand && rightHand.score > 0.5) {
            this.captureResult = '오른손을 들었습니다!'
          }
        }
      })
      requestAnimationFrame(this.predict)
    }
  },
  mounted() {
    const video = this.$refs.video

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      video.srcObject = stream
    })

    posenet.load().then((model) => {
      this.model = model
      video.onloadeddata = () => {
        this.predict()
      }
    })
  }
}
</script>

<style scoped>
body {
  height: 100%;
  width: 100%;
}
video,
canvas {
  position: absolute;
}
#cap_result {
  position: absolute;
  top: 70%;
}
</style>
