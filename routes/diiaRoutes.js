const diiaRouter=require('express').Router();

const DiiaHeroSlider = require('./diia/diiaHeroSlider');
const DiiaMous = require('./diia/diiaMous');
const DiiaRankings = require('./diia/diiaRankings');
const DiiaTestimonials = require('./diia/diiaTestimonials');
const DiiaNewsSection = require('./diia/diiaNewsSection');
const DiiaOpportunities=require('./diia/diiaOpportunities')
const DiiaMap=require('./diia/diiaMap');


diiaRouter.use('/hero-slider', DiiaHeroSlider);
diiaRouter.use('/mous', DiiaMous);
diiaRouter.use('/rankings', DiiaRankings);
diiaRouter.use('/testimonials', DiiaTestimonials);
diiaRouter.use('/news-section', DiiaNewsSection);
diiaRouter.use('/opportunities', DiiaOpportunities);
diiaRouter.use('/maps',DiiaMap);

module.exports = diiaRouter;