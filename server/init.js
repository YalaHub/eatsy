Meteor.startup(function () {
    UploadServer.init({
        tmpDir: process.env.PWD + '/.uploads/tmp',
        uploadDir: process.env.PWD + '/public/',
        overwrite: true,
        crop: true,
        getFileName: function(fileInfo, formData) {
            var filename = formData.id + '.jpg';
            try {
                UploadServer.delete( filename);    
            } catch (error) {
                console.log("This file is new!");
            }
            return filename;     
        },
        checkCreateDirectories: true,
    });
});