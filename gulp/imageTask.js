import { src, dest } from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import avif from "gulp-avif";
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";
import newer from "gulp-newer";

export const avifConversion = () => {
  return src("src/images/src/*.{jpg,jpeg,png}", { encoding: false })
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(newer("src/images"))
    .pipe(avif({ compression: 50 }))
    .pipe(dest("src/images"))
    .pipe(notify({ message: "AVIF conversion complete", onLast: true }));
};

export const webpConversion = () => {
  return src("src/images/src/*.{jpg,jpeg,png}", { encoding: false })
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(newer("src/images"))
    .pipe(webp())
    .pipe(dest("src/images"))
    .pipe(notify({ message: "WebP conversion complete", onLast: true }));
};

export const imageOptimization = () => {
  return src("src/images/src/*.*", { encoding: false })
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(newer("src/images"))
    .pipe(imagemin())
    .pipe(dest("src/images"))
    .pipe(notify({ message: "Image optimization complete", onLast: true }));
};
