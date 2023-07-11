// AWS SDK v3
// const { CloudWatchClient, PutMetricDataCommand } = require('@aws-sdk/client-cloudwatch');
// const client = new CloudWatchClient({ region: process.env.AWS_DEFAULT_REGION });

// AWS SDK v2
const { defaultProvider } = require('@aws-sdk/credential-provider-node');
const AWS = require('aws-sdk');

const cloudwatch = new AWS.CloudWatch({
    apiVersion: '2010-08-01',
    defaultProvider,
    region: process.env.AWS_DEFAULT_REGION,
});

const cloudwatchMetrics = async (req, res, next) => {
    const start = Date.now();

    res.once('finish', () => {
        const end = Date.now();
        const duration = end - start;

        const params = {
            Namespace: 'your-app-namespace',
            MetricData: [
                {
                    MetricName: 'ResponseTime',
                    Dimensions: [
                        {
                            Name: 'Endpoint',
                            Value: req.path
                        }
                    ],
                    Unit: 'Milliseconds',
                    Value: duration
                }
            ]
        };

        cloudwatch.putMetricData(params, (err, data) => {
            if (err) {
                console.error('Error sending ResponseTime metric to CloudWatch:', err);
            }
        });
    });

    cloudwatch.putMetricData({
        Namespace: 'your-app-namespace',
        MetricData: [
            {
                MetricName: 'RequestCount',
                Value: 1,
                Unit: 'Count',
                Dimensions: [
                    {
                        Name: 'Endpoint',
                        Value: req.path
                    }
                ]
            }
        ]
    }, (err, data) => {
        if (err) {
            console.error('Error sending RequestCount metric to CloudWatch:', err);
        }
    });

    next();
};

module.exports = cloudwatchMetrics;
