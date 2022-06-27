let project_folder = "dist"
let source_folder = "app"

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css",
        js:  project_folder + "/js",
        img:  project_folder + "/img",
        fonts:  project_folder + "/fonts",
        svg: project_folder + "/img",
        libs: project_folder + "/libs"
        
    },
    source: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",
        js:  source_folder + "/js/script.js",
        img:  source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts:  source_folder + "/fonts/**/*.ttf",
        svg: source_folder + "/icon-sprite/**/*",
        libs: source_folder + "/libs/**/*"
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js:  source_folder + "/js/**/*.js",
        img:  source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts:  source_folder + "/fonts/**/*.ttf",
        svg: source_folder + "/icon-sprite/**/*",
        libs: source_folder + "/libs/**/*"
    },
    clean: project_folder + "/"
}

let {watch, series, dest, src, parallel} = require("gulp");
let sass = require("gulp-sass")(require("sass"));
let concat = require("gulp-concat");
let browserSync = require("browser-sync").create();
let uglify = require("gulp-uglify-es").default;
let fileInclude = require("gulp-file-include");
let del = require("del");
let autoprefixer = require("gulp-autoprefixer");
let groupMedia = require("gulp-group-css-media-queries");
let cleanCSS = require("gulp-clean-css");
let imageMin = require("gulp-imagemin");
let svgSprite = require("gulp-svg-sprite");
let cheerio = require("gulp-cheerio");
let ttf2woff = require("gulp-ttf2woff");
let ttf2woff2 = require("gulp-ttf2woff2");
let svgstore = require("gulp-svgstore");

function clear() {
    return del(path.clean);
}

function libs() {
    return src(path.source.libs)
    .pipe(dest(path.build.libs))
    .pipe(browserSync.stream());
}

function fonts() {
    src(path.source.fonts)
    .pipe(dest(path.build.fonts));
    src(path.source.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts));
    return src(path.source.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.stream());
}

function styles() {
    return src(path.source.css)
    .pipe(sass({ outputStyle: "expanded" }).on('error', sass.logError))
    .pipe(autoprefixer("last 5 versions"))
    .pipe(groupMedia())
    .pipe(dest(path.build.css))
    .pipe(cleanCSS())
    .pipe(concat("style.min.css"))
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream());
}

function images() {
    return src(path.source.img)
    .pipe(imageMin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3

    }))
    .pipe(dest(path.build.img))
    .pipe(browserSync.stream());
}

function scripts() {
    return src(path.source.js)
    .pipe(fileInclude())
    .pipe(dest(path.build.js))
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream());
}

function sprites() {
    return src(path.source.svg)
    .pipe(cheerio({
        run: function($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
        },
        parserOptions: {xmlMode: true}
    }))
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: "../sprite.svg"
            }
        }
    }))
    .pipe(dest(path.build.svg))
    .pipe(browserSync.stream())
    
}

function html() {
    return src(path.source.html)
    .pipe(fileInclude())
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
}

function watcher() {
    watch(path.watch.css, styles);
    watch(path.watch.img, images);
    watch(path.watch.svg, sprites)
    watch(path.watch.html, html);
    watch(path.source.js, scripts);
    watch(path.watch.fonts, fonts);
    watch(path.watch.libs, libs);
    watch(path.source.html).on('change', browserSync.reload);
    browserSync.init({
        server: {
            baseDir: path.clean,
        },
        notify: false
    });
}

let build = series(clear, fonts, html, styles, scripts, images, sprites, libs);
exports.build = build;
exports.default = parallel(build, watcher);