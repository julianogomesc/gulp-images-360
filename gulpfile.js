var gulp = require('gulp');
var rename = require('gulp-rename');
var merge = require('merge-stream');
// var count = require('gulp-file-count');
var debug = require('gulp-debug');
var imagemin = require('gulp-imagemin');
const sharpResponsive = require("gulp-sharp-responsive");


gulp.task('images500', function () {
  const origem = './files/**/*.jpg'
  var destino = 'public'
  var data = []
  for(var i = 1; i <= 32; i++){
    data.push((i).toLocaleString('en-US', {minimumIntegerDigits:2, useGrouping: false}))
  }
  var streams = [];
  data.forEach(function(name){
    var stream = gulp.src(origem)
      // console.log(gulp.path)
      .pipe(sharpResponsive({
        formats: [
          {width: 500}
          // {width: 500, rename: { suffix: "-sm" }},
          // {width: 1800, rename: { suffix: "-lg" }}
        ]
      }))
      .pipe(rename(function(path){
        path.basename = path.dirname + '-' + path.basename;
        path.extname = '.jpg';
        path.dirname = path.dirname[0] + path.dirname[1] + path.dirname[2] + path.dirname[3] + path.dirname[4] + "/Small"
        // console.log(path.dirname[1])
      }))
      .pipe(imagemin([
        imagemin.mozjpeg({quality: 90, progressive: true}),
      ]))      
      .pipe(gulp.dest(destino));
      streams.push(stream);
      // console.log(data)
  });
  return merge(streams);
});

gulp.task('images1800', function () {
  const origem = './files/**/*.jpg'
  var destino = 'public'
  // var destinoBig = ''
  // const destinoSmall = './renomeados/Small'
  var data = []
  for(var i = 1; i <= 32; i++){
    data.push((i).toLocaleString('en-US', {minimumIntegerDigits:2, useGrouping: false}))
  }
  var streams = [];
  data.forEach(function(name){
    var stream = gulp.src(origem)
      // console.log(gulp.path)
      .pipe(sharpResponsive({
        formats: [
          {width: 1800}
        ]
      }))
      .pipe(rename(function(path){
        path.basename = path.dirname + '-' + path.basename;
        path.extname = '.jpg';
        path.dirname = path.dirname[0] + path.dirname[1] + path.dirname[2] + path.dirname[3] + path.dirname[4] + "/Big"
        // console.log(path.dirname[1])
      }))
      .pipe(imagemin([
        imagemin.mozjpeg({quality: 90, progressive: true}),
      ]))      
      .pipe(gulp.dest(destino));
      streams.push(stream);
      // console.log(data)
  });
  return merge(streams);
});

gulp.task('contagem', function(){
    const origem = './files/**/*'

    return gulp.src(origem)
        .pipe(debug({title: 'example src:'}))
        .pipe(gulp.dest('./dist'))
})