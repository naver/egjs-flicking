module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Docusaurus Tutorial',
      items: [
        'introduction',
        'create-a-page',
        'create-a-document',
        'create-a-blog-post',
        'markdown-features',
        'thank-you'
      ]
    }
  ],
  ...require("./sidebars-api.js")
};
