const VIDEO_EXTENSIONS = ['.mov', '.MOV', '.mp4'] as const;

const getAbortError = (signal: AbortSignal) => (
  signal.reason ?? new DOMException('Playback was cancelled.', 'AbortError')
);

const replaceExtension = (src: string, extension: string) => {
  const suffixIndex = src.search(/[?#]/);
  const path = suffixIndex === -1 ? src : src.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? '' : src.slice(suffixIndex);
  const nextPath = path.replace(/\.[^./]+$/, extension);

  return `${nextPath}${suffix}`;
};

export const getLivePhotoVideoSources = (src: string) => [
  ...new Set(VIDEO_EXTENSIONS.map((extension) => replaceExtension(src, extension))),
];

export const playLivePhoto = async (
  video: HTMLVideoElement,
  sources: string[],
  signal?: AbortSignal,
) => {
  let lastError: unknown;

  for (const source of sources) {
    if (signal?.aborted) throw getAbortError(signal);
    video.src = source;

    try {
      await video.play();
      if (signal?.aborted) throw getAbortError(signal);
      return;
    } catch (error) {
      if (signal?.aborted) throw getAbortError(signal);
      lastError = error;
    }
  }

  throw lastError ?? new Error('No Live Photo video source is available.');
};
