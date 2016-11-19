// Variables exported by this module can be imported by other packages and
// applications. See ngmeta-tests.js for an example of importing.
export const name = 'ngmeta';

export const ngmeta = ['$window', function($window){
  function scrollToTop(duration) {
    if (duration <= 0) return;
    let difference = 0 - document.body.scrollTop;
    let perTick = difference / duration * 10;

    setTimeout(function() {
      document.body.scrollTop = document.body.scrollTop + perTick;
      if (document.body.scrollTop === 0) return;
      scrollToTop(duration - 10);
    }, 10);
  }
  let self = this;
  try {
    self.setMetaTags = function (tagData){
      //try
      let newMeta = "";

      // Edit <title>
      if(typeof tagData.title === "string"){
        angular.element(document.querySelector(`title`)).remove();
        newMeta += `\n<title>${tagData.title}</title>`;
      }

      // Edit meta tags with Name attribute
      if(tagData.name instanceof Array){
        for (let i = 0; i < tagData.name.length; i++) {
          try {
            if (typeof tagData.name[i].type === "string" && typeof tagData.name[i].content === "string") {
              angular.element(document.querySelector(`[name="${tagData.name[i].type}"]`)).remove();
              newMeta += `\n<meta name="${tagData.name[i].type}" content="${tagData.name[i].content}"/>`;
            }
          } catch (e) {}
        }
      }

      // Edit meta tags with Property attribute
      if(tagData.property instanceof Array){
        for (let i = 0; i < tagData.property.length; i++) {
          try {
            if (typeof tagData.property[i].type === "string" && typeof tagData.property[i].content === "string") {
              angular.element(document.querySelector(`[property="${tagData.property[i].type}"]`)).remove();
              newMeta += `\n<meta property="${tagData.property[i].type}" content="${tagData.property[i].content}"/>`;
            }
          } catch (e) {}
        }
      }

      // Edit canonical tag
      if(typeof tagData.canonical === "string"){
        angular.element(document.querySelector(`[rel="canonical"]`)).remove();
        newMeta += `\n<link rel="canonical" href="${tagData.canonical}"/>`;
      }

      // Scroll to top if not Anchor Tag link
      if(location.href.search('#') == -1 ){
        scrollToTop(1500);
      }

      document.querySelector(`head`).insertAdjacentHTML('afterbegin', newMeta);
      window.prerenderReady = true;
    };
  } catch (e) {

  }
}];
