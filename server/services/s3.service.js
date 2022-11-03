var { S3 } = require('@aws-sdk/client-s3');

var credentials = {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY
};

AWS.config.update({
    credentials: credentials,
    region: process.env.S3_REGION
});

var s3 = new S3();

const tmp_params = {
    Bucket: process.env.S3_BUCKET,
    Key: 'public/assets/imgs/horizon/before.jpg',
    // Expires: 604800, //time to expire in seconds
    // Fields: {
    //     key: 'public/assets/imgs/horizon/after.jpg'
    // },
    // conditions: [
    //     { acl: 'private' },
    //     { success_action_status: "201" },
    //     ['starts-with', '$key', '']
    //     ['content-length-range', 0, 100000],
    //     { 'x-amz-algorithm': 'AWS4-HMAC-SHA256' }
    // ]
};
// url
/* 
https://ay-business-horizon-s3.s3.eu-central-1.amazonaws.com/public/assets/imgs/horizon/after.jpg?
response-content-disposition=inline&
X-Amz-SignedHeaders=host&
X-Amz-Algorithm=AWS4-HMAC-SHA256&
X-Amz-Date=20211201T101344Z&
X-Amz-Credential=AKIAQWRFVWNW2DNJKIPW/20211201/eu-central-1/s3/aws4_request&
X-Amz-Signature=ceefac454e65fcd7c0a2f1d9d524e595984ca07aac9325732ac9cd7e123e82a1&
X-Amz-Expires=604800
*/

/* Query-string authentication version 4 requires the 
X-Amz-Algorithm, 
X-Amz-Credential, 
X-Amz-Signature, 
X-Amz-Date, 
X-Amz-SignedHeaders, 
and X-Amz-Expires 
parameters. */
exports.generatePresignedURL = function (req, res) {
    // tmp_params.Fields.key = req.query.filename || 'public/assets/imgs/horizon/after.jpg';
    s3.createPresignedPost(tmp_params, function (err, data) {
        if (err) {
            // console.log("Error", err);
            res.status(500).json({
                msg: "Error",
                Error: "Error creating presigned URL"
            });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.getFile = function (folder, file, res) {
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: `${folder}/${file}`,
    };
    s3.getObject(params, function (err, data) {
        // Handle any error and exit
        if (err) {
            res.status(404).render('errors/404')
        } else {
            // No error happened
            // Convert Body from a Buffer to a String
            // let objectData = data.Body.toString('utf-8'); // Use the encoding necessary
            res.setHeader('Content-Type', data.ContentType)
            res.status(200).send(data.Body);
        }
    });
};