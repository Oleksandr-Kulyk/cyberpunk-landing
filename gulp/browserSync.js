import browserSync from "browser-sync";
export const browserSyncInstance = browserSync.create();

export const initBrowserSync = (baseDir = "src") => {
  browserSyncInstance.init({
    server: {
      baseDir: baseDir,
    },
  });
};

export const initializeBrowserSync = initBrowserSync;
