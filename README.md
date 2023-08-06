# lambda-express-boilerplate
Quickly deploy your Express.js "Hello World" application to AWS Lambda using Claudia.js. This boilerplate project provides a simple and efficient way to get started with serverless deployment.

<details>
  <summary>⚠️ <strong>Warning: Considerations when using Express.js with AWS Lambda</strong></summary>
  
While using Express.js with AWS Lambda can be tempting for its ease of development and familiarity, there are a few important considerations to keep in mind:

**Advantages of using Express.js with AWS Lambda:**
- Built-in middleware pattern: Express.js provides a convenient and widely used middleware pattern that allows you to easily chain multiple middleware functions together.
- Familiarity and ease of development: If you are already familiar with Express.js, using it with AWS Lambda can reduce the learning curve and speed up development.

**Disadvantages of using Express.js with AWS Lambda:**
1. **Increasing node_modules size and cold starts:** Deploying Express.js to AWS Lambda can increase the size of your `node_modules` directory, leading to longer cold start times.
2. **Additional operational time:** When using Express.js inside AWS Lambda, there are additional layers of data parsing and conversion happening between AWS API Gateway, event payloads, and Express.js request objects. This can potentially waste processing time.
3. **AWS Lambda limitations and unexpected behavior:** AWS Lambda is stateless and can shut down after some period of inactivity, making persistence and data sharing challenging. This can also impact tools, loggers, and error trackers, leading to unexpected behavior.
4. **WebSockets and other Express.js features:** Certain features like WebSockets or specific Express.js middleware may not work as expected within AWS Lambda. AWS API Gateway has its own implementation of web sockets, which may require a different approach.
5. **Different best practices:** Security protection approaches, such as using Helmet.js library in Express.js, may not directly apply to AWS Lambdas. AWS recommends using their AWS Web Application Firewall (WAF) service for protecting your applications.
6. **Lost benefits of individual packaging:** When using Express.js, all AWS Lambda functions will require the same dependencies and have similar artifact sizes. This can limit the advantages of individual packaging and can impact the optimizations done by tools like `serverless-webpack-plugin`.

Before deciding to use Express.js with AWS Lambda, carefully assess your project requirements, scalability needs, and compatibility with other AWS services to ensure the best solution for your application.

For further information, you can refer to the [article](https://medium.com/dailyjs/six-reasons-why-you-shouldnt-run-express-js-inside-aws-lambda-102e3a50f355)

</details>


# Usage

**Install Claudia Before Running the Project**:

To get started with deployment, it is necessary to install Claudia. You can follow the [instructions](https://claudiajs.com/tutorials/installing.html) on the Claudia website to install it.

**To use this project, follow these steps**:

1. **Install the project dependencies using npm**:

```bash
npm install
```

2. **Setting AWS Credentials**:

To set AWS credentials in your terminal, you can use the following commands:

```bash
export AWS_ACCESS_KEY_ID="your_access_key_id"
```
```bash
export AWS_SECRET_ACCESS_KEY="your_secret_access_key"
```

Replace `your_access_key_id` with your actual Access Key ID and `your_secret_access_key` with your actual Secret Access Key.

Alternatively, you can add the access keys to the `.aws/credentials` file in your home directory. Here are the steps:

1. Create the `~/.aws/credentials` file in your root folder and open in a text editor.
2. Add the following lines, replacing `your_access_key_id` and `your_secret_access_key` with your actual values:
   
   ```plaintext
   [default]
   aws_access_key_id = your_access_key_id
   aws_secret_access_key = your_secret_access_key
   ```

Ensure that you keep these credentials secure! For further information, you can refer to the [AWS Documentation](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/configuring-the-jssdk.html)

3. **Use the following npm commands defined in the `package.json` file**:

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "create": "claudia create --handler lambda.handler --deploy-proxy-api --region eu-central-1",
    "deploy": "claudia update --no-optional-dependencies",
    "dev": "nodemon app.local.js",
    "start": "node app.local.js"
  }
}
```

- `npm run test`: Executes the test command. Modify this command according to your testing framework and requirements.
- `npm run create`: Creates the AWS Lambda function and deploys it as an API Gateway proxy.
- `npm run deploy`: Updates the AWS Lambda function with the latest changes.
- `npm run dev`: Runs the application locally using Nodemon for automatic restarts on file changes.
- `npm start`: Starts the application locally without automatic restarts.

Feel free to modify these commands or add additional ones according to your project's needs.

# Deployment

To deploy the function, you can run the following command:

```bash
npm run create
```

This command will create a new function using the specified region (default: `eu-central-1`). After successful deployment, the console output will be similar to the following:

```plaintext
{
  "lambda": {
    "role": "lambda-express-boilerplate-executor",
    "name": "lambda-express-boilerplate",
    "region": "eu-central-1"
  },
  "api": {
    "id": "xxxxxx",
    "url": "https://yourfunctionurl.execute-api.eu-central-1.amazonaws.com/latest"
  }
}
```

You can check the generated URL to see a "Hello world" text!

Additionally, you can create a unique URL by configuring the function through the AWS Dashboard:

1. Go to the AWS Management Console.
2. Navigate to the AWS Lambda service.
3. Open your function's configuration.
4. Under "Function URL", click on "Create function URL".
5. Choose the desired authentication type (you can choose `NONE`) and save the changes.

Once saved, you can access your function via the provided AWS link.

Please note that the `npm run create` command and the AWS Dashboard configuration steps assume you have properly set your AWS credentials and have the necessary access rights.

<details>
  <summary><strong>References</strong></summary>
  Here are some useful references for further reading:

- [Express.js and AWS Lambda: A Serverless Love Story](https://medium.com/free-code-camp/express-js-and-aws-lambda-a-serverless-love-story-7c77ba0eaa35): An article explaining how to use Express.js with AWS Lambda.
- [Six Reasons Why You Shouldn't Run Express.js Inside AWS Lambda](https://medium.com/dailyjs/six-reasons-why-you-shouldnt-run-express-js-inside-aws-lambda-102e3a50f355): A blog post discussing the reasons why running Express.js inside AWS Lambda might not be the best approach.
- [AWS SDK for JavaScript: File Locations](https://docs.aws.amazon.com/sdkref/latest/guide/file-location.html): Documentation explaining where the AWS credentials and configuration files are located.
- [Claudia.js - Installing Claudia](https://claudiajs.com/tutorials/installing.html): Tutorials and documentation for installing Claudia, a deployment tool for AWS Lambda functions.

</details>
