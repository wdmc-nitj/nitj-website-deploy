document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch("/api/navbar");
      const navbarData = await response.json();
  
      // Update the logo
      document.querySelector("#brand img").src = navbarData.logo;
      
      // Update brand name
      document.querySelector("#brand span").textContent = navbarData.brandName;
  
      // Generate dynamic navbar links
      const navBar = document.getElementById("nav-bar");
      navbarData.links.forEach(link => {
        if (link.subMenu) {
          // Create a dropdown for subMenu
          const dropdown = document.createElement("div");
          dropdown.classList.add("relative", "group", "px-3");
  
          const linkAnchor = document.createElement("a");
          linkAnchor.href = link.href;
          linkAnchor.classList.add("hover:text-black", "bg-white", "cursor-pointer", "group", "transition-all", "rounded-full", "text-gray-500", "flex", "items-center");
          linkAnchor.textContent = link.title;
          dropdown.appendChild(linkAnchor);
  
          const subMenuDiv = document.createElement("div");
          subMenuDiv.classList.add("absolute", "hidden", "w-auto", "bg-white", "flex-col", "gap-3", "rounded-lg", "transition-all", "group-hover:flex", "shadow-slate-500", "shadow-sm", "overflow-hidden", "border-2", "hover:border-orange-500", "pt-3", "pb-5");
  
          link.subMenu.forEach(subLink => {
            const subMenuLink = document.createElement("a");
            subMenuLink.href = "#";  // Add proper links here
            subMenuLink.classList.add("text-[12px]", "text-blue-700", "hover:text-orange-500", "hover:bg-orange-50", "px-4", "whitespace-nowrap");
            subMenuLink.textContent = subLink;
            subMenuDiv.appendChild(subMenuLink);
          });
  
          dropdown.appendChild(subMenuDiv);
          navBar.appendChild(dropdown);
        } else {
          // Create normal links
          const navItem = document.createElement("div");
          navItem.classList.add("relative", "group", "text-gray-500", "hover:text-black");
  
          const linkAnchor = document.createElement("a");
          linkAnchor.href = link.href;
          linkAnchor.classList.add("relative", "px-2", "bg-white", "cursor-pointer", "group", "transition-all", "rounded-full");
          linkAnchor.textContent = link.title;
  
          navItem.appendChild(linkAnchor);
          navBar.appendChild(navItem);
        }
      });
  
      // Update the CTA button
      const ctaButton = document.querySelector("a[href='https://www.nitj.ac.in'] button");
      ctaButton.textContent = navbarData.ctaButton.text;
      ctaButton.parentElement.href = navbarData.ctaButton.href;
    } catch (error) {
      console.error("Error fetching navbar data:", error);
    }
  });
  