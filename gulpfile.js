var gulp = require('gulp');
// var clean = require('gulp-clean');  // see below commment about clean task
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var moment = require('moment');

var notifier = require('node-notifier');
var htmlreplace = require('gulp-html-replace');

var path = {
	HTML: './src/web/index.html',
	ALL: ['./src/web/**/*.jsx', './src/web/**/*.scss', './src/web/scss/*', './src/web/index.html'],
	JSX: ['./src/web/*.jsx', './src/web/**/*.jsx'],
	SCSS: ['./src/web/*.scss','./src/web/**/*.scss', './src/web/scss/*.css'],
	FONTS: ['./src/web/fonts/*'],
	IMAGES: ['./src/web/images/*'],
	SERVER_JS: ['./src/server/*.js', './src/server/**/*.js'],
	ENTRY_POINT: './src/web/components/app.jsx',	
	OUT: 'build.js',
	OUT_CSS: 'style.css',
	MINIFIED_OUT: 'build.min.js',
	DEST: 'dist',
	DEST_WEB: 'dist/public',
	DEST_WEB_SRC: 'dist/public/js',
	DEST_WEB_CSS: 'dist/public/css',
	DEST_WEB_FONTS: 'dist/public/fonts',
	DEST_WEB_IMAGES: 'dist/public/images',
	DEST_WEB_BUILD: 'dist/public/build'	
};

var notify = function(error) {
  var message = 'In: ';
  var title = 'Error: ';

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({title: title, message: message});
};

// hard to include a clean task since other task must depend on clean task finishes first;
// but then watch task will trigger these other task which will in turn trigger clean, then 
// files get deleted

// // Delete the dist directory
// gulp.task('clean', function() {
//  return gulp.src(path.DEST)
//  .pipe(clean());
// });

// Development task 1: copy index.html file
gulp.task('copy-html', function() {
	gulp.src(path.HTML)
	.pipe(gulp.dest(path.DEST_WEB));
});

gulp.task('copy-fonts', function() {
	gulp.src(path.FONTS)
	.pipe(gulp.dest(path.DEST_WEB_FONTS));
});

gulp.task('copy-images', function() {
	gulp.src(path.IMAGES)
	.pipe(gulp.dest(path.DEST_WEB_IMAGES));
});

// Development task 2: process scss files and copy to dist folder
gulp.task('sass', function () {
  gulp.src(path.SCSS)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat(path.OUT_CSS))
    .pipe(gulp.dest(path.DEST_WEB_CSS));
});


// Development task 3: copy server js files
gulp.task('copy-server-js', function() {
	gulp.src(path.SERVER_JS)
	.pipe(gulp.dest(path.DEST));
});


// Development task 4: main task
gulp.task('watch', function() {
	gulp.watch(path.HTML, ['copy-html']);
	gulp.watch(path.FONTS, ['copy-fonts']);
	gulp.watch(path.IMAGES, ['copy-images']);
	gulp.watch(path.SCSS, ['sass']);
	gulp.watch(path.SERVER_JS, ['copy-server-js']);

	var watcher = watchify(browserify({
		entries: [path.ENTRY_POINT],
		transform: [reactify],
		extensions: ['.jsx'],
		debug: true,
		cache: {}, packageCache: {}, fullPaths: true
	}));

	return watcher.on('update', function() {
		watcher.bundle()
		.pipe(source(path.OUT))
		.pipe(gulp.dest(path.DEST_WEB_SRC))
		console.log('Updated at ' + moment().format('MMMM Do YYYY, h:mm:ss a'));
	})
	.bundle()
	.on('error', notify)
	.pipe(source(path.OUT))
	.pipe(gulp.dest(path.DEST_WEB_SRC));
});

gulp.task('default', ['copy-server-js','copy-html', 'copy-fonts', 'copy-images', 'sass', 'watch']);

// Production task: concat all JS files, minify them and output to the build folder
gulp.task('build', function() {
	browserify({
		entries: [path.ENTRY_POINT],
		transform: [reactify],
		extensions: ['.jsx'],
		debug: false
	})
		.bundle()
		.pipe(source(path.MINIFIED_OUT))
//		.pipe(streamify(uglify()))
		.pipe(gulp.dest(path.DEST_WEB_BUILD));
	});

// also replace the js reference in index.html to the minified version
gulp.task('replaceHTML', function() {
	gulp.src(path.HTML)
	.pipe(htmlreplace({
		'js': 'build/' + path.MINIFIED_OUT
	}))
	.pipe(gulp.dest(path.DEST_WEB));
})


gulp.task('production', ['copy-server-js','copy-fonts', 'copy-images','replaceHTML', 'sass', 'build']);
