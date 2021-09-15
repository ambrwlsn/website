module.exports = function(text, purpose) {
  if (!text && !purpose) {
    return null;
  }

  if (purpose === 'why') {
    return `<div class="card why-card"><span class="card-icon" aria-hidden="true"></span>${text}</div>`;
  }

  return `<div class="card"><span class="card-icon" aria-hidden="true"></span>${text}</div>`;
};
