import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "my-app",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        environment: {
        MONGODB_URI: process.env.MONGODB_URI || "your_default_mongodb_uri",
        MONGODB_Signin_URI: process.env.MONGODB_SIGNIN_URI || "your_default_signin_uri",
        },
      });
      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
