```bash
# Create a new serverless project in current directory.
sls create --template aws-nodejs-typescript --path .

# Deploy to AWS
sls deploy --aws-profile completecoding.io-serverless

# Create a users feature.
mkdir -p src/functions/users
cd src/functions/users
touch index.ts handler.ts schema.ts service.ts repository.ts model.ts mock.json

# Install aws sdk as a development dependecy.
npm install aws-sdk --save-dev

# Create code feature.
mkdir -p src/functions/userCodes
cd src/functions/userCodes
touch index.ts handler.ts schema.ts service.ts repository.ts model.ts mock.json
```