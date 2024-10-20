import { src, dest } from "gulp";
import concat from "gulp-concat";
import terser from "gulp-terser";
import babel from "gulp-babel";
import { browserSyncInstance } from "./browserSync.js";

export const scripts = () => {
  return src("src/js/script.js")
    .pipe(concat("script.min.js"))
    .pipe(babel())
    .pipe(terser())
    .pipe(dest("src/js"))
    .pipe(browserSyncInstance.stream());
};
