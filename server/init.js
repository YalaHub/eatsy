Meteor.startup(function () {
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/public/',
    overwrite: true,
    crop: true,
    getFileName: function(fileInfo, formData) {
    	console.log("fileInfo");
    	console.log(fileInfo);
    	console.log("formData");
    	console.log(formData);
    	return formData.id + '.jpg'; 
    },
    checkCreateDirectories: true,
  })
});