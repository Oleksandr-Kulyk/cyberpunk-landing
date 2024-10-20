import { src, dest, watch, parallel, series } from "gulp";
import { browserSyncInstance } from "./gulp/browserSync.js";
import { scripts } from "./gulp/scriptsTask.js";
import clean from "gulp-clean";
import { styles } from "./gulp/stylesTask.js";
import {
  avifConversion,
  webpConversion,
  imageOptimization,
} from "./gulp/imageTask.js";
import { sprite } from "./gulp/spriteTask.js";
import {
  convertToWoff,
  convertToWoff2,
  moveFonts,
  cleanSrcFolder,
  generateFontFace,
  cleanOldFontFace,
  relocateFontFace,
  cleanPartial,
} from "./gulp/fontsTask.js";

function building() {
  return src(
    [
      "src/css/style.min.css",
      "src/js/script.min.js",
      "src/**/*.html",
      "src/images/*.*",
      "src/icons/sprite.svg",
      "src/fonts/*.*",
    ],
    { base: "src", allowEmpty: true, encoding: false }
  ).pipe(dest("dist"));
}

function cleanDist() {
  return src("dist").pipe(clean());
}

function watching() {
  browserSyncInstance.init({
    server: {
      baseDir: "src/",
    },
  });
  watch("src/scss/style.scss", styles);
  watch("src/js/script.js", scripts);
  watch("src/**/*.html").on("change", browserSyncInstance.reload);
  watch("src/images/src", images);
}

export { styles, scripts, watching, building, sprite };

export const build = series(cleanDist, building);

export const images = parallel(
  avifConversion,
  webpConversion,
  imageOptimization
);
export const fonts = series(
  convertToWoff,
  convertToWoff2,
  moveFonts,
  cleanSrcFolder,
  cleanOldFontFace,
  generateFontFace,
  relocateFontFace,
  cleanPartial
);
export default parallel(styles, scripts, watching);
