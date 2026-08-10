/**
 * Live Photo Kit — lazy init helper
 *
 * - LivePhotosKit auto-augments [data-live-photo] on DOMContentLoaded.
 *   This script ensures:
 *     1) Elements added via frontmatter are correctly initialized even if
 *        the CDN script loads after DOMContentLoaded (via `livephotoskitloaded`).
 *     2) Video is NOT proactively loaded until interaction or intersection
 *        (data-proactively-loads-video="false" is the default in the include).
 *     3) Graceful fallback: if JS fails, static <img> remains visible.
 *
 * CDN: https://cdn.apple-livephotoskit.com/lpk/1/livephotoskit.js (v1.5.8)
 * Unpkg alt: https://unpkg.com/livephotoskit@1.5.8/livephotoskit.js
 * License: Apple LivePhotosKit — do not modify; use as-is.
 */
(function () {
  'use strict';

  function augmentAll() {
    if (!window.LivePhotosKit || !window.LivePhotosKit.augmentElementAsPlayer) return;
    var els = document.querySelectorAll('[data-live-photo]:not([data-live-photo-augmented])');
    els.forEach(function (el) {
      // Respect per-element opt-in for proactive loading (default false)
      var proactive = el.getAttribute('data-proactively-loads-video');
      // Only augment; CDN also does auto-init, but re-augment is no-op / guarded.
      try {
        window.LivePhotosKit.augmentElementAsPlayer(el, {
          proactivelyLoadsVideo: proactive === 'true',
          showsNativeControls: true
        });
        el.setAttribute('data-live-photo-augmented', 'true');
      } catch (e) {
        // Leave fallback image visible
        console.warn('LivePhotosKit augment failed', e);
      }
    });
  }

  // If LivePhotosKit already loaded, augment now.
  if (window.LivePhotosKit) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', augmentAll);
    } else {
      augmentAll();
    }
  }

  // CDN fires this when it finishes loading (in case it loaded after DOMContentLoaded)
  document.addEventListener('livephotoskitloaded', augmentAll);

  // Fallback poll for late injection (async script)
  var tries = 0;
  var poll = setInterval(function () {
    if (window.LivePhotosKit) {
      augmentAll();
      clearInterval(poll);
    } else if (++tries > 40) {
      clearInterval(poll);
    }
  }, 250);
})();
