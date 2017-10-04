
const ReportStructure = {
    markdownFileExists: false,
    spacesInFileNames: false,
    success: false,
    allImages: [],
    smallImages: [],
    markdown: ''
};

module.exports = function() {
    return Object.create(ReportStructure);
};
