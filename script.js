const nav = document.getElementById("nav");
const toggle = document.querySelector(".menu-toggle");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

const dateInput = document.getElementById("date");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
dateInput.min = localToday;

document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const guests = document.getElementById("guests").value;
  const note = document.getElementById("note").value.trim();

  if (!/^[0-9]{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  const dateObj = new Date(date + "T00:00:00");
  const formattedDate = dateObj.toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric"
  });

  const message =
`🍽️ *New Table Booking Request*
*Your Choice Family Restaurant*

👤 Name: ${name}
📱 Customer Mobile: ${phone}
📅 Date: ${formattedDate}
🕐 Time: ${time}
👥 Guests: ${guests}
${note ? `📝 Special Request: ${note}` : ""}

📍 HPL Link Rd, Manjushree, Durgachak, Haldia
⚠️ Please confirm the table booking.`;

  const whatsappUrl = "https://wa.me/917364989504?text=" + encodeURIComponent(message);
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

document.getElementById("year").textContent = new Date().getFullYear();


// Full-screen gallery lightbox. Clicking the Gallery navigation opens the gallery instead of scrolling down.
const galleryImages = Array.from(document.querySelectorAll('.gallery img'));
const lightbox = document.getElementById('galleryLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxAlt = document.getElementById('lightboxAlt');
const galleryNav = document.getElementById('galleryNav');
let galleryIndex = 0;

function openGallery(index = 0) {
  if (!galleryImages.length) return;
  galleryIndex = (index + galleryImages.length) % galleryImages.length;
  const image = galleryImages[galleryIndex];
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCounter.textContent = `${galleryIndex + 1} / ${galleryImages.length}`;
  lightboxAlt.textContent = image.alt || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
}
function closeGallery() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
}
function moveGallery(step) { openGallery(galleryIndex + step); }

galleryImages.forEach((image, index) => image.addEventListener('click', () => openGallery(index)));
galleryNav?.addEventListener('click', (e) => { e.preventDefault(); openGallery(0); nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
document.querySelector('.lightbox-close')?.addEventListener('click', closeGallery);
document.querySelector('.lightbox-prev')?.addEventListener('click', () => moveGallery(-1));
document.querySelector('.lightbox-next')?.addEventListener('click', () => moveGallery(1));
lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeGallery(); });
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeGallery();
  if (e.key === 'ArrowLeft') moveGallery(-1);
  if (e.key === 'ArrowRight') moveGallery(1);
});
let touchStartX = 0;
lightbox?.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, {passive:true});
lightbox?.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(dx) > 50) moveGallery(dx < 0 ? 1 : -1);
}, {passive:true});
