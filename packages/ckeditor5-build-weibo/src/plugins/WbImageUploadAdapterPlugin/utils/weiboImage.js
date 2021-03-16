// @ts-nocheck
import crc32 from 'crc32';

const getImageFormat = (pid) => {
  return pid[21] == 'g' ? 'gif' : 'jpg';
};

const getImageGeometry = (pid) => {
  if (pid.length >= 32 && pid[22] >= '1') {
    const width = parseInt(pid.substr(23, 3), 36);
    const height = parseInt(pid.substr(26, 3), 36);
    return { width, height };
  }
};

const getImageFileSize = (pid) => {
  if (pid.length >= 32 && pid[22] >= '2') {
    const dn = parseInt(pid.substr(29, 3), 36);
    const base = dn & 0x3ff;
    const exp = (dn >>> 10) & 0x3;
    const rem = (dn >>> 12) & 0xf;

    let size = base << (exp * 10);
    size += (rem * 93) << ((exp > 0 ? exp - 1 : exp) * 10);
    return size;
  }
  return 0;
};

const getImageURL = (pid, type = 'bmiddle', https = true) => {
  const protocol = https ? 'https://' : 'http://';
  if (pid[9] == 'w' || (pid[9] == 'y' && pid.length >= 32)) {
    const zone = (crc32(pid) & 3) + 1;
    const ext = getImageFormat(pid);
    if (pid[9] == 'w') {
      return `${protocol}ww${zone}.sinaimg.cn/${type}/${pid}.${ext}`;
    }
    return `${protocol}wx${zone}.sinaimg.cn/${type}/${pid}.${ext}`;
  } else {
    const zone = (parseInt(pid.substr(-2, 2), 16) & 0xf) + 1;
    return `${protocol}ss${zone}.sinaimg.cn/${type}/${pid}&690`;
  }
};

export { getImageFormat, getImageGeometry, getImageFileSize, getImageURL };
