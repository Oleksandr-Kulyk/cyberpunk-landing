import { src, dest } from "gulp";
import svgSprite from "gulp-svg-sprite";
import imagemin from "gulp-imagemin";

export const sprite = () => {
  return src("src/icons/*.svg", { encoding: false })
    .pipe(imagemin())
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
            example: true,
          },
        },
      })
    )
    .pipe(dest("src/icons"));
};
