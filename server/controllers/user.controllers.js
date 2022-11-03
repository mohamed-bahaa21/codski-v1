const Horizon = require('../models/Horizon.model');
const Seo = require('../models/Seo.model');
const Blog = require('../models/Blog.model');
const About = require('../models/About.model');
const Brand = require('../models/Brand.model');
const Editor = require('../models/Editor.model');
const Mail = require('../models/Mail.model');

const Logger = require('../services/logger.service');
const logger = new Logger('horizon.controller');

const moment = require('moment');

pages = [
    'landing',
    'brands',
    'products',
    'accessories',
    'news',
    'about',
    'online ordering'
]

exports.getComingSoon = (req, res, next) => {
    res.render('pages/coming-soon/index', {
        csrfToken: req.csrfToken(),
        msgs: req.flash('success'),
        expressFlash: req.flash('success'), 
        sessionFlash: res.locals.sessionFlash,
        preloader: true,
        url: '/coming-soon',
    })
}

exports.subscribe = (req, res) => {
    // console.log(req.body);
    const {
        url,
        mail_email
    } = req.body;

    const email = new Mail({
        mail_email: mail_email
    });

    email.save()
        .then(() => {
            req.flash('success', 'Subscribed successfully...');
            req.session.sessionFlash = {
                type: 'success',
                message: 'Subscribed successfully...'
            }

            res.redirect(`${process.env.SERVER_URI}/${url}`);
        })
        .catch((err) => res.status(400).json('Error: ' + err));

    // res.send(req.flash('success')[0]);
    // console.log("1=> ", req.flash('success'));
};

// Landing Page
exports.getLanding = (req, res) => {
    Horizon.find().sort({ section_index: 1 }).then((result) => {
        Blog.find({ published: true }).limit(3).then(blogs => {
            Seo.findOne({ page_id: 'landing' }).then(seo => {
                // console.log(blogs;
                // console.log(result[4]);
                logger.info("return Landing PAGE & DATA");
                logger.info("return Blogs Data");
                let sections = [];

                // result.map(section => {
                //     sections += section.section_name
                // })
                // res.send(sections)

                // res.send(result[0])

                res.render('pages/landing', {
                    msgs: req.flash('success'),
                    preloader: false,
                    url: '/',
                    seo: seo,
                    blogs: blogs,
                    horizon: result[0],
                    ld1: result[1],
                    li1: result[2],
                    li3: result[10],
                    ld2: result[6],
                    li2: result[3],
                    wv: result[4],
                    ss: result[5],
                    ld3: result[7],
                    pi: result[8],
                    ti: result[9]
                })
            })
        });
    })
};

// START User -> Brand Page
exports.getBrand = (req, res) => {
    const { brand_id } = req.params;

    Brand.findOne({ name_id: brand_id }).populate('description').then(brand => {
        // logger.info("return brand PAGE & DATA");

        res.render('pages/brand', {
            msgs: req.flash('success'),
            preloader: true,
            url: '/brands/:brand',
            page_title: " " + brand.name,
            seo: null,
            brand: brand,
            blocks: brand.description.blocks
        })
    })
};
// DEPRECATED
// exports.getBrand = (req, res) => {
//     const {
//         brand
//     } = req.params;

//     // console.log(brand);
//     logger.info("return brand PAGE & DATA");

//     res.render('pages/brand', {
//         msgs: req.flash('success'),
//         preloader: true,
//         url: '/brands/:brand',
//         page_title: " " + brand,
//         seo: null,
//         brand: brand
//     })
// };
exports.getProduct = (req, res) => {
    const {
        product
    } = req.params;

    logger.info("return Product DATA");

    res.render('pages/product', {
        msgs: req.flash('success'),
        preloader: true,
        url: '/products/:product',
        page_title: " " + product,
        seo: null,
        title: product,
        test: product
    });
};

exports.getProductDesign = (req, res) => {
    const {
        product, design
    } = req.params;

    logger.info("return Product DATA");

    res.render('pages/design', {
        msgs: req.flash('success'),
        preloader: true,
        url: '/products/:product/designs/:design',
        page_title: product + '| ' + design,
        seo: null,
        title: product,
        product: product,
        design: design
    });
};
// ------------------------ END

// User -> About Page
exports.getAccessories = (req, res) => {
    Editor.findById('618ecc2289c6336b5c5e6608').then((accessories) => {
        Seo.findOne({ page_id: 'accessories' }).then(seo => {
            // console.log(accessories);
            res.render('pages/accessories', {
                msgs: req.flash('success'),
                preloader: true,
                url: '/accessories',
                page_title: " Accessories",
                seo: seo,
                blocks: accessories.blocks
            });
        });
    });
};

// User -> About Page
exports.getAbout = (req, res) => {
    Editor.findById('618ec7c089c6336b5c5e6607').then((about) => {
        Seo.findOne({ page_id: 'about' }).then(seo => {
            // console.log(about);
            res.render('pages/about', {
                msgs: req.flash('success'),
                preloader: true,
                url: '/about-us',
                page_title: " About",
                seo: seo,
                blocks: about.blocks
            });
        });
    });
};
// User Get Blogs list
exports.getBlogsTest = (req, res) => {
    Blog.find({ published: true }).sort({ createdAt: -1 }).then(result => {
        let arr = []
        result.map(blog => {
            let newDate = moment(blog.createdAt).format('Do MMMM YYYY');
            arr.push(newDate)
        })
        res.send(arr)
    });
};

// User Get Blogs list
exports.getBlogs = (req, res) => {
    Blog.find({ published: true }).sort({ createdAt: -1 }).then(result => {
        res.render('pages/news', {
            msgs: req.flash('success'),
            preloader: false,
            url: '/news',
            page_title: " News",
            seo: null,
            blogs: result,
            moment: moment
        });
    });
};

// User Get Blog By ID route
exports.getBlog = (req, res) => {
    const blogUrl = req.params.id;

    Blog.findOne({ url: blogUrl, published: true }).populate('content')
        .then(blog => {
            // other news side bar
            // res.send(blog.title)
            Blog.find({ published: true, url: { $ne: blogUrl } }).limit(3).then(blogs => {
                // console.log(result);
                res.render('pages/new', {
                    msgs: req.flash('success'),
                    preloader: false,
                    url: '/blog/:id',
                    page_title: `News | ${blog ? blog.title : ''}`,
                    seo: null,
                    blog: blog,
                    blogs: blogs,
                    moment: moment
                });
            });
        })
        .catch((err) => res.status(400).json('Error: ' + err));
};

// User Get Online Ordering
exports.getOnlineOrdering = (req, res) => {
    Seo.findOne({ page_id: 'online_ordering' }).then(seo => {
        res.render('pages/online_ordering', {
            msgs: req.flash('success'),
            preloader: true,
            url: '/online_ordering',
            page_title: "Online Ordering",
            seo: seo,
        });
    });
};


exports.get400 = (req, res) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.error("GET 400 Bad Request", fullUrl);
    res.status(400).render('errors/400');
};
exports.get404 = (req, res) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.error("GET 404 Not Found", fullUrl);
    res.status(404).render('errors/404');
};
exports.get500 = (req, res) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.error("GET 500 Internal Server Error", fullUrl);
    res.status(500).render('errors/500');
};