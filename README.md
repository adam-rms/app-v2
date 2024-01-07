# AdamRMS App

AdamRMS is an advanced Rental Management System for Theatre, AV & Broadcast. This repo is the companion app for AdamRMS, an [Expo app](https://expo.dev/) that builds for Android and iOS devices using [EAS](https://expo.dev/eas).

It supports connection to the [hosted solution](https://dash.adam-rms.com), or a self-hosted version of AdamRMS.

## Getting Started with this Repo

Whilst this repo can be opened with a basic NodeJS Github Codespace, it is recommended to develop locally using [Expo Go](https://docs.expo.dev/get-started/expo-go/) on a mobile device. Expo will work in a codespace, but requires the use of [a tunnel](https://docs.expo.dev/more/expo-cli/#tunneling) to connect to Expo Go which is significantly slower than a local connection.

You should be able to clone this repository, then run `npm install` to install the dependencies. You can then run `npx expo start` to start the Expo development server, which will build an Expo Go development version of the app, which you can opn in the Expo Go app on your device.

### Recommended: Create an Expo CLI account.

To speed up development, it is recommended to create an Expo CLI account, and then login to Expo Go on your device with the same account. This will allow you to use the Expo Go app to open the app without having to scan the QR code each time. It also makes your development builds more secure.

Create an account at [expo.dev](https://expo.dev/), then run `expo login` in your terminal to login to Expo CLI, and log in to Expo Go on your device.  
Next time you run `expo start`, the app will show in Expo Go at the top of the list of projects.

## Deployment

Expo Apps can be deployed in two ways, and the AdamRMS app takes advantage of both.

The native codebase has to be packaged at a lower level, so a build is created using EAS whenever a release is made.

For many changes, this is not necessary, and the app can be updated without a full build. This is done using [EAS Update](https://docs.expo.dev/eas-update/introduction/), which are a way of updating the JS code without needing to rebuild the native code. This is done using Github Actions, and is triggered when a PR is closed on the main branch.

The summary of the Actions used in this repository are:

### on: pull_request

When a PR is made, the following actions occur:

- [ReviewDog](https://github.com/adam-rms/app-v2/blob/main/.github/workflows/reviewdog.yml) checks the code for secrets, spelling, language suggestions and lints the app
- [Expo Preview](https://github.com/adam-rms/app-v2/blob/main/.github/workflows/expo-preview.yml) generates a preview for the Expo Go app, which can be installed on a device to test the PR.

### on: pull_request - closed

When a PR is closed on the main branch, the following action occurs:

- [Expo Update](https://github.com/adam-rms/app-v2/blob/main/.github/workflows/expo-update.yml) updates the released app with the latest version of the app, without needing a full build.

### on: release

When a release is made, the following action occurs:

- [Expo Build](https://github.com/adam-rms/app-v2/blob/main/.github/workflows/expo-build.yml) builds the app using EAS, which is then manually reviewed and released to the app store.

## Repository Structure

### /assets

Static Images and other local assets used in the app.

### /components

Reusable components that are used to build up pages. These generally get data through props passed to them, and don't access contexts directly.  
General components are stored at the root of this folder, with more specific components in subfolders.

### /contexts

React contexts that store and fetch data from the API. These are generally used by pages, and passed to components as props.

### /pages

The pages that make up the app. These are rendered by the router, and often take arguments from the router.

### /utilities

Various files that don't fit elsewhere. These include the main routing links, the API wrapper and data storage.

## Contributing

Contributions are very welcome - please see [the website](https://adam-rms.com/contributing) for a guide.  
If you feel you need access to the AdamRMS Expo organisation, or any other development services, please get in touch with [the support team](mailto:support@adam-rms.com).
