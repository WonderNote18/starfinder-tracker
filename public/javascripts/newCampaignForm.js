const form = document.querySelector('form');
const errorCampaignCreate = document.querySelector('.errorCampaignCreate');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // get values from form
  const campaignName = form.campaignName.value;
  const campaignDescription = form.campaignDescription.value;

  try {
    const res = await fetch('/overview/campaigns/create', {
      method: 'POST',
      body: JSON.stringify({
        campaignName: campaignName,
        campaignDescription: campaignDescription
      }),
      headers: {'Content-Type': 'application/json'}
    });

    const data = await res.json();
    if (data.errors) {
      errorCampaignCreate.textContent = data.errors;
    } else if (data.campaign) {
      location.assign('/overview/campaigns');
    }
  } catch (err) {
    console.error(err);
  }
} )