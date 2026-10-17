const destinations = {
  poctoy: {
    title: 'Poctoy White Beach',
    kicker: 'TORRIJOS · COAST',
    description: 'A well-loved public beach in Torrijos, known for its pale sand and views toward Mount Malindig. Visit with care, use marked access points, and bring reusable essentials.',
    note: 'Check local advisories for conditions, facilities, fees, and swimming guidance. Please leave the shoreline as you found it.'
  },
  boac: {
    title: 'Boac Cathedral',
    kicker: 'BOAC · HERITAGE',
    description: 'The Immaculate Conception Cathedral stands above Boac’s historic town center. Its church and surrounding streets are part of a living community, not only a visitor attraction.',
    note: 'Dress respectfully, keep voices low during services, and confirm visiting hours locally.'
  },
  'tres-reyes': {
    title: 'Tres Reyes Islands',
    kicker: 'GASAN · ISLANDS',
    description: 'The Tres Reyes group, named Melchor, Gaspar, and Baltazar, lies off the coast of Gasan. Local boat operators can advise about access, sea conditions, and responsible island visits.',
    note: 'Arrange transport with a local operator, wear a life jacket, and follow guidance on protected areas and waste.'
  },
  bathala: {
    title: 'Bathala Cave',
    kicker: 'SANTA CRUZ · CAVES',
    description: 'Bathala Cave is among Marinduque’s notable cave destinations. Cave environments are fragile and can be hazardous without local knowledge and suitable equipment.',
    note: 'Visit only when access is permitted and with an experienced local guide. Do not touch formations or disturb wildlife.'
  },
  'luzon-datum': {
    title: 'Luzon Datum of 1911',
    kicker: 'GASAN · LANDMARK',
    description: 'This historic geodetic reference point in Gasan played a role in establishing a national surveying datum. It connects Marinduque to the story of how the Philippines was mapped.',
    note: 'Check current access and road conditions with local tourism staff before making the trip.'
  },
  maniwaya: {
    title: 'Maniwaya Island',
    kicker: 'SANTA CRUZ · ISLAND',
    description: 'Maniwaya is an island community in Santa Cruz, often visited for its beaches and nearby sandbars. Its rhythms depend on tides, weather, and the people who live there.',
    note: 'Confirm boat schedules and tide conditions. Support island-based businesses and pack out all waste.'
  }
};

const culturalNotes = {
  moriones: {
    title: 'The Moriones tradition',
    kicker: 'HOLY WEEK · LIVING HERITAGE',
    description: 'The Moriones is a Holy Week tradition associated with Marinduque. Participants wear carved masks and costumes representing Roman soldiers, bringing the story of Longinus to life through local processions and community events.',
    note: 'It is a religious and community tradition. Be a respectful observer, ask before taking photographs, and follow event organizers’ guidance. Dates and activities vary by town and year.'
  },
  craft: {
    title: 'Island craftsmanship',
    kicker: 'MADE WITH CARE',
    description: 'Across Marinduque, makers carry practical skills and creative traditions into daily life. The best way to discover local craft is to meet makers through community-led experiences and learn the story behind each piece.',
    note: 'Buy directly from local makers when possible, ask permission before photographing their work, and avoid bargaining in ways that undervalue skilled labor.'
  },
  community: {
    title: 'Stories & community',
    kicker: 'LISTEN CLOSELY',
    description: 'Place names, family histories, foodways, and celebrations hold knowledge that rarely fits on a sign. Local residents are the keepers of these stories, and every visit is an opportunity to listen and learn.',
    note: 'Ask thoughtful questions, respect boundaries, and treat people as hosts and neighbors rather than attractions.'
  }
};

