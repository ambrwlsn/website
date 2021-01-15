module.exports = function(text, purpose) {
  if (!text && !purpose) {
    return null;
  }

  if (purpose === 'why') {
    return `<div class="card why-card">${text}</div>`;
  }

  return `<div class="card">${text}</div>`;
};
