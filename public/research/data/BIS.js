let data_url = "/api";

fetch(`${data_url}` + '/research/BIS/get')
  .then((response) => response.json())
  .then((data) => {
    bannerScrolldata = data.banner_scroll_data;

    var i = 1;
    const ugupdates = document.getElementById('industriesdata')
    bannerScrolldata.forEach((update) => {
      const ugupdate = document.createElement('tr')
      ugupdate.innerHTML = `
    <td class="border px-8 py-2 text-sm " width="7%">${i}</td>
    <td class="border px-8 py-2 text-sm " width="7%">${update.id}</td>
    <td class="border px-8 py-2 text-sm" width="14%">${update.title}</td>
    <td class="border px-8 py-2 text-sm" width="46%">${update.description}</td>
    <td class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 border px-8 py-2 text-sm" width="13%"><a href="${update.url}">${update.url}</td>
    <td class="border px-8 py-2 text-sm" width="13%">${update.created_at}</td>
    ` 
      ugupdates.appendChild(ugupdate)
      i++;
    })
  })