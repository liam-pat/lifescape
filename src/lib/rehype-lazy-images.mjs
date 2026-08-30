export default function rehypeLazyImages() {
  return (tree) => {
    const visit = (node) => {
      if (!node || typeof node !== 'object') return;

      if (node.type === 'element' && node.tagName === 'img') {
        node.properties ||= {};
        node.properties.loading ||= 'lazy';
        node.properties.decoding ||= 'async';

        let srcStr = node.properties.src || '';
        let altStr = node.properties.alt || '';

        if (typeof srcStr === 'string' || typeof altStr === 'string') {
          // Parse specific hashes from both src and alt
          const hasLive = srcStr.includes('#live') || altStr.includes('#live');
          // Mark iPhone HEIC images as HDR.
          // Keep #hdr for other formats.
          const isHeic = /\.heic($|\?|#)/i.test(srcStr);
          const hasHdr = isHeic || srcStr.includes('#hdr') || altStr.includes('#hdr');

          if (hasLive || hasHdr) {
            // HAST uses camelCase for data attributes.
            if (hasLive) {
              node.properties.dataLive = 'true';
            }
            if (hasHdr) {
              node.properties.dataHdr = 'true';
            }

            // Remove the hashes so the URL is clean
            if (typeof srcStr === 'string') node.properties.src = srcStr.replace(/#.*$/, '');
            if (typeof altStr === 'string') node.properties.alt = altStr.replace(/#(live|hdr)(-hdr|-live)?/g, '').trim();
          }
        }
      }

      if (Array.isArray(node.children)) {
        node.children.forEach(visit);
      }
    };

    visit(tree);
  };
}
