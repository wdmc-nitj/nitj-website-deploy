function genFooterSocial(edata) {
    let footerSocial = document.createElement('div')
    footerSocial.setAttribute('class', 'footer-social flex gap-5 mt-5')
    for (x in edata) {
        let a = document.createElement('a')
        a.setAttribute('href', edata[x].link)
        a.setAttribute("class", 'text-[#0B407A] text-2xl hover:text-[#FF7F50]')
        let i = document.createElement('i')
        i.setAttribute('class', edata[x].logo)
        a.appendChild(i)
        footerSocial.appendChild(a)
    }
    return footerSocial
}

function genFooterMiddle(edata) {
    let fmul = document.createElement('ul')
    fmul.setAttribute('id', 'quick-links')
    fmul.setAttribute('class', 'list-none p-0')

    for (let x in edata) {
        let li = document.createElement('li')
        let a = document.createElement('a')
        a.setAttribute('href', edata[x].QuickLink[0])
        a.setAttribute('class', 'text-[#0B407A] text-base no-underline hover:underline hover:text-[#FF7F50]')
        a.innerHTML = edata[x].QuickLinkName[0]
        li.appendChild(a)
        fmul.appendChild(li)
    }

    return fmul
}
document.addEventListener('DOMContentLoaded', genFooter)
async function genFooter() {
    let footer = document.createElement('footer')
    footer.setAttribute('id', 'footer')
    footer.setAttribute('class', "bg-white p-10 text-[#0B407A] flex flex-col font-barlow")

    let footerContainer = document.createElement('div')
    footerContainer.setAttribute('class', 'footer-container flex justify-between items-start gap-10 flex-wrap border-b border-[#0B407A] pb-4')

    let footerLeft = document.createElement('div')
    footerLeft.setAttribute('class', 'footer-left flex-1 border-r border-[#0B407A] pr-5')

    {
        let footerLogo = document.createElement('div')
        footerLogo.setAttribute('class', 'footer-logo')
        {
            let img = document.createElement('img')
            img.setAttribute('src', '/public/assets/images/logo_250.png')
            img.setAttribute('class', 'max-w-[150px] h-auto')
            let h2 = document.createElement('h2')
            h2.setAttribute('class', 'text-2xl font-bold text-[#0B407A] m-0')
            h2.innerHTML = 'Dr B R Ambedkar National Institute of Technology Jalandhar'
            // footerLogo.appendChild(img)
            footerLogo.appendChild(h2)
        }
        footerLeft.appendChild(footerLogo)

        let footerDetails = document.createElement('div')
        footerDetails.setAttribute('class', 'footer-details mt-4')
        {
            let p1 = document.createElement('p')
            p1.setAttribute('class', 'text-base flex items-center mb-2')
            let l1 = document.createElement('i')
            l1.setAttribute('class', 'fas fa-map-marker-alt mr-2')
            p1.appendChild(l1)
            p1.innerHTML += ' G.T Road, Amritsar Bypass, Jalandhar, Punjab, India-14408'

            let p2 = document.createElement('p')
            p2.setAttribute('class', 'text-base flex items-center')
            let l2 = document.createElement('i')
            l2.setAttribute('class', 'fas fa-phone-alt mr-2')
            p2.appendChild(l2)
            p2.innerHTML += ' +91-0181-5037855, 2690301, 2690453, 3082000'

            footerDetails.appendChild(p1)
            footerDetails.appendChild(p2)
        }
        footerLeft.appendChild(footerDetails)

        footerLeft.appendChild(genFooterSocial(
            [
                {
                    link: '#',
                    logo: 'fab fa-facebook'
                },
                {
                    link: '#',
                    logo: 'fab fa-instagram'
                },
                {
                    link: '#',
                    logo: 'fab fa-twitter'
                },
                {
                    link: '#',
                    logo: 'fab fa-linkedin'
                },
                {
                    link: '#',
                    logo: 'fab fa-youtube'
                }
            ]
        ))

    }
    footerContainer.appendChild(footerLeft)

    let footerMiddle = document.createElement('div')
    footerMiddle.setAttribute('class', 'footer-middle flex-1')
    let fmh4 = document.createElement('h4')
    fmh4.setAttribute('class', 'text-xl font-semibold mb-4 text-[#0B407A]')
    fmh4.innerHTML = 'Quick Links'
    footerMiddle.appendChild(fmh4)
    try {
        const response = await fetch('/api/diia/footer', {
            method: 'get',
            headers: {
                'Content-Type': 'applicatio/json'
            }
        })
        if (response.status == 200) {
            const data = await response.json()
            if (data) footerMiddle.appendChild(genFooterMiddle(data))
        }
    } catch (e) { console.log(e) }

    footerContainer.appendChild(footerMiddle)

    let footerRight = document.createElement('div')
    footerRight.setAttribute('class', 'footer-right flex-1 text-center')
    {
        let h4 = document.createElement('h4')
        h4.innerHTML = 'Visitors'
        h4.setAttribute('class', 'text-xl font-semibold mb-4 text-[#0B407A]')
        let flagCounter = document.createElement('div')
        flagCounter.setAttribute('id', 'flagCounter')
        let a = document.createElement('a')
        a.setAttribute('href', "https://www.worldflagcounter.com/details/iL8")
        let img = document.createElement('img')
        img.setAttribute('src', "https://www.worldflagcounter.com/iL8/")
        img.setAttribute('alt', "Flag Counter")
        img.setAttribute('class', "max-w-full")
        a.appendChild(img)
        flagCounter.appendChild(a)

        footerRight.appendChild(h4)
        // footerRight.appendChild(flagCounter)
    }
    footerContainer.appendChild(footerRight)

    let footerBottom = document.createElement("div")
    footerBottom.setAttribute('class', 'footer-bottom text-center mt-5 text-sm font-medium text-[#0B407A]')
    let fbp = document.createElement('p')
    fbp.innerHTML = '&copy; 2024 Dr B R Ambedkar National Institute of Technology Jalandhar. All Rights Reserved.'
    footerBottom.appendChild(fbp)

    footer.appendChild(footerContainer)
    footer.appendChild(footerBottom)

    document.body.append(footer)
}
