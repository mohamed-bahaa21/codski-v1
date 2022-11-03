const path = require('path');
const express = require('express');
const route = express.Router();

const apiCtrl = require(path.resolve(__basename, 'controllers', 'api.controllers'));

// ADMIN -> Auth
// route.post('/postAdminLogin', apiCtrl.postAdminLogin);
// route.post('/postAdminRegister', apiCtrl.postAdminRegister);
// route.get('/getAdminUser', apiCtrl.getAdminUser);

// 'getBlogsData'
// 'getBlogsCount'
// 'createNewBlogData'
// 'getBlogData/:blogId'
// 'editBlogMetaData'
// 'editBlogContentData'
// 'deleteBlogData'

// ADMIN -> Blog(s) Data
route.get('/getBlogsData', apiCtrl.getBlogsData);
route.get('/getBlogsCount', apiCtrl.getBlogsCount);
// ADMIN -> Blog Data
route.post('/createNewBlogData', apiCtrl.createNewBlogData);
route.get('/getBlogMetaData/:blogId', apiCtrl.getBlogMetaData);
route.get('/getBlogContentData/:contentId', apiCtrl.getBlogContentData);
route.post('/editBlogMetaData/:blogId', apiCtrl.editBlogMetaData);
route.post('/editBlogContentData/:contentId', apiCtrl.editBlogContentData);
route.post('/deleteBlogData', apiCtrl.deleteBlogData);

// ADMIN -> Accessories Data
route.get('/getAccessoriesData', apiCtrl.getAccessoriesData);
route.post('/postAccessoriesData', apiCtrl.postAccessoriesData);

// ADMIN -> About Data
route.get('/getAboutData', apiCtrl.getAboutData);
route.post('/postAboutData', apiCtrl.postAboutData);

// ADMIN -> Section Data
route.get('/getSectionData/:sectionId', apiCtrl.getSectionData);
route.post('/postSectionData', apiCtrl.postSectionData);

// ADMIN -> Seo Data
route.get('/getSeoData/:page_id', apiCtrl.getSeoData);
route.post('/postSeoData/:page_id', apiCtrl.postSeoData);

// FUNCTIONALITIES
route.get('/gallery', apiCtrl.gallery);
route.post('/postImgToGallery', apiCtrl.postImgToGallery);
route.get('/mailing-list', apiCtrl.mailList);

route.get('/online-ordering', apiCtrl.getOnlineOrdering);
route.post('/online-ordering', apiCtrl.onlineOrdering);

// Editorjs
route.get('/getNews', apiCtrl.getNews);
route.get('/editorjs', apiCtrl.getEditorjs);
route.post('/editorjs', apiCtrl.editorjs);

// heapdump
route.get('/heapdump', (req, res, next) => {
    var path = require('path');
    var heapdump = require('heapdump');
    const Logger = require('../services/logger.service');
    const logger = new Logger('heapdump');

    var filename = path.resolve(__basename, 'heapdump', `${Date.now()}.heapsnapshot`);
    heapdump.writeSnapshot(filename, function (err, filename) {
        if (err) {
            logger.error(err);
            res.send(err);
        } else {
            logger.info(`Heapdump written to ${filename}`);
            res.send(`Heapdump written to ${filename}`);
        }
    });
})

module.exports = route;