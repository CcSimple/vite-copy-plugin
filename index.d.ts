/*
 * @Author: Cc-Mac 840054486@qq.com
 * @Date: 2022-07-07 13:16:22
 * @LastEditors: Cc-Mac 840054486@qq.com
 * @LastEditTime: 2022-07-07 13:22:39
 * @FilePath: /svelte-hiprint/packages/vite-copy-plugin/index.d.ts
 */
import { Plugin } from "vite";

export interface ViteCopyOption {
  from: string;
  to: string;
}

export default function ViteCopyPlugin(options: ViteCopyOption[]): Plugin;
