import { src, dest } from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import fonter from "gulp-fonter";
import gulpClean from "gulp-clean";
import ttf2woff2 from "gulp-ttf2woff2";
import fontfacegen from "gulp-fontfacegen";
import rename from "gulp-rename";

export const convertToWoff = () => {
  return src("src/font/src/*", { encoding: false })
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(fonter({ formats: ["ttf", "woff"] }))
    .pipe(dest("src/font/src"));
};

export const convertToWoff2 = () => {
  return src("src/font/src/*.ttf", { encoding: false })
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(ttf2woff2())
    .pipe(dest("src/font/src"));
};

export const moveFonts = () => {
  return src("src/font/src/*.{woff,woff2}", { encoding: false }).pipe(
    dest("src/font")
  );
};

export const cleanSrcFolder = () => {
  return src("src/font/src/*", { read: false, allowEmpty: true }).pipe(
    gulpClean()
  );
};

export const generateFontFace = () => {
  return src("src/font/**/*.{woff2,woff,ttf,svg}", { encoding: false })
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(
      fontfacegen({
        css_fontpath: "../font/", // Задаємо шлях до шрифтів
        css_filename: "fonts.css", // Задаємо ім'я файлу
      })
    );
};

// Очищення старого файлу SCSS
export const cleanOldFontFace = () => {
  return src("src/scss/base/_fonts.scss", {
    read: false,
    allowEmpty: true,
  }).pipe(gulpClean());
};

export const relocateFontFace = () => {
  return src("src/css//partial/fonts.css")
    .pipe(rename("_fonts.scss"))
    .pipe(dest("src/Scss/base"));
};

export const cleanPartial = () => {
  return src("src/css/partial").pipe(gulpClean());
};
