const form = document.querySelector('form');
const errorCampaignCreate = document.querySelector('.errorCampaignCreate');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // get values from form
  const caName = form.caName.value;
  const caDescription = form.caDescription.value;

  try {
    const res = await fetch('/overview/campaigns/create', {
      method: 'POST',
      body: JSON.stringify({
        caName: caName,
        caDescription: caDescription
      }),
      headers: {'Content-Type': 'application/json'}
    });

    const data = await res.json();
    if (data.errors) {
      errorCampaignCreate.textContent = data.errors.caName ||
      data.errors.caNameError ||
      data.errors.caDescription ||
      data.errors.caDescriptionError;
    } else if (data.campaign) {
      location.assign('/overview/campaigns');
    }
  } catch (err) {
    console.error(err);
  }
} )