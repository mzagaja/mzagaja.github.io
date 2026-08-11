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
        // Hover anywhere on the photo triggers playback (not just the LIVE badge).
        // LivePhotosKit's native badge handles its own mouseenter/leave, but the
        // spec wants the whole player to play on hover/touch. Wire the element's
        // own events to the Player API. Guard against duplicate wiring.
        if (!el.hasAttribute('data-live-photo-hover')) {
          el.setAttribute('data-live-photo-hover', 'true');
          // el is now augmented — it has play()/pause()/isPlaying per LPK.
          // Use the element itself as the Player instance.
          var play = function () {
            try { if (el.play) el.play(); } catch (e2) {}
          };
          var stop = function () {
            try {
              if (el.beginFinishingPlaybackEarly) el.beginFinishingPlaybackEarly();
              else if (el.pause) el.pause();
            } catch (e3) {}
          };
          // Desktop: hover anywhere
          el.addEventListener('mouseenter', play);
          el.addEventListener('mouseleave', stop);
          // Keyboard focus
          el.addEventListener('focus', play);
          el.addEventListener('blur', stop);
          // Touch: play on press, finish on release
          el.addEventListener('touchstart', play, { passive: true });
          el.addEventListener('touchend', stop, { passive: true });
          el.addEventListener('touchcancel', stop, { passive: true });
          // Make the whole player appear interactive
          el.style.cursor = 'pointer';
          el.setAttribute('tabindex', '0');
          el.setAttribute('role', 'button');
          el.setAttribute('aria-label', el.getAttribute('aria-label') || 'Live Photo — hover to play');
        }
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
