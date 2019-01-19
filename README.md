# utah-expungements-cloud-functions
Firebase cloud functions for utahexpungements.org. This is what sends us emails when people sign up on utahexpungements.org.

## Setup
```sh
cd utah-expungements-cloud-functions/functions
npm install
```

Now [go to firebase and generate a service account key json file](https://console.firebase.google.com/u/0/project/utah-expungements-org/settings/serviceaccounts/adminsdk).

Create a file called `service-account-key.json` inside of the `functions` directory.

Now you can make changes to the code. To deploy to firebase, run `npm run deploy`. Deployments
only happen locally -- they aren't triggered automatically.
