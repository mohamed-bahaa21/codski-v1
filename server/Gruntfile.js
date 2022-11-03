module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    // Project configuration. 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            sitecss: {
                options: {
                    banner: ''
                },
                files: {
                    'public/assets/css/horizon.min.css': [
                        "/assets/coming-soon/css/new.style.css",
                        "public/assets/css/bootstrap.min.css",
                        "public/assets/css/slick.css",
                        "public/assets/css/slick-theme.css",
                        "public/assets/css/aos.css",
                        "public/assets/css/lity.min.css",
                        "public/assets/css/fontawesome-all.min.css",
                        "public/assets/css/linearicons.css",
                        "public/assets/css/main.css",
                        "public/assets/css/nav/nav.css",
                        "public/assets/css/blur_cards.css",
                        "public/assets/css/product_stock_lenses.css",
                        "public/assets/css/before_after.css",
                        "public/assets/css/mlod.css",
                        "public/assets/css/slider.css",
                        "public/assets/css/lenses.css",
                        "public/assets/css/news.css",
                        "public/assets/css/timeline.css",
                        "public/assets/css/single-vision.css",
                        "public/assets/css/bifocal.css",
                        "public/assets/css/testimonials.css",
                        "public/assets/css/contactUtil.css",
                        "public/assets/css/contact.css",
                        "public/assets/css/online_ordering.css",
                        "public/assets/css/_reusable/editor.css",
                        "public/assets/css/color-1.css",
                        "public/assets/css/side_nav.css",
                    ]
                }
            }
        },
        uglify: {
            options: {
                compress: true
            },
            applib: {
                src: [
                    "public/assets/js/main.js",
                    "public/assets/js/showInput.js",
                    "public/assets/js/news.js",
                    "public/assets/js/slider.js",
                    "public/assets/js/before_after.js",
                    "public/assets/js/timeline.js",
                    "public/assets/js/single-vision.js",
                    "public/assets/js/bifocal.js",
                    "public/assets/js/testimonials.js",
                    "public/assets/js/contact.js",
                    "public/assets/js/about/about.js",
                    "public/assets/js/product_stock_lenses.js",
                    "public/assets/js/mlod.js",
                    "public/assets/js/side_nav.js",
                ],
                dest: 'public/assets/js/horizon.min.js'
            }
        }
    });
    // Default task. 
    grunt.registerTask('default', ['uglify', 'cssmin']);
};