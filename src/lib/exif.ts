export type ExifData = {
  make?: string;
  model?: string;
  lens?: string;
  focal?: number;
  focal35?: number;
  fNumber?: number;
  iso?: number;
  exposureTime?: number;
  exposureBias?: number;
  date?: string | Date;
};

const exifCache = new Map<string, ExifData | null>();

export const getExifData = async (src: string): Promise<ExifData | null> => {
  if (exifCache.has(src)) return exifCache.get(src) || null;
  
  const normalized = src.split('?')[0].toLowerCase();
  // 只嘗試解析 jpg/jpeg，其他格式通常不含 EXIF 或 exifr 支持不佳
  if (!normalized.endsWith('.jpg') && !normalized.endsWith('.jpeg')) {
    exifCache.set(src, null);
    return null;
  }

  try {
    // 動態導入 exifr 以減少初始包大小
    const { parse } = await import('exifr');
    const raw = await parse(src, {
      pick: [
        'Make', 'Model', 'LensModel', 'FocalLength', 'FocalLengthIn35mmFilm',
        'FNumber', 'ExposureTime', 'ISO', 'ExposureBiasValue', 'DateTimeOriginal'
      ]
    });

    if (!raw) {
      exifCache.set(src, null);
      return null;
    }

    const isoValue = Array.isArray(raw.ISO) ? raw.ISO[0] : raw.ISO;
    const meta: ExifData = {
      make: raw.Make,
      model: raw.Model,
      lens: raw.LensModel,
      focal: raw.FocalLength,
      focal35: raw.FocalLengthIn35mmFilm,
      fNumber: raw.FNumber,
      exposureTime: raw.ExposureTime,
      exposureBias: raw.ExposureBiasValue,
      iso: typeof isoValue === 'number' ? Math.round(isoValue) : undefined,
      date: raw.DateTimeOriginal
    };

    exifCache.set(src, meta);
    return meta;
  } catch (e) {
    console.warn('Failed to parse EXIF:', e);
    exifCache.set(src, null);
    return null;
  }
};

export const formatExifData = (meta: ExifData) => {
  const camera = [meta.make, meta.model].filter(Boolean).join(' ').trim();
  const aperture = formatAperture(meta.fNumber);
  const focal = formatFocal(meta.focal, meta.focal35);
  const focalAperture = [focal, aperture].filter(Boolean).join(' ');

  return [
    { key: 'Cam', value: camera },
    { key: 'Lens', value: meta.lens || '' },
    { key: 'F', value: focalAperture },
    { key: 'ISO', value: typeof meta.iso === 'number' ? `${meta.iso}` : '' },
    { key: 'S', value: formatExposureTime(meta.exposureTime) },
    { key: 'EV', value: formatExposureBias(meta.exposureBias) },
    { key: 'Time', value: formatDateTime(meta.date) }
  ];
};

const formatFocal = (focal?: number, focal35?: number) => {
  if (typeof focal35 === 'number') return `${Math.round(focal35)} mm`;
  if (typeof focal === 'number') {
    const rounded = focal >= 10 ? focal.toFixed(1) : focal.toFixed(2);
    return `${rounded.replace(/\.0+$/, '')} mm`;
  }
  return '';
};

const formatAperture = (fNumber?: number) => {
  if (typeof fNumber !== 'number') return '';
  const formatted = fNumber.toFixed(1).replace(/\.0$/, '');
  return `f/${formatted}`;
};

const formatExposureTime = (exposure?: number) => {
  if (typeof exposure !== 'number' || exposure <= 0) return '';
  if (exposure >= 1) {
    return `${exposure.toFixed(2).replace(/\.0+$/, '')} s`;
  }
  const denom = Math.round(1 / exposure);
  if (denom > 0) return `1/${denom} s`;
  return '';
};

const formatExposureBias = (bias?: number) => {
  if (typeof bias !== 'number') return '';
  const formatted = bias.toFixed(1).replace(/\.0$/, '');
  const sign = bias > 0 ? '+' : '';
  return `${sign}${formatted}`;
};

const formatDateTime = (date?: string | Date) => {
  if (!date) return '';
  if (date instanceof Date && !Number.isNaN(date.getTime())) {
    const pad = (value: number) => String(value).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }
  if (typeof date !== 'string') return '';
  const parts = date.split(' ');
  if (parts.length !== 2) return date;
  return `${parts[0].replace(/:/g, '-')} ${parts[1]}`;
};
