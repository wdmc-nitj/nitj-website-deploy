function fetchFooterHTML() {
  fetch('/template/footer.html')
    .then((res) => res.text())
    .then((html) => {
      const tempFooter = document.createElement('div')
      tempFooter.innerHTML = html

      callAPI(tempFooter.querySelector('#quicklinks'))

      document.body.appendChild(tempFooter)
    })
}

function callAPI(container) {
  fetch('/api/footer/get/all')
    .then((res) => res.json())
    .then((result) => {
      // Sort result according to order
      result.sort((a, b) => a.order - b.order)

      const columns = [[], [], [], []]

      // Group items by column
      result.forEach((item) => {
        if (item.column >= 0 && item.column <= 3) {
          columns[item.column].push(item)
        }
      })
      const content = columns
        .map((columnItems, columnIndex) => {
          const columnHtml = columnItems
            .map(
              (item) => `
        <a href="${item.link}" class="hover:text-yellow-300 hover:underline">${item.title}</a>
      `
            )
            .join('')

          return `
        <div class="flex basis-1/4 flex-col px-6 text-xs lg:text-sm">
          ${
            columnIndex === 0
              ? '<h2 class="mb-4 text-xl font-semibold">Quick Links</h2>'
              : ''
          }
          ${columnHtml}
        </div>`
        })
        .join('')

      container.innerHTML = content
    })
    .catch((err) => {
      console.log(err)
    })
}

fetchFooterHTML()
