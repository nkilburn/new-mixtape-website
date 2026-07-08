// ============================================
// MADE YOU A MIXTAPE — site scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- mobile nav ---- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const open = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', open);
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
    }));
  }

  /* ---- cassette players ----
     Any element with class "cassette" containing:
       - .play-btn (toggle)
       - .progress-track > .progress-fill
       - .waveform (bars, optional)
       - an <audio> element (data source)
     Only one plays at a time.
  */
  const allPlayers = Array.from(document.querySelectorAll('.cassette'));

  allPlayers.forEach(player => {
    const audio = player.querySelector('audio');
    const playBtn = player.querySelector('.play-btn');
    const progressTrack = player.querySelector('.progress-track');
    const progressFill = player.querySelector('.progress-fill');
    const timeCurrent = player.querySelector('.time-current');
    const timeTotal = player.querySelector('.time-total');
    const waveform = player.querySelector('.waveform');

    // build waveform bars once
    if (waveform && waveform.children.length === 0) {
      const barCount = 40;
      for (let i = 0; i < barCount; i++) {
        const bar = document.createElement('span');
        const h = 20 + Math.round(Math.random() * 80);
        bar.style.height = h + '%';
        bar.style.animationDelay = (Math.random() * 1).toFixed(2) + 's';
        waveform.appendChild(bar);
      }
    }

    if (!audio || !playBtn) return;

    const formatTime = (s) => {
      if (!isFinite(s)) return '0:00';
      const m = Math.floor(s / 60);
      const sec = Math.floor(s % 60).toString().padStart(2, '0');
      return `${m}:${sec}`;
    };

    audio.addEventListener('loadedmetadata', () => {
      if (timeTotal) timeTotal.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      if (progressFill && audio.duration) {
        progressFill.style.width = (audio.currentTime / audio.duration * 100) + '%';
      }
      if (timeCurrent) timeCurrent.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener('ended', () => {
      player.classList.remove('playing');
      if (progressFill) progressFill.style.width = '0%';
    });

    playBtn.addEventListener('click', () => {
      const isPlaying = player.classList.contains('playing');
      // pause all other players
      allPlayers.forEach(p => {
        if (p !== player) {
          p.classList.remove('playing');
          const a = p.querySelector('audio');
          if (a) a.pause();
        }
      });
      if (isPlaying) {
        audio.pause();
        player.classList.remove('playing');
      } else {
        audio.play().catch(() => {
          // demo audio may be blocked by autoplay policy on first interaction; ignore
        });
        player.classList.add('playing');
      }
    });

    if (progressTrack) {
      progressTrack.addEventListener('click', (e) => {
        const rect = progressTrack.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        if (audio.duration) audio.currentTime = pct * audio.duration;
      });
    }
  });

  /* ---- forms: front-end only demo handling ---- */
  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = form.parentElement.querySelector('.form-success') || form.nextElementSibling;
      if (success && success.classList.contains('form-success')) {
        success.classList.add('show');
      }
      form.reset();
    });
  });

  /* ---- footer year ---- */
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

});
