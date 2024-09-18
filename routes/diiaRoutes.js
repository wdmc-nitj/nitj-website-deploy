const diiaRouter=require('express').Router();

const DiiaHeroSlider = require('./diia/diiaHeroSlider');
const DiiaMous = require('./diia/diiaMous');
const DiiaRankings = require('./diia/diiaRankings');
const DiiaTestimonials = require('./diia/diiaTestimonials');
const DiiaNewsSection = require('./diia/diiaNewsSection');
const DiiaOpportunities=require('./diia/diiaOpportunities')
const DiiaMap=require('./diia/diiaMap');
const DiiaNumber = require('./diia/diiaNumber');
const DiiaFooter=require('./diia/diiaFooter');
const DiiaColorButton = require('./diia/diiaColorButton');
const DiiaNavBar=require('./diia/diiaNavBar');



diiaRouter.use('/hero-slider', DiiaHeroSlider);
diiaRouter.use('/mous', DiiaMous);
diiaRouter.use('/rankings', DiiaRankings);
diiaRouter.use('/testimonials', DiiaTestimonials);
diiaRouter.use('/news-section', DiiaNewsSection);
diiaRouter.use('/opportunities', DiiaOpportunities);
diiaRouter.use('/maps',DiiaMap);
diiaRouter.use('/numbers', DiiaNumber);
diiaRouter.use('/footer', DiiaFooter);
diiaRouter.use('/color-button', DiiaColorButton);
diiaRouter.use('/navbar', DiiaNavBar);

module.exports = diiaRouter;