const galleryPhotos = [
  { src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=88', alt: 'Waves rolling onto a tropical beach', caption: 'Along the coast' },
  { src: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1600&q=88', alt: 'A green island surrounded by clear blue sea', caption: 'Island light' },
  { src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=88', alt: 'A shaded path through lush trees', caption: 'Green paths' },
  { src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=88', alt: 'Quiet tropical shore under a sunlit sky', caption: 'Blue horizon' }
];

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
const infoDialog = document.querySelector('#info-dialog');
const viewerDialog = document.querySelector('#viewer-dialog');
let activePhoto = 0;

function setMenuOpen(isOpen) {
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  siteNav.classList.toggle('is-open', isOpen);
}

menuToggle.addEventListener('click', () => {
  setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});

siteNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenuOpen(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

const filterButtons = [...document.querySelectorAll('.filter-button')];
const destinationCards = [...document.querySelectorAll('.destination-card')];
const filterStatus = document.querySelector('#filter-status');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle('is-active', isActive);
      filterButton.setAttribute('aria-pressed', String(isActive));
    });

    destinationCards.forEach((card) => {
      const matches = selectedFilter === 'all' || card.dataset.category.split(' ').includes(selectedFilter);
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    const categoryName = button.textContent.trim().replace(/\d+/g, '').trim();
    filterStatus.textContent = `${visibleCount} ${visibleCount === 1 ? 'destination' : 'destinations'} shown for ${categoryName}.`;
  });
});

function showInfo(item, fallbackKicker) {
  if (!item) return;
  document.querySelector('#info-kicker').textContent = item.kicker || fallbackKicker;
  document.querySelector('#info-title').textContent = item.title;
  document.querySelector('#info-description').textContent = item.description;
  document.querySelector('#info-note').textContent = item.note;
  infoDialog.showModal();
}

document.addEventListener('click', (event) => {
  const placeButton = event.target.closest('[data-place]');
  const cultureButton = event.target.closest('[data-culture]');
  if (placeButton) showInfo(destinations[placeButton.dataset.place], 'DESTINATION');
  if (cultureButton) showInfo(culturalNotes[cultureButton.dataset.culture], 'CULTURE');
});

document.querySelector('.dialog-close').addEventListener('click', () => infoDialog.close());
infoDialog.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') infoDialog.close();
});
infoDialog.addEventListener('click', (event) => {
  if (event.target === infoDialog) infoDialog.close();
});

const galleryTrack = document.querySelector('.gallery-track');
document.querySelector('.gallery-prev').addEventListener('click', () => {
  galleryTrack.scrollBy({ left: -galleryTrack.clientWidth * 0.7, behavior: 'smooth' });
});
document.querySelector('.gallery-next').addEventListener('click', () => {
  galleryTrack.scrollBy({ left: galleryTrack.clientWidth * 0.7, behavior: 'smooth' });
});

document.querySelectorAll('[data-gallery]').forEach((button) => {
  button.addEventListener('click', () => openPhoto(Number(button.dataset.gallery)));
});

function openPhoto(index) {
  activePhoto = (index + galleryPhotos.length) % galleryPhotos.length;
  const photo = galleryPhotos[activePhoto];
  document.querySelector('#viewer-image').src = photo.src;
  document.querySelector('#viewer-image').alt = photo.alt;
  document.querySelector('#viewer-caption').textContent = photo.caption;
  document.querySelector('#viewer-count').textContent = `${String(activePhoto + 1).padStart(2, '0')} / ${String(galleryPhotos.length).padStart(2, '0')}`;
  if (!viewerDialog.open) viewerDialog.showModal();
}

document.querySelector('.viewer-back').addEventListener('click', () => openPhoto(activePhoto - 1));
document.querySelector('.viewer-forward').addEventListener('click', () => openPhoto(activePhoto + 1));
document.querySelector('.viewer-close').addEventListener('click', () => viewerDialog.close());
viewerDialog.addEventListener('click', (event) => {
  if (event.target === viewerDialog) viewerDialog.close();
});
viewerDialog.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') viewerDialog.close();
  if (event.key === 'ArrowLeft') openPhoto(activePhoto - 1);
  if (event.key === 'ArrowRight') openPhoto(activePhoto + 1);
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
