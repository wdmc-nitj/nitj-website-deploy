let slug = window.location.href.match(/[^#]+/g)
if(slug[slug.length-1]==="btech")
{
  
   document.getElementById("mtechadmission").style.display="none";
   document.getElementById("mtechssadmission").style.display="none";
   document.getElementById("mscadmission").style.display="none";
  document.getElementById("mbaadmission").style.display="none";
  document.getElementById("phdadmission").style.display="none";
  document.getElementById("bscbedadmission").style.display="none";
  document.getElementById("foreign").style.display="none";
  document.getElementById("btechadmission").style.display="block";
  document.getElementById("btechtab").style.display="block";
  document.getElementById("mtechtab").style.display="none";
  document.getElementById("mtechsstab").style.display="none";
  document.getElementById("msctab").style.display="none";
  document.getElementById("mbatab").style.display="none";
  document.getElementById("phdtab").style.display="none";
  document.getElementById("foreignadmissiontab").style.display="none";
  document.getElementById("bscbedtab").style.display="none";
    document.getElementsByClassName("active2")[0].classList.remove("active2");
if( document.getElementsByClassName("active2")[1])
  {
    document.getElementsByClassName("active2")[1].classList.remove("active2");
  }
  document.getElementById("btechsidetab").classList.add("active2");
  document.getElementById("respbtechsidetab").classList.add("active2");
  
}
if(slug[slug.length-1]==="mtech")
{

document.getElementById("btechadmission").style.display="none";
document.getElementById("mscadmission").style.display="none";
document.getElementById("mbaadmission").style.display="none";
document.getElementById("phdadmission").style.display="none";
document.getElementById("bscbedadmission").style.display="none";
document.getElementById("foreign").style.display="none";
document.getElementById("mtechadmission").style.display="block";
document.getElementById("mtechssadmission").style.display="none";
document.getElementById("btechtab").style.display="none";
document.getElementById("msctab").style.display="none";
document.getElementById("mbatab").style.display="none";
document.getElementById("phdtab").style.display="none";
document.getElementById("mtechsstab").style.display="none";
document.getElementById("foreignadmissiontab").style.display="none";
document.getElementById("mtechtab").style.display="block";
document.getElementById("bscbedtab").style.display="none";

document.getElementsByClassName("active2")[0].classList.remove("active2");
document.getElementById("mtechsidetab").classList.add("active2");
document.getElementById("respmtechsidetab").classList.add("active2");
document.getElementsByClassName("active2")[1].classList.remove("active2");
}
else if(slug[slug.length-1]==="mtechss")
{

document.getElementById("btechadmission").style.display="none";
document.getElementById("mscadmission").style.display="none";
document.getElementById("mbaadmission").style.display="none";
document.getElementById("phdadmission").style.display="none";
document.getElementById("bscbedadmission").style.display="none";
document.getElementById("foreign").style.display="none";
document.getElementById("mtechadmission").style.display="none";
document.getElementById("mtechssadmission").style.display="block";
document.getElementById("btechtab").style.display="none";
document.getElementById("msctab").style.display="none";
document.getElementById("mbatab").style.display="none";
document.getElementById("phdtab").style.display="none";
document.getElementById("mtechsstab").style.display="block";
document.getElementById("foreignadmissiontab").style.display="none";
document.getElementById("mtechtab").style.display="none";
document.getElementById("bscbedtab").style.display="none";

document.getElementsByClassName("active2")[0].classList.remove("active2");
document.getElementById("mtechsidetab").classList.remove("active2");
document.getElementById("respmtechsidetab").classList.remove("active2");
document.getElementById("mtechsssidetab").classList.add("active2");
document.getElementById("respmtechsssidetab").classList.add("active2");
document.getElementsByClassName("active2")[1].classList.remove("active2");
}

else if(slug[slug.length-1]==="msc")
{

document.getElementById("btechadmission").style.display="none";
document.getElementById("mtechadmission").style.display="none";
document.getElementById("mtechssadmission").style.display="none";
document.getElementById("mbaadmission").style.display="none";
document.getElementById("phdadmission").style.display="none";
document.getElementById("bscbedadmission").style.display="none";
document.getElementById("foreign").style.display="none";
document.getElementById("mscadmission").style.display="block";
document.getElementById("btechtab").style.display="none";
document.getElementById("mtechtab").style.display="none";
document.getElementById("mbatab").style.display="none";
document.getElementById("mtechsstab").style.display="none";
document.getElementById("phdtab").style.display="none";
document.getElementById("foreignadmissiontab").style.display="none";
document.getElementById("msctab").style.display="block";
document.getElementById("bscbedtab").style.display="none";

document.getElementsByClassName("active2")[0].classList.remove("active2");
document.getElementById("mscsidetab").classList.add("active2");
document.getElementById("respmscsidetab").classList.add("active2");
document.getElementsByClassName("active2")[1].classList.remove("active2");
}
else if(slug[slug.length-1]==="mba")
{

document.getElementById("btechadmission").style.display="none";
document.getElementById("mscadmission").style.display="none";
document.getElementById("mtechadmission").style.display="none";
document.getElementById("bscbedadmission").style.display="none";
document.getElementById("mtechssadmission").style.display="none";
document.getElementById("phdadmission").style.display="none";
document.getElementById("foreign").style.display="none";
document.getElementById("mbaadmission").style.display="block";
document.getElementById("btechtab").style.display="none";
document.getElementById("mtechtab").style.display="none";
document.getElementById("msctab").style.display="none";
document.getElementById("phdtab").style.display="none";
document.getElementById("foreignadmissiontab").style.display="none";
document.getElementById("mtechsstab").style.display="none";
document.getElementById("mbatab").style.display="block";
document.getElementById("bscbedtab").style.display="none";

document.getElementsByClassName("active2")[0].classList.remove("active2");
document.getElementById("mbasidetab").classList.add("active2");
document.getElementById("respmbasidetab").classList.add("active2");
document.getElementsByClassName("active2")[1].classList.remove("active2");
}
else if(slug[slug.length-1]==="phd")
{


document.getElementById("btechadmission").style.display="none";
document.getElementById("mscadmission").style.display="none";
document.getElementById("mbaadmission").style.display="none";
document.getElementById("mtechadmission").style.display="none";
document.getElementById("mtechssadmission").style.display="none";
document.getElementById("foreign").style.display="none";
document.getElementById("phdadmission").style.display="block";
document.getElementById("bscbedadmission").style.display="none";
document.getElementById("btechtab").style.display="none";
document.getElementById("mtechtab").style.display="none";
document.getElementById("msctab").style.display="none";
document.getElementById("mbatab").style.display="none";
document.getElementById("mtechsstab").style.display="none";
document.getElementById("bscbedtab").style.display="none";
document.getElementById("foreignadmissiontab").style.display="none";
document.getElementById("phdtab").style.display="block";
document.getElementsByClassName("active2")[0].classList.remove("active2");
document.getElementById("phdsidetab").classList.add("active2");
document.getElementById("respphdsidetab").classList.add("active2");
document.getElementsByClassName("active2")[1].classList.remove("active2");
}
else if(slug[slug.length-1]==="foreign_admissions")
{


document.getElementById("btechadmission").style.display="none";
document.getElementById("mscadmission").style.display="none";
document.getElementById("mbaadmission").style.display="none";
document.getElementById("phdadmission").style.display="none";
document.getElementById("mtechadmission").style.display="none";
document.getElementById("mtechssadmission").style.display="none";
document.getElementById("foreign").style.display="block";
document.getElementById("bscbedadmission").style.display="none";

document.getElementById("btechtab").style.display="none";
document.getElementById("mtechtab").style.display="none";
document.getElementById("msctab").style.display="none";
document.getElementById("mbatab").style.display="none";
document.getElementById("phdtab").style.display="none";
document.getElementById("mtechsstab").style.display="none";
document.getElementById("foreignadmissiontab").style.display="block";
document.getElementById("bscbedtab").style.display="none";

document.getElementsByClassName("active2")[0].classList.remove("active2");
document.getElementById("foreignsidetab").classList.add("active2");
document.getElementById("respforeignsidetab").classList.add("active2");
document.getElementsByClassName("active2")[1].classList.remove("active2");
}
else if(slug[slug.length-1]==="bscbed")
{


document.getElementById("btechadmission").style.display="none";
document.getElementById("mscadmission").style.display="none";
document.getElementById("mbaadmission").style.display="none";
document.getElementById("mtechadmission").style.display="none";
document.getElementById("mtechssadmission").style.display="none";
document.getElementById("bscbedadmission").style.display="block";
document.getElementById("foreign").style.display="none";
document.getElementById("phdadmission").style.display="none";
document.getElementById("btechtab").style.display="none";
document.getElementById("mtechtab").style.display="none";
document.getElementById("msctab").style.display="none";
document.getElementById("mbatab").style.display="none";
document.getElementById("mtechsstab").style.display="none";
document.getElementById("bscbedtab").style.display="block";
document.getElementById("foreignadmissiontab").style.display="none";
document.getElementById("phdtab").style.display="none";

document.getElementsByClassName("active2")[0].classList.remove("active2");
document.getElementById("bscbedsidetab").classList.add("active2");
document.getElementById("respbscbedsidetab").classList.add("active2");
document.getElementsByClassName("active2")[1].classList.remove("active2");
}

 window.onhashchange = function(){
  let slug = window.location.href.match(/[^#]+/g)
  console.log(slug);
  if(slug[slug.length-1]==="btech")
  {
    
     document.getElementById("mtechadmission").style.display="none";    
       document.getElementById("mtechssadmission").style.display="none";
    document.getElementById("mscadmission").style.display="none";
    document.getElementById("mbaadmission").style.display="none";
    document.getElementById("phdadmission").style.display="none";
    document.getElementById("bscbedadmission").style.display="none";
    document.getElementById("foreign").style.display="none";
    document.getElementById("btechadmission").style.display="block";
    document.getElementById("btechtab").style.display="block";
    document.getElementById("mtechtab").style.display="none";
    document.getElementById("mtechsstab").style.display="none";
    document.getElementById("msctab").style.display="none";
    document.getElementById("mbatab").style.display="none";
    document.getElementById("phdtab").style.display="none";
    document.getElementById("foreignadmissiontab").style.display="none";
    document.getElementById("bscbedtab").style.display="none";
      document.getElementsByClassName("active2")[0].classList.remove("active2");
if( document.getElementsByClassName("active2")[0])
  {
    document.getElementsByClassName("active2")[0].classList.remove("active2");
  }
  if( document.getElementsByClassName("active2")[1])
  {
    document.getElementsByClassName("active2")[1].classList.remove("active2");
  }
    document.getElementById("btechsidetab").classList.add("active2");
    document.getElementById("respbtechsidetab").classList.add("active2");
    
  }
  if(slug[slug.length-1]==="mtech")
  {
  
 
  document.getElementById("btechadmission").style.display="none";
  document.getElementById("mscadmission").style.display="none";
  document.getElementById("mbaadmission").style.display="none";
  document.getElementById("phdadmission").style.display="none";
  document.getElementById("bscbedadmission").style.display="none";
  document.getElementById("foreign").style.display="none";
  document.getElementById("mtechadmission").style.display="block";
  document.getElementById("mtechssadmission").style.display="none";
  document.getElementById("btechtab").style.display="none";
  document.getElementById("msctab").style.display="none";
  document.getElementById("mbatab").style.display="none";
  document.getElementById("phdtab").style.display="none";
  document.getElementById("foreignadmissiontab").style.display="none";
  document.getElementById("bscbedtab").style.display="none";
  document.getElementById("mtechtab").style.display="block";
  document.getElementById("mtechsstab").style.display="none";
    document.getElementsByClassName("active2")[0].classList.remove("active2");
    if( document.getElementsByClassName("active2")[0])
    {
      document.getElementsByClassName("active2")[0].classList.remove("active2");
    }
    if( document.getElementsByClassName("active2")[1])
    {
      document.getElementsByClassName("active2")[1].classList.remove("active2");
    }
      document.getElementById("mtechsidetab").classList.add("active2");
      document.getElementById("respmtechsidetab").classList.add("active2");
      

  
  }
  
  else if(slug[slug.length-1]==="msc")
  {
  
 
  document.getElementById("btechadmission").style.display="none";
   document.getElementById("mtechadmission").style.display="none";    
     document.getElementById("mtechssadmission").style.display="none";
  document.getElementById("mbaadmission").style.display="none";
  document.getElementById("phdadmission").style.display="none";
  document.getElementById("bscbedadmission").style.display="none";
  document.getElementById("foreign").style.display="none";
  document.getElementById("mscadmission").style.display="block";
  document.getElementById("btechtab").style.display="none";
  document.getElementById("mtechtab").style.display="none";
  document.getElementById("mtechsstab").style.display="none";
  document.getElementById("mbatab").style.display="none";
  document.getElementById("phdtab").style.display="none";
  document.getElementById("foreignadmissiontab").style.display="none";
  document.getElementById("bscbedtab").style.display="none";
  document.getElementById("msctab").style.display="block";
    document.getElementsByClassName("active2")[0].classList.remove("active2");
    if( document.getElementsByClassName("active2")[0])
    {
      document.getElementsByClassName("active2")[0].classList.remove("active2");
    }
    if( document.getElementsByClassName("active2")[1])
    {
      document.getElementsByClassName("active2")[1].classList.remove("active2");
    }
      document.getElementById("mscsidetab").classList.add("active2");
      document.getElementById("respmscsidetab").classList.add("active2");
      
  }
  else if(slug[slug.length-1]==="mba")
  {
  
 
  document.getElementById("btechadmission").style.display="none";
  document.getElementById("mscadmission").style.display="none";
   document.getElementById("mtechadmission").style.display="none";  
       document.getElementById("mtechssadmission").style.display="none";
  document.getElementById("phdadmission").style.display="none";
  document.getElementById("bscbedadmission").style.display="none";
  document.getElementById("foreign").style.display="none";
  document.getElementById("mbaadmission").style.display="block";
  document.getElementById("btechtab").style.display="none";
  document.getElementById("mtechtab").style.display="none";
  document.getElementById("mtechsstab").style.display="none";
  document.getElementById("msctab").style.display="none";
  document.getElementById("phdtab").style.display="none";
  document.getElementById("foreignadmissiontab").style.display="none";
  document.getElementById("bscbedtab").style.display="none";
  document.getElementById("mbatab").style.display="block";
    document.getElementsByClassName("active2")[0].classList.remove("active2");
    if( document.getElementsByClassName("active2")[0])
    {
      document.getElementsByClassName("active2")[0].classList.remove("active2");
    }
    if( document.getElementsByClassName("active2")[1])
    {
      document.getElementsByClassName("active2")[1].classList.remove("active2");
    }
      document.getElementById("mbasidetab").classList.add("active2");
      document.getElementById("respmbasidetab").classList.add("active2");
      

  
  }
  else if(slug[slug.length-1]==="phd")
  {
  

  document.getElementById("btechadmission").style.display="none";
  document.getElementById("mscadmission").style.display="none";
  document.getElementById("mbaadmission").style.display="none";
  document.getElementById("bscbedadmission").style.display="none";
  document.getElementById("mtechadmission").style.display="none";      
  document.getElementById("mtechssadmission").style.display="none";
  document.getElementById("foreign").style.display="none";
  document.getElementById("phdadmission").style.display="block";
  document.getElementById("btechtab").style.display="none";
  document.getElementById("mtechtab").style.display="none";
  document.getElementById("mtechsstab").style.display="none";
  document.getElementById("msctab").style.display="none";
  document.getElementById("mbatab").style.display="none";
  document.getElementById("foreignadmissiontab").style.display="none";
  document.getElementById("bscbedtab").style.display="none";
  document.getElementById("phdtab").style.display="block";
    document.getElementsByClassName("active2")[0].classList.remove("active2");
    if( document.getElementsByClassName("active2")[0])
    {
      document.getElementsByClassName("active2")[0].classList.remove("active2");
    }
    if( document.getElementsByClassName("active2")[1])
    {
      document.getElementsByClassName("active2")[1].classList.remove("active2");
    }
      document.getElementById("phdsidetab").classList.add("active2");
      document.getElementById("respphdsidetab").classList.add("active2");
      

  
  }
  else if(slug[slug.length-1]==="foreign_admissions")
  {
  
  scrollY=0;
  document.getElementById("btechadmission").style.display="none";
  document.getElementById("mscadmission").style.display="none";
  document.getElementById("mbaadmission").style.display="none";
  document.getElementById("phdadmission").style.display="none";
  document.getElementById("bscbedadmission").style.display="none";
   document.getElementById("mtechadmission").style.display="none";      
   document.getElementById("mtechssadmission").style.display="none";
  document.getElementById("foreign").style.display="block";
  
  document.getElementById("btechtab").style.display="none";
  document.getElementById("mtechtab").style.display="none";
  document.getElementById("mtechsstab").style.display="none";
  document.getElementById("msctab").style.display="none";
  document.getElementById("mbatab").style.display="none";
  document.getElementById("phdtab").style.display="none";
  
  document.getElementById("foreignadmissiontab").style.display="block";
  document.getElementById("bscbedtab").style.display="none";

    document.getElementsByClassName("active2")[0].classList.remove("active2");
    if( document.getElementsByClassName("active2")[0])
    {
      document.getElementsByClassName("active2")[0].classList.remove("active2");
    }
    if( document.getElementsByClassName("active2")[1])
    {
      document.getElementsByClassName("active2")[1].classList.remove("active2");
    }
      document.getElementById("foreignsidetab").classList.add("active2");
      document.getElementById("respforeignsidetab").classList.add("active2");
  }


else if(slug[slug.length-1]==="bscbed")
  {
  
  scrollY=0;
  document.getElementById("btechadmission").style.display="none";
  document.getElementById("mscadmission").style.display="none";
  document.getElementById("mbaadmission").style.display="none";
  document.getElementById("phdadmission").style.display="none";
  document.getElementById("bscbedadmission").style.display="block";
   document.getElementById("mtechadmission").style.display="none";      
   document.getElementById("mtechssadmission").style.display="none";
  document.getElementById("foreign").style.display="none";
  
  document.getElementById("btechtab").style.display="none";
  document.getElementById("mtechtab").style.display="none";
  document.getElementById("mtechsstab").style.display="none";
  document.getElementById("msctab").style.display="none";
  document.getElementById("mbatab").style.display="none";
  document.getElementById("phdtab").style.display="none";
  
  document.getElementById("foreignadmissiontab").style.display="none";
  document.getElementById("bscbedtab").style.display="block";
  
    document.getElementsByClassName("active2")[0].classList.remove("active2");
    if( document.getElementsByClassName("active2")[0])
    {
      document.getElementsByClassName("active2")[0].classList.remove("active2");
    }
    if( document.getElementsByClassName("active2")[1])
    {
      document.getElementsByClassName("active2")[1].classList.remove("active2");
    }
      document.getElementById("bscbedsidetab").classList.add("active2");
      document.getElementById("respbscbedsidetab").classList.add("active2");
  }
}