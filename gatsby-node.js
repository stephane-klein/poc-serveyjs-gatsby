const path = require('path');

const slug = require('slug');

const SurveysData = require('./src/datas/surveys.json');

exports.createPages = ({ actions }) => {
    const { createPage } = actions;

    const SurveyTemplate = path.resolve('./src/templates/SurveyTemplate.js');

    Object.keys(SurveysData).forEach((item) => {
        createPage({
            path: `/survey/${slug(item, { lower: true })}/`,
            component: SurveyTemplate,
            context: {
                surveySlug: item,
                data: SurveysData[item]
            }
        });
    });
};