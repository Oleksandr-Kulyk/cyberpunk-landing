import { src, dest } from "gulp";
import gulpSass from "gulp-sass";
import * as sass from "sass";
import concat from "gulp-concat";
import autoprefixer from "gulp-autoprefixer";
import { browserSyncInstance } from "./browserSync.js";

const scss = gulpSass(sass);

export const styles = () => {
  return src("src/scss/style.scss")
    .pipe(autoprefixer({ overrideBrowserlist: ["last 10 versions"] }))
    .pipe(concat("style.min.css"))
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(dest("src/css"))
    .pipe(browserSyncInstance.stream());
};
