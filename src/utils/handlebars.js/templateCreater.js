const Handlebars = require("handlebars");

const templateCreater = async ({ template, userData }) => {
  const generatedTemplate = Handlebars.compile(template);
  const renderedHtml = generatedTemplate(userData);
  return renderedHtml
};

module.exports = templateCreater;
