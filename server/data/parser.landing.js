// hero section as an example
let hero_section = `
<section id="hero-section" class="slide background-withcolor"
style="background: linear-gradient(355deg, #241F1F 90%, #0d0b0b 0%);">
<div id='stars'></div>
<div id='stars1'></div>
<div id='stars2'></div>
<div class="content-bottom">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-md-6" data-aos="fade-right">
                <h1 style="font-weight: 900; color: #E2B55D;">
                    <%= horizon.name %>
                </h1>
                <p id="hero-parag-1" class="white mb-0">
                    <%= horizon.hero_parag_1 %>
                </p>
                <h2 id="hero-header-1">
                    <%= horizon.hero_header_1 %>
                </h2>
                <p id="hero-parag-2" class="white">
                    <%= horizon.hero_parag_2 %>
                </p>
                <!-- call to action btn -->
                <a id="hero-link-1" href="https://<%= horizon.hero_link_1_href %>" class="btn btn-primary"><span><b>
                            <%= horizon.hero_link_1_name %>
                        </b></span></a>
            </div>
            <div class="col-md-6" data-aos="fade-left" data-aos-delay="200">
                <!-- <img src="assets/img/mobile-1.png" class="img-fluid d-block mx-auto" alt=""> -->
                <% if(horizon.design_state) { %>
                    <div class="stack">
                        <div class="lens_content lens_card">
                            <p class="white">
                                <b>
                                    <span id="desktop-prompt" class="white">Hover</span>
                                    <span id="mobile-prompt" class="white">Tap</span>
                                    To See
                                </b>
                            </p>
                            <p class="white" style="
              font-size: 1rem;
              font-weight: 600;
              line-height: 1.5rem;
            ">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex est similique
                                atque
                                vero accusamus, dolorem quae voluptates laudantium magnam quod.
                            </p>
                        </div>
                        <div class="lens_padding lens_card"></div>
                        <div class="lens_border lens_card"></div>
                        <div class="lens_background lens_card"></div>
                        <div class="lens_box-shadow lens_card"></div>
                    </div>
                    <% } else { %>
                        <div style="text-align: center;">
                            <img src="<%= horizon.design_img %>" class="img-1000" alt="Hero Section Image">
                        </div>
                        <% } %>

            </div>
        </div>
    </div>
</div>
</section>
`

exports.section = {
    "section_index": 0,
    "section_display": true,
    "section_name": "Hero Section",
    "section_content": {
        "_id": "0",
        "lvl": "0",
        "tag": "div",
        "id": "",
        "classes": "content-bottom",
        "content": {
            "_id": "1",
            "lvl": "1",
            "tag": "div",
            "id": "",
            "classes": "container",
            "content": {
                "_id": "2",
                "lvl": "2",
                "tag": "div",
                "id": "",
                "classes": "row align-items-center",
                "content": [
                    {
                        "_id": "3",
                        "lvl": "3",
                        "index": "0",
                        "tag": "div",
                        "id": "",
                        "classes": "col-md-6",
                        "attrs": "data-aos='fade-right'",
                        "content": [
                            {
                                "_id": "4",
                                "lvl": "4",
                                "index": "0",
                                "tag": "h1",
                                "id": "",
                                "classes": "",
                                "style": "font-weight: 900; color: #E2B55D;",
                                "attrs": "",
                                "content": "Horizon"
                            },
                            {
                                "_id": "5",
                                "lvl": "4",
                                "index": "2",
                                "tag": "p",
                                "id": "hero-parag-1",
                                "classes": "white mb-0",
                                "style": "",
                                "attrs": "",
                                "content": "lorem ipusum osdpasc cmkfdsv joasdcmnoai aosjcn9siou aoskcmokasm odjfnv kasjcnk vcop coasjnicakn cakosc csac."
                            },
                            {
                                "_id": "6",
                                "lvl": "4",
                                "index": "3",
                                "tag": "h2",
                                "id": "hero-header-1",
                                "classes": "",
                                "style": "",
                                "attrs": "",
                                "content": "Its all about vision"
                            },
                            {
                                "_id": "7",
                                "lvl": "4",
                                "index": "4",
                                "tag": "p",
                                "id": "hero-parag-2",
                                "classes": "white",
                                "style": "",
                                "attrs": "",
                                "content": "c,sapdcmoasnvs asodcknmasopdnvc opasmkdco"
                            },
                            {
                                "_id": "8",
                                "lvl": "4",
                                "index": "5",
                                "tag": "a",
                                "id": "hero-link-1",
                                "classes": "btn btn-primary",
                                "style": "",
                                "href": "https://google.com",
                                "attrs": "",
                                "content": {
                                    "_id": "9",
                                    "lvl": "5",
                                    "tag": "span",
                                    "content": {
                                        "lvl": "6",
                                        "tag": "b",
                                        "content": "Click Here"
                                    }
                                }
                            }
                        ]
                    },
                    {
                        "_id": "10",
                        "lvl": "3",
                        "index": "0",
                        "tag": "div",
                        "id": "",
                        "classes": "col-md-6",
                        "attrs": "data-aos='fade-left' data-aos-delay='200'",
                        "content": {
                            "_id": "11",
                            "lvl": "4",
                            "tag": "div",
                            "id": "",
                            "classes": "stack",
                            "content": [
                                {
                                    "_id": "12",
                                    "lvl": "5",
                                    "tag": "div",
                                    "id": "",
                                    "classes": "lens_content lens_card",
                                    "content": [
                                        {
                                            "_id": "12",
                                            "lvl": "6",
                                            "tag": "p",
                                            "id": "",
                                            "classes": "white",
                                            "content": {
                                                "_id": "13",
                                                "lvl": "7",
                                                "tag": "b",
                                                "id": "",
                                                "classes": "",
                                                "content": [
                                                    {
                                                        "_id": "14",
                                                        "lvl": "8",
                                                        "tag": "span",
                                                        "id": "desktop-prompt",
                                                        "classes": "white",
                                                        "content": "Hover"
                                                    },
                                                    {
                                                        "_id": "15",
                                                        "lvl": "8",
                                                        "tag": "span",
                                                        "id": "mobile-prompt",
                                                        "classes": "white",
                                                        "content": "Tap"
                                                    },
                                                    {
                                                        "_id": "16",
                                                        "lvl": "8",
                                                        "tag": "span",
                                                        "id": "",
                                                        "classes": "",
                                                        "content": "To See"
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "_id": "17",
                                            "lvl": "6",
                                            "tag": "p",
                                            "id": "",
                                            "classes": "white",
                                            "style": "font-size: 1rem;font-weight: 600;line-height: 1.5rem;",
                                            "content": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex est similique atque vero accusamus, dolorem quae voluptates laudantium magnam quod."
                                        }
                                    ]
                                },
                                {
                                    "_id": "18",
                                    "lvl": "5",
                                    "tag": "div",
                                    "id": "",
                                    "classes": "lens_padding lens_card"
                                },
                                {
                                    "_id": "19",
                                    "lvl": "5",
                                    "tag": "div",
                                    "id": "",
                                    "classes": "lens_border lens_card"
                                },
                                {
                                    "_id": "20",
                                    "lvl": "5",
                                    "tag": "div",
                                    "id": "",
                                    "classes": "lens_background lens_card"
                                },
                                {
                                    "_id": "21",
                                    "lvl": "5",
                                    "tag": "div",
                                    "id": "",
                                    "classes": "lens_box-shadow lens_card"
                                }
                            ]
                        }
                    }
                ]
            }
        }
    }
};