/*
 * @Author: Cc-Mac 840054486@qq.com
 * @Date: 2022-07-07 13:12:24
 * @LastEditors: Cc-Mac 840054486@qq.com
 * @LastEditTime: 2022-07-08 10:36:40
 * @FilePath: /svelte-hiprint/packages/vite-copy-plugin/index.js
 * @Description: vite 复制文件/文件夹 plugin
 */
const path = require("path");
const fs = require("fs-extra");
const separator = process.platform == "win32" ? "\\" : "/";

// 是否是绝对路径
const isAbs = (url) => {
  return path.isAbsolute(url);
};

// 是否是目录
const isDir = (url) => {
  const pathEnd = url.substring(url.lastIndexOf(separator));
  return !pathEnd.includes(".");
};

// 是否是文件
const isFile = (url) => {
  const pathEnd = url.substring(url.lastIndexOf(separator));
  return pathEnd.includes(".");
};

// 创建目录
const mkdir = (url) => {
  if (isDir(url)) {
    if (!fs.existsSync(url)) {
      fs.mkdirsSync(url);
    }
  } else {
    const parentUrl = path.resolve(url, "..");
    if (!fs.existsSync(parentUrl)) {
      fs.mkdirsSync(parentUrl);
    }
  }
};

const copy = function (item) {
  try {
    if (fs.existsSync(item.from)) {
      const from = fs.statSync(item.from);
      if (from.isDirectory() && isDir(item.to)) {
        mkdir(item.to);
        fs.copySync(item.from, item.to);
      } else {
        if (from.isFile() && isDir(item.to)) {
          mkdir(item.to);
          const fileName = item.from.substring(
            item.from.lastIndexOf(separator)
          );
          const filePath = `${item.to}${fileName}`;
          fs.copySync(item.from, filePath);
        } else if (from.isFile() && isFile(item.to)) {
          fs.copySync(item.from, item.to);
        }
      }
      console.log(
        `vite-copy-plugin: copy "${item.origin.from}" to "${item.origin.to}" success!`
      );
    }
  } catch (err) {
    console.error(
      `vite-copy-plugin: copy "${item.origin.from}" to "${item.origin.to}" error!`
    );
    console.error(err);
  }
};

module.exports = function (options) {
  let viteConfig;
  let list;
  return {
    name: "vite-copy-plugin",
    apply: "build",
    configResolved: (config) => {
      viteConfig = config;
      const root = viteConfig.root;
      const outDir = viteConfig.build.outDir;
      list = options.map((item) => {
        const to = item.to || outDir;
        item.to = to;
        return {
          origin: item,
          from: isAbs(item.from) ? item.from : path.resolve(root, item.from),
          to: isAbs(to) ? item.to : path.resolve(root, to),
        };
      });
    },
    closeBundle: () => {
      list.forEach((item) => {
        copy(item);
      });
    },
  };
};
