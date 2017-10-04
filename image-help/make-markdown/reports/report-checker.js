function reportChecker(makeReport) {
    return new Promise(function(resolve, reject) {
        try {
            expect(makeReport.length).toBe(2);
            makeReport.forEach(function(report) {
                //console.log(report);
                expect(report.markdownFileWithImages.includes('/ElvenImages/california'));
                expect(report.allImagesFile.includes('ElvenImages/all-images-california'));
                expect(report.markdownFileCreated).toBe(true);
            });
            resolve(makeReport);
        } catch (err) {
            expect(true).toBe(false);
            reject(err);
        }
    });
}

module.exports = reportChecker;