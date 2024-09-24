const url = "https://nitjfinal.onrender.com";
document.addEventListener("DOMContentLoaded", async() => {
    try {
        // Static data (commenting out the fetch part)
        const navbarData = 
            [
                {
                    "title": "Home",
                    "link": "/home",
                    "order": 1,
                    "submenus": [
                        {
                            "title": "Submenu 1",
                            "link": "/home/submenu1",
                            "order": 1
                        },
                        {
                            "title": "Submenu 2",
                            "link": "/home/submenu2",
                            "order": 2
                        }
                    ],
                    "show": true
                },
                {
                    "title": "About Us",
                    "link": "/about",
                    "order": 2,
                    "submenus": [
                        {
                            "title": "Our Story",
                            "link": "/about/our-story",
                            "order": 1
                        },
                        {
                            "title": "Our Team",
                            "link": "/about/our-team",
                            "order": 2
                        }
                    ],
                    "show": true
                },
                {
                    "title": "Services",
                    "link": "/services",
                    "order": 3,
                    "submenus": [
                        {
                            "title": "Consulting",
                            "link": "/services/consulting",
                            "order": 1
                        },
                        {
                            "title": "Development",
                            "link": "/services/development",
                            "order": 2
                        },
                        {
                            "title": "Design",
                            "link": "/services/design",
                            "order": 3
                        }
                    ],
                    "show": true
                },
                {
                    "title": "Contact",
                    "link": "/contact",
                    "order": 4,
                    "submenus": [],
                    "show": true
                },
                {
                    "title": "Blog",
                    "link": "/blog",
                    "order": 5,
                    "submenus": [
                        {
                            "title": "Latest Posts",
                            "link": "/blog/latest-posts",
                            "order": 1
                        },
                        {
                            "title": "Categories",
                            "link": "/blog/categories",
                            "order": 2
                        }
                    ],
                    "show": false
                }
            
            
        ];
        // const response = await fetch(`${url}/api/diia/navbar`);
        // const navbarData = await response.json();

        console.log(navbarData);

        
        // Generate dynamic navbar links
        const navBar = document.getElementById("nav-bar");
        navBar.innerHTML = "";  // Clear existing content
        navbarData.forEach(link => {
            if (link.submenus.length > 0) {
                // Create a dropdown for submenus
                const dropdown = document.createElement("div");
                dropdown.classList.add("relative", "group", "px-3");

                const linkAnchor = document.createElement("a");
                linkAnchor.href = link.link;
                linkAnchor.classList.add("hover:text-black", "bg-white", "cursor-pointer", "group", "transition-all", "rounded-full", "text-gray-500", "flex", "items-center");
                linkAnchor.textContent = link.title;
                dropdown.appendChild(linkAnchor);

                const subMenuDiv = document.createElement("div");
                subMenuDiv.classList.add("absolute", "hidden", "w-auto", "bg-white", "flex-col", "gap-3", "rounded-lg", "transition-all", "group-hover:flex", "shadow-slate-500", "shadow-sm", "overflow-hidden", "border-2", "hover:border-orange-500", "pt-3", "pb-5");

                link.submenus.forEach(subLink => {
                    const subMenuLink = document.createElement("a");
                    subMenuLink.href = subLink.link || "#";  // Add the proper link here
                    subMenuLink.classList.add("text-[12px]", "text-blue-700", "hover:text-orange-500", "hover:bg-orange-50", "px-4", "whitespace-nowrap");
                    subMenuLink.textContent = subLink.title;
                    subMenuDiv.appendChild(subMenuLink);
                });

                dropdown.appendChild(subMenuDiv);
                navBar.appendChild(dropdown);
            } else {
                // Create normal links
                const navItem = document.createElement("div");
                navItem.classList.add("relative", "group", "text-gray-500", "hover:text-black");

                const linkAnchor = document.createElement("a");
                linkAnchor.href = link.link;
                linkAnchor.classList.add("relative", "px-2", "bg-white", "cursor-pointer", "group", "transition-all", "rounded-full");
                linkAnchor.textContent = link.title;

                navItem.appendChild(linkAnchor);
                navBar.appendChild(navItem);
            }
        });

        // Update the CTA button
        const ctaButton = document.querySelector("a[href='https://www.nitj.ac.in'] button");
        if (ctaButton) {
            ctaButton.textContent = "NITJ-Home"; // Example text
            ctaButton.parentElement.href = "https://www.nitj.ac.in"; // Example link
        }

        // Handle mobile menu items
        const mobileNavDialog = document.getElementById("nav-dialog");
        mobileNavDialog.innerHTML = "";  // Clear existing content
        navbarData.forEach(link => {
            if (link.show) {
                const menuLink = document.createElement("a");
                menuLink.href = link.link;
                menuLink.classList.add("block", "p-3", "mt-3", "font-medium", "border-2", "border-orange-500", "rounded-lg", "hover:text-blue-700", "hover:bg-orange-100");
                menuLink.textContent = link.title;

                mobileNavDialog.appendChild(menuLink);
            }
        });
    } catch (error) {
        console.error("Error rendering navbar data:", error);
    }
});
