# ts-jest-electron-repro
Small repo to reproduce an issue with running ts-jest in a hello-world electron app

# repro steps
1. `npm install`
2. `npm test add`

Simple add function throws an error about undefined - seems to be not importing things properly
