/* Sai Koushik — portfolio interactions
   1. Page-load sequence (waits for fonts so the name doesn't reflow mid-animation)
   2. Nav tone + active section
   3. Cyanotype portrait that develops under the cursor
   4. Hero grid parallax
   5. Experience timeline drawn by scroll position
   6. Project sheets that tilt toward the cursor
   7. Copy-email button
*/
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* 1. Page-load sequence ------------------------------------------------ */
  var started = false;
  function start() {
    if (started) return;
    started = true;
    root.classList.add('is-loaded');
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(start);
  }
  setTimeout(start, 1500); // never wait on a slow font server

  /* 2. Nav tone + active section ---------------------------------------- */
  var nav = document.querySelector('.nav');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var toned = Array.prototype.slice.call(document.querySelectorAll('[data-tone]'));
  var toneObserver = null;

  function watchTone() {
    if (toneObserver) toneObserver.disconnect();
    var navH = nav.offsetHeight;
    // Observe a one-pixel line just below the nav: whichever section crosses it sets the tone.
    var bottom = Math.max(0, window.innerHeight - navH - 1);
    toneObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        document.body.dataset.tone = entry.target.dataset.tone;
        var id = entry.target.id;
        navLinks.forEach(function (a) {
          var active = id && a.getAttribute('href') === '#' + id;
          if (active) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-' + navH + 'px 0px -' + bottom + 'px 0px', threshold: 0 });
    toned.forEach(function (el) { toneObserver.observe(el); });
  }
  watchTone();
  window.addEventListener('resize', debounce(watchTone, 150));

  /* 3. Cyanotype portrait ------------------------------------------------- */
  var print = document.querySelector('.print');
  var colorLayer = print && print.querySelector('.print-color');
  if (print && colorLayer) {
    var HOVER_RADIUS = 115;
    var FULL_RADIUS = 1600;
    var target = { x: 50, y: 50, r: 0 };
    var current = { x: 50, y: 50, r: 0 };
    var developed = false;
    var frame = null;

    function render() {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      current.r += (target.r - current.r) * 0.12;
      colorLayer.style.setProperty('--mx', current.x + '%');
      colorLayer.style.setProperty('--my', current.y + '%');
      colorLayer.style.setProperty('--r', current.r + 'px');
      var settled = Math.abs(target.r - current.r) < 0.5 &&
                    Math.abs(target.x - current.x) < 0.1 &&
                    Math.abs(target.y - current.y) < 0.1;
      frame = settled ? null : requestAnimationFrame(render);
    }
    function kick() { if (!frame) frame = requestAnimationFrame(render); }

    print.addEventListener('pointermove', function (e) {
      if (developed) return;
      var box = print.getBoundingClientRect();
      target.x = ((e.clientX - box.left) / box.width) * 100;
      target.y = ((e.clientY - box.top) / box.height) * 100;
      target.r = HOVER_RADIUS;
      kick();
    });
    print.addEventListener('pointerleave', function () {
      if (developed) return;
      target.r = 0;
      kick();
    });
    print.addEventListener('click', function (e) {
      developed = !developed;
      print.setAttribute('aria-pressed', String(developed));
      if (developed) {
        var box = print.getBoundingClientRect();
        // Develop outward from where the click landed (or the centre, for keyboard).
        if (e.clientX || e.clientY) {
          target.x = ((e.clientX - box.left) / box.width) * 100;
          target.y = ((e.clientY - box.top) / box.height) * 100;
        } else {
          target.x = 50; target.y = 50;
        }
        target.r = FULL_RADIUS;
      } else {
        target.r = 0;
      }
      if (reduceMotion) { current.x = target.x; current.y = target.y; current.r = target.r; }
      kick();
    });
  }

  /* 4. Hero grid parallax ------------------------------------------------- */
  var hero = document.querySelector('.hero');
  if (hero && finePointer && !reduceMotion) {
    hero.addEventListener('pointermove', function (e) {
      var px = (e.clientX / window.innerWidth) * 2 - 1;
      var py = (e.clientY / window.innerHeight) * 2 - 1;
      hero.style.setProperty('--px', (-px).toFixed(3));
      hero.style.setProperty('--py', (-py).toFixed(3));
    });
  }

  /* 5. Timeline progress -------------------------------------------------- */
  var timeline = document.querySelector('.timeline');
  if (timeline) {
    var updateTimeline = function () {
      var box = timeline.getBoundingClientRect();
      var lead = window.innerHeight * 0.72; // the line reaches a point as it passes ~72% down the screen
      var progress = (lead - box.top) / box.height;
      progress = Math.max(0, Math.min(1, progress));
      timeline.style.setProperty('--progress', progress.toFixed(3));
    };
    window.addEventListener('scroll', updateTimeline, { passive: true });
    window.addEventListener('resize', updateTimeline);
    updateTimeline();
  }

  /* 6. Sheet tilt --------------------------------------------------------- */
  if (finePointer && !reduceMotion) {
    Array.prototype.forEach.call(document.querySelectorAll('.sheet'), function (sheet) {
      sheet.addEventListener('pointermove', function (e) {
        var box = sheet.getBoundingClientRect();
        var x = (e.clientX - box.left) / box.width;
        var y = (e.clientY - box.top) / box.height;
        sheet.style.setProperty('--ry', ((x - 0.5) * 10).toFixed(2) + 'deg');
        sheet.style.setProperty('--rx', ((0.5 - y) * 8).toFixed(2) + 'deg');
        sheet.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
        sheet.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
      });
      sheet.addEventListener('pointerleave', function () {
        sheet.style.setProperty('--rx', '0deg');
        sheet.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* 7. Copy email --------------------------------------------------------- */
  var copyBtn = document.querySelector('.copy');
  if (copyBtn) {
    var label = copyBtn.textContent;
    var resetTimer = null;
    copyBtn.addEventListener('click', function () {
      var text = copyBtn.getAttribute('data-copy');
      var done = function () {
        copyBtn.textContent = 'Copied';
        copyBtn.classList.add('done');
        clearTimeout(resetTimer);
        resetTimer = setTimeout(function () {
          copyBtn.textContent = label;
          copyBtn.classList.remove('done');
        }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
      } else {
        fallbackCopy(text);
        done();
      }
    });
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (err) { /* nothing to do */ }
    document.body.removeChild(ta);
  }

  function debounce(fn, wait) {
    var t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, wait);
    };
  }
})();
