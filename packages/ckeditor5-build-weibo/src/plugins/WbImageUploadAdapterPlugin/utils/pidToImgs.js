import * as SDK from './weiboImage.js';
/**
 * 图片pid转化img图片信息
 * @param {图片pid数组} pic_ids
 * @param {图片焦点坐标} pic_focus_point
 */
export default function (pic_ids, pic_focus_point) {
  return (
    pic_ids &&
    pic_ids.map((pid) => ({
      url: SDK.getImageURL(pid, 'orj360'),
      geo: SDK.getImageGeometry(pid),
      large: {
        url: SDK.getImageURL(pid, 'large')
      },
      webp: {
        url: SDK.getImageURL(pid, 'webp720')
      },
      normal: {
        url: SDK.getImageURL(pid, 'mw1024')
      },
      pid,
      focus_point:
        pic_focus_point &&
        pic_focus_point.length &&
        pic_focus_point.find((item) => item.pic_id === pid) &&
        pic_focus_point.find((item) => item.pic_id === pid).focus_point,
      type: SDK.getImageFormat(pid)
    }))
  );
}
