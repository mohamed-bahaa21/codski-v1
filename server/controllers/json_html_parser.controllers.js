const Landing = require('../models/Landing.model');
// const { section } = require('../sample.data/landing.sections.model')

// html OR json
let parse_json_html_return = "html";
exports.parse_json_html_return = parse_json_html_return;

elementAttrs = (ele) => {
    let _id = `${ele._id ? `_id="${ele._id}"` : ''}`;
    let id = `${ele.id ? `id="${ele.id}"` : ''}`;
    let classes = `${ele.classes ? `class="${ele.classes}"` : ''}`;
    let style = `${ele.style ? `style="${ele.style}"` : ''}`;
    let href = `${ele.href ? `href="${ele.href}"` : ''}`;
    let attrs = `${ele.attrs ? `${ele.attrs}` : ''}`;

    return `${_id} ${id} ${classes} ${style} ${attrs}`;
}

logStringContent = (string) => {
    // console.log(string);
    // let tmp_result = { "tag": string.tag, "classes": string.classes, "content": "string" };
    let tmp_result = `${string}`;
    let tmp_html = `<${string.tag} ${elementAttrs(string)}> ${string} </${string.tag}>`;
    let tmp_form = `
        ${string.tag ? `<${string.tag} ${elementAttrs(string)}> ${string} </${string.tag}>` : `${string}`}
    `;

    if (parse_json_html_return == "html") {
        // return tmp_form;
        return tmp_html;
    } else {
        return tmp_result;
    }
}

logArrayContent = (array) => {
    // console.log(array);
    let tmp_result = { "tag": array.tag, "classes": array.classes, "content": this.checkSectionContent(array.content) };

    // without input ele
    let tmp_html = `<${array.tag} ${elementAttrs(array)}> ${this.checkSectionContent(array.content)} </${array.tag}>`;

    // with input ele
    // let tmp_html = `
    //     <${array.tag} ${elementAttrs(array)}> ${this.checkSectionContent(array.content)} </${array.tag}>
    //     ${typeof (array.content) == "string" ? `<input id="${array._id}" value="${array.content}" />` : ""}
    // `;

    if (parse_json_html_return == "html") {
        return tmp_html;
    } else {
        return tmp_result;
    }
}

logObjectContent = (object) => {
    // console.log(object);
    let tmp_result = { "tag": object.tag, "classes": object.classes, "content": this.checkSectionContent(object.content) };

    // without input ele
    let tmp_html = `<${object.tag} ${elementAttrs(object)}> ${this.checkSectionContent(object.content)} </${object.tag}>`;

    // with input ele
    // let tmp_html = `
    //     <${object.tag} ${elementAttrs(object)}> ${this.checkSectionContent(object.content)} </${object.tag}>
    //     <br> 
    //     ${typeof (object.content) == "string" ? `<input id="${object._id}" value="${object.content}" />` : ""}
    // `;

    if (parse_json_html_return == "html") {
        return tmp_html;
    } else {
        return tmp_result;
    }
}

exports.checkSectionContent = (section_content) => {

    let result = [];
    let html = ``;

    if (typeof (section_content) == "string") {
        let tmp_str;
        tmp_str = logStringContent(section_content);

        html += tmp_str;
        result.push(tmp_str);

    } else if (typeof (section_content) == "object" && Array.isArray(section_content)) {
        let tmp_arr = [];
        let tmp_html = ``;

        section_content.forEach(content => {
            tmp_arr.push(logArrayContent(content));
            tmp_html += logArrayContent(content);
        })

        result.push(tmp_arr);
        html += tmp_html;

    } else if (typeof (section_content) == "object" && !Array.isArray(section_content)) {
        let tmp_result;
        tmp_result = logObjectContent(section_content);

        result.push(tmp_result);
        html += tmp_result;

    } else {
        // let tmp_result = { "tag": "unknown", "content": typeof (section_content) };
        let tmp_result = "";

        result.push(tmp_result);
        html += ` `;
    }

    if (parse_json_html_return == "html") {
        return html;
    } else {
        return result;
    }
}

// landing local_data & DB_data
exports.getLandingLocal = (req, res) => {

    let result = [];
    let html = ``;

    // in case json_html data were array of sections
    // section.section_content.map(section_content => {
    //     let content = checkSectionContent(section_content.content);
    //     result.push({ "tag": content.tag, "classes": content.classes, "content": content });
    //     html += `<${content.tag} id="${content.id}" class="${content.classes}"> ${checkSectionContent(content.content)} </${content.tag}>`;
    // });


    // in case json_html data were object of one section
    Landing.findOne({ section_index: 0 }).then(section => {
        let content = section.section_content;

        result.push({ "content": content });
        html += `<${content.tag} id="${content.id}" class="${content.classes}" contenteditable="true"> ${this.checkSectionContent(content.content)} </${content.tag}>`;

        if (parse_json_html_return == "html") {
            // res.send(html);
            res.render('json_html_parser/local_index', {
                msgs: req.flash('success'),
                sections: html
            });
        } else {
            res.send(result);
        }
    });

};

exports.postLandingLocal = (req, res) => {
    res.send(req.body)
}


exports.getSectionForm = (req, res) => {

    let result = [];
    let html = ``;

    Landing.findOne({ section_index: 0 }).then(section => {
        let content = section.section_content;

        result.push({ "content": content });
        html += `<${content.tag} id="${content.id}" class="${content.classes}"> ${this.checkSectionContent(content.content)} </${content.tag}>`;

        if (parse_json_html_return == "html") {
            // res.send(html);
            res.render('json_html_parser/section_form', {
                msgs: req.flash('success'),
                form: html
            });
        } else {
            res.send(result);
        }
    });
}